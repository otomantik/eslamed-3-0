import { Sparkles, Truck, ShieldCheck } from 'lucide-react';

export function ServiceValueGrid() {
  const services = [
    {
      icon: Sparkles,
      title: 'Hijyen ve güvenlik',
      description: 'Teslimat öncesi temel temizlik ve parça kontrolü yapılır. Ev tipi cihaz kurulumu sırasında bakım ve güvenli kullanım adımları netleştirilir.',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Truck,
      title: 'Hızlı teslimat',
      description: 'Teslimat planı; ilçe, stok ve operasyon durumuna göre netleştirilir. Gerekli bilgiler iletişimde doğrulanır; ekipman uygunluğu buna göre değerlendirilir.',
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: ShieldCheck,
      title: 'Sürekli destek',
      description: 'Teknik arıza bildirimi sonrası teknik değerlendirme yapılır. Kurulum ve kullanım yönlendirmesi, ihtiyaca göre adım adım ilerler.',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900 mb-4">
            Evde Bakım ve Donanım Rehberliği
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Süreç; ekipman uygunluğu, ev tipi cihaz kurulumu ve teknik değerlendirme adımlarında netlik sağlayacak şekilde ilerler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                key={index}
                className="bg-white rounded-xl p-8 border border-slate-200"
              >
                <div className={`${service.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className={`w-7 h-7 ${service.iconColor}`} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
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

