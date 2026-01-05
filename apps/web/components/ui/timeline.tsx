'use client';

import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface TimelineStep {
  step: number | string;
  title: string;
  description: string;
  icon?: LucideIcon;
}

export interface TimelineProps {
  steps: TimelineStep[];
  accentColor?: string;
  variant?: 'horizontal' | 'vertical';
  showStepNumbers?: boolean;
  className?: string;
}

/**
 * Generic Timeline Component
 * ✅ Consolidated: Replaces ProcessTimeline, ServiceTimeline, and RentalProcess timeline logic
 * Supports both horizontal (service pages) and vertical (mode-specific) layouts
 */
export function Timeline({
  steps,
  accentColor = '#2563EB',
  variant = 'horizontal',
  showStepNumbers = true,
  className = '',
}: TimelineProps) {
  if (variant === 'vertical') {
    return (
      <div className={`relative ${className}`}>
        {/* Vertical Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 hidden md:block" />

        <div className="space-y-8">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="relative flex items-start gap-6">
                {/* Step circle with icon or number */}
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg relative z-10 shadow-lg"
                  style={{ backgroundColor: accentColor, color: 'white' }}
                >
                  {Icon ? (
                    <Icon className="w-6 h-6" strokeWidth={2} />
                  ) : (
                    <span>{item.step}</span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-xl p-6 border-2 border-slate-200 shadow-md hover:shadow-lg transition-shadow">
                  {showStepNumbers && !Icon && (
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-slate-500">Adım {item.step}</span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600" style={{ lineHeight: 1.8 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div key={index} className="relative">
            {/* Connector line (hidden on last item) */}
            {index < steps.length - 1 && (
              <div
                className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-slate-200 -z-10"
                style={{ width: 'calc(100% - 3rem)' }}
              />
            )}

            <div className="flex flex-col items-start">
              {/* Step number/icon circle */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4"
                style={{ backgroundColor: accentColor }}
              >
                {Icon ? <Icon className="w-6 h-6" strokeWidth={2} /> : <span>{step.step}</span>}
              </div>

              {/* Step content */}
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}


