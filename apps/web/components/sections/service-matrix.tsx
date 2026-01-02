import { Wrench, Droplets, ShoppingCart, RefreshCw, Heart } from 'lucide-react';
import type { IntentMode } from '@/lib/intent/detector';

interface ServiceMatrixProps {
  intent: IntentMode;
}

export function ServiceMatrix({ intent }: ServiceMatrixProps) {
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

  return (
    <section className="py-20 bg-emerald-50">
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
                className={`group relative bg-emerald-50/50 rounded-2xl p-9 border-2 border-emerald-200 hover:border-emerald-300 transition-all hover:shadow-xl hover:-translate-y-1 ${colSpan}`}
              >
                <a
                  href={service.href}
                  aria-label={`${service.title} detayları`}
                  className="absolute inset-0 rounded-2xl"
                />
                <div className="bg-emerald-600 w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-5 text-sm font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
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



