'use client';

import { useEffect, ReactNode } from 'react';
import { useIntent } from './IntentContext';
import type { IntentMode } from '@/lib/intent/detector';

interface IntentThemeProviderProps {
  children: ReactNode;
}

/**
 * IntentThemeProvider: Applies CSS variables based on intent mode
 * Deep Masking v3: Behavioral UI transformation via theming
 */
export function IntentThemeProvider({ children }: IntentThemeProviderProps) {
  const { mode } = useIntent();

  useEffect(() => {
    const root = document.documentElement;

    // Reset to default first
    root.style.setProperty('--primary-brand', 'oklch(0.55 0.25 255)'); // Eslamed Blue
    root.style.setProperty('--bg-surface', 'oklch(0.98 0.01 240)'); // Light background
    root.style.setProperty('--text-primary', 'oklch(0.20 0.02 240)'); // Dark text

    // Apply mode-specific theming
    switch (mode) {
      case 'CRITICAL_EMERGENCY': {
        // URGENT: SOS Red + Calm Amber background
        root.style.setProperty('--primary-brand', '#DC2626'); // SOS Red
        root.style.setProperty('--bg-surface', '#FFFBEB'); // Calm Amber-50
        root.style.setProperty('--text-primary', '#1F2937'); // Dark gray for readability
        root.style.setProperty('--accent-urgent', '#DC2626');
        break;
      }
      case 'TRUST_SEEKER': {
        // VIP: Blue (Medical Trust) - Changed from Gold
        root.style.setProperty('--primary-brand', '#2563EB'); // Blue-600
        root.style.setProperty('--bg-surface', '#EFF6FF'); // Blue-50
        root.style.setProperty('--text-primary', '#1E293B'); // Slate-800
        root.style.setProperty('--accent-vip', '#2563EB'); // Blue-600 (was #B8860B)
        break;
      }
      case 'INFORMATION_SEEKER': {
        // RESEARCH: Keep default but slightly warmer
        root.style.setProperty('--primary-brand', 'oklch(0.55 0.25 255)');
        root.style.setProperty('--bg-surface', 'oklch(0.99 0.01 240)');
        break;
      }
      default: {
        // DEFAULT: Eslamed Blue
        root.style.setProperty('--primary-brand', 'oklch(0.55 0.25 255)');
        root.style.setProperty('--bg-surface', 'oklch(0.98 0.01 240)');
      }
    }

    // Announce mode change for screen readers
    const announcement = getModeAnnouncement(mode);
    if (announcement && typeof window !== 'undefined') {
      const liveRegion = document.getElementById('aria-live-announcements');
      if (liveRegion) {
        liveRegion.textContent = announcement;
        // Clear after 3 seconds
        setTimeout(() => {
          liveRegion.textContent = '';
        }, 3000);
      }
    }
  }, [mode]);

  return <>{children}</>;
}

function getModeAnnouncement(mode: IntentMode): string | null {
  switch (mode) {
    case 'CRITICAL_EMERGENCY':
      return 'Acil yardım modu aktif edildi. Hızlı erişim butonları görüntüleniyor.';
    case 'TRUST_SEEKER':
      return 'VIP danışmanlık modu aktif. Özel hizmetler ve randevu seçenekleri görüntüleniyor.';
    case 'INFORMATION_SEEKER':
      return 'Bilgi arama modu aktif. Rehberler ve teknik detaylar önceliklendirildi.';
    default:
      return null;
  }
}


