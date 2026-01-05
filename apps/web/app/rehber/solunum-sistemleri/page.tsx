import type { Metadata } from 'next';
import Link from 'next/link';
import { ModeAwareNavbar } from '@/components/layout/mode-aware-navbar';
import { Footer } from '@/components/sections/footer';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { QuickActionCard } from '@/components/rehber/quick-action-card';
import { RespiratoryChecklist } from '@/components/rehber/respiratory-checklist';
import { MedicalGlossary } from '@/components/rehber/medical-glossary';
import { IconStrip } from '@/components/infographics/icon-strip';
import { FlowInfographic } from '@/components/infographics/flow-infographic';
import { ComingSoonCard } from '@/components/infographics/coming-soon-card';
import { RespiratoryDeviceIllustration } from '@/components/infographics/respiratory-device-illustration';
import { ExpertVerificationPanel } from '@/components/integrity/expert-verification-panel';
import { ESLAMED_EXPERTS } from '@/lib/integrity/eslamed-experts';
import { BatteryCharging, Droplets, Filter, Megaphone, PlaySquare, ArrowUpRight } from 'lucide-react';
import { detectIntent } from '@/lib/intent/detector';

export const metadata: Metadata = {
  title: 'Solunum Sistemleri Rehberi | ESLAMED',
  description:
    'Solunum destek ekipmanlarında günlük kontrol, filtre temizliği ve elektrik kesintisi eylem planı. Panik anında uygulanabilir, teknik odaklı rehber.',
  alternates: { canonical: '/rehber/solunum-sistemleri' },
};

