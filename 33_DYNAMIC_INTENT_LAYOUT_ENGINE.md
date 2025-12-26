# 33_DYNAMIC_INTENT_LAYOUT_ENGINE.tsx
## THE BRAIN (Frontend Logic)
**Tech:** Next.js 16 Server Actions.
**Function:** Determine user intent from URL + Referrer.
**Layouts:**
1. **URGENT:** (Pain keywords) -> Show 'Emergency WhatsApp' button immediately.
2. **RESEARCH:** (Price keywords) -> Show 'Price Calculator' & 'Before/After'.
3. **TRUST:** (Review keywords) -> Show 'Video Testimonials'.
**Switching:** Happens on Server Side (Zero Layout Shift).
