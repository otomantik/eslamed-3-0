import Image from 'next/image';
import { Phone, MessageCircle, MapPin, Clock, Activity, CheckCircle2, AlertTriangle } from 'lucide-react';
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
      subtitle: `Acil teknik servis ekibimiz ${district} bölgesinde. Size yardımcı olmak için buradayız.`,
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
      title: `Güvenilir medikal çözümler`,
      subtitle: `${district} bölgesinde yüzlerce aileye hizmet veriyoruz. Sağlık Bakanlığı onaylı, steril teslimat.`,
      cta: "Uzmanla Konuş",
      secondaryCta: "Nasıl Çalışıyoruz",
      bgImage: "/assets/hero-bg.png",
      bgOverlay: "bg-gradient-to-r from-blue-900/70 via-blue-800/60 to-transparent",
      titleColor: "text-white",
      subtitleColor: "text-blue-50",
      badge: {
        text: "Sağlık Bakanlığı onaylı",
        icon: CheckCircle2,
        bg: "bg-blue-500/20 backdrop-blur-sm border border-blue-400/50",
        textColor: "text-blue-100",
        iconColor: "text-blue-500",
        pulse: false
      },
      ctaBg: "bg-blue-600 hover:bg-blue-700",
      pulse: false
    },
    PRICE_SENSITIVE: {
      title: `Şeffaf fiyatlandırma`,
      subtitle: `Oksijen cihazı kiralama ve dolum hizmetlerinde net fiyatlar. Gizli ücret yok.`,
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
      title: `${district} bölgesinde oksijen çözümleri`,
      subtitle: `Habaş ve Philips marka cihazlar. Kapınıza teslim, profesyonel kurulum ve sürekli destek.`,
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
      title: `Oksijen cihazları hakkında`,
      subtitle: `Uzman ekibimizden ücretsiz danışmanlık alabilirsiniz. Size en uygun çözümü birlikte bulalım.`,
      cta: "Uzmanla Konuş",
      secondaryCta: "Bilgi Al",
      bgImage: "/assets/hero-bg.png",
      bgOverlay: "bg-gradient-to-r from-slate-800/70 via-slate-700/60 to-transparent",
      titleColor: "text-white",
      subtitleColor: "text-slate-100",
      badge: {
        text: "Ücretsiz danışmanlık",
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

  return (
    <section className={`relative min-h-[90vh] flex items-center overflow-hidden ${intent === 'CRITICAL_EMERGENCY' ? 'pt-32' : 'pt-24 sm:pt-20'}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={config.bgImage}
          alt="Medical Background"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
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
              href="tel:05555555555"
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

          {/* Trust Indicators */}
          {intent === 'TRUST_SEEKER' && (
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-blue-100">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm">30-45 dk teslimat</span>
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
          <div className="absolute inset-0 flex items-center justify-center border-2 border-white/20 rounded-3xl bg-white/10 backdrop-blur-md">
            <p className="text-white/60 font-bold text-center text-lg">
              [ÜRÜN GÖRSELİ]<br />
              <span className="text-sm">(Habaş Tüp / Konsantratör)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}



