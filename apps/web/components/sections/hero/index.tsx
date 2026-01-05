'use client';

import Image from 'next/image';
import { Phone, MessageCircle, Clock, Activity, CheckCircle2, AlertTriangle, ShieldCheck, Wind, HandHeart } from 'lucide-react';
import type { IntentMode } from '@/lib/intent/detector';
import { RELIABLE_PROCESS_LABEL, AUTHORIZED_MOBILE_TEAM_LABEL, TRANSPARENT_PRICING_LABEL, CLEAR_SCOPE_LABEL } from '@/lib/copy/truth-claims';
import { REALITY_ANCHORS } from '@/lib/integrity/reality-anchors';
import { getPhoneLink, getWhatsAppBaseUrl } from '@/lib/constants/contact-info';

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

export function DynamicHero({ intent, district = 'İstanbul' }: DynamicHeroProps) {

  // Intent-based configuration
  const configs = {
    CRITICAL_EMERGENCY: {
      title: `Oksijen cihazınızda sorun mu var?`,
      subtitle:
        'Acil teknik destek için iletişime geçin. 7/24 mesaj kabul ediyoruz; acil durumlar önceliklidir.',
      cta: "Hemen Ara",
      secondaryCta: "Konumumu Gönder",
      bgImage: getHeroImage(heroImages.CRITICAL_EMERGENCY),
      bgOverlay: "bg-linear-to-r from-red-900/80 via-red-800/70 to-transparent",
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
      secondaryCta: "WhatsApp Bilgi Hattı",
      bgImage: getHeroImage(heroImages.TRUST_SEEKER),
      bgOverlay: "bg-linear-to-r from-blue-900/70 via-blue-800/60 to-transparent",
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
        `${TRANSPARENT_PRICING_LABEL}, ${CLEAR_SCOPE_LABEL.toLowerCase()}. ${REALITY_ANCHORS.pricing.startingPrice}'den başlayan fiyatlarla hizmetinizdeyiz.`,
      cta: "Fiyat Teklifi Al",
      secondaryCta: "WhatsApp Bilgi Hattı",
      bgImage: getHeroImage(heroImages.PRICE_SENSITIVE),
      bgOverlay: "bg-linear-to-r from-amber-900/70 via-amber-800/60 to-transparent",
      titleColor: "text-white",
      subtitleColor: "text-amber-50",
      badge: {
        text: `${REALITY_ANCHORS.pricing.startingPrice}'den başlayan fiyatlar`,
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
      title: `Kurumsal kiralama çözümleri`,
      subtitle:
        'Huzurevi, bakım evi ve özel klinikler için operasyonel kolaylık ve kesintisiz teknik destek sunuyoruz.',
      cta: "Teklif Alın",
      secondaryCta: "Referanslar",
      bgImage: getHeroImage(heroImages.COMMERCIAL_RENTAL),
      bgOverlay: "bg-linear-to-r from-slate-900/70 via-slate-800/60 to-transparent",
      titleColor: "text-white",
      subtitleColor: "text-slate-100",
      badge: {
        text: "Kurumsal Partner Programı",
        icon: ShieldCheck,
        bg: "bg-slate-500/20 backdrop-blur-sm border border-slate-400/50",
        textColor: "text-slate-100",
        iconColor: "text-slate-400",
        pulse: false
      },
      ctaBg: "bg-slate-800 hover:bg-slate-900",
      pulse: false
    },
    INFORMATION_SEEKER: {
      title: `Doğru cihaz, güvenli kullanım`,
      subtitle:
        'Oksijen konsantratörü ve evde bakım destek cihazları... İhtiyacınıza en uygun çözümü teknik kriterlerle belirliyoruz.',
      cta: "Uzmanla Konuş",
      secondaryCta: "WhatsApp Bilgi Hattı",
      bgImage: getHeroImage(heroImages.INFORMATION_SEEKER),
      bgOverlay: "bg-linear-to-r from-slate-900/80 via-slate-800/70 to-transparent",
      titleColor: "text-white",
      subtitleColor: "text-slate-50",
      badge: {
        text: "Medikal Cihaz Destek Rehberi",
        icon: Wind,
        bg: "bg-slate-500/20 backdrop-blur-sm border border-slate-400/50",
        textColor: "text-slate-100",
        iconColor: "text-slate-400",
        pulse: false
      },
      ctaBg: "bg-blue-600 hover:bg-blue-700",
      pulse: false
    }
  };

  const config = configs[intent] || configs.TRUST_SEEKER;

  return (
    <section className="relative w-full overflow-hidden">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={config.bgImage}
          alt={
            intent === 'CRITICAL_EMERGENCY'
              ? 'Oksijen cihazı teknik destek ve servis - Eslamed'
              : intent === 'TRUST_SEEKER'
                ? 'Evde medikal ekipman ve güvenli süreç yönlendirme merkezi - Eslamed'
                : intent === 'PRICE_SENSITIVE'
                  ? 'Şeffaf kapsam ve net fiyatlı medikal ekipman desteği - Eslamed'
                  : 'Profesyonel Evde Bakım ve Medikal Cihaz Rehberliği'
          }
          fill
          priority={true}
          loading="eager"
          className="object-cover"
          sizes="100vw"
        />
        <div className={`absolute inset-0 ${config.bgOverlay} z-10`} />
      </div>

      <div className="container-wide relative z-20 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 group transition-all hover:bg-white/20">
              <div className={`p-1 rounded-full ${config.badge.bg} ${config.badge.pulse ? 'animate-pulse' : ''}`}>
                <config.badge.icon className={`w-3.5 h-3.5 ${config.badge.iconColor}`} />
              </div>
              <span className={`text-xs font-semibold ${config.badge.textColor} tracking-wide`}>
                {config.badge.text}
              </span>
            </div>

            <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 ${config.titleColor} tracking-tight`}>
              {config.title}
            </h1>

            <p className={`text-lg sm:text-xl font-medium leading-relaxed mb-10 ${config.subtitleColor} opacity-90 max-w-xl`}>
              {config.subtitle}
            </p>

            {/* Quick Features - Context Aware */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <ShieldCheck className="w-5 h-5 text-white/80" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-white/90 leading-tight">
                  {intent === 'CRITICAL_EMERGENCY' ? 'Yerinde Müdahale' : 'Yetkili Servis Güvencesi'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Clock className="w-5 h-5 text-white/80" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-white/90 leading-tight">
                  {intent === 'CRITICAL_EMERGENCY' ? 'Hızlı Aksiyon' : 'Kesintisiz Destek'}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              {intent === 'CRITICAL_EMERGENCY' ? (
                <a
                  href={getPhoneLink()}
                  className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-base transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] animate-pulse"
                >
                  <Phone className="w-5 h-5" strokeWidth={2} />
                  Hemen Ara: {REALITY_ANCHORS.contact.phoneFormatted}
                </a>
              ) : (
                <a
                  href={getPhoneLink()}
                  className={`${config.ctaBg} text-white px-8 py-4 rounded-lg font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] ${config.pulse ? 'animate-pulse' : ''}`}
                >
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                  {config.cta}
                </a>
              )}
              <a
                href={getWhatsAppBaseUrl()}
                className="bg-white/95 backdrop-blur-sm text-slate-900 border border-white/60 px-8 py-4 rounded-lg font-semibold text-base hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
                {config.secondaryCta}
              </a>
            </div>

            {/* Trust Anchors - Floating */}
            <div className="mt-12 flex flex-wrap items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-widest font-bold">ÜTS Kayıtlı</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <HandHeart className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Hasta Odaklı</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Activity className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-widest font-bold">7/24 Teknik Takip</span>
              </div>
            </div>
          </div>

          {/* Desktop Visual Anchor - Glassmorphic Service Dashboard */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center border border-white/10">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Süreç & Uygunluk Odağı</h3>
                    <p className="text-white/70 text-sm">Ev tipi cihaz kurulumu • teknik değerlendirme</p>
                  </div>
                </div>
                <div className="px-4 py-2 bg-white/20 rounded-full border border-white/10 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-white text-xs font-bold">2 Tam Yetkili Mobil Ekip</span>
                </div>
              </div>

              {/* Service Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3">
                    <Wind className="w-5 h-5 text-blue-200" />
                  </div>
                  <div className="text-white font-bold mb-1">Solunum</div>
                  <div className="text-white/60 text-xs leading-relaxed">Kurulum ve kullanım süreci</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center mb-3">
                    <Activity className="w-5 h-5 text-purple-200" />
                  </div>
                  <div className="text-white font-bold mb-1">Ölçüm</div>
                  <div className="text-white/60 text-xs leading-relaxed">Cihaz seçimi ve teknik destek</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3">
                    <HandHeart className="w-5 h-5 text-emerald-200" />
                  </div>
                  <div className="text-white font-bold mb-1">Bakım</div>
                  <div className="text-white/60 text-xs leading-relaxed">Uygunluk ve süreç yönetimi</div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="text-white font-bold mb-1">İstanbul Genelinde Kapsama</div>
                <p className="text-white/60 text-xs leading-relaxed">
                  İlçe bazlı planlama; cihaz tipi, kullanım koşulu ve hekim önerisi doğrultusunda netleştirilir.
                </p>
              </div>
            </div>

            {/* Decorative Elements around dashboard */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      {/* Aesthetic Elements */}
      <div className="absolute -bottom-1 left-0 right-0 h-32 bg-linear-to-t from-slate-50 to-transparent z-10" />
    </section>
  );
}
