import type { Metadata } from 'next';
import { CheckCircle2, HelpCircle } from 'lucide-react';
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
  placeholder: string;
};

const licenses: LicenseItem[] = [
  {
    title: 'Tıbbi Cihaz Satış Merkezi Yetki Belgesi',
    regNo: 'XXX-XXXX-XXX',
    meaning:
      'Tıbbi cihaz satış süreçlerinin mevzuata uygun şekilde yürütüldüğünü ve denetlenebilir bir yetkilendirme çerçevesi içinde hizmet verildiğini gösterir.',
    placeholder: '[PLACEHOLDER: Tıbbi Cihaz Satış Merkezi Yetki Belgesi Görseli]',
  },
  {
    title: 'ÜTS Kayıt Belgesi / Ekran Görüntüsü',
    regNo: 'XXX-XXXX-XXX',
    meaning:
      'Cihazların ve kayıtların Ürün Takip Sistemi (ÜTS) üzerinden izlenebilirliği için temel doğrulama alanıdır. Doğrulama bilgileri eklendiğinde bu sayfa üzerinden kontrol edilebilir.',
    placeholder: '[PLACEHOLDER: ÜTS Kayıt Belgesi / Ekran Görüntüsü]',
  },
  {
    title: 'İş Yeri Açma ve Çalışma Ruhsatı',
    regNo: 'XXX-XXXX-XXX',
    meaning:
      'İş yerinin yasal faaliyet iznine sahip olduğunu ve kayıtlı/denetlenebilir bir çerçevede çalıştığını gösterir.',
    placeholder: '[PLACEHOLDER: İş Yeri Açma ve Çalışma Ruhsatı]',
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

  // Credentials schema (placeholders; no ratings/reviews/GBP)
  const jsonLd = {
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
      addressCountry: 'TR',
    },
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
            <h1 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900 leading-tight">
              Kurumsal Yetkinlik ve Belgelerimiz
            </h1>
            <p className="mt-4 text-base text-slate-600 leading-relaxed" style={{ lineHeight: 1.6 }}>
              Eslamed olarak sunduğumuz tüm hizmetler ve cihazlar, T.C. Sağlık Bakanlığı standartlarına ve yasal mevzuatlara tam uyumludur.
            </p>

            <div className="mt-10 space-y-8">
              {licenses.map((doc) => (
                <article
                  key={doc.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 lg:p-8"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
                        <h2 className="text-xl font-semibold text-slate-900">{doc.title}</h2>
                      </div>

                      <div className="mt-2 text-sm text-slate-700">
                        <span className="font-semibold">Kayıt / Belge No:</span>{' '}
                        <span className="font-mono">{doc.regNo}</span>
                      </div>

                      <p className="mt-3 text-sm text-slate-600 leading-relaxed" style={{ lineHeight: 1.6 }}>
                        {doc.meaning}
                      </p>
                    </div>

                    <a
                      href="#dogrulama"
                      className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
                    >
                      <HelpCircle className="w-4 h-4" strokeWidth={1.5} />
                      Nasıl doğrulanır?
                    </a>
                  </div>

                  <div className="mt-6">
                    <div className="h-[220px] sm:h-[260px] rounded-2xl border border-slate-200 bg-slate-200/60 flex items-center justify-center text-slate-600 text-sm font-semibold text-center px-6">
                      Belge Görseli Gelecek
                      <div className="mt-2 text-xs text-slate-500 font-normal">
                        {doc.placeholder}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <section id="dogrulama" className="mt-12 border-t border-slate-200 pt-8">
              <h2 className="text-xl font-semibold text-slate-900">Doğrulama nasıl yapılır?</h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed" style={{ lineHeight: 1.6 }}>
                Belge numaraları ve doğrulama bağlantıları paylaşıldığında, bu sayfadan ilgili kaynağa yönlendirilerek kontrol edilebilir.
                Paylaşılan bilgiler, kullanıcı güvenliği ve şeffaflık amaçlıdır.
              </p>
            </section>

            <aside
              role="note"
              aria-label="YMYL Notu"
              className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600 leading-relaxed"
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


