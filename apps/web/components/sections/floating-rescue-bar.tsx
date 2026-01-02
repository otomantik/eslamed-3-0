'use client';

import { Home, Grid3x3, Search, Phone } from 'lucide-react';
import Link from 'next/link';
import type { IntentMode } from '@/lib/intent/detector';

interface FloatingRescueBarProps {
  intent: IntentMode;
}

/**
 * FloatingRescueBar: Mobile Navigation Bar (v4.6 - Clean Bottom Bar)
 * Focuses on [Home, Services, Search, Contact]
 * WhatsApp removed (available via MobileFAB only)
 */
export function FloatingRescueBar({ intent }: FloatingRescueBarProps) {
  const isEmergency = intent === 'CRITICAL_EMERGENCY';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="flex h-14 border-t border-slate-200 bg-white shadow-lg">
        <Link
          href="/"
          className="flex-1 flex flex-col items-center justify-center gap-0.5 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <Home className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-xs font-medium">Ana Sayfa</span>
        </Link>
        <Link
          href="/hizmetler"
          className="flex-1 flex flex-col items-center justify-center gap-0.5 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <Grid3x3 className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-xs font-medium">Hizmetler</span>
        </Link>
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('eslamed:open-search'));
            }
          }}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <Search className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-xs font-medium">Ara</span>
        </button>
        <a
          href="tel:+905372425535"
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 ${
            isEmergency ? 'text-red-600 hover:text-red-700' : 'text-slate-600 hover:text-slate-900'
          } transition-colors`}
        >
          <Phone className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-xs font-medium">İletişim</span>
        </a>
      </div>
    </div>
  );
}
