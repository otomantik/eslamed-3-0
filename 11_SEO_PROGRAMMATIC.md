# 🗺️ 11_SEO_PROGRAMMATIC.md (The Geo-Dominance Engine)

![SEO Status](https://img.shields.io/badge/SEO-Programmatic-success?style=flat-square)
![Scale](https://img.shields.io/badge/Pages-39_Districts_x_Services-blueviolet?style=flat-square)
![Speed](https://img.shields.io/badge/Generation-Zero_Latency-orange?style=flat-square)

> **"İstanbul'un her sokağında Eslamed tabelası varmış gibi davranacağız. Her ilçe, her hizmet için bir URL."**

This document outlines the **Programmatic SEO** strategy to dominate local search results in Istanbul without manually creating hundreds of pages.

---

## 🔗 1. THE URL ARCHITECTURE (Master List)

We follow a **Silo Structure**. Each district is a primary silo, and services are sub-pages.

### Primary Pattern: `eslamed.com/[ilce]-[hizmet]`
*Alternative Pattern (Optional): `eslamed.com/[ilce]/[hizmet]`*

| Service | Example URL (Ümraniye) | Example URL (Kadikoy) |
| :--- | :--- | :--- |
| **Oksijen Tüpü Dolumu** | `/umraniye-oksijen-tupu-dolumu` | `/kadikoy-oksijen-tupu-dolumu` |
| **Konsantratör Kiralama** | `/umraniye-oksijen-cihazi-kiralama` | `/kadikoy-oksijen-cihazi-kiralama` |
| **Teknik Servis / Tamir** | `/umraniye-oksijen-cihazi-tamiri` | `/kadikoy-oksijen-cihazi-tamiri` |
| **Nöbetçi Hizmet** | `/umraniye-nobetci-oksijen-servisi` | `/kadikoy-nobetci-oksijen-servisi` |

---

## 🏗️ 2. PROGRAMMATIC GENERATION (Next.js Logic)

We don't create `umraniye.js`. We use **Dynamic Routes** (`[slug].js`).

### The Data Map
We keep a `districts.json` file with all Istanbul districts:
```json
[
  {"id": "umraniye", "name": "Ümraniye", "neighborhoods": ["Çakmak", "Ihlamurkuyu", "Tepeüstü"]},
  {"id": "kadikoy", "name": "Kadıköy", "neighborhoods": ["Moda", "Göztepe", "Fikirtepe"]}
]
The Static Path Generation
During the build process (next build), our system automatically generates 39 Districts x 5 Services = 195 Pages in seconds.

📝 3. DYNAMIC CONTENT TEMPLATE (The "Human" Touch)
To avoid "Duplicate Content" penalties, each page must feel unique. We use Slot-Based Content Replacement.

Dynamic Page Structure:
H1 Header: [İlçe] Oksijen Tüpü Dolumu & 7/24 Servis

Contextual Intro: "Eslamed olarak [İlçe] bölgesinde, özellikle [Mahalle 1] ve [Mahalle 2] sakinlerine 30 dakikada oksijen desteği sağlıyoruz."

Local Trust Signals: "[İlçe] sakinleri için nöbetçi servisimiz [Bugün] aktiftir."

CTA Button: "Hemen [İlçe] Servisini Ara"

🗺️ 4. BEYOND DISTRICTS: "MAHALLE" LEVEL SEO (Deneysel)
If the competition is high in "Ümraniye", we go deeper into neighborhoods.

URL: /umraniye-cakmak-mahallesi-oksijen-dolumu

Strategy: These pages are low-volume but 100% conversion. When someone searches for their specific neighborhood, they are ready to buy.

🤖 5. THE INTERNAL LINKING MESH (Sitemap)
Every programmatic page must be discoverable by Google.

Footer Links: A "Hizmet Bölgelerimiz" section containing links to all 39 districts.

Breadcrumbs: Anasayfa > İstanbul > [İlçe] > [Hizmet]

Cross-Links: "Ümraniye sayfasındaysanız, komşu ilçe Çekmeköy hizmetimizi de gördünüz mü?"

🧪 6. EXPERIMENTAL: "LIVE STATUS" SEO
We will inject live data from ClickHouse into the SEO pages to make them look "Live" to Google.

Widget: "Son 1 saatte [İlçe] bölgesinde [3] hastamıza hizmet verdik."

Impact: Google sees the page content changing (Dynamic signals) and ranks it higher than static competitor pages.

📊 7. TRACKING THE SEO LEAD
Since these are programmatic pages, we must track which page brings the most money.

Go Pipeline: Automatically tags the lead with lead_source: 'SEO_PROGRAMMATIC' and district: '[Page_District]'.

Salih's Panel: Salih sees "Bu müşteri Ümraniye SEO sayfasından geldi."