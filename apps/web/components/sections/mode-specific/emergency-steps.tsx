'use client';

import { motion } from 'framer-motion';
import { Phone, AlertCircle, MessageCircle } from 'lucide-react';

/**
 * EmergencySteps: CRITICAL_EMERGENCY mode specific section
 * Shows step-by-step emergency guide
 */
export function EmergencySteps() {
  const steps = [
    {
      step: '1',
      title: 'Cihazı Güvenli Şekilde Kapatın',
      description: 'Elektrik bağlantısını kesin ve cihazı kapatın. Güvenlik önceliklidir.',
      icon: AlertCircle,
    },
    {
      step: '2',
      title: 'Hemen Arayın',
      description: 'Telefon veya WhatsApp üzerinden teknik destek ekibimize ulaşın.',
      icon: Phone,
    },
    {
      step: '3',
      title: 'Durumu Açıklayın',
      description: 'Cihaz modeli, belirtiler ve kullanım koşullarını paylaşın.',
      icon: MessageCircle,
    },
  ];

  return (
    <section className="py-16 bg-red-50">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Acil Durumda Ne Yapmalıyım?
            </h2>
            <p className="text-lg text-slate-600">
              Aşağıdaki adımları sırayla takip edin. Teknik destek ekibimiz size yardımcı olacaktır.
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
                  <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
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
              href="tel:+905372425535"
              className="min-h-[64px] inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Telefon ile acil destek al"
            >
              <Phone className="w-6 h-6" strokeWidth={2} />
              <span>Telefon: 0537 242 55 35</span>
            </motion.a>
            <motion.a
              href="https://wa.me/905372425535?text=Acil%20teknik%20destek%20ihtiyacım%20var"
              className="min-h-[64px] inline-flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="WhatsApp ile acil destek al"
            >
              <MessageCircle className="w-6 h-6" strokeWidth={2} />
              <span>WhatsApp Destek</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

