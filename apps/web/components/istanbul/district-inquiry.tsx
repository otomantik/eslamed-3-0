'use client';

import { useMemo, useState } from 'react';
import { MessageCircle } from 'lucide-react';

export function DistrictInquiry({
  districts,
}: {
  districts: { label: string; region: 'Anadolu' | 'Avrupa' }[];
}) {
  const [district, setDistrict] = useState(districts[0]?.label ?? 'Çekmeköy');

  const options = useMemo(() => {
    const groups = { Anadolu: [] as string[], Avrupa: [] as string[] };
    for (const d of districts) groups[d.region].push(d.label);
    return groups;
  }, [districts]);

  const href = useMemo(() => {
    const msg = `Merhaba, ${district} bölgesinden yazıyorum. Medikal ekipman için servis planı ve tahmini süre hakkında bilgi almak istiyorum.`;
    return `https://wa.me/905372425535?text=${encodeURIComponent(msg)}`;
  }, [district]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8">
      <h2 className="text-2xl font-semibold text-slate-900">Bölgeniz için planlama</h2>
      <p className="mt-3 text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
        İlçenizi seçin. Planlama bilgisi; cihaz tipi, kullanım koşulu ve saha yoğunluğuna göre netleşir.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-stretch">
        <label className="sr-only" htmlFor="district">İlçe</label>
        <select
          id="district"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="min-h-[48px] rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-900"
        >
          <optgroup label="Anadolu Yakası">
            {options.Anadolu.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </optgroup>
          <optgroup label="Avrupa Yakası">
            {options.Avrupa.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </optgroup>
        </select>

        <a
          href={href}
          className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white px-6 text-base font-semibold hover:bg-slate-800 transition-colors"
        >
          <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
          Bölgem için servis süresi öğrenin
        </a>
      </div>
    </section>
  );
}


