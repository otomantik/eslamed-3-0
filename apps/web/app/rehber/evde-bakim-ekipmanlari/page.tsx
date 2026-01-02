import type { Metadata } from 'next';
import Image from 'next/image';
import { Bed, Accessibility } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/sections/footer';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { QuickActionCard } from '@/components/rehber/quick-action-card';

export const metadata: Metadata = {
  title: 'Evde Bakım Ekipmanları Rehberi | ESLAMED',
  description:
    'Hasta yatağı ve mobilite ekipmanları için sakin, anlaşılır teknik rehber. Kurulum, temizlik ve güvenli kullanım adımları.',
  alternates: { canonical: '/rehber/evde-bakim-ekipmanlari' },
};

export default function EvdeBakimEkipmanlariRehberPage() {
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Hasta Yatağı Ayarları Nasıl Yapılır?',
    description:
      'Hasta yatağında baş/ayak yükseltme ve pozisyon ayarlarının güvenli kullanım adımları (tıbbi karar yerine geçmez).',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Güvenlik kontrolü',
        text: 'Kablo ve kumanda bağlantılarını kontrol edin. Yatak hareket alanında engel olmadığından emin olun.',
      },
      {
        '@type': 'HowToStep',
        name: 'Baş ve sırt yükseltme',
        text: 'Kumandadan baş/sırt bölümünü yavaşça yükseltin. Kullanıcı konforunu gözleyin; ağrı varsa durdurun.',
      },
      {
        '@type': 'HowToStep',
        name: 'Ayak bölümünü ayarlama',
        text: 'Ayak bölümünü küçük adımlarla ayarlayın. Dengeyi bozacak hızlı hareketlerden kaçının.',
      },
      {
        '@type': 'HowToStep',
        name: 'Kilit ve kablo düzeni',
        text: 'Teker kilitlerini kontrol edin. Kabloların takılma riskini azaltacak şekilde düzenleyin.',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Hasta yatağı kurulumu zor mu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Kurulum genellikle teknik adımlarla tamamlanır: yerleşim, elektrik bağlantısı, kumanda testi ve kısa güvenlik kontrolü. Yerinde kurulumda bu adımlar sakin şekilde birlikte yapılır.',
        },
      },
      {
        '@type': 'Question',
        name: 'Temizliği nasıl yapılır?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Nemli bez ve yüzeye uygun temizleyici ile düzenli silme yeterlidir. Elektrik aksamına sıvı temasından kaçının. Kılıf/örtüler için üretici talimatlarını izleyin.',
        },
      },
      {
        '@type': 'Question',
        name: 'Yatak yarası nasıl önlenir?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Bası yarası riski tıbbi değerlendirme gerektirir. Genel destek adımları: düzenli pozisyon değişimi, cildin kuru/temiz tutulması ve uygun destek yüzeyi (ör. havalı yatak) kullanımıdır. Risk yüksekse hekim/hemşire ile plan oluşturulmalıdır.',
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar />

      <header className="pt-28 sm:pt-24">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { label: 'Ana Sayfa', href: '/' },
              { label: 'Rehber', href: '/rehber/solunum-sistemleri' },
              { label: 'Evde Bakım Ekipmanları' },
            ]}
          />
          <h1 className="mt-6 text-3xl sm:text-4xl font-display font-semibold text-slate-900">
            Evde Bakım Ekipmanları Rehberi
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
            Hasta yatağı ve mobilite ekipmanlarında amaç: güvenli kurulum, anlaşılır kullanım ve düşük stresli bakım rutini.
          </p>
        </div>
      </header>

      <section className="py-10">
        <div className="container-wide space-y-8">
          <section className="rounded-3xl border border-slate-200 bg-white overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-10">
                <h2 className="text-2xl font-semibold text-slate-900">Hasta Yatakları ve Mobilite</h2>
                <p className="mt-3 text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                  Bu rehber, teknik kullanım güvenliği içindir. Tıbbi kararlar hekim/hemşire planına göre verilir.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <article className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <Bed className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">Hasta Yatağı</h3>
                        <p className="mt-2 text-sm text-slate-600" style={{ lineHeight: 1.8 }}>
                          Konumlandırma, kumanda kullanımı, güvenlik kontrolleri.
                        </p>
                      </div>
                    </div>
                  </article>
                  <article className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <Accessibility className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">Mobilite</h3>
                        <p className="mt-2 text-sm text-slate-600" style={{ lineHeight: 1.8 }}>
                          Teker kilidi, denge, transfer güvenliği için temel noktalar.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>

              <div className="relative h-[280px] sm:h-[340px] lg:h-auto lg:min-h-[420px]">
                <Image
                  src="/assets/hero-bg.png"
                  alt="Evde bakım ekipmanları için güvenli kurulum ve kullanım rehberi görsel yer tutucu"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="eager"
                />
              </div>
            </div>
          </section>

          <QuickActionCard variant="info" title="Kısa güvenlik hatırlatması">
            Elektrikli yataklarda kablo/fiş güvenliği ve teker kilitleri kritik noktadır. Kullanım sırasında ağrı, baş dönmesi veya belirgin kötüleşme olursa tıbbi ekibinize danışın.
          </QuickActionCard>

          <section className="rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Hasta Yatağı Ayarları Nasıl Yapılır?</h2>
            <ol className="mt-5 space-y-4 text-slate-700" style={{ lineHeight: 1.8 }}>
              <li>
                <span className="font-semibold text-slate-900">1) Güvenlik kontrolü:</span> Kablo ve kumandayı kontrol edin, yatak çevresini boşaltın.
              </li>
              <li>
                <span className="font-semibold text-slate-900">2) Baş/sırt yükseltme:</span> Yavaşça yükseltin; konforu gözleyin, ağrı olursa durdurun.
              </li>
              <li>
                <span className="font-semibold text-slate-900">3) Ayak ayarı:</span> Küçük adımlarla ayarlayın; hızlı hareketlerden kaçının.
              </li>
              <li>
                <span className="font-semibold text-slate-900">4) Kilit ve kablo düzeni:</span> Teker kilitlerini kontrol edin, takılma riskini azaltın.
              </li>
            </ol>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Sık Sorulanlar</h2>
            <div className="mt-6 space-y-4">
              <article className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
                <h3 className="text-base font-semibold text-slate-900">Hasta yatağı kurulumu zor mu?</h3>
                <p className="mt-2 text-sm text-slate-600" style={{ lineHeight: 1.8 }}>
                  Kurulum genellikle yerleşim, elektrik bağlantısı, kumanda testi ve kısa güvenlik kontrolü adımlarından oluşur. Yerinde kurulumda bu adımlar birlikte yapılır.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
                <h3 className="text-base font-semibold text-slate-900">Temizliği nasıl yapılır?</h3>
                <p className="mt-2 text-sm text-slate-600" style={{ lineHeight: 1.8 }}>
                  Nemli bez ve yüzeye uygun temizleyici ile düzenli silme yeterlidir. Elektrik aksamına sıvı temasından kaçının. Kılıf/örtüler için üretici talimatlarını izleyin.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
                <h3 className="text-base font-semibold text-slate-900">Yatak yarası nasıl önlenir?</h3>
                <p className="mt-2 text-sm text-slate-600" style={{ lineHeight: 1.8 }}>
                  Bası yarası riski tıbbi değerlendirme gerektirir. Genel destek adımları: düzenli pozisyon değişimi, cildin kuru/temiz tutulması ve uygun destek yüzeyi (ör. havalı yatak) kullanımıdır. Risk yüksekse hekim/hemşire ile plan oluşturulmalıdır.
                </p>
              </article>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}


