'use client';

import { MessageCircle, Phone } from 'lucide-react';
import type { IntentMode } from '@/lib/intent/detector';

interface FloatingRescueBarProps {
  intent: IntentMode;
}

export function FloatingRescueBar({ intent }: FloatingRescueBarProps) {
  const isEmergency = intent === 'CRITICAL_EMERGENCY';
  
  const leftButton = {
    href: 'https://wa.me/905555555555?text=Konumumu gönderiyorum',
    label: 'Konum Gönder',
    icon: MessageCircle,
    bg: 'bg-emerald-600 hover:bg-emerald-700'
  };

  const rightButton = {
    href: 'tel:05555555555',
    label: 'Uzmanla Konuş',
    icon: Phone,
    bg: isEmergency 
      ? 'bg-red-600 hover:bg-red-700' 
      : 'bg-slate-800 hover:bg-slate-700'
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="flex h-14 border-t border-slate-200 bg-white shadow-lg">
        <a
          href={leftButton.href}
          className={`flex-1 flex items-center justify-center gap-2 ${leftButton.bg} text-white font-medium text-sm transition-colors`}
        >
          <leftButton.icon className="w-4 h-4" strokeWidth={1.5} />
          <span>{leftButton.label}</span>
        </a>
        <a
          href={rightButton.href}
          className={`flex-1 flex items-center justify-center gap-2 ${rightButton.bg} text-white font-medium text-sm transition-colors`}
        >
          <rightButton.icon className="w-4 h-4" strokeWidth={1.5} />
          <span>{rightButton.label}</span>
        </a>
      </div>
    </div>
  );
}



