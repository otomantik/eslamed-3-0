# 📸 ESLAMED Placeholder Resimler ve Eksik Dosyalar Listesi

**Tarih:** 2 Ocak 2026  
**Durum:** Production Launch Öncesi Kontrol

---

## 🔴 YÜKSEK ÖNCELİK - Mutlaka Temin Edilmeli

### 1. İşletme Belgeleri Sayfası (`/isletme-belgeleri`)

**Konum:** `apps/web/app/isletme-belgeleri/page.tsx`

#### Eksik Belgeler (3 adet):

| # | Belge Adı | Placeholder Metni | Dosya Formatı | Kayıt No Durumu |
|---|-----------|-------------------|---------------|-----------------|
| 1 | **Tıbbi Cihaz Satış Merkezi Yetki Belgesi** | `[PLACEHOLDER: Tıbbi Cihaz Satış Merkezi Yetki Belgesi Görseli]` | PDF veya JPG/PNG | ⚠️ `XXX-XXXX-XXX` (placeholder) |
| 2 | **ÜTS Kayıt Belgesi / Ekran Görüntüsü** | `[PLACEHOLDER: ÜTS Kayıt Belgesi / Ekran Görüntüsü]` | PNG/JPG (ekran görüntüsü) | ⚠️ `XXX-XXXX-XXX` (placeholder) |
| 3 | **İş Yeri Açma ve Çalışma Ruhsatı** | `[PLACEHOLDER: İş Yeri Açma ve Çalışma Ruhsatı]` | PDF veya JPG/PNG | ⚠️ `XXX-XXXX-XXX` (placeholder) |

**Dosya Yolu:** `/public/assets/documents/` (oluşturulmalı)

**Önerilen Dosya İsimleri:**
- `tibbi-cihaz-satis-yetki-belgesi.pdf` (veya `.jpg`)
- `uts-kayit-belgesi.png` (veya `.jpg`)
- `is-yeri-ruhsati.pdf` (veya `.jpg`)

**Boyut Önerileri:**
- PDF: A4 formatında, maksimum 2MB
- Görsel: Minimum 800x600px, maksimum 2MB

**Aksiyon:**
1. ✅ Belgeleri tara/fotoğrafla
2. ✅ `/public/assets/documents/` klasörünü oluştur
3. ✅ Dosyaları yükle
4. ✅ `isletme-belgeleri/page.tsx` dosyasında placeholder'ları gerçek görsellerle değiştir
5. ✅ Kayıt numaralarını (`XXX-XXXX-XXX`) gerçek numaralarla güncelle

---

## 🟡 ORTA ÖNCELİK - İçerik Zenginleştirme İçin

### 2. Rehber Sayfaları - Görsel İçerikler

#### 2.1. Solunum Sistemleri Rehberi (`/rehber/solunum-sistemleri`)

**Konum:** `apps/web/app/rehber/solunum-sistemleri/page.tsx`

| # | Placeholder | Açıklama | Format | Öncelik |
|---|------------|----------|--------|---------|
| 1 | `[PLACEHOLDER: Filtre Temizliği Video/Fotoğraf]` | Oksijen konsantratörü filtre temizliği için görsel/video | Video (MP4) veya Görsel (JPG/PNG) | 🟡 Orta |
| 2 | `[PLACEHOLDER: Cihaz Uyarı Sesleri ve Anlamları]` | Cihaz alarm sesleri ve anlamları için infografik | PNG/JPG (infografik) | 🟡 Orta |

**Önerilen Dosya İsimleri:**
- `filtre-temizlik-video.mp4` (veya `filtre-temizlik.jpg`)
- `cihaz-uyari-sesleri-infografik.png`

---

#### 2.2. Ölçüm Cihazları Rehberi (`/rehber/olcum-cihazlari`)

**Konum:** `apps/web/app/rehber/olcum-cihazlari/page.tsx`

| # | Placeholder | Açıklama | Format | Öncelik |
|---|------------|----------|--------|---------|
| 1 | `[PLACEHOLDER: Manşet nasıl takılır?]` | Tansiyon ölçümü için manşet takma görseli | PNG/JPG (adım adım görsel) | 🟡 Orta |
| 2 | `[PLACEHOLDER: Ölçüm sonrası kayıt nasıl tutulur?]` | Ölçüm kayıt tutma örneği görseli | PNG/JPG (örnek form/görsel) | 🟡 Orta |

**Önerilen Dosya İsimleri:**
- `manset-takma-rehberi.png`
- `olcum-kayit-ornegi.png`

---

#### 2.3. Tabanlık Sayfası (`/tabanlik`)

**Konum:** `apps/web/app/tabanlik/page.tsx`

