# 🖼️ 26_IMAGE_SEO_STRATEGY.md (Visual Authority)

![Image SEO](https://img.shields.io/badge/SEO-Image_Optimization-blueviolet?style=flat-square)
![Tech](https://img.shields.io/badge/Stack-Cloudflare_Polish_|_Next_Image-orange?style=flat-square)
![AI](https://img.shields.io/badge/AI-Midjourney_|_DALL--E_3-success?style=flat-square)

> **"A picture is worth a thousand leads. We don't just upload images; we deploy visual assets that rank and convert."**

---

## 🎨 1. THE VISUAL MIX (AI vs. Real)

To maintain maximum "Gravity" and trust, we use a hybrid approach:

* **AI Generated (Midjourney/DALL-E 3):** High-end lifestyle photos. (e.g., A happy elderly person breathing easily in a modern living room).
* **User-Provided (Salih's JPGs):** Authentic product and service photos. (e.g., Salih delivering a freshly sanitized 10L concentrator in Ümraniye).
* **Action:** Salih provides raw JPGs -> Our Go Service optimizes them -> Cloudflare Pro delivers them as WebP/AVIF.

---

## 🏗️ 2. IMAGE INFRASTRUCTURE (The Stack)

* **Next/Image:** Automatic lazy loading, blur-up placeholders (to prevent CLS layout shift).
* **Cloudflare Polish (Pro Feature):** On-the-fly conversion to **WebP** and **AVIF** (up to 80% smaller than JPG).
* **Cloudflare Mirage:** Detects the user's device/connection. If they are on a 3G hospital network, it sends lower-resolution images first.

---

## 📂 3. SEO NAMING MATRIX (The Algorithm)

Google Images ignores `IMG_1234.jpg`. Every file must be renamed based on the **Search Terms Report**.

| Original File | Target SEO Filename | Target Alt Tag |
| :--- | :--- | :--- |
| `salih_tup.jpg` | `umraniye-oksijen-tupu-dolumu-eslamed.webp` | "Ümraniye bölgesinde 7/24 profesyonel oksijen tüpü dolumu hizmeti - Eslamed" |
| `cihaz_ses.jpg` | `oksijen-konsantratoru-tamiri-servis.webp` | "Gürültülü çalışan oksijen cihazı teknik servisi ve tamir süreci" |
| `kiralik_1.jpg` | `kiralik-oksijen-cihazi-istanbul.webp` | "İstanbul genelinde uygun fiyatlı kiralık oksijen konsantratörü modelleri" |

---

## 🤖 4. AI PROMPT FOR VISUAL CONTENT

When we need high-end "Lifestyle" images for our **Programmatic SEO** pages:

**Prompt (Midjourney v6):**
> *"High-quality commercial photography of a modern, clean medical oxygen concentrator in a bright living room, soft morning sunlight, bokeh background, clinical but warm atmosphere, 8k resolution, photorealistic --ar 16:9"*

---

## 🧠 5. AUTOMATED ALT TAG GENERATION (Go + AI)

Since we have 156+ district pages, we don't write alt tags manually.

**Go Logic:**
1.  Upload `image.jpg`.
2.  Go Ingestion Service sends metadata to **Gemini Pro Vision**.
3.  AI generates: *"This is a 10-liter oxygen concentrator being delivered to {{district}}."*
4.  Next.js renders this description in the `alt` attribute automatically.

---

## 📍 6. GEOGRAPHIC IMAGE TAGGING (Deneysel)

We use **Exif Data Injection** to tell Google where the photo was taken.

* **Action:** When Salih uploads a photo from Ümraniye, we programmatically inject Ümraniye's GPS coordinates into the image's Metadata.
* **Impact:** Massive boost in **Local Map Pack** and **Local Search** rankings.

---

## 📝 7. IMAGE DELIVERY CHECKLIST

* [x] All images are served from `eslamed.com/cdn-cgi/image/...` (Cloudflare Image Resizing).
* [x] Every image has a descriptive filename (No spaces, use hyphens).
* [x] Every image has an `alt` tag containing a keyword from the search report.
* [x] Every image is converted to WebP (Lossy) via Cloudflare Pro.