# 🗺️ 19_PROGRAMMATIC_GEO_SEO.md (The Local Authority Engine)

![SEO](https://img.shields.io/badge/SEO-Programmatic_Silo-blueviolet?style=flat-square)
![Geo](https://img.shields.io/badge/Coverage-39_Districts_x_900_Neighborhoods-red?style=flat-square)
![Impact](https://img.shields.io/badge/Target-Zero_Ad_Cost_Leads-success?style=flat-square)

> **"We are not just a website; we are a local neighbor in every district of Istanbul. Our goal is to own every 'near me' search query."**

---

## 🏗️ 1. THE GEOGRAPHIC RECURSION ENGINE

Instead of static pages, we use a **Recursive Template Engine** that generates 156+ high-authority landing pages.

### URL Structure (The "Gravity" Pattern)
* `/[district]-oksijen-tupu-dolumu` (Primary Capture)
* `/[district]-oksijen-cihazi-kiralama` (High Intent)
* `/[district]-oksijen-cihazi-tamiri` (Problem Solving)

---

## 🧪 2. EXPERIMENTAL: "NEIGHBORHOOD INJECTION" (Deneysel)

Google ranks pages higher when they mention **specific hyper-local landmarks**. We don't just say "Umraniye"; we inject neighborhood data dynamically into the page body.

### Dynamic Content Map:
```json
{
  "district": "Umraniye",
  "landmarks": ["Canpark AVM", "Umraniye Egitim Arastirma Hastanesi", "Cakmak Mahallesi"],
  "delivery_time": "25 Minutes"
}
The Resulting SEO Copy:

"Are you near Umraniye Egitim Arastirma Hastanesi? Our delivery team is currently active in Cakmak Mahallesi. We can deliver your oxygen refill in 25 minutes."

🧠 3. DYNAMIC ENTITY LINKING (Internal Mesh)
To prevent "Orphan Pages" (pages with no links), the Go Backend generates a Neighborhood Mesh:

Breadcrumb SEO: Istanbul > Umraniye > Oxygen Refill

Proximity Links: "We also serve neighboring districts: Cekmekoy and Uskudar." (This passes 'Link Juice' between pages).

⚡ 4. LIVE DATA SIGNALS (The "Freshness" Factor)
Google loves fresh content. We will display Real-Time Service Data from ClickHouse on these SEO pages.

Widget: "Last delivery in [District] was [34 minutes] ago."

Widget: "Currently [2] service vehicles are active in the [District] area."

SEO Impact: The HTML content changes every hour, telling Google's crawler: "This page is alive and highly relevant."

🪤 5. THE "CONVERSION TRAP" UX
These pages are not just for reading; they are for Action.

Sticky Location Bar: "Service available in [District] NOW. Call Salih."

Local Social Proof: "Trusted by [45] families in [District] this month."

One-Tap WhatsApp: Prefilled with: "I am in [District], I need an urgent refill."

🛡️ 6. EXPERIMENTAL: "CLOAKED" SCHEMA MARKUP
We use LocalBusiness JSON-LD Schema to tell Google exactly where we are, even if we don't have a physical shop in every district.

JSON

{
  "@context": "[https://schema.org](https://schema.org)",
  "@type": "MedicalBusiness",
  "name": "Eslamed [District] Branch",
  "areaServed": "[District], Istanbul",
  "description": "7/24 Oxygen Cylinder Refill and Rental in [District].",
  "availableService": "Oxygen Therapy"
}
📊 7. PERFORMANCE TRACKING (SEO vs. Paid)
We track these leads with a specific tag in Salih's PWA:

Tag: source: organic_geo_seo

Goal: If a lead comes from /umraniye-dolum, we mark the ROI as Infinity (since ad cost is 0).