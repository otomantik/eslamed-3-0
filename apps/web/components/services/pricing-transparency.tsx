import { Info } from 'lucide-react';

interface PricingTransparencyProps {
  title: string;
  content: string;
  accentColor?: string;
}

/**
 * PricingTransparency: Clear text block explaining valuation criteria
 * No specific prices - only transparency about how pricing works
 */
export function PricingTransparency({ title, content, accentColor = '#2563EB' }: PricingTransparencyProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8">
      <div className="flex items-start gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${accentColor}15` }}
        >
          <Info className="w-5 h-5" style={{ color: accentColor }} strokeWidth={1.5} />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">{title}</h2>
          <p className="text-slate-600 leading-relaxed" style={{ lineHeight: 1.8, fontSize: '18px' }}>
            {content}
          </p>
        </div>
      </div>
    </section>
  );
}



