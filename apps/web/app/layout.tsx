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
  title: "Eslamed | Evde Medikal Ekipman Yönlendirme",
  description:
    "Evde kullanım için medikal ekipman seçimi ve süreç yönlendirmesi. Oksijen cihazları bir örnektir; evde bakım ve ölçüm/takip ekipmanlarını da kapsar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
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
