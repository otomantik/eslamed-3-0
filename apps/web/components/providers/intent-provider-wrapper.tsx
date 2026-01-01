'use client';

import { Suspense } from 'react';
import { IntentProvider } from '@/context/IntentContext';
import type { IntentMode } from '@/lib/intent/detector';

interface IntentProviderWrapperProps {
  children: React.ReactNode;
  initialMode?: IntentMode;
  initialDistrict?: string;
  initialScore?: number;
  initialConfidence?: number;
}

/**
 * Wrapper that provides IntentContext to children
 * Must be used within a Suspense boundary when using useSearchParams
 */
export function IntentProviderWrapper({
  children,
  initialMode = 'INFORMATION_SEEKER',
  initialDistrict,
  initialScore = 0,
  initialConfidence = 0.65,
}: IntentProviderWrapperProps) {
  return (
    <IntentProvider
      initialMode={initialMode}
      initialDistrict={initialDistrict}
      initialScore={initialScore}
      initialConfidence={initialConfidence}
    >
      {children}
    </IntentProvider>
  );
}