| # | Placeholder | Açıklama | Format | Öncelik |
|---|------------|----------|--------|---------|
| 1 | `[PLACEHOLDER: Ayak Analizi Cihazı Üzerinde Ölçüm]` | Bilgisayarlı yürüme analizi süreci görseli | PNG/JPG (profesyonel fotoğraf) | 🟡 Orta |
| 2 | `[PLACEHOLDER: Kişiye Özel Üretilmiş Tabanlık Detayı]` | Yüksek kaliteli medikal malzeme detay görseli | PNG/JPG (makro fotoğraf) | 🟡 Orta |

**Önerilen Dosya İsimleri:**
- `ayak-analizi-cihazi.jpg`
- `ozel-tabanlik-detay.jpg`

**Not:** Bu sayfa zaten özel OpenGraph image'a sahip, bu görseller sayfa içeriği için.

---

## 🔴 YÜKSEK ÖNCELİK - Ürün/Katalog Görselleri

### 4. Ekipmanlar/Katalog Sayfası (`/ekipmanlar`)

**Konum:** `apps/web/components/catalog/virtualized-catalog.tsx`

**Durum:** ⚠️ **TÜM ÜRÜNLER İÇİN GÖRSEL EKSİK**

**Mevcut Durum:**
- Her ürün için sadece kategori harfinin ilk karakteri gösteriliyor (örn: "S" = Solunum, "T" = Tanı & Ölçüm)
- Gerçek ürün görselleri yok
- Placeholder: `{item.category.charAt(0)}` (kategori harfi)

