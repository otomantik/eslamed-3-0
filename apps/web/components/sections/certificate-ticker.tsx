'use client';

import { CheckCircle2 } from 'lucide-react';

/**
 * CertificateTicker: Displays trust certificates in a scrolling marquee
 * Visible on all modes for trust signals
 * Full-width seamless infinite scrolling animation
 */
export function CertificateTicker() {
  const certificates = ['ISO 13485', 'CE Uygunluk', 'ÜTS Kayıtlı', '15+ Yıl Deneyim', 'TSE Onaylı'];

  // Create multiple sets for seamless infinite loop (4 sets total)
  const allCertificates = [...certificates, ...certificates, ...certificates, ...certificates];

  return (
    <section className="bg-white border-b border-slate-200 py-3 w-full overflow-hidden">
      <div className="relative w-full overflow-hidden">
        <div 
          className="flex items-center animate-marquee" 
          style={{ 
            animationDuration: '20s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            willChange: 'transform'
          }}
        >
          {allCertificates.map((cert, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 flex items-center gap-2 text-slate-700 font-semibold text-sm px-6"
            >
              <CheckCircle2 
                className="w-4 h-4 text-emerald-600 flex-shrink-0" 
                strokeWidth={1.5} 
              />
              <span className="whitespace-nowrap">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

