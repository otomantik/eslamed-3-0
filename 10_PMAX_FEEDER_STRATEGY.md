# 🧠 10_PMAX_FEEDER_STRATEGY.md (The AI Brain Feeder)

![Google Ads](https://img.shields.io/badge/Google_Ads-PMax_Optimization-4285F4?style=flat-square)
![Strategy](https://img.shields.io/badge/Strategy-Predictive_Bidding-orange?style=flat-square)
![Status](https://img.shields.io/badge/Experimental-Extreme-red?style=flat-square)

> **"PMax bir silahtır. Biz bu silahın namlusunu en çok para harcayan ve en sadık (Dolum yapan) müşteriye doğrultuyoruz."**

Bu doküman, Google'ın yapay zekasını (PMax) besleme stratejimizdir. Sadece dönüşüm verisi göndermek yetmez; algoritmayı **"Kimin peşinden koşacağı"** konusunda manipüle edeceğiz.

---

## 🚀 1. DENEYSEL: "HYPER-VALUE" BİDDİNG (LTV Ağırlıklı)

Google genellikle sadece son satışı görür. Biz ona **LTV (Life-Time Value)** yani "Yaşam Boyu Değer" tahmini göndereceğiz.

| Senaryo | Google'a Bildirilen Değer | Neden? |
| :--- | :--- | :--- |
| **Tek Seferlik Parça Satışı** | **150 TL** | Google bu müşteriyi "Düşük Değerli" klasmanına atar. |
| **Yeni Cihaz Satışı** | **15.000 TL** | Google bu profili "Yüksek Harcama Potansiyeli" olarak işaretler. |
| **İLK TÜP DOLUMU** | **5.000 TL (Yapay Değer)** | *Deneysel:* Dolum 350 TL olsa da Google'a 5.000 TL diyoruz. **Neden?** Çünkü dolum yapan müşteri süreklidir. Google'ın bu "sadık" kitleyi bulması için onu ödüllendiriyoruz. |

---

## 🎯 2. INTENT-DRIVEN ASSET GROUPS (Niyet Odaklı Gruplar)

PMax'i tek bir torbaya atmıyoruz. Google'ın elindeki görsel ve metinleri kullanıcı niyetine göre bölüyoruz:

1.  **"ACİLİYET" Grubu:** "Nöbetçi", "Hemen Teslim", "7/24 Dolum" odaklı görseller. (Tıklama başı maliyet yüksek olsa da dönüşüm %100'e yakındır).
2.  **"GÜVEN" Grubu:** "Teknik Servis", "Garantili Tamir", "Sessiz Cihaz" odaklı videolar. (Rakiplerin cihazı bozulanları çalmak için).
3.  **"TASARRUF" Grubu:** "Kiralama", "İkinci El", "Ekonomik Dolum" odaklı metinler.

---

## 🧪 3. DENEYSEL: "NEGATIVE SIGNALLING" (Algoritmayı Soğutma)

Google'ın en büyük sorunu, parayı "boş" tıklamalara harcamasıdır. Biz buna **"Anti-Conversion"** diyoruz.

* **Senaryo:** Kullanıcı siteye girdi, "İşe Alım" veya "Hakkımızda" sayfasına baktı ve 10 saniye sonra çıktı.
* **Aksiyon:** Go Service bu kullanıcıyı **"Low Quality"** olarak işaretler.
* **Experimental:** Google Ads API üzerinden bu kullanıcı için "0.01 TL" değerinde bir dönüşüm gönderilir. Google bu profili "para kazandırmayan" olarak kodlar ve benzer kişilere reklam göstermeyi bırakır.

---

## 🔄 4. THE RE-FEEDING LOOP (Geri Besleme Döngüsü)

Salih'in PWA panelinden bastığı her tuş, PMax'in bir sonraki reklamı kime göstereceğini belirler.

```mermaid
graph TD
    A[Salih 'DOLUM' Butonuna Bastı] --> B{Sistem Kontrolü}
    B -->|İlk Dolum mu?| C[Google'a 'High Value' Sinyali Gönder]
    B -->|10. Dolum mu?| D[Google Customer Match Listesini Güncelle]
    C --> E[PMax Algoritması Benzer Hastaları Hedefler]
    D --> F[Reklam Maliyetini %20 Düşür -Sadık Müşteri-]