'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

type ChecklistItem = {
  id: string;
  label: string;
  note?: string;
};

export function RespiratoryChecklist() {
  const items: ChecklistItem[] = useMemo(
    () => [
      { id: 'water', label: 'Nemlendirici haznesinde su seviyesi kontrolü', note: 'Saf/arıtılmış su tercih edilir.' },
      { id: 'filter', label: 'Filtrelerin görsel kontrolü', note: 'Toz birikimi varsa temizlik planlanır.' },
      { id: 'tubing', label: 'Hortum ve bağlantıların oturuş kontrolü', note: 'Kıvrılma/kaçak olmamalı.' },
      { id: 'placement', label: 'Cihaz konumu ve hava girişinin açık olması', note: 'Duvar/kalın perdeye çok yakın olmamalı.' },
      { id: 'sound', label: 'Uyarı sesi/alışılmadık ses var mı?', note: 'Yeni bir ses varsa not alın.' },
    ],
    []
  );

  const [checked, setChecked] = useState<Record<string, boolean>>({});

  return (
    <section aria-label="Cihaz Kontrol Listesi" className="rounded-3xl border border-slate-200 bg-white p-8">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
        <h2 className="text-2xl font-semibold text-slate-900">Cihaz Kontrol Listesi</h2>
      </div>
      <p className="mt-3 text-sm text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
        Bu liste, günlük kullanımda teknik güvenliği desteklemek içindir. Tıbbi tanı/tedavi yerine geçmez.
      </p>

      <div className="mt-6 space-y-3">
        {items.map((it) => (
          <label
            key={it.id}
            className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4"
          >
            <input
              type="checkbox"
              checked={Boolean(checked[it.id])}
              onChange={(e) => setChecked((prev) => ({ ...prev, [it.id]: e.target.checked }))}
              className="mt-1.5 h-5 w-5 accent-emerald-600"
              aria-label={it.label}
            />
            <div className="min-w-0">
              <div className="text-base font-semibold text-slate-900" style={{ lineHeight: 1.6 }}>
                {it.label}
              </div>
              {it.note && (
                <div className="mt-1 text-sm text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                  {it.note}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}


