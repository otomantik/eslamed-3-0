'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import Link from 'next/link';

/**
 * MobileFAB: Circular Floating Action Button for mobile
 * Shows "Uzmana Danışın" tooltip that disappears after 5s
 */
export function MobileFAB() {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    // Hide tooltip after 5 seconds
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      {/* Tooltip */}
      {showTooltip && (
        <div 
          className="absolute bottom-full right-0 mb-3 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg animate-fade-in"
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          <span>Uzmana Danışın</span>
          <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-slate-900" />
        </div>
      )}

      {/* FAB Button */}
      <Link
        href="https://wa.me/905372425535?text=Merhaba,%20uzman%20danışman%20ile%20görüşmek%20istiyorum"
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Uzman danışman ile görüş"
        title="Uzman danışman ile görüş"
      >
        <MessageCircle className="w-6 h-6" strokeWidth={2} />
      </Link>
    </div>
  );
}


