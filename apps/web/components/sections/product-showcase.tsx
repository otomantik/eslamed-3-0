'use client';

import { useState } from 'react';
import { MessageCircle, Footprints, Ruler } from 'lucide-react';
import Image from 'next/image';

type ProductTab = 'respiratory' | 'diagnostic' | 'homecare';

interface Product {
  id: string;
  name: string;
  category: ProductTab;
}

const products: Product[] = [
  // Respiratory
  { id: '1', name: 'Respirox SZ-5AW Oksijen Konsantratörü', category: 'respiratory' },
  { id: '2', name: '10 Lt Medikal Oksijen Tüpü', category: 'respiratory' },
  { id: '3', name: 'Respirox Nemlendirici', category: 'respiratory' },
  // Diagnostic
  { id: '4', name: 'Omron M2 Basic Tansiyon Aleti', category: 'diagnostic' },
  { id: '5', name: 'Jumper Temassız Ateş Ölçer', category: 'diagnostic' },
  // Home Care
  { id: '6', name: 'Endostall Havalı Yatak (Baklava Tipi)', category: 'homecare' },
  { id: '7', name: 'Önlem Hasta Bezi', category: 'homecare' },
];

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState<ProductTab>('respiratory');

  const filteredProducts = products.filter(p => p.category === activeTab);
  const tabanlikWhatsappHref = `https://wa.me/905372425535?text=${encodeURIComponent(
    'Merhaba, Kişiye Özel Tabanlık Analizi & Çözümleri hakkında detaylı bilgi almak istiyorum.'
  )}`;
  const categoryVisuals: Record<ProductTab, { src: string; alt: string; label: string }> = {
    respiratory: {
      src: '/assets/ev-tipi-solunum-destek-unitesi-kurulumu.webp',
      alt: 'Ev tipi solunum destek ünitesi kurulumu',
      label: 'Solunum destek grubunda kurulum ve teknik kullanım adımları',
    },
    diagnostic: {
      src: '/assets/dijital-tibbi-olcum-cihazlari-teknik-destegi.webp',
      alt: 'Dijital tıbbi ölçüm cihazları teknik desteği',
      label: 'Tanı ve ölçüm grubunda cihaz seçimi ve teknik destek süreci',
    },
    homecare: {
      src: '/assets/evde-medikal-bakim-ekipmanlari.webp',
      alt: 'Evde bakım ekipmanları uygunluk değerlendirmesi',
      label: 'Evde bakım grubunda ekipman uygunluğu ve kullanım koşulları',
    },
  };
  const activeVisual = categoryVisuals[activeTab];

  const tabs = [
    { id: 'respiratory' as ProductTab, label: 'Solunum' },
    { id: 'diagnostic' as ProductTab, label: 'Tanı & Ölçüm' },
    { id: 'homecare' as ProductTab, label: 'Evde Bakım' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900 mb-4">
            Öne Çıkan Medikal Destek Grupları
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Solunum desteği, evde bakım ve ölçüm/takip kategorilerinde örnek ürünler
          </p>
        </div>

        {/* VIP featured service (orthopedic) */}
        <section
          aria-label="Kişiye Özel Tabanlık"
          className="mb-10"
        >
          <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative min-h-[220px] sm:min-h-[260px]">
                {/* Use <img> to keep this as a placeholder even if the asset isn't uploaded yet. */}
                <img
                  src="/assets/kisiye-ozel-tabanlik-analizi.webp"
                  alt="Kişiye özel tabanlık analizi ve ortopedik çözümler - Eslamed"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-white text-xs backdrop-blur-sm">
                  <Ruler className="w-4 h-4" strokeWidth={1.5} />
                  VIP / Öncelikli
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                    <Footprints className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl font-display font-semibold text-slate-900 leading-snug">
                      Kişiye Özel Tabanlık Analizi &amp; Çözümleri
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      Yürüme analizi ve biomekanik ölçümlerle size özel tabanlık çözümleri sunuyoruz. Ayak sağlığınız için uzman desteği alın.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href={tabanlikWhatsappHref}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white px-5 py-3 text-sm font-semibold hover:bg-slate-800 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                    Randevu Al / Detaylı Bilgi
                  </a>
                  <div className="text-xs text-slate-500 sm:self-center">
                    Hekim planına uygun teknik süreç bilgilendirmesi.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="flex justify-center border-b border-slate-200 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              {/* Category visual (SEO/accessibility-ready). Image files can be added later without code changes. */}
              <div className="aspect-square bg-slate-100 rounded-lg mb-4 overflow-hidden relative">
                <Image
                  src={activeVisual.src}
                  alt={activeVisual.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-white text-xs font-medium leading-snug">
                    {activeVisual.label}
                  </div>
                </div>
              </div>

              {/* Product Name */}
              <h3 className="font-semibold text-slate-900 mb-4 text-sm leading-relaxed">
                {product.name}
              </h3>

              {/* CTA Button */}
              <a
                href={`https://wa.me/905372425535?text=${encodeURIComponent(`${product.name} hakkında bilgi almak istiyorum.`)}`}
                className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 px-4 py-3 rounded-lg transition-colors font-medium text-sm border border-slate-200"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                Bilgi Al
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

