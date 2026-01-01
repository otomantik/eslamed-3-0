import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/sections/footer';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { QuickActionCard } from '@/components/rehber/quick-action-card';
import { Activity, BadgeCheck, ClipboardList, Mic, PlaySquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ölçüm Cihazları Rehberi | ESLAMED',
  description:
    'Tansiyon ölçümü için 5 altın kural, cihaz güveni ve yıllık kalibrasyon notu. Panik-proof, anlaşılır ölçüm rehberi.',
  alternates: { canonical: '/rehber/olcum-cihazlari' },
};

export default function OlcumCihazlariPage() {
  const speakableId = 'rehber-tansiyon-kural';

  const howToMeasureBp = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Doğru Tansiyon Nasıl Ölçülür?',
    description:
      'Evde dijital tansiyon ölçümü için pratik adımlar. Bu rehber tanı yerine geçmez; şüphede hekim görüşü alın.',
    step: [
      { '@type': 'HowToStep', name: 'Dinlenin', text: 'Ölçümden önce 5 dakika dinlenin. Konuşmayın.' },
      { '@type': 'HowToStep', name: 'Doğru oturuş', text: 'Ayaklar yerde düz, sırt destekli oturun.' },
      { '@type': 'HowToStep', name: 'Manşet seviyesi', text: 'Manşeti kalp hizasında tutun. Kol destekli olsun.' },
      { '@type': 'HowToStep', name: 'Uygun zamanlama', text: 'Mesane doluysa ölçüm etkilenebilir; mümkünse önce tuvalete gidin.' },
      { '@type': 'HowToStep', name: 'Tekrarlayın', text: 'Gerekirse 1-2 dakika arayla ikinci ölçüm alın ve not edin.' },
    ],
  };

  const speakable = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: 'https://eslamed.com/rehber/olcum-cihazlari',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: [`#${speakableId}`],
    },
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([howToMeasureBp, speakable]) }}
      />

      <Navbar />

      <header className="pt-28 sm:pt-24">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { label: 'Ana Sayfa', href: '/' },
              { label: 'Tıbbi Rehber', href: '/#vip-hizmetler' },
              { label: 'Ölçüm Cihazları' },
            ]}
          />
          <h1 className="mt-6 text-3xl sm:text-4xl font-display font-semibold text-slate-900">
            Ölçüm Cihazları Rehberi
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
            Evde ölçüm cihazları için doğru kullanım adımları. Tanı veya tedavi yerine geçmez; sonuçlarınızı hekiminizle paylaşın.
          </p>
        </div>
      </header>

      <section className="py-10">
        <div className="container-wide space-y-8">
          <QuickActionCard
            variant="info"
            title="Panik anında: cihaz hata veriyor"
            icon={<Activity className="w-5 h-5 text-blue-700" strokeWidth={1.5} />}
          >
            Önce manşetin doğru takıldığını ve kolun destekli olduğunu kontrol edin. Pil düşükse değiştirin. Hata devam ederse cihaz modelini not ederek destek isteyin.
          </QuickActionCard>

          {/* Infographic placeholder */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8">
            <div className="flex items-center gap-3">
              <ClipboardList className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
              <h2 className="text-2xl font-semibold text-slate-900">
                Doğru Tansiyon Ölçümü İçin 5 Altın Kural
              </h2>
            </div>
            <p className="mt-3 text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
              Aşağıdaki kurallar, ölçümü daha tutarlı hale getirir. Şüphede hekiminizin yönlendirmesi esas alınmalıdır.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-blue-50/40 overflow-hidden">
              <div className="aspect-video flex items-center justify-center text-slate-600 font-semibold">
                [IMAGE: Doğru Tansiyon Ölçümü İçin 5 Altın Kural]
              </div>
              <div className="p-5 text-base text-slate-800 leading-relaxed" style={{ lineHeight: 1.8 }} id={speakableId}>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Konuşmayın.</li>
                  <li>Ayaklar yerde düz olsun.</li>
                  <li>Manşet kalp hizasında olsun.</li>
                  <li>Ölçümden önce 5 dakika dinlenin.</li>
                  <li>Mesane doluysa ölçüm etkilenebilir; mümkünse önce tuvalete gidin.</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Calibration trust note */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8">
            <div className="flex items-center gap-3">
              <BadgeCheck className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
              <h2 className="text-2xl font-semibold text-slate-900">
                Neden yılda bir kontrol/kalibrasyon?
              </h2>
            </div>
            <p className="mt-3 text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
              Dijital cihazlar zamanla sensör hassasiyeti ve manşet performansı açısından sapma gösterebilir. Yılda bir kez profesyonel
              kontrol/kalibrasyon, ölçüm güvenini artırır ve yanlış alarm riskini azaltır.
            </p>
          </section>

          {/* How-to placeholders */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8">
            <div className="flex items-center gap-3">
              <PlaySquare className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
              <h2 className="text-2xl font-semibold text-slate-900">Nasıl yapılır (yakında)</h2>
            </div>
            <p className="mt-3 text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
              Kısa video/fotoğraf anlatımları eklendiğinde bu alanlar doldurulacaktır.
            </p>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <figure className="rounded-2xl border border-slate-200 bg-blue-50/40 overflow-hidden">
                <div className="aspect-video flex items-center justify-center text-slate-600 font-semibold">
                  [PLACEHOLDER: Manşet nasıl takılır?]
                </div>
                <figcaption className="p-4 text-sm text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                  Kol çevresine uygun manşet seçimi ve doğru takma.
                </figcaption>
              </figure>
              <figure className="rounded-2xl border border-slate-200 bg-blue-50/40 overflow-hidden">
                <div className="aspect-video flex items-center justify-center text-slate-600 font-semibold">
                  [PLACEHOLDER: Ölçüm sonrası kayıt nasıl tutulur?]
                </div>
                <figcaption className="p-4 text-sm text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                  Tarih/saat ve ölçüm koşullarını not etme.
                </figcaption>
              </figure>
            </div>
          </section>

          <QuickActionCard
            variant="info"
            title="Sesli asistanlar için kısa okuma"
            icon={<Mic className="w-5 h-5 text-blue-700" strokeWidth={1.5} />}
          >
            Bu sayfa, acil durumlarda kısa yönergelerin sesli okunabilmesi için “Speakable” işaretlemesi içerir. Bu bir tanı/tıbbi karar mekanizması değildir.
          </QuickActionCard>
        </div>
      </section>

      <Footer />
    </main>
  );
}


