import Image from 'next/image';

export function HeroSection({ intent }: { intent: string }) {
    // Dynamic Text based on Intent
    const headlines = {
        URGENT_REPAIR: {
            title: "Oksijen Cihazınız Arıza mı Yaptı?",
            subtitle: "7/24 Acil Teknik Servis ekibimiz şu an bölgenizde.",
            cta: "Hemen Servis Çağır",
            color: "text-red-600"
        },
        RENTAL: {
            title: "İstanbul'un En Hızlı Oksijen Servisi",
            subtitle: "Habaş ve Philips marka cihazlar kapınıza teslim.",
            cta: "Hemen Kirala",
            color: "text-brand-primary"
        },
        SALES: {
            title: "Garantili 2. El ve Sıfır Cihazlar",
            subtitle: "Tüm bakımları yapılmış, faturalı ve garantili satış.",
            cta: "Fiyatları Gör",
            color: "text-emerald-600"
        }
    };

    const content = headlines[intent as keyof typeof headlines] || headlines.RENTAL;

    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
            {/* Background Image (Generated AI) */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/hero-bg.png"
                    alt="Medical Background"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-transparent" />
            </div>

            <div className="container-wide relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-6 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        İstanbul Geneli Aktif Servis
                    </div>

                    <h1 className={`text-5xl lg:text-7xl font-display font-bold leading-tight ${content.color}`}>
                        {content.title}
                    </h1>

                    <p className="text-xl text-slate-600 leading-relaxed font-medium">
                        {content.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition shadow-xl hover:shadow-2xl hover:-translate-y-1">
                            {content.cta}
                        </button>
                        <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition">
                            Whatsapp&apos;tan Yaz
                        </button>
                    </div>
                </div>

                {/* Right Placeholder (Product) */}
                <div className="hidden lg:block relative h-[600px] w-full">
                    {/* Placeholder Box - Will be replaced by Real Habaş Image */}
                    <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-slate-300 rounded-3xl bg-white/20 backdrop-blur-sm">
                        <p className="text-slate-400 font-bold text-center">
                            [ÜRÜN GÖRSELİ BURAYA GELECEK]<br />
                            (Habaş Tüp / Konsantratör PNG)
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
