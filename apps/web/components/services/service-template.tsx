import type { ReactNode } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/sections/footer';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';

export function ServiceTemplate({
  breadcrumbs,
  title,
  subtitle,
  accentHex,
  children,
  serviceSchema,
}: {
  breadcrumbs: Array<{ label: string; href?: string }>;
  title: string;
  subtitle: string;
  accentHex: string;
  children: ReactNode;
  serviceSchema: unknown;
}) {
  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <Navbar />

      <header className="pt-28 sm:pt-24">
        <div className="container-wide">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
            <div
              className="h-1.5 w-20 rounded-full"
              style={{ backgroundColor: accentHex }}
              aria-hidden="true"
            />
            <h1 className="mt-5 text-3xl sm:text-4xl font-display font-semibold text-slate-900">
              {title}
            </h1>
            <p className="mt-3 text-[18px] text-slate-600" style={{ lineHeight: 1.8 }}>
              {subtitle}
            </p>
          </div>
        </div>
      </header>

      <section className="py-10">
        <div className="container-wide space-y-8">{children}</div>
      </section>

      <Footer />
    </main>
  );
}




