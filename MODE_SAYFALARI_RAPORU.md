# MODE SAYFALARI RAPORU
## Intent Mode'ları ve Sayfa İçerikleri

---

## 📋 MODE LİSTESİ

Sistemde 5 farklı Intent Mode bulunmaktadır:

1. **CRITICAL_EMERGENCY** - Acil Durum Modu
2. **TRUST_SEEKER** - Güven Arayan Modu
3. **PRICE_SENSITIVE** - Fiyat Duyarlı Modu
4. **COMMERCIAL_RENTAL** - Ticari Kiralama Modu
5. **INFORMATION_SEEKER** - Bilgi Arayan Modu

---

## 🗺️ ROUTE YAPISI

### Ana Sayfa
- **Route:** `/`
- **File:** `apps/web/app/page.tsx`
- **Mode Detection:** `detectIntent()` fonksiyonu ile otomatik tespit
- **Dinamik İçerik:** Mode'a göre Hero, Service Matrix, FAQ içerikleri değişir

### Dinamik Sayfalar
- **Route:** `[...slug]` (catch-all)
- **File:** `apps/web/app/[...slug]/page.tsx`
- **Örnekler:**
  - `/istanbul`
  - `/hizmetler/teknik-servis`
  - `/rehber/solunum-sistemleri`
  - Herhangi bir slug pattern

---

## 🎯 MODE 1: CRITICAL_EMERGENCY

### Tetikleme Koşulları
- **Score:** ≥ 85/100
- **Confidence:** 95%
- **Keywords:** 'acil', 'nöbetçi', 'arıza', 'bozuldu', 'ses', 'beep', 'emergency', 'broken'
- **Temporal:** Gece saatleri (23:00-07:00) +30 puan
- **GCLID:** 'urgent' veya 'emergency' içeriyorsa +40 puan

### Hero İçeriği
```typescript
{
  title: "Oksijen cihazınızda sorun mu var?",
  subtitle: "Hekiminizin belirlediği tedavi planına uygun teknik cihazların seçimi ve kurulum süreçlerinde rehberlik sunuyoruz...",
  cta: "Uzmanla Konuş",
  secondaryCta: "Konumumu Gönder",
  bgImage: "/assets/hero-bg.png",
  bgOverlay: "bg-gradient-to-r from-red-900/80 via-red-800/70 to-transparent",
  titleColor: "text-white",
  subtitleColor: "text-red-50",
  badge: {
    text: "{district} bölgesinde hizmetinizdeyiz",
    icon: AlertTriangle,
    bg: "bg-red-500/20 backdrop-blur-sm border border-red-400/50",
    textColor: "text-red-100",
    iconColor: "text-red-500",
    pulse: true
  },
  ctaBg: "bg-red-600 hover:bg-red-700",
  pulse: true
}
```

### UI Değişiklikleri
- ✅ **Navbar:** Gizlenir (`hideNavbar = true`)
- ✅ **GlobalAlertBar:** Gösterilir
- ✅ **Hero Padding:** `pt-32` (daha fazla üst boşluk)
- ✅ **FloatingRescueBar:** İletişim butonu kırmızı (`text-red-600`)

### Kullanıldığı Sayfalar
- Ana sayfa (`/`) - Acil durum sinyalleri varsa
- Dinamik sayfalar (`[...slug]`) - Acil keyword'ler içeriyorsa

---

## 🎯 MODE 2: TRUST_SEEKER

### Tetikleme Koşulları
- **Score:** 60-84/100
- **Confidence:** 85%
- **Keywords:** 'şikayet', 'yorum', 'güvenilir', 'onaylı', 'sertifika', 'review', 'complaint'
- **Scroll Depth:** >75% ise +20 puan

### Hero İçeriği
```typescript
{
  title: "Evde medikal ekipman yönlendirme",
  subtitle: "Hekiminizin belirlediği tedavi planına uygun teknik cihazların seçimi ve kurulum süreçlerinde rehberlik sunuyoruz...",
  cta: "Uzmanla Konuş",
  secondaryCta: "Nasıl Çalışıyoruz",
  bgImage: "/assets/hero-bg.png",
  bgOverlay: "bg-gradient-to-r from-blue-900/70 via-blue-800/60 to-transparent",
  titleColor: "text-white",
  subtitleColor: "text-blue-50",
  badge: {
    text: "ÜTS Kayıtlı & CE Belgeli Medikal Ekipman",
    icon: CheckCircle2,
    bg: "bg-blue-500/20 backdrop-blur-sm border border-blue-400/50",
    textColor: "text-blue-100",
    iconColor: "text-blue-500",
    pulse: false
  },
  ctaBg: "bg-blue-600 hover:bg-blue-700",
  pulse: false
}
```

### UI Değişiklikleri
- ✅ **Navbar:** Gizlenir (`shouldShowNavbar = false`)
- ✅ **Compliance Bar:** Gösterilir (`showComplianceBar = true`)
- ✅ **Service Matrix:** Trust-focused servisler vurgulanır

