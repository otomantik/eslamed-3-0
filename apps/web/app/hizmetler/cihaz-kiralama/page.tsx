import type { Metadata } from 'next';
import { Recycle, Bed, Wind, Accessibility } from 'lucide-react';
import { ServiceTemplate } from '@/components/services/service-template';
import { SanitizationChecklist } from '@/components/services/sanitization-checklist';
import { QuickActionCard } from '@/components/rehber/quick-action-card';

export const metadata: Metadata = {
  title: 'Cihaz Kiralama | ESLAMED',
  description:
    'Sterilizasyon protokolleri, esnek koşullar ve evde kullanım için teknik hazırlık. Hasta yatağı, oksijen konsantratörü, mobilite yardımcıları.',
  alternates: { canonical: '/hizmetler/cihaz-kiralama' },
};

export default function CihazKiralamaPage() {
  const accent = '#10B981';
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://eslamed.com/hizmetler/cihaz-kiralama#service',
    name: 'Cihaz Kiralama',
    description:
      'Evde kullanım için cihaz kiralama sürecinde hijyen hazırlığı, teknik kontrol ve esnek süre/koşul planlama yaklaşımı.',
    provider: { '@id': 'https://eslamed.com/#business' },
    areaServed: { '@type': 'AdministrativeArea', name: 'İstanbul' },
  };

  return (
    <ServiceTemplate
      breadcrumbs={[
        { label: 'Ana Sayfa', href: '/' },
        { label: 'Hizmetler', href: '/hizmetler' },
        { label: 'Cihaz Kiralama' },
      ]}
      title="Cihaz Kiralama (Hijyen + Döngüsel Süreç)"
      subtitle="Amaç: cihazı güvenli, temiz ve hazır şekilde teslim etmek; kullanım boyunca teknik süreçleri net tutmak. Tanı/tedavi değil."
      accentHex={accent}
      serviceSchema={serviceSchema}
    >
      <section className="rounded-3xl border border-slate-200 bg-white p-8">
        <h2 className="text-2xl font-semibold text-slate-900">Kapsam (Örnek Ekipmanlar)</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <article className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
            <div className="flex items-center gap-3">
              <Bed className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
              <div className="text-[18px] font-semibold text-slate-900">Hasta Yatakları</div>
            </div>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
            <div className="flex items-center gap-3">
              <Wind className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
              <div className="text-[18px] font-semibold text-slate-900">Oksijen Konsantratörleri</div>
            </div>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
            <div className="flex items-center gap-3">
              <Accessibility className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
              <div className="text-[18px] font-semibold text-slate-900">Mobilite Yardımcıları</div>
            </div>
          </article>
        </div>
      </section>

      <SanitizationChecklist />

      <QuickActionCard variant="info" title="Şeffaflık notu">
        Kiralama süreçlerinde minimum süre ve kullanım koşulları, cihaz tipi ve hekim önerisine göre esnek olarak planlanır; detaylar iletişimde netleştirilir.
      </QuickActionCard>

      <section className="rounded-3xl border border-slate-200 bg-white p-8">
        <h2 className="text-2xl font-semibold text-slate-900">Bilgi almak için</h2>
        <p className="mt-3 text-[18px] text-slate-600" style={{ lineHeight: 1.8 }}>
          İhtiyaç tipinizi ve ilçenizi yazın. Size uygun cihaz sınıfı, teslimat/kurulum planı ve koşullar netleştirilsin.
        </p>
        <div className="mt-6">
          <a
            href={`https://wa.me/905372425535?text=${encodeURIComponent(
              'Merhaba, cihaz kiralama süreci (hasta yatağı / konsantratör / mobilite) hakkında kurulum ve koşul bilgisi almak istiyorum.'
            )}`}
            className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-white px-6 text-base font-semibold hover:bg-emerald-700 transition-colors"
          >
            <Recycle className="w-5 h-5" strokeWidth={1.5} />
            WhatsApp ile yaz
          </a>
        </div>
      </section>
    </ServiceTemplate>
  );
}


