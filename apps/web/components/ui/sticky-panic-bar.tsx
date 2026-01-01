'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { TactileButton } from './tactile-button';

/**
 * StickyPanicBar: Mobile-only, one-tap call with haptic feedback
 * URGENT mode only
 */
export function StickyPanicBar() {
  const handleCall = () => {
    window.location.href = 'tel:+905372425535';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/905372425535?text=Acil%20teknik%20destek%20ihtiyacım%20var', '_blank');
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
    >
      <div className="bg-red-600 shadow-lg">
        <div className="grid grid-cols-2 gap-2 p-2">
          <TactileButton
            onClick={handleCall}
            className="w-full min-h-[64px] flex items-center justify-center gap-2 text-white font-bold text-base"
            ariaLabel="Acil durum için hemen ara"
            hapticPattern={[100, 50, 100]}
            fallbackIntensity={1.15}
          >
            <Phone className="w-5 h-5" strokeWidth={2} />
            <span className="hidden sm:inline">Ara</span>
          </TactileButton>
          <TactileButton
            onClick={handleWhatsApp}
            className="w-full min-h-[64px] flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base"
            ariaLabel="WhatsApp ile acil destek al"
            hapticPattern={[50, 30, 50]}
            fallbackIntensity={1.1}
          >
            <MessageCircle className="w-5 h-5" strokeWidth={2} />
            <span className="hidden sm:inline">WhatsApp</span>
          </TactileButton>
        </div>
      </div>
    </motion.div>
  );
}

