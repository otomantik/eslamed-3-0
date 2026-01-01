'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import type { IntentMode } from '@/lib/intent/detector';

export type IntentContextValue = {
  mode: IntentMode;
  district?: string;
  score: number;
  confidence: number;
  isLoading: boolean;
};

const IntentContext = createContext<IntentContextValue | undefined>(undefined);

export function useIntent() {
  const ctx = useContext(IntentContext);
  if (!ctx) {
    throw new Error('useIntent must be used within IntentProvider');
  }
  return ctx;
}

interface IntentProviderProps {
  children: ReactNode;
  initialMode?: IntentMode;
  initialDistrict?: string;
  initialScore?: number;
  initialConfidence?: number;
}

export function IntentProvider({
  children,
  initialMode = 'INFORMATION_SEEKER',
  initialDistrict,
  initialScore = 0,
  initialConfidence = 0.65,
}: IntentProviderProps) {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<IntentMode>(initialMode);
  const [district, setDistrict] = useState<string | undefined>(initialDistrict);
  const [score, setScore] = useState(initialScore);
  const [confidence, setConfidence] = useState(initialConfidence);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Extract mode from URL searchParams (e.g., ?mode=URGENT)
    const modeParam = searchParams.get('mode');
    const districtParam = searchParams.get('district');

    if (modeParam) {
      const validModes: IntentMode[] = [
        'CRITICAL_EMERGENCY',
        'TRUST_SEEKER',
        'PRICE_SENSITIVE',
        'COMMERCIAL_RENTAL',
        'INFORMATION_SEEKER',
      ];
      if (validModes.includes(modeParam as IntentMode)) {
        setMode(modeParam as IntentMode);
      }
    }

    if (districtParam) {
      setDistrict(districtParam);
    }

    // Log mode switch to demand_logs (if session ID exists)
    if (modeParam && typeof window !== 'undefined') {
      const sessionId = sessionStorage.getItem('eslamed_session_id') || `session_${Date.now()}`;
      sessionStorage.setItem('eslamed_session_id', sessionId);

      // Fire-and-forget logging
      fetch('/api/demand_logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'intent_switch',
          mode: modeParam,
          district: districtParam || null,
          sessionId,
          timestamp: new Date().toISOString(),
        }),
        keepalive: true,
      }).catch(() => {
        // Silent fail
      });
    }
  }, [searchParams]);

  return (
    <IntentContext.Provider
      value={{
        mode,
        district,
        score,
        confidence,
        isLoading,
      }}
    >
      {children}
    </IntentContext.Provider>
  );
}

