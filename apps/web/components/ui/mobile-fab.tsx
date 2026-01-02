'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useIntent } from '@/context/IntentContext';

/**
 * MobileFAB: Dynamic WhatsApp FAB with pulse effect after 10s inactivity
 * Positioned at bottom: 84px, right: 16px to clear BottomNav
 * Dynamically generates WhatsApp message with district and intent context
 */
export function MobileFAB() {
  const { mode, district } = useIntent();
  const [showPulse, setShowPulse] = useState(false);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  // Build dynamic WhatsApp message with context
  const buildWhatsAppMessage = () => {
    const districtText = district ? `${district} bölgesinde ` : '';
    const modeText = mode === 'CRITICAL_EMERGENCY' 
      ? 'acil medikal ekipman desteği'
      : mode === 'TRUST_SEEKER'
      ? 'güvenilir medikal ekipman yönlendirmesi'
      : mode === 'PRICE_SENSITIVE'
      ? 'fiyat bilgisi ve şeffaf kapsam'
      : mode === 'COMMERCIAL_RENTAL'
      ? 'cihaz kiralama ve satış süreçleri'
      : 'medikal ekipman bilgisi';
    
    return `Merhaba, ${districtText}${modeText} hakkında bilgi almak istiyorum.`;
  };

  const whatsAppUrl = `https://wa.me/905372425535?text=${encodeURIComponent(buildWhatsAppMessage())}`;

  // Track user activity
  useEffect(() => {
    const handleActivity = () => {
      lastActivityRef.current = Date.now();
      setShowPulse(false);
      
      // Reset timer
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      
      // Set new timer for 10s inactivity
      inactivityTimerRef.current = setTimeout(() => {
        setShowPulse(true);
      }, 10000);
    };

    // Listen to various user activities
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Initial timer
    inactivityTimerRef.current = setTimeout(() => {
      setShowPulse(true);
    }, 10000);

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="fixed z-50 lg:hidden"
      style={{ 
        bottom: '84px',
        right: '16px',
      }}
    >
      {/* FAB Button with pulse effect */}
      <Link
        href={whatsAppUrl}
        className={`relative w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
          showPulse ? 'animate-pulse' : ''
        }`}
        aria-label="WhatsApp ile iletişime geç"
        title="WhatsApp ile iletişime geç"
        onClick={() => {
          // Track conversion
          if (typeof window !== 'undefined') {
            const sessionId = sessionStorage.getItem('eslamed_session_id') || `session_${Date.now()}`;
            fetch('/api/demand_logs', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: 'conversion',
                subtype: 'whatsapp_click',
                mode,
                district,
                sessionId,
                timestamp: new Date().toISOString(),
              }),
              keepalive: true,
            }).catch(() => {});
          }
        }}
      >
        <MessageCircle className="w-6 h-6" strokeWidth={2} />
        {showPulse && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
        )}
      </Link>
    </div>
  );
}


