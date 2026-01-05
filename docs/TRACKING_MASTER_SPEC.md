# ESLAMED Tracking Master Specification (v1)

**Status:** ACTIVE | **Enforcement:** STRICT

## 1. Measurement Philosophy
"Evidence over Analytics."

We do not track *who* a user is (Zero PII). We track *what* the system experienced. Every event is a signed, schema-validated piece of evidence used for forensic reconstruction of UX flows, errors, and conversions.

## 2. Evidence Chain
Every event possesses these context headers to reconstruct the crime scene:
- **`trace_id`**: Ephemeral UUID (v4) per interaction chain.
- **`session_id`**: Short-lived (30 min inactivity rotate). Stored in `sessionStorage`.
- **`visitor_id`**: Medium-lived (7 days rolling TTL). Random UUID. Stored in `localStorage`. NOT a fingerprint.
- **`fingerprint_hash`**: Server-side calculated `SHA256(IP_Subnet + UA_Family + DailySalt)`.
- **`event_id`**: Unique UUID per atomic event.

## 3. The "Kill List" (Zero PII)
**Strictly Forbidden Keys:**
`name`, `phone`, `email`, `tc`, `tc_no`, `identity`, `address`, `full_address`, `diagnosis`, `note`, `free_text`, `message`, `cc`, `credit_card`, `iban`.

**Forbidden Patterns:**
- Regex matching TR Phone numbers: `/\b0?5\d{9}\b/`
- Regex matching Email addresses: `/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/`
- Regex matching 11-digit TC/Identity numbers: `/\b\d{11}\b/`

## 4. Event Taxonomy & Priority
| Priority | Definition | Drop Policy | Retention |
| :--- | :--- | :--- | :--- |
| **CRITICAL** | Conversions, Errors, Handovers | NEVER DROP (Retry + Backpressure) | 1 Year |
| **IMPORTANT** | Search, Mode Change, Filter | Drop only if queue full & no noise | 90 Days |
| **NOISE** | Scroll, Hover, Perf (CWV) | Drop immediately under load | 7 Days |

## 5. ClickHouse Schema Model
- **Table**: `analytics_events`
- **Engine**: `MergeTree`
- **Partition**: `toYYYYMMDD(server_received_at)`
- **Ordering**: `(server_received_at, event_name, fingerprint_hash, event_id)`
- **TTL**: 90 Days (configurable per priority)

## 6. Operational Playbook (SQL Recipes)

### A. Funnel Drop-off (Forensic)
```sql
SELECT event_name, count()
FROM analytics_events
WHERE server_received_at > now() - INTERVAL 1 DAY
AND event_name IN ('cta_clicked', 'quote_submitted', 'handover_completed')
GROUP BY event_name
ORDER BY count() DESC;
```

### B. Error Spikes (Last Hour)
```sql
SELECT 
    JSONExtractString(payload_json, 'code') as err_code,
    count() as count
FROM analytics_events
WHERE event_name = 'app_error' AND server_received_at > now() - INTERVAL 1 HOUR
GROUP BY err_code
ORDER BY count DESC;
```

### C. Session Flow Reconstruction
```sql
SELECT 
    session_id,
    trace_id,
    array_agg(event_name ORDER BY client_timestamp_ms) as event_sequence,
    min(client_timestamp_ms) as session_start,
    max(client_timestamp_ms) as session_end
FROM analytics_events
WHERE session_id = $1
GROUP BY session_id, trace_id
ORDER BY session_start;
```

### D. Conversion Funnel Analysis
```sql
SELECT 
    event_name,
    count(*) as occurrences,
    avg(drift_ms) as avg_delay_ms
FROM analytics_events
WHERE trace_id IN (
    SELECT trace_id FROM analytics_events 
    WHERE event_name = 'quote_submitted'
    AND server_received_at > now() - INTERVAL 7 DAY
)
AND server_received_at > now() - INTERVAL 7 DAY
GROUP BY event_name
ORDER BY min(client_timestamp_ms);
```

## 7. Threat Model & Mitigation

### Replay Attacks
- **Mitigation**: `event_id` deduplication (Redis/DB) + `timestamp` window check (±60s)
- **Implementation**: Server-side duplicate check before insert

### Bot Floods
- **Mitigation**: Rate limit per `fingerprint_hash` at API Gateway level
- **Implementation**: Middleware rate limiting (e.g., 100 events/min per fingerprint)

### PII Leakage
- **Mitigation**: Automated redaction firewall + runtime validation
- **Implementation**: `redaction.ts` + CI firewall script

## 8. Compliance Notes
- **KVKK/GDPR**: Zero PII collection, privacy-by-design
- **Data Retention**: 90 days default (configurable per priority)
- **Right to Deletion**: Support deletion by `visitor_id` or `session_id`
- **Exportability**: All events exportable as JSON/CSV for user requests

