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
import { normalizeSearchIndex } from '@/lib/search/index-loader';
import { HelpCard } from '@/components/search/help-card';
import { useIntent } from '@/context/IntentContext';

type FuseLike = {
  search: (q: string) => Array<{ item: SearchItem; score?: number }>;
};

type OpenSearchDetail = {
  prefill?: string;
};

function buildWhatsAppUrl(text: string) {
  return `https://wa.me/905372425535?text=${encodeURIComponent(text)}`;
}

function foldTR(s: string) {
  return (s || '')
    .toLowerCase()
    .replaceAll('ı', 'i')
    .replaceAll('İ', 'i')
    .replaceAll('ğ', 'g')
    .replaceAll('ş', 's')
    .replaceAll('ö', 'o')
    .replaceAll('ü', 'u')
    .replaceAll('ç', 'c');
}

function foldWithMap(original: string) {
  const map: number[] = [];
  let folded = '';
  for (let i = 0; i < (original || '').length; i++) {
    const ch = original[i]!;
    const f = foldTR(ch);
    folded += f;
    // 1:1 mapping (all folds above are single chars)
    map.push(i);
  }
  return { folded, map };
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  const tokens = normalizeQuery(query).split(' ').filter((t) => t.length >= 2);
  if (tokens.length === 0) return <>{text}</>;

  const { folded, map } = foldWithMap(text);
  for (const tok of tokens) {
    const idx = folded.indexOf(tok);
    if (idx >= 0) {
      const startOrig = map[idx] ?? 0;
      const endOrig = (map[idx + tok.length - 1] ?? startOrig) + 1;
      const before = text.slice(0, startOrig);
      const mid = text.slice(startOrig, endOrig);
      const after = text.slice(endOrig);
      return (
        <>
          {before}
          <mark className="rounded bg-amber-100 px-1 text-slate-900">{mid}</mark>
          {after}
        </>
      );
    }
  }
  return <>{text}</>;
}

async function loadIndex(): Promise<{ items: SearchItem[]; totalProducts: number }> {
  const res = await fetch('/search-index.json', { cache: 'force-cache' });
  const raw = await res.json();
  return normalizeSearchIndex(raw);
}

