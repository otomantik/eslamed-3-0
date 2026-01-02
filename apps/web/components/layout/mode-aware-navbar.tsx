'use client';

import { Navbar } from './navbar';
import { GlobalAlertBar } from '@/components/sections/global-alert-bar';
import { useIntent } from '@/context/IntentContext';
import type { IntentMode } from '@/lib/intent/detector';

interface ModeAwareNavbarProps {
  serverMode?: IntentMode;
}

/**
 * ModeAwareNavbar: Renders the correct navbar based on intent mode
 * - CRITICAL_EMERGENCY: GlobalAlertBar only (PanicRecoveryUI has its own navbar)
 * - TRUST_SEEKER: Standard Navbar (PremiumConciergeUI has its own header)
 * - Others: Standard Navbar
 */
export function ModeAwareNavbar({ serverMode }: ModeAwareNavbarProps) {
  const { mode } = useIntent();
  const activeMode = mode || serverMode || 'INFORMATION_SEEKER';
  const isEmergency = activeMode === 'CRITICAL_EMERGENCY';
  const isTrustSeeker = activeMode === 'TRUST_SEEKER';

  // CRITICAL_EMERGENCY: Only GlobalAlertBar (PanicRecoveryUI renders its own navbar)
  if (isEmergency) {
    return <GlobalAlertBar />;
  }

  // TRUST_SEEKER: Standard Navbar (PremiumConciergeUI has its own header, but we still show Navbar for consistency)
  // Actually, let's hide it for TRUST_SEEKER since PremiumConciergeUI has its own header
  if (isTrustSeeker) {
    return null;
  }

  // All other modes: Standard Navbar
  return <Navbar isEmergency={false} />;
}

