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

