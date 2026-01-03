'use client';

import { ReactNode } from 'react';
import { useIntent } from '@/context/IntentContext';

interface IntentWrapperProps {
  children: (intent: ReturnType<typeof useIntent>) => ReactNode;
  fallback?: ReactNode;
}

/**
 * IntentWrapper: Conditionally renders UI based on intent mode
 * Prevents CLS by maintaining consistent layout structure
 */
export function IntentWrapper({ children, fallback }: IntentWrapperProps) {
  const intent = useIntent();

  // Prevent layout shift: always render, but conditionally style
  return (
    <div data-intent-mode={intent.mode} className="intent-wrapper">
      {children(intent)}
    </div>
  );
}

/**
 * Mode-specific text tone helpers
 */
export function getToneForMode(mode: string): 'urgent' | 'calm' | 'premium' {
  if (mode === 'CRITICAL_EMERGENCY') return 'urgent';
  if (mode === 'TRUST_SEEKER' || mode === 'INFORMATION_SEEKER') return 'calm';
  return 'premium';
}



