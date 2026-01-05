-- ClickHouse Migration: Analytics Events Table
-- ESLAMED Evidence Tracking v1

CREATE TABLE IF NOT EXISTS analytics_events
(
    `server_received_at` DateTime64(3) DEFAULT now64(3),
    `client_timestamp_ms` UInt64,
    `drift_ms` Int64,
    `event_id` UUID,
    `trace_id` UUID,
    `session_id` String,
    `visitor_id` String,
    `fingerprint_hash` FixedString(64),
    `event_name` LowCardinality(String),
    `priority` LowCardinality(String), -- 'critical', 'important', 'noise'
    `url` String,
    `path` String,
    `referrer` String,
    `mode` LowCardinality(String),
    `ua_family` LowCardinality(String),
    `country` LowCardinality(String),
    `payload_json` String, -- Sanitized JSON string
    `schema_version` UInt16
)
ENGINE = MergeTree
PARTITION BY toYYYYMMDD(server_received_at)
ORDER BY (server_received_at, event_name, fingerprint_hash, event_id)
TTL server_received_at + INTERVAL 90 DAY;

-- Index for common queries
ALTER TABLE analytics_events ADD INDEX idx_session_id session_id TYPE minmax GRANULARITY 4;
ALTER TABLE analytics_events ADD INDEX idx_trace_id trace_id TYPE minmax GRANULARITY 4;
ALTER TABLE analytics_events ADD INDEX idx_visitor_id visitor_id TYPE minmax GRANULARITY 4;

-- Materialized view for hourly aggregations (optional, for performance)
CREATE MATERIALIZED VIEW IF NOT EXISTS analytics_events_hourly
ENGINE = SummingMergeTree()
PARTITION BY toYYYYMMDD(server_received_at)
ORDER BY (toStartOfHour(server_received_at), event_name, priority)
AS SELECT
    toStartOfHour(server_received_at) as hour,
    event_name,
    priority,
    count() as event_count
FROM analytics_events
GROUP BY hour, event_name, priority;

