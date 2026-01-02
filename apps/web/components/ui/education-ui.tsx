'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Lazy load heavy components
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

  // SmartDwellTracker is now handled inside RequestQuoteSidebar component

  return (
    <>
      {/* Main Content - Hero altında */}
      <div className="bg-slate-50">
        {children}
      </div>

      {/* Request Quote Sidebar - Appears after 15s dwell */}
      {showSidebar && <RequestQuoteSidebar onClose={() => setShowSidebar(false)} />}
    </>
  );
}

