'use client';

import { ShieldCheck, CheckCircle2, FileText, Award } from 'lucide-react';
import Link from 'next/link';

/**
 * PremiumConciergeUI: VIP mode - Trust indicators and premium content
 * Hero is now outside, this only wraps content sections
 */
export function PremiumConciergeUI({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-50">
      {/* Trust Indicators Section - Mode-specific */}
      <section className="py-16 bg-white border-b border-blue-100">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">ÜTS Kayıtlı</h3>
                <p className="text-sm text-slate-600">T.C. Sağlık Bakanlığı kayıtlı</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">CE Belgeli</h3>
                <p className="text-sm text-slate-600">Avrupa standartlarına uygun</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">15+ Yıl Deneyim</h3>
                <p className="text-sm text-slate-600">Sektörde güvenilir geçmiş</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <Link href="/isletme-belgeleri" className="font-semibold text-slate-900 mb-1 hover:text-blue-600 transition-colors block">
                  İşletme Belgeleri
                </Link>
                <p className="text-sm text-slate-600">Tüm belgeleri görüntüle</p>
              </div>
            </div>
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
                    Evde ziyaret, yürüme analizi ve kişiye özel çözümler için uzman ekibimizle iletişime geçin.
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
                    <div className="text-blue-100 text-sm">Tam Yetkili Mobil Ekip</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-2xl font-bold text-white mb-1">24/7</div>
                    <div className="text-blue-100 text-sm">Destek Hattı</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-2xl font-bold text-white mb-1">100%</div>
                    <div className="text-blue-100 text-sm">Güvenilir Süreç</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-2xl font-bold text-white mb-1">15+</div>
                    <div className="text-blue-100 text-sm">Yıl Deneyim</div>
                  </div>
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


