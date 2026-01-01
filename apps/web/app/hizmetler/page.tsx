import type { Metadata } from 'next';
import { Wrench, Droplets, Recycle, ShoppingBag, BadgePercent } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/sections/footer';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { ServiceCard } from '@/components/services/service-card';

export const metadata: Metadata = {
  title: 'Hizmetler | ESLAMED',
  description:
    'Teknik servis, oksijen dolum süreçleri, cihaz kiralama, cihaz satışı ve 2. el alım hizmetleri. Tanı/tedavi değil; lojistik ve teknik otorite.',
  alternates: { canonical: '/hizmetler' },
};

const COLORS = {
  red: '#EF4444',
  blue: '#2563EB',
  green: '#10B981',
  purple: '#7C3AED',
  orange: '#F97316',
};

export default function HizmetlerHubPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <Navbar />

      <header className="pt-28 sm:pt-24">
        <div className="container-wide">
          <Breadcrumbs items={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Hizmetler' }]} />
          <h1 className="mt-6 text-3xl sm:text-4xl font-display font-semibold text-slate-900">
            Hizmetler
          </h1>
          <p className="mt-3 text-[18px] text-slate-600" style={{ lineHeight: 1.8 }}>
            Buradaki içerik, teknik süreç ve lojistik yönetim içindir. Tanı koyma veya tedavi kararı yerine geçmez.
          </p>
        </div>
      </header>

      <section className="py-10">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              title="Teknik Servis"
              desc="Ön değerlendirme, arıza türü ayrımı ve cihaz ömrünü uzatan planlı bakım yaklaşımı."
              href="/hizmetler/teknik-servis"
              color={COLORS.blue}
              icon={<Wrench className="w-6 h-6" strokeWidth={1.5} style={{ color: COLORS.blue }} />}
            />
            <ServiceCard
              title="Oksijen Dolum"
              desc="Tüp güvenlik kontrolü (test tarihi, valf, sızdırmazlık) ve İstanbul içi planlı hızlı temin."
              href="/hizmetler/oksijen-dolum"
              color={COLORS.red}
              icon={<Droplets className="w-6 h-6" strokeWidth={1.5} style={{ color: COLORS.red }} />}
            />
            <ServiceCard
              title="Cihaz Kiralama"
              desc="Hijyen protokolleri, sterilizasyon kontrol listesi ve ihtiyaca göre esnek süre/koşul planlama."
              href="/hizmetler/cihaz-kiralama"
              color={COLORS.green}
              icon={<Recycle className="w-6 h-6" strokeWidth={1.5} style={{ color: COLORS.green }} />}
            />
            <ServiceCard
              title="Cihaz Satışı"
              desc="İhtiyaca göre eşleştirme yaklaşımı. Kataloğa yönlendirme ve teknik kullanım uyumu kontrolü."
              href="/hizmetler/cihaz-satisi"
              color={COLORS.purple}
              icon={<ShoppingBag className="w-6 h-6" strokeWidth={1.5} style={{ color: COLORS.purple }} />}
            />
            <ServiceCard
              title="2. El Alım"
              desc="Model doğrulama, teknik değerleme, yenileme planı ve şeffaf fiyatlandırma yaklaşımı."
              href="/hizmetler/ikinci-el-alim"
              color={COLORS.orange}
              icon={<BadgePercent className="w-6 h-6" strokeWidth={1.5} style={{ color: COLORS.orange }} />}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


