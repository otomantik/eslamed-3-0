'use client';

import { motion } from 'framer-motion';
import { Phone, Home, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { FocusTrap } from './focus-trap';
import { EMERGENCY_STEPS } from '@/components/sections/mode-specific/emergency-steps';
import { CONTACT_INFO, getPhoneLink } from '@/lib/constants/contact-info';
import { getWhatsAppUrlWithTemplate } from '@/lib/utils/whatsapp-helpers';

/**
 * PanicRecoveryUI: URGENT mode - Minimal navigation, action-focused
 * Removes Header/Footer, shows only critical actions
 * Implements focus trapping for keyboard navigation
 */
export function PanicRecoveryUI({ children }: { children: React.ReactNode }) {
  return (
    <FocusTrap enabled={true}>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-surface)' }}>
        {/* Minimal Top Bar - Only Home + Emergency Call */}
        {/* Positioned at top-12 to account for GlobalAlertBar (48px) */}
        <nav className="fixed top-12 left-0 right-0 z-50 bg-white border-b border-red-200 shadow-sm h-16">
          <div className="container-wide flex items-center justify-between h-16">
            <Link
              href="/"
              className="min-h-[48px] inline-flex items-center gap-2 text-slate-900 font-semibold hover:text-red-600 transition-colors focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-offset-2 rounded"
              aria-label="Ana sayfaya dön"
            >
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                E
              </div>
              <span className="hidden sm:inline">ESLAMED</span>
            </Link>
            <a
              href={getPhoneLink()}
              className="min-h-[48px] inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors animate-pulse focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Acil durum için hemen ara"
            >
              <Phone className="w-5 h-5" strokeWidth={2} />
              <span>Hemen Ara</span>
            </a>
          </div>
        </nav>

      {/* Action-Oriented List - Hero altında */}
      <section className="py-12 bg-red-50">
        <div className="container-wide">
          <div className="bg-white rounded-2xl border-2 border-red-200 p-6 mb-6 shadow-lg">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" strokeWidth={2} />
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  Acil Durumda Ne Yapmalıyım?
                </h2>
                <p className="text-slate-700" style={{ lineHeight: 1.8 }}>
                  Aşağıdaki adımları sırayla takip edin. Teknik destek ekibimiz size yardımcı olacaktır.
                </p>
              </div>
            </div>

            <ol className="space-y-4">
              {EMERGENCY_STEPS.map((item) => (
                <motion.li
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: parseFloat(item.step) * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-700" style={{ lineHeight: 1.8 }}>
                      {item.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>

            {/* SOS Buttons with Heartbeat Animation */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <motion.a
                href={getPhoneLink()}
                className="min-h-[56px] inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-lg transition-colors animate-heartbeat"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Telefon ile acil destek al"
              >
                <Phone className="w-6 h-6" strokeWidth={2} />
                <span>Telefon: {CONTACT_INFO.phone.formatted}</span>
              </motion.a>
              <motion.a
                href={getWhatsAppUrlWithTemplate('EMERGENCY')}
                className="min-h-[56px] inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg transition-colors animate-heartbeat"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="WhatsApp ile acil destek al"
              >
                <AlertCircle className="w-6 h-6" strokeWidth={2} />
                <span>WhatsApp Destek</span>
              </motion.a>
            </div>
          </div>

          {/* Main Content */}
          {children}
        </div>
      </section>
      </div>
    </FocusTrap>
  );
}

