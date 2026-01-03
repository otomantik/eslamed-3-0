'use client';

import { CheckCircle2, DollarSign } from 'lucide-react';

/**
 * PriceTable: PRICE_SENSITIVE mode specific section
 * Shows transparent pricing information
 */
export function PriceTable() {
  const services = [
    {
      name: 'Oksijen Dolum',
      price: '450 TL',
      description: 'Standart tüp dolum ücreti',
      features: ['Güvenlik kontrolü', 'Hızlı teslimat', 'İstanbul geneli'],
    },
    {
      name: 'Cihaz Kiralama',
      price: 'Başlangıç: 800 TL/ay',
      description: 'Aylık kiralama paketi',
      features: ['Kurulum dahil', 'Teknik destek', 'Bakım hizmeti'],
    },
    {
      name: 'Teknik Servis',
      price: 'Muayene: 200 TL',
      description: 'Arıza tespiti ve onarım',
      features: ['Ücretsiz değerlendirme', 'Hızlı müdahale', 'Garanti'],
    },
  ];

  return (
    <section className="py-16 bg-amber-50">
      <div className="container-wide">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-4">
            <DollarSign className="w-5 h-5 text-amber-700" strokeWidth={2} />
            <span className="font-semibold text-amber-900">Şeffaf Fiyatlandırma</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Net Fiyat, Şeffaf Süreç
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Tüm fiyatlarımız şeffaf. Gizli maliyet yok, net kapsam.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border-2 border-amber-200 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.name}</h3>
                <div className="text-3xl font-bold text-amber-600 mb-2">{service.price}</div>
                <p className="text-sm text-slate-600">{service.description}</p>
              </div>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-slate-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="tel:+905372425535"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
              >
                Fiyat Bilgisi Al
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">
            Detaylı fiyat bilgisi için iletişime geçin. İhtiyacınıza özel teklif hazırlayalım.
          </p>
          <a
            href="https://wa.me/905372425535?text=Fiyat%20bilgisi%20almak%20istiyorum"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
          >
            Detaylı Fiyat Teklifi Al
          </a>
        </div>
      </div>
    </section>
  );
}


