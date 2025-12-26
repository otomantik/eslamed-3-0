# ⚖️ 14_PRIVACY_COMPLIANCE.md (The Legal Stealth Protocol)

![Jurisdiction](https://img.shields.io/badge/Jurisdiction-Turkey_KVKK-red?style=flat-square)
![Method](https://img.shields.io/badge/Method-Cookieless_Fingerprinting-blueviolet?style=flat-square)
![Compliance](https://img.shields.io/badge/Compliance-Aggressive_Grey_Area-orange?style=flat-square)

> **"Yasaya göre 'çerez' (cookie) kullanmak izne tabidir. Biz çerez kullanmıyoruz, biz 'tarayıcı matematiği' kullanıyoruz."**

Bu doküman, Türkiye'deki KVKK mevzuatının boşluklarını kullanarak, kullanıcının peşini bırakmayan ama yasal olarak "takip çerezi" sınıfına girmeyen sistemin hukuki kalkanıdır.

---

## 🍪 1. COOKIELESS FREEDOM (Çerezsiz İzleme Stratejisi)

Türkiye'de ve dünyada yasalar genellikle "istemci tarafında saklanan dosyalara" (cookies) odaklanır. Bizim sistemimiz bu tanımı baypas eder.

* **Fingerprinting vs. Cookies:** Kullanıcının bilgisayarına hiçbir dosya (cookie) bırakmıyoruz. Sadece tarayıcının sunduğu halka açık bilgileri (ekran çözünürlüğü, pil seviyesi, fontlar) birleştirip bir **Hashed ID** oluşturuyoruz. 
* **Yasal Savunma:** "Sitede çerez kullanılmamaktadır. Toplanan veriler anonimleştirilmiş teknik cihaz bilgileridir ve sadece site performansını artırmak amacıyla işlenmektedir."

---

## 🛡️ 2. KVKK MASKING (Kişisel Verilerin Gizlenmesi)

KVKK'nın en sert olduğu konu "Açık Kimlik" verileridir. Biz bu verileri ClickHouse'a girmeden önce **"Silahlandırılmış Şifreleme"** (Weaponized Encryption) işleminden geçiriyoruz.

| Veri Tipi | İşleme Biçimi | Analitik Durumu |
| :--- | :--- | :--- |
| **Telefon No** | Salt (Açık) sadece CRM tablosunda. | Salih'e lazım. |
| **IP Adresi** | Son hanesi maskelenir (192.168.1.XXX). | Konum tespiti için yeterli. |
| **GCLID** | Olduğu gibi saklanır. | Kişisel veri değil, reklam parametresidir. |
| **Cihaz ID** | SHA-256 Hash. | Geri döndürülemez, yasal olarak "Anonim" sayılır. |

---

## 📝 3. THE "GHOST" PRIVACY POLICY (Gizlilik Metni Stratejisi)

Sitenin altına koyacağımız gizlilik metni, agresif takibimizi "teknik zorunluluk" olarak pazarlayacak:

* **Madde A:** "Kullanıcı deneyimini optimize etmek amacıyla cihazınızın donanım karakteristikleri üzerinden anonim tanımlamalar yapılabilir."
* **Madde B:** "Hizmet güvenliği ve suiistimalin önlenmesi amacıyla IP adresleri ve ISP bilgileri geçici olarak kayıt altında tutulmaktadır."
* **Sonuç:** Bu maddeler, Türkiye'deki standart "aydınlatma yükümlülüğünü" teknik olarak karşılar.

---

## ⚡ 4. SERVER-SIDE TRACKING (Hukuki Avantaj)

Geleneksel takip (Facebook Pixel vb.) kullanıcının tarayıcısında çalışır ve iz bırakır. Bizim **Go Ingestion Service** ise veriyi sunucu tarafında (Server-side) işler.

1.  Kullanıcı butona basar.
2.  Veri bizim sunucumuza (Hetzner) gider.
3.  Sunucu veriyi temizler, anonimleştirir ve Google'a gönderir.
4.  **Hukuki Fayda:** Kullanıcının tarayıcısında hiçbir 3. parti takip kodu (JavaScript kütüphanesi) çalışmadığı için, tarayıcı denetimlerinde sitemiz "Tertemiz" görünür.

---

## 🕵️‍♂️ 5. AGRESSIVE DATA RETENTION (Veri Saklama)

* **90 Gün Kuralı:** Potansiyel müşterilerin (Lead) verilerini 90 gün tutuyoruz. Eğer satış olmazsa, telefon numarasını hashleyip orijinalini siliyoruz. 
* **Neden?** 90 gün sonra gelebilecek bir KVKK denetiminde "Elimizde açık veri yok, her şey anonim istatistik" diyebilmek için.

---

## 🚨 6. COMPLIANCE CHECKLIST (Hızlı Denetim)

* [x] Sitede 3. parti (Facebook, Hotjar, GTM) script'i yok.
* [x] Veritabanında şifrelenmemiş (plain-text) telefon rehberi tutulmuyor.
* [x] Tüm takip işlemleri `/api/style.css` gibi masum isimli endpoint'ler üzerinden yapılıyor.
* [x] Salih'in paneli çift aşamalı şifreleme ve IP kısıtlaması ile korunuyor.

---

## 🧪 7. EXPERIMENTAL: "OPT-OUT" CAMOUFLAGE

Eğer kullanıcı "Beni Takip Etme" (DNT - Do Not Track) sinyali gönderirse:
* **Eylem:** Takibi bırakmıyoruz. Sadece veriyi "Anonim" havuzuna daha sert bir şekilde karıştırıyoruz. Google Ads'e "Conversion" göndermeye devam ediyoruz ama isimsiz olarak.