export function SearchModal() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [items, setItems] = useState<SearchItem[] | null>(null);
  const [totalProducts, setTotalProducts] = useState<number>(2500);
  const [fuse, setFuse] = useState<FuseLike | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const lastDemandLoggedRef = useRef<string>('');

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
      const loaded = await loadIndex();
      const list = items ?? loaded.items;
      if (!cancelled && !items) setItems(list);
      if (!cancelled) setTotalProducts(loaded.totalProducts);

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

  const { mode } = useIntent();

  const results = useMemo(() => {
    const nq = normalizeQuery(q);
    if (!nq || !fuse) return [];

    const raw = fuse.search(nq).map((r) => r.item);
    let limited = raw.slice(0, searchConfig.maxResults);

    // Mode-based prioritization (Deep Masking v3)
    if (mode === 'CRITICAL_EMERGENCY') {
      // URGENT: Prioritize "Teknik Servis", "Oksijen Dolum", "Hızlı Teslimat"
      const urgentKeywords = ['teknik servis', 'servis', 'arıza', 'oksijen dolum', 'dolum', 'hızlı teslimat', 'acil'];
      limited = [...limited].sort((a, b) => {
        const aUrgent = urgentKeywords.some((kw) => 
          a.title.toLowerCase().includes(kw) || 
          a.tags.some((tag) => tag.toLowerCase().includes(kw))
        );
        const bUrgent = urgentKeywords.some((kw) => 
          b.title.toLowerCase().includes(kw) || 
          b.tags.some((tag) => tag.toLowerCase().includes(kw))
        );
        return Number(bUrgent) - Number(aUrgent);
      });
      // Also prioritize isUrgent flag
      limited = [...limited].sort((a, b) => Number(Boolean(b.isUrgent)) - Number(Boolean(a.isUrgent)));
    } else if (mode === 'INFORMATION_SEEKER') {
      // RESEARCH: Prioritize "Rehber", "Nasıl Yapılır", "Belgeler"
      const researchKeywords = ['rehber', 'nasıl', 'yapılır', 'belge', 'belgeler', 'kılavuz', 'kullanım'];
      limited = [...limited].sort((a, b) => {
        const aResearch = a.kind === 'guide' || researchKeywords.some((kw) => 
          a.title.toLowerCase().includes(kw) || 
          a.tags.some((tag) => tag.toLowerCase().includes(kw))
        );
        const bResearch = b.kind === 'guide' || researchKeywords.some((kw) => 
          b.title.toLowerCase().includes(kw) || 
          b.tags.some((tag) => tag.toLowerCase().includes(kw))
        );
        return Number(bResearch) - Number(aResearch);
      });
    } else if (mode === 'TRUST_SEEKER') {
      // VIP: Prioritize "Kişiye Özel", "Tabanlık", "VIP Hizmetler"
      const vipKeywords = ['kişiye özel', 'tabanlık', 'tabanlik', 'vip', 'özel', 'premium'];
      limited = [...limited].sort((a, b) => {
        const aVip = a.kind === 'vip' || vipKeywords.some((kw) => 
          a.title.toLowerCase().includes(kw) || 
          a.tags.some((tag) => tag.toLowerCase().includes(kw))
        );
        const bVip = b.kind === 'vip' || vipKeywords.some((kw) => 
          b.title.toLowerCase().includes(kw) || 
          b.tags.some((tag) => tag.toLowerCase().includes(kw))
        );
        return Number(bVip) - Number(aVip);
      });
    }

    // VIP pinning: always show Kişiye Özel Tabanlık for ortho intent (even if fuzzy misses)
    if (items && isOrthopedicIntent(nq)) {
      const vip = items.find((x) => x.id === searchConfig.vip.itemId);
      if (vip) {
        const withoutVip = limited.filter((x) => x.id !== vip.id);
        limited = [vip, ...withoutVip].slice(0, searchConfig.maxResults);
      }
    }

    return limited;
  }, [q, fuse, items, mode]);

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

  // Demand logging: record 0-result terms (mock endpoint for now)
  useEffect(() => {
    if (!open) return;
    const nq = normalizeQuery(q);
    if (!nq) return;
    if (!fuse) return;
    if (results.length !== 0) return;
    if (lastDemandLoggedRef.current === nq) return;
    lastDemandLoggedRef.current = nq;

    fetch('/api/demand_logs', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ term: nq, source: 'search-modal', ts: Date.now() }),
      keepalive: true,
    }).catch(() => {});
  }, [open, q, results.length, fuse]);

  if (!open) return null;

  const nq = normalizeQuery(q);
  const showEmpty = nq.length > 0 && results.length === 0;
  const guides = results.filter((r) => r.kind === 'guide');
  const equipment = results.filter((r) => (r.kind || 'equipment') === 'equipment' || r.kind === 'vip');

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
            className="w-12 h-12 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center"
            aria-label="Kapat"
          >
            <X className="w-4 h-4 text-slate-600" strokeWidth={1.5} />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-slate-200 text-xs text-slate-500">
          Şu an {totalProducts.toLocaleString('tr-TR')} ürün içinde arıyorsunuz
        </div>

        <div className="max-h-[60vh] overflow-auto p-2">
          {showEmpty && (
            <div className="p-4 text-sm text-slate-600">
              <div className="text-sm text-slate-700" style={{ lineHeight: 1.8 }}>
                Sonuç bulunamadı. İsterseniz WhatsApp üzerinden sorabilirsiniz.
              </div>
              <div className="mt-3">
                <a
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm text-slate-700 hover:bg-slate-50"
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
              <div className="mt-4">
                <HelpCard term={q} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {/* COLUMN A: Guides */}
            <div className="rounded-xl border border-slate-200 bg-white">
              <div className="px-4 py-3 border-b border-slate-200 text-sm font-semibold text-slate-900">
                Nasıl Yapılır? (Rehberler)
              </div>
              <div className="p-2">
                {guides.length === 0 ? (
                  <div className="p-3 text-sm text-slate-500">Bu arama için rehber sonucu yok.</div>
                ) : (
                  guides.map((it) => (
                    <div key={it.id} className="p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-900 truncate">
                          <HighlightedText text={it.title} query={q} />
                        </div>
                        <div className="text-xs text-slate-500">{it.category}</div>
                      </div>
                      <a
                        href={it.href || '#'}
                        className="min-h-[48px] rounded-xl border border-slate-200 px-4 text-sm text-slate-700 hover:bg-slate-50 inline-flex items-center gap-2"
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
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* COLUMN B: Equipment */}
            <div className="rounded-xl border border-slate-200 bg-white">
              <div className="px-4 py-3 border-b border-slate-200 text-sm font-semibold text-slate-900">
                Hemen İncele (Ekipmanlar)
              </div>
              <div className="p-2">
                {equipment.length === 0 ? (
                  <div className="p-3 text-sm text-slate-500">Bu arama için ekipman sonucu yok.</div>
                ) : (
                  equipment.map((it) => {
                    const vip = it.id === searchConfig.vip.itemId && isOrthopedicIntent(q);
                    const hasPage = Boolean(it.href);
                    return (
                      <div key={it.id} className="p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-slate-900 truncate">
                            <HighlightedText text={it.title} query={q} />{' '}
                            {vip && (
                              <span className="ml-2 text-[10px] uppercase tracking-wider text-slate-500 border border-slate-200 rounded px-1.5 py-0.5 align-middle">
                                Öncelikli
                              </span>
                            )}
                            {it.isUrgent && (
                              <span className="ml-2 text-[10px] uppercase tracking-wider text-red-600 border border-red-200 rounded px-1.5 py-0.5 align-middle">
                                Acil
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500">{it.category}</div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {hasPage ? (
                            <a
                              href={it.href}
                              className="min-h-[48px] rounded-xl border border-slate-200 px-4 text-sm text-slate-700 hover:bg-slate-50 inline-flex items-center gap-2"
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
                              className="min-h-[48px] rounded-xl border border-slate-200 px-4 text-sm text-slate-700 hover:bg-slate-50 inline-flex items-center gap-2"
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
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Ctrl+K / ⌘K ile açılır</span>
          <span>Esc ile kapanır</span>
        </div>
      </div>
    </div>
  );
}


