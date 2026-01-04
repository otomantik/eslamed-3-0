'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';

/**
 * Raw brand data (may have null/empty logos)
 */
interface Brand {
  name: string;
  logo: string | null;
  isSvg: boolean;
}

/**
 * Normalized brand with guaranteed non-empty logo (data layer)
 */
interface BrandWithLogo {
  name: string;
  logo: string; // Non-empty, trimmed string
  isSvg: boolean;
}

/**
 * Type guard: checks if brand has valid logo
 */
function isBrandWithLogo(brand: Brand): brand is BrandWithLogo {
  return (
    typeof brand.logo === 'string' &&
    brand.logo.trim().length > 0
  );
}

/**
 * Normalize brands: filter, trim, and deduplicate
 * - Filters out brands with null/empty/whitespace logos
 * - Trims logo strings
 * - Deduplicates by name (keeps first occurrence)
 * 
 * @param brands Raw brand array
 * @returns Normalized brands with guaranteed non-empty logos
 */
function normalizeBrands(brands: Brand[]): BrandWithLogo[] {
  const seen = new Set<string>();
  const normalized: BrandWithLogo[] = [];

  for (const brand of brands) {
    // Skip if logo is invalid
    if (!isBrandWithLogo(brand)) {
      continue;
    }

    // Deduplicate by name (keep first)
    if (seen.has(brand.name)) {
      continue;
    }
    seen.add(brand.name);

    // Add normalized brand with trimmed logo
    normalized.push({
      name: brand.name,
      logo: brand.logo.trim(),
      isSvg: brand.isSvg,
    });
  }

  return normalized;
}

export function BrandTrustTicker() {
  const rawBrands: Brand[] = [
    { name: 'Philips', logo: '/assets/logos/philips.svg', isSvg: true },
    { name: 'Respirox', logo: '/assets/logos/respirox.png', isSvg: false },
    { name: 'Omron', logo: '/assets/logos/omron.png', isSvg: false },
    { name: 'Jumper', logo: '/assets/logos/jumper.png', isSvg: false },
    { name: 'Endostall', logo: '/assets/logos/endostall.png', isSvg: false },
    { name: 'Önlem', logo: '/assets/logos/onlem.png', isSvg: false },
  ];

  // ✅ Data layer: Normalize brands once with useMemo
  const safeBrands = useMemo(() => {
    const normalized = normalizeBrands(rawBrands);
    
    // Development-only warning if brands were dropped
    if (process.env.NODE_ENV === 'development') {
      const droppedCount = rawBrands.length - normalized.length;
      if (droppedCount > 0) {
        console.warn(
          `[BrandTrustTicker] ${droppedCount} brand(s) dropped due to missing/invalid logos`
        );
      }
    }
    
    return normalized;
  }, []); // Empty deps: rawBrands is static

  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (brandName: string) => {
    setFailedImages((prev) => new Set(prev).add(brandName));
  };

  /**
   * ✅ OPTIMIZED: Brand logo rendering helper - eliminates code duplication
   * ✅ Type-safe: brand.logo is guaranteed to be non-empty string (BrandWithLogo)
   */
  const renderBrandLogo = (brand: BrandWithLogo, keyPrefix: string) => {
    const hasFailed = failedImages.has(brand.name);

    // If image failed to load, show fallback text
    if (hasFailed) {
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

    // ✅ Type-safe: brand.logo is string (never null/undefined)
    return (
      <div
        key={`${keyPrefix}-${brand.name}`}
        className="flex-shrink-0 flex items-center justify-center h-10 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 relative"
      >
        {brand.isSvg ? (
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
  // ✅ Type-safe: safeBrands is already normalized and non-empty
  const duplicatedBrands = useMemo(
    () => [...safeBrands, ...safeBrands],
    [safeBrands]
  );

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

