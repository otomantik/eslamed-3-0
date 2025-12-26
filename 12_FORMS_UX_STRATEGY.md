# 📝 12_FORMS_UX_STRATEGY.md (AI-Driven Conversion UX)

![UX](https://img.shields.io/badge/UX-Psychological-blueviolet?style=flat-square)
![AI](https://img.shields.io/badge/Agent-Orchestration-orange?style=flat-square)
![Conversion](https://img.shields.io/badge/Conversion-Optimized-success?style=flat-square)

> **"Form sadece boşluk doldurmak değildir. Müşterinin elinden tutup, Salih'in masasına kadar rehberlik etmektir."**

Bu döküman, formun teknik yapısını ve arkadaki AI ajanın (Orchestrator) bu veriyi nasıl işleyip süreci hızlandıracağını detaylandırır.

---

## 🧠 1. FORM PSİKOLOJİSİ: "THE PROGRESSIVE DISCLOSURE"

Kullanıcıyı 10 tane soruyla korkutmak yok. Formu "Adım Adım" (Multi-step) ve "Niyet Odaklı" yapıyoruz.

* **Adım 1: Niyet (Hızlı Seçim):** "Nasıl yardımcı olabiliriz?" (Cihaz Satışı / Dolum / Teknik Servis)
* **Adım 2: Aciliyet:** "Ne kadar acil?" (Hemen Lazım / Fiyat Alıyorum)
* **Adım 3: İletişim:** "Size nasıl ulaşalım?" (Sadece Telefon No)

**Neden?** İnsanlar bir kez "Tık" yapmaya başladığında, bitirme eğilimi (Zeigarnik Etkisi) gösterirler.

---

## 🤖 2. AI ORKESTRASYON (The Intelligence Layer)

Form doldurulduğu an, Go Backend veriyi API üzerinden AI Ajanına (GPT-4 / Gemini) gönderir.

### Ajanın Görevleri:
1.  **Sentiment Analysis (Duygu Analizi):** Mesaj kısmına "Babam nefes alamıyor, acil yetişin" yazıldıysa, AI bunu **"CRITICAL"** olarak işaretler.
2.  **Lead Scoring (Puanlama):** "Fiyat ne kadar?" yazanla "Ümraniye'deyim hemen dolum lazım" yazanı ayırır.
3.  **Automatic Categorization:** Mesajı okur ve Salih'in paneline düşmeden önce kategoriyi belirler: `Refill`, `New_Sales` veya `Complaint`.

### Örnek AI Prompt Logic:
```text
Sistem: Sen bir Medikal Satış Analistisin. 
Girdi: "Annemin cihazı dün bozuldu, Ümraniye'deyiz kiralık cihaz var mı?"
Çıktı (JSON): {
  "intent": "rental",
  "urgency": 10,
  "location": "Ümraniye",
  "recommended_action": "Stoktaki Philips Everflo'yu teklif et, hemen nakliye öner."
}
⚡ 3. SMART FIELD VALIDATION (Hata Engelleyici)
Phone Validator: Sadece 10 hane girildiğinde "Yeşil Tik" yanar. Hatalı numara girmeyi (ve reklam bütçesinin boşa gitmesini) engeller.

Geo-IP Autocomplete: Kullanıcı konum izni verirse, İlçe kısmını otomatik doldurur.

🔄 4. THE AI CONCIERGE (Form Sonrası Deneyim)
Kullanıcı "Gönder" butonuna bastığı an "Teşekkürler" yazıp bırakmıyoruz.

AI Yanıtı: "Mesajınızı aldık. Ümraniye bölgesine bakan uzmanımız Salih Bey, 5 dakika içinde sizi 0532... numarasından arayacak. Bu sırada cihazın sessiz modunu kontrol edebilirsiniz (Video Link)."

Bekleme Yönetimi: Kullanıcı beklerken ona değerli bir bilgi (Cihaz bakımı vb.) sunarak siteden çıkmasını engelliyoruz.

🔗 5. API ORKESTRASYON AKIŞI
Kod snippet'i

graph LR
    Form[📝 Form Submitted] --> Go[🐹 Go Backend]
    Go --> API[🤖 AI Agent / API Key]
    API --> Score[📊 Intent Score & Summary]
    Score --> Salih[📱 Salih PWA Notification]
    Score --> PMax[📢 Google Ads (High/Low Value Signal)]
🧪 6. DENEYSEL: "DYNAMIC FORM FIELDS"
AI, kullanıcının önceki sayfada ne arattığına bakarak formu değiştirir:

Arama: "Oksijen tüpü kaç para?" -> Formda ilk soru: "Bütçenize uygun seçenekler için tıklayın."

Arama: "Oksijen cihazı tamiri" -> Formda ilk soru: "Cihazınızın markası nedir?"

📊 7. KPI & HIZLANDIRMA
TTT (Time to Touch): Form dolduktan kaç saniye sonra Salih aradı? AI bunu ölçer.

Form Abandonment: Hangi soruda kullanıcı formu terk etti? (Bu veriyle formu sürekli sadeleştiriyoruz)