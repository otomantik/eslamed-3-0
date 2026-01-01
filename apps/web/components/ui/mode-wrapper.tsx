'use client';

import { ReactNode } from 'react';
import { useIntent } from '@/context/IntentContext';
import dynamic from 'next/dynamic';
import type { IntentMode } from '@/lib/intent/detector';

// Lazy load mode-specific UI components
const PanicRecoveryUI = dynamic(() => import('./panic-recovery-ui').then((m) => ({ default: m.PanicRecoveryUI })), {
  ssr: false,
});
const EducationUI = dynamic(() => import('./education-ui').then((m) => ({ default: m.EducationUI })), {
  ssr: false,
});
const PremiumConciergeUI = dynamic(() => import('./premium-concierge-ui').then((m) => ({ default: m.PremiumConciergeUI })), {
  ssr: false,
});
const StickyPanicBar = dynamic(() => import('./sticky-panic-bar').then((m) => ({ default: m.StickyPanicBar })), {
  ssr: false,
});

interface ModeWrapperProps {
  children: ReactNode;
  serverMode?: IntentMode; // Server-detected mode (for SSR)
}

/**
 * ModeWrapper: Deep Masking v3 - Conditionally wraps content based on intent mode
 */
export function ModeWrapper({ children, serverMode }: ModeWrapperProps) {
  const { mode } = useIntent();
  const activeMode = mode || serverMode || 'INFORMATION_SEEKER';

  // URGENT mode: PanicRecoveryUI (removes header/footer, action-focused)
  if (activeMode === 'CRITICAL_EMERGENCY') {
    return (
      <>
        <PanicRecoveryUI>{children}</PanicRecoveryUI>
        <StickyPanicBar />
      </>
    );
  }

  // RESEARCH mode: EducationUI (auto-expand FAQ, comparison tables)
  if (activeMode === 'INFORMATION_SEEKER') {
    return <EducationUI>{children}</EducationUI>;
  }

  // VIP mode: PremiumConciergeUI (serif fonts, premium copy)
  if (activeMode === 'TRUST_SEEKER') {
    return <PremiumConciergeUI>{children}</PremiumConciergeUI>;
  }

  // DEFAULT: Render children as-is (standard UI)
  return <>{children}</>;
}


