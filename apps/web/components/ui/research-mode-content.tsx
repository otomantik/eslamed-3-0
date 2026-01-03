'use client';

import dynamic from 'next/dynamic';

// Lazy load RESEARCH mode components
const ComparisonTable = dynamic(
  () => import('./comparison-table').then((m) => ({ default: m.ComparisonTable })),
  { ssr: false }
);
const TechnicalSpecToggle = dynamic(
  () => import('./technical-spec-toggle').then((m) => ({ default: m.TechnicalSpecToggle })),
  { ssr: false }
);

/**
 * ResearchModeContent: Comparison Table & Technical Specs for RESEARCH mode
 * Renders after Hero, before other content
 */
export function ResearchModeContent() {
  return (
    <div className="container-wide py-8">
      <div className="mb-8">
        <ComparisonTable />
      </div>
      <div className="mb-8">
        <TechnicalSpecToggle />
      </div>
    </div>
  );
}



