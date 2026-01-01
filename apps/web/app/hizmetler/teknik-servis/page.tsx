import type { Metadata } from 'next';
import { Wrench, ClipboardCheck, ListChecks } from 'lucide-react';
import { ServiceTemplate } from '@/components/services/service-template';
import { QuickActionCard } from '@/components/rehber/quick-action-card';

export const metadata: Metadata = {
  title: 'Teknik Servis | ESLAMED',
  description:
    'Ön değerlendirme, arıza türü ayrımı ve cihaz ömrünü uzatan planlı yaklaşım. Yalnızca donanım/teknik kapsam.',
  alternates: { canonical: '/hizmetler/teknik-servis' },
};

export default function TeknikServisPage() {
  const accent = '#2563EB';
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://eslamed.com/hizmetler/teknik-servis#service',
    name: 'Teknik Servis',
    description:
      'Medikal cihazlarda teknik ön değerlendirme, arıza analizi ve onarım planlama süreci. Tanı/tedavi sunmaz; yalnızca donanım ve mekanik/elektriksel kapsam.',
    provider: { '@id': 'https://eslamed.com/#business' },
    areaServed: { '@type': 'AdministrativeArea', name: 'İstanbul' },
  };

  return (
    <ServiceTemplate
      breadcrumbs={[
        { label: 'Ana Sayfa', href: '/' },
        { label: 'Hizmetler', href: '/hizmetler' },
        { label: 'Teknik Servis' },
      ]}
      title="Teknik Servis (Donanım Odağı)"
      subtitle="Amaç: cihazın teknik durumunu hızlıca anlamak, doğru müdahale planını kurmak ve cihaz ömrünü korumak. Tıbbi karar yerine geçmez."
      accentHex={accent}
      serviceSchema={serviceSchema}
    >
      <section className="rounded-3xl border border-slate-200 bg-white p-8">
        <h2 className="text-2xl font-semibold text-slate-900">Süreç Nasıl İlerler?</h2>
        <ol className="mt-6 space-y-4 text-slate-700" style={{ lineHeight: 1.8 }}>
          <li className="flex items-start gap-3">
            <ClipboardCheck className="w-5 h-5 mt-1 text-slate-700" strokeWidth={1.5} />
            <span className="text-[18px]">
              <span className="font-semibold text-slate-900">1) İlk belirti kontrolü (teknik):</span> alarm/hata, güç/elektrik, filtre, bağlantılar ve temel çalışma koşulları gözden geçirilir.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <ListChecks className="w-5 h-5 mt-1 text-slate-700" strokeWidth={1.5} />
            <span className="text-[18px]">
              <span className="font-semibold text-slate-900">2) Ön değerlendirme:</span> arızanın olası sınıfı (elektriksel, mekanik, sarf/aksesuar, kullanım kaynaklı) ayrıştırılır.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Wrench className="w-5 h-5 mt-1 text-slate-700" strokeWidth={1.5} />
            <span className="text-[18px]">
              <span className="font-semibold text-slate-900">3) Onarım planlama:</span> yapılacak işlem, parça/sarf ihtiyacı ve süreç adımları şeffaf biçimde netleştirilir.
            </span>
          </li>
        </ol>
      </section>

      <QuickActionCard variant="info" title="Sınırımız (net)">
        Bu hizmet, yalnızca cihazın <span className="font-semibold text-slate-900">donanım / mekanik / elektriksel</span> sorunlarını ele alır.
        Tanı, tedavi planı veya doz ayarı gibi tıbbi karar alanlarına girmez.
      </QuickActionCard>
    </ServiceTemplate>
  );
}


