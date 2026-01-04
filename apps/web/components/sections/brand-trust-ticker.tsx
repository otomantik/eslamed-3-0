'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Brand {
  name: string;
  logo: string | null;
  isSvg: boolean;
}

export function BrandTrustTicker() {
  const brands: Brand[] = [
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

  /**
   * ✅ OPTIMIZED: Brand logo rendering helper - eliminates code duplication
   */
  const renderBrandLogo = (brand: Brand, keyPrefix: string) => {
    const hasFailed = failedImages.has(brand.name);
    const showFallback = !brand.logo || hasFailed;

    // Type guard: ensure logo is a string before using it
    if (showFallback) {
      return (
        <div
          key={`${keyPrefix}-${brand.name}`}
          className="flex-shrink-0 flex items-center justify-center h-10 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 relative"
        >
          <span className="text-slate-400 font-semibold text-base tracking-wide whitespace-nowrap px-3">
            {brand.name}
          </span>
        </div>
      );
    }

    // At this point, TypeScript knows brand.logo is not null
    const logoUrl: string = brand.logo!;

    return (
      <div
        key={`${keyPrefix}-${brand.name}`}
        className="flex-shrink-0 flex items-center justify-center h-10 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 relative"
      >
        {brand.isSvg ? (
          <img
            src={logoUrl}
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
            src={logoUrl}
            alt={brand.name}
            width={120}
            height={40}
            className="object-contain"
            style={{
              maxWidth: '120px',
              maxHeight: '40px',
              height: 'auto',
            }}
            unoptimized
            onError={() => handleImageError(brand.name)}
          />
        )}
      </div>
    );
  };

  // ✅ OPTIMIZED: Duplicate brands array for seamless loop (CSS handles the animation)
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200">
      <div className="container-wide">
        <p className="text-xs text-slate-500 text-center mb-6 font-normal">
          Güvenilir medikal markalarla çalışıyoruz
        </p>
        <div className="relative overflow-hidden">
          <div
            className="flex items-center gap-12 animate-marquee"
            style={{ animationDuration: '40s', willChange: 'transform' }}
          >
            {duplicatedBrands.map((brand, index) => renderBrandLogo(brand, `brand-${index}`))}
          </div>
        </div>
      </div>
    </section>
  );
}

