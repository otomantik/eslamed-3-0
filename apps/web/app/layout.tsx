import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Tracker from "@/components/analytics/Tracker";
import { MobileFAB } from "@/components/ui/mobile-fab";
import { IntentProviderWrapper } from "@/components/providers/intent-provider-wrapper";
import { IntentThemeProvider } from "@/context/theme-provider";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://eslamed.com"),
  title: "ESLAMED | Evde Medikal Ekipman ve Süreç Yönlendirme Merkezi",
  description:
    "Evde bakım, solunum desteği ve takip cihazları için teknik rehberlik. Tanı/tedavi dışı, ekipman uygunluk ve güvenli kullanım süreçlerinde destek. 4.9 yıldız, 73+ doğrulanmış yorum.",
  // Icons are automatically detected by Next.js from:
  // - app/icon.svg (or icon.png)
  // - app/favicon.ico
  // - app/apple-icon.tsx (or apple-icon.png)
  // No manual configuration needed - Next.js handles this automatically
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    title: "ESLAMED",
    capable: true,
    statusBarStyle: "default",
  },
  openGraph: {
    type: "website",
    url: "https://eslamed.com/",
    siteName: "ESLAMED",
    title: "ESLAMED | Evde Medikal Ekipman ve Süreç Yönlendirme Merkezi",
    description:
      "Evde kullanım için medikal ekipman uygunluğu ve süreç yönlendirmesi. Tanı ve tedavi kararı hekimlere aittir; bu hizmet tanı/tedavi sunmaz.",
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
      "Evde kullanım için medikal ekipman uygunluğu ve süreç yönlendirmesi. Tanı ve tedavi kararı hekimlere aittir; bu hizmet tanı/tedavi sunmaz.",
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
    '@id': 'https://eslamed.com/#business',
    name: 'Eslamed',
    url: 'https://eslamed.com/',
    image: 'https://eslamed.com/assets/hero-bg.png',
    logo: 'https://eslamed.com/assets/hero-bg.png',
    description:
      'Eslamed, evde kullanım için medikal ekipman uygunluğu ve süreç yönlendirmesi sağlar (solunum desteği, evde bakım, ölçüm/takip). Tanı ve tedavi kararı hekimlere aittir; bu hizmet tanı/tedavi sunmaz.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Alemdağ Mah. Atabey Caddesi 19/BA',
      addressLocality: 'Çekmeköy',
      addressRegion: 'İstanbul',
      addressCountry: 'TR',
    },
    telephone: '+905372425535',
    knowsAbout: ['ÜTS Kayıtlı Cihazlar', 'CE Belgeli Medikal Donanımlar', 'Evde Sağlık Ekipmanları'],
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'İstanbul' },
      { '@type': 'AdministrativeArea', name: 'Çekmeköy' },
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
        {/* Preconnect to Google Fonts for Core Web Vitals optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Critical CSS: Playfair Display font variable for premium perception (0.00 CLS during font-swap) */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-premium: ${playfair.style.fontFamily};
            }
          `
        }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${inter.variable} ${playfair.variable} antialiased`}
      >
        {/* Aria-live region for mode announcements */}
        <div id="aria-live-announcements" aria-live="polite" aria-atomic="true" />
        
        <Suspense fallback={null}>
          <Tracker />
        </Suspense>
        <Suspense fallback={null}>
          <IntentProviderWrapper>
            <IntentThemeProvider>
              {children}
              <MobileFAB />
            </IntentThemeProvider>
          </IntentProviderWrapper>
        </Suspense>
      </body>
    </html>
  );
}
