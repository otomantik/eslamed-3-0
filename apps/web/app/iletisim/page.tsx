import type { Metadata } from 'next';
import Image from 'next/image';
import { MapPinned, MessageCircle, Phone, Navigation } from 'lucide-react';
import { ModeAwareNavbar } from '@/components/layout/mode-aware-navbar';
import { Footer } from '@/components/sections/footer';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { detectIntent } from '@/lib/intent/detector';

export const metadata: Metadata = {
  title: 'İletişim | ESLAMED',
  description:
    'Eslamed iletişim ve adres bilgileri. Çekmeköy merkezimize yol tarifi, WhatsApp ve direkt arama.',
  alternates: { canonical: '/iletisim' },
};

export default async function IletisimPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const intentResult = await detectIntent({ ...resolvedParams, url: '/iletisim' });
  const lat = 41.036201;
  const lng = 29.1826;

  const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    'Alemdağ Mah. Atabey Cad. No:19/E1A, Çekmeköy, İstanbul'
  )}&destination_place_id=&travelmode=driving`;

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.eslamed.com/#business',
    name: 'ESLAMED MEDİKAL - SALİH CEVHEROĞLU',
    alternateName: 'ESLAMED',
    url: 'https://www.eslamed.com/',
    telephone: '+905372425535',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Alemdağ Mah. Atabey Cad. No:19/E1A',
      addressLocality: 'Çekmeköy',
      addressRegion: 'İstanbul',
      postalCode: '34797',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: lat,
      longitude: lng,
    },
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <ModeAwareNavbar serverMode={intentResult.mode} />

      <header className="pt-28 sm:pt-24">
        <div className="container-wide">
          <Breadcrumbs items={[{ label: 'Ana Sayfa', href: '/' }, { label: 'İletişim' }]} />
          <h1 className="mt-6 text-3xl sm:text-4xl font-display font-semibold text-slate-900">
            İletişim
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
            Konum, iletişim ve fiziksel otorite (NAP) bilgileri burada net biçimde yer alır.
          </p>
        </div>
      </header>

      <section className="py-10">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map placeholder */}
          <section className="rounded-3xl border border-slate-200 bg-white overflow-hidden">
            <div className="p-8 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center" aria-hidden="true">
                  <MapPinned className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Konum (Yer Tutucu)</h2>
                  <p className="mt-1 text-sm text-slate-600" style={{ lineHeight: 1.8 }}>
                    Harita görseli / embed daha sonra eklenecek.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative aspect-video bg-blue-50/40 flex items-center justify-center">
              <div className="text-slate-600 font-semibold">[MAP: Çekmeköy Merkez Konumu]</div>
              <Image
                src="/assets/hero-bg.png"
                alt="Çekmeköy merkezli operasyon noktası için yer tutucu görsel"
                fill
                className="object-cover opacity-10"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="eager"
              />
            </div>
          </section>

          {/* NAP + actions */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-xl font-semibold text-slate-900">Adres ve iletişim</h2>
            <address className="mt-4 not-italic text-slate-700" style={{ lineHeight: 1.8 }}>
              <div className="font-semibold text-slate-900">ESLAMED</div>
              Alemdağ Mah. Atabey Cad. No:19/E1A
              <br />
              Çekmeköy / İstanbul, <span className="font-mono">34797</span>
              <br />
              Telefon: <a className="underline underline-offset-4" href="tel:+905372425535">+90 537 242 55 35</a>
            </address>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="https://wa.me/905372425535?text=Merhaba"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white px-6 text-base font-semibold hover:bg-emerald-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
                WhatsApp
              </a>
              <a
                href="tel:+905372425535"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white px-6 text-base font-semibold hover:bg-slate-800 transition-colors"
              >
                <Phone className="w-5 h-5" strokeWidth={1.5} />
                Direkt Ara
              </a>
            </div>

            <a
              href={mapsDirections}
              target="_blank"
              rel="noreferrer"
              className="mt-3 min-h-[48px] inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-base font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <Navigation className="w-5 h-5" strokeWidth={1.5} />
              Çekmeköy Merkezimize Yol Tarifi Al
            </a>

            <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <h3 className="text-base font-semibold text-slate-900">Ziyaret ve yönlendirme notu</h3>
              <p className="mt-2 text-sm text-slate-600" style={{ lineHeight: 1.8 }}>
                Yerinde ziyaretler randevu ile planlanır. Tıbbi acil durumlarda iletişim kanallarımız acil sağlık hizmetlerinin yerine geçmez.
              </p>
            </section>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}



