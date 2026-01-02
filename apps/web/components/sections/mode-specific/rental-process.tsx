'use client';

import { Calendar, FileText, CheckCircle2, MapPin } from 'lucide-react';

/**
 * RentalProcess: COMMERCIAL_RENTAL mode specific section
 * Shows rental process timeline
 */
export function RentalProcess() {
  const steps = [
    {
      step: 1,
      title: 'İletişim ve Değerlendirme',
      description: 'İhtiyacınızı paylaşın, uygun cihaz seçimi için değerlendirme yapalım.',
      icon: Calendar,
    },
    {
      step: 2,
      title: 'Sözleşme ve Planlama',
      description: 'Kiralama süresi, koşullar ve teslimat planı netleştirilir.',
      icon: FileText,
    },
    {
      step: 3,
      title: 'Kurulum ve Eğitim',
      description: 'Cihaz kurulumu yapılır, temel kullanım adımları paylaşılır.',
      icon: CheckCircle2,
    },
    {
      step: 4,
      title: 'Sürekli Destek',
      description: 'Kiralama süresi boyunca teknik destek ve bakım hizmeti.',
      icon: MapPin,
    },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Kiralama Süreci
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Planlı kiralama ve satış süreçleri. Adım adım ilerleyelim.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 hidden md:block" />

            <div className="space-y-8">
              {steps.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="relative flex items-start gap-6">
                    {/* Step number */}
                    <div className="flex-shrink-0 w-16 h-16 bg-slate-600 text-white rounded-full flex items-center justify-center font-bold text-lg relative z-10 shadow-lg">
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white rounded-xl p-6 border-2 border-slate-200 shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-slate-500">Adım {item.step}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600" style={{ lineHeight: 1.8 }}>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <a
              href="tel:+905372425535"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-lg transition-colors shadow-lg"
            >
              <Calendar className="w-6 h-6" strokeWidth={2} />
              <span>Kiralama İçin İletişime Geç</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

