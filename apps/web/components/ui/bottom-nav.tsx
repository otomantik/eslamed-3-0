'use client';

import { Home, Grid3x3, Search, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useIntent } from '@/context/IntentContext';

/**
 * BottomNav: Persistent Bottom Control Center (Sovereign Seal v2)
 * Icons: Home, Services, Action (Logo), Search, Support
 * Logo button pops above bar with mode-based color
 */
export function BottomNav() {
  const pathname = usePathname();
  const { mode, district } = useIntent();
  
  const isEmergency = mode === 'CRITICAL_EMERGENCY';
  const isTrustSeeker = mode === 'TRUST_SEEKER';
  
  // Mode-based logo color
  const logoColor = isEmergency 
    ? 'bg-red-600 hover:bg-red-700' 
    : isTrustSeeker 
    ? 'bg-blue-600 hover:bg-blue-700'
    : 'bg-brand-primary hover:bg-blue-700';

  const openSearch = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('eslamed:open-search'));
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden backdrop-blur-xl bg-white/70 border-t border-slate-200/50 shadow-lg"
      style={{ 
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

        {/* Logo Button (Action) - Pops above */}
        <Link
          href="/"
          className={`relative -mt-4 w-14 h-14 ${logoColor} rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50`}
          aria-label="Ana Sayfa"
        >
          <span className="text-white font-bold text-xl">E</span>
        </Link>

        {/* Search */}
        <button
          onClick={openSearch}
          className="flex flex-col items-center justify-center gap-0.5 flex-1 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <Search className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-xs font-semibold text-slate-900">Ara</span>
        </button>

        {/* Support */}
        <a
          href="tel:+905372425535"
          className={`flex flex-col items-center justify-center gap-0.5 flex-1 transition-colors ${
            isEmergency 
              ? 'text-red-600 hover:text-red-700' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Phone className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-xs font-semibold text-slate-900">Destek</span>
        </a>
      </div>
    </nav>
  );
}

