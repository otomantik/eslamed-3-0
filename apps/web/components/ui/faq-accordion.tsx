'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  autoExpand?: boolean;
  staggerDelay?: number; // Delay between each item (ms)
  onFaqClick?: (faqId: string) => void; // Callback for tracking FAQ interactions
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 100ms delay between children
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.2 },
      y: { duration: 0.3 },
    },
  },
};

const contentVariants = {
  collapsed: { opacity: 0, height: 0 },
  expanded: {
    opacity: 1,
    height: 'auto',
    transition: {
      opacity: { duration: 0.2, delay: 0.1 },
      height: { duration: 0.3 },
    },
  },
};

/**
 * FAQAccordion: Staggered reveal with Framer Motion
 * Auto-expands in RESEARCH mode with 100ms delay between items
 * Supports click tracking for predictive CTA injection
 */
export function FAQAccordion({ faqs, autoExpand = false, staggerDelay = 100, onFaqClick }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [announced, setAnnounced] = useState(false);

  // Auto-expand with staggered delay
  useEffect(() => {
    if (autoExpand && faqs.length > 0) {
      faqs.forEach((faq, index) => {
        setTimeout(() => {
          setOpenItems((prev) => new Set(prev).add(faq.id));
        }, index * staggerDelay);
      });

      // Announce auto-expansion after a short delay
      setTimeout(() => {
        const liveRegion = document.getElementById('aria-live-announcements');
        if (liveRegion && !announced) {
          liveRegion.textContent = 'SSS bölümü otomatik olarak açıldı. Tüm sorular görüntüleniyor.';
          setAnnounced(true);
          setTimeout(() => {
            liveRegion.textContent = '';
          }, 3000);
        }
      }, faqs.length * staggerDelay + 500);
    }
  }, [autoExpand, faqs, staggerDelay, announced]);

  const toggleItem = (id: string) => {
    // Check if item is currently closed (will be opened)
    const willBeOpened = !openItems.has(id);
    
    setOpenItems((prev) => {
      const next = new Set(prev);
      const wasOpen = next.has(id);
      if (wasOpen) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    
    // Track FAQ click for predictive CTA injection (only count opens, not closes)
    // Call outside state updater to avoid setState during render warning
    if (willBeOpened && onFaqClick) {
      // Use requestAnimationFrame to defer callback until after React's state update completes
      requestAnimationFrame(() => {
        onFaqClick(id);
      });
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
      aria-live="polite"
    >
      {faqs.map((faq) => {
        const isOpen = openItems.has(faq.id);
        return (
          <motion.div
            key={faq.id}
            variants={itemVariants}
            data-faq-section
            className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden transition-all hover:border-slate-300"
          >
            <button
              onClick={() => toggleItem(faq.id)}
              className="w-full px-6 py-4 text-left font-semibold text-slate-900 flex items-center justify-between min-h-[48px] focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2"
              aria-expanded={isOpen}
              aria-controls={`faq-content-${faq.id}`}
            >
              <span>{faq.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-slate-400 flex-shrink-0 ml-4"
              >
                <ChevronDown className="w-5 h-5" strokeWidth={1.5} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-content-${faq.id}`}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  variants={contentVariants}
                  className="overflow-hidden"
                  style={{ containIntrinsicSize: 'auto 100px' }}
                >
                  <div className="px-6 pb-4 text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

