# 🛡️ 13_SECURITY_MATRIX.md (The Iron Dome Protocol)

![Security](https://img.shields.io/badge/Security-Multi--Layered-red?style=flat-square)
![Privacy](https://img.shields.io/badge/Privacy-KVKK_Compliant_Encryption-blue?style=flat-square)
![Defense](https://img.shields.io/badge/Bot_Defense-AI_Driven-success?style=flat-square)

> **"Bir sistemin gücü, en zayıf halkası kadardır. Bizde zayıf halka yok, sadece barikatlar var."**

This document outlines the security architecture for Eslamed. It balances aggressive tracking with legal safety and infrastructure protection.

---

## 🏗️ 1. LAYERED DEFENSE (Katmanlı Savunma)

| Layer | Technology | Function |
| :--- | :--- | :--- |
| **Edge** | Cloudflare (WAF) | DDoS protection, SQL Injection blocking, Country-level blocking. |
| **Transport** | SSL/TLS 1.3 | All data in transit is encrypted (HSTS Enabled). |
| **API** | Go Rate Limiter | Prevents brute-force on forms and tracking endpoints. |
| **Data** | SHA-256 Hashing | Sensitive IDs and Phone Numbers are masked/hashed for analytics. |

---

## 🕵️‍♂️ 2. THE "ANTI-SCRAPER" & BOT SHIELD

Rakiplerin fiyatlarımızı veya içeriklerimizi (Programmatic SEO sayfalarımızı) botlarla çekmesini engellemek için:

* **Behavioral Analysis:** Bir IP adresi 1 saniyede 10'dan fazla sayfaya erişmeye çalışırsa **"JS Challenge"** (Cloudflare) tetiklenir.
* **Honeypot URLs:** Sitede kullanıcıların göremeyeceği ama botların tarayacağı gizli linkler (`/admin/login.php` gibi) bulunur. Buraya tıklayan IP anında kalıcı olarak yasaklanır.
* **Headless Browser Detection:** Go servisi, gelen isteğin gerçek bir tarayıcıdan mı yoksa bir script'ten (Puppeteer/Selenium) mi geldiğini tarayıcı "parmak izi" (Fingerprint) üzerinden anlar.

---

## 🔒 3. PRIVACY & KVKK COMPLIANCE (Legal Shield)

Türkiye'de henüz "çerez yasası" Avrupa kadar sert olmasa da, veriyi işleme biçimimiz bizi korumalıdır.

* **PII Masking (Kişisel Veri Maskeleme):** * ClickHouse'un `stream_events` tablosunda telefon numaraları ASLA açık tutulmaz. 
    * Sadece `leads_crm` tablosunda (Salih'in eriştiği yer) açık tutulur.
    * Google Ads'e gönderilen veriler (GCLID hariç) SHA-256 ile hash'lenerek gönderilir.
* **Data Residency:** Tüm veriler Türkiye'ye en yakın ve güvenli lokasyon olan **Hetzner (Germany)** sunucularında, şifreli disk bölümlerinde (LUKS) tutulur.
* **Auto-Purge:** Satışa dönmeyen "çöp" lead verileri 90 gün sonra sistemden otomatik silinir.

---

## 🚀 4. GO API SECURITY (Backdoor Protection)

Go Backend servisimiz dış dünyaya sadece belirli kapıları açar:

1.  **Public Endpoints (`/api/track`, `/api/lead`):** Sadece POST kabul eder, içerik boyutu max 10KB ile sınırlıdır (Buffer Overflow koruması).
2.  **Admin Endpoints (`/api/admin/*`):** * Sabit bir şifre yerine **"Double-Key"** sistemi: `X-Admin-Secret` + `IP Whitelisting`.
    * Sadece Salih'in ve ofisimizin IP adreslerinden gelen talepler kabul edilir.

---

## 🚨 5. INCIDENT RESPONSE (Acil Durum Planı)

Sistem bir saldırı altında kalırsa veya veri ihlali şüphesi doğarsa:

* **Kill Switch:** Tek bir komutla tüm takip sistemi (`ghost.js`) devre dışı bırakılabilir, site "Static-Only" moduna geçer.
* **Alerting:** Go servisi, 5 dakika içinde %20'den fazla hata oranı alırsa Telegram üzerinden Salih'e ve teknik ekibe **"SEV1 CRITICAL"** uyarısı atar.
* **Backups:** ClickHouse verileri her 6 saatte bir şifrelenmiş (AES-256) şekilde off-site yedeklenir.

---

## 🧪 6. EXPERIMENTAL: "SPOOFING THE SPOOFERS"

Eğer bir rakip botu sitemizi tarıyorsa:
* **Fake Data:** Botu engellemek yerine ona **yanlış veriler** (farklı fiyatlar, farklı stok durumları) gösteren bir "Mirror" sayfa sunarız. 
* **Resource Exhaustion:** Botun bağlantısını çok yavaş (1 byte/sec) koparmadan tutarak rakibin tarama kaynaklarını tüketiriz (Tarpitting).

---

## 📝 7. LEGAL FOOTER (Önemli Not)

> **Warning:** Bu sistem "Aggressive Tracking" prensibiyle çalışır. `ghost.js` kütüphanesinin kullanımı ve veri toplama politikası, sitenin "Gizlilik Sözleşmesi" kısmında genel ifadelerle (Hizmet kalitesini artırmak, teknik analiz vb.) belirtilmelidir.
Analiz:

Legal Safe: KVKK riskine karşı veriyi "maskeleme" ve "sınırlı erişim" (IP Whitelist) ile koruyoruz.

Bot Defense: Rakiplerin programmatic SEO sayfalarımızı çalmasını "Honeypot" ve "Tarpitting" ile engelliyoruz.

Infrastructure: Cloudflare ve Go'nun kendi hız sınırlayıcıları (Rate Limiter) ile sunucuyu koruyoruz.