### Kullanıldığı Sayfalar
- Ana sayfa (`/`) - Trust keyword'leri varsa
- `/istanbul` - Güven odaklı içerik
- `/hizmetler` - Sertifika ve onaylar vurgulanır

---

## 🎯 MODE 3: PRICE_SENSITIVE

### Tetikleme Koşulları
- **Score:** 40-59/100
- **Confidence:** 75%
- **Keywords:** 'fiyat', 'kaç para', 'ücret', 'kiralama ücreti', 'ucuz', 'price', 'cost'
- **GCLID:** 'price' veya 'buy' içeriyorsa +25 puan

### Hero İçeriği
```typescript
{
  title: "Şeffaf kapsam, net süreç",
  subtitle: "Hekiminizin belirlediği tedavi planına uygun teknik cihazların seçimi ve kurulum süreçlerinde rehberlik sunuyoruz...",
  cta: "Fiyat Bilgisi Al",
  secondaryCta: "Detaylı Bilgi",
  bgImage: "/assets/hero-bg.png",
  bgOverlay: "bg-gradient-to-r from-emerald-900/70 via-emerald-800/60 to-transparent",
  titleColor: "text-white",
  subtitleColor: "text-emerald-50",
  badge: {
    text: "450 TL'den başlayan fiyatlar",
    icon: Activity,
    bg: "bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/50",
    textColor: "text-emerald-100",
    iconColor: "text-emerald-500",
    pulse: false
  },
  ctaBg: "bg-emerald-600 hover:bg-emerald-700",
  pulse: false
}
```

### UI Değişiklikleri
- ✅ **Navbar:** Gösterilir
- ✅ **Service Matrix:** Fiyat bilgileri vurgulanır
- ✅ **Hero CTA:** "Fiyat Bilgisi Al" (fiyat odaklı)

### Kullanıldığı Sayfalar
- Ana sayfa (`/`) - Fiyat keyword'leri varsa
- `/hizmetler/cihaz-kiralama` - Kiralama fiyatları
- `/hizmetler/oksijen-dolum` - Dolum ücretleri

---

## 🎯 MODE 4: COMMERCIAL_RENTAL

### Tetikleme Koşulları
- **Score:** 20-39/100
- **Confidence:** 70%
- **Temporal:** İş saatleri (09:00-18:00) +10 puan
- **Default:** Düşük score durumunda

### Hero İçeriği
```typescript
{
  title: "{district} bölgesinde evde ekipman planlaması",
  subtitle: "Hekiminizin belirlediği tedavi planına uygun teknik cihazların seçimi ve kurulum süreçlerinde rehberlik sunuyoruz...",
  cta: "Uzmanla Konuş",
  secondaryCta: "Hizmetlerimiz",
  bgImage: "/assets/hero-bg.png",
  bgOverlay: "bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-transparent",
  titleColor: "text-white",
  subtitleColor: "text-slate-100",
  badge: {
    text: "{district} bölgesinde aktif hizmet",
    icon: Activity,
    bg: "bg-blue-500/20 backdrop-blur-sm border border-blue-400/50",
    textColor: "text-blue-100",
    iconColor: "text-blue-500",
    pulse: false
  },
  ctaBg: "bg-slate-900 hover:bg-slate-800",
  pulse: false
}
```

### UI Değişiklikleri
- ✅ **Navbar:** Gösterilir
- ✅ **District Badge:** Bölge bilgisi vurgulanır
- ✅ **Service Matrix:** Kiralama servisleri öne çıkar

### Kullanıldığı Sayfalar
- Ana sayfa (`/`) - İş saatleri ve düşük urgency
- `/istanbul` - Bölgesel hizmetler
- `/hizmetler/cihaz-kiralama` - Ticari kiralama

---

## 🎯 MODE 5: INFORMATION_SEEKER

### Tetikleme Koşulları
- **Score:** < 20/100
- **Confidence:** 65%
- **Keywords:** 'nedir', 'nasıl', 'kullanım', 'what is', 'how to'
- **Default:** En düşük score durumunda

### Hero İçeriği
```typescript
{
  title: "Evde kullanım ekipmanları hakkında",
  subtitle: "Hekiminizin belirlediği tedavi planına uygun teknik cihazların seçimi ve kurulum süreçlerinde rehberlik sunuyoruz...",
  cta: "Uzmanla Konuş",
  secondaryCta: "Bilgi Al",
  bgImage: "/assets/hero-bg.png",
  bgOverlay: "bg-gradient-to-r from-slate-800/70 via-slate-700/60 to-transparent",
  titleColor: "text-white",
  subtitleColor: "text-slate-100",
  badge: {
    text: "Süreç yönlendirmesi",
    icon: CheckCircle2,
    bg: "bg-slate-500/20 backdrop-blur-sm border border-slate-400/50",
    textColor: "text-slate-100",
    iconColor: "text-slate-400",
    pulse: false
  },
  ctaBg: "bg-slate-700 hover:bg-slate-600",
  pulse: false
}
```

