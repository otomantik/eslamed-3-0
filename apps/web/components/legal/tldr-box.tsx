import type { ReactNode } from 'react';
import { Info } from 'lucide-react';

export function TLDRBox({ title = 'Özet', children }: { title?: string; children: ReactNode }) {
  return (
    <aside
      role="note"
      className="rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-7"
    >
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl border border-blue-200 bg-white/70 flex items-center justify-center flex-shrink-0" aria-hidden="true">
          <Info className="w-5 h-5 text-blue-700" strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <div className="text-base font-semibold text-slate-900">{title}</div>
          <div className="mt-2 text-sm text-slate-700 leading-relaxed" style={{ lineHeight: 1.8 }}>
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}


