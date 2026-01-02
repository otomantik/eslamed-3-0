'use client';

import { useState } from 'react';
import { MessageCircle, Footprints } from 'lucide-react';
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
    'Merhaba, kişiye özel tabanlık analizi süreci hakkında bilgi almak istiyorum.'
  )}`;
  const categoryVisuals: Record<ProductTab, { src: string; alt: string; label: string }> = {
    respiratory: {
      // Fallback image: replace with a real WebP when available under /public/assets/
      src: '/assets/hero-bg.webp',
      alt: 'Ev tipi solunum destek ünitesi kurulumu - Oksijen konsantratörü teknik desteği İstanbul',
      label: 'Solunum destek grubunda kurulum ve teknik kullanım adımları',
    },
    diagnostic: {
      // Fallback image: replace with a real WebP when available under /public/assets/
      src: '/assets/hero-bg.webp',
      alt: 'Dijital tıbbi ölçüm cihazları teknik desteği - Tansiyon ölçüm cihazı kurulumu Eslamed',
      label: 'Tanı ve ölçüm grubunda cihaz seçimi ve teknik destek süreci',
    },
    homecare: {
      // Fallback image: replace with a real WebP when available under /public/assets/
      src: '/assets/hero-bg.webp',
      alt: 'Evde bakım ekipmanları uygunluk değerlendirmesi - Hasta yatağı ve mobilite ekipmanları İstanbul',
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
          id="vip-hizmetler"
        >
          <div
            className="rounded-3xl border border-slate-200 bg-slate-50/50 shadow-sm overflow-hidden"
            aria-labelledby="vip-tabanlik-title"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Left: image (full-bleed) */}
              <div className="relative w-full lg:w-1/2 h-64 sm:h-72 lg:h-auto lg:min-h-[420px]">
                <Image
                  // Fallback image: replace with /assets/kisiye-ozel-tabanlik-analizi.webp when uploaded.
                  src="/assets/hero-bg.webp"
                  alt="Kişiye özel tabanlık analizi ve ortopedik çözümler - Eslamed Çekmeköy"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-slate-900 text-xs font-semibold backdrop-blur-sm">
                  VIP / Öncelikli
                </div>
              </div>

              {/* Right: content (vertically centered) */}
              <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                    <Footprints className="w-5 h-5 text-slate-800" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h2
                      id="vip-tabanlik-title"
                      className="text-2xl lg:text-3xl font-semibold text-slate-900 leading-snug"
                    >
                      Kişiye Özel Tabanlık Analizi &amp; Çözümleri
                    </h2>
                    <p className="mt-3 text-slate-600" style={{ lineHeight: 1.8 }}>
                      Yürüme analizi ve biomekanik ölçümlerle size özel tabanlık çözümleri sunuyoruz. Ayak sağlığınız için uzman desteği alın.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={tabanlikWhatsappHref}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white px-6 py-3.5 text-sm font-semibold hover:bg-slate-800 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                    Randevu Al / Detaylı Bilgi
                  </a>
                  <div className="mt-3 text-xs text-slate-500">
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
              className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all hover:border-slate-300"
              style={{ willChange: 'transform' }}
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
              <h3 className="font-semibold text-slate-900 mb-4 text-sm" style={{ lineHeight: 1.8 }}>
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

