import Image from 'next/image';
import { Phone, MessageCircle, MapPin, Clock, Activity, CheckCircle2, AlertTriangle, ShieldCheck, Wind, HandHeart } from 'lucide-react';
import type { IntentMode } from '@/lib/intent/detector';
import { RELIABLE_PROCESS_LABEL, AUTHORIZED_MOBILE_TEAM_LABEL, TRANSPARENT_PRICING_LABEL, CLEAR_SCOPE_LABEL } from '@/lib/copy/truth-claims';

interface DynamicHeroProps {
  intent: IntentMode;
  district?: string;
}

// Helper function to get hero image with fallback
const getHeroImage = (imagePath?: string): string => {
  if (!imagePath || imagePath.length === 0) {
    return "/assets/hero-bg.png"; // Default fallback to existing image
  }
  // For now, use hero-bg.png as fallback since mode-specific images don't exist yet
  // TODO: Add mode-specific hero images when available
  return "/assets/hero-bg.png";
};

// Mode-specific hero images (fallback to hero-bg.png until images are added)
const heroImages = {
  CRITICAL_EMERGENCY: "/assets/hero-bg.png",
  TRUST_SEEKER: "/assets/hero-bg.png",
  PRICE_SENSITIVE: "/assets/hero-bg.png",
  COMMERCIAL_RENTAL: "/assets/hero-bg.png",
  INFORMATION_SEEKER: "/assets/hero-bg.png",
} as const;

