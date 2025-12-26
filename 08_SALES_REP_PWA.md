# 📱 08_SALES_REP_PWA.md (The Field Cockpit)

![Platform](https://img.shields.io/badge/Platform-PWA_(Progressive_Web_App)-blueviolet?style=flat-square)
![UX](https://img.shields.io/badge/UX-Thumb_Driven-success?style=flat-square)
![Sync](https://img.shields.io/badge/Sync-Offline_First-orange?style=flat-square)

> **"Salih bilgisayar başında oturmaz. Salih sahadadır. Bu panel, onun dijital asistanıdır."**

This document details the **Field Operations Progressive Web App (PWA)**.
It is designed with one goal: **Zero Friction.** If entering a sale takes more than 3 seconds, the design has failed.

---

## 🎨 1. UX PHILOSOPHY: "THE ONE-THUMB RULE"

Salih is likely driving, carrying an oxygen tank, or walking in a hospital.
* **Bottom Navigation:** All critical actions are at the bottom (reachable by thumb).
* **Haptic Feedback:** The phone **vibrates** when a sale is confirmed. (Psychological reward).
* **Dark Mode:** Default. Saves battery and looks cool in night shifts.

---

## 📱 2. THE DASHBOARD (The Radar)

When Salih opens the app, he sees the "Daily Scoreboard" and the "Inbox".

### A. The Scoreboard (Gamification)
*Top of the screen. Updates in real-time.*

> **📅 BUGÜN (Canlı):**
> 💰 **Ciro:** 17.850 TL
> 📦 **Dolum:** 14 Adet
> 🔥 **Google Puanı:** 98/100

### B. The Lead Inbox (Sorted by AI)
Leads are not sorted by date. They are sorted by **Opportunity**.

1.  **🚨 KIRMIZI (Acil / Ses Sorunu):**
    * *Text:* "AHMET YILMAZ - Cihazı Ötüyor!"
    * *Subtext:* "Ümraniye (Turkcell) - 2 dk önce"
    * *Action:* Swipe Right to Call instantly.
2.  **🔵 MAVİ (Yakın Konum):**
    * *Text:* "AYŞE DEMİR - Yeni Satış"
    * *Subtext:* "Sana 1.2km uzakta (Çakmak Mh)"
3.  **⚪ GRİ (Normal):**
    * *Text:* "MEHMET KAYA - Fiyat Sordu"

---

## 🔘 3. THE "ACTION MATRIX" (The Money Buttons)

When Salih clicks on a Lead, he sees the **"Deal Closing Interface"**.
Huge buttons. Impossible to miss.

| Button | Color | Meaning | Backend Signal | Trigger Logic |
| :--- | :--- | :--- | :--- | :--- |
| **SATILDI** | **Electric Blue** | **15.000 TL** | `purchase_device` | Marks lead closed. Sends high-value signal. |
| **KİRALANDI** | **Neon Green** | **2.500 TL** | `rental_start` | Starts **30-Day Subscription Timer** in CRM. |
| **DOLUM YAPILDI** | **Sunset Orange** | **350 TL** | `refill_recurring` | Starts **20-Day Refill Reminder**. Does NOT close lead. |
| **SERVİS / TAMİR** | **Warning Yellow** | **750 TL** | `service_lead` | Logs repair revenue. |
| **ÇÖP / BOŞ** | **Gray** | **0 TL** | `junk_lead` | Tells Google: "Don't find people like this." |

---

## ⚡ 4. SPECIAL FEATURE: "HIZLI DOLUM" (Quick Refill)

**Scenario:** An old customer calls Salih directly. They are not in the "New Lead" list.
**Problem:** Salih needs to log the 350 TL Refill to keep stats correct, but he can't find the user.

**Solution: The FAB (Floating Action Button)**
1.  Salih clicks the big **"+"** button on the home screen.
2.  Enters **Last 4 Digits** of phone number.
3.  System shows: *"Ahmet Yılmaz (Ümraniye) mi?"*
4.  Salih taps **"DOLUM YAP"**.
5.  **Done.** (2.5 seconds total).

---

## 🛠️ 5. TECHNICAL ARCHITECTURE (Offline-First)

The app must work in hospital basements where there is no signal.



```mermaid
graph LR
    Action[User Clicks 'SOLD'] -->|1. Store| LocalDB[📱 IndexedDB (Phone Storage)]
    
    LocalDB -->|2. Background Sync| SW[⚙️ Service Worker]
    
    SW -- No Internet --> Wait[⏳ Queue Action]
    SW -- Internet OK --> API[🚀 Send to Server]
    
    API -->|3. Confirm| Notify[✅ Update UI Score]
Technology Stack
Framework: Next.js (PWA Mode) or React Native (if native features needed).

Local DB: Dexie.js (Wrapper for IndexedDB).

State: TanStack Query (Manages offline/online sync automatically).

🔔 6. NOTIFICATION STRATEGY (Smart Alerts)
We don't spam Salih. We only nudge him for money.

"New Lead" (Sound: Cash Register):

"Acil Müşteri! Ümraniye'de oksijen tüpü arıyor."

"Refill Reminder" (Sound: Ping):

"Mehmet Amca'nın tüpü bitmek üzeredir (20 gün oldu). Ara ve dolum sat!"

Button: "Şimdi Ara"

"Zone Alert" (Geo-Fencing):

"Şu an Beylikdüzü'ndesin. Burada bekleyen 3 arama var. Gitmişken hallet!"

🔒 7. SECURITY & INSTALLATION
No App Store: Distributed via private URL (admin.eslamed.com).

Installation: "Add to Home Screen" (Manifest.json).

Auth: Phone Number Login + SMS OTP (One Time Password).

Session: Persistent (30 days). No daily login required.