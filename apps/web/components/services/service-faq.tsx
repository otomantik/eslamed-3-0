'use client';

import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { ReactNode } from 'react';

interface FAQItem {
  question: string;
  answer: string | ReactNode;
}

interface ServiceFAQProps {
  faqs: FAQItem[];
}

/**
 * ServiceFAQ: 3-5 specific questions for service pages
 * Simple accordion with ReactNode support for links
 */
export function ServiceFAQ({ faqs }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">Hizmet Hakkında Sık Sorulanlar</h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden transition-all hover:border-slate-300"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left font-semibold text-slate-900 flex items-center justify-between min-h-[48px] focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2"
                aria-expanded={isOpen}
                aria-controls={`service-faq-content-${index}`}
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
                    id={`service-faq-content-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
                      {typeof faq.answer === 'string' ? faq.answer : faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

