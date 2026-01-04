import { CheckCircle2, Truck, Wrench, PhoneCall } from 'lucide-react';
import { Timeline, type TimelineStep } from '@/components/ui/timeline';

/**
 * ServiceTimeline: Istanbul service timeline using generic Timeline component
 * ✅ REFACTORED: Now uses generic Timeline component
 */
export function ServiceTimeline() {
  const steps: TimelineStep[] = [
    {
      step: 1,
      title: 'GİRİŞ: Talebiniz alınır',
      description: 'Telefon veya WhatsApp üzerinden ilçe ve ihtiyaç kısa şekilde netleştirilir.',
      icon: PhoneCall,
    },
    {
      step: 2,
      title: 'PLANLAMA: Hazırlık yapılır',
      description: 'Cihaz, uzman teknik personel tarafından teknik kontrolleri yapılarak hazırlanır.',
      icon: Wrench,
    },
    {
      step: 3,
      title: 'TESLİMAT: Planlı şekilde kapınızda',
      description: 'Aynı gün veya planlı randevu ile teslimat yapılır (ilçe ve yoğunluğa göre değişebilir).',
      icon: Truck,
    },
    {
      step: 4,
      title: 'KURULUM: Çalıştırma ve temel eğitim',
      description: 'Cihazın kurulumu yapılır; hasta yakınına güvenli kullanım adımları sakin şekilde anlatılır.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section aria-label="Hizmet Zaman Çizelgesi" className="rounded-3xl border border-slate-200 bg-white p-8">
      <h2 className="text-2xl font-semibold text-slate-900">Hız ve Planlama</h2>
      <p className="mt-3 text-slate-600 leading-relaxed mb-8" style={{ lineHeight: 1.8 }}>
        Bu akış, süreci anlaşılır kılmak içindir. Tıbbi tanı/tedavi kararı yerine geçmez.
      </p>
      <Timeline steps={steps} accentColor="#2563EB" variant="horizontal" />
    </section>
  );
}




