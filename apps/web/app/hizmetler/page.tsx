import type { Metadata } from 'next';
import { Wrench, Droplets, Recycle, ShoppingBag, BadgePercent, Clock, ShieldCheck, Truck, Users } from 'lucide-react';
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

      {/* Service Philosophy Introduction */}
      <section className="py-10">
        <div className="container-wide">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10">
            <div className="prose prose-lg max-w-none">
              <p className="text-[18px] text-slate-700 leading-relaxed" style={{ lineHeight: 1.8 }}>
                <span className="font-semibold text-slate-900">ESLAMED</span>, evde kullanım için medikal ekipman süreçlerinde{' '}
                <span className="font-semibold text-slate-900">uzmanlık</span>, <span className="font-semibold text-slate-900">hız</span> ve{' '}
                <span className="font-semibold text-slate-900">güven</span> odaklı bir yaklaşım sunar. Çekmeköy merkezli ekibimiz, İstanbul genelinde{' '}
                teknik destek, kurulum ve lojistik hizmetleri sağlar.
              </p>
              <p className="mt-4 text-[18px] text-slate-700 leading-relaxed" style={{ lineHeight: 1.8 }}>
                Tüm hizmetlerimiz, <span className="font-semibold text-slate-900">Sağlık Bakanlığı ÜTS kayıtlı</span> cihazlar ve{' '}
                <span className="font-semibold text-slate-900">CE uygunluk belgeleri</span> ile yürütülür. Tanı ve tedavi kararı hekimlere aittir;{' '}
                biz yalnızca teknik süreç ve donanım yönetimi alanında destek sağlarız.
              </p>
              <p className="mt-4 text-[18px] text-slate-700 leading-relaxed" style={{ lineHeight: 1.8 }}>
                İhtiyacınız olan hizmeti seçin, detaylı süreç bilgisi ve iletişim kanallarını inceleyin. Sorularınız için WhatsApp veya telefon{' '}
                hattımızdan 7/24 ulaşabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Neden Bizi Seçmelisiniz? */}
      <section className="py-10">
        <div className="container-wide">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Neden Bizi Seçmelisiniz?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">24 Saat Destek</h3>
                <p className="text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                  Acil teknik destek ihtiyacınızda WhatsApp ve telefon hattımız 7/24 aktif.
                </p>
              </div>
              <div className="flex flex-col items-start">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Orijinal Parça</h3>
                <p className="text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                  Tüm yedek parça ve sarf malzemeleri üretici onaylı, ÜTS kayıtlı ve CE belgeli.
                </p>
              </div>
              <div className="flex flex-col items-start">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6 text-amber-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">İstanbul İçi Teslimat</h3>
                <p className="text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                  Çekmeköy merkezli ekibimizle İstanbul genelinde yerinde kurulum ve eğitim.
                </p>
              </div>
              <div className="flex flex-col items-start">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Uzman Kadro</h3>
                <p className="text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                  15+ yıl deneyimli teknik ekibimiz, medikal cihazlarda uzmanlaşmış personel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards Grid */}
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


