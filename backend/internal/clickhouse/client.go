package clickhouse

import (
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"database/sql"
	"encoding/hex"
	"errors"
	"fmt"
	"log"
	"os"
	"strings"
	"sync"
	"time"

	ch "github.com/ClickHouse/clickhouse-go/v2"
)

// Client handles async batch insertion to ClickHouse
type Client struct {
	conn        *sql.DB
	buffer      []Event
	mu          sync.Mutex
	flushSize   int
	flushTick   *time.Ticker
	done        chan struct{}
	wg          sync.WaitGroup
	phoneSecret []byte
}

// Config holds ClickHouse connection configuration
type Config struct {
	Addr          string
	Database      string
	User          string
	Password      string
	PhoneSecret   string
	FlushSize     int
	FlushInterval time.Duration
}

// NewClient creates a new ClickHouse client with async batching
func NewClient(cfg Config) (*Client, error) {
	if cfg.FlushSize == 0 {
		cfg.FlushSize = 5000
	}
	if cfg.FlushInterval == 0 {
		cfg.FlushInterval = 5 * time.Second
	}

	// Build DSN for ClickHouse v2 driver
	// Format: clickhouse://[username[:password]@][host1[:port1]][,...hostN[:portN]]/[database][?param1=value1&...&paramN=valueN]
	var dsn string
	if cfg.Password == "" {
		// Try different formats for empty password:
		// Format 1: clickhouse://user@host/db (what we're using)
		// Format 2: clickhouse://host/db?username=user (alternative)
		// Format 3: clickhouse://host/db (no auth, but might not work)
		// Let's try format 2 as it's more explicit
		dsn = fmt.Sprintf("clickhouse://%s/%s?username=%s&dial_timeout=10s&compress=true&max_execution_time=60",
			cfg.Addr, cfg.Database, cfg.User)
		log.Printf("Connecting to ClickHouse without password (DSN: clickhouse://%s/%s?username=%s)", cfg.Addr, cfg.Database, cfg.User)
	} else {
		dsn = fmt.Sprintf("clickhouse://%s:%s@%s/%s?dial_timeout=10s&compress=true&max_execution_time=60",
			cfg.User, cfg.Password, cfg.Addr, cfg.Database)
		log.Printf("Connecting to ClickHouse with password (DSN: clickhouse://%s:***@%s/%s)", cfg.User, cfg.Addr, cfg.Database)
	}

	conn, err := sql.Open("clickhouse", dsn)
	if err != nil {
		return nil, fmt.Errorf("failed to open ClickHouse connection: %w", err)
	}

	// Test connection (with retries) and ensure database exists.
	// This avoids crash loops during fresh deploys where ClickHouse is still starting
	// or the database hasn't been created yet.
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	if err := pingAndEnsureDB(ctx, conn, cfg); err != nil {
		conn.Close()
		return nil, fmt.Errorf("failed to initialize ClickHouse client: %w", err)
	}

	client := &Client{
		conn:        conn,
		buffer:      make([]Event, 0, cfg.FlushSize),
		flushSize:   cfg.FlushSize,
		flushTick:   time.NewTicker(cfg.FlushInterval),
		done:        make(chan struct{}),
		phoneSecret: []byte(cfg.PhoneSecret),
	}

	// Start background flusher
	client.wg.Add(1)
	go client.flushLoop()

	log.Printf("ClickHouse client initialized: flush_size=%d, flush_interval=%v", cfg.FlushSize, cfg.FlushInterval)
	return client, nil
}

func pingAndEnsureDB(ctx context.Context, conn *sql.DB, cfg Config) error {
	var lastErr error
	backoff := 500 * time.Millisecond

	for {
		// Small per-attempt timeout, bounded by the outer ctx.
		attemptCtx, cancel := context.WithTimeout(ctx, 5*time.Second)
		err := conn.PingContext(attemptCtx)
		cancel()

		if err == nil {
			return nil
		}
		lastErr = err

		// Handle "Database does not exist" on fresh volumes.
		var ex *ch.Exception
		if errors.As(err, &ex) && ex.Code == 81 {
			if cfg.Database == "" {
				return fmt.Errorf("clickhouse database is empty and ping returned code 81: %w", err)
			}
			if createErr := createDatabase(ctx, cfg); createErr != nil {
				// keep retrying until ctx expires; ClickHouse might still be coming up
				lastErr = fmt.Errorf("create database %q failed: %w (original ping error: %v)", cfg.Database, createErr, err)
			} else {
				// After creating DB, loop and ping again.
				lastErr = nil
			}
		}

		if ctx.Err() != nil {
			if lastErr != nil {
				return lastErr
			}
			return ctx.Err()
		}

		time.Sleep(backoff)
		if backoff < 3*time.Second {
			backoff *= 2
		}
	}
}

