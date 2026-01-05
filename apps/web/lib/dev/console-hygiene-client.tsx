'use client';

/**
 * Console Hygiene Client Component
 * Wraps installConsoleHygiene() to work in React Server Components context
 */

import { useEffect } from 'react';
import { installConsoleHygiene } from './console-hygiene';

export function ConsoleHygieneClient() {
  useEffect(() => {
    installConsoleHygiene();
  }, []);
  
  // Render nothing
  return null;
}

