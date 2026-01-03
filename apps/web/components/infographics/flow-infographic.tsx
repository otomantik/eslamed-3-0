'use client';

import { X, AlertTriangle, TrendingDown, CheckCircle2, ArrowRight, LucideIcon } from 'lucide-react';

type IconName = 'X' | 'AlertTriangle' | 'TrendingDown' | 'CheckCircle2';

interface FlowStep {
  icon: IconName;
  label: string;
  status: 'negative' | 'warning' | 'positive';
  description?: string;
}

// Icon mapping - maps string names to actual components
const iconMap: Record<IconName, LucideIcon> = {
  X,
  AlertTriangle,
  TrendingDown,
  CheckCircle2,
};

interface FlowInfographicProps {
  steps?: FlowStep[];
  orientation?: 'horizontal' | 'vertical';
}

/**
 * FlowInfographic: Visual flow diagram for cause-effect relationships
 * Zero external images, pure CSS/SVG
 */
export function FlowInfographic({
  steps = [
    {
      icon: 'X',
      label: 'Musluk Suyu',
      status: 'negative',
      description: 'Kireç riski',
    },
    {
      icon: 'AlertTriangle',
      label: 'Kireç Birikimi',
      status: 'warning',
      description: 'Cihaz performansı',
    },
    {
      icon: 'TrendingDown',
      label: 'Cihaz Ömrü',
      status: 'negative',
      description: 'Kısalır',
    },
  ],
  orientation = 'horizontal',
}: FlowInfographicProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div className={`flex ${isHorizontal ? 'flex-row items-center' : 'flex-col items-start'} gap-4 p-6 bg-slate-50/30 rounded-2xl`}>
      {steps.map((step, index) => {
        const IconComponent = iconMap[step.icon];
        const isLast = index === steps.length - 1;
        const colorClasses = {
          negative: 'text-red-600 bg-red-50 border-red-200',
          warning: 'text-amber-600 bg-amber-50 border-amber-200',
          positive: 'text-emerald-600 bg-emerald-50 border-emerald-200',
        };

        return (
          <div key={index} className={`flex ${isHorizontal ? 'flex-col items-center' : 'flex-row items-center'} gap-3 flex-1`}>
            {/* Step Card */}
            <div
              className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 ${colorClasses[step.status]} min-w-[120px] transition-all hover:scale-105 hover:shadow-md`}
            >
              <IconComponent
                className={`w-8 h-8 ${step.status === 'warning' ? 'animate-pulse' : ''}`}
                strokeWidth={2}
              />
              <span className="text-sm font-semibold text-center">{step.label}</span>
              {step.description && (
                <span className="text-xs text-slate-600 text-center">{step.description}</span>
              )}
            </div>

            {/* Arrow (SVG) */}
            {!isLast && (
              <div className={`flex-shrink-0 ${isHorizontal ? 'w-8' : 'h-8'} flex items-center justify-center`}>
                <ArrowRight
                  className={`w-6 h-6 text-slate-400 ${isHorizontal ? '' : 'rotate-90'}`}
                  strokeWidth={2}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

