'use client';

import { X, MessageCircle, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmartDwellTracker } from './smart-dwell-tracker';
import { useState } from 'react';
import { REALITY_ANCHORS } from '@/lib/integrity/reality-anchors';
import { getPhoneLink, getWhatsAppBaseUrl } from '@/lib/constants/contact-info';

interface RequestQuoteSidebarProps {
  onClose: () => void;
}

/**
 * RequestQuoteSidebar: RESEARCH mode - Appears after smart dwell time
 */
export function RequestQuoteSidebar({ onClose }: RequestQuoteSidebarProps) {
  const [show, setShow] = useState(false);
  return (
    <>
      <SmartDwellTracker
        initialDelay={15000}
        idleThreshold={3000}
        onShow={() => setShow(true)}
      />
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">Teklif Alın</h3>
                <button
                  onClick={onClose}
                  className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                  aria-label="Kapat"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <p className="text-slate-700" style={{ lineHeight: 1.8 }}>
                  Detaylı bilgi ve özel teklif için iletişime geçin. Uzman ekibimiz size yardımcı olacaktır.
                </p>

                <div className="space-y-3">
                  <a
                    href={`${getWhatsAppBaseUrl()}?text=Merhaba,%20detaylı%20bilgi%20ve%20teklif%20almak%20istiyorum`}
                    className="min-h-[56px] w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors"
                    aria-label="WhatsApp ile teklif al"
                  >
                    <MessageCircle className="w-5 h-5" strokeWidth={2} />
                    <span>WhatsApp ile İletişim</span>
                  </a>
                  <a
                    href={getPhoneLink()}
                    className="min-h-[56px] w-full inline-flex items-center justify-center gap-2 border-2 border-slate-300 hover:border-slate-400 text-slate-900 rounded-xl font-semibold transition-colors"
                    aria-label="Telefon ile teklif al"
                  >
                    <Phone className="w-5 h-5" strokeWidth={2} />
                    <span>Telefon: {REALITY_ANCHORS.contact.phoneFormatted}</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

