import type { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle2, HelpCircle, Download, FileText } from 'lucide-react';
import { ModeAwareNavbar } from '@/components/layout/mode-aware-navbar';
import { Footer } from '@/components/sections/footer';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { detectIntent } from '@/lib/intent/detector';

export const metadata: Metadata = {
  title: 'İşletme Belgeleri | ESLAMED',
  description:
    'Kurumsal yetkinlik ve belgelerimiz. ÜTS kayıt bilgileri ve yetki belgeleri için şeffaf doğrulama sayfası.',
  alternates: { canonical: '/isletme-belgeleri' },
};

type LicenseItem = {
  title: string;
  regNo: string;
  meaning: string;
  pdfUrl: string;
  previewUrl: string;
  date?: string;
  status?: string;
};

const licenses: LicenseItem[] = [
  {
    title: 'Tıbbi Cihaz Satış Merkezi Yetki Belgesi',
    regNo: 'ÇKYS: 5120489',
    meaning:
      'Tıbbi cihaz satış süreçlerinin mevzuata uygun şekilde yürütüldüğünü ve denetlenebilir bir yetkilendirme çerçevesi içinde hizmet verildiğini gösterir.',
    pdfUrl: '/assets/documents/tibbi-cihaz-satis-yetki-belgesi.pdf',
    previewUrl: '/assets/documents/previews/tibbi-cihaz-preview.jpg',
  },
  {
    title: 'ÜTS Kayıt Belgesi',
    regNo: 'ÜTS Firma No: 26672691179647',
    meaning:
      'Cihazların ve kayıtların Ürün Takip Sistemi (ÜTS) üzerinden izlenebilirliği için temel doğrulama alanıdır. Doğrulama bilgileri eklendiğinde bu sayfa üzerinden kontrol edilebilir.',
    pdfUrl: '/assets/documents/uts-firma-kayit-belgesi.pdf',
    previewUrl: '/assets/documents/previews/uts-preview.jpg',
    status: 'Aktif',
  },
  {
    title: 'İş Yeri Açma ve Çalışma Ruhsatı',
    regNo: 'Ruhsat No: 84',
    meaning:
      'İş yerinin yasal faaliyet iznine sahip olduğunu ve kayıtlı/denetlenebilir bir çerçevede çalıştığını gösterir.',
    pdfUrl: '/assets/documents/isyeri-acma-ve-calisma-ruhsati.pdf',
    previewUrl: '/assets/documents/previews/ruhsat-preview.jpg',
    date: '17-03-2025',
  },
];

