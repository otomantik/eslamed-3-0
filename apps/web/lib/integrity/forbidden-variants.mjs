/**
 * FORBIDDEN_VARIANTS: Terminology drift prevention
 * 
 * These are NON-CANONICAL variants that MUST NOT appear in codebase.
 * Canonical terms are defined in business-credentials.ts
 * 
 * ✅ ADSMantık Compliance: Zero-drift terminology enforcement
 */

export const FORBIDDEN_VARIANTS = [
  // ÜTS variants (canonical: "ÜTS Kayıtlı")
  'ÜTS kayıtlı',
  'ÜTS Kayıtlı Cihazlar',
  'ÜTS kayıtlı cihazlar',
  'ÜTS kayıtlı cihaz',
  'ÜTS Onaylı',
  'ÜTS Kaydı Var',
  'Sağlık Bakanlığı ÜTS kayıtlı',
  'T.C. Sağlık Bakanlığı ÜTS Kayıtlı',
  
  // ÇKYS variants (canonical: "ÇKYS Kayıtlı")
  'ÇKYS Onayı',
  'ÇKYS Sistemi',
  'ÇKYS Onaylı',
  
  // Ruhsat variants (canonical: "Ruhsatlı İşletme")
  'Resmi İşletme',
  'Lisanslı İşletme',
  'İşletme Ruhsat No',
  'İş Yeri Ruhsatı',
  
  // CE variants (canonical: "CE mevzuatına uygun ürün tedariki")
  'CE belgeli',
  'CE Belgeli',
  'CE standartlarına uygun',
  'CE uygunluk belgeleri',
  'CE belgeli medikal',
  'CE Belgeli Medikal',
  
  // Status variants (canonical: "Doğrulanabilir Kurumsal Statü")
  'Kurumsal Güvence',
  'Resmi Statü Kartı',
  'Doğrulanabilir Statü',
  
  // Medical disclaimer variants (canonical: "Tanı ve tedavi kararı hekimlere aittir; bu hizmet tıbbi tanı veya tedavi sunmaz.")
  // Note: "tanı veya tedavi sunmaz" is part of canonical, so we only flag incomplete forms
  'tanı/tedavi sunmaz',
  'tıbbi tanı/tedavi',
  'klinik kararlar hekimlere aittir',
  'Tıbbi tanı veya tedavi amacı taşımaz',
  // Only flag "tanı veya tedavi sunmaz" when NOT preceded by full canonical form
  // This will be handled by regex in the script
  
  // Unverified claims (from UNVERIFIED_BLOCKLIST)
  '15+ Yıl Deneyim',
  '15+ Yıl',
  'TSE Onaylı',
  'TSE Belgeli',
  'ISO 13485',
  'ISO 9001',
  'ISO 9001 & Full-Balance',
  'ISO 9001 & Full Balance',
  'Full-Balance',
  'Full Balance',
];

/**
 * Case-insensitive check helper
 */
export function isForbiddenVariant(text) {
  const lowerText = text.toLowerCase();
  return FORBIDDEN_VARIANTS.some(variant => 
    lowerText.includes(variant.toLowerCase())
  );
}

/**
 * Get all matches in text
 */
export function findForbiddenVariants(text) {
  const matches = [];
  const lowerText = text.toLowerCase();
  
  FORBIDDEN_VARIANTS.forEach(variant => {
    if (lowerText.includes(variant.toLowerCase())) {
      matches.push(variant);
    }
  });
  
  return matches;
}

