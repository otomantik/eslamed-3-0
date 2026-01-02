'use client';

import { useEffect, useRef } from 'react';
import { CheckCircle2, ShieldCheck, Clock, MapPin } from 'lucide-react';

/**
 * SEOAnchorSection: Split layout with contextual content and trust wall
 * Left: SEO-optimized content blocks with checkmarks
 * Right: Trust badges grid (certificates)
 * Professional dual-column design for better readability
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
                  <strong className="text-slate-900 font-semibold">ESLAMED</strong>, İstanbul Çekmeköy merkezli evde bakım medikal ekipman süreç yönlendirme merkezidir. 
                  Oksijen konsantratörü kurulumu, solunum destek cihazları, tansiyon ölçüm cihazları ve evde bakım ekipmanları için teknik rehberlik, 
                  kurulum ve güvenli kullanım desteği sağlarız.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-slate-900 text-sm md:text-base" style={{ lineHeight: 1.8 }}>
                    Tüm hizmetlerimiz <strong className="text-slate-900">Sağlık Bakanlığı ÜTS kayıtlı</strong> ve <strong className="text-slate-900">CE belgelidir</strong>. 
                    İstanbul genelinde 2 tam yetkili mobil ekip ile hızlı ve planlı operasyon süreci yürütürüz.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-slate-900 text-sm md:text-base" style={{ lineHeight: 1.8 }}>
                    ÜTS kayıtlı cihazlar, CE uygunluk belgeleri ve <strong className="text-slate-900">ISO 13485 standartlarına uygun</strong> medikal donanımlar için güvenilir süreç yönlendirmesi sunuyoruz.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-slate-900 text-sm md:text-base" style={{ lineHeight: 1.8 }}>
                    Tanı ve tedavi kararı hekimlere aittir; bu hizmet tanı/tedavi sunmaz, yalnızca teknik süreç ve donanım yönetimi alanında destek sağlar.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Trust Wall (Certificates Grid) */}
            <div className="flex flex-col justify-center">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-6 text-center">
                  Yetkinlik ve Belgeler
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'ISO 13485', icon: ShieldCheck, color: 'text-blue-600' },
                    { label: 'CE Uygunluk', icon: CheckCircle2, color: 'text-emerald-600' },
                    { label: 'ÜTS Kayıtlı', icon: CheckCircle2, color: 'text-emerald-600' },
                    { label: '15+ Yıl Deneyim', icon: Clock, color: 'text-slate-600' },
                    { label: 'TSE Onaylı', icon: ShieldCheck, color: 'text-blue-600' },
                    { label: '7/24 Destek', icon: Clock, color: 'text-slate-600' },
                  ].map((badge, index) => {
                    const Icon = badge.icon;
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-white hover:shadow-sm transition-all group"
                      >
                        <Icon className={`w-6 h-6 ${badge.color} group-hover:scale-110 transition-transform`} strokeWidth={1.5} />
                        <span className="text-xs font-semibold text-slate-700 text-center leading-tight">{badge.label}</span>
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

