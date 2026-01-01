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
      href: '/servis'
    },
    {
      id: 'refill',
      title: 'Oksijen Dolum',
      description: 'Dolum süreci; tüp tipi ve güvenlik kontrolüne göre yürütülür. Detaylar ihtiyaç ve lokasyona göre netleşir.',
      icon: Droplets,
      color: 'bg-blue-500',
      iconColor: 'text-blue-600',
      href: '/dolum'
    },
    {
      id: 'rental',
      title: 'Cihaz Kiralama',
      description: 'Süre ve cihaz tipi ihtiyaca göre belirlenir. Kurulum ve temel kullanım adımları teslimatta paylaşılır.',
      icon: Heart,
      color: 'bg-emerald-500',
      iconColor: 'text-emerald-600',
      href: '/kiralama'
    },
    {
      id: 'sales',
      title: 'Cihaz Satışı',
      description: 'Uygun ürün seçimi; model, kullanım koşulu ve tedarik durumuna göre netleştirilir.',
      icon: ShoppingCart,
      color: 'bg-purple-500',
      iconColor: 'text-purple-600',
      href: '/satis'
    },
    {
      id: 'buyback',
      title: '2. El Alım',
      description: 'Cihazın durumu ve modeline göre değerlendirme yapılır. Uygunluk ve süreç iletişimde netleşir.',
      icon: RefreshCw,
      color: 'bg-orange-500',
      iconColor: 'text-orange-600',
      href: '/alim'
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
    <section className="py-20 bg-white">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900 mb-4">
            Hizmetlerimiz
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Kapsam ve süreç netliği için kısa başlıklar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orderedServices.map((service, index) => {
            const Icon = service.icon;
            const isRepair = service.id === 'repair';
            const colSpan = (intent === 'CRITICAL_EMERGENCY' && isRepair && index === 0) 
              ? 'md:col-span-2' 
              : '';

            return (
              <a
                key={service.id}
                href={service.href}
                className={`group relative bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border-2 border-slate-200 hover:border-slate-300 transition-all hover:shadow-xl hover:-translate-y-1 ${colSpan}`}
              >
                <div className={`${service.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-4 text-sm font-semibold text-slate-900 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Detaylar →
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}



