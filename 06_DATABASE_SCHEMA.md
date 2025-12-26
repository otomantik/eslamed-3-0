# 🗄️ 06_DATABASE_SCHEMA.md (The Infinite Memory)

![Database](https://img.shields.io/badge/Database-ClickHouse-FFCC00?style=flat-square)
![Engine](https://img.shields.io/badge/Engine-ReplacingMergeTree-blueviolet?style=flat-square)
![Compression](https://img.shields.io/badge/Compression-ZSTD_Level_3-success?style=flat-square)

> **"PostgreSQL is a library. ClickHouse is the Library of Congress."**

This document defines the SQL structure for the Eslamed Platform.
It uses advanced ClickHouse features like **LowCardinality**, **Codecs**, and **Materialized Views** to achieve sub-millisecond query speeds.

---

## 🛠️ OPTIMIZATION PHILOSOPHY

1.  **No Nulls:** We do not use `Nullable` types unless absolutely necessary (Performance killer). We use defaults (Empty string or 0).
2.  **Columnar Compression:** We use `ZSTD(3)` for heavy text and `Delta` for timestamps. This reduces disk usage by ~90%.
3.  **Low Cardinality:** For columns with repeating values (City, ISP, Device Type), we use `LowCardinality(String)`. It works like an Enum but dynamic.

---

## 📊 1. TABLE: `stream_events` (The Firehose)

Stores every single raw interaction (Pageview, Click, Scroll, Error).
* **Write Volume:** High (1000+ inserts/sec capability).
* **Retention:** 365 Days (Auto-delete older logs).

```sql
CREATE TABLE eslamed_db.stream_events
(
    -- 🕒 Time & Identity
    `timestamp` DateTime64(3) CODEC(Delta, ZSTD(1)),
    `visitor_id` FixedString(16), -- Hashed Fingerprint
    `session_id` String CODEC(ZSTD(1)),
    
    -- 📍 Location & Network (Enriched by Go)
    `city` LowCardinality(String),
    `district` LowCardinality(String), -- "Umraniye", "Kadikoy"
    `isp` LowCardinality(String),      -- "Turkcell", "Superonline"
    `ip_address` IPv4,
    
    -- 🔗 Context
    `url` String CODEC(ZSTD(3)),
    `referrer` String CODEC(ZSTD(3)),
    `user_agent` String CODEC(ZSTD(3)),
    `gclid` String CODEC(ZSTD(3)), -- Critical for Google Ads
    
    -- 🧠 Intelligence (From Pipeline)
    `event_type` LowCardinality(String), -- "pageview", "click", "form_submit"
    `intent_score` UInt8, -- 0 to 100
    `intent_verdict` LowCardinality(String), -- "CRITICAL", "TRASH", "NORMAL"
    `meta_json` String CODEC(ZSTD(3)) -- Extra JSON data (e.g. { "button_text": "WhatsApp" })
)
ENGINE = MergeTree
PARTITION BY toYYYYMM(timestamp)
ORDER BY (city, isp, event_type, timestamp) -- Optimized for "Show me Istanbul users"
TTL timestamp + INTERVAL 365 DAY;
💎 2. TABLE: leads_crm (The Gold Mine)
Stores Form Submissions and WhatsApp Clicks.

Engine: ReplacingMergeTree.

Feature: Allows updating lead status (e.g., New -> Sold) by inserting a new row with a higher version number.

SQL

CREATE TABLE eslamed_db.leads_crm
(
    -- 🔑 Keys
    `phone` String, -- Primary identifier (Normalized: 90532...)
    `created_at` DateTime DEFAULT now(),
    `updated_at` DateTime DEFAULT now(),
    
    -- 👤 User Info
    `name` String,
    `visitor_id` FixedString(16),
    `gclid` String, -- The Key to Google Ads Attribution
    
    -- 🚦 Status Management
    `status` LowCardinality(String), -- "NEW", "CONTACTED", "SOLD", "FAKE"
    `sale_amount` Float32 DEFAULT 0,
    `notes` String,
    
    -- 🧠 Context Copy (Snapshot from Event)
    `city` LowCardinality(String),
    `district` LowCardinality(String),
    `intent_tag` LowCardinality(String), -- "Repair", "Rental", "SparePart"
    
    -- ⚙️ Versioning for Updates
    `ver` UInt64 DEFAULT toUnixTimestamp(now())
)
ENGINE = ReplacingMergeTree(ver)
ORDER BY phone; -- Fast lookup by phone number
How to Update a Lead: Don't run UPDATE. Run INSERT INTO leads_crm (phone, status, ver) VALUES ('90532...', 'SOLD', <new_timestamp>). ClickHouse will automatically show the latest status.

🔄 3. MATERIALIZED VIEWS (Real-Time Dashboards)
We don't query the huge stream_events table for charts. We pre-calculate stats as data comes in.

View: hourly_stats_mv
Salih wants to see: "How many visitors and leads today?"

SQL

-- 1. Create the Target Table
CREATE TABLE eslamed_db.hourly_stats
(
    `hour` DateTime,
    `district` LowCardinality(String),
    `total_visits` UInt32,
    `total_leads` UInt32,
    `avg_intent_score` Float32
)
ENGINE = SummingMergeTree
ORDER BY (hour, district);

-- 2. Create the Trigger (Materialized View)
CREATE MATERIALIZED VIEW eslamed_db.hourly_stats_mv TO eslamed_db.hourly_stats
AS SELECT
    toStartOfHour(timestamp) as hour,
    district,
    count() as total_visits,
    countIf(event_type = 'form_submit') as total_leads,
    avg(intent_score) as avg_intent_score
FROM eslamed_db.stream_events
GROUP BY hour, district;
⚡ 4. PERFORMANCE TUNING (Config)
Recommended users.xml settings for the ClickHouse server to handle high concurrency from Go.

XML

<profiles>
    <default>
        <async_insert>1</async_insert>
        <async_insert_busy_timeout_ms>200</async_insert_busy_timeout_ms>
        
        <max_compress_block_size>1048576</max_compress_block_size>
        
        <max_memory_usage>2000000000</max_memory_usage> </default>
</profiles>
📝 QUERY CHEAT SHEET (For Salih's Panel)
Since we don't have an ORM, here are the raw SQL queries the Go Backend will use.

1. Get "Critical" Leads (Repair/Emergency)
SQL

SELECT * FROM eslamed_db.leads_crm
FINAL -- Forces ClickHouse to merge versions and show latest status
WHERE status = 'NEW' 
  AND (intent_tag = 'Repair' OR intent_tag = 'Emergency')
ORDER BY created_at DESC
LIMIT 50;
2. Find GCLID for Offline Conversion Upload
SQL

SELECT gclid, created_at FROM eslamed_db.leads_crm
FINAL
WHERE phone = '905321234567'
  AND gclid != ''
LIMIT 1;
3. Analyze "Manometre" Waste (Spam Report)
SQL

SELECT count() as wasted_clicks, isp 
FROM eslamed_db.stream_events
WHERE intent_verdict = 'TRASH'
GROUP BY isp;