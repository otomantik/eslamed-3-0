'use client';

import { Plug, Droplets, Wind, Bell, LucideIcon } from 'lucide-react';

interface IconStripProps {
  icons?: Array<{ icon: LucideIcon; label: string }>;
}

/**
 * IconStrip: Visual preparation strip above checklists
 * Prepares the mind without repeating text
 */
export function IconStrip({
  icons = [
    { icon: Plug, label: 'Elektrik' },
    { icon: Droplets, label: 'Nemlendirme' },
    { icon: Wind, label: 'Hava Akışı' },
    { icon: Bell, label: 'Uyarılar' },
  ],
}: IconStripProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
      <div className="flex items-center justify-around gap-4 flex-wrap">
        {icons.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center gap-2 flex-1 min-w-[80px] transition-transform hover:scale-105"
            >
              <div className="w-12 h-12 rounded-xl border border-slate-200 bg-white flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-blue-600/60" strokeWidth={1.5} />
              </div>
              <span className="text-xs font-semibold text-slate-700 text-center">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}