### UI Değişiklikleri
- ✅ **Navbar:** Gösterilir
- ✅ **Compliance Bar:** Gösterilir (`showComplianceBar = true`)
- ✅ **Service Matrix:** Bilgilendirici içerikler öne çıkar
- ✅ **Smart FAQ:** Daha fazla bilgi odaklı sorular

### Kullanıldığı Sayfalar
- Ana sayfa (`/`) - Bilgi arama sinyalleri
- `/rehber/*` - Tüm rehber sayfaları
- `/rehber/solunum-sistemleri`
- `/rehber/evde-bakim-ekipmanlari`
- `/rehber/olcum-cihazlari`

---

## 📄 SAYFA İÇERİKLERİ

### Ana Sayfa (`/`)
**File:** `apps/web/app/page.tsx`

**Bileşenler:**
1. **DynamicHero** - Mode'a göre değişir
2. **BrandTrustTicker** - Marka logoları
3. **ServiceValueGrid** - 3 değer kartı (Hijyen, Hızlı Teslimat, Sürekli Destek)
4. **ProductShowcase** - Ürün vitrin
5. **ServiceMatrix** - Mode'a göre farklı servisler gösterilir
6. **WallOfTrust** - Google Rating + Testimonials
7. **HyperLocalMap** - Bölgesel harita
8. **TrustSafetyBridge** - Güvenlik köprüsü
9. **SmartFAQ** - Mode'a göre farklı FAQ'lar
10. **FloatingRescueBar** - Mobil alt bar
11. **Footer** - Alt bilgi

**Mode'a Göre Değişenler:**
- Hero içeriği ve renkleri
- Service Matrix servis listesi
- Smart FAQ soruları
- Navbar görünürlüğü

### Dinamik Sayfalar (`[...slug]`)
**File:** `apps/web/app/[...slug]/page.tsx`

**Bileşenler:**
1. **Navbar** - Mode'a göre gizlenebilir
2. **DynamicHero** - Mode'a göre değişir

**Örnek Route'lar:**
- `/istanbul` → COMMERCIAL_RENTAL veya TRUST_SEEKER
- `/hizmetler/teknik-servis` → CRITICAL_EMERGENCY veya INFORMATION_SEEKER
- `/rehber/solunum-sistemleri` → INFORMATION_SEEKER
- `/hizmetler/cihaz-kiralama` → PRICE_SENSITIVE veya COMMERCIAL_RENTAL

---

## 🔍 MODE DETECTION LOGIC

**File:** `apps/web/lib/intent/detector.ts`

**Scoring System:**
- **Semantic Analysis:** 40% ağırlık
- **Temporal Analysis:** 20% ağırlık
- **Behavioral Analysis:** 20% ağırlık
- **Technographic Analysis:** 20% ağırlık

**District Detection:**
- SearchParams'dan `district` parametresi
- URL path'inden district çıkarımı
- Referrer'dan district çıkarımı
- Query string'den district keyword'leri

---

## 📊 MODE KULLANIM İSTATİSTİKLERİ

### En Yüksek Öncelik
1. **CRITICAL_EMERGENCY** - Acil durumlar (Score ≥ 85)
2. **TRUST_SEEKER** - Güven arayanlar (Score 60-84)
3. **PRICE_SENSITIVE** - Fiyat odaklılar (Score 40-59)
4. **COMMERCIAL_RENTAL** - Ticari kiralama (Score 20-39)
5. **INFORMATION_SEEKER** - Bilgi arayanlar (Score < 20)

---

## 🎨 RENK PALETLERİ

### CRITICAL_EMERGENCY
- **Primary:** Red (red-600, red-700)
- **Background:** Red gradients (red-900/80, red-800/70)
- **Accent:** Red-500, Red-400

### TRUST_SEEKER
- **Primary:** Blue (blue-600, blue-700)
- **Background:** Blue gradients (blue-900/70, blue-800/60)
- **Accent:** Blue-500, Blue-400

### PRICE_SENSITIVE
- **Primary:** Emerald (emerald-600, emerald-700)
- **Background:** Emerald gradients (emerald-900/70, emerald-800/60)
- **Accent:** Emerald-500, Emerald-400

### COMMERCIAL_RENTAL
- **Primary:** Slate (slate-900, slate-800)
- **Background:** Slate gradients (slate-900/70, slate-800/60)
- **Accent:** Blue-500, Blue-400

### INFORMATION_SEEKER
- **Primary:** Slate (slate-700, slate-600)
- **Background:** Slate gradients (slate-800/70, slate-700/60)
- **Accent:** Slate-500, Slate-400

---

## 📝 NOTLAR

1. **Mode Detection:** Her sayfa yüklendiğinde `detectIntent()` fonksiyonu çalışır
2. **Dynamic Content:** Hero, Service Matrix, FAQ içerikleri mode'a göre değişir
3. **Navbar Visibility:** CRITICAL_EMERGENCY ve TRUST_SEEKER modlarında navbar gizlenir
4. **District Support:** Tüm modlar district bilgisini destekler
5. **Fallback:** Mode tespit edilemezse INFORMATION_SEEKER varsayılan moddur

---

**Son Güncelleme:** 2026-01-20
**Versiyon:** v4.6 Elite Refinement

