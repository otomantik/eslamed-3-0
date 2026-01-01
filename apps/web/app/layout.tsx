import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Tracker from "@/components/analytics/Tracker";

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
  title: "ESLAMED | Evde Medikal Ekipman ve Süreç Yönlendirme Merkezi",
  description:
    "Evde bakım, solunum desteği ve takip cihazları için teknik rehberlik. Tanı/tedavi dışı, ekipman uygunluk ve güvenli kullanım süreçlerinde destek.",
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
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'İstanbul',
    },
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
      </body>
    </html>
  );
}
