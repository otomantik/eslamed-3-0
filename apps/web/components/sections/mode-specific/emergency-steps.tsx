'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, AlertCircle, MessageCircle } from 'lucide-react';
import { LiveServiceTracking } from '@/components/integrity/live-service-tracking';
import { CONTACT_INFO, getPhoneLink } from '@/lib/constants/contact-info';
import { getWhatsAppUrlWithTemplate } from '@/lib/utils/whatsapp-helpers';

/**
 * Emergency Steps Data - Exported for reuse in other components
 * ✅ De-duplicated: Single source of truth for emergency step content
 */
export const EMERGENCY_STEPS = [
  {
    step: '1',
    title: 'Durumu Değerlendirin',
    description: 'Elektrik arızası/yangın/duman varsa cihazı kapatın ve fişi çekin. Solunum sıkıntısı varsa cihazı KAPATMAYIN, doğrudan 112\'yi arayın.',
  },
  {
    step: '2',
    title: 'Acil Tıbbi Durum: 112',
    description: 'Ciddi nefes darlığı, göğüs ağrısı, bilinç değişikliği varsa hemen 112. Teknik arıza için bizi arayın.',
  },
  {
    step: '3',
    title: 'Teknik Destek İçin Bize Ulaşın',
    description: 'Cihaz arızası için telefon/WhatsApp ile iletişime geçin. Cihaz modeli, belirtiler ve kullanım koşullarını paylaşın.',
  },
] as const;

/**
 * EmergencySteps: CRITICAL_EMERGENCY mode specific section
 * Shows step-by-step emergency guide
 */
export function EmergencySteps() {
  const [showTracking, setShowTracking] = useState(false);
  const [serviceRequestId, setServiceRequestId] = useState<string | null>(null);

  // Simulate service request creation when user calls
  const handleEmergencyCall = () => {
    // In production, this would be triggered by actual service request creation
    const requestId = `SR-${Date.now()}`;
    setServiceRequestId(requestId);
    setShowTracking(true);
  };

  const stepIcons = [AlertCircle, Phone, MessageCircle];
  const steps = EMERGENCY_STEPS.map((step, index) => ({
    ...step,
    icon: stepIcons[index],
  }));

  return (
    <section className="py-16 bg-red-50">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <AlertCircle className="w-5 h-5 text-red-700" strokeWidth={2} />
              <span className="font-semibold text-red-900">Tıbbi Acil: 112 | Teknik Arıza: Bizi Arayın</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Acil Durumda Ne Yapmalıyım?
            </h2>
            <p className="text-lg text-slate-600">
              Ciddi sağlık sorunu varsa önce 112. Cihaz arızası için aşağıdaki adımları takip edin.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="flex items-start gap-4 p-6 bg-white rounded-xl border-2 border-red-100 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-5 h-5 text-red-600" strokeWidth={2} />
                      <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
                    </div>
                    <p className="text-slate-700" style={{ lineHeight: 1.8 }}>{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Contact Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.a
              href={getPhoneLink()}
              onClick={handleEmergencyCall}
              className="min-h-[64px] inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Telefon ile acil destek al"
            >
              <Phone className="w-6 h-6" strokeWidth={2} />
              <span>Telefon: {CONTACT_INFO.phone.formatted}</span>
            </motion.a>
            <motion.a
              href={getWhatsAppUrlWithTemplate('EMERGENCY')}
              onClick={handleEmergencyCall}
              className="min-h-[64px] inline-flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="WhatsApp ile acil destek al"
            >
              <MessageCircle className="w-6 h-6" strokeWidth={2} />
              <span>WhatsApp Destek</span>
            </motion.a>
          </div>

          {/* Live Service Tracking */}
          {showTracking && serviceRequestId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <LiveServiceTracking
                serviceRequestId={serviceRequestId}
                customerAddress="İstanbul, Türkiye"
                onClose={() => setShowTracking(false)}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

