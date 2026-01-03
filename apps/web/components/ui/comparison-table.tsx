'use client';

import { CheckCircle2, XCircle } from 'lucide-react';

/**
 * ComparisonTable: RESEARCH mode - Product/service comparison
 */
export function ComparisonTable() {
  const features = [
    { name: 'ÜTS Kayıtlı', standard: true, premium: true },
    { name: 'CE Belgeli', standard: true, premium: true },
    { name: 'Evde Kurulum', standard: true, premium: true },
    { name: 'Teknik Eğitim', standard: true, premium: true },
    { name: '7/24 Destek', standard: false, premium: true },
    { name: 'Evde Ziyaret', standard: false, premium: true },
    { name: 'Kişiye Özel Analiz', standard: false, premium: true },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="text-xl font-semibold text-slate-900 mb-4">Hizmet Karşılaştırması</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-900">Özellik</th>
              <th className="text-center py-3 px-4 font-semibold text-slate-700">Standart Hizmet</th>
              <th className="text-center py-3 px-4 font-semibold text-slate-900">VIP Hizmet</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, idx) => (
              <tr key={idx} className="border-b border-slate-100">
                <td className="py-3 px-4 text-slate-700">{feature.name}</td>
                <td className="py-3 px-4 text-center">
                  {feature.standard ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={1.5} />
                  ) : (
                    <XCircle className="w-5 h-5 text-slate-300 mx-auto" strokeWidth={1.5} />
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                  {feature.premium ? (
                    <CheckCircle2 className="w-5 h-5 text-amber-600 mx-auto" strokeWidth={1.5} />
                  ) : (
                    <XCircle className="w-5 h-5 text-slate-300 mx-auto" strokeWidth={1.5} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



