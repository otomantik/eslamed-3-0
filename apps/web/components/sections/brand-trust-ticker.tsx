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
                    width={120}
                    height={40}
                    style={{ 
                      width: 'auto',
                      height: '40px',
                      maxWidth: '120px',
                      objectFit: 'contain',
                      filter: 'grayscale(100%)', 
                      transition: 'filter 0.3s ease',
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
                    className="object-contain"
                    style={{ 
                      maxWidth: '120px',
                      maxHeight: '40px',
                      height: 'auto'
                    }}
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
                    width={120}
                    height={40}
                    style={{ 
                      width: 'auto',
                      height: '40px',
                      maxWidth: '120px',
                      objectFit: 'contain',
                      filter: 'grayscale(100%)', 
                      transition: 'filter 0.3s ease',
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
                    className="object-contain"
                    style={{ 
                      maxWidth: '120px',
                      maxHeight: '40px',
                      height: 'auto'
                    }}
                    unoptimized
                    onError={() => handleImageError(brand.name)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

