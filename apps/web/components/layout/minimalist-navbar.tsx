'use client';

import Link from 'next/link';
import { Home, Phone } from 'lucide-react';

/**
 * MinimalistNavbar: Emergency Mode Navigation (v4.6)
 * Shows only Logo, Home, and Urgent Call button
 * Used in CRITICAL_EMERGENCY mode for minimal distraction
 */
export function MinimalistNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-red-200 shadow-sm">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-700 transition-colors">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-lg font-semibold text-slate-900">Eslamed</span>
          </Link>

          {/* Right Side: Home + Urgent Call */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" strokeWidth={2} />
              <span className="text-sm font-medium">Ana Sayfa</span>
            </Link>
            <a
              href="tel:+905372425535"
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm hover:shadow-md animate-pulse"
            >
              <Phone className="w-4 h-4" strokeWidth={2.5} />
              <span>ACİL DESTEK ARA</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

