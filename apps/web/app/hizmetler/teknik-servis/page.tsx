import type { Metadata } from 'next';
import { ServiceTemplate } from '@/components/services/service-template';
import { QuickActionCard } from '@/components/rehber/quick-action-card';
import { ProcessTimeline } from '@/components/services/process-timeline';
import { PricingTransparency } from '@/components/services/pricing-transparency';
import { ServiceFAQ } from '@/components/services/service-faq';

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
      {/* SECTION A: Process Timeline */}
      <ProcessTimeline
        steps={[
          {
            number: '1',
            title: 'İlk İletişim',
            description: 'WhatsApp veya telefon ile cihazınızın durumunu paylaşın. Uzman ekibimiz ön değerlendirme yapar.',
          },
          {
            number: '2',
            title: 'Ön Değerlendirme',
            description: 'Arızanın sınıfı (elektriksel, mekanik, sarf/aksesuar) belirlenir. Gerekirse yerinde kontrol planlanır.',
          },
          {
            number: '3',
            title: 'Onarım Planlama',
            description: 'Yapılacak işlem, parça ihtiyacı ve süreç adımları şeffaf biçimde netleştirilir.',
          },
          {
            number: '4',
            title: 'Onarım & Teslimat',
            description: 'Onarım tamamlandıktan sonra cihazınız güvenli şekilde teslim edilir ve kullanım eğitimi verilir.',
          },
        ]}
        accentColor={accent}
      />

      {/* SECTION B: Pricing & Timeline */}
      <PricingTransparency
        title="Fiyatlandırma & Zamanlama"
        content="Fiyatlandırma, arızanın türüne, gerekli parça/sarf malzemelerine ve işçilik süresine göre belirlenir. Ön değerlendirme sonrasında şeffaf bir fiyat çerçevesi sunulur. Süreç genellikle 1-3 iş günü içinde tamamlanır; acil durumlarda aynı gün müdahale mümkündür. Parça temin süresi varsa bu süreç önceden bildirilir."
        accentColor={accent}
      />

      {/* SECTION C: FAQ */}
      <ServiceFAQ
        faqs={[
          {
            question: 'Ne kadar sürer?',
            answer:
              'Ön değerlendirme genellikle aynı gün veya ertesi gün yapılır. Onarım süresi arızanın türüne göre 1-3 iş günü arasında değişir. Acil durumlarda aynı gün müdahale mümkündür.',
          },
          {
            question: 'Fiyat nasıl belirlenir?',
            answer:
              'Fiyatlandırma, arızanın türüne, gerekli parça/sarf malzemelerine ve işçilik süresine göre belirlenir. Ön değerlendirme sonrasında şeffaf bir fiyat çerçevesi sunulur. Onayınız olmadan işlem yapılmaz.',
          },
          {
            question: 'Cihazımı nereye getirmem gerekiyor?',
            answer:
              'Çekmeköy merkezimize getirebilir veya yerinde kontrol talep edebilirsiniz. İstanbul içi yerinde kontrol hizmeti mevcuttur. Detaylar iletişimde netleştirilir.',
          },
          {
            question: 'Garanti var mı?',
            answer:
              'Yapılan onarım işlemleri için garanti süresi, işlem türüne göre değişir. Parça değişimlerinde üretici garantisi geçerlidir. Detaylar onarım sonrası belgelenir.',
          },
        ]}
      />

      <QuickActionCard variant="info" title="Sınırımız (net)">
        Bu hizmet, yalnızca cihazın <span className="font-semibold text-slate-900">donanım / mekanik / elektriksel</span> sorunlarını ele alır.
        Tanı, tedavi planı veya doz ayarı gibi tıbbi karar alanlarına girmez.
      </QuickActionCard>
    </ServiceTemplate>
  );
}


