import { Sparkles, Truck, ShieldCheck } from 'lucide-react';
import type { IntentMode } from '@/lib/intent/detector';

interface ServiceValueGridProps {
  intent?: IntentMode;
}

export function ServiceValueGrid({ intent = 'INFORMATION_SEEKER' }: ServiceValueGridProps) {
  const services = [
    {
      icon: Sparkles,
      title: 'Hijyen ve güvenlik',
      description: 'Teslimat öncesi temel temizlik ve parça kontrolü yapılır. Ev tipi cihaz kurulumu sırasında bakım ve güvenli kullanım adımları netleştirilir.',
    },
    {
      icon: Truck,
      title: 'Hızlı teslimat',
      description: 'Teslimat planı; ilçe, stok ve operasyon durumuna göre netleştirilir. Gerekli bilgiler iletişimde doğrulanır; ekipman uygunluğu buna göre değerlendirilir.',
    },
    {
      icon: ShieldCheck,
      title: 'Sürekli destek',
      description: 'Teknik arıza bildirimi sonrası teknik değerlendirme yapılır. Kurulum ve kullanım yönlendirmesi, ihtiyaca göre adım adım ilerler.',
    },
  ];

  // Mode-aware background colors
  const modeBg = {
    CRITICAL_EMERGENCY: "bg-red-50",
    TRUST_SEEKER: "bg-blue-50",
    PRICE_SENSITIVE: "bg-amber-50",
    COMMERCIAL_RENTAL: "bg-slate-50",
    INFORMATION_SEEKER: "bg-slate-50",
  } as const;

  const modeCardBg = {
    CRITICAL_EMERGENCY: "bg-red-50/50 border-red-200",
    TRUST_SEEKER: "bg-blue-50/50 border-blue-200",
    PRICE_SENSITIVE: "bg-amber-50/50 border-amber-200",
    COMMERCIAL_RENTAL: "bg-slate-50/50 border-slate-200",
    INFORMATION_SEEKER: "bg-slate-50/50 border-slate-200",
  } as const;

  const modeIconBg = {
    CRITICAL_EMERGENCY: "bg-red-50",
    TRUST_SEEKER: "bg-blue-50",
    PRICE_SENSITIVE: "bg-amber-50",
    COMMERCIAL_RENTAL: "bg-slate-50",
    INFORMATION_SEEKER: "bg-slate-50",
  } as const;

  const modeIconColor = {
    CRITICAL_EMERGENCY: "text-red-600",
    TRUST_SEEKER: "text-blue-600",
    PRICE_SENSITIVE: "text-amber-600",
    COMMERCIAL_RENTAL: "text-slate-600",
    INFORMATION_SEEKER: "text-slate-600",
  } as const;

  const sectionBg = modeBg[intent] ?? "bg-slate-50";
  const cardBg = modeCardBg[intent] ?? "bg-slate-50/50 border-slate-200";
  const iconBg = modeIconBg[intent] ?? "bg-slate-50";
  const iconColor = modeIconColor[intent] ?? "text-slate-600";

  return (
    <section className={`py-20 ${sectionBg}`}>
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900 mb-4">
            Evde Bakım ve Donanım Rehberliği
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Süreç; ekipman uygunluğu, ev tipi cihaz kurulumu ve teknik değerlendirme adımlarında netlik sağlayacak şekilde ilerler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                key={index}
                className={`${cardBg} rounded-2xl p-9 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className={`${iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className={`w-8 h-8 ${iconColor}`} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-base" style={{ lineHeight: 1.8 }}>
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

