'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

type ProductTab = 'respiratory' | 'diagnostic' | 'homecare';

interface Product {
  id: string;
  name: string;
  category: ProductTab;
}

const products: Product[] = [
  // Respiratory
  { id: '1', name: 'Respirox SZ-5AW Oksijen Konsantratörü', category: 'respiratory' },
  { id: '2', name: '10 Lt Medikal Oksijen Tüpü', category: 'respiratory' },
  { id: '3', name: 'Respirox Nemlendirici', category: 'respiratory' },
  // Diagnostic
  { id: '4', name: 'Omron M2 Basic Tansiyon Aleti', category: 'diagnostic' },
  { id: '5', name: 'Jumper Temassız Ateş Ölçer', category: 'diagnostic' },
  // Home Care
  { id: '6', name: 'Endostall Havalı Yatak (Baklava Tipi)', category: 'homecare' },
  { id: '7', name: 'Önlem Hasta Bezi', category: 'homecare' },
];

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState<ProductTab>('respiratory');

  const filteredProducts = products.filter(p => p.category === activeTab);

  const tabs = [
    { id: 'respiratory' as ProductTab, label: 'Solunum' },
    { id: 'diagnostic' as ProductTab, label: 'Tanı & Ölçüm' },
    { id: 'homecare' as ProductTab, label: 'Evde Bakım' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900 mb-4">
            Ekipman kapsamı
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Solunum desteği, evde bakım ve ölçüm/takip kategorilerinde örnek ürünler
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b border-slate-200 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              {/* Placeholder Image */}
              <div className="aspect-square bg-slate-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-slate-400 text-sm text-center px-4">
                  Ürün Görseli
                </div>
              </div>

              {/* Product Name */}
              <h3 className="font-semibold text-slate-900 mb-4 text-sm leading-relaxed">
                {product.name}
              </h3>

              {/* CTA Button */}
              <a
                href={`https://wa.me/905372425535?text=${encodeURIComponent(`${product.name} hakkında bilgi almak istiyorum.`)}`}
                className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 px-4 py-3 rounded-lg transition-colors font-medium text-sm border border-slate-200"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                Bilgi Al
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

