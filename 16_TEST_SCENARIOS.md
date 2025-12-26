# 🧪 16_TEST_SCENARIOS.md (The Stress Test)

![Status](https://img.shields.io/badge/Status-Final_Verification-success?style=flat-square)
![Focus](https://img.shields.io/badge/Focus-Reliability_%26_Accuracy-blueviolet?style=flat-square)

> **"Sistem sadece normal şartlarda değil, en zor şartlarda da çalışmalı. İşte sistemin sınav kağıdı."**

---

## 🧪 TEST 1: The "Adblock Ghost" (Takip Kaçağı Testi)
* **Senaryo:** Kullanıcı tarayıcısında "uBlock Origin" veya "AdBlock Plus" gibi en sert engelleyicilerle siteye girer.
* **Beklenen Sonuç:** 1.  Browser konsolunda hiçbir "Blocked by Client" hatası görülmemeli.
    2.  Go Ingestion Service (`/api/style.css` görünümlü endpoint) veriyi başarıyla almalı.
    3.  ClickHouse'da `is_adblock_detected: true` olarak kayıt düşmeli.

## 🧪 TEST 2: The "Basement Connection" (İnternetsiz Satış Testi)
* **Senaryo:** Salih hastane bodrum katında interneti yokken PWA üzerinden "DOLUM YAPILDI" butonuna basar.
* **Beklenen Sonuç:**
    1.  Uygulama hata vermemeli, "İşlem kaydedildi, internet gelince senkronize edilecek" demeli.
    2.  Salih asansörden çıkıp internete bağlandığında, veri otomatik olarak Go Backend'e uçmalı.

## 🧪 TEST 3: The "Manometre vs. Ses" (AI Zekası Testi)
* **Senaryo:** * A kişisi "Oksijen tüpü manometre fiyatı" yazıp formu doldurur.
    * B kişisi "Cihazım çok ses çıkarıyor acil servis" yazıp formu doldurur.
* **Beklenen Sonuç:**
    1.  A kişisinin `intent_score` puanı 20'nin altında kalmalı (Salih'e bildirim gitmemeli).
    2.  B kişisinin puanı 90+ olmalı ve Salih'in telefonuna **"ACİL SATIŞ FIRSATI"** bildirimi düşmeli.

## 🧪 TEST 4: The "Time Machine" (Geriye Dönük Veri Testi)
* **Senaryo:** Müşteri Pazartesi reklamı tıklar, Cuma günü Salih satışı onaylar.
* **Beklenen Sonuç:**
    1.  Google Ads API'ye giden `conversion_date` Pazartesi gününün tarihini taşımalı.
    2.  Google Ads panelinde satış "Pazartesi" sütununa yazılmalı (PMax'in en iyi öğrendiği yer burasıdır).

## 🧪 TEST 5: The "Scraper Defense" (Cloudflare Pro Testi)
* **Senaryo:** Bir rakip, bir script yazarak sitemizdeki tüm ilçe sayfalarını 30 saniye içinde çekmeye çalışır.
* **Beklenen Sonuç:**
    1.  Cloudflare Pro (WAF) bu ani trafiği fark etmeli.
    2.  Botu ya tamamen bloklamalı ya da önüne "JS Challenge" (Doğrulama) çıkarmalı.

## 🧪 TEST 6: The "Refill Reminder" (Dolum Hatırlatıcı Testi)
* **Senaryo:** Salih bugün bir dolum işlemi girer.
* **Beklenen Sonuç:**
    1.  ClickHouse'da bu kullanıcı için bir "Next Refill" tarihi (Bugün + 20 gün) atanmalı.
    2.  Go Worker servisi, 20 gün sonra Salih'e Telegram/Push üzerinden "Zamanı geldi" uyarısı atmalı.