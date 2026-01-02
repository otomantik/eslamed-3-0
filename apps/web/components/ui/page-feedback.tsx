'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, X } from 'lucide-react';

/**
 * PageFeedback: Simple feedback widget above footer
 * Captures user sentiment before exit
 */
export function PageFeedback() {
  const [isOpen, setIsOpen] = useState(true);
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = (type: 'positive' | 'negative') => {
    setFeedback(type);
    setSubmitted(true);

    // Track feedback
    if (typeof window !== 'undefined') {
      const sessionId = sessionStorage.getItem('eslamed_session_id') || `session_${Date.now()}`;
      const pathname = window.location.pathname;
      
      fetch('/api/demand_logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'feedback',
          subtype: type,
          pathname,
          sessionId,
          timestamp: new Date().toISOString(),
        }),
        keepalive: true,
      }).catch(() => {});

      // Hide after 2 seconds
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bg-slate-50 border-t border-slate-200 py-6">
      <div className="container-wide">
        <div className="max-w-2xl mx-auto">
          {!submitted ? (
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900 mb-1">
                  Bu sayfa size yardımcı oldu mu?
                </p>
                <p className="text-xs text-slate-600">
                  Geri bildiriminiz bizim için değerli
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleFeedback('positive')}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
                  aria-label="Olumlu geri bildirim"
                >
                  <ThumbsUp className="w-5 h-5 text-slate-600" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => handleFeedback('negative')}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-red-50 hover:border-red-300 transition-colors"
                  aria-label="Olumsuz geri bildirim"
                >
                  <ThumbsDown className="w-5 h-5 text-slate-600" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                  aria-label="Kapat"
                >
                  <X className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm font-semibold text-emerald-600">
                {feedback === 'positive' ? 'Teşekkür ederiz!' : 'Geri bildiriminiz için teşekkürler'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

