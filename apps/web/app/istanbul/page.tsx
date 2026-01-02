import type { Metadata } from 'next';
import Image from 'next/image';
import { BadgeCheck, MapPin } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/sections/footer';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { ServiceTimeline } from '@/components/istanbul/service-timeline';
import { QuickActionCard } from '@/components/rehber/quick-action-card';
import { DistrictInquiry } from '@/components/istanbul/district-inquiry';

export const metadata: Metadata = {
  title: "İstanbul Medikal Destek | ESLAMED",
  description:
    "Çekmeköy merkezli ekibimizle İstanbul genelinde medikal ekipman süreç yönlendirmesi, yerinde kurulum ve kullanım eğitimi.",
  alternates: { canonical: "/istanbul" },
};

const districts: { label: string; region: 'Anadolu' | 'Avrupa' }[] = [
  // Anadolu Yakası
  { label: 'Çekmeköy', region: 'Anadolu' },
  { label: 'Ümraniye', region: 'Anadolu' },
  { label: 'Sancaktepe', region: 'Anadolu' },
  { label: 'Şile', region: 'Anadolu' },
  { label: 'Üsküdar', region: 'Anadolu' },
  { label: 'Kadıköy', region: 'Anadolu' },
  { label: 'Ataşehir', region: 'Anadolu' },
  { label: 'Maltepe', region: 'Anadolu' },
  { label: 'Kartal', region: 'Anadolu' },
  { label: 'Pendik', region: 'Anadolu' },
  { label: 'Sultanbeyli', region: 'Anadolu' },
  { label: 'Tuzla', region: 'Anadolu' },
  { label: 'Beykoz', region: 'Anadolu' },
  // Avrupa Yakası (not exhaustive)
  { label: 'Beşiktaş', region: 'Avrupa' },
  { label: 'Şişli', region: 'Avrupa' },
  { label: 'Kağıthane', region: 'Avrupa' },
  { label: 'Beyoğlu', region: 'Avrupa' },
  { label: 'Fatih', region: 'Avrupa' },
  { label: 'Bakırköy', region: 'Avrupa' },
  { label: 'Zeytinburnu', region: 'Avrupa' },
  { label: 'Bahçelievler', region: 'Avrupa' },
  { label: 'Esenler', region: 'Avrupa' },
  { label: 'Bağcılar', region: 'Avrupa' },
  { label: 'Küçükçekmece', region: 'Avrupa' },
  { label: 'Avcılar', region: 'Avrupa' },
  { label: 'Esenyurt', region: 'Avrupa' },
  { label: 'Beylikdüzü', region: 'Avrupa' },
];

