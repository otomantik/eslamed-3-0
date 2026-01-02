'use client';

import { useEffect, useRef } from 'react';
import { Wrench, Droplets, ShoppingCart, RefreshCw, Heart } from 'lucide-react';
import type { IntentMode } from '@/lib/intent/detector';

interface ServiceMatrixProps {
  intent: IntentMode;
}

export function ServiceMatrix({ intent }: ServiceMatrixProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  const services = [
    {
      id: 'repair',
      title: 'Teknik Servis',
      description: 'Arıza belirtisi, cihaz modeli ve kullanım koşullarına göre teknik değerlendirme yapılır. Uygunsa onarım süreci planlanır.',
      icon: Wrench,
      color: 'bg-red-500',
      iconColor: 'text-red-600',
      href: '/hizmetler/teknik-servis'
    },
    {
      id: 'refill',
      title: 'Oksijen Dolum',
      description: 'Dolum süreci; tüp tipi ve güvenlik kontrolüne göre yürütülür. Detaylar ihtiyaç ve lokasyona göre netleşir.',
      icon: Droplets,
      color: 'bg-blue-500',
      iconColor: 'text-blue-600',
      href: '/hizmetler/oksijen-dolum'
    },
    {
      id: 'rental',
      title: 'Cihaz Kiralama',
      description: 'Süre ve cihaz tipi ihtiyaca göre belirlenir. Kurulum ve temel kullanım adımları teslimatta paylaşılır.',
      icon: Heart,
      color: 'bg-emerald-500',
      iconColor: 'text-emerald-600',
      href: '/hizmetler/cihaz-kiralama'
    },
    {
      id: 'sales',
      title: 'Cihaz Satışı',
      description: 'Uygun ürün seçimi; model, kullanım koşulu ve tedarik durumuna göre netleştirilir.',
      icon: ShoppingCart,
      color: 'bg-purple-500',
      iconColor: 'text-purple-600',
      href: '/hizmetler/cihaz-satisi'
    },
    {
      id: 'buyback',
      title: '2. El Alım',
      description: 'Cihazın durumu ve modeline göre değerlendirme yapılır. Uygunluk ve süreç iletişimde netleşir.',
      icon: RefreshCw,
      color: 'bg-orange-500',
      iconColor: 'text-orange-600',
      href: '/hizmetler/ikinci-el-alim'
    }
  ];

  // Mode-aware background colors
  const modeBg = {
    CRITICAL_EMERGENCY: "bg-red-50",
    TRUST_SEEKER: "bg-blue-50",
    PRICE_SENSITIVE: "bg-amber-50",
    COMMERCIAL_RENTAL: "bg-slate-50",
    INFORMATION_SEEKER: "bg-slate-50",
  } as const;

  // Mode-aware card background and border colors
  const modeCardBg = {
    CRITICAL_EMERGENCY: "bg-red-50/50 border-red-200 hover:border-red-300",
    TRUST_SEEKER: "bg-blue-50/50 border-blue-200 hover:border-blue-300",
    PRICE_SENSITIVE: "bg-amber-50/50 border-amber-200 hover:border-amber-300",
    COMMERCIAL_RENTAL: "bg-slate-50/50 border-slate-200 hover:border-slate-300",
    INFORMATION_SEEKER: "bg-slate-50/50 border-slate-200 hover:border-slate-300",
  } as const;

  // Mode-aware icon container and text colors
  const modeIconBg = {
    CRITICAL_EMERGENCY: "bg-red-600",
    TRUST_SEEKER: "bg-blue-600",
    PRICE_SENSITIVE: "bg-amber-600",
    COMMERCIAL_RENTAL: "bg-slate-600",
    INFORMATION_SEEKER: "bg-slate-600",
  } as const;

  const modeLinkColor = {
    CRITICAL_EMERGENCY: "text-red-600",
    TRUST_SEEKER: "text-blue-600",
    PRICE_SENSITIVE: "text-amber-600",
    COMMERCIAL_RENTAL: "text-slate-600",
    INFORMATION_SEEKER: "text-slate-600",
  } as const;

  // Reorder based on intent
  let orderedServices = [...services];
  
  if (intent === 'CRITICAL_EMERGENCY') {
    orderedServices = [
      services.find(s => s.id === 'repair')!,
      ...services.filter(s => s.id !== 'repair')
    ];
  } else if (intent === 'PRICE_SENSITIVE') {
    orderedServices = [
      services.find(s => s.id === 'refill')!,
      services.find(s => s.id === 'rental')!,
      ...services.filter(s => s.id !== 'refill' && s.id !== 'rental')
    ];
  }

  const sectionBg = modeBg[intent] ?? "bg-slate-50";
  const cardBg = modeCardBg[intent] ?? "bg-slate-50/50 border-slate-200 hover:border-slate-300";
  const iconBg = modeIconBg[intent] ?? "bg-slate-600";
  const linkColor = modeLinkColor[intent] ?? "text-slate-600";

  return (
    <section 
      ref={sectionRef}
      className={`py-20 ${sectionBg} animate-fade-in-up`}
      style={{ willChange: 'opacity, transform' }}
    >
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900 mb-4">
            Ürün/Hizmet
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Kapsam ve süreç netliği için kısa başlıklar (ekipman uygunluğu, ev tipi cihaz kurulumu ve teknik destek)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {orderedServices.map((service, index) => {
            const Icon = service.icon;
            const isRepair = service.id === 'repair';
            const colSpan = (intent === 'CRITICAL_EMERGENCY' && isRepair && index === 0) 
              ? 'md:col-span-2' 
              : '';

            return (
              <article
                key={service.id}
                className={`group relative ${cardBg} rounded-2xl p-9 border-2 transition-all hover:shadow-md hover:-translate-y-0.5 ${colSpan}`}
                style={{ willChange: 'transform' }}
              >
                <a
                  href={service.href}
                  aria-label={`${service.title} detayları`}
                  className="absolute inset-0 rounded-2xl"
                />
                <div className={`${iconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-base" style={{ lineHeight: 1.8 }}>
                  {service.description}
                </p>
                <div className={`mt-5 text-sm font-semibold ${linkColor} group-hover:translate-x-1 transition-transform inline-flex items-center gap-1`}>
                  Detaylar →
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}



