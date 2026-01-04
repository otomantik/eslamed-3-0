'use client';

import { Navbar } from './navbar';
import { GlobalAlertBar } from '@/components/sections/global-alert-bar';
import { useContext } from 'react';
import { IntentContext } from '@/context/IntentContext';
import type { IntentMode } from '@/lib/intent/detector';

interface ModeAwareNavbarProps {
  serverMode?: IntentMode;
}

/**
 * ModeAwareNavbar: Renders the correct navbar based on intent mode
 * - CRITICAL_EMERGENCY: GlobalAlertBar only (PanicRecoveryUI has its own navbar)
 * - TRUST_SEEKER: Standard Navbar (PremiumConciergeUI is only a content wrapper, not a header)
 * - Others: Standard Navbar
 * 
 * ✅ ADSMantık: Safely handles context availability for SSR compatibility
 */
export function ModeAwareNavbar({ serverMode }: ModeAwareNavbarProps) {
  // Try to get context, but don't throw if not available (SSR compatibility)
  const context = useContext(IntentContext);
  const clientMode = context?.mode;
  
  // Use serverMode first (from props), then client mode, then fallback
  const activeMode = serverMode || clientMode || 'INFORMATION_SEEKER';
  const isEmergency = activeMode === 'CRITICAL_EMERGENCY';

  // CRITICAL_EMERGENCY: Only GlobalAlertBar (PanicRecoveryUI renders its own navbar)
  if (isEmergency) {
    return <GlobalAlertBar />;
  }

  // All other modes (including TRUST_SEEKER): Standard Navbar
  // PremiumConciergeUI doesn't have its own header, it's only a content wrapper
  // VIP mode users still need navigation, so we show the standard Navbar
  return <Navbar isEmergency={false} />;
}


