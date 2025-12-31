export function BrandTrustTicker() {
  const brands = [
    'Philips',
    'Respirox',
    'Omron',
    'Jumper',
    'Endostall',
    'Önlem',
    'Diamond Mama'
  ];

  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200">
      <div className="container-wide">
        <p className="text-xs text-slate-500 text-center mb-6 font-normal">
          Güvenilir medikal markalarla çalışıyoruz
        </p>
        <div className="flex items-center justify-center gap-8 overflow-hidden">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 text-slate-400 font-semibold text-lg tracking-wide"
            >
              {brand}
            </div>
          ))}
          {/* Duplicate for seamless loop effect */}
          {brands.map((brand, index) => (
            <div
              key={`dup-${index}`}
              className="flex-shrink-0 text-slate-400 font-semibold text-lg tracking-wide"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

