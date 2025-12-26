# ⚡ 03_SPEED_PERFORMANCE_CORE.md (Zero Latency Protocol)

![Lighthouse Score](https://img.shields.io/badge/Lighthouse-100%2F100-brightgreen?style=flat-square)
![Core Web Vitals](https://img.shields.io/badge/Core_Web_Vitals-Passed-success?style=flat-square)
![Budget](https://img.shields.io/badge/Max_Bundle_Size-35KB-red?style=flat-square)

> **"Speed is not a feature. Speed is the product."**

This document defines the **Performance Budgets** and **Optimization Strategies** for Eslamed.
Any pull request that degrades performance metrics below the thresholds defined here will be **automatically rejected**.

---

## 🚦 PERFORMANCE BUDGETS (The Red Lines)

We enforce strict limits. If you cross them, the build fails.

| Metric | Target (Mobile) | Hard Limit (Reject) | Why? |
| :--- | :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | `< 1.2s` | `> 2.5s` | User perceives site as "broken" after 2.5s. |
| **FID (First Input Delay)** | `< 50ms` | `> 100ms` | Delays in button clicks kill conversions. |
| **CLS (Cumulative Layout Shift)** | `0.00` | `> 0.1` | Layout shifts cause misclicks (UX Poison). |
| **TTFB (Time to First Byte)** | `< 100ms` | `> 300ms` | Server response time. |
| **Total Blocking Time (TBT)** | `< 150ms` | `> 300ms` | Main thread congestion. |
| **JS Bundle Size (Gzipped)** | `< 35KB` | `> 50KB` | Keep it lean. |

---

## 🚀 CORE OPTIMIZATION STRATEGIES

### 1. Rendering Strategy: Static-First (SSG)
* **Rule:** All Marketing & Product pages (`/hizmetler/*`, `/urunler/*`) must be **Statically Generated** at build time (`next build`).
* **Dynamic Content:** If we need dynamic data (e.g., "3 people looking now"), fetch it **Client-Side** (after page load) using `SWR` or `React Query`. Never block the initial HTML render for API calls.

### 2. Code Splitting & Imports
* **Pattern:** `Dynamic Imports` used for all below-the-fold components.
    ```javascript
    // ❌ BAD: Loads heavy map library immediately
    import GoogleMaps from 'react-google-maps';

    // ✅ GOOD: Loads only when user scrolls near it
    const GoogleMaps = dynamic(() => import('react-google-maps'), {
      loading: () => <p>Harita Yükleniyor...</p>,
      ssr: false
    });
    ```
* **Tree Shaking:** Do not import full libraries (e.g., `lodash`). Import only what you need (`import map from 'lodash/map'`).

### 3. Font Optimization (Self-Hosted)
* **Rule:** Never use `fonts.googleapis.com` (It adds a DNS lookup & connection overhead).
* **Strategy:** Use `next/font`. It automatically self-hosts Google Fonts and includes them in the build.
    ```javascript
    // app/layout.js
    import { Inter } from 'next/font/google'
    const inter = Inter({ subsets: ['latin'], display: 'swap' })
    ```

### 4. Third-Party Script Quarantine (Partytown)
* **Problem:** GTM, Chat Widgets, and Analytics scripts block the main thread.
* **Solution:** We do NOT use GTM Client-Side. But if a script is absolutely necessary (e.g., specific Chat tool):
    * **Off-Main-Thread:** Run it in a Web Worker using **Partytown**.
    * **Delay:** Load it 5 seconds after the page loads (`strategy="lazyOnload"`).

---

## 🖼️ IMAGE OPTIMIZATION PROTOCOL

Images are the #1 cause of slow websites.

### 1. The "Next/Image" Mandate
* **Strict Rule:** Never use the `<img>` tag. Always use `<Image />` from `next/image`.
* **Format:** All images must be served as **WebP** or **AVIF**. (Next.js does this automatically).
* **Sizes Attribute:** You MUST define the `sizes` prop.
    ```javascript
    <Image
      src="/hero.jpg"
      fill
      sizes="(max-width: 768px) 100vw, 50vw" // Mobile: Full width, Desktop: Half width
      priority={true} // Only for the Hero Image (Above Fold)
      alt="Oksijen Tüpü Servisi"
    />
    ```

### 2. LCP Image Preload
* The largest image on the screen (Hero Image) must have the `priority` prop.
* This tells the browser: *"Stop everything else and download this image first."*

---

## 🌩️ EDGE CACHING STRATEGY (Vercel/Cloudflare)

We treat the CDN as our primary database for static content.

### 1. Cache-Control Headers
* **HTML Pages:** `public, max-age=0, s-maxage=3600, stale-while-revalidate=86400`
    * *Translation:* "Serve cached content instantly (stale), then update it in the background."
* **Static Assets (Images/JS/CSS):** `public, max-age=31536000, immutable`
    * *Translation:* "Cache forever. These files never change (hashed names)."

### 2. Geo-Replication
* Content is served from the edge node **physically closest** to the user (e.g., Istanbul Pop). This reduces latency from 100ms to <20ms.

---

## 🧪 TESTING & MONITORING

### 1. CI/CD Gatekeeper (Lighthouse CI)
* Every Pull Request triggers a **Lighthouse CI** audit.
* If the score drops below 95, the merge button is **disabled**.

### 2. Real User Monitoring (RUM)
* We do not trust lab data alone. Our Go Tracking Service (`04_CUSTOM_TRACKING_LIB.md`) collects **Web Vitals** from real users.
    * *"Is the site slow for users in Bagcilar on 4G?"* -> We will know instantly.

---

**"If it's not instant, it's broken."**