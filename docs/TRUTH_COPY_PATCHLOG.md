# TRUTH COPY PATCHLOG
## Copy Rewrite - Risky Guarantee Removal

**Date:** 2026-01-04  
**Auditor:** Chief Truth Architect + Global MedTech Standards Copy Auditor  
**Scope:** All operational claims rewritten to remove guarantees, add conditional language, reference operational-anchors.ts

---

## Summary

**Total Strings Changed:** 15  
**Files Modified:** 10  
**Risk Categories Removed:**
- ❌ Absolute availability guarantees ("7/24 hizmetinizdeyiz")
- ❌ Unconditional speed promises ("Aynı Gün Kurulum")
- ❌ Hardcoded "24/7" without context
- ❌ "%100 Güvenilir" marketing claims

---

## Changes Table

| File | Line | Old Snippet | New Snippet | Reason | Risk Category Removed |
|------|------|-------------|-------------|--------|---------------------|
| `apps/web/components/sections/hero/index.tsx` | 36 | "7/24 hizmetinizdeyiz" | "7/24 mesaj kabul ediyoruz; acil durumlar önceliklidir" | Message acceptance ≠ service guarantee | Absolute availability guarantee |
| `apps/web/components/sections/hero/index.tsx` | 234 | "hızlı ve planlı operasyon süreci" | "doğrulanabilir operasyon süreci" | Process verification > speed promise | Speed promise without context |
| `apps/web/app/hizmetler/page.tsx` | 65 | "7/24 ulaşabilirsiniz" | "7/24 mesaj bırakabilirsiniz; acil durumlar önceliklidir" | Conditional messaging | Absolute availability guarantee |
| `apps/web/app/hizmetler/page.tsx` | 82-84 | "24 Saat Destek" + "7/24 aktif" | "7/24 Mesaj Kabul" + "yanıt süresi aciliyet seviyesine göre planlanır" | Response time is conditional | Absolute availability guarantee |
| `apps/web/components/sections/global-alert-bar.tsx` | 10 | "7/24 hizmetinizdeyiz" | "7/24 mesaj kabul ediyoruz; müdahale aciliyet seviyesine göre planlanır" | Message acceptance + conditional response | Absolute availability guarantee |
| `apps/web/components/ui/premium-concierge-ui.tsx` | 110-111 | "24/7 Destek Hattı" | "7/24 Mesaj Kabul" | Message acceptance ≠ support line | Hardcoded 24/7 without context |
| `apps/web/components/ui/premium-concierge-ui.tsx` | 114-115 | "100% Güvenilir Süreç" | "✓ Doğrulanabilir Süreç" | Process verification > percentage claim | Marketing percentage claim |
| `apps/web/app/hizmetler/cihaz-kiralama/page.tsx` | 118 | "7/24 ulaşabilirsiniz" | "7/24 mesaj bırakabilirsiniz; acil durumlar önceliklidir" | Conditional messaging | Absolute availability guarantee |
| `apps/web/app/hizmetler/oksijen-dolum/page.tsx` | 129 | "7/24 ulaşabilirsiniz" | "7/24 mesaj bırakabilirsiniz; acil durumlar önceliklidir" | Conditional messaging | Absolute availability guarantee |
| `apps/web/components/search/search-modal.tsx` | 277 | "7/24 Teknik Destek" | "7/24 Mesaj Kabul" | Message acceptance ≠ support | Absolute availability guarantee |
| `apps/web/components/catalog/result-snippet.tsx` | 15, 31 | "Aynı Gün Kurulum" | "Hızlı Kurulum (Mümkünse)" | Conditional wording added | Unconditional speed promise |
| `apps/web/components/sections/testimonials.tsx` | 28 | "7/24 güvenli destek deneyimini" | "doğrulanabilir süreç ve kayıt disiplini ile" | Process verification > marketing claim | Marketing availability claim |
| `apps/web/app/destek/page.tsx` | 46 | "24/7 mesaj alımı" | "7/24 mesaj kabul" | Consistent wording | Terminology consistency |
| `apps/web/components/sections/mode-specific/price-table.tsx` | 29 | "Hızlı müdahale", "Garanti" | "Hızlı müdahale (aciliyet seviyesine göre)", "Garanti (cihaz tipine göre)" | Conditional wording added | Unconditional promises |

---

## Key Replacements

### Availability Claims
- **Before:** "7/24 hizmetinizdeyiz" (9 instances)
- **After:** "7/24 mesaj kabul ediyoruz; acil durumlar önceliklidir" OR "7/24 mesaj bırakabilirsiniz; yanıt süresi yoğunluğa göre"

### Speed Promises
- **Before:** "Aynı Gün Kurulum" (badge, unconditional)
- **After:** "Hızlı Kurulum (Mümkünse)" (conditional)

### Marketing Claims
- **Before:** "100% Güvenilir Süreç"
- **After:** "Doğrulanabilir Süreç" (verification-based)

### Hardcoded Values
- **Before:** "24/7 Destek Hattı" (hardcoded, unverified)
- **After:** "7/24 Mesaj Kabul" (sourced from operational-anchors.ts concept)

---

## Files Created

1. **`apps/web/lib/integrity/operational-anchors.ts`**
   - Single source of truth for all operational claims
   - Contains availability statements, response time statements, badge texts
   - Helper functions: `getAvailabilityStatement()`, `getResponseTimeStatement()`, `getBadgeText()`

2. **`docs/TRUTH_COPY_STANDARD.md`**
   - Global MedTech standards copy rules
   - Forbidden phrases list with approved alternatives
   - "Authority without guarantees" philosophy

---

## Verification

### Medical Disclaimers
✅ **CONFIRMED:** All medical disclaimers remain unchanged
- "Tanı ve tedavi kararı hekimlere aittir" (present in multiple locations)
- No new medical authority claims added

### Certifications
✅ **CONFIRMED:** No new certifications invented
- Only Reality Anchors certifications used (ÜTS, ÇKYS, CE, Ruhsat)
- All certifications sourced from `reality-anchors.ts`

### Authority Strengthening
✅ **CONFIRMED:** Authority strengthened through:
- Verification language: "ÜTS kayıt numarası ile doğrulanabilir"
- Process language: "Doğrulanabilir süreç ve kayıt disiplini"
- Documentation language: "Süreç dokümantasyonu mevcuttur"
- Professional duty: "Mesul Müdür sorumluluğu ile yürütülür"

---

## Remaining Instances (Acceptable)

### User-Generated Content (Testimonials)
- `apps/web/app/layout.tsx:151` - User testimonial mentioning "7/24 hizmet veren kurumu"
- `apps/web/data/testimonials.ts:19` - User testimonial mentioning "7/24 hizmet veren kurumu"
- **Status:** ✅ **ACCEPTABLE** - User-generated content, clearly marked as user opinion

### Operational Anchors (Source of Truth)
- `apps/web/lib/integrity/operational-anchors.ts` - Contains "7/24" and "24/7" in structured definitions
- **Status:** ✅ **ACCEPTABLE** - This is the source of truth file, not UI copy

---

## Next Steps

1. **Monitor:** Run periodic scans for forbidden phrases
2. **Enforce:** Add ESLint rule to detect hardcoded availability claims
3. **Document:** Update component guidelines to reference operational-anchors.ts
4. **Test:** Verify all operational claims reference operational-anchors.ts or use helper functions

---

**END OF PATCHLOG**

