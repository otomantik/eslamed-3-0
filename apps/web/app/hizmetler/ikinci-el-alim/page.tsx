import type { Metadata } from 'next';
import { BadgePercent, ShieldCheck, Search, ClipboardList } from 'lucide-react';
import { ServiceTemplate } from '@/components/services/service-template';
import { QuickActionCard } from '@/components/rehber/quick-action-card';

export const metadata: Metadata = {
  title: '2. El Alım | ESLAMED',
  description:
    'Model doğrulama, teknik değerleme, yenileme planı ve şeffaf fiyatlandırma yaklaşımı. Donanım odaklı süreç.',
  alternates: { canonical: '/hizmetler/ikinci-el-alim' },
};

export default function IkinciElAlimPage() {
  const accent = '#F97316';
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://eslamed.com/hizmetler/ikinci-el-alim#service',
    name: '2. El Alım',
    description:
      'İkinci el medikal cihazlarda model doğrulama, teknik değerleme ve yenileme/yeniden kullanım planı. Tanı/tedavi sunmaz; donanım kapsamındadır.',
    provider: { '@id': 'https://eslamed.com/#business' },
    areaServed: { '@type': 'AdministrativeArea', name: 'İstanbul' },
  };

  return (
    <ServiceTemplate
      breadcrumbs={[
        { label: 'Ana Sayfa', href: '/' },
        { label: 'Hizmetler', href: '/hizmetler' },
        { label: '2. El Alım' },
      ]}
      title="2. El Alım (Teknik Değerleme + Şeffaflık)"
      subtitle="Amaç: cihazın teknik durumunu doğru okumak, yenileme ihtiyacını belirlemek ve şeffaf bir fiyat çerçevesi kurmak. Tanı/tedavi değil."
      accentHex={accent}
      serviceSchema={serviceSchema}
    >
      <section className="rounded-3xl border border-slate-200 bg-white p-8">
        <h2 className="text-2xl font-semibold text-slate-900">Süreç</h2>
        <ol className="mt-6 space-y-4 text-slate-700" style={{ lineHeight: 1.8 }}>
          <li className="flex items-start gap-3">
            <Search className="w-5 h-5 mt-1 text-slate-700" strokeWidth={1.5} />
            <span className="text-[18px]">
              <span className="font-semibold text-slate-900">1) Model doğrulama:</span> cihaz modeli/seri bilgisi ve temel uyumluluk kontrol edilir.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <ClipboardList className="w-5 h-5 mt-1 text-slate-700" strokeWidth={1.5} />
            <span className="text-[18px]">
              <span className="font-semibold text-slate-900">2) Durum değerlendirmesi:</span> çalışma saatleri, sarf/aksesuar, dış gövde ve temel fonksiyon testleri yapılır.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 mt-1 text-slate-700" strokeWidth={1.5} />
            <span className="text-[18px]">
              <span className="font-semibold text-slate-900">3) Yenileme planı:</span> gerekiyorsa parça/sarf değişimleri ve güvenlik kontrol adımları netleştirilir.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <BadgePercent className="w-5 h-5 mt-1 text-slate-700" strokeWidth={1.5} />
            <span className="text-[18px]">
              <span className="font-semibold text-slate-900">4) Şeffaf fiyat:</span> değerlendirme çıktısı üzerinden açık bir fiyat çerçevesi sunulur.
            </span>
          </li>
        </ol>
      </section>

      <QuickActionCard variant="info" title="Sınırımız (net)">
        Bu süreç, cihazın <span className="font-semibold text-slate-900">teknik durumunu</span> değerlendirir. Tıbbi tanı/tedavi önerisi içermez.
      </QuickActionCard>
    </ServiceTemplate>
  );
}


