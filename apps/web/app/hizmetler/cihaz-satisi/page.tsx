import type { Metadata } from 'next';
import Link from 'next/link';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { ServiceTemplate } from '@/components/services/service-template';
import { QuickActionCard } from '@/components/rehber/quick-action-card';
import { ProcessTimeline } from '@/components/services/process-timeline';
import { PricingTransparency } from '@/components/services/pricing-transparency';
import { ServiceFAQ } from '@/components/services/service-faq';

export const metadata: Metadata = {
  title: 'Cihaz Satışı | ESLAMED',
  description:
    'İhtiyaca göre eşleştirme yaklaşımı ve teknik kullanım uyumu kontrolü. Kataloğa yönlendirme (filtreli).',
  alternates: { canonical: '/hizmetler/cihaz-satisi' },
};

export default function CihazSatisiPage() {
  const accent = '#7C3AED';
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://eslamed.com/hizmetler/cihaz-satisi#service',
    name: 'Cihaz Satışı',
    description:
      'Evde kullanım için cihaz satış sürecinde ihtiyaç odaklı eşleştirme ve teknik kullanım uyumu kontrolü. Tanı/tedavi sunmaz.',
    provider: { '@id': 'https://eslamed.com/#business' },
    areaServed: { '@type': 'AdministrativeArea', name: 'İstanbul' },
  };

  return (
    <ServiceTemplate
      breadcrumbs={[
        { label: 'Ana Sayfa', href: '/' },
        { label: 'Hizmetler', href: '/hizmetler' },
        { label: 'Cihaz Satışı' },
      ]}
      title="Cihaz Satışı (İhtiyaca Göre Eşleştirme)"
      subtitle="Amaç: doğru sınıftaki cihazı, doğru kullanım koşulu ile eşleştirmek ve teknik güvenlik adımlarını netleştirmek. Tanı/tedavi değil."
      accentHex={accent}
      serviceSchema={serviceSchema}
    >
      {/* SECTION A: Process Timeline */}
      <ProcessTimeline
        steps={[
          {
            number: '1',
            title: 'İhtiyaç Analizi',
            description: 'Hekim önerisi, ev koşulları ve kullanıcı profili (50+ kullanım kolaylığı) değerlendirilir.',
          },
          {
            number: '2',
            title: 'Cihaz Eşleştirme',
            description: 'Teknik kapasite, aksesuar uyumu ve güvenlik standartlarına göre doğru cihaz sınıfı seçilir.',
          },
          {
            number: '3',
            title: 'Fiyatlandırma & Onay',
            description: 'Şeffaf fiyat çerçevesi sunulur. Onayınız sonrasında cihaz hazırlığına geçilir.',
          },
          {
            number: '4',
            title: 'Kurulum & Eğitim',
            description: 'İstanbul içi yerinde kurulum ve kullanım eğitimi. Güvenli kullanım adımları sahada gösterilir.',
          },
        ]}
        accentColor={accent}
      />

      {/* SECTION B: Pricing & Timeline */}
      <PricingTransparency
        title="Fiyatlandırma & Zamanlama"
        content="Fiyatlandırma, cihaz tipine, teknik özelliklerine ve aksesuar paketine göre belirlenir. Tüm cihazlar ÜTS kayıtlı ve CE belgelidir. Kurulum ve eğitim hizmeti dahildir. Teslimat genellikle aynı gün veya ertesi gün yapılır. Detaylı fiyat bilgisi için kataloğu inceleyebilir veya WhatsApp üzerinden iletişime geçebilirsiniz."
        accentColor={accent}
      />

      {/* SECTION C: FAQ */}
      <ServiceFAQ
        faqs={[
          {
            question: 'Hangi cihaz bana uygun?',
            answer:
              'Cihaz seçimi, hekim önerisi, ev koşulları ve kullanıcı profili (50+ kullanım kolaylığı) göz önünde bulundurularak yapılır. İhtiyaç analizi sonrasında doğru cihaz sınıfı belirlenir.',
          },
          {
            question: 'Fiyat aralığı nedir?',
            answer:
              'Fiyatlandırma, cihaz tipine, teknik özelliklerine ve aksesuar paketine göre değişir. Detaylı fiyat bilgisi için kataloğu inceleyebilir veya WhatsApp üzerinden iletişime geçebilirsiniz.',
          },
          {
            question: 'Kurulum dahil mi?',
            answer:
              'Evet. Tüm satış işlemlerinde İstanbul içi yerinde kurulum ve kullanım eğitimi dahildir. Güvenli kullanım adımları sahada gösterilir.',
          },
        ]}
      />

      <QuickActionCard variant="info" title="Katalog bağlantısı (filtreli)">
        Kataloğa doğrudan gidebilirsiniz. Filtreler, sayfada otomatik uygulanır.
      </QuickActionCard>

      <section className="rounded-3xl border border-slate-200 bg-white p-8">
        <h2 className="text-2xl font-semibold text-slate-900">Kataloğa git</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/ekipmanlar?filter=kurulum"
            className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 text-white px-6 text-base font-semibold hover:bg-slate-800 transition-colors"
          >
            Kurulum Yapılanlar
            <ArrowUpRight className="w-5 h-5" strokeWidth={1.5} />
          </Link>
          <Link
            href="/ekipmanlar?category=solunum"
            className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 text-base font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
          >
            Solunum
            <ArrowUpRight className="w-5 h-5" strokeWidth={1.5} />
          </Link>
          <Link
            href="/ekipmanlar?category=evde-bakim"
            className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 text-base font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
          >
            Evde Bakım
            <ArrowUpRight className="w-5 h-5" strokeWidth={1.5} />
          </Link>
        </div>
        <div className="mt-6">
          <a
            href={`https://wa.me/905372425535?text=${encodeURIComponent(
              'Merhaba, cihaz satışı için ihtiyaç odaklı yönlendirme almak istiyorum. Hekim önerisi ve kullanım koşuluna göre yardımcı olur musunuz?'
            )}`}
            className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-white px-6 text-base font-semibold hover:bg-emerald-700 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            WhatsApp ile yaz
          </a>
        </div>
      </section>
    </ServiceTemplate>
  );
}


