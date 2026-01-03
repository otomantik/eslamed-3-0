'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, Shield, Droplets, GraduationCap } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: 'sanitization' | 'calibration' | 'education';
  label: string;
  description?: string;
}

const checklistItems: ChecklistItem[] = [
  {
    id: 'sanitize-surfaces',
    category: 'sanitization',
    label: 'Tüm yüzeyleri temizle ve dezenfekte et',
    description: 'Cihaz dış yüzeyleri, kumanda, sensörler ve dokunulan tüm alanlar',
  },
  {
    id: 'check-filters',
    category: 'sanitization',
    label: 'Filtrelerin temizliğini kontrol et',
    description: 'Hava filtresi, su filtresi (varsa) ve bakteri filtresi durumu',
  },
  {
    id: 'verify-cleaning-protocol',
    category: 'sanitization',
    label: 'Temizlik protokolü belgelerini doğrula',
    description: 'Temizlik talimatları ve dezenfektan kullanım bilgileri',
  },
  {
    id: 'calibrate-sensors',
    category: 'calibration',
    label: 'Sensörleri kalibre et',
    description: 'Oksijen seviyesi, basınç, akış sensörleri doğruluk kontrolü',
  },
  {
    id: 'test-functionality',
    category: 'calibration',
    label: 'Tüm fonksiyonları test et',
    description: 'Açma/kapama, ayar kontrolleri, alarm sistemleri, güç yönetimi',
  },
  {
    id: 'verify-settings',
    category: 'calibration',
    label: 'Fabrika ayarlarını doğrula',
    description: 'Cihaz varsayılan ayarlarını kontrol et ve gerekirse sıfırla',
  },
  {
    id: 'explain-operation',
    category: 'education',
    label: 'Cihaz kullanımını açıkla',
    description: 'Temel kullanım, açma/kapama, ayarlar, güvenlik uyarıları',
  },
  {
    id: 'demonstrate-features',
    category: 'education',
    label: 'Önemli özellikleri göster',
    description: 'Pratik kullanım örnekleri, sık kullanılan fonksiyonlar',
  },
  {
    id: 'provide-manual',
    category: 'education',
    label: 'Kullanım kılavuzu ve kaynaklar ver',
    description: 'Yazılı kılavuz, video linkleri, destek iletişim bilgileri',
  },
  {
    id: 'test-customer-understanding',
    category: 'education',
    label: 'Müşteri anlayışını test et',
    description: 'Müşterinin temel kullanımı tekrar etmesini sağla',
  },
];

const categoryLabels = {
  sanitization: { 
    label: 'Temizlik & Dezenfeksiyon', 
    icon: Droplets, 
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
    iconBg: 'bg-blue-600',
    headerBg: 'bg-blue-50',
    headerBorder: 'border-blue-100',
  },
  calibration: { 
    label: 'Kalibrasyon & Test', 
    icon: Shield, 
    bgColor: 'bg-green-50',
    borderColor: 'border-green-100',
    iconBg: 'bg-green-600',
    headerBg: 'bg-green-50',
    headerBorder: 'border-green-100',
  },
  education: { 
    label: 'Eğitim & Bilgilendirme', 
    icon: GraduationCap, 
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-100',
    iconBg: 'bg-purple-600',
    headerBg: 'bg-purple-50',
    headerBorder: 'border-purple-100',
  },
};

/**
 * ExpertDeliveryProtocol: Checklist for field technicians
 * Ensures consistent quality delivery process
 */
export function ExpertDeliveryProtocol() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newCompleted = new Set(completed);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompleted(newCompleted);
  };

  const itemsByCategory = checklistItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, ChecklistItem[]>
  );

  const totalItems = checklistItems.length;
  const completedCount = completed.size;
  const progress = totalItems > 0 ? (completedCount / totalItems) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Teslimat Protokolü</h2>
          <span className="text-sm font-medium text-slate-600">
            {completedCount} / {totalItems} tamamlandı
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Checklist by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(categoryLabels).map(([category, { label, icon: Icon, bgColor, borderColor, iconBg, headerBg, headerBorder }]) => {
          const items = itemsByCategory[category] || [];
          const categoryCompleted = items.filter((item) => completed.has(item.id)).length;
          const categoryTotal = items.length;

          return (
            <div
              key={category}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
            >
              {/* Category Header */}
              <div className={`px-6 py-4 ${headerBg} border-b ${headerBorder}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{label}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {categoryCompleted} / {categoryTotal} tamamlandı
                    </p>
                  </div>
                </div>
              </div>

              {/* Checklist Items */}
              <div className="p-4 space-y-3">
                {items.map((item) => {
                  const isCompleted = completed.has(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        isCompleted
                          ? 'border-green-200 bg-green-50'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" strokeWidth={2} />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-400" strokeWidth={2} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`font-medium text-sm ${
                              isCompleted ? 'text-green-900 line-through' : 'text-slate-900'
                            }`}
                          >
                            {item.label}
                          </div>
                          {item.description && (
                            <div className="text-xs text-slate-600 mt-1">{item.description}</div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Message */}
      {completedCount === totalItems && (
        <div className="rounded-2xl border-2 border-green-500 bg-green-50 p-6 text-center">
          <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" strokeWidth={2} />
          <h3 className="text-lg font-semibold text-green-900 mb-1">Tüm Kontroller Tamamlandı!</h3>
          <p className="text-sm text-green-700">
            Teslimat protokolü başarıyla tamamlandı. Devir-teslim formunu doldurabilirsiniz.
          </p>
        </div>
      )}
    </div>
  );
}