export default function IstanbulPage() {
  // Provided coordinates (Çekmeköy): 41° 2´ 10.3236" , 29° 10´ 57.3600"
  const cekmekoyLat = 41.036201;
  const cekmekoyLng = 29.1826;

  const gbpUrl = process.env.NEXT_PUBLIC_GBP_URL || ''; // optional; set when available

  const localSchema: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.eslamed.com/#business',
    name: 'Eslamed',
    url: 'https://www.eslamed.com/',
    telephone: '+905372425535',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Alemdağ Mah. Atabey Caddesi 19/BA',
      addressLocality: 'Çekmeköy',
      addressRegion: 'İstanbul',
      postalCode: '34797',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: cekmekoyLat,
      longitude: cekmekoyLng,
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: cekmekoyLat,
        longitude: cekmekoyLng,
      },
      // radius in meters (approx)
      geoRadius: 30000,
    },
    areaServed: districts.map((d) => {
      // Wikidata entity IDs for major Istanbul neighborhoods
      const wikidataMap: Record<string, string> = {
        'Kadıköy': 'Q81091',
        'Beşiktaş': 'Q81253',
        'Üsküdar': 'Q232484',
        'Şişli': 'Q81098',
        'Beyoğlu': 'Q81085',
        'Maltepe': 'Q232450',
        'Kartal': 'Q232446',
        'Pendik': 'Q232451',
        'Ataşehir': 'Q232449',
        'Ümraniye': 'Q232453',
        'Çekmeköy': 'Q232448',
        'Beykoz': 'Q232443',
      };
      
      const baseArea = {
        '@type': 'AdministrativeArea',
        name: d.label,
      };
      
      // Add Wikidata ID if available
      if (wikidataMap[d.label]) {
        return {
          ...baseArea,
          '@id': `https://www.wikidata.org/entity/${wikidataMap[d.label]}`,
          sameAs: `https://www.wikidata.org/entity/${wikidataMap[d.label]}`,
        };
      }
      
      return baseArea;
    }),
    department: [
      {
        '@type': 'Department',
        '@id': 'https://www.eslamed.com/#department/teknik-servis',
        name: 'Teknik Servis',
        url: 'https://www.eslamed.com/hizmetler/teknik-servis',
        sameAs: 'https://www.eslamed.com/hizmetler/teknik-servis#service', // Entity graph: links to Service schema @id
        description: 'Medikal cihazlarda teknik ön değerlendirme, arıza analizi ve onarım planlama süreci.',
      },
      {
        '@type': 'Department',
        '@id': 'https://www.eslamed.com/#department/oksijen-dolum',
        name: 'Oksijen Dolum',
        url: 'https://www.eslamed.com/hizmetler/oksijen-dolum',
        sameAs: 'https://www.eslamed.com/hizmetler/oksijen-dolum#service', // Entity graph: links to Service schema @id
        description: 'Oksijen tüpü temin/dolum süreçlerinde güvenlik standartlarına uygun kontrol adımları ve İstanbul içi planlı hızlı lojistik.',
      },
      {
        '@type': 'Department',
        '@id': 'https://www.eslamed.com/#department/cihaz-kiralama',
        name: 'Medikal Ekipman Kiralama',
        url: 'https://www.eslamed.com/hizmetler/cihaz-kiralama',
        sameAs: 'https://www.eslamed.com/hizmetler/cihaz-kiralama#service', // Entity graph: links to Service schema @id
        description: 'Evde kullanım için cihaz kiralama sürecinde hijyen hazırlığı, teknik kontrol ve esnek süre/koşul planlama yaklaşımı.',
      },
    ],
  };

  if (gbpUrl.trim()) {
    localSchema.sameAs = [gbpUrl.trim()];
  }

  const anatolia = districts.filter((d) => d.region === 'Anadolu').map((d) => d.label);
  const europe = districts.filter((d) => d.region === 'Avrupa').map((d) => d.label);

  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />

      <Navbar />

      <header className="pt-28 sm:pt-24">
        <div className="container-wide">
          <Breadcrumbs items={[{ label: 'Ana Sayfa', href: '/' }, { label: 'İstanbul' }]} />
        </div>
      </header>

      {/* HERO */}
      <section className="py-10 sm:py-14">
        <div className="container-wide">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 w-fit">
                  <BadgeCheck className="w-4 h-4 text-emerald-600" strokeWidth={1.5} />
                  Yerinde Destek Garantisi
                </div>
                <h1 className="mt-5 text-3xl sm:text-4xl font-display font-semibold text-slate-900 leading-tight">
                  İstanbul&apos;un Her Noktasına Uzman Medikal Destek
                </h1>
                <p className="mt-4 text-base text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                  Çekmeköy merkezli ekibimizle, tıbbi cihazlarınızı sadece kapınıza getirmiyoruz; evinizde kuruyor ve eğitimini veriyoruz.
                </p>

                <QuickActionCard variant="info" title="Yerinde destek yaklaşımı" icon={<MapPin className="w-5 h-5 text-blue-700" strokeWidth={1.5} />}>
                  Kargo ile gönderim yapıp sizi cihazla baş başa bırakmıyoruz. Kendi aracımız ve personelimizle geliyoruz.
                </QuickActionCard>
              </div>

              <div className="relative h-[280px] sm:h-[340px] lg:h-auto lg:min-h-[520px]">
                <Image
                  src="/assets/hero-bg.png"
                  alt="İstanbul genelinde yerinde medikal ekipman desteği ve kurulum süreci"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={true}
                  fetchPriority="high"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container-wide space-y-8">
          <ServiceTimeline />

          {/* District Grid */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Hizmet Bölgeleri</h2>
            <p className="mt-3 text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
              İlçe bazlı planlama; cihaz tipi, kullanım koşulu ve saha yoğunluğuna göre netleşir.
            </p>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Anadolu Yakası</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                  Çekmeköy merkezimize komşu ilçeler (Ümraniye, Sancaktepe, Şile) için öncelikli hızlı servis.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {anatolia.map((d) => (
                    <span key={d} className="text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-full px-3 py-2">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900">Avrupa Yakası</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {europe.map((d) => (
                    <span key={d} className="text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-full px-3 py-2">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Map placeholder */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Hizmet Kapsama Alanı</h2>
            <p className="mt-3 text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
              Aşağıdaki alan, ileride eklenecek harita/görsel kapsama anlatımı için yer tutucudur.
            </p>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-blue-50/40 overflow-hidden">
              <div className="aspect-video flex items-center justify-center text-slate-600 font-semibold">
                [MAP: İstanbul Hizmet Kapsama Alanı Görseli]
              </div>
            </div>
          </section>

          <DistrictInquiry districts={districts} />
        </div>
      </section>

      <Footer />
    </main>
  );
}


