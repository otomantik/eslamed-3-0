import type { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle2, ClipboardList, MapPin, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/sections/footer';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';

export const metadata: Metadata = {
  title: 'Kişiye Özel Tabanlık | ESLAMED',
  description:
    'Yürüme analizi ve biomekanik ölçümlerle kişiye özel tabanlık süreci. Teknik rehberlik ve süreç yönetimi; tanı ve tedavi kararı hekimlere aittir.',
  alternates: { canonical: '/tabanlik' },
  openGraph: {
    title: 'Kişiye Özel Tabanlık | ESLAMED',
    description:
      'Yürüme analizi ve biomekanik ölçümlerle kişiye özel tabanlık süreci. Teknik rehberlik ve süreç yönetimi.',
    url: '/tabanlik',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
};

export default function TabanlikPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      '@id': 'https://eslamed.com/tabanlik#webpage',
      url: 'https://eslamed.com/tabanlik',
      name: 'Kişiye Özel Tabanlık | ESLAMED',
      description:
        'Yürüme analizi ve biomekanik ölçümlerle kişiye özel tabanlık süreci. Teknik rehberlik ve süreç yönetimi; tanı ve tedavi kararı hekimlere aittir.',
      isPartOf: { '@id': 'https://eslamed.com/#website' },
      about: { '@id': 'https://eslamed.com/#business' },
      inLanguage: 'tr-TR',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://eslamed.com/#business',
      name: 'Eslamed',
      url: 'https://eslamed.com/',
      telephone: '+905372425535',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Alemdağ Mah. Atabey Caddesi 19/BA',
        addressLocality: 'Çekmeköy',
        addressRegion: 'İstanbul',
        addressCountry: 'TR',
      },
      areaServed: [{ '@type': 'AdministrativeArea', name: 'İstanbul' }],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <header className="pt-28 sm:pt-24">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { label: 'Ana Sayfa', href: '/' },
              { label: 'VIP Hizmetler', href: '/#vip-hizmetler' },
              { label: 'Kişiye Özel Tabanlık' },
            ]}
          />
        </div>
      </header>

      {/* HERO */}
      <section className="py-10 sm:py-14">
        <div className="container-wide">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-[280px] sm:h-[320px] lg:h-auto lg:min-h-[520px]">
                {/* IMAGE: Real Orthopedic Analysis (placeholder) */}
                <Image
                  src="/assets/kisiye-ozel-tabanlik-analizi.webp"
                  alt="Kişiye özel tabanlık analizi ve ortopedik çözümler - Eslamed"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
                <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur border border-slate-200 px-3 py-2 text-slate-900 text-sm font-semibold">
                  <ShieldCheck className="w-4 h-4 text-slate-700" strokeWidth={1.5} />
                  VIP / Öncelikli
                </div>
              </div>

              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h1 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900 leading-tight">
                  Yürüme Analizi ve Kişiye Özel Tabanlık
                </h1>
                <p className="mt-4 text-base text-slate-600 leading-relaxed" style={{ lineHeight: 1.6 }}>
                  Yürüme analizi ve biomekanik ölçümlerle size özel tabanlık çözümleri sunuyoruz. Ayak sağlığınız için uzman desteği alın.
                </p>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/905372425535?text=${encodeURIComponent(
                      'Merhaba, kişiye özel tabanlık analizi süreci hakkında bilgi almak istiyorum.'
                    )}`}
                    className="min-h-[44px] inline-flex items-center justify-center rounded-xl bg-slate-900 text-white px-6 py-3.5 text-base font-semibold hover:bg-slate-800 transition-colors"
                  >
                    Randevu Al / Detaylı Bilgi
                  </a>
                  <a
                    href="tel:+905372425535"
                    className="min-h-[44px] inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-base font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    Telefonla Sor
                  </a>
                </div>

                <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                  Hekim planına uygun teknik süreç bilgilendirmesi. Tanı ve tedavi kararı hekimlere aittir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROP */}
      <section className="py-10">
        <div className="container-wide">
          <article className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-semibold text-slate-900">
              Kişiye özel süreç, sakin ve ölçülü ilerleyiş
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed" style={{ lineHeight: 1.6 }}>
              Amaç; hekim önerisiyle uyumlu ekipman kullanımını desteklemek ve teknik süreci netleştirmektir. Ölçüm ve üretim adımları,
              güvenli kullanım sınırları içinde planlanır.
            </p>
          </article>
        </div>
      </section>

      {/* STEP-BY-STEP PROCESS */}
      <section className="py-10">
        <div className="container-wide">
          <h2 className="text-2xl font-semibold text-slate-900">Süreç adım adım</h2>
          <ol className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <li className="rounded-2xl border border-slate-200 bg-white p-7">
              <div className="flex items-center gap-3">
                <ClipboardList className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-slate-900">Adım 1: Randevu</h3>
              </div>
              <p className="mt-3 text-slate-600 leading-relaxed" style={{ lineHeight: 1.6 }}>
                Kısa bir ihtiyaç özeti alırız. Uygun gün ve saat planlanır. (Hekim önerisi varsa paylaşmanız süreci hızlandırır.)
              </p>
            </li>
            <li className="rounded-2xl border border-slate-200 bg-white p-7">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-slate-900">Adım 2: Analiz</h3>
              </div>
              <p className="mt-3 text-slate-600 leading-relaxed" style={{ lineHeight: 1.6 }}>
                Yürüme analizi ve temel biomekanik ölçümler yapılır. Çıktılar, teknik üretim ve kullanım açısından yorumlanır.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-200 bg-white p-7">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-slate-900">Adım 3: Üretim</h3>
              </div>
              <p className="mt-3 text-slate-600 leading-relaxed" style={{ lineHeight: 1.6 }}>
                Ölçümlere uygun üretim planlanır. Teslimat ve kullanım bilgilendirmesi yapılır; takip adımları netleştirilir.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* BOUNDARIES (What we don't do) */}
      <section className="py-10">
        <div className="container-wide">
          <aside role="note" aria-label="Sınırlar" className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Sınırlar</h2>
            <ul className="mt-4 space-y-2 text-slate-600 leading-relaxed" style={{ lineHeight: 1.6 }}>
              <li>Bu hizmet cerrahi müdahale değildir.</li>
              <li>Tanı koymaz, tedavi planlamaz; klinik kararların yerine geçmez.</li>
              <li>Acil bir durumdan şüpheleniyorsanız 112 ile iletişime geçin.</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* TRUST & AUTHORITY placeholders */}
      <section className="py-12 bg-white" id="dogrulama">
        <div className="container-wide">
          <article className="rounded-2xl border border-slate-200 bg-slate-50/50 p-8">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
              <h2 className="text-2xl font-semibold text-slate-900">Yetki & doğrulama</h2>
            </div>

            <p className="mt-3 text-slate-600 leading-relaxed" style={{ lineHeight: 1.6 }}>
              Aşağıdaki bilgiler, doğrulama için yer tutucudur. Numara ve linkler eklendiğinde şeffaflık sayfası üzerinden doğrulanabilir.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="text-slate-500">ÜTS Kayıt No</div>
                <div className="mt-1 font-mono text-slate-900">UTS_REGISTRATION_NO</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="text-slate-500">CE Belge Linki</div>
                <div className="mt-1 font-mono text-slate-900">CE_CERTIFICATE_LINK</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="text-slate-500">Bakanlık Yetki No</div>
                <div className="mt-1 font-mono text-slate-900">MINISTRY_LICENSE_NO</div>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="#dogrulama"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
              >
                Nasıl doğrulanır?
              </a>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}


