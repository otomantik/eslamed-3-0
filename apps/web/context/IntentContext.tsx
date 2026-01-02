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
  trackIntentShift?: (prev: IntentMode, next: IntentMode) => Promise<void>;
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
  
  // Load district from sessionStorage on mount for persistence
  const [district, setDistrict] = useState<string | undefined>(() => {
    if (typeof window !== 'undefined') {
      const persistedDistrict = sessionStorage.getItem('eslamed_district');
      return persistedDistrict || initialDistrict;
    }
    return initialDistrict;
  });
  
  const [mode, setMode] = useState<IntentMode>(initialMode);
  const [score, setScore] = useState(initialScore);
  const [confidence, setConfidence] = useState(initialConfidence);
  const [isLoading, setIsLoading] = useState(false);
  const [previousMode, setPreviousMode] = useState<IntentMode | undefined>(initialMode);
  
  // Track intent shift function for High-Intent Conversion Signal
  const trackIntentShift = async (prev: IntentMode, next: IntentMode) => {
    if (prev === 'INFORMATION_SEEKER' && next === 'CRITICAL_EMERGENCY') {
      // High-Intent Conversion Signal: Bu veri altın değerinde!
      if (typeof window !== 'undefined') {
        const sessionId = sessionStorage.getItem('eslamed_session_id') || `session_${Date.now()}`;
        sessionStorage.setItem('eslamed_session_id', sessionId);
        
        await fetch('/api/demand_logs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'intent_shift',
            subtype: 'High_Intent_Conversion_Signal',
            previousMode: prev,
            newMode: next,
            sessionId,
            timestamp: new Date().toISOString(),
          }),
          keepalive: true,
        }).catch(() => {
          // Silent fail for analytics
        });
      }
    }
  };
  
  // Persist district to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && district) {
      sessionStorage.setItem('eslamed_district', district);
    }
  }, [district]);

  useEffect(() => {
    // Extract mode from URL searchParams (e.g., ?mode=URGENT or ?mode=urgent)
    const modeParam = searchParams.get('mode');
    const districtParam = searchParams.get('district');

    if (modeParam) {
      // User-friendly aliases
      const modeAliases: Record<string, IntentMode> = {
        'urgent': 'CRITICAL_EMERGENCY',
        'research': 'INFORMATION_SEEKER',
        'vip': 'TRUST_SEEKER',
        'price': 'PRICE_SENSITIVE',
        'rental': 'COMMERCIAL_RENTAL',
      };

      const validModes: IntentMode[] = [
        'CRITICAL_EMERGENCY',
        'TRUST_SEEKER',
        'PRICE_SENSITIVE',
        'COMMERCIAL_RENTAL',
        'INFORMATION_SEEKER',
      ];

      // Check alias first, then direct mode
      const normalizedMode = modeAliases[modeParam.toLowerCase()] || modeParam.toUpperCase();
      
      if (validModes.includes(normalizedMode as IntentMode)) {
        const newMode = normalizedMode as IntentMode;
        
        // Track intent mode shift for conversion signals
        setPreviousMode((prev) => {
          const oldMode = prev || mode;
          
          // Detect high-intent conversion: research -> urgent
          if (oldMode === 'INFORMATION_SEEKER' && newMode === 'CRITICAL_EMERGENCY') {
            // Log High_Intent_Conversion_Signal
            if (typeof window !== 'undefined') {
              const sessionId = sessionStorage.getItem('eslamed_session_id') || `session_${Date.now()}`;
              fetch('/api/demand_logs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  type: 'intent_shift',
                  subtype: 'High_Intent_Conversion_Signal',
                  previousMode: oldMode,
                  newMode: newMode,
                  sessionId,
                  timestamp: new Date().toISOString(),
                }),
                keepalive: true,
              }).catch(() => {
                // Silent fail
              });
            }
          }
          
          return oldMode;
        });
        
        setMode(newMode);
      }
    }

    if (districtParam) {
      setDistrict(districtParam);
      // Persist to sessionStorage immediately
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('eslamed_district', districtParam);
      }
    } else if (typeof window !== 'undefined') {
      // If no district param, try to load from sessionStorage
      const persistedDistrict = sessionStorage.getItem('eslamed_district');
      if (persistedDistrict && !district) {
        setDistrict(persistedDistrict);
      }
    }

    // Log mode switch to demand_logs (if session ID exists)
    if (modeParam && typeof window !== 'undefined') {
      const sessionId = sessionStorage.getItem('eslamed_session_id') || `session_${Date.now()}`;
      sessionStorage.setItem('eslamed_session_id', sessionId);

      // Resolve final mode for logging
      const modeAliases: Record<string, IntentMode> = {
        'urgent': 'CRITICAL_EMERGENCY',
        'research': 'INFORMATION_SEEKER',
        'vip': 'TRUST_SEEKER',
        'price': 'PRICE_SENSITIVE',
        'rental': 'COMMERCIAL_RENTAL',
      };
      const finalMode = modeAliases[modeParam.toLowerCase()] || modeParam.toUpperCase();

      // Fire-and-forget logging
      fetch('/api/demand_logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'intent_switch',
          mode: finalMode,
          originalParam: modeParam,
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
        trackIntentShift,
      }}
    >
      {children}
    </IntentContext.Provider>
  );
}

