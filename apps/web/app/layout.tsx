import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Tracker from "@/components/analytics/Tracker";
import { StickySupport } from "@/components/ui/sticky-support";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://eslamed.com"),
  title: "ESLAMED | Evde Medikal Ekipman ve Süreç Yönlendirme Merkezi",
  description:
    "Evde bakım, solunum desteği ve takip cihazları için teknik rehberlik. Tanı/tedavi dışı, ekipman uygunluk ve güvenli kullanım süreçlerinde destek.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    shortcut: [{ url: "/favicon.ico" }],
  },
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
  };

  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${inter.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <Tracker />
        </Suspense>
        {children}
        <StickySupport />
      </body>
    </html>
  );
}
