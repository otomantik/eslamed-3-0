import Image from 'next/image';
import { Phone, MessageCircle, MapPin, Clock, Activity, CheckCircle2, AlertTriangle, ShieldCheck, Wind, HandHeart } from 'lucide-react';
import type { IntentMode } from '@/lib/intent/detector';

interface DynamicHeroProps {
  intent: IntentMode;
  district?: string;
}

export function DynamicHero({ intent, district = 'Istanbul' }: DynamicHeroProps) {
  // Intent-based configuration
  const configs = {
    CRITICAL_EMERGENCY: {
      title: `Oksijen cihazınızda sorun mu var?`,
      subtitle:
        'Hekiminizin belirlediği tedavi planına uygun teknik cihazların seçimi ve kurulum süreçlerinde rehberlik sunuyoruz. Tüm süreç, cihazların teknik spesifikasyonları ve kullanım güvenliği sınırları içinde kalır.',
      cta: "Uzmanla Konuş",
      secondaryCta: "Konumumu Gönder",
      bgImage: "/assets/hero-bg.png",
      bgOverlay: "bg-gradient-to-r from-red-900/80 via-red-800/70 to-transparent",
      titleColor: "text-white",
      subtitleColor: "text-red-50",
      badge: {
        text: `${district} bölgesinde hizmetinizdeyiz`,
        icon: AlertTriangle,
        bg: "bg-red-500/20 backdrop-blur-sm border border-red-400/50",
        textColor: "text-red-100",
        iconColor: "text-red-500",
        pulse: true
      },
      ctaBg: "bg-red-600 hover:bg-red-700",
      pulse: true
    },
    TRUST_SEEKER: {
      title: `Evde medikal ekipman yönlendirme`,
      subtitle:
        'Hekiminizin belirlediği tedavi planına uygun teknik cihazların seçimi ve kurulum süreçlerinde rehberlik sunuyoruz. Tüm süreç, cihazların teknik spesifikasyonları ve kullanım güvenliği sınırları içinde kalır.',
      cta: "Uzmanla Konuş",
      secondaryCta: "Nasıl Çalışıyoruz",
      bgImage: "/assets/hero-bg.png",
      bgOverlay: "bg-gradient-to-r from-emerald-900/70 via-emerald-800/60 to-transparent",
      titleColor: "text-white",
      subtitleColor: "text-emerald-50",
      badge: {
        text: "ÜTS Kayıtlı & CE Belgeli Medikal Ekipman",
        icon: CheckCircle2,
        bg: "bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/50",
        textColor: "text-emerald-100",
        iconColor: "text-emerald-500",
        pulse: false
      },
      ctaBg: "bg-emerald-600 hover:bg-emerald-700",
      pulse: false
    },
    PRICE_SENSITIVE: {
      title: `Şeffaf kapsam, net süreç`,
      subtitle:
        'Hekiminizin belirlediği tedavi planına uygun teknik cihazların seçimi ve kurulum süreçlerinde rehberlik sunuyoruz. Tüm süreç, cihazların teknik spesifikasyonları ve kullanım güvenliği sınırları içinde kalır.',
      cta: "Fiyat Bilgisi Al",
      secondaryCta: "Detaylı Bilgi",
      bgImage: "/assets/hero-bg.png",
      bgOverlay: "bg-gradient-to-r from-emerald-900/70 via-emerald-800/60 to-transparent",
      titleColor: "text-white",
      subtitleColor: "text-emerald-50",
      badge: {
        text: "450 TL'den başlayan fiyatlar",
        icon: Activity,
        bg: "bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/50",
        textColor: "text-emerald-100",
        iconColor: "text-emerald-500",
        pulse: false
      },
      ctaBg: "bg-emerald-600 hover:bg-emerald-700",
      pulse: false
    },
    COMMERCIAL_RENTAL: {
      title: `${district} bölgesinde evde ekipman planlaması`,
      subtitle:
        'Hekiminizin belirlediği tedavi planına uygun teknik cihazların seçimi ve kurulum süreçlerinde rehberlik sunuyoruz. Tüm süreç, cihazların teknik spesifikasyonları ve kullanım güvenliği sınırları içinde kalır.',
      cta: "Uzmanla Konuş",
      secondaryCta: "Hizmetlerimiz",
      bgImage: "/assets/hero-bg.png",
      bgOverlay: "bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-transparent",
      titleColor: "text-white",
      subtitleColor: "text-slate-100",
      badge: {
        text: `${district} bölgesinde aktif hizmet`,
        icon: Activity,
        bg: "bg-blue-500/20 backdrop-blur-sm border border-blue-400/50",
        textColor: "text-blue-100",
        iconColor: "text-blue-500",
        pulse: false
      },
      ctaBg: "bg-slate-900 hover:bg-slate-800",
      pulse: false
    },
    INFORMATION_SEEKER: {
      title: `Evde kullanım ekipmanları hakkında`,
      subtitle:
        'Hekiminizin belirlediği tedavi planına uygun teknik cihazların seçimi ve kurulum süreçlerinde rehberlik sunuyoruz. Tüm süreç, cihazların teknik spesifikasyonları ve kullanım güvenliği sınırları içinde kalır.',
      cta: "Uzmanla Konuş",
      secondaryCta: "Bilgi Al",
      bgImage: "/assets/hero-bg.png",
      bgOverlay: "bg-gradient-to-r from-slate-800/70 via-slate-700/60 to-transparent",
      titleColor: "text-white",
      subtitleColor: "text-slate-100",
      badge: {
        text: "Süreç yönlendirmesi",
        icon: CheckCircle2,
        bg: "bg-slate-500/20 backdrop-blur-sm border border-slate-400/50",
        textColor: "text-slate-100",
        iconColor: "text-slate-400",
        pulse: false
      },
      ctaBg: "bg-slate-700 hover:bg-slate-600",
      pulse: false
    }
  };

  const config = configs[intent];
  const BadgeIcon = config.badge.icon;
  const showComplianceBar = intent === 'TRUST_SEEKER' || intent === 'INFORMATION_SEEKER';

  return (
    <section className={`relative min-h-[90vh] flex items-center overflow-hidden ${intent === 'CRITICAL_EMERGENCY' ? 'pt-32' : 'pt-24 sm:pt-20'}`}>
      {/* Background Image - LCP Optimization */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero-bg.png"
          alt="Eslamed Hero Background"
          fill
          priority={true}
          loading="eager"
          fetchPriority="high"
          quality={100}
          className="object-cover object-center transition-opacity duration-700"
          sizes="100vw"
        />
        <div className={`absolute inset-0 ${config.bgOverlay}`} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
        {/* Left Content */}
        <div className="space-y-6 max-w-2xl">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.badge.bg} ${config.badge.textColor} text-sm font-semibold backdrop-blur-md`}>
            <BadgeIcon 
              className={`w-4 h-4 ${config.badge.iconColor} ${config.badge.pulse ? 'animate-pulse' : ''}`} 
              strokeWidth={1.5} 
            />
            {config.badge.text}
          </div>

          {/* Compliance Bar (quiet, authority signal) */}
          {showComplianceBar && (
            <div className="text-xs text-white/80 bg-white/10 border border-white/15 rounded-lg px-3 py-2 backdrop-blur-sm max-w-xl">
              T.C. Sağlık Bakanlığı ÜTS Kayıtlı | Yetkili Teknik Destek Merkezi
            </div>
          )}

          {/* Headline */}
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-display font-semibold leading-[1.2] ${config.titleColor} max-w-xl`}>
            {config.title}
          </h1>

          {/* Subtitle */}
          <p className={`text-base sm:text-lg ${config.subtitleColor} leading-relaxed max-w-xl mt-4`}>
            {config.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <a
              href="tel:+905372425535"
              className={`${config.ctaBg} text-white px-8 py-4 rounded-lg font-semibold text-base transition-colors flex items-center justify-center gap-2 ${config.pulse ? 'animate-pulse' : ''}`}
            >
              <Phone className="w-5 h-5" strokeWidth={1.5} />
              {config.cta}
            </a>
            <a
              href="https://wa.me/905372425535?text=Merhaba"
              className="bg-white/90 backdrop-blur-sm text-slate-900 border border-white/50 px-8 py-4 rounded-lg font-semibold text-base hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
              {config.secondaryCta}
            </a>
          </div>

          <p className="text-xs text-white/75 max-w-xl">
            Kiralama ve satış süreçlerimiz medikal standartlara uygundur.
          </p>

          {/* Trust Indicators */}
          {intent === 'TRUST_SEEKER' && (
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-blue-100">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm">İstanbul genelinde 2 tam yetkili mobil ekip ile hızlı ve planlı operasyon süreci</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <MapPin className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm">{district} bölgesi</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Product/Visual */}
        <div className="hidden lg:block relative h-[600px] w-full">
          <div className="absolute inset-0 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md p-8">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white/90" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-white font-semibold leading-tight">Süreç & uygunluk odağı</div>
                  <div className="text-white/70 text-xs mt-1">Ev tipi cihaz kurulumu · teknik değerlendirme</div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/15">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
                <span className="text-white/90 text-xs font-semibold">2 Tam Yetkili Mobil Ekip</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                  <Wind className="w-5 h-5 text-white/90" strokeWidth={1.5} />
                </div>
                <div className="mt-3 text-white font-semibold text-sm">Solunum</div>
                <div className="mt-1 text-white/70 text-xs leading-relaxed">Kurulum ve kullanım süreci</div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white/90" strokeWidth={1.5} />
                </div>
                <div className="mt-3 text-white font-semibold text-sm">Ölçüm</div>
                <div className="mt-1 text-white/70 text-xs leading-relaxed">Cihaz seçimi ve teknik destek</div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                  <HandHeart className="w-5 h-5 text-white/90" strokeWidth={1.5} />
                </div>
                <div className="mt-3 text-white font-semibold text-sm">Bakım</div>
                <div className="mt-1 text-white/70 text-xs leading-relaxed">Uygunluk ve süreç yönetimi</div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-4">
              <div className="text-white/90 text-sm font-semibold">İstanbul genelinde kapsama</div>
              <div className="mt-1 text-white/70 text-xs leading-relaxed">
                İlçe bazlı planlama; cihaz tipi, kullanım koşulu ve hekim önerisi doğrultusunda netleştirilir.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