export default async function IsletmeBelgeleriPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Detect intent for mode-aware navbar
  const resolvedParams = await searchParams;
  const intentResult = await detectIntent(resolvedParams);

  // Credentials schema with official business name
  const jsonLd = {
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
    taxID: '2070554381',
    vatID: '2070554381',
    areaServed: [{ '@type': 'AdministrativeArea', name: 'İstanbul' }],
    hasCredential: licenses.map((l) => ({
      '@type': 'EducationalOccupationalCredential',
      name: l.title,
      identifier: l.regNo,
      description: l.meaning,
    })),
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ModeAwareNavbar serverMode={intentResult.mode} />

      <header className="pt-28 sm:pt-24">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { label: 'Ana Sayfa', href: '/' },
              { label: 'Kurumsal', href: '/#kurumsal' },
              { label: 'İşletme Belgeleri' },
            ]}
          />
        </div>
      </header>

      <section className="py-10 sm:py-14">
        <div className="container-wide">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-8 lg:p-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-slate-900 leading-tight">
              Kurumsal Yetkinlik ve Belgelerimiz
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed" style={{ lineHeight: 1.6 }}>
              Eslamed olarak sunduğumuz tüm hizmetler ve cihazlar, T.C. Sağlık Bakanlığı standartlarına ve yasal mevzuatlara tam uyumludur.
            </p>

            <div className="mt-10 space-y-8">
              {licenses.map((doc) => (
                <article
                  key={doc.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-6 lg:p-8"
                >
                  {/* Mobile-first layout: Preview Image First */}
                  <div className="block md:hidden mb-6">
                    <div className="relative w-full h-[240px] sm:h-[280px] rounded-2xl border-2 border-slate-200 bg-white overflow-hidden group">
                      <div className="relative w-full h-full">
                        <Image
                          src={doc.previewUrl}
                          alt={`${doc.title} önizleme görseli`}
                          fill
                          className="object-contain p-3 sm:p-4"
                          sizes="(max-width: 768px) 100vw, 80vw"
                          quality={90}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                        <a
                          href={doc.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-900 rounded-lg text-sm font-semibold hover:bg-slate-100 transition-colors"
                        >
                          <FileText className="w-4 h-4" strokeWidth={1.5} />
                          PDF'yi Aç
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Content Section: Mobile flex-col, Desktop flex-row */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
                    {/* Title and Description */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-2 mb-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <h2 className="text-lg sm:text-xl font-semibold text-slate-900 break-words hyphens-auto">
                          {doc.title}
                        </h2>
                      </div>

                      <div className="mt-3 space-y-1.5 text-xs sm:text-sm text-slate-700">
                        <div>
                          <span className="font-semibold">Kayıt / Belge No:</span>{' '}
                          <span className="font-mono break-all">{doc.regNo}</span>
                        </div>
                        {doc.date && (
                          <div>
                            <span className="font-semibold">Tarih:</span>{' '}
                            <span className="font-mono">{doc.date}</span>
                          </div>
                        )}
                        {doc.status && (
                          <div>
                            <span className="font-semibold">Durum:</span>{' '}
                            <span className="font-semibold text-emerald-700">{doc.status}</span>
                          </div>
                        )}
                      </div>

                      <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed break-words" style={{ lineHeight: 1.6 }}>
                        {doc.meaning}
                      </p>
                    </div>

                    {/* Buttons: Full width on mobile, fixed width on desktop */}
                    <div className="flex flex-col gap-2.5 w-full md:w-auto md:min-w-[200px] flex-shrink-0">
                      <a
                        href={doc.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-600 bg-emerald-600 px-4 sm:px-5 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-emerald-700 hover:border-emerald-700 transition-colors shadow-sm"
                      >
                        <Download className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                        <span className="whitespace-nowrap">Resmi PDF İndir</span>
                      </a>
                      <a
                        href="#dogrulama"
                        className="min-h-[44px] w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
                      >
                        <HelpCircle className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
                        <span className="whitespace-nowrap">Nasıl doğrulanır?</span>
                      </a>
                    </div>
                  </div>

                  {/* Document Preview: Desktop only (shown after content) */}
                  <div className="hidden md:block mt-6">
                    <div className="relative w-full h-[280px] lg:h-[320px] rounded-2xl border-2 border-slate-200 bg-white overflow-hidden group">
                      <div className="relative w-full h-full">
                        <Image
                          src={doc.previewUrl}
                          alt={`${doc.title} önizleme görseli`}
                          fill
                          className="object-contain p-4"
                          sizes="(max-width: 768px) 100vw, 80vw"
                          quality={90}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                        <a
                          href={doc.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-900 rounded-lg text-sm font-semibold hover:bg-slate-100 transition-colors"
                        >
                          <FileText className="w-4 h-4" strokeWidth={1.5} />
                          PDF'yi Aç
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Business Identity Information */}
            <section className="mt-10 sm:mt-12 border-t border-slate-200 pt-6 sm:pt-8">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">Kurumsal Kimlik Bilgileri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" strokeWidth={1.5} />
                    <span>Adres</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed break-words">
                    Alemdağ Mah. Atabey Cad. No:19/E1A<br />
                    Çekmeköy, İstanbul 34797
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" strokeWidth={1.5} />
                    <span>Vergi Bilgileri</span>
                  </h3>
                  <div className="text-xs sm:text-sm text-slate-700 space-y-1.5">
                    <p className="break-words">
                      <span className="font-semibold">Vergi Dairesi:</span> Sarıgazi Vergi Dairesi
                    </p>
                    <p className="break-all">
                      <span className="font-semibold">Vergi No:</span>{' '}
                      <span className="font-mono">2070554381</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="dogrulama" className="mt-10 sm:mt-12 border-t border-slate-200 pt-6 sm:pt-8">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Doğrulama nasıl yapılır?</h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed break-words" style={{ lineHeight: 1.6 }}>
                Belge numaraları ve doğrulama bağlantıları paylaşıldığında, bu sayfadan ilgili kaynağa yönlendirilerek kontrol edilebilir.
                Paylaşılan bilgiler, kullanıcı güvenliği ve şeffaflık amaçlıdır.
              </p>
            </section>

            <aside
              role="note"
              aria-label="YMYL Notu"
              className="mt-8 sm:mt-10 border-t border-slate-200 pt-4 sm:pt-6 text-xs sm:text-sm text-slate-600 leading-relaxed break-words"
              style={{ lineHeight: 1.6 }}
            >
              Bu sayfa, doğrulanabilir kurumsal bilgi paylaşımı içindir. Tıbbi tanı veya tedavi amacı taşımaz; klinik kararlar hekimlere aittir.
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


