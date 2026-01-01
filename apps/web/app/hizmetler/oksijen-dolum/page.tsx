import type { Metadata } from 'next';
import { Droplets, ShieldCheck, CalendarClock, MapPin } from 'lucide-react';
import { ServiceTemplate } from '@/components/services/service-template';
import { QuickActionCard } from '@/components/rehber/quick-action-card';

export const metadata: Metadata = {
  title: 'Oksijen Dolum | ESLAMED',
  description:
    'Tüp güvenlik kontrolleri (test tarihi, valf, sızdırmazlık) ve İstanbul içi planlı hızlı temin yaklaşımı.',
  alternates: { canonical: '/hizmetler/oksijen-dolum' },
};

export default function OksijenDolumPage() {
  const accent = '#EF4444';
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://eslamed.com/hizmetler/oksijen-dolum#service',
    name: 'Oksijen Dolum',
    description:
      'Oksijen tüpü temin/dolum süreçlerinde güvenlik standartlarına uygun kontrol adımları ve İstanbul içi planlı hızlı lojistik.',
    provider: { '@id': 'https://eslamed.com/#business' },
    areaServed: { '@type': 'AdministrativeArea', name: 'İstanbul' },
  };

  return (
    <ServiceTemplate
      breadcrumbs={[
        { label: 'Ana Sayfa', href: '/' },
        { label: 'Hizmetler', href: '/hizmetler' },
        { label: 'Oksijen Dolum' },
      ]}
      title="Oksijen Dolum (Güvenlik + Lojistik)"
      subtitle="Amaç: güvenli ekipman kontrolü ve İstanbul içinde planlı hızlı temin. Bu sayfa tıbbi doz/tedavi kararı sunmaz."
      accentHex={accent}
      serviceSchema={serviceSchema}
    >
      <section className="rounded-3xl border border-slate-200 bg-white p-8">
        <h2 className="text-2xl font-semibold text-slate-900">Güvenlik Kontrolü (Tüp)</h2>
        <ul className="mt-6 space-y-3 text-slate-700" style={{ lineHeight: 1.8 }}>
          <li className="flex items-start gap-3">
            <CalendarClock className="w-5 h-5 mt-1 text-slate-700" strokeWidth={1.5} />
            <span className="text-[18px]">
              <span className="font-semibold text-slate-900">Test tarihi:</span> periyodik test süresi kontrol edilir.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 mt-1 text-slate-700" strokeWidth={1.5} />
            <span className="text-[18px]">
              <span className="font-semibold text-slate-900">Valf ve bağlantılar:</span> bütünlük, uyum ve sızdırmazlık değerlendirilir.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Droplets className="w-5 h-5 mt-1 text-slate-700" strokeWidth={1.5} />
            <span className="text-[18px]">
              <span className="font-semibold text-slate-900">Ekipman uyumu:</span> regülatör/aksesuar uyumluluğu ve güvenli kullanım adımları netleştirilir.
            </span>
          </li>
        </ul>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8">
        <h2 className="text-2xl font-semibold text-slate-900">İstanbul İçi Temin ve Planlama</h2>
        <p className="mt-3 text-[18px] text-slate-600" style={{ lineHeight: 1.8 }}>
          Çekmeköy merkezli operasyon noktamızdan, İstanbul genelinde planlı lojistik sağlanır. Süre; ilçe, trafik ve saha yoğunluğuna göre değişebilir.
        </p>
        <div className="mt-6">
          <a
            href={`https://wa.me/905372425535?text=${encodeURIComponent(
              'Merhaba, oksijen dolum/temin süreci ve güvenlik kontrol adımları hakkında bilgi almak istiyorum.'
            )}`}
            className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-white px-6 text-base font-semibold hover:bg-emerald-700 transition-colors"
          >
            <MapPin className="w-5 h-5" strokeWidth={1.5} />
            İlçem için planlama sor
          </a>
        </div>
      </section>

      <QuickActionCard variant="warning" title="Tıbbi sınır">
        Bu hizmet, tıbbi doz/tedavi kararı veya klinik değerlendirme sunmaz. Ciddi nefes darlığı gibi acil durumlarda <span className="font-semibold">112</span>.
      </QuickActionCard>
    </ServiceTemplate>
  );
}


