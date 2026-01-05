'use client';

import { Calendar, FileText, CheckCircle2, Headphones } from 'lucide-react';
import { getPhoneLink } from '@/lib/constants/contact-info';
import { Timeline, type TimelineStep } from '@/components/ui/timeline';

/**
 * RentalProcess: COMMERCIAL_RENTAL mode specific section
 * Shows rental process timeline
 */
export function RentalProcess() {
  const steps: TimelineStep[] = [
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
      icon: Headphones,
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
          <Timeline steps={steps} accentColor="#475569" variant="vertical" showStepNumbers={true} />

          {/* CTA */}
          <div className="mt-12 text-center">
            <a
              href={getPhoneLink()}
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

