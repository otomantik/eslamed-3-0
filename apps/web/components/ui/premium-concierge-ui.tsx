'use client';

import { ShieldCheck, CheckCircle2, FileText } from 'lucide-react';
import Link from 'next/link';
import { VERIFIED_CREDENTIALS, assertNoUnverifiedClaims } from '@/lib/integrity/business-credentials';
import { EXPERT_TEAM_LABEL, AUTHORIZED_MOBILE_TEAM_LABEL, VERIFIED_PROCESS_LABEL } from '@/lib/copy/truth-claims';

/**
 * PremiumConciergeUI: VIP mode - Trust indicators and premium content
 * ✅ ADSMantık Compliance: Only verified credentials from Reality Anchors
 * ✅ REMOVED: '15+ Yıl Deneyim' (hallucination) - removed from both locations
 */
export function PremiumConciergeUI({ children }: { children: React.ReactNode }) {
  // ✅ Data-first validation: Validate text blocks at component level (not DOM)
  const textContent = VERIFIED_CREDENTIALS.map(cred => `${cred.label} ${cred.value}`).join(' ');
  if (process.env.NODE_ENV !== 'production') {
    assertNoUnverifiedClaims(textContent);
  }

  // Get only verified credentials for VIP display
  const vipCredentials = VERIFIED_CREDENTIALS.filter(
    (cred) => ['uts-registered', 'ckys-registered', 'licensed-business'].includes(cred.id)
  );

  return (
    <div className="bg-blue-50">
      {/* Trust Indicators Section - Mode-specific */}
      <section className="py-16 bg-white border-b border-blue-100">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* ✅ FIXED: Removed duplicate, only showing verified credentials */}
            {vipCredentials.map((cred) => {
              const icon = cred.id === 'uts-registered' ? ShieldCheck : CheckCircle2;
              const Icon = icon;

              const cardContent = (
                <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl border border-blue-200 hover:shadow-md hover:border-blue-300 transition-all w-full">
                  <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{cred.label}</h3>
                    <p className="text-sm text-slate-600">{cred.value}</p>
                  </div>
                </div>
              );

              // ✅ FIXED: documentPath optional - render disabled if not available
              return cred.documentPath ? (
                <a
                  key={cred.id}
                  href={cred.documentPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {cardContent}
                </a>
              ) : (
                <div key={cred.id} className="opacity-75 cursor-not-allowed" title="Belge yolu mevcut değil">
                  {cardContent}
                </div>
              );
            })}

            {/* İşletme Belgeleri Link */}
            <Link
              href="/isletme-belgeleri"
              className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl border border-blue-200 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1 hover:text-blue-600 transition-colors">
                  İşletme Belgeleri
                </h3>
                <p className="text-sm text-slate-600">Tüm belgeleri görüntüle</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* VIP Consultation Card - Experimental floating card */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 shadow-2xl transform hover:scale-[1.01] transition-transform duration-300">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Özel Danışmanlık Randevusu
                  </h2>
                  <p className="text-blue-50 text-lg mb-6 leading-relaxed">
                    Evde ziyaret, yürüme analizi ve kişiye özel çözümler için {EXPERT_TEAM_LABEL.toLowerCase()} iletişime geçin.
                  </p>
                  <a
                    href="https://wa.me/905372425535?text=VIP%20danışmanlık%20randevusu%20almak%20istiyorum"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg"
                  >
                    <span>Randevu Planla</span>
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-2xl font-bold text-white mb-1">2</div>
                    <div className="text-blue-100 text-sm">{AUTHORIZED_MOBILE_TEAM_LABEL}</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-2xl font-bold text-white mb-1">7/24</div>
                    <div className="text-blue-100 text-sm">Mesaj Kabul</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-2xl font-bold text-white mb-1">✓</div>
                    <div className="text-blue-100 text-sm">{VERIFIED_PROCESS_LABEL}</div>
                  </div>
                  {/* ✅ REMOVED: "15+ Yıl Deneyim" duplicate - no longer showing */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-wide pb-12">
        {children}
      </div>
    </div>
  );
}


