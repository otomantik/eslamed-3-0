package clickhouse

import (
	"time"
)

// Event represents a single event to be inserted into stream_events table
type Event struct {
	Timestamp         time.Time
	VisitorID         string // FixedString(16) - Hashed Fingerprint
	SessionID         string
	City              string
	District          string
	ISP               string
	Organization      string // "Acibadem Hospitals", "Koc University"
	IPAddress         string // Will be converted to IPv4
	URL               string
	Referrer          string
	UserAgent         string
	GCLID             string
	EventType         string // "pageview", "click", "scroll", "form_submit", etc.
	IntentScore       uint8  // 0 to 100
	IntentVerdict     string // "CRITICAL", "TRASH", "NORMAL"
	ScrollDepth       uint8  // 0, 25, 50, 75, 90 (percentage scrolled)
	ElementID         string // "whatsapp-button", "call-button" (for click events)
	ButtonProximity   uint16 // Hover/touch süresi (milisaniye) - Pre-flight interceptor
	CallDurationEst   uint16 // Tahmini arama süresi (saniye) - Call duration estimator
	PrefIntent        string // Dinamik WhatsApp mesajı tipi: "Refill", "Repair", "Rental"
	IsAdblockDetected uint8  // Ad-blocker tespit edildi mi? (0=hayır, 1=evet)
	MetaJSON          string
	Browser           string // LowCardinality(String)
	OS                string // LowCardinality(String)
}

// SessionAggregate represents aggregated session data for intent_sessions table
type SessionAggregate struct {
	SessionID           string
	VisitorID           string
	FirstSeen           time.Time
	LastSeen            time.Time
	TotalPageviews      uint32
	DetectedIntent      string
	MostVisitedDistrict string
}
