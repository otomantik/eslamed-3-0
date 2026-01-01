'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, ArrowUpRight, MessageCircle, X } from 'lucide-react';
import {
  isOrthopedicIntent,
  normalizeQuery,
  searchConfig,
  type SearchItem,
} from '@/lib/search/search-config';
import { logSearchTelemetry } from '@/lib/search/search-telemetry';

type FuseLike = {
  search: (q: string) => Array<{ item: SearchItem; score?: number }>;
};

type OpenSearchDetail = {
  prefill?: string;
};

function buildWhatsAppUrl(text: string) {
  return `https://wa.me/905372425535?text=${encodeURIComponent(text)}`;
}

async function loadIndex(): Promise<SearchItem[]> {
  const res = await fetch('/search-index.json', { cache: 'force-cache' });
  return (await res.json()) as SearchItem[];
}

export function SearchModal() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [items, setItems] = useState<SearchItem[] | null>(null);
  const [fuse, setFuse] = useState<FuseLike | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // If navbar triggered search before this chunk mounted, consume pending request.
  useEffect(() => {
    const pending = (window as any).__eslamed_search_pending as { prefill?: string } | undefined;
    if (pending) {
      setOpen(true);
      if (typeof pending.prefill === 'string' && pending.prefill.trim()) {
        setQ(pending.prefill);
      }
      (window as any).__eslamed_search_pending = undefined;
    }
  }, []);

  // Keyboard: Cmd/Ctrl + K
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isK = e.key.toLowerCase() === 'k';
      const isCmdK = (e.metaKey || e.ctrlKey) && isK;
      if (isCmdK) {
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Programmatic open from Navbar inputs
  useEffect(() => {
    function onOpenSearch(e: Event) {
      const detail = (e as CustomEvent<OpenSearchDetail>).detail || {};
      setOpen(true);
      if (typeof detail.prefill === 'string' && detail.prefill.trim()) {
        setQ(detail.prefill);
      }
    }
    window.addEventListener('eslamed:open-search', onOpenSearch as any);
    return () => window.removeEventListener('eslamed:open-search', onOpenSearch as any);
  }, []);

  // Lazy-load index + fuse only when opening
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();

    let cancelled = false;
    (async () => {
      const list = items ?? (await loadIndex());
      if (!cancelled && !items) setItems(list);

      if (!fuse) {
        const Fuse = (await import('fuse.js')).default;
        const f = new Fuse(list, {
          keys: ['title', 'synonyms', 'tags', 'category'],
          threshold: searchConfig.fuse.threshold,
          minMatchCharLength: searchConfig.fuse.minMatchCharLength,
          ignoreLocation: true,
          includeScore: true,
        }) as unknown as FuseLike;
        if (!cancelled) setFuse(f);
      }

      // Log open (light)
      logSearchTelemetry({ term: normalizeQuery(q), resultCount: -1, action: 'open' });
    })();

    return () => {
      cancelled = true;
    };
  }, [open, items, fuse, q]);

  const results = useMemo(() => {
    const nq = normalizeQuery(q);
    if (!nq || !fuse) return [];

    const raw = fuse.search(nq).map((r) => r.item);
    let limited = raw.slice(0, searchConfig.maxResults);

    // VIP pinning: always show Kişiye Özel Tabanlık for ortho intent (even if fuzzy misses)
    if (items && isOrthopedicIntent(nq)) {
      const vip = items.find((x) => x.id === searchConfig.vip.itemId);
      if (vip) {
        const withoutVip = limited.filter((x) => x.id !== vip.id);
        limited = [vip, ...withoutVip].slice(0, searchConfig.maxResults);
      }
    }

    return limited;
  }, [q, fuse, items]);

  // Log term + 0-results (debounced)
  useEffect(() => {
    if (!open) return;
    const nq = normalizeQuery(q);
    if (!nq) return;

    const t = window.setTimeout(() => {
      logSearchTelemetry({ term: nq, resultCount: results.length });
    }, 350);

    return () => window.clearTimeout(t);
  }, [q, results.length, open]);

  if (!open) return null;

  const nq = normalizeQuery(q);
  const showEmpty = nq.length > 0 && results.length === 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site içi arama"
      className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm flex items-start justify-center p-4 pt-24"
      onMouseDown={() => setOpen(false)}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 p-4 border-b border-slate-200">
          <Search className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Arayın (örn. tabanlık, tansiyon, oksijen)"
            className="flex-1 outline-none text-sm text-slate-900 placeholder:text-slate-400"
          />
          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-center"
            aria-label="Kapat"
          >
            <X className="w-4 h-4 text-slate-600" strokeWidth={1.5} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-auto p-2">
          {showEmpty && (
            <div className="p-4 text-sm text-slate-600">
              Sonuç bulunamadı. İsterseniz WhatsApp üzerinden sorabilirsiniz.
              <div className="mt-3">
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  href={buildWhatsAppUrl(`Merhaba, \"${q}\" hakkında bilgi almak istiyorum.`)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    logSearchTelemetry({
                      term: nq,
                      resultCount: 0,
                      action: 'whatsapp',
                    })
                  }
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                  WhatsApp ile sor
                </a>
              </div>
            </div>
          )}

          {results.map((it) => {
            const vip = it.id === searchConfig.vip.itemId && isOrthopedicIntent(q);
            const hasPage = Boolean(it.href);

            return (
              <div
                key={it.id}
                className="p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-900 truncate">
                    {it.title}{' '}
                    {vip && (
                      <span className="ml-2 text-[10px] uppercase tracking-wider text-slate-500 border border-slate-200 rounded px-1.5 py-0.5 align-middle">
                        Öncelikli
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500">{it.category}</div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {hasPage ? (
                    <a
                      href={it.href}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 inline-flex items-center gap-2"
                      onClick={() =>
                        logSearchTelemetry({
                          term: nq,
                          resultCount: results.length,
                          selectedId: it.id,
                          action: 'select',
                        })
                      }
                    >
                      Aç
                      <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                    </a>
                  ) : (
                    <a
                      href={buildWhatsAppUrl(it.whatsappText)}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 inline-flex items-center gap-2"
                      onClick={() =>
                        logSearchTelemetry({
                          term: nq,
                          resultCount: results.length,
                          selectedId: it.id,
                          action: 'whatsapp',
                        })
                      }
                    >
                      WhatsApp
                      <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-4 py-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Ctrl+K / ⌘K ile açılır</span>
          <span>Esc ile kapanır</span>
        </div>
      </div>
    </div>
  );
}


