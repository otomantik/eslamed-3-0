'use client';

import { useState, useEffect } from 'react';
import { Home, Grid3x3, Search, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useIntent } from '@/context/IntentContext';
import { CONTACT_INFO, getPhoneLink } from '@/lib/constants/contact-info';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '@/lib/utils/whatsapp-helpers';
import type { IntentMode } from '@/lib/intent/detector';

/**
 * BottomNav: Mobile CTA Consolidation - Medical Calm
 * Icons: Home, Services, Primary Phone Action (Center), Search, WhatsApp
 * Center button is primary phone action with pulse effect
 */
export function BottomNav() {
  const pathname = usePathname();
  const { mode, district } = useIntent();
  const [showPulse, setShowPulse] = useState(false);
  const [mounted, setMounted] = useState(false);
  // ✅ FIXED: Prevent hydration mismatch - initialize URL state on client only
  // ✅ REFACTORED: Use centralized WhatsApp helper
  const [whatsAppUrl, setWhatsAppUrl] = useState(
    `https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(WHATSAPP_MESSAGES.GENERAL)}`
  );
  
  const isEmergency = mode === 'CRITICAL_EMERGENCY';

  // ✅ REFACTORED: Update WhatsApp URL only on client-side after mount using centralized helper
  // This prevents hydration mismatch between server and client
  useEffect(() => {
    setMounted(true);
    setShowPulse(true);
    
    // Update WhatsApp URL with actual mode/district (client-side only)
    setWhatsAppUrl(getWhatsAppUrl(mode as IntentMode, district));
    
    const timer = setTimeout(() => {
      setShowPulse(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [mode, district]); // Re-compute when mode/district changes

  // Track function
  const track = (eventName: string, data: { mode: string; district?: string }) => {
    if (typeof window !== 'undefined') {
      const sessionId = sessionStorage.getItem('eslamed_session_id') || `session_${Date.now()}`;
      fetch('/api/demand_logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'conversion',
          subtype: eventName,
          mode: data.mode,
          district: data.district,
          sessionId,
          timestamp: new Date().toISOString(),
        }),
        keepalive: true,
      }).catch(() => {});
    }
  };

  const openSearch = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('eslamed:open-search'));
    }
  };

  const isActive = (path: string) => pathname === path;

  // Center button label
  const centerButtonLabel = isEmergency ? 'Acil Ara' : 'Hemen Ara';

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden backdrop-blur-lg bg-white/70 border-t border-slate-200/50 shadow-lg"
      style={{ 
        height: '64px',
        paddingBottom: 'env(safe-area-inset-bottom, 0)',
      }}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center gap-0.5 flex-1 transition-colors ${
            isActive('/') ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-xs font-semibold text-slate-900">Ana Sayfa</span>
        </Link>

        {/* Services */}
        <Link
          href="/hizmetler"
          className={`flex flex-col items-center justify-center gap-0.5 flex-1 transition-colors ${
            isActive('/hizmetler') ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Grid3x3 className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-xs font-semibold text-slate-900">Hizmetler</span>
        </Link>

        {/* Primary Phone Action (Center) - Pulse effect for first 5s */}
        <a
          href={getPhoneLink()}
          onClick={() => track('cta_phone_primary', { mode, district })}
          className={`relative -mt-4 w-14 h-14 ${
            isEmergency ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
          } rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50`}
          style={{
            boxShadow: mounted && showPulse 
              ? `0 0 0 0 rgba(37, 99, 235, 0.2), 0 0 0 0 rgba(37, 99, 235, 0.2), 0 0 20px rgba(37, 99, 235, 0.1), 0 0 40px rgba(37, 99, 235, 0.05)`
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            animation: mounted && showPulse ? 'pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none',
          }}
          aria-label={centerButtonLabel}
          title={centerButtonLabel}
        >
          <Phone className="w-6 h-6 text-white" strokeWidth={2} />
        </a>

        {/* Search */}
        <button
          onClick={openSearch}
          className="flex flex-col items-center justify-center gap-0.5 flex-1 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <Search className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-xs font-semibold text-slate-900">Ara</span>
        </button>

        {/* WhatsApp Support */}
        <a
          href={whatsAppUrl}
          onClick={() => track('cta_whatsapp_bar', { mode, district })}
          className="flex flex-col items-center justify-center gap-0.5 flex-1 text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-xs font-semibold text-slate-900">Destek</span>
        </a>
      </div>
    </nav>
  );
}

