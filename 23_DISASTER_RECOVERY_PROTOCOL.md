# 🚨 23_DISASTER_RECOVERY_PROTOCOL.md (The Blackout Plan)

![Reliability](https://img.shields.io/badge/Reliability-99.99%25-red?style=flat-square)
![RTO](https://img.shields.io/badge/Recovery_Time-15_Mins-blueviolet?style=flat-square)
![Backups](https://img.shields.io/badge/Data_Safety-AES_256_Encrypted-success?style=flat-square)

> **"Servers can fail. Data centers can burn. Our business stays alive. Because 'Oxygen' doesn't wait."**

---

## 🏗️ 1. REDUNDANCY LAYERS (Yedeklilik Katmanları)

We don't put all our eggs in one basket. Our infrastructure is split to prevent single-point-of-failure.

* **Primary Stack:** Hetzner Cloud (Germany/Finland) - High performance.
* **Secondary Stack (Shadow):** DigitalOcean or AWS (Frankfurt) - Pre-configured and dormant.
* **Edge Layer:** Cloudflare - If our server goes down, Cloudflare shows a "Smart Offline" version of Eslamed with direct WhatsApp links.

---

## 📂 2. DATA SURVIVAL (Veri Güvenliği)

ClickHouse verileri ve Salih'in CRM kayıtları için 3-2-1 kuralı:

1.  **3 Copies:** Ana veritabanı, yerel yedek ve bulut yedeği.
2.  **2 Formats:** SQL Dump ve Disk Snapshot.
3.  **1 Off-site:** Tüm yedekler Hetzner dışındaki bir S3 Storage (AWS veya Wasabi) üzerinde şifreli saklanır.
4.  **Frequency:** Her 6 saatte bir tam yedek, her 15 dakikada bir "In-memory" senkronizasyon.

---

## ⚡ 3. AUTOMATED FAILOVER (Anında Geçiş)

If the Go Backend stops responding:

1.  **Health Check:** Cloudflare detects a `5xx` error.
2.  **DNS Switch:** Cloudflare automatically routes traffic to our **Backup Server**.
3.  **Salih's Notification:** A Telegram alert is sent: *"Primary server down. Switching to Emergency Mode. No data lost."*

---

## 📱 4. THE "SURVIVAL MODE" PWA

If the entire internet is slow or the database is locked:
* **Offline First:** Salih'in PWA'sı son 24 saatin verisini telefonun **IndexedDB**'sinde tutar.
* **Write Buffer:** Salih yeni bir dolum girdiğinde, sistem önce telefona yazar, bağlantı geldiği an sunucuya "Replay" yapar.

---

## 🕵️‍♂️ 5. EXPERIMENTAL: "THE GHOST MIRROR"

In case of a massive DDoS attack or a legal domain block:
* **Shadow Domains:** Sistem hazırda `eslamed-servis.com` gibi yedek bir domain tutar.
* **Switch:** Tek komutla tüm reklam ve SEO trafiği bu "ayna" domain'e kaydırılır.

---

## 📝 6. STEP-BY-STEP RECOVERY GUIDE (The Checklist)

If everything crashes, Salih (or Dev) follows this:

1.  **Check Cloudflare Status:** Is it global or local?
2.  **Run Restore Script:** `docker-compose -f recovery.yml up -d` (Pulls latest S3 backup).
3.  **Verify Integrity:** Run `go test ./internal/recovery` to ensure data is consistent.
4.  **Resume PMax:** Turn Google Ads back on once the "Handshake" is green.

---

## 📊 7. LOGGING THE DISASTER

Every failure is a lesson. We store **Post-Mortem Reports** in ClickHouse:
* `incident_id`: UUID
* `downtime_seconds`: Total time offline
* `root_cause`: Hardware / Software / Attack
* `resolution`: How we fixed it.