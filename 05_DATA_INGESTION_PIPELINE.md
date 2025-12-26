# 05_DATA_INGESTION_PIPELINE.md
## GHOST INGESTION ENGINE (Go Backend)
**Role:** High-performance event receiver.
**Route Handling:**
- Incoming: POST /api/track/style.css
- Middleware: 'GhostRewrite' intercepts this specific path.
- Action: Decodes payload -> Validates -> Pushes to ClickHouse buffer.
**Buffer:** Memory-based batching (flush every 500ms or 100 events).