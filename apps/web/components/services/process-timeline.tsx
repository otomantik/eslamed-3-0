'use client';

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
 * ProcessTimeline: Visual 3-4 step horizontal timeline for service pages
 * 40-50+ friendly: Large numbers, clear icons, readable text
 */
export function ProcessTimeline({ steps, accentColor = '#2563EB' }: ProcessTimelineProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">Süreç Nasıl İlerler?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Connector line (hidden on last item) */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-slate-200 -z-10" style={{ width: 'calc(100% - 3rem)' }} />
            )}
            
            <div className="flex flex-col items-start">
              {/* Step number circle */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4"
                style={{ backgroundColor: accentColor }}
              >
                {step.number}
              </div>
              
              {/* Step content */}
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