func createDatabase(ctx context.Context, cfg Config) error {
	// Build a DSN WITHOUT selecting a database, so we can run CREATE DATABASE.
	var adminDSN string
	if strings.TrimSpace(cfg.Password) == "" {
		adminDSN = fmt.Sprintf("clickhouse://%s?username=%s&dial_timeout=10s&compress=true&max_execution_time=60",
			cfg.Addr, cfg.User)
	} else {
		adminDSN = fmt.Sprintf("clickhouse://%s:%s@%s?dial_timeout=10s&compress=true&max_execution_time=60",
			cfg.User, cfg.Password, cfg.Addr)
	}

	adminConn, err := sql.Open("clickhouse", adminDSN)
	if err != nil {
		return fmt.Errorf("open admin connection failed: %w", err)
	}
	defer adminConn.Close()

	// Best-effort ping before creating.
	pingCtx, cancel := context.WithTimeout(ctx, 5*time.Second)
	_ = adminConn.PingContext(pingCtx)
	cancel()

	execCtx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()
	_, err = adminConn.ExecContext(execCtx, fmt.Sprintf("CREATE DATABASE IF NOT EXISTS %s", cfg.Database))
	if err != nil {
		return fmt.Errorf("exec create database failed: %w", err)
	}
	return nil
}

// NewClientFromEnv creates a client using environment variables
func NewClientFromEnv() (*Client, error) {
	// Trim whitespace from password to handle docker-compose.yml formatting
	passwordRaw := getEnv("CLICKHOUSE_PASSWORD", "")
	password := strings.TrimSpace(passwordRaw)

	// Debug: log password status (without revealing actual password)
	if passwordRaw != password {
		log.Printf("DEBUG: Password had whitespace, trimmed. Original length: %d, Trimmed length: %d", len(passwordRaw), len(password))
	}
	log.Printf("DEBUG: Password length after trim: %d (empty=%v)", len(password), password == "")

	cfg := Config{
		Addr:          getEnv("CLICKHOUSE_ADDR", "localhost:9000"),
		Database:      getEnv("CLICKHOUSE_DB", "eslamed"),
		User:          getEnv("CLICKHOUSE_USER", "default"),
		Password:      password,
		PhoneSecret:   getEnv("CLICKHOUSE_PHONE_SECRET", ""),
		FlushSize:     5000,
		FlushInterval: 5 * time.Second,
	}

	if cfg.PhoneSecret == "" {
		return nil, fmt.Errorf("CLICKHOUSE_PHONE_SECRET environment variable is required")
	}

	return NewClient(cfg)
}

// InsertEvent adds an event to the buffer (thread-safe, non-blocking)
func (c *Client) InsertEvent(ctx context.Context, event Event) error {
	c.mu.Lock()
	c.buffer = append(c.buffer, event)
	shouldFlush := len(c.buffer) >= c.flushSize
	c.mu.Unlock()

	// Trigger immediate flush if buffer is full
	if shouldFlush {
		go c.flush()
	}

	return nil
}

// flushLoop runs in background, flushing on ticker or size threshold
func (c *Client) flushLoop() {
	defer c.wg.Done()

	for {
		select {
		case <-c.flushTick.C:
			c.flush()
		case <-c.done:
			// Final flush on shutdown
			c.flush()
			return
		}
	}
}

