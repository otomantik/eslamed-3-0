import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/sections/footer';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { TLDRBox } from '@/components/legal/tldr-box';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | ESLAMED',
  description:
    'KVKK kapsamında kişisel verilerin işlenmesine dair aydınlatma metni (özet + detay).',
  alternates: { canonical: '/kvkk' },
};

export default function KvkkPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <Navbar />

      <header className="pt-28 sm:pt-24">
        <div className="container-wide">
          <Breadcrumbs items={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Kurumsal' }, { label: 'KVKK' }]} />
          <h1 className="mt-6 text-3xl sm:text-4xl font-display font-semibold text-slate-900">
            KVKK Aydınlatma Metni
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
            Bu sayfa, KVKK kapsamında kişisel verilerin işlenmesine ilişkin genel bilgilendirme sunar.
          </p>
        </div>
      </header>

      <section className="py-10">
        <div className="container-wide space-y-8">
          <TLDRBox>
            - Verileri, yalnızca hizmetin yürütülmesi ve iletişim amaçlarıyla sınırlı şekilde işleriz.
            <br />- Tıbbi tanı/tedavi verilerinizi bu kanallar üzerinden paylaşmamanızı öneririz.
            <br />- Talep ve haklarınız için WhatsApp/telefon üzerinden bize ulaşabilirsiniz.
          </TLDRBox>

          <section className="rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-xl font-semibold text-slate-900">1) Veri sorumlusu</h2>
            <p className="mt-3 text-sm text-slate-700" style={{ lineHeight: 1.8 }}>
              Veri sorumlusu: ESLAMED (Çekmeköy/İstanbul). İletişim: +90 537 242 55 35.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-slate-900">2) İşlenen veri kategorileri</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700" style={{ lineHeight: 1.8 }}>
              <li>- İletişim bilgileri (telefon, mesaj içeriği)</li>
              <li>- Hizmet talebi ve planlama bilgileri (ilçe, randevu zamanı)</li>
              <li>- Teknik servis sürecine ilişkin kayıtlar (cihaz türü, arıza/kurulum notları)</li>
            </ul>

            <h2 className="mt-8 text-xl font-semibold text-slate-900">3) Amaç ve hukuki sebepler</h2>
            <p className="mt-3 text-sm text-slate-700" style={{ lineHeight: 1.8 }}>
              Veriler; iletişim kurulması, hizmet planlaması, teknik destek süreçlerinin yürütülmesi ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenebilir.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-slate-900">4) Saklama ve güvenlik</h2>
            <p className="mt-3 text-sm text-slate-700" style={{ lineHeight: 1.8 }}>
              Veriler, gerekli olan süre ile sınırlı tutulur. Erişim yetkileri, operasyonel ihtiyaçla sınırlı olacak şekilde düzenlenir.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-slate-900">5) Haklarınız</h2>
            <p className="mt-3 text-sm text-slate-700" style={{ lineHeight: 1.8 }}>
              KVKK kapsamında; bilgi talep etme, düzeltme, silme ve itiraz haklarınız bulunur. Talebinizi iletişim kanallarımız üzerinden iletebilirsiniz.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}


