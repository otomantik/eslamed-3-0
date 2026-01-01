'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface FocusTrapProps {
  children: ReactNode;
  enabled: boolean;
  focusableSelectors?: string;
}

/**
 * FocusTrap: Traps keyboard focus within a container
 * Used in URGENT mode to limit navigation to critical actions only
 */
export function FocusTrap({ children, enabled, focusableSelectors = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])' }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors));

    // Filter out disabled and hidden elements
    const visibleFocusable = focusableElements.filter((el) => {
      return (
        !el.hasAttribute('disabled') &&
        !el.hasAttribute('aria-hidden') &&
        el.offsetWidth > 0 &&
        el.offsetHeight > 0
      );
    });

    if (visibleFocusable.length === 0) return;

    const firstElement = visibleFocusable[0];
    const lastElement = visibleFocusable[visibleFocusable.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      // If only one element, prevent tabbing
      if (visibleFocusable.length === 1) {
        e.preventDefault();
        firstElement.focus();
        return;
      }

      // If Shift+Tab on first element, move to last
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
        return;
      }

      // If Tab on last element, move to first
      if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
        return;
      }
    };

    // Focus first element on mount
    firstElement.focus();

    document.addEventListener('keydown', handleTabKey);

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [enabled, focusableSelectors]);

  return <div ref={containerRef}>{children}</div>;
}

