'use client';

import { useEffect, useState } from 'react';
import { BookOpen, FileText, CheckCircle2 } from 'lucide-react';
import dynamic from 'next/dynamic';

// Lazy load heavy components
const ComparisonTable = dynamic(() => import('./comparison-table').then((m) => ({ default: m.ComparisonTable })), {
  ssr: false,
});
const TechnicalSpecToggle = dynamic(() => import('./technical-spec-toggle').then((m) => ({ default: m.TechnicalSpecToggle })), {
  ssr: false,
});
const RequestQuoteSidebar = dynamic(() => import('./request-quote-sidebar').then((m) => ({ default: m.RequestQuoteSidebar })), {
  ssr: false,
});

/**
 * EducationUI: RESEARCH mode - Auto-expand FAQ, comparison tables, dwell-time sidebar
 */
export function EducationUI({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false);

  // Auto-expand FAQ after mount
  useEffect(() => {
    const faqSections = document.querySelectorAll('[data-faq-section]');
    faqSections.forEach((section) => {
      const button = section.querySelector('button[aria-expanded]');
      if (button && button.getAttribute('aria-expanded') === 'false') {
        (button as HTMLButtonElement).click();
      }
    });
  }, []);

  // Dwell time detection: Show sidebar after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSidebar(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Trust Proof Marquee - High-speed logo carousel */}
      <section className="bg-white border-b border-slate-200 py-3 overflow-hidden">
        <div className="relative">
          <div className="flex items-center gap-8 animate-marquee" style={{ animationDuration: '20s' }}>
            {['ISO 13485', 'CE Uygunluk', 'ÜTS Kayıtlı', '15+ Yıl Deneyim', 'TSE Onaylı'].map((badge, idx) => (
              <div key={idx} className="flex-shrink-0 flex items-center gap-2 text-slate-700 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
                <span>{badge}</span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {['ISO 13485', 'CE Uygunluk', 'ÜTS Kayıtlı', '15+ Yıl Deneyim', 'TSE Onaylı'].map((badge, idx) => (
              <div key={`dup-${idx}`} className="flex-shrink-0 flex items-center gap-2 text-slate-700 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content with Comparison Table & Spec Toggle */}
      <div className="container-wide py-8">
        {/* Comparison Table - Immediately under H1 */}
        <div className="mb-8">
          <ComparisonTable />
        </div>

        {/* Technical Spec Toggle */}
        <div className="mb-8">
          <TechnicalSpecToggle />
        </div>

        {/* Main Content */}
        {children}

        {/* Request Quote Sidebar - Appears after 15s dwell */}
        {showSidebar && <RequestQuoteSidebar onClose={() => setShowSidebar(false)} />}
      </div>
    </div>
  );
}

