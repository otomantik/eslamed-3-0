# 🌉 07_OFFLINE_SALES_BRIDGE.md (The PMax Feedback Loop)

![API Status](https://img.shields.io/badge/Google_Ads_API-Offline_Conversion_Import-4285F4?style=flat-square)
![Strategy](https://img.shields.io/badge/Strategy-LTV_%26_Retention-success?style=flat-square)
![Data Integrity](https://img.shields.io/badge/Logic-Retroactive-blueviolet?style=flat-square)

> **"Rakipleriniz Google'a sadece tıklamaları fısıldıyor. Biz ise paranın sesini dinletiyoruz."**

This document details the architecture for the **Offline Conversion Import (OCI)** system.
It bridges the gap between the "Real World" (Salih's Phone) and the "Digital World" (Google PMax Algorithms), focusing heavily on distinguishing **One-Time Sales** from **Recurring Refills (Dolum)**.

---

## 🏛️ 1. THE STRATEGY: VALUE-BASED BIDDING

We do not just send "A conversion happened". We tell Google exactly **how much money** that conversion is worth and **what type** of customer it represents.

### The Value Matrix (Salih's Buttons)
Salih will press specific buttons in the PWA. The Backend maps these to unique Google Conversion Actions.

| Action Button | Backend Value (TRY) | Google Conversion Action | Strategic Signal |
| :--- | :--- | :--- | :--- |
| **🔵 CİHAZ SATIŞI** | **15.000 TL** | `purchase_device_main` | **High Margin.** Find "Rich & Desperate" buyers. |
| **🟢 KİRALAMA** | **2.500 TL** | `rental_start` | **Subscription.** Find users looking for temporary solutions. |
| **🟠 TÜP DOLUMU** | **350 TL** | `refill_service_recurring` | **Retention.** Find local, repeat customers. |
| **🟡 SERVİS/TAMİR** | **750 TL** | `technical_service` | **Lead Gen.** Find users with broken competitor devices. |
| **⚪ YEDEK PARÇA** | **150 TL** | `spare_parts` | **Low Priority.** Don't optimize PMax for this. |

> **🔥 Dolum (Refill) Stratejisi:**
> Dolum işlemi 350 TL gibi görünse de, bir KOAH hastası ayda 4 kez dolum yapabilir (Aylık 1.400 TL).
> Google'a `refill_service_recurring` sinyalini göndererek, sadece cihaz alanları değil, **sürekliliği olan (Abone)** müşterileri de bulmasını sağlıyoruz.

---

## ⚙️ 2. THE ARCHITECTURE (Data Flow)

```mermaid
graph TD
    Salih[👨‍💼 Salih (Admin PWA)] -->|1. Clicks 'DOLUM YAPILDI'| GoService[🐹 Go Bridge Service]
    
    subgraph "The Time Machine Logic"
        GoService -->|2. Query Phone Number| CH[(⚡ ClickHouse)]
        CH -->|3. Return GCLID + Click Timestamp| GoService
    end
    
    GoService -->|4. Construct Payload| Payload{Proto Buffer}
    
    subgraph "Google Cloud"
        Payload -->|5. UploadConversion (Action: Refill)| GoogleAds[📢 Google Ads API]
    end
    
    GoogleAds -->|6. Success| GoService
    GoService -->|7. Start 20-Day Timer| Reminder[⏰ Refill Reminder]
🧠 3. THE "TIME MACHINE" LOGIC (Retroactive Attribution)
The most critical part of this bridge is Time Matching. If a user clicked on Monday but bought on Friday, telling Google the sale happened on Friday is inaccurate.

The Algorithm
Input: Phone Number 90532xxxxxxx.

Lookup: Find the last valid GCLID associated with this phone number in ClickHouse.

Extraction: Get the timestamp of that specific row.

Formatting: Convert timestamp to Google's format: yyyy-mm-dd HH:mm:ss+03:00.

Payload:

JSON

{
  "gclid": "Cj0KCQjwnBWlBhCuARIsABQ...",
  "conversionAction": "projects/123/conversionActions/refill_service_recurring",
  "conversionDateTime": "2023-10-25 14:30:00+03:00", // The CLICK Time (Monday)
  "conversionValue": 350,
  "currencyCode": "TRY"
}
🔄 4. THE RECURRING REVENUE LOOP (Dolum Döngüsü)
How do we handle a user who refills every week? Since a single GCLID (Click) can usually accept only one conversion per action type, we need a smart strategy.

Strategy: "Acquisition" vs "Retention"
First Refill (The Hook):

Linked to the Ad Click.

Action: Send to Google Ads immediately.

Goal: Teach Google "This ad brought a paying customer".

Subsequent Refills (The Profit):

Usually happens via direct call/WhatsApp (No new ad click).

Action: Do NOT send to Google (Avoid "Duplicate Conversion" errors).

Internal: Log in ClickHouse as "Organic LTV".

Exception: If the user clicked an ad again (e.g., searched "Nöbetçi Dolum" at night), link to the new GCLID.

💻 5. IMPLEMENTATION SPECS (Go Service)
This module runs as a background worker to prevent UI blocking.

Google Ads API Client
We use the official Google Ads Go Client Library.

Authentication
Method: Service Account (JSON Key).

Storage: Encrypted in Hetzner Server Environment Variables (GOOGLE_ADS_JSON).

Handling Errors (The Retry Protocol)
Google API is strict. We must handle common rejections:

"Expired GCLID": If the click is > 90 days old.

Action: Log as "Organic Sale" in ClickHouse. Do not retry.

"Click Too Recent": If the click was < 6 hours ago, Google might not have processed it yet.

Action: Queue for retry in 4 hours.

"Conversion Already Exists": If we try to upload the same refill twice.

Action: Ignore and mark as success in local DB.

🔄 6. THE RETRACTION PROTOCOL (Refund Handling)
If a customer returns the device the next day, we must tell Google to "Forget this conversion". Otherwise, the AI learns from a mistake.

Workflow
Salih clicks "İPTAL / İADE" on the Lead Detail page.

Go Service identifies the conversion_id previously sent.

Go Service calls the Retract endpoint of Google Ads API.

Result: Google removes the data point from the algorithm learning set.

📝 7. SQL LOOKUP QUERY (ClickHouse)
This is the query the Go Service runs to find the "Golden Ticket" (GCLID).

SQL

SELECT 
    gclid, 
    formatDateTime(timestamp, '%Y-%m-%d %H:%M:%S+03:00') as click_time,
    intent_score,
    intent_verdict
FROM eslamed_db.stream_events
WHERE 
    -- Link via Phone Number stored in Leads table
    visitor_id IN (
        SELECT visitor_id FROM eslamed_db.leads_crm WHERE phone = ?
    )
    AND gclid != ''           -- Must have a Google Click ID
    AND timestamp > now() - INTERVAL 90 DAY -- Google's attribution limit
ORDER BY timestamp DESC       -- Get the most recent interaction
LIMIT 1;
🚨 8. OPERATIONAL RULES FOR SALIH
To make this system work, the human element must be disciplined.

"Lead"siz Satış Yok: Even if a customer walks into the office, Salih must create a Lead entry with their phone number in the system first.

Dolum Butonu Disiplini: Do not press "Satış" (15.000 TL) for a "Dolum" (350 TL). It will ruin the ROAS calculation.

Delay is Okay: Salih doesn't need to click "Sold" the exact second money changes hands. He can do it at the end of the day. The "Time Machine" logic will fix the timestamps anyway.

WhatsApp Matching: If a customer writes on WhatsApp, Salih enters the number into the system. The system auto-matches it with the visitor who clicked the "WhatsApp" button 5 minutes ago.