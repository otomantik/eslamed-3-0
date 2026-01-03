'use client';

import { ShieldCheck, ArrowUp, Settings, Lock, ArrowRight } from 'lucide-react';

interface ProcessStep {
  icon: 'ShieldCheck' | 'ArrowUp' | 'Settings' | 'Lock';
  title: string;
  description: string;
}

interface ProcessTrackerProps {
  steps?: ProcessStep[];
}

// Icon mapping
const iconMap = {
  ShieldCheck,
  ArrowUp,
  Settings,
  Lock,
};

/**
 * ProcessTracker: Horizontal process flow with connecting lines
 * 4-step grid layout with icons and descriptions
 */
export function ProcessTracker({
  steps = [
    {
      icon: 'ShieldCheck',
      title: 'Güvenlik kontrolü',
      description: 'Elektrik topraklama ve kablo güvenliğini kontrol edin',
    },
    {
      icon: 'ArrowUp',
      title: 'Baş/Sırt Yüksekliği',
      description: 'Hasta konforunu gözeterek yavaşça ayarlayın',
    },
    {
      icon: 'Settings',
      title: 'Ayak ayarı',
      description: 'Kan dolaşımını desteklemek için küçük adımlarla ayarlayın',
    },
    {
      icon: 'Lock',
      title: 'Kilit ve kablo düzeni',
      description: 'Düşme önleme için teker kilitlerini ve kabloları kontrol edin',
    },
  ],
}: ProcessTrackerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 relative">
      {/* SVG Flow Lines - Subtle connecting lines between steps */}
      <svg className="hidden md:block absolute top-12 left-0 right-0 h-1 pointer-events-none" style={{ top: '3rem' }}>
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#2563EB" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <line
          x1="12.5%"
          y1="0.5"
          x2="87.5%"
          y2="0.5"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </svg>
      
      {steps.map((step, index) => {
        const IconComponent = iconMap[step.icon];
        const isLast = index === steps.length - 1;
        
        return (
          <div key={index} className="relative group">
            {/* Step Card */}
            <div className="relative bg-white rounded-xl border-2 border-blue-200 p-6 text-center transition-all hover:shadow-md hover:border-blue-400 hover:scale-105">
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#2563EB] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg group-hover:bg-[#1D4ED8] transition-colors">
                {index + 1}
              </div>
              
              {/* Icon */}
              <div className="mt-4 mb-3 flex justify-center">
                <div className="w-16 h-16 rounded-xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center group-hover:bg-blue-100 group-hover:border-blue-300 transition-colors">
                  <IconComponent className="w-8 h-8 text-[#2563EB] group-hover:text-[#1D4ED8] transition-colors" strokeWidth={1.5} />
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-base font-semibold text-[#0F172A] mb-2 group-hover:text-[#2563EB] transition-colors">{step.title}</h3>
              
              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                {step.description}
              </p>
            </div>
            
            {/* Arrow Connector - Desktop Only */}
            {!isLast && (
              <div className="hidden md:block absolute top-12 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-8 h-8 bg-white rounded-full border-2 border-blue-300 flex items-center justify-center shadow-sm group-hover:border-[#2563EB] group-hover:bg-blue-50 transition-colors">
                  <ArrowRight className="w-4 h-4 text-[#2563EB] group-hover:text-[#1D4ED8] transition-colors" strokeWidth={2} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

