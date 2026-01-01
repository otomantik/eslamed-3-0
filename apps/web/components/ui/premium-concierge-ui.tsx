'use client';

import { Calendar, Home, UserCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

/**
 * PremiumConciergeUI: VIP mode - Serif fonts, premium copy, home visit focus
 */
export function PremiumConciergeUI({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}>
      {/* Premium Header */}
      <header className="border-b" style={{ borderColor: 'rgba(184, 134, 11, 0.2)' }}>
        <div className="container-wide py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-premium)', color: 'var(--accent-vip)' }}>
                ESLAMED VIP Danışmanlık
              </h1>
              <p className="text-sm mt-1 opacity-80">Kişiye Özel Medikal Çözümler</p>
            </div>
            <Link
              href="/tabanlik"
              className="min-h-[48px] inline-flex items-center gap-2 px-4 py-2 rounded-lg border"
              style={{ borderColor: 'var(--accent-vip)', color: 'var(--accent-vip)' }}
            >
              <Sparkles className="w-5 h-5" strokeWidth={1.5} />
              <span>VIP Hizmetler</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Premium CTA Section */}
      <section className="py-12">
        <div className="container-wide">
          <div className="bg-gradient-to-br from-amber-900/20 to-amber-800/10 rounded-3xl p-8 border" style={{ borderColor: 'var(--accent-vip)' }}>
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-premium)', color: 'var(--accent-vip)' }}>
                Özel Danışmanlık Randevusu Planla
              </h2>
              <p className="text-lg mb-6 opacity-90" style={{ lineHeight: 1.8 }}>
                Evde ziyaret, yürüme analizi ve kişiye özel çözümler için uzman ekibimizle iletişime geçin.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                  <Home className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'var(--accent-vip)' }} strokeWidth={1.5} />
                  <div>
                    <h3 className="font-semibold mb-1">Evde Ziyaret</h3>
                    <p className="text-sm opacity-80">Çekmeköy merkezli, İstanbul genelinde evde hizmet</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                  <UserCheck className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'var(--accent-vip)' }} strokeWidth={1.5} />
                  <div>
                    <h3 className="font-semibold mb-1">Yürüme Analizi</h3>
                    <p className="text-sm opacity-80">Bilgisayarlı analiz ile kişiye özel tabanlık</p>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/905372425535?text=VIP%20danışmanlık%20randevusu%20almak%20istiyorum"
                className="min-h-[56px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-lg transition-all hover:scale-105"
                style={{ backgroundColor: 'var(--accent-vip)', color: '#111827' }}
                aria-label="VIP danışmanlık randevusu planla"
              >
                <Calendar className="w-6 h-6" strokeWidth={2} />
                <span>Randevu Planla</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Premium Typography */}
      <div className="container-wide pb-12">
        <div style={{ fontFamily: 'var(--font-sans)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

