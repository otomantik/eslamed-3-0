'use client';

/**
 * EvidenceGuard: UTS Registration Verification Component
 * ADSMantık Integrity Feature - Evidence-First Rendering
 * 
 * Ensures product pages only render when utsRegistration.verifiedAt exists
 * Implements "No Evidence, No UI" rule to prevent unverified product claims
 */

import { SearchItem } from '@/lib/search/search-config';

export interface EvidenceGuardProps {
  item: SearchItem;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Verifies UTS registration status of a product
 * @param item - SearchItem to verify
 * @returns true if UTS registration is verified, false otherwise
 */
export function verifyUTSRegistration(item: SearchItem): boolean {
  if (!item.utsRegistration?.registered) {
    return false;
  }

  // ✅ ADSMantık: Must have registration number AND verification date
  return !!(
    item.utsRegistration.registrationNumber &&
    item.utsRegistration.verifiedAt
  );
}

/**
 * EvidenceGuard Component
 * Only renders children if UTS registration is verified
 * Shows fallback message if evidence is missing
 */
export function EvidenceGuard({ 
  item, 
  children,
  fallback 
}: EvidenceGuardProps) {
  const hasEvidence = verifyUTSRegistration(item);

  if (!hasEvidence) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200">
        <div className="max-w-md mx-auto space-y-4">
          <div className="text-slate-400">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">
              ÜTS Doğrulaması Gerekli
            </h3>
            <p className="text-sm text-slate-600">
              Bu ürün için doğrulanmış ÜTS kaydı bulunmamaktadır.
              <br />
              Lütfen bizimle iletişime geçin.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

