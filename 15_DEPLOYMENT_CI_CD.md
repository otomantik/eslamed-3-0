# 🚀 15_DEPLOYMENT_CI_CD.md (The Ignition Protocol)

![Pipeline](https://img.shields.io/badge/Pipeline-GitHub_Actions-2088FF?style=flat-square)
![Container](https://img.shields.io/badge/Container-Docker_Compose-2496ED?style=flat-square)
![Uptime](https://img.shields.io/badge/Uptime-99.9%25-brightgreen?style=flat-square)

> **"Code is liability. Running code is an asset. We automate the transition from liability to asset."**

This document defines the automated deployment pipeline for Eslamed. We use a hybrid strategy: **Vercel** for the UI and **Hetzner Bare Metal** for the Go/ClickHouse engine.

---

## 🏗️ 1. INFRASTRUCTURE MAP

| Component | Provider | Specs | Role |
| :--- | :--- | :--- | :--- |
| **Frontend** | Vercel | Edge Network | Static SSR, Global CDN, SSL Management. |
| **Backend API** | Hetzner Cloud | CPX21 (3 vCPU, 4GB RAM) | Go Ingestion Service (The Heart). |
| **Database** | Hetzner Cloud | Local NVMe SSD | ClickHouse (The Memory). |
| **DNS/WAF** | Cloudflare | Pro Plan | Proxy, Bot Fight Mode, DDoS Shield. |

---

## 🛠️ 2. DOCKER ORCHESTRATION (The Backend Stack)

We use a `docker-compose.yml` to keep the Go Service and ClickHouse in a private network, isolated from the public internet.

```yaml
# Simplified Production Stack
services:
  ingestion-api:
    image: eslamed/backend:latest
    restart: always
    environment:
      - CLICKHOUSE_URL=http://clickhouse:8123
      - GOOGLE_ADS_API_KEY=${GOOGLE_ADS_KEY}
    networks:
      - internal-net
    ports:
      - "8080:8080"

  clickhouse:
    image: clickhouse/clickhouse-server:latest
    volumes:
      - ./data:/var/lib/clickhouse
    networks:
      - internal-net
🔄 3. CI/CD WORKFLOW (GitHub Actions)
Every time we push to the main branch, the following happens automatically:

Phase A: The Frontend (Vercel)
Vercel detects the push.

Runs npm run build (Programmatic SEO pages are generated).

Deploys to Global Edge Nodes.

Result: Site is live in < 2 minutes.

Phase B: The Backend (GitHub Actions -> Hetzner)
Test: Runs Go unit tests & Linting.

Build: Compiles the Go binary into a small Docker image.

Push: Uploads the image to a private Registry.

Deploy: Sends a signal to the Hetzner VPS to pull the new image and restart.

Mechanism: Blue/Green Deployment (The old version stays alive until the new one is healthy).

🛡️ 4. SECURE ENVIRONMENT VARIABLES
We NEVER hardcode keys.

Frontend: Managed in Vercel Dashboard.

Backend: Stored in GitHub Secrets and injected into the VPS during deployment via an encrypted .env file.

📈 5. MONITORING & HEALTH CHECKS
If the system fails, we need to know before Salih does.

Health Endpoint: GET /api/health

Returns 200 OK if Go can talk to ClickHouse.

If it returns 500, the Load Balancer automatically routes traffic to a "Maintenance" page.

Logs: We use Vector.dev to stream Go logs into a separate ClickHouse table for real-time debugging.

🚨 6. THE "RECOVERY" COMMANDS
In case of a server meltdown, Salih (or the dev) can run these emergency commands via SSH:

Bash

# Emergency Restart
docker-compose restart

# View Real-time Ingestion Logs
docker-compose logs -f ingestion-api

# Check Database Disk Usage
du -sh ./data
🧪 7. EXPERIMENTAL: "CANARY DEPLOYMENTS"
When we update the Intent Scoring AI, we only deploy it to 5% of the traffic (e.g., only users in Ümraniye).

If the conversion rate for Ümraniye drops, we auto-rollback.

If it increases, we push to the remaining 95% of Istanbul.