export default async function SolunumSistemleriPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const intentResult = await detectIntent({ ...resolvedParams, url: '/rehber/solunum-sistemleri' });
  const emergencySpeakableId = 'rehber-elektrik-kesintisi';

  const howToCleanFilter = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Oksijen Filtresi Nasıl Temizlenir?',
    description:
      'Oksijen konsantratörü filtre temizliği için panik anında uygulanabilir adımlar. Model farklılık gösterebilir; üretici talimatları esas alınır.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Cihazı güvenli şekilde kapatın',
        text: 'Cihazı kapatın ve fişten çekin. Cihazın tamamen durduğundan emin olun.',
      },
      {
        '@type': 'HowToStep',
        name: 'Filtre kapağını çıkarın',
        text: 'Filtre bölmesini üretici talimatına uygun şekilde açın. Zorlamayın.',
      },
      {
        '@type': 'HowToStep',
        name: 'Filtreyi temizleyin ve kurutun',
        text: 'Filtreyi ılık suyla durulayın veya nemli bezle temizleyin. Tamamen kurutmadan tekrar takmayın.',
      },
      {
        '@type': 'HowToStep',
        name: 'Filtreyi yerine takın ve kontrol edin',
        text: 'Filtreyi doğru yönde yerine yerleştirin. Cihazı çalıştırıp hava girişinin açık olduğunu kontrol edin.',
      },
    ],
  };

  const speakable = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: 'https://www.eslamed.com/rehber/solunum-sistemleri',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: [`#${emergencySpeakableId}`],
    },
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([howToCleanFilter, speakable]) }}
      />

      <ModeAwareNavbar serverMode={intentResult.mode} />

      <header className="pt-28 sm:pt-24 pb-12">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { label: 'Ana Sayfa', href: '/' },
              { label: 'Tıbbi Rehber', href: '/#vip-hizmetler' },
              { label: 'Solunum Sistemleri' },
            ]}
            className="text-slate-400"
          />

          {/* Hero Layout - 2 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 items-center">
            {/* Left Side: Title and Description */}
            <div className="space-y-4 order-2 md:order-1">
              <h1 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900">
                Solunum Sistemleri Rehberi
              </h1>
              <p className="text-base text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                Bu sayfa, solunum destek cihazlarında günlük kullanım ve teknik güvenlik için hazırlanmıştır. Tanı veya tedavi yerine geçmez.
              </p>
            </div>

            {/* Right Side: Visual Illustration */}
            <div className="order-1 md:order-2">
              <RespiratoryDeviceIllustration />
            </div>
          </div>
        </div>
      </header>

      <section className="py-10">
        <div className="container-wide space-y-8">
          {/* Panic-proof quick actions */}
          <QuickActionCard
            variant="warning"
            title="Elektrik Kesintisi Eylem Planı (Panik Anında)"
            icon={<BatteryCharging className="w-5 h-5 text-amber-800" strokeWidth={1.5} />}
          >
            <div id={emergencySpeakableId}>
              <div className="font-semibold">ADIM 1:</div>
              <div className="mt-1">Cihazın fişte olup olmadığını ve prizin çalıştığını kontrol edin. Sigorta/şalteri kontrol edin.</div>
              <div className="mt-4 font-semibold">ADIM 2:</div>
              <div className="mt-1">Varsa yedek güç kaynağı veya tüp gibi alternatifleri devreye alın. Yardım gerekiyorsa bir yakınınızdan destek isteyin.</div>
              <div className="mt-4 font-semibold">ADIM 3:</div>
              <div className="mt-1">Durum acilse veya kullanıcı nefes darlığı yaşıyorsa 112’yi arayın. Teknik destek için WhatsApp/telefon hattımıza ulaşın.</div>
            </div>
          </QuickActionCard>

          {/* Icon Strip - Visual Preparation */}
          <IconStrip />

          {/* Checklist */}
          <RespiratoryChecklist />

          {/* Expert Verification Panel */}
          <div className="mt-8">
            <ExpertVerificationPanel
              expert={ESLAMED_EXPERTS.salih}
              lastReviewDate="2026-01-03"
              contentId="solunum-sistemleri-rehberi"
              contentType="guide"
            />
          </div>

          {/* Why: distilled water - Hybrid Infographic */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center flex-shrink-0">
                <Droplets className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Neden saf su?</h2>
                <p className="mt-3 text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                  Nemlendirici haznede saf/arıtılmış su tercih edilmesi, cihazın kireçlenip bozulmasını azaltmak ve nemlendirme sırasında
                  istenmeyen tortu birikimini önlemek içindir. Bu teknik bir koruma adımıdır; klinik kararın yerine geçmez.
                </p>
              </div>
            </div>

            {/* Flow Infographic - 2 Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Left: Narrative Text (hidden on mobile, shown on desktop) */}
              <div className="hidden lg:block">
                <div className="p-4 bg-blue-50/30 rounded-xl border border-blue-100">
                  <p className="text-sm text-slate-700 leading-relaxed" style={{ lineHeight: 1.8 }}>
                    <strong className="text-slate-900">Teknik Not:</strong> Musluk suyundaki mineraller (özellikle kalsiyum ve magnezyum) zamanla cihaz içinde birikir ve performansı düşürür. Saf su kullanımı bu birikimi önler ve cihazın uzun ömürlü çalışmasını destekler.
                  </p>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="mt-8 rounded-xl border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600 min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-900 font-medium">
                      <tr>
                        <th className="px-6 py-4">Özellik</th>
                        <th className="px-6 py-4">Ev Tipi</th>
                        <th className="px-6 py-4">Taşınabilir</th>
                        <th className="px-6 py-4">Tüp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      <tr>
                        <td className="px-6 py-4 font-medium text-slate-900">Çalışma Prensibi</td>
                        <td className="px-6 py-4">Elektrik (Sürekli)</td>
                        <td className="px-6 py-4">Batarya (Pulse)</td>
                        <td className="px-6 py-4">Basınçlı Gaz</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-slate-900">Ağırlık</td>
                        <td className="px-6 py-4">14-20 kg</td>
                        <td className="px-6 py-4">2-4 kg</td>
                        <td className="px-6 py-4">5-10 kg</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-slate-900">Süreklilik</td>
                        <td className="px-6 py-4">7/24 Kesintisiz</td>
                        <td className="px-6 py-4">2-4 Saat Pil</td>
                        <td className="px-6 py-4">Hacme Bağlı</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right: Flow Diagram */}
              <div className="lg:col-span-1">
                <FlowInfographic
                  steps={[
                    {
                      icon: 'X',
                      label: 'Musluk Suyu',
                      status: 'negative',
                      description: 'Kireç riski',
                    },
                    {
                      icon: 'AlertTriangle',
                      label: 'Kireç Birikimi',
                      status: 'warning',
                      description: 'Performans düşer',
                    },
                    {
                      icon: 'TrendingDown',
                      label: 'Cihaz Ömrü',
                      status: 'negative',
                      description: 'Kısalır',
                    },
                  ]}
                  orientation="horizontal"
                />
              </div>
            </div>
          </section>

          {/* How-to - Intentional Coming Soon Cards */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8">
            <div className="flex items-center gap-3 mb-6">
              <PlaySquare className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
              <h2 className="text-2xl font-semibold text-slate-900">Görsel Anlatımlar</h2>
            </div>
            <p className="mt-3 text-slate-600 leading-relaxed mb-6" style={{ lineHeight: 1.8 }}>
              Aşağıdaki görsel anlatımlar teknik ekip tarafından hazırlanmaktadır.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <ComingSoonCard
                  title="Filtre Temizliği Görsel Anlatımı"
                  subtitle="Oksijen filtresi temizliği adımları (model bazlı farklılıklar olabilir)"
                  icon="video"
                  badge="Teknik Ekip Onaylı"
                />
              </div>
              <div>
                <ComingSoonCard
                  title="Cihaz Uyarı Sesleri ve Anlamları"
                  subtitle="Cihaz ötüyor durumunda temel kontrol adımları ve çözüm önerileri"
                  icon="camera"
                  badge="Teknik Ekip Onaylı"
                />
              </div>
            </div>
          </section>

          {/* Extra quick actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QuickActionCard
              variant="info"
              title="Cihaz ötüyor / uyarı veriyor"
              icon={<Megaphone className="w-5 h-5 text-blue-700" strokeWidth={1.5} />}
            >
              Önce ekranda yazan uyarıyı not alın. Filtre kapağı, hortum bağlantısı ve hava girişinin açık olup olmadığını kontrol edin. Uyarı devam ediyorsa model bilgisini paylaşarak destek isteyin.
            </QuickActionCard>
            <QuickActionCard
              variant="info"
              title="Filtre neden önemlidir?"
              icon={<Filter className="w-5 h-5 text-blue-700" strokeWidth={1.5} />}
            >
              Filtre, cihazın hava akışını dengeler. Toz birikimi cihazın performansını düşürebilir ve arıza riskini artırabilir. Temizlik aralığı üretici talimatına göre değişir.
            </QuickActionCard>
          </div>

          {/* Medical Glossary: LSI Terms for Semantic SEO */}
          <MedicalGlossary
            terms={[
              {
                term: 'Satürasyon',
                definition:
                  'Kandaki oksijen doygunluğu. Oksimetre cihazları ile ölçülür ve normal değer genellikle %95-100 arasındadır. Düşük satürasyon değerleri hekim değerlendirmesi gerektirir.',
                externalUrl: 'https://www.who.int/health-topics/oxygen',
                source: 'WHO',
              },
              {
                term: 'Filtrasyon',
                definition:
                  'Oksijen konsantratörlerinde havadaki partiküllerin ve kirleticilerin temizlenmesi işlemi. Filtreler düzenli temizlenmeli ve periyodik olarak değiştirilmelidir.',
                externalUrl: 'https://www.saglik.gov.tr/',
                source: 'Sağlık Bakanlığı',
              },
              {
                term: 'Konsantratör',
                definition:
                  'Ortam havasından oksijen konsantre eden tıbbi cihaz. Ev tipi kullanım için portatif ve sabit modeller mevcuttur. Klinik kullanım gereksinimleri hekim tarafından belirlenir.',
              },
              {
                term: 'Nemlendirme',
                definition:
                  'Kuru oksijen gazının nemlendirilmesi işlemi. Cihazların nemlendirme haznesi saf veya arıtılmış su ile doldurulmalıdır. Kireçli su kullanımı cihazın ömrünü kısaltabilir.',
              },
            ]}
          />

          {/* Internal Linking: Service Cross-Reference */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">İlgili Hizmetler</h2>
            <p className="text-slate-600 leading-relaxed mb-4" style={{ lineHeight: 1.8 }}>
              Bu rehber, cihaz kullanımı ve bakımı için hazırlanmıştır. Oksijen dolum ve temin hizmeti için:
            </p>
            <Link
              href="/hizmetler/oksijen-dolum"
              className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-white px-6 text-base font-semibold hover:bg-emerald-700 transition-colors"
            >
              Oksijen Dolum Hizmeti
              <ArrowUpRight className="w-5 h-5" strokeWidth={1.5} />
            </Link>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}


