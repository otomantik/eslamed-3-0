'use client';

import { useEffect, useMemo, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const HIDE_KEY = 'eslamed_sticky_support_hidden';

export function StickySupport() {
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const href = useMemo(() => {
    const msg = 'Merhaba, bir sorum vardı. Yardım alabilir miyim?';
    return `https://wa.me/905372425535?text=${encodeURIComponent(msg)}`;
  }, []);

  useEffect(() => {
    try {
      setHidden(localStorage.getItem(HIDE_KEY) === '1');
    } catch {
      setHidden(false);
    }
  }, []);

  useEffect(() => {
    if (hidden) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const shouldShow = y > 300;
        setVisible(shouldShow);
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [hidden]);

  // Tooltip: show once when it first becomes visible, then disappear after 5s
  useEffect(() => {
    if (hidden) return;
    if (!visible) return;
    setShowTip(true);
    const t = window.setTimeout(() => setShowTip(false), 5000);
    return () => window.clearTimeout(t);
  }, [visible, hidden]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 lg:hidden transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none'
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto max-w-xl">
        <div className="relative rounded-2xl border border-slate-200 bg-white shadow-lg">
          {showTip && (
            <div className="absolute -top-10 left-4">
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm">
                Sorunuz mu var?
              </div>
            </div>
          )}

          <div className="flex items-stretch">
            <a
              href={href}
              className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-white px-6 text-base font-semibold hover:bg-emerald-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
              Hızlı Destek
            </a>
            <button
              type="button"
              aria-label="Kapat"
              className="min-w-[48px] min-h-[48px] inline-flex items-center justify-center rounded-2xl border-l border-slate-200 text-slate-600 hover:bg-slate-50"
              onClick={() => {
                try {
                  localStorage.setItem(HIDE_KEY, '1');
                } catch {}
                setHidden(true);
              }}
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


