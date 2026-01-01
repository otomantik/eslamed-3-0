'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';

/**
 * TechnicalSpecToggle: RESEARCH mode - Expandable technical specifications
 */
export function TechnicalSpecToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const specs = [
    { label: 'Güç Tüketimi', value: '150W - 300W (cihaz tipine göre)' },
    { label: 'Gürültü Seviyesi', value: '< 45 dB (sessiz mod)' },
    { label: 'Çalışma Sıcaklığı', value: '10°C - 40°C' },
    { label: 'Nem Toleransı', value: '%30 - %80' },
    { label: 'Garanti Süresi', value: '2 yıl (cihaz tipine göre değişir)' },
    { label: 'Bakım Periyodu', value: '6 ayda bir teknik kontrol önerilir' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors min-h-[48px]"
        aria-expanded={isOpen}
        aria-label="Teknik özellikleri göster/gizle"
      >
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
          <span className="font-semibold text-slate-900">Teknik Özellikler</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-500" strokeWidth={1.5} />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-500" strokeWidth={1.5} />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 border-t border-slate-100">
          <dl className="space-y-3 mt-4">
            {specs.map((spec, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <dt className="font-medium text-slate-900">{spec.label}:</dt>
                <dd className="text-slate-700">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}

