'use client';

import { useEffect, useRef, useState } from 'react';

interface SmartDwellTrackerProps {
  initialDelay: number; // Initial threshold (e.g., 15000ms)
  idleThreshold: number; // Idle time after initial delay (e.g., 3000ms)
  onShow: () => void;
}

/**
 * SmartDwellTracker: Interaction-aware dwell time detection
 * Resets timer on scroll, mousemove, or keydown
 * Only shows when user stops interacting for idleThreshold AFTER initialDelay
 */
export function SmartDwellTracker({
  initialDelay,
  idleThreshold,
  onShow,
}: SmartDwellTrackerProps) {
  const [initialElapsed, setInitialElapsed] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const lastInteractionRef = useRef<number>(Date.now());
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const initialTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initial delay timer
    initialTimerRef.current = setTimeout(() => {
      setInitialElapsed(true);
    }, initialDelay);

    // Interaction handlers
    const handleInteraction = () => {
      lastInteractionRef.current = Date.now();
      setIsIdle(false);

      // Clear existing idle timer
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      // Only start idle timer if initial delay has passed
      if (initialElapsed) {
        idleTimerRef.current = setTimeout(() => {
          const timeSinceLastInteraction = Date.now() - lastInteractionRef.current;
          if (timeSinceLastInteraction >= idleThreshold) {
            setIsIdle(true);
            onShow();
          }
        }, idleThreshold);
      }
    };

    // Listen to multiple interaction types
    const events = ['scroll', 'mousemove', 'keydown', 'touchstart', 'click'];
    events.forEach((event) => {
      window.addEventListener(event, handleInteraction, { passive: true });
    });

    // Check idle state periodically after initial delay
    const idleCheckInterval = setInterval(() => {
      if (initialElapsed && !isIdle) {
        const timeSinceLastInteraction = Date.now() - lastInteractionRef.current;
        if (timeSinceLastInteraction >= idleThreshold) {
          setIsIdle(true);
          onShow();
        }
      }
    }, 500); // Check every 500ms

    return () => {
      if (initialTimerRef.current) clearTimeout(initialTimerRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      clearInterval(idleCheckInterval);
      events.forEach((event) => {
        window.removeEventListener(event, handleInteraction);
      });
    };
  }, [initialElapsed, isIdle, initialDelay, idleThreshold, onShow]);

  return null; // This component doesn't render anything
}


