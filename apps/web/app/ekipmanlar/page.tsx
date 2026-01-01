import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/sections/footer';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { CatalogExplorer } from '@/components/catalog/catalog-explorer';
import { CatalogSkeleton } from '@/components/catalog/skeleton';
import { CatalogSchemaGenerator } from '@/components/catalog/catalog-schema-generator';

export const metadata: Metadata = {
  title: 'Tüm Ekipmanlar | ESLAMED',
  description:
    'Evde kullanım için medikal ekipmanları kategori ve tek tık filtrelerle inceleyin. 50+ kullanıcılar için anlaşılır ve sakin katalog deneyimi.',
  alternates: { canonical: '/ekipmanlar' },
};

export default function EkipmanlarPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      {/* Dynamic JSON-LD schemas generated client-side */}
      <Suspense fallback={null}>
        <CatalogSchemaGenerator />
      </Suspense>

      <Navbar />

      <header className="pt-28 sm:pt-24">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { label: 'Ana Sayfa', href: '/' },
              { label: 'Tüm Ekipmanlar' },
            ]}
          />
          <h1 className="mt-6 text-3xl sm:text-4xl font-display font-semibold text-slate-900">
            Tüm Ekipmanlar
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
            Kategori seçin, tek tık filtre uygulayın. Sonuçlar sakin ve hızlı şekilde güncellenir.
          </p>
        </div>
      </header>

      <section className="py-10">
        <div className="container-wide">
          <Suspense fallback={<CatalogSkeleton />}>
            <CatalogExplorer />
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  );
}


