/**
 * Console Hygiene: DEV-only noise suppression
 * Senior Frontend Performance Engineer
 * 
 * Filters known noisy patterns while preserving real errors:
 * - preload-but-not-used warnings (Next.js font optimization)
 * - React DevTools tip message
 * - HMR/Fast Refresh chatter
 * 
 * Never suppresses:
 * - console.error (real application errors)
 * - TypeError, ReferenceError, etc.
 * - Failed fetch/XHR requests
 * - App-specific error handlers
 * 
 * Usage: Set NEXT_PUBLIC_CONSOLE_HYGIENE=1 in .env.local (dev only)
 */

'use client';

interface SuppressionStats {
  preload: number;
  hmr: number;
  reactDevTools: number;
}

// Patterns to suppress (exact string matching, case-insensitive)
const NOISY_PATTERNS = {
  // Next.js font preload warnings (woff2 files)
  preload: [
    /The resource .* was preloaded using link preload but not used/i,
    /was preloaded using link preload but not used within a few seconds/i,
  ],
  // HMR/Fast Refresh chatter
  hmr: [
    /\[HMR\] connected/i,
    /\[Fast Refresh\] rebuilding/i,
    /\[Fast Refresh\] done/i,
  ],
  // React DevTools tip
  reactDevTools: [
    /Download the React DevTools/i,
    /react\.dev\/link\/react-devtools/i,
  ],
} as const;

// Track suppressed messages for summary
let stats: SuppressionStats = {
  preload: 0,
  hmr: 0,
  reactDevTools: 0,
};

/**
 * Check if message matches a noisy pattern
 */
function shouldSuppress(message: string, category: keyof SuppressionStats): boolean {
  const patterns = NOISY_PATTERNS[category];
  return patterns.some(pattern => pattern.test(message));
}

/**
 * Intercept console.warn to filter noisy patterns
 */
function interceptConsoleWarn() {
  const originalWarn = console.warn;
  
  console.warn = function (...args: any[]) {
    const message = args.join(' ');
    
    // Check patterns in order of likelihood
    if (shouldSuppress(message, 'preload')) {
      stats.preload++;
      return; // Suppress
    }
    
    if (shouldSuppress(message, 'hmr')) {
      stats.hmr++;
      return; // Suppress
    }
    
    if (shouldSuppress(message, 'reactDevTools')) {
      stats.reactDevTools++;
      return; // Suppress
    }
    
    // Real warning - pass through
    originalWarn.apply(console, args);
  };
}

/**
 * Intercept console.info to filter HMR messages (some frameworks use info)
 */
function interceptConsoleInfo() {
  const originalInfo = console.info;
  
  console.info = function (...args: any[]) {
    const message = args.join(' ');
    
    // Only suppress HMR/Fast Refresh from console.info
    if (shouldSuppress(message, 'hmr')) {
      stats.hmr++;
      return; // Suppress
    }
    
    // Real info - pass through
    originalInfo.apply(console, args);
  };
}

/**
 * Print summary after page load
 */
function printSummary() {
  const total = stats.preload + stats.hmr + stats.reactDevTools;
  
  if (total > 0) {
    const parts = [];
    if (stats.preload > 0) parts.push(`preload=${stats.preload}`);
    if (stats.hmr > 0) parts.push(`hmr=${stats.hmr}`);
    if (stats.reactDevTools > 0) parts.push(`reactDevTools=${stats.reactDevTools}`);
    
    console.info(
      `%c[ConsoleHygiene] Suppressed: ${parts.join(', ')}`,
      'color: #666; font-style: italic;'
    );
  }
}

/**
 * Install console hygiene (DEV only)
 */
export function installConsoleHygiene() {
  // Safety check: only in development and when explicitly enabled
  if (
    typeof window === 'undefined' ||
    process.env.NODE_ENV !== 'development' ||
    process.env.NEXT_PUBLIC_CONSOLE_HYGIENE !== '1'
  ) {
    return;
  }
  
  // Intercept console methods
  interceptConsoleWarn();
  interceptConsoleInfo();
  
  // Print summary after page load
  if (document.readyState === 'complete') {
    printSummary();
  } else {
    window.addEventListener('load', printSummary, { once: true });
  }
  
  // Expose stats for debugging (dev only)
  if (typeof window !== 'undefined') {
    (window as any).__consoleHygieneStats = stats;
  }
}

