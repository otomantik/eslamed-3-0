package ingestion

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"

	"eslamed/backend/internal/clickhouse"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	chClient *clickhouse.Client
}

// NewHandler creates a new ingestion handler with ClickHouse client
func NewHandler(chClient *clickhouse.Client) *Handler {
	return &Handler{
		chClient: chClient,
	}
}

type GhostPayload struct {
	VisitorID string       `json:"vid"`
	URL       string       `json:"url"`
	Ref       string       `json:"ref"`
	Events    []GhostEvent `json:"events"`
}

type GhostEvent struct {
	Type              string                 `json:"type"`      // "pageview", "click", "scroll", "form_submit", etc.
	Timestamp         int64                  `json:"timestamp"` // Unix timestamp in milliseconds
	SessionID         string                 `json:"session_id"`
	ScrollDepth       uint8                  `json:"scroll_depth"`        // 0, 25, 50, 75, 90
	ElementID         string                 `json:"element_id"`          // "whatsapp", "call", "conversion"
	ButtonProximity   uint16                 `json:"button_proximity"`    // Hover/touch süresi (ms)
	CallDurationEst   uint16                 `json:"call_duration_est"`   // Tahmini arama süresi (saniye)
	PrefIntent        string                 `json:"pref_intent"`         // "Refill", "Repair", "Rental"
	IsAdblockDetected uint8                  `json:"is_adblock_detected"` // 0=hayır, 1=evet
	Meta              map[string]interface{} `json:"meta"`                // Additional event data
}

// GeoIPResponse represents the response from ip-api.com
type GeoIPResponse struct {
	Status     string `json:"status"`
	Message    string `json:"message"`
	City       string `json:"city"`
	RegionName string `json:"regionName"` // This is typically the district/state
	ISP        string `json:"isp"`
	Org        string `json:"org"` // Organization name
}

// HandleGhostIngest receives the camouflaged POST request
func (h *Handler) HandleGhostIngest(c *gin.Context) {
	// TODO: Implement Blob Decoding (it comes as application/json in the Blob but disguised)
	// For now, standard bind
	var payload GhostPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		// Even on error, return 200 to confuse scanners
		c.Status(http.StatusOK)
		return
	}

	// Extract client IP and User-Agent
	clientIP := c.ClientIP()
	userAgent := c.GetHeader("User-Agent")

	// Resolve GeoIP information (City, District, ISP, Organization)
	// Note: For MVP, we use ip-api.com free endpoint. In production, replace with
	// local MMDB file (MaxMind GeoLite2) or paid API for better performance and reliability.
	city, district, isp, organization := resolveGeoIP(clientIP)

	// Parse browser and OS from User-Agent (basic parsing)
	browser := parseBrowser(userAgent)
	os := parseOS(userAgent)

	// Extract GCLID from URL
	gclid := extractGCLID(payload.URL)

	// Process each event in the payload
	for _, ghostEvent := range payload.Events {
		// Convert timestamp
		var eventTime time.Time
		if ghostEvent.Timestamp > 0 {
			eventTime = time.Unix(ghostEvent.Timestamp/1000, (ghostEvent.Timestamp%1000)*1000000)
		} else {
			eventTime = time.Now()
		}

		// Serialize meta JSON
		metaJSON := ""
		if len(ghostEvent.Meta) > 0 {
			if metaBytes, err := json.Marshal(ghostEvent.Meta); err == nil {
				metaJSON = string(metaBytes)
			}
		}

		// Calculate basic intent score from URL and GCLID
		intentScore, intentVerdict := calculateIntentScore(payload.URL, gclid, eventTime)

		// Extract event fields
		scrollDepth := ghostEvent.ScrollDepth
		elementID := ghostEvent.ElementID
		buttonProximity := ghostEvent.ButtonProximity
		callDurationEst := ghostEvent.CallDurationEst
		prefIntent := ghostEvent.PrefIntent
		isAdblockDetected := ghostEvent.IsAdblockDetected

		// Create ClickHouse event
		event := clickhouse.Event{
			Timestamp:         eventTime,
			VisitorID:         payload.VisitorID,
			SessionID:         ghostEvent.SessionID,
			City:              city,
			District:          district,
			ISP:               isp,
			Organization:      organization,
			IPAddress:         clientIP,
			URL:               payload.URL,
			Referrer:          payload.Ref,
			UserAgent:         userAgent,
			GCLID:             gclid,
			EventType:         ghostEvent.Type,
			IntentScore:       intentScore,
			IntentVerdict:     intentVerdict,
			ScrollDepth:       scrollDepth,
			ElementID:         elementID,
			ButtonProximity:   buttonProximity,
			CallDurationEst:   callDurationEst,
			PrefIntent:        prefIntent,
			IsAdblockDetected: isAdblockDetected,
			MetaJSON:          metaJSON,
			Browser:           browser,
			OS:                os,
		}

		// Insert event asynchronously (non-blocking)
		if err := h.chClient.InsertEvent(context.Background(), event); err != nil {
			// Log error but don't fail the request (ghost protocol)
			// In production, you might want to use a proper logger
			_ = err
		}
	}

	// Always return 200 OK (ghost protocol)
	c.Status(http.StatusOK)
}