export function DynamicHero({ intent, district = 'Istanbul' }: DynamicHeroProps) {

  // Intent-based configuration
  const configs = {
    CRITICAL_EMERGENCY: {
      title: `Oksijen cihazınızda sorun mu var?`,
      subtitle:
        'Acil teknik destek için iletişime geçin. 7/24 mesaj kabul ediyoruz; acil durumlar önceliklidir.',
      cta: "Hemen Ara",
      secondaryCta: "Konumumu Gönder",
      bgImage: getHeroImage(heroImages.CRITICAL_EMERGENCY),
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
        `ÜTS Kayıtlı ve CE mevzuatına uygun ürün tedariki ile medikal ekipmanlar için ${RELIABLE_PROCESS_LABEL.toLowerCase()}. İstanbul genelinde 2 ${AUTHORIZED_MOBILE_TEAM_LABEL.toLowerCase()}.`,
      cta: "Uzmanla Konuş",
      secondaryCta: "Nasıl Çalışıyoruz",
      bgImage: getHeroImage(heroImages.TRUST_SEEKER),
      bgOverlay: "bg-gradient-to-r from-blue-900/70 via-blue-800/60 to-transparent",
      titleColor: "text-white",
      subtitleColor: "text-blue-50",
      badge: {
        text: "ÜTS Kayıtlı & CE Mevzuatına Uygun",
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
      title: `Şeffaf kapsam, net fiyat`,
      subtitle:
        `${TRANSPARENT_PRICING_LABEL}, ${CLEAR_SCOPE_LABEL.toLowerCase()}. 450 TL'den başlayan fiyatlarla hizmetinizdeyiz.`,
      cta: "Fiyat Bilgisi Al",
      secondaryCta: "Detaylı Bilgi",
      bgImage: getHeroImage(heroImages.PRICE_SENSITIVE),
      bgOverlay: "bg-gradient-to-r from-amber-900/70 via-amber-800/60 to-transparent",
      titleColor: "text-white",
      subtitleColor: "text-amber-50",
      badge: {
        text: "450 TL'den başlayan fiyatlar",
        icon: Activity,
        bg: "bg-amber-500/20 backdrop-blur-sm border border-amber-400/50",
        textColor: "text-amber-100",
        iconColor: "text-amber-500",
        pulse: false
      },
      ctaBg: "bg-amber-600 hover:bg-amber-700",
      pulse: false
    },
    COMMERCIAL_RENTAL: {
      title: `${district} bölgesinde evde ekipman planlaması`,
      subtitle:
        'Planlı kiralama ve satış süreçleri. Sözleşme ve kurulum için iletişime geçin.',
      cta: "Uzmanla Konuş",
      secondaryCta: "Hizmetlerimiz",
      bgImage: getHeroImage(heroImages.COMMERCIAL_RENTAL),
      bgOverlay: "bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-transparent",
      titleColor: "text-white",
      subtitleColor: "text-slate-100",
      badge: {
        text: `${district} bölgesinde aktif hizmet`,
        icon: Activity,
        bg: "bg-slate-500/20 backdrop-blur-sm border border-slate-400/50",
        textColor: "text-slate-100",
        iconColor: "text-slate-400",
        pulse: false
      },
      ctaBg: "bg-slate-900 hover:bg-slate-800",
      pulse: false
    },
    INFORMATION_SEEKER: {
      title: `Evde kullanım ekipmanları hakkında`,
      subtitle:
        'Rehberler, kullanım kılavuzları ve teknik bilgiler. Öğrenmek istediğiniz her şey burada.',
      cta: "Uzmanla Konuş",
      secondaryCta: "Bilgi Al",
      bgImage: getHeroImage(heroImages.INFORMATION_SEEKER),
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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16 sm:pt-24 pb-0 group">
      {/* Background Image - LCP Optimization */}
      <div className="absolute inset-0 z-0">
        <Image
          src={config.bgImage}
          alt={
            intent === 'CRITICAL_EMERGENCY'
              ? 'Acil medikal ekipman desteği ve teknik servis - Eslamed İstanbul'
              : intent === 'TRUST_SEEKER'
              ? 'Evde medikal ekipman ve güvenli süreç yönlendirme merkezi - Eslamed'
              : intent === 'PRICE_SENSITIVE'
              ? 'Şeffaf kapsam ve net fiyatlı medikal ekipman desteği - Eslamed'
              : 'Profesyonel evde bakım ve medikal cihaz rehberliği - Eslamed İstanbul'
          }
          fill
          priority={true}
          loading="eager"
          fetchPriority="high"
          quality={90}
          className="object-cover object-center transition-all duration-700 group-hover:scale-105"
          sizes="100vw"
        />
        <div className={`absolute inset-0 ${config.bgOverlay}`} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/45" />
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
              ÜTS Kayıtlı | Yetkili Teknik Destek Merkezi
            </div>
          )}

          {/* Headline - Mode-specific H1 for SEO */}
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-display font-semibold leading-[1.2] ${config.titleColor} max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]`}>
            {intent === 'CRITICAL_EMERGENCY' 
              ? 'Acil Medikal Ekipman Desteği ve Teknik Servis'
              : intent === 'TRUST_SEEKER'
              ? 'Evde Medikal Ekipman ve Güvenli Süreç Yönlendirme Merkezi'
              : intent === 'PRICE_SENSITIVE'
              ? 'Şeffaf Kapsam ve Net Fiyatlı Medikal Ekipman Desteği'
              : 'Profesyonel Evde Bakım ve Medikal Cihaz Rehberliği'}
          </h1>

          {/* Subtitle */}
          <p className={`text-base sm:text-lg ${config.subtitleColor} leading-relaxed max-w-xl mt-4`} style={{ lineHeight: 1.8 }}>
            {config.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <a
              href="tel:+905372425535"
              className={`${config.ctaBg} text-white px-8 py-4 rounded-lg font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] ${config.pulse ? 'animate-pulse' : ''}`}
            >
              <Phone className="w-5 h-5" strokeWidth={1.5} />
              {config.cta}
            </a>
            <a
              href="https://wa.me/905372425535?text=Merhaba"
              className="bg-white/95 backdrop-blur-sm text-slate-900 border border-white/60 px-8 py-4 rounded-lg font-semibold text-base hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
              {config.secondaryCta}
            </a>
          </div>

          <p className="text-xs text-white/75 max-w-xl">
            Tüm süreçler medikal standartlara uygundur.
          </p>

          {/* Trust Indicators */}
          {intent === 'TRUST_SEEKER' && (
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-blue-100">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm">İstanbul genelinde 2 {AUTHORIZED_MOBILE_TEAM_LABEL.toLowerCase()} ile hızlı ve planlı operasyon süreci</span>
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
                  <ShieldCheck className="w-6 h-6 text-blue-300" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-white font-semibold leading-tight">Süreç & uygunluk odağı</div>
                  <div className="text-white/70 text-xs mt-1">Ev tipi cihaz kurulumu · teknik değerlendirme</div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/15">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-400"></span>
                </span>
                <span className="text-white/90 text-xs font-semibold">2 {AUTHORIZED_MOBILE_TEAM_LABEL}</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                  <Wind className="w-5 h-5 text-blue-300" strokeWidth={2} />
                </div>
                <div className="mt-3 text-white font-semibold text-sm">Solunum</div>
                <div className="mt-1 text-white/70 text-xs leading-relaxed">Kurulum ve kullanım süreci</div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-blue-300" strokeWidth={2} />
                </div>
                <div className="mt-3 text-white font-semibold text-sm">Ölçüm</div>
                <div className="mt-1 text-white/70 text-xs leading-relaxed">Cihaz seçimi ve teknik destek</div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                  <HandHeart className="w-5 h-5 text-blue-300" strokeWidth={2} />
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



