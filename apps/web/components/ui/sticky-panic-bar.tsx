'use client';

import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * StickyPanicBar: Mobile-only, one-tap call with haptic feedback
 * URGENT mode only
 */
export function StickyPanicBar() {
  const handleCall = () => {
    // Haptic feedback (if supported)
    if ('vibrate' in navigator) {
      navigator.vibrate(50); // Short vibration
    }
    window.location.href = 'tel:+905372425535';
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
    >
      <div className="bg-red-600 shadow-lg">
        <button
          onClick={handleCall}
          className="w-full min-h-[64px] flex items-center justify-center gap-3 text-white font-bold text-lg"
          aria-label="Acil durum için hemen ara"
        >
          <Phone className="w-6 h-6" strokeWidth={2} />
          <span>Hemen Ara: 0537 242 55 35</span>
        </button>
      </div>
    </motion.div>
  );
}

