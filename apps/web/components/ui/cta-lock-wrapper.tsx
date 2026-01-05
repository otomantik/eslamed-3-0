'use client';

/**
 * CTALockWrapper: CTA Orchestration Component
 * ADSMantık Integrity Feature - Prevents CTA overlap conflicts
 * 
 * Wraps all CTA components (BottomNav, StickyPanicBar) and ensures
 * only the appropriate CTAs are rendered based on intent mode
 */

import { BottomNav } from './bottom-nav';
import { useCTALock } from '@/lib/hooks/use-cta-lock';

/**
 * CTALockWrapper Component
 * Renders CTA components based on useCTALock hook state
 * 
 * Hierarchy enforced:
 * 1. Emergency: StickyPanicBar only (handled in ModeWrapper)
 * 2. VIP: BottomNav only
 * 3. Default: BottomNav + MobileFAB (if exists)
 */
export function CTALockWrapper() {
  const ctaLock = useCTALock();

  // ✅ ADSMantık: Only render BottomNav if ctaLock allows it
  // StickyPanicBar is handled inside ModeWrapper for Emergency mode
  // This ensures no overlap between BottomNav and StickyPanicBar
  return (
    <>
      {ctaLock.showBottomNav && <BottomNav />}
      {/* MobileFAB can be added here when implemented */}
      {/* StickyPanicBar is rendered in ModeWrapper for Emergency mode */}
    </>
  );
}


