import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/sections/footer';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { QuickActionCard } from '@/components/rehber/quick-action-card';
import { RespiratoryChecklist } from '@/components/rehber/respiratory-checklist';
import { BatteryCharging, Droplets, Filter, Megaphone, PlaySquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Solunum Sistemleri Rehberi | ESLAMED',
  description:
    'Solunum destek ekipmanlarında günlük kontrol, filtre temizliği ve elektrik kesintisi eylem planı. Panik anında uygulanabilir, teknik odaklı rehber.',
  alternates: { canonical: '/rehber/solunum-sistemleri' },
};

export default function SolunumSistemleriPage() {
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
    url: 'https://eslamed.com/rehber/solunum-sistemleri',
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

      <Navbar />

      <header className="pt-28 sm:pt-24">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { label: 'Ana Sayfa', href: '/' },
              { label: 'Tıbbi Rehber', href: '/#vip-hizmetler' },
              { label: 'Solunum Sistemleri' },
            ]}
          />
          <h1 className="mt-6 text-3xl sm:text-4xl font-display font-semibold text-slate-900">
            Solunum Sistemleri Rehberi
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
            Bu sayfa, solunum destek cihazlarında günlük kullanım ve teknik güvenlik için hazırlanmıştır. Tanı veya tedavi yerine geçmez.
          </p>
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

          {/* Checklist */}
          <RespiratoryChecklist />

          {/* Why: distilled water */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8">
            <div className="flex items-start gap-3">
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
          </section>

          {/* How-to placeholders */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8">
            <div className="flex items-center gap-3">
              <PlaySquare className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
              <h2 className="text-2xl font-semibold text-slate-900">Nasıl yapılır (yakında)</h2>
            </div>
            <p className="mt-3 text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
              Aşağıdaki alanlar, ileride eklenecek kısa video veya fotoğraf anlatımları için yer tutucudur.
            </p>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <figure className="rounded-2xl border border-slate-200 bg-blue-50/40 overflow-hidden">
                <div className="aspect-video flex items-center justify-center text-slate-600 font-semibold">
                  [PLACEHOLDER: Filtre Temizliği Video/Fotoğraf]
                </div>
                <figcaption className="p-4 text-sm text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                  Oksijen filtresi temizliği (model bazlı farklılıklar olabilir).
                </figcaption>
              </figure>
              <figure className="rounded-2xl border border-slate-200 bg-blue-50/40 overflow-hidden">
                <div className="aspect-video flex items-center justify-center text-slate-600 font-semibold">
                  [PLACEHOLDER: Cihaz Uyarı Sesleri ve Anlamları]
                </div>
                <figcaption className="p-4 text-sm text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                  “Cihaz ötüyor” durumunda temel kontrol adımları.
                </figcaption>
              </figure>
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
        </div>
      </section>

      <Footer />
    </main>
  );
}


