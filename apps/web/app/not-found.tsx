import Link from 'next/link';
import Image from 'next/image';
import { Home, LifeBuoy, LayoutGrid } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/sections/footer';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <Navbar />

      <section className="pt-28 sm:pt-24 pb-12">
        <div className="container-wide">
          <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h1 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900">
                  Aradığınız yol kapalı olabilir, ancak sizi doğru yere yönlendirebiliriz.
                </h1>
                <p className="mt-4 text-base text-slate-600" style={{ lineHeight: 1.8 }}>
                  Bazı sayfalar henüz açılmamış olabilir. Aşağıdaki “portal” seçeneklerinden devam edebilirsiniz.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Link
                    href="/"
                    className="min-h-[56px] inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 text-white px-5 text-base font-semibold hover:bg-slate-800 transition-colors"
                  >
                    <Home className="w-5 h-5" strokeWidth={1.5} />
                    Ana Sayfa
                  </Link>
                  <Link
                    href="/ekipmanlar"
                    className="min-h-[56px] inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-base font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    <LayoutGrid className="w-5 h-5" strokeWidth={1.5} />
                    Katalog
                  </Link>
                  <a
                    href={`https://wa.me/905372425535?text=${encodeURIComponent('Merhaba, site içinde aradığım sayfayı bulamadım. Yardım alabilir miyim?')}`}
                    className="min-h-[56px] inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-white px-5 text-base font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    <LifeBuoy className="w-5 h-5" strokeWidth={1.5} />
                    Hızlı Destek
                  </a>
                </div>
              </div>

              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[520px] bg-blue-50/40">
                <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-semibold">
                  [İllüstrasyon Yer Tutucu]
                </div>
                <Image
                  src="/assets/hero-bg.png"
                  alt="Sakin bir yönlendirme ekranı için görsel yer tutucu"
                  fill
                  className="object-cover opacity-10"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


