import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { TrackingProvider } from "@/components/providers/tracking-provider";
import { IntentProviderWrapper } from "@/components/providers/intent-provider-wrapper";
import { IntentThemeProvider } from "@/context/theme-provider";
import { CTALockWrapper } from "@/components/ui/cta-lock-wrapper";
import { ConsoleHygieneClient } from "@/lib/dev/console-hygiene-client";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-premium",
  subsets: ["latin"],
  display: "swap",
});

import { REALITY_ANCHORS } from "@/lib/integrity/reality-anchors";

export const metadata: Metadata = {
  metadataBase: new URL(REALITY_ANCHORS.siteUrl),
  title: "ESLAMED | Evde Medikal Ekipman ve Süreç Yönlendirme Merkezi",
  description:
    "Evde bakım, solunum desteği ve takip cihazları için teknik rehberlik. Tanı/tedavi dışı, ekipman uygunluk ve güvenli kullanım süreçlerinde destek. 4.9 yıldız, 73+ doğrulanmış yorum.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    title: "ESLAMED",
    capable: true,
    statusBarStyle: "default",
  },
  openGraph: {
    type: "website",
    url: `${REALITY_ANCHORS.siteUrl}/`,
    siteName: "ESLAMED",
    title: "ESLAMED | Evde Medikal Ekipman ve Süreç Yönlendirme Merkezi",
    description:
      "Evde kullanım için medikal ekipman uygunluğu ve süreç yönlendirmesi. Tanı ve tedavi kararı hekimlere aittir; bu hizmet tıbbi tanı veya tedavi sunmaz.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ESLAMED - Evde Medikal Ekipman Yönlendirme",
      },
    ],
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "ESLAMED | Evde Medikal Ekipman ve Süreç Yönlendirme Merkezi",
    description:
      "Evde kullanım için medikal ekipman uygunluğu ve süreç yönlendirmesi. Tanı ve tedavi kararı hekimlere aittir; bu hizmet tıbbi tanı veya tedavi sunmaz.",
    images: ["/twitter-image"],
  },
};

export const viewport = {
  themeColor: "#2563EB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const medicalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': `${REALITY_ANCHORS.siteUrl}/#business`,
    name: REALITY_ANCHORS.officialBusinessName,
    alternateName: 'ESLAMED',
    url: `${REALITY_ANCHORS.siteUrl}/`,
    image: `${REALITY_ANCHORS.siteUrl}/assets/hero-bg.png`,
    logo: `${REALITY_ANCHORS.siteUrl}/assets/hero-bg.png`,
    description:
      'Eslamed, evde kullanım için medikal ekipman uygunluğu ve süreç yönlendirmesi sağlar (solunum desteği, evde bakım, ölçüm/takip). Tanı ve tedavi kararı hekimlere aittir; bu hizmet tıbbi tanı veya tedavi sunmaz.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: REALITY_ANCHORS.address.street,
      addressLocality: REALITY_ANCHORS.address.city,
      addressRegion: REALITY_ANCHORS.address.region,
      postalCode: REALITY_ANCHORS.address.postalCode,
      addressCountry: REALITY_ANCHORS.address.country,
    },
    taxID: REALITY_ANCHORS.taxID,
    vatID: REALITY_ANCHORS.taxID,
    telephone: REALITY_ANCHORS.contact.phone,
    openingHours: 'Mo-Su 00:00-24:00',
    priceRange: '$$',
    knowsAbout: ['ÜTS Kayıtlı', 'CE Mevzuatına Uygun Ürün Tedariki', 'Evde Sağlık Ekipmanları'],
    areaServed: [
      { '@type': 'AdministrativeArea', name: REALITY_ANCHORS.address.region },
      { '@type': 'AdministrativeArea', name: REALITY_ANCHORS.address.city },
      { '@type': 'AdministrativeArea', name: 'Ümraniye' },
      { '@type': 'AdministrativeArea', name: 'Üsküdar' },
      { '@type': 'AdministrativeArea', name: 'Kadıköy' },
      { '@type': 'AdministrativeArea', name: 'Ataşehir' },
      { '@type': 'AdministrativeArea', name: 'Maltepe' },
      { '@type': 'AdministrativeArea', name: 'Kartal' },
      { '@type': 'AdministrativeArea', name: 'Pendik' },
      { '@type': 'AdministrativeArea', name: 'Sancaktepe' },
      { '@type': 'AdministrativeArea', name: 'Sultanbeyli' },
    ],
    availableService: [
      {
        '@type': 'Service',
        name: 'Ekipman uygunluğu ve süreç yönlendirmesi',
        serviceType: 'Equipment Matching',
      },
      {
        '@type': 'Service',
        name: 'Kurulum ve güvenli kullanım adımları',
        serviceType: 'Installation Guidance',
      },
      {
        '@type': 'Service',
        name: 'Teknik değerlendirme ve destek süreci',
        serviceType: 'Technical Support',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '73',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'A. Y.',
        },
        datePublished: '2026-01-02',
        reviewBody:
          'Esla Med medikal, yılbaşı sonrası olsa da 7/24 hizmet veren kurumu aradığımızda oksijen tüpü için gelip değişimi sağlayan yetkili arkadaşımıza teşekkürlerimi sunarım iyi ki varsınız.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'G. E.',
        },
        datePublished: '2026-01-15',
        reviewBody:
          'Gece yarısı aradık, ertesi gün sabah teslimat yaptılar. Çok profesyonel ve hızlı bir hizmet. Teşekkürler.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'S. K.',
        },
        datePublished: '2026-01-20',
        reviewBody:
          'Eslamed ekibi cihaz kurulumunda çok profesyoneldi. Annem için kiraladığımız konsantratör tertemiz geldi.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1',
        },
      },
    ],
  };

  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <head>
        {/* Next.js automatically handles font preconnect and preload via next/font/google */}
        {/* Critical CSS: Font variables are already injected by Next.js via className */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${inter.variable} ${playfair.variable} antialiased`}
      >
        {/* Console hygiene (DEV only, when NEXT_PUBLIC_CONSOLE_HYGIENE=1) */}
        <ConsoleHygieneClient />

        {/* Aria-live region for mode announcements */}
        <div id="aria-live-announcements" aria-live="polite" aria-atomic="true" />

        <Suspense fallback={null}>
        </Suspense>
        <Suspense fallback={null}>
          <TrackingProvider>
            <IntentProviderWrapper>
              <IntentThemeProvider>
                {children}
                <CTALockWrapper />
              </IntentThemeProvider>
            </IntentProviderWrapper>
          </TrackingProvider>
        </Suspense>
      </body>
    </html>
  );
}
