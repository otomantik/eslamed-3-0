'use client';

import { ShieldCheck, Settings, Building2 } from 'lucide-react';
import Link from 'next/link';
import { assertNoUnverifiedClaims } from '@/lib/integrity/business-credentials';
import { REALITY_ANCHORS } from '@/lib/integrity/reality-anchors';

/**
 * InteractiveStats: Verified Institutional Status Component
 * ✅ ADSMantık Compliance: Only verified credentials from Reality Anchors
 * ✅ REMOVED: 'ISO 9001 & Full-Balance' (hallucination)
 */
export function InteractiveStats() {
  // ✅ Data-first validation: Validate text blocks at component level
  const textContent = `ÇKYS: ${REALITY_ANCHORS.ckysRegistrationNumber} ÜTS Firma No: ${REALITY_ANCHORS.utsFirmNumber} Ruhsat No: ${REALITY_ANCHORS.businessLicense.number}`;
  if (process.env.NODE_ENV !== 'production') {
    assertNoUnverifiedClaims(textContent);
  }

  const stats = [
    {
      icon: Building2,
      title: 'ÇKYS Kayıtlı',
      description: REALITY_ANCHORS.ckysRegistrationNumber,
      color: 'blue',
      link: '/isletme-belgeleri',
    },
    {
      icon: Settings,
      title: 'ÜTS Kayıtlı',
      description: REALITY_ANCHORS.utsFirmNumber,
      color: 'amber',
      link: '/isletme-belgeleri',
    },
    {
      icon: ShieldCheck,
      title: 'Ruhsatlı İşletme',
      description: `Ruhsat No: ${REALITY_ANCHORS.businessLicense.number} (İtibaren: ${REALITY_ANCHORS.businessLicense.issuedDate})`,
      color: 'emerald',
      link: '/isletme-belgeleri',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  };

  return (
    <section id="interactive-stats" className="py-16 bg-linear-to-br from-slate-50 to-slate-100">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-slate-900 mb-4">
            Kurumsal Doğrulama ve Kayıtlar
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Resmi makamlarca onaylı kurumsal yetkinlik ve yasal belgelerimiz. Tüm bilgiler güncel kayıtlarla eşleşmektedir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const CardContent = (
              <>
                <div className="flex items-center justify-center mb-4">
                  <Icon className="w-10 h-10 opacity-90" strokeWidth={2} />
                </div>
                <div className="text-base md:text-lg font-semibold text-slate-900 mb-2 leading-tight">
                  {stat.title}
                </div>
                <div className="text-xs md:text-sm text-slate-600 font-medium">{stat.description}</div>
              </>
            );

            return (
              <Link
                key={index}
                href={stat.link!}
                className={`block p-6 md:p-7 rounded-2xl border-2 ${colorClasses[stat.color as keyof typeof colorClasses]} transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer`}
              >
                {CardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
