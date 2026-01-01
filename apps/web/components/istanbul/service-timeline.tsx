import { CheckCircle2, Truck, Wrench, PhoneCall } from 'lucide-react';

type Step = {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

export function ServiceTimeline() {
  const steps: Step[] = [
    {
      title: 'GİRİŞ: Talebiniz alınır',
      desc: 'Telefon veya WhatsApp üzerinden ilçe ve ihtiyaç kısa şekilde netleştirilir.',
      icon: PhoneCall,
    },
    {
      title: 'PLANLAMA: Hazırlık yapılır',
      desc: 'Cihaz, uzman teknik personel tarafından teknik kontrolleri yapılarak hazırlanır.',
      icon: Wrench,
    },
    {
      title: 'TESLİMAT: Planlı şekilde kapınızda',
      desc: 'Aynı gün veya planlı randevu ile teslimat yapılır (ilçe ve yoğunluğa göre değişebilir).',
      icon: Truck,
    },
    {
      title: 'KURULUM: Çalıştırma ve temel eğitim',
      desc: 'Cihazın kurulumu yapılır; hasta yakınına güvenli kullanım adımları sakin şekilde anlatılır.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section aria-label="Hizmet Zaman Çizelgesi" className="rounded-3xl border border-slate-200 bg-white p-8">
      <h2 className="text-2xl font-semibold text-slate-900">Hız ve Planlama</h2>
      <p className="mt-3 text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
        Bu akış, süreci anlaşılır kılmak içindir. Tıbbi tanı/tedavi kararı yerine geçmez.
      </p>

      <ol className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <li key={s.title} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-base font-semibold text-slate-900" style={{ lineHeight: 1.6 }}>
                    {s.title}
                  </div>
                  <div className="mt-2 text-sm text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                    {s.desc}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}


