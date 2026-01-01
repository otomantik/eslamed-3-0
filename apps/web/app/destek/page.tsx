import type { Metadata } from 'next';
import { PhoneCall, Wrench, Home, Clock } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/sections/footer';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { BoundaryCard } from '@/components/support/boundary-card';
import { QuickActionCard } from '@/components/rehber/quick-action-card';

export const metadata: Metadata = {
  title: 'Destek & Sınırlar | ESLAMED',
  description:
    'Teknik destek kapsamı, hizmet saatleri ve yerinde ziyaret protokolleri. YMYL sınırları net, sakin ve anlaşılır.',
  alternates: { canonical: '/destek' },
};

export default function DestekPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <Navbar />

      <header className="pt-28 sm:pt-24">
        <div className="container-wide">
          <Breadcrumbs items={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Destek' }]} />
          <h1 className="mt-6 text-3xl sm:text-4xl font-display font-semibold text-slate-900">
            Destek & Sınırlar
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
            Buradaki bilgiler teknik kullanım güvenliği ve süreç yönlendirmesi içindir. Tıbbi tanı/tedavi yerine geçmez.
          </p>
        </div>
      </header>

      <section className="py-10">
        <div className="container-wide space-y-8">
          <BoundaryCard />

          <QuickActionCard
            variant="warning"
            title="Acil Teknik Destek (24/7 mesaj alımı)"
            icon={<PhoneCall className="w-5 h-5 text-amber-800" strokeWidth={1.5} />}
          >
            Cihazınız alarm veriyorsa, çalışmıyorsa veya elektrik kesintisi gibi bir risk oluştuysa WhatsApp üzerinden mesaj bırakabilirsiniz.
            <br />
            <span className="font-semibold text-amber-950">Tıbbi acil durumda</span> (şiddetli nefes darlığı, göğüs ağrısı, bilinç değişikliği) <span className="font-semibold text-amber-950">112</span>.
          </QuickActionCard>

          <section className="rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Hizmet Saatleri</h2>
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <article className="rounded-2xl border border-slate-200 bg-slate-50/50 p-7">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Clock className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Planlı saha ziyareti</h3>
                    <p className="mt-2 text-sm text-slate-600" style={{ lineHeight: 1.8 }}>
                      <time dateTime="09:00">09:00</time> – <time dateTime="20:00">20:00</time> arası planlanır (ilçe ve yoğunluğa göre değişebilir).
                    </p>
                    <p className="mt-2 text-sm text-slate-600" style={{ lineHeight: 1.8 }}>
                      Net saat, iletişim sırasında randevu olarak teyit edilir.
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-slate-50/50 p-7">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Wrench className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Acil teknik yönlendirme</h3>
                    <p className="mt-2 text-sm text-slate-600" style={{ lineHeight: 1.8 }}>
                      WhatsApp üzerinden günün her saati mesaj bırakabilirsiniz. Dönüş ve yönlendirme, teknik önceliklendirme ve saha durumuna göre yapılır.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Ev Ziyareti Protokolü</h2>
            <p className="mt-3 text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
              50+ kullanıcılar için “ne olacağını bilmek” önemlidir. Yerinde süreç, aşağıdaki adımlarla ilerler.
            </p>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <article className="rounded-2xl border border-slate-200 bg-slate-50/50 p-7">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Home className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">1) Giriş ve güvenlik</h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700" style={{ lineHeight: 1.8 }}>
                      <li>- Randevu saatinde geliriz; gecikme olursa haber veririz.</li>
                      <li>- Cihaz ve kullanım alanı görülür; güvenli konumlandırma için uygun yer belirlenir.</li>
                    </ul>
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-slate-50/50 p-7">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Wrench className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">2) Kurulum ve kontrol</h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700" style={{ lineHeight: 1.8 }}>
                      <li>- Cihazın teknik bağlantıları yapılır ve temel fonksiyon kontrolü uygulanır.</li>
                      <li>- Alarm/hata için kısa bir kontrol listesi birlikte paylaşılır.</li>
                    </ul>
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-slate-50/50 p-7">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <PhoneCall className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">3) Kullanıcı eğitimi</h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700" style={{ lineHeight: 1.8 }}>
                      <li>- Hasta yakınına sakin ve tekrar edilebilir adımlar verilir.</li>
                      <li>- Hekiminizin önerdiği planın dışına çıkmadan, teknik kullanım sınırları anlatılır.</li>
                    </ul>
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-slate-50/50 p-7">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Clock className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">4) Devam planı</h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700" style={{ lineHeight: 1.8 }}>
                      <li>- Gerekli sarf/aksesuar bilgisi netleştirilir.</li>
                      <li>- İhtiyaç olursa kontrol tarihi ve iletişim kanalı belirlenir.</li>
                    </ul>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}