// flush performs the actual batch insert (called with mutex protection)
func (c *Client) flush() {
	c.mu.Lock()
	if len(c.buffer) == 0 {
		c.mu.Unlock()
		return
	}

	// Swap buffers for zero-downtime insertion
	batch := make([]Event, len(c.buffer))
	copy(batch, c.buffer)
	c.buffer = c.buffer[:0] // Clear buffer
	c.mu.Unlock()

	if err := c.insertBatch(context.Background(), batch); err != nil {
		log.Printf("ERROR: Failed to flush batch (%d events): %v", len(batch), err)
		// Optionally: re-queue failed events or send to dead-letter queue
	} else {
		log.Printf("Flushed %d events to ClickHouse", len(batch))
	}
}

// insertBatch performs the actual SQL batch insert
func (c *Client) insertBatch(ctx context.Context, events []Event) error {
	if len(events) == 0 {
		return nil
	}

	query := `INSERT INTO eslamed.stream_events (
		timestamp, visitor_id, session_id, city, district, isp, organization, ip_address,
		url, referrer, user_agent, gclid, event_type, intent_score,
		intent_verdict, scroll_depth, element_id, button_proximity, call_duration_est,
		pref_intent, is_adblock_detected, meta_json, browser, os
	) VALUES`

	// Build batch insert with multiple value sets
	// 24 fields: timestamp, visitor_id, session_id, city, district, isp, organization, ip_address,
	//            url, referrer, user_agent, gclid, event_type, intent_score, intent_verdict,
	//            scroll_depth, element_id, button_proximity, call_duration_est, pref_intent,
	//            is_adblock_detected, meta_json, browser, os
	values := make([]interface{}, 0, len(events)*24)
	placeholders := make([]string, 0, len(events))

	for i, event := range events {
		// Ensure visitor_id is exactly 16 bytes (FixedString(16))
		visitorID := padOrTruncate(event.VisitorID, 16)

		placeholders = append(placeholders, "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
		values = append(values,
			event.Timestamp,
			visitorID,
			event.SessionID,
			event.City,
			event.District,
			event.ISP,
			event.Organization,
			event.IPAddress,
			event.URL,
			event.Referrer,
			event.UserAgent,
			event.GCLID,
			event.EventType,
			event.IntentScore,
			event.IntentVerdict,
			event.ScrollDepth,
			event.ElementID,
			event.ButtonProximity,
			event.CallDurationEst,
			event.PrefIntent,
			event.IsAdblockDetected,
			event.MetaJSON,
			event.Browser,
			event.OS,
		)
		_ = i // Suppress unused variable warning
	}

	// Combine query with placeholders
	fullQuery := query + " " + strings.Join(placeholders, ", ")

	// Execute batch insert
	_, err := c.conn.ExecContext(ctx, fullQuery, values...)
	if err != nil {
		return fmt.Errorf("failed to insert batch: %w", err)
	}

	return nil
}

// SecureHashPhone hashes a phone number using HMAC-SHA256
func (c *Client) SecureHashPhone(phone string) string {
	// Normalize phone number (remove spaces, dashes, etc.)
	normalized := normalizePhone(phone)

	// Create HMAC
	mac := hmac.New(sha256.New, c.phoneSecret)
	mac.Write([]byte(normalized))
	hash := mac.Sum(nil)

	// Return hex-encoded hash
	return hex.EncodeToString(hash)
}

// Close gracefully shuts down the client, flushing remaining events
func (c *Client) Close() error {
	log.Println("Shutting down ClickHouse client...")

	// Stop ticker
	c.flushTick.Stop()

	// Signal done to flushLoop
	close(c.done)

	// Wait for flushLoop to finish
	c.wg.Wait()

	// Close connection
	if err := c.conn.Close(); err != nil {
		return fmt.Errorf("failed to close ClickHouse connection: %w", err)
	}

	log.Println("ClickHouse client shut down successfully")
	return nil
}

// Helper functions

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func padOrTruncate(s string, length int) string {
	if len(s) > length {
		return s[:length]
	}
	return s + strings.Repeat("\x00", length-len(s))
}

func normalizePhone(phone string) string {
	// Remove common phone number formatting characters
	normalized := strings.ReplaceAll(phone, " ", "")
	normalized = strings.ReplaceAll(normalized, "-", "")
	normalized = strings.ReplaceAll(normalized, "(", "")
	normalized = strings.ReplaceAll(normalized, ")", "")
	normalized = strings.ReplaceAll(normalized, "+", "")
	return normalized
}
