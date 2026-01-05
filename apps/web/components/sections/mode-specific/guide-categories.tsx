'use client';

import Link from 'next/link';
import { BookOpen, Heart, Activity, Wind } from 'lucide-react';

/**
 * GuideCategories: INFORMATION_SEEKER mode specific section
 * Shows guide categories for learning
 */
export function GuideCategories() {
  const guides = [
    {
      title: 'Solunum Sistemleri',
      description: 'Oksijen konsantratörleri, solunum destek cihazları ve kullanım rehberleri',
      icon: Wind,
      href: '/rehber/solunum-sistemleri',
      color: 'blue',
    },
    {
      title: 'Evde Bakım Ekipmanları',
      description: 'Yatak, tekerlekli sandalye ve diğer evde bakım cihazları',
      icon: Heart,
      href: '/rehber/evde-bakim-ekipmanlari',
      color: 'red',
    },
    {
      title: 'Ölçüm Cihazları',
      description: 'Tansiyon, şeker ölçüm cihazları ve kullanım kılavuzları',
      icon: Activity,
      href: '/rehber/olcum-cihazlari',
      color: 'green',
    },
    {
      title: 'Kullanım Kılavuzları',
      description: 'Tüm cihazlar için detaylı kullanım ve bakım rehberleri',
      icon: BookOpen,
      href: '/rehber/solunum-sistemleri',
      color: 'purple',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    red: 'bg-red-50 border-red-200 text-red-600',
    green: 'bg-emerald-50 border-emerald-200 text-emerald-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Rehberler ve Bilgi Kaynakları
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Evde kullanım ekipmanları hakkında detaylı bilgiler, kullanım kılavuzları ve teknik rehberler.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guides.map((guide, index) => {
            const Icon = guide.icon;
            return (
              <Link
                key={index}
                href={guide.href}
                className={`group p-6 rounded-2xl border-2 ${colorClasses[guide.color as keyof typeof colorClasses]} hover:shadow-xl transition-all hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 rounded-xl ${colorClasses[guide.color as keyof typeof colorClasses]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">{guide.title}</h3>
                <p className="text-slate-600 text-sm" style={{ lineHeight: 1.8 }}>{guide.description}</p>
                <div className="mt-4 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Rehberi Oku →
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

