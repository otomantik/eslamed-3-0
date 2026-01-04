'use client';

import { Timeline, type TimelineStep } from '@/components/ui/timeline';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
  accentColor?: string;
}

/**
 * ProcessTimeline: Wrapper for Timeline component with service page styling
 * ✅ REFACTORED: Now uses generic Timeline component
 * 40-50+ friendly: Large numbers, clear icons, readable text
 */
export function ProcessTimeline({ steps, accentColor = '#2563EB' }: ProcessTimelineProps) {
  // Convert ProcessStep format to TimelineStep format
  const timelineSteps: TimelineStep[] = steps.map((step) => ({
    step: step.number,
    title: step.title,
    description: step.description,
  }));

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">Süreç Nasıl İlerler?</h2>
      <Timeline steps={timelineSteps} accentColor={accentColor} variant="horizontal" />
    </section>
  );
}

