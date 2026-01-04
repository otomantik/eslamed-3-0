import { REALITY_ANCHORS } from './reality-anchors';

/**
 * Business Credentials: Verified claims only
 * ADSMantık Robotu - No hallucinations allowed
 * 
 * This file contains ONLY credentials that can be verified through official documents.
 * Any claim not in this list MUST NOT appear in UI components.
 */

export interface VerifiedCredential {
  id: string;
  label: string;
  value: string;
  verifiedBy: string;
  documentPath?: string; // Optional - may not exist for all credentials
}

/**
 * UNVERIFIED_BLOCKLIST: Specific phrases that MUST NOT appear in UI
 * ✅ FIXED: Use specific phrases, not generic keywords (avoids false positives)
 * These are claims not found in Reality Anchors and are considered hallucinations.
 */
export const UNVERIFIED_BLOCKLIST = [
  '15+ Yıl Deneyim',
  '15+ Yıl',
  'TSE Onaylı', // ✅ Specific phrase, not just "TSE"
  'TSE Belgeli', // ✅ Specific phrase
  'ISO 13485',
  'ISO 9001',
  'ISO 9001 & Full-Balance',
  'ISO 9001 & Full Balance',
  'Full-Balance',
  'Full Balance',
] as const;

/**
 * VERIFIED_CREDENTIALS: Only verified, documentable claims
 */
export const VERIFIED_CREDENTIALS: VerifiedCredential[] = [
  {
    id: 'uts-registered',
    label: 'ÜTS Kayıtlı',
    value: REALITY_ANCHORS.utsFirmNumber,
    verifiedBy: 'T.C. Sağlık Bakanlığı',
    documentPath: '/assets/documents/uts-firma-kayit-belgesi.pdf',
  },
  {
    id: 'ckys-registered',
    label: 'ÇKYS Kayıtlı',
    value: REALITY_ANCHORS.ckysRegistrationNumber,
    verifiedBy: 'T.C. Sağlık Bakanlığı',
    documentPath: '/assets/documents/tibbi-cihaz-satis-yetki-belgesi.pdf',
  },
  {
    id: 'licensed-business',
    label: 'Ruhsatlı İşletme',
    value: `Ruhsat No: ${REALITY_ANCHORS.businessLicense.number} (İtibaren: ${REALITY_ANCHORS.businessLicense.issuedDate})`,
    verifiedBy: 'Belediye',
    documentPath: '/assets/documents/isyeri-acma-ve-calisma-ruhsati.pdf',
  },
  {
    id: 'official-name',
    label: 'Resmi Ünvan',
    value: REALITY_ANCHORS.officialBusinessName,
    verifiedBy: 'Ticaret Sicil Gazetesi',
    // No documentPath - general business registration
  },
  {
    id: 'address',
    label: 'Adres',
    value: `${REALITY_ANCHORS.address.street}, ${REALITY_ANCHORS.address.city}, ${REALITY_ANCHORS.address.region} ${REALITY_ANCHORS.address.postalCode}`,
    verifiedBy: 'Resmi Kayıt',
    // No documentPath - address is in multiple documents
  },
];

/**
 * ✅ FIXED: Data-first validation - validates registry at initialization
 * Scans all exported strings against blocklist at runtime (not DOM-level)
 */
export function validateRegistry(): void {
  if (process.env.NODE_ENV === 'production') return;

  // Collect all string values from credentials
  const textBlocks = VERIFIED_CREDENTIALS.map((cred) => 
    `${cred.label} ${cred.value} ${cred.verifiedBy || ''}`
  ).join(' ');

  // Also validate Reality Anchors
  const anchorText = Object.values(REALITY_ANCHORS)
    .filter((v) => typeof v === 'string')
    .join(' ');

  const allText = `${textBlocks} ${anchorText}`.toLowerCase();

  // Check for blocklisted terms
  for (const term of UNVERIFIED_BLOCKLIST) {
    if (allText.includes(term.toLowerCase())) {
      throw new Error(
        `[ADSMantık Compliance] Unverified claim detected in registry: "${term}". This term is not in Reality Anchors and must be removed.`
      );
    }
  }
}

// Run validation at module load (dev-only)
if (process.env.NODE_ENV !== 'production') {
  validateRegistry();
}

/**
 * ✅ FIXED: Dev-only assertion - checks specific text blocks (not DOM)
 * Use this when constructing text blocks in components
 */
export function assertNoUnverifiedClaims(text: string): void {
  if (process.env.NODE_ENV === 'production') return;

  const lowerText = text.toLowerCase();
  const blocklisted = UNVERIFIED_BLOCKLIST.find((term) =>
    lowerText.includes(term.toLowerCase())
  );

  if (blocklisted) {
    throw new Error(
      `[ADSMantık Compliance] Unverified claim detected: "${blocklisted}". This term is not in Reality Anchors and must be removed.`
    );
  }
}

/**
 * ✅ FIXED: Safe credential getter - returns only verified credentials
 * Uses id for lookup (stable), not label (may change)
 */
export function getVerifiedCredential(id: string): VerifiedCredential | undefined {
  return VERIFIED_CREDENTIALS.find((cred) => cred.id === id);
}

/**
 * ✅ FIXED: Check if a credential id is verified (not label-based)
 */
export function isVerified(id: string): boolean {
  return VERIFIED_CREDENTIALS.some((cred) => cred.id === id);
}