// parseBrowser extracts browser name from User-Agent (basic implementation)
func parseBrowser(userAgent string) string {
	ua := userAgent
	switch {
	case strings.Contains(ua, "Chrome") && !strings.Contains(ua, "Edg"):
		return "Chrome"
	case strings.Contains(ua, "Firefox"):
		return "Firefox"
	case strings.Contains(ua, "Safari") && !strings.Contains(ua, "Chrome"):
		return "Safari"
	case strings.Contains(ua, "Edg"):
		return "Edge"
	case strings.Contains(ua, "Opera"):
		return "Opera"
	default:
		return "Unknown"
	}
}

// parseOS extracts OS name from User-Agent (basic implementation)
func parseOS(userAgent string) string {
	ua := userAgent
	switch {
	case strings.Contains(ua, "Windows"):
		return "Windows"
	case strings.Contains(ua, "Mac OS X") || strings.Contains(ua, "macOS"):
		return "macOS"
	case strings.Contains(ua, "Linux"):
		return "Linux"
	case strings.Contains(ua, "Android"):
		return "Android"
	case strings.Contains(ua, "iPhone") || strings.Contains(ua, "iPad") || strings.Contains(ua, "iPod"):
		return "iOS"
	default:
		return "Unknown"
	}
}

// extractGCLID extracts GCLID parameter from URL
func extractGCLID(urlStr string) string {
	parsedURL, err := url.Parse(urlStr)
	if err != nil {
		return ""
	}
	return parsedURL.Query().Get("gclid")
}

// calculateIntentScore calculates intent score based on URL, GCLID, and time
func calculateIntentScore(urlStr, gclid string, eventTime time.Time) (uint8, string) {
	score := uint8(50) // Default score
	verdict := "NORMAL"

	urlLower := strings.ToLower(urlStr)
	gclidLower := strings.ToLower(gclid)

	// Check for urgent keywords
	urgentKeywords := []string{"acil", "emergency", "broken", "ariza", "tamir", "repair"}
	for _, keyword := range urgentKeywords {
		if strings.Contains(urlLower, keyword) || strings.Contains(gclidLower, keyword) {
			score = 90
			verdict = "CRITICAL"
			return score, verdict
		}
	}

	// Check GCLID for intent signals
	if strings.Contains(gclidLower, "buy") || strings.Contains(gclidLower, "purchase") {
		score = 75
		verdict = "HIGH_INTENT"
	} else if strings.Contains(gclidLower, "rental") || strings.Contains(gclidLower, "rent") {
		score = 70
		verdict = "RENTAL"
	}

	// Check URL for price/comparison keywords
	priceKeywords := []string{"fiyat", "price", "ucuz", "cheap", "ikinci", "second"}
	for _, keyword := range priceKeywords {
		if strings.Contains(urlLower, keyword) {
			score = 45
			verdict = "PRICE_SHOPPER"
			return score, verdict
		}
	}

	// Check for low-value keywords (spare parts, accessories)
	lowValueKeywords := []string{"manometre", "maske", "mask", "cannula", "tubing", "aksesuar"}
	for _, keyword := range lowValueKeywords {
		if strings.Contains(urlLower, keyword) {
			score = 15
			verdict = "TRASH"
			return score, verdict
		}
	}

	// Time-based scoring (night time = more urgent)
	hour := eventTime.Hour()
	if hour >= 22 || hour <= 6 {
		score += 10 // Night time adds urgency
		if score > 100 {
			score = 100
		}
	}

	return score, verdict
}

// resolveGeoIP resolves IP address to geographic and organization information
// Returns: City, District (RegionName), ISP, Organization
// Note: For MVP, uses ip-api.com free endpoint. In production, replace with:
// - Local MMDB file (MaxMind GeoLite2-City.mmdb) for better performance
// - Paid API service for higher rate limits and accuracy
func resolveGeoIP(ip string) (city, district, isp, organization string) {
	// Skip localhost/private IPs
	if ip == "" || ip == "::1" || ip == "127.0.0.1" || strings.HasPrefix(ip, "192.168.") || strings.HasPrefix(ip, "10.") {
		return "", "", "", ""
	}

	// Use ip-api.com free endpoint
	// Fields: status, message, city, regionName (district), isp, org
	apiURL := fmt.Sprintf("http://ip-api.com/json/%s?fields=status,message,city,regionName,isp,org", ip)

	// Create HTTP client with timeout
	client := &http.Client{
		Timeout: 2 * time.Second, // Fast timeout to avoid blocking
	}

	resp, err := client.Get(apiURL)
	if err != nil {
		// Silently fail - don't block event ingestion
		return "", "", "", ""
	}
	defer resp.Body.Close()

	// Read response
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", "", "", ""
	}

	// Parse JSON response
	var geoResp GeoIPResponse
	if err := json.Unmarshal(body, &geoResp); err != nil {
		return "", "", "", ""
	}

	// Check if request was successful
	if geoResp.Status != "success" {
		return "", "", "", ""
	}

	// Return parsed values
	return geoResp.City, geoResp.RegionName, geoResp.ISP, geoResp.Org
}
