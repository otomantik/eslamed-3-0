'use client';

/**
 * useCTALock: CTA Orchestration Hook
 * ADSMantık Integrity Feature - Prevents CTA overlap conflicts
 * 
 * Ensures strict hierarchy: StickyPanicBar (Emergency) > BottomNav (Standard) > MobileFAB (Normal Modes Only)
 * Prevents "double phone" conflict in mobile viewports
 */

import { useIntent } from '@/context/IntentContext';
import { useMemo } from 'react';

export interface CTALockState {
  showBottomNav: boolean;
  showStickyPanicBar: boolean;
  showMobileFAB: boolean;
}

/**
 * Determines which CTA components should be visible based on intent mode
 * 
 * Hierarchy:
 * 1. CRITICAL_EMERGENCY: ONLY StickyPanicBar (no BottomNav, no FAB)
 * 2. TRUST_SEEKER (VIP): BottomNav only (no FAB)
 * 3. Default modes: BottomNav + MobileFAB (if exists)
 */
export function useCTALock(): CTALockState {
  const { mode } = useIntent();
  const isEmergency = mode === 'CRITICAL_EMERGENCY';
  const isVIP = mode === 'TRUST_SEEKER';

  return useMemo(() => {
    // Emergency mode: ONLY StickyPanicBar (no BottomNav, no FAB)
    if (isEmergency) {
      return {
        showBottomNav: false,
        showStickyPanicBar: true,
        showMobileFAB: false,
      };
    }

    // VIP mode: BottomNav only (no FAB)
    if (isVIP) {
      return {
        showBottomNav: true,
        showStickyPanicBar: false,
        showMobileFAB: false,
      };
    }

    // Default modes: BottomNav + MobileFAB (if exists)
    // ✅ ADSMantık: FAB only in default modes, not Emergency or VIP
    return {
      showBottomNav: true,
      showStickyPanicBar: false,
      showMobileFAB: !isEmergency && !isVIP,
    };
  }, [isEmergency, isVIP]);
}


