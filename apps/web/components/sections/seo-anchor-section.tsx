'use client';

import { useEffect, useRef } from 'react';
import { CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { VERIFIED_CREDENTIALS, assertNoUnverifiedClaims } from '@/lib/integrity/business-credentials';
import { REALITY_ANCHORS } from '@/lib/integrity/reality-anchors';
import { VERIFIED_CORPORATE_STATUS_LABEL } from '@/lib/copy/truth-claims';

/**
 * SEOAnchorSection: Split layout with contextual content and verified credentials
 * ✅ ADSMantık Compliance: Only verified credentials from Reality Anchors
 * ✅ REMOVED: All hallucinations ('15+ Yıl', 'TSE Onaylı', 'ISO 13485')
 */
export function SEOAnchorSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // ✅ Data-first validation: Validate text blocks at render time (not DOM-level)
  const textContent = `ÜTS Firma No: ${REALITY_ANCHORS.utsFirmNumber} ÇKYS: ${REALITY_ANCHORS.ckysRegistrationNumber} Ruhsat No: ${REALITY_ANCHORS.businessLicense.number}`;
  if (process.env.NODE_ENV !== 'production') {
    assertNoUnverifiedClaims(textContent);
  }

  // Get verified credentials for display
  const displayCredentials = VERIFIED_CREDENTIALS.filter(
    (cred) => ['uts-registered', 'ckys-registered', 'licensed-business'].includes(cred.id)
  );

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 animate-fade-in-up"
      style={{ willChange: 'opacity, transform' }}
    >
      <div className="container-wide">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column: Contextual Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-slate-900 mb-4">
                  Profesyonel Medikal Ekipman Yönlendirme
                </h2>
                <p className="text-slate-900 text-sm md:text-base" style={{ lineHeight: 1.8 }}>
                  <strong className="text-slate-900 font-semibold">{REALITY_ANCHORS.officialBusinessName}</strong>, İstanbul Çekmeköy merkezli evde bakım medikal ekipman süreç yönlendirme merkezidir. 
                  Oksijen konsantratörü kurulumu, solunum destek cihazları, tansiyon ölçüm cihazları ve evde bakım ekipmanları için teknik rehberlik, 
                  kurulum ve güvenli kullanım desteği sağlarız.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-slate-900 text-sm md:text-base" style={{ lineHeight: 1.8 }}>
                    Tüm hizmetlerimiz <strong className="text-slate-900">ÜTS Kayıtlı</strong> (ÜTS Firma No: {REALITY_ANCHORS.utsFirmNumber}) ve <strong className="text-slate-900">CE mevzuatına uygun ürün tedariki</strong> ile yürütülür. 
                    İstanbul genelinde 2 tam yetkili mobil ekip ile hızlı ve planlı operasyon süreci yürütürüz.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-slate-900 text-sm md:text-base" style={{ lineHeight: 1.8 }}>
                    <strong className="text-slate-900">ÜTS Kayıtlı</strong> cihazlar ve <strong className="text-slate-900">CE mevzuatına uygun ürün tedariki</strong> için güvenilir süreç yönlendirmesi sunuyoruz.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-slate-900 text-sm md:text-base" style={{ lineHeight: 1.8 }}>
                    Tanı ve tedavi kararı hekimlere aittir; bu hizmet tıbbi tanı veya tedavi sunmaz.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Verified Credentials Only */}
            <div className="flex flex-col justify-center">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-6 text-center">
                  {VERIFIED_CORPORATE_STATUS_LABEL}
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {displayCredentials.map((cred) => {
                    // ✅ FIXED: documentPath optional - render disabled if not available
                    const content = (
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-slate-900 text-sm mb-1">{cred.label}</div>
                          <div className="text-xs text-slate-600 font-mono break-all">{cred.value}</div>
                          {cred.verifiedBy && (
                            <div className="text-xs text-slate-500 mt-1">Doğrulayan: {cred.verifiedBy}</div>
                          )}
                        </div>
                      </div>
                    );

                    return cred.documentPath ? (
                      <a
                        key={cred.id}
                        href={cred.documentPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={cred.id} className="opacity-75 cursor-not-allowed" title="Belge yolu mevcut değil">
                        {content}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