**Toplam Ürün Sayısı:** 2500+ (search-index.json'da belirtilmiş)

**Örnek Ürünler (search-index.json'dan):**
1. Oksijen Konsantratörü (Solunum)
2. Tansiyon Aleti (Tanı & Ölçüm)
3. Havalı Yatak (Evde Bakım)
4. Kişiye Özel Tabanlık (Ortopedi)
5. ... ve 2495+ diğer ürün

**Görsel Formatı:**
- Boyut: 64x64px (katalog listesinde)
- Format: PNG/JPG/WebP
- Aspect Ratio: 4:3 (CLS önleme için)
- Önerilen: 256x192px (4:3) veya 320x240px

**Dosya Yapısı Önerisi:**
```
/public/assets/equipment/
├── solunum/
│   ├── oksijen-konsantratoru.jpg
│   ├── oksijen-tupu.jpg
│   └── ...
├── olcum/
│   ├── tansiyon-aleti.jpg
│   ├── ates-olcer.jpg
│   └── ...
├── evde-bakim/
│   ├── havali-yatak.jpg
│   ├── hasta-yatagi.jpg
│   └── ...
└── ortopedi/
    ├── tabanlik.jpg
    └── ...
```

**Aksiyon:**
1. ⚠️ **2500+ ürün görseli** gerekiyor (yüksek öncelik)
2. ✅ Kategori bazlı klasör yapısı oluştur
3. ✅ Görselleri yükle
4. ✅ `virtualized-catalog.tsx` dosyasında placeholder'ı gerçek görsellerle değiştir
5. ✅ Her ürün için `search-index.json`'a `image` field'ı ekle

**Not:** Bu çok büyük bir iş. İlk aşamada en popüler 50-100 ürün için görsel eklenebilir, diğerleri sonra eklenebilir.

---

## 🟢 DÜŞÜK ÖNCELİK - Teknik Placeholder'lar (Çalışıyor)

### 3. Harita Placeholder'ları

#### 3.1. İletişim Sayfası (`/iletisim`)
- **Durum:** ✅ Google Maps entegrasyonu mevcut
- **Placeholder:** Sadece kod yorumu (`{/* Map placeholder */}`)
- **Aksiyon:** Gerek yok, Google Maps API kullanılıyor

#### 3.2. İstanbul Sayfası (`/istanbul`)
- **Durum:** ✅ Google Maps entegrasyonu mevcut
- **Placeholder:** Sadece kod yorumu (`{/* Map placeholder */}`)
- **Aksiyon:** Gerek yok, Google Maps API kullanılıyor

---

## ✅ MEVCUT VE ÇALIŞAN GÖRSELLER

### 4. OpenGraph & Social Media Görselleri

| Dosya | Durum | Açıklama |
|-------|-------|----------|
| `/app/opengraph-image.tsx` | ✅ Dinamik oluşturuluyor | Next.js OG Image API ile otomatik oluşturuluyor |
| `/app/twitter-image.tsx` | ✅ Dinamik oluşturuluyor | Next.js OG Image API ile otomatik oluşturuluyor |
| `/app/icon.svg` | ✅ Mevcut | Site favicon'u |

### 5. Logo Görselleri

**Konum:** `/public/assets/logos/`

| Logo | Durum | Format |
|------|-------|--------|
| `endostall.png` | ✅ Mevcut | PNG |
| `jumper.png` | ✅ Mevcut | PNG |
| `omron.png` | ✅ Mevcut | PNG |
| `onlem.png` | ✅ Mevcut | PNG |
| `philips.svg` | ✅ Mevcut | SVG |
| `respirox.png` | ✅ Mevcut | PNG |

### 6. Diğer Görseller

| Dosya | Durum | Kullanım |
|-------|-------|----------|
| `/public/assets/hero-bg.png` | ✅ Mevcut | Layout schema.org'da kullanılıyor |

---

## 📋 ÖZET: TEMİN EDİLMESİ GEREKENLER

### 🔴 Acil (Launch Öncesi)

1. **İşletme Belgeleri (3 adet)**
   - Tıbbi Cihaz Satış Merkezi Yetki Belgesi
   - ÜTS Kayıt Belgesi / Ekran Görüntüsü
   - İş Yeri Açma ve Çalışma Ruhsatı
   - **+ Kayıt numaralarını güncelle**

2. **Ürün/Katalog Görselleri (2500+ adet)**
   - ⚠️ **EN ÖNEMLİ EKSİK:** Tüm ekipmanlar için görsel gerekiyor
   - Şu an sadece kategori harfi gösteriliyor
   - İlk aşama: En popüler 50-100 ürün için görsel
   - Sonraki aşama: Kalan ürünler için görsel

### 🟡 İsteğe Bağlı (İçerik Zenginleştirme)

3. **Rehber Görselleri (4 adet)**
   - Filtre temizliği görseli/video
   - Cihaz uyarı sesleri infografiği
   - Manşet takma rehberi
   - Ölçüm kayıt örneği

4. **Tabanlık Görselleri (2 adet)**
   - Ayak analizi cihazı görseli
   - Özel tabanlık detay görseli

---

## 🛠️ UYGULAMA ADIMLARI

### Adım 1: Klasör Yapısını Oluştur
```bash
mkdir -p apps/web/public/assets/documents
mkdir -p apps/web/public/assets/guides
mkdir -p apps/web/public/assets/tabanlik
```

### Adım 2: Dosyaları Yükle
- Belgeleri `/public/assets/documents/` klasörüne yükle
- Rehber görsellerini `/public/assets/guides/` klasörüne yükle
- Tabanlık görsellerini `/public/assets/tabanlik/` klasörüne yükle

### Adım 3: Kod Güncellemeleri
- `isletme-belgeleri/page.tsx` dosyasında placeholder'ları gerçek görsellerle değiştir
- Rehber sayfalarında placeholder metinleri görsellerle değiştir
- Kayıt numaralarını gerçek değerlerle güncelle

---

## 📊 ÖNCELİK MATRİSİ

| Öncelik | Kategori | Sayı | Launch Öncesi Gerekli? |
|---------|----------|------|------------------------|
| 🔴 Yüksek | İşletme Belgeleri | 3 | ✅ **EVET** |
| 🔴 Yüksek | Ürün/Katalog Görselleri | 2500+ | ⚠️ **İLK 50-100 ÖNCELİK** |
| 🟡 Orta | Rehber Görselleri | 4 | ❌ Hayır (sonra eklenebilir) |
| 🟡 Orta | Tabanlık Görselleri | 2 | ❌ Hayır (sonra eklenebilir) |
| 🟢 Düşük | Harita/Map | 0 | ✅ Zaten çalışıyor |

---

## ✅ SONUÇ

**Launch için minimum gereksinim:**
- ✅ 3 İşletme Belgesi (PDF/JPG)
- ✅ Kayıt numaralarının güncellenmesi
- ⚠️ **Ürün görselleri:** İlk aşamada en popüler 50-100 ürün için görsel (tüm 2500+ ürün ideal ama launch için minimum 50-100 yeterli)

**Toplam eksik dosya sayısı:** 
- Acil: 3 (belgeler) + 50-100 (ürün görselleri - ilk aşama) = **53-103 dosya**
- İsteğe bağlı: 6 (rehber + tabanlık görselleri)
- Toplam ideal: 3 + 2500+ + 6 = **2509+ dosya**

**Launch readiness:** 
- İşletme belgeleri + ilk 50-100 ürün görseli eklendikten sonra %90+ olacak
- Tüm ürün görselleri sonraki aşamada eklenebilir

---

**Not:** Bu liste, kodda bulunan tüm placeholder'ları içermektedir. Teknik placeholder'lar (skeleton loaders, map placeholders) çalışıyor durumda ve değiştirilmesine gerek yoktur.

