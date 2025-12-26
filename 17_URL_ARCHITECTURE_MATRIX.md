# 🗺️ 17_URL_ARCHITECTURE_MATRIX.md (The Complete Site Map)

![SEO](https://img.shields.io/badge/SEO-Silo_Architecture-blueviolet?style=flat-square)
![Scale](https://img.shields.io/badge/Total_URLs-200+-success?style=flat-square)
![Data](https://img.shields.io/badge/Data_Source-Google_Ads_Reports-orange?style=flat-square)

> **"Bu liste, Eslamed'in dijital dünyadaki sınırlarını çizer. Boşta tek bir anahtar kelime, cevapsız tek bir ilçe kalmayacak."**

---

## 🏠 1. STATIC CORE PAGES (Temel Sayfalar)

Sitenin ana iskeletini oluşturan, her zaman aktif olan sayfalar.

| URL Path | Purpose | Key Content |
| :--- | :--- | :--- |
| `/` | **Anasayfa** | Tüm hizmetlerin özeti, Canlı Destek, Hızlı Arama. |
| `/hakkimizda` | **Güven** | Salih'in uzmanlığı, 7/24 hizmet vizyonu. |
| `/iletisim` | **İrtibat** | Ofis konumu, Tüm telefonlar, Google Maps entegrasyonu. |
| `/blog` | **Eğitim** | "Oksijen tüpü nasıl kullanılır?", "KOAH nedir?" rehberleri. |

---

## ⚡ 2. SERVICE SILOS (Ana Hizmet URL'leri)

Raporlardaki en yüksek tıklama alan anahtar kelimelere göre optimize edilmiş ana kategoriler.

| Service | Master URL | Keywords (from Report) |
| :--- | :--- | :--- |
| **Dolum** | `/oksijen-tupu-dolumu` | "oksijen tüpü dolumu", "tüp doldurma" |
| **Kiralama** | `/oksijen-cihazi-kiralama` | "oksijen konsantratörü kiralama", "cihaz kiralama" |
| **Satış** | `/oksijen-tupu-fiyatlari` | "oksijen tüpü fiyatları", "ev tipi tüp fiyatı" |
| **Satış (Cihaz)** | `/oksijen-makinesi-fiyatlari` | "oksijen makinesi fiyatları", "en ucuz cihaz" |
| **Tamir** | `/oksijen-cihazi-tamiri` | "servis", "arıza", "ses yapıyor", "bozuldu" |
| **CPAP/BPAP** | `/cpap-cihazi-kiralama` | "cpap cihazı kiralama", "uyku apnesi cihazı" |

---

## 🎯 3. SPECIALTY PAGES (Niş/Fırsat Sayfaları)

Raporunda gördüğümüz spesifik aramalar için "Hap" sayfalar.

* `/ikinci-el-oksijen-tupu-fiyatlari` (Rapor: "2 el oksijen tüpü fiyatları")
* `/oksijen-tupu-manometresi` (Rapor: "oksijen tüpü manometresi")
* `/koah-hastalari-icin-oksijen-tedavisi` (Rapor: "koah hastaları için...")
* `/tasinabilir-oksijen-konsantratoru` (Rapor: "taşınabilir oksijen makinesi")

---

## 📍 4. PROGRAMMATIC GEO-MATRIX (İlçe Bazlı URL'ler)

İstanbul'un 39 ilçesi için 4 ana hizmetten toplam **156 sayfa** otomatik üretilecektir.

### A. Dolum Odaklı (39 Sayfa)
* `/umraniye-oksijen-tupu-dolumu`
* `/kadikoy-oksijen-tupu-dolumu`
* `/fatih-oksijen-tupu-dolumu`
* *(...tüm 39 ilçe)*

### B. Kiralama Odaklı (39 Sayfa)
* `/umraniye-oksijen-cihazi-kiralama`
* `/besiktas-oksijen-cihazi-kiralama`
* `/beylikduzu-oksijen-cihazi-kiralama`
* *(...tüm 39 ilçe)*

### C. Fiyat/Satış Odaklı (39 Sayfa)
* `/umraniye-oksijen-tupu-fiyatlari`
* `/sisli-oksijen-tupu-fiyatlari`
* `/atasehir-oksijen-tupu-fiyatlari`
* *(...tüm 39 ilçe)*

### D. Tamir/Servis Odaklı (39 Sayfa)
* `/umraniye-oksijen-cihazi-tamiri`
* `/pendik-oksijen-cihazi-tamiri`
* `/kartal-oksijen-cihazi-tamiri`
* *(...tüm 39 ilçe)*

---

## 🔗 5. URL GENERATION RULES (Hiyerarşi)

1.  **Düz Yapı:** Klasör yapısı yerine (`/umraniye/dolum`), tireli yapı (`/umraniye-dolum`) tercih edilir. SEO'da daha hızlı indekslenir.
2.  **Otomatik Mahalle Entegrasyonu:** İlçe sayfalarının içinde mahalleler (Örn: Çakmak Mh, Göztepe Mh) "Semt bazlı servis" başlığıyla metin olarak geçecektir ama URL olarak açılmayacaktır (Link çöplüğü olmaması için).
3.  **Canonical Logic:** Eğer bir kullanıcı hem "makine" hem "cihaz" arıyorsa, her iki URL de `/oksijen-cihazi-kiralama` sayfasına (Canonical) odaklanacaktır.

---

## 📉 6. PMAX EXCLUSION LIST

Google PMax'in gereksiz yere para harcamasını engellemek için şu sayfaları reklamdan hariç tutuyoruz:
* `/hakkimizda`
* `/blog/*`
* `/iletisim` (Sadece "İletişim" arayanlar reklamı tıklamasın, organik gelsin).