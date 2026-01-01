import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/sections/footer';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { TLDRBox } from '@/components/legal/tldr-box';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | ESLAMED',
  description:
    'Eslamed gizlilik politikası: site kullanımı, analiz/telemetri, çerez yaklaşımı ve iletişim kanallarında veri paylaşımı.',
  alternates: { canonical: '/gizlilik' },
};

export default function GizlilikPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <Navbar />

      <header className="pt-28 sm:pt-24">
        <div className="container-wide">
          <Breadcrumbs items={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Kurumsal' }, { label: 'Gizlilik' }]} />
          <h1 className="mt-6 text-3xl sm:text-4xl font-display font-semibold text-slate-900">
            Gizlilik Politikası
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
            Bu sayfa, web sitesi kullanımı ve iletişim kanallarında paylaşılan bilgiler için gizlilik yaklaşımımızı açıklar.
          </p>
        </div>
      </header>

      <section className="py-10">
        <div className="container-wide space-y-8">
          <TLDRBox title="TL;DR (Özet)">
            - Site ölçümleri, yalnızca stabilite ve hata tespiti için sınırlı şekilde tutulur.
            <br />- WhatsApp/telefon üzerinden tıbbi içerikli kişisel verileri paylaşmamanızı öneririz.
            <br />- Her zaman “en az veri” yaklaşımını hedefleriz.
          </TLDRBox>

          <section className="rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-xl font-semibold text-slate-900">1) Hangi bilgiler işlenebilir?</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700" style={{ lineHeight: 1.8 }}>
              <li>- Site kullanımına dair sınırlı teknik veriler (sayfa görüntülenmesi, hata kayıtları)</li>
              <li>- Arama terimleri (anonim/ölçülü telemetri; kişisel bilgi amaçlı değildir)</li>
              <li>- İletişim üzerinden ilettiğiniz mesaj içeriği</li>
            </ul>

            <h2 className="mt-8 text-xl font-semibold text-slate-900">2) Çerez yaklaşımı</h2>
            <p className="mt-3 text-sm text-slate-700" style={{ lineHeight: 1.8 }}>
              Zorunlu teknik ihtiyaçlar dışında, takip amaçlı agresif çerez yaklaşımı hedeflenmez. (Uygulama kapsamı ileride güncellenebilir.)
            </p>

            <h2 className="mt-8 text-xl font-semibold text-slate-900">3) Üçüncü taraflar</h2>
            <p className="mt-3 text-sm text-slate-700" style={{ lineHeight: 1.8 }}>
              WhatsApp gibi iletişim kanalları üçüncü taraf hizmetlerdir. Bu kanallarda paylaştığınız veriler, ilgili hizmetlerin politikalarına tabi olabilir.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-slate-900">4) İletişim</h2>
            <p className="mt-3 text-sm text-slate-700" style={{ lineHeight: 1.8 }}>
              Gizlilikle ilgili sorularınız için: +90 537 242 55 35.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}



