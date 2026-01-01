'use client';

import { useState } from 'react';
import Image from 'next/image';

export function BrandTrustTicker() {
  const brands = [
    { name: 'Philips', logo: '/assets/logos/philips.svg', isSvg: true },
    { name: 'Respirox', logo: '/assets/logos/respirox.png', isSvg: false },
    { name: 'Omron', logo: '/assets/logos/omron.png', isSvg: false },
    { name: 'Jumper', logo: '/assets/logos/jumper.png', isSvg: false },
    { name: 'Endostall', logo: '/assets/logos/endostall.png', isSvg: false },
    { name: 'Önlem', logo: '/assets/logos/onlem.png', isSvg: false },
    { name: 'Diamond Mama', logo: null, isSvg: false }, // Logo bulunamadı, fallback kullanılacak
  ];

  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (brandName: string) => {
    setFailedImages((prev) => new Set(prev).add(brandName));
  };

  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200">
      <div className="container-wide">
        <p className="text-xs text-slate-500 text-center mb-6 font-normal">
          Güvenilir medikal markalarla çalışıyoruz
        </p>
        <div className="relative overflow-hidden">
          <div className="flex items-center gap-12 animate-marquee" style={{ animationDuration: '40s' }}>
            {brands.map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center h-10 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 relative"
              >
                {!brand.logo || failedImages.has(brand.name) ? (
                  <span className="text-slate-400 font-semibold text-base tracking-wide whitespace-nowrap px-3">
                    {brand.name}
                  </span>
                ) : brand.isSvg ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-10 w-auto object-contain"
                    style={{ 
                      filter: 'grayscale(100%)', 
                      transition: 'filter 0.3s ease',
                      maxWidth: '120px',
                      height: '40px',
                      objectFit: 'contain'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = 'grayscale(0%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = 'grayscale(100%)';
                    }}
                    onError={() => handleImageError(brand.name)}
                  />
                ) : (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain"
                    style={{ maxWidth: '120px' }}
                    unoptimized
                    onError={() => handleImageError(brand.name)}
                  />
                )}
              </div>
            ))}
            {/* Duplicate for seamless loop effect */}
            {brands.map((brand, index) => (
              <div
                key={`dup-${index}`}
                className="flex-shrink-0 flex items-center justify-center h-10 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 relative"
              >
                {!brand.logo || failedImages.has(brand.name) ? (
                  <span className="text-slate-400 font-semibold text-base tracking-wide whitespace-nowrap px-3">
                    {brand.name}
                  </span>
                ) : brand.isSvg ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-10 w-auto object-contain"
                    style={{ 
                      filter: 'grayscale(100%)', 
                      transition: 'filter 0.3s ease',
                      maxWidth: '120px',
                      height: '40px',
                      objectFit: 'contain'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = 'grayscale(0%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = 'grayscale(100%)';
                    }}
                    onError={() => handleImageError(brand.name)}
                  />
                ) : (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain"
                    style={{ maxWidth: '120px' }}
                    unoptimized
                    onError={() => handleImageError(brand.name)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Verified feedback (GBP-less, skeleton mode) */}
        <div className="mt-10 border-t border-slate-200 pt-8">
          <div className="text-center">
            <h2 className="text-sm font-semibold text-slate-900">
              Doğrulanmış geri bildirimler
            </h2>
            <p className="mt-2 text-xs text-slate-600 max-w-xl mx-auto">
              Geri bildirimleri yalnızca doğrulanmış kaynaklardan gösteriyoruz. Google
              Business entegrasyonu tamamlandığında burada doğrulanmış paylaşımlar yer
              alacak.
            </p>
            <div className="mt-2 text-[11px] text-slate-500">Doğrulama bekleniyor</div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <div className="h-3 w-24 bg-slate-200 rounded animate-pulse" />
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-full bg-slate-200 rounded animate-pulse" />
                  <div className="h-3 w-5/6 bg-slate-200 rounded animate-pulse" />
                </div>
                <div className="mt-4 text-[11px] text-slate-500">
                  Geri bildirim • Doğrulanmış kaynak: beklemede
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

