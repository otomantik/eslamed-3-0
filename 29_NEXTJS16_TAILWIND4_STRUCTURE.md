# 🏗️ 29_NEXTJS16_TAILWIND4_STRUCTURE.md (The Crystal Scaffold)

> **"Built on the bleeding edge. Minimal config, maximum velocity. We strip away the bloat of legacy React."**

This document specifies the **Directory Structure** and **Configuration Standards** for the Frontend `apps/web`.

---

## 📂 1. APP DIRECTORY (Next.js 16)
We strictly follow the App Router pattern with **Feature-Sliced Architecture** principles where applicable.

```text
/apps/web
├── /app
│   ├── /api                 # Route Handlers (Edge Compatible)
│   ├── /layout.tsx          # Root Layout (Fonts, Metadata)
│   ├── /page.tsx            # The Dynamic Entry Point (See File 33)
│   ├── /error.tsx           # Graceful Fallbacks
│   └── /global-error.tsx    # Catch-all
├── /components
│   ├── /ui                  # Shadcn/Radix Primitives (Atomic)
│   ├── /sections            # Hero, Pricing, Maps (Molecules)
│   └── /layouts             # Intent-based Layout Wrappers (Organisms)
├── /lib
│   ├── /actions.ts          # Server Actions (Form Handling)
│   └── /utils.ts            # Tailwind Merge, Formatters
├── /hooks                   # Client-side logic (rarely used)
└── /styles
    └── globals.css          # Tailwind 4 Imports
```

---

## 🎨 2. TAILWIND 4 CONFIGURATION (`globals.css`)
Tailwind 4 removes the need for a massive `tailwind.config.js`. We define the theme directly in CSS.

```css
@import "tailwindcss";

@theme {
  /* BRAND COLORS (Eslamed Identity) */
  --color-brand-primary:   oklch(0.55 0.25 255); /* Deep Medical Blue */
  --color-brand-accent:    oklch(0.85 0.15 85);  /* Urgent Amber */
  --color-brand-success:   oklch(0.70 0.20 145); /* Trust Green */
  
  /* UI SEMANTICS */
  --color-ui-bg:           oklch(0.98 0.01 240);
  --color-ui-surface:      oklch(1.00 0.00 0);
  
  /* TYPOGRAPHY */
  --font-sans:             "Inter", sans-serif;
  --font-display:          "Outfit", sans-serif;
  
  /* ANIMATIONS */
  --animate-pulse-fast:    pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* CUSTOM UTILITIES */
@utility container-wide {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
```

---

## ⚡ 3. NEXT.JS CONFIG (`next.config.ts`)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // 🚀 React 19 Features
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Parallel Routes & Interception are native now
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'eslamed.com' },
      { protocol: 'https', hostname: 'cdn.eslamed.com' } // Cloudflare Image Resizing
    ],
  },
};

export default nextConfig;
```

---

## 🔌 4. SERVER ACTIONS (React 19)
We do not use API Routes for form submissions. We use **Server Actions**.

**`lib/actions.ts`**
```typescript
'use server'

export async function submitLead(formData: FormData) {
  const rawData = {
    phone: formData.get('phone'),
    name: formData.get('name'),
    intent: formData.get('intent_hidden')
  }
  
  // Direct ClickHouse/Go Injection via Internal gRPC or HTTP
  await fetch('http://backend:8080/api/internal/ingest', {
    method: 'POST',
    body: JSON.stringify(rawData)
  })
}
```
