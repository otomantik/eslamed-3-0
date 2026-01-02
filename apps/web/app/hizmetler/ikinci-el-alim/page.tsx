import type { Metadata } from 'next';
import { ServiceTemplate } from '@/components/services/service-template';
import { QuickActionCard } from '@/components/rehber/quick-action-card';
import { ProcessTimeline } from '@/components/services/process-timeline';
import { PricingTransparency } from '@/components/services/pricing-transparency';
import { ServiceFAQ } from '@/components/services/service-faq';

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
    '@id': 'https://www.eslamed.com/hizmetler/ikinci-el-alim#service',
    name: '2. El Alım',
    description:
      'İkinci el medikal cihazlarda model doğrulama, teknik değerleme ve yenileme/yeniden kullanım planı. Tanı/tedavi sunmaz; donanım kapsamındadır.',
    provider: { '@id': 'https://www.eslamed.com/#business' },
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
      {/* SECTION A: Process Timeline */}
      <ProcessTimeline
        steps={[
          {
            number: '1',
            title: 'Model Doğrulama',
            description: 'Cihaz modeli/seri bilgisi ve temel uyumluluk kontrol edilir. WhatsApp veya telefon ile iletişime geçin.',
          },
          {
            number: '2',
            title: 'Durum Değerlendirmesi',
            description: 'Çalışma saatleri, sarf/aksesuar, dış gövde ve temel fonksiyon testleri yapılır. Gerekirse yerinde kontrol planlanır.',
          },
          {
            number: '3',
            title: 'Yenileme Planı',
            description: 'Gerekiyorsa parça/sarf değişimleri ve güvenlik kontrol adımları netleştirilir.',
          },
          {
            number: '4',
            title: 'Şeffaf Fiyat & Alım',
            description: 'Değerlendirme çıktısı üzerinden açık bir fiyat çerçevesi sunulur. Onayınız sonrasında alım süreci başlar.',
          },
        ]}
        accentColor={accent}
      />

      {/* SECTION B: Pricing & Timeline */}
      <PricingTransparency
        title="Fiyatlandırma & Zamanlama"
        content="Değerleme, cihazın modeline, çalışma saatlerine, sarf/aksesuar durumuna ve dış görünümüne göre belirlenir. Yenileme ihtiyacı varsa bu maliyet fiyatlandırmaya yansır. Değerlendirme genellikle aynı gün veya ertesi gün tamamlanır. Şeffaf bir fiyat çerçevesi sunulur; onayınız olmadan işlem yapılmaz."
        accentColor={accent}
      />

      {/* SECTION C: FAQ */}
      <ServiceFAQ
        faqs={[
          {
            question: 'Cihazım ne kadar eder?',
            answer:
              'Değerleme, cihazın modeline, çalışma saatlerine, sarf/aksesuar durumuna ve dış görünümüne göre belirlenir. Değerlendirme sonrasında şeffaf bir fiyat çerçevesi sunulur.',
          },
          {
            question: 'Nasıl teslim ederim?',
            answer:
              'Cihazınızı Çekmeköy merkezimize getirebilir veya yerinde kontrol talep edebilirsiniz. İstanbul içi yerinde kontrol hizmeti mevcuttur. Detaylar iletişimde netleştirilir.',
          },
          {
            question: 'Yenileme ihtiyacı varsa ne olur?',
            answer:
              'Yenileme ihtiyacı varsa (parça/sarf değişimi, güvenlik kontrolü) bu maliyet fiyatlandırmaya yansır. Şeffaf bir şekilde netleştirilir.',
          },
        ]}
      />

      <QuickActionCard variant="info" title="Sınırımız (net)">
        Bu süreç, cihazın <span className="font-semibold text-slate-900">teknik durumunu</span> değerlendirir. Tıbbi tanı/tedavi önerisi içermez.
      </QuickActionCard>
    </ServiceTemplate>
  );
}


