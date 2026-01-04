'use client';

import { CheckCircle2 } from 'lucide-react';
import { VERIFIED_CREDENTIALS, assertNoUnverifiedClaims } from '@/lib/integrity/business-credentials';

/**
 * CertificateTicker: Displays ONLY verified credentials in a scrolling marquee
 * ✅ ADSMantık Compliance: No hallucinations
 * ✅ REMOVED: All unverified claims
 */
export function CertificateTicker() {
  // Only show verified credentials
  const verifiedLabels = VERIFIED_CREDENTIALS.map(cred => cred.label);
  
  // ✅ Data-first validation: Validate at component level
  const textContent = verifiedLabels.join(' ');
  if (process.env.NODE_ENV !== 'production') {
    assertNoUnverifiedClaims(textContent);
  }

  if (verifiedLabels.length === 0) {
    return null; // Don't render if no verified credentials
  }

  /**
   * ✅ OPTIMIZED: Certificate item rendering helper
   */
  const renderCertificateItem = (cert: string, key: string | number) => (
    <div
      key={key}
      className="flex-shrink-0 flex items-center gap-2 text-slate-700 font-semibold text-sm px-6"
    >
      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" strokeWidth={1.5} />
      <span className="whitespace-nowrap">{cert}</span>
    </div>
  );

  // ✅ OPTIMIZED: Duplicate for seamless loop (2 sets sufficient, CSS handles animation)
  const duplicatedCertificates = [...verifiedLabels, ...verifiedLabels];

  return (
    <section className="bg-white border-b border-slate-200 py-3 w-full overflow-hidden">
      <div className="relative w-full overflow-hidden">
        <div
          className="flex items-center animate-marquee"
          style={{
            animationDuration: '20s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            willChange: 'transform',
          }}
        >
          {duplicatedCertificates.map((cert, idx) => renderCertificateItem(cert, idx))}
        </div>
      </div>
    </section>
  );
}

