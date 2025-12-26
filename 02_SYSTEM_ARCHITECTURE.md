# 🏗️ 02_SYSTEM_ARCHITECTURE.md (The Lean Capture Engine)

![Architecture](https://img.shields.io/badge/Architecture-Headless_%2B_Edge-blueviolet?style=flat-square)
![Backend](https://img.shields.io/badge/Backend-Go_(Golang)-00ADD8?style=flat-square)
![Database](https://img.shields.io/badge/Database-ClickHouse-FFCC00?style=flat-square)
![Hosting](https://img.shields.io/badge/Hosting-Hetzner_Cloud-D50C2D?style=flat-square)

> **"No Cart. No Checkout. No Latency. Just Pure Connection."**

This document outlines the technical blueprint for the Eslamed Platform.
The architecture is designed strictly for **Service & Lead Generation**.
Since there are no online payments or dynamic pricing, the Frontend is decoupled from the Database. The Database exists solely to record **User Behavior (Tracking)** and **Business Leads (CRM)**.

---

## 📐 SYSTEM DIAGRAM (High-Level Data Flow)

This is a **Event-Driven Architecture** optimized for write-heavy workloads.

```mermaid
graph TD
    %% FRONTEND LAYER
    User[Visitor (Browser/Mobile)] -->|1. Request Page| Edge[Cloudflare / Vercel Edge]
    Edge -->|2. Deliver Static HTML (SSG)| Frontend[Next.js App Router]
    
    %% INGESTION LAYER
    User -->|3. Send Event (Beacon/XHR)| GoService[🐹 Go Ingestion Service]
    GoService -.->|Internal GeoIP Lookup| MMDB[(MaxMind Local DB)]
    
    %% PERSISTENCE LAYER (DOCKER @ HETZNER)
    subgraph "Backend Core (Hetzner VPS)"
        GoService -->|4. Buffer & Batch Write (Every 1s)| CH[(⚡ ClickHouse DB)]
        
        Salih[Salih (Admin PWA)] -->|5. View Leads & Stats| GoService
        Salih -->|6. Mark as 'SOLD' (Offline Conv)| GoService
    end
    
    %% EXTERNAL SIGNALS
    GoService -->|7. Conversion Signal (S2S API)| GoogleAds[Google PMax API]
    GoService -->|8. Push Notification| WhatsAppAPI[Salih's WhatsApp / Telegram]
🛠️ TECHNOLOGY STACK (The Lean Stack)
We have removed all bloatware. There is no Redis, no PostgreSQL, and no RabbitMQ.

1. Frontend: Next.js (The Face)
Framework: Next.js 14+ (App Router).

Rendering Strategy: Static Site Generation (SSG).

Reason: Prices and content do not change every minute. Pages are pre-built at build time.

Latency: 0ms Database Latency (Pages are just HTML files on the Edge).

Key Components:

Polymorphic UI: Components that change based on URL params (e.g., /acil shows different buttons than /fiyat).

Sticky Mobile Bar: Persistent "Call Now" footer for mobile users.

2. Backend: Go (The Traffic Cop)
Language: Go (Golang) 1.22+.

Hosting: Hetzner Cloud (Ubuntu VPS + Docker).

Responsibility:

Ingestion: Receives POST /api/track (Clicks) and POST /api/lead (Forms).

Enrichment: Adds Geo-Location (City/District) to leads instantly using local .mmdb files (No external API calls).

Batching: Buffers incoming events in RAM using Go Channels and flushes them to ClickHouse every 1 second or 1000 events.

Notification: Sends immediate alert to Salih when a form arrives.

Auth: Simple API Key protection for Admin endpoints (Hardcoded ADMIN_SECRET in .env).

3. Database: ClickHouse (The Memory)
Role: Strictly for Analytics & CRM. NOT for content management.

Why ClickHouse?

Handles millions of inserts per second.

Compresses data by 90% (Saves disk space).

SQL-based (Familiar syntax).

Tables:

events: Raw logs (Pageview, Button Click, Scroll, Error).

leads: Form submissions (Name, Phone, GCLID, Timestamp).

conversions: Sales confirmed by Salih (Revenue, Deal Type).

⚡ CORE WORKFLOWS (How it Works)
Workflow A: The "Ghost" Tracking (Ziyaretçi Takibi)
Trigger: User lands on /hizmetler/oksijen-tupu.

Action: tracking.js (<1KB) sends a silent beacon to Go Service:

JSON

{ "type": "pageview", "gclid": "AbCd...", "url": "/hizmetler...", "ref": "google" }
Process: Go Service calculates Geo-Location (e.g., "Istanbul/Bagcilar") from IP.

Storage: Data is buffered in RAM and flushed to ClickHouse asynchronously. User feels 0 latency.

Workflow B: The Lead Capture (Form/WhatsApp)
Trigger: User clicks "WhatsApp" or fills the "Hemen Ara" form.

Action: Frontend sends payload to Go Service.

Process: Go Service immediately:

Persists lead to leads table in ClickHouse.

Sends a Push Notification to Salih's PWA.

Critical: The gclid (Google Click ID) is permanently attached to this phone number in the DB for future attribution.

Workflow C: The Offline Conversion (Satış Bildirimi)
The most critical workflow for PMax Optimization.

Trigger: Salih talks to the customer and closes a deal (e.g., 15.000 TL Sale).

Action: Salih opens the Admin PWA, finds the lead (by phone number), and clicks "Satış Onayla".

Process:

Go Service updates the lead status in ClickHouse to CONVERTED.

Go Service retrieves the original gclid (from days ago).

Go Service sends a UPLOAD_CLICK_CONVERSION request to Google Ads API.

Result: Google PMax algorithm learns that this specific user profile generates revenue.

🔐 SECURITY & INFRASTRUCTURE SPECS
Server Specifications (Economical & Fast)
Provider: Hetzner Cloud (Falkenstein/Germany DC).

Type: CPX11 (2 vCPU, 4GB RAM, 40GB NVMe).

Cost: ~€5 / month.

OS: Ubuntu 22.04 LTS + Docker Compose.

Security Layers
Cloudflare: First line of defense (DDoS Protection, Bot Fight Mode, WAF).

Internal Auth: No complex user management.

Public API (/api/track): Rate-limited by IP.

Admin API (/api/admin): Protected by X-Admin-Secret header.

Data Privacy: Phone numbers are stored in ClickHouse. Access is restricted to Salih's IP or valid Admin Token only.

⚠️ DISASTER RECOVERY (Backup Protocol)
Since we are running on a single VPS (Single Point of Failure), we need a robust backup strategy.

Code: Hosted on GitHub (Private Repository).

Leads Data:

Automated Script: A nightly cronjob runs on the VPS.

Action:

Executes clickhouse-client --query "SELECT * FROM leads..." > backup_leads_$(date).csv

Compresses the CSV (gzip).

Uploads to a private AWS S3 Bucket or Google Drive.

Recovery Time Objective (RTO): < 30 minutes (Time to spin up new VPS and import data).