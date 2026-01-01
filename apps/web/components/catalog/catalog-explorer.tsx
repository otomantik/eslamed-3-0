'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Activity,
  Bed,
  Filter as FilterIcon,
  Footprints,
  Stethoscope,
  Wind,
} from 'lucide-react';
import type { SearchItem } from '@/lib/search/search-config';
import { normalizeSearchIndex } from '@/lib/search/index-loader';
import { CatalogSkeleton } from '@/components/catalog/skeleton';
import { VirtualizedCatalog } from './virtualized-catalog';
import { useIntent } from '@/context/IntentContext';
import { filterByCategoryAndMode, sortByIntentWeight, fuzzySearchWithIntent } from '@/lib/search/intent-ranking';
import { GhostCard } from './ghost-card';
import { EmptyState } from './empty-state';

type FilterKey = 'kurulum' | 'kiralik' | 'vip';

type Category = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  items: SearchItem[];
};

function makeWhatsAppLink(title: string) {
  return `https://wa.me/905372425535?text=${encodeURIComponent(
    `Merhaba, ${title} hakkında kurulum ve fiyat bilgisi almak istiyorum.`
  )}`;
}

export function CatalogExplorer() {
  const params = useSearchParams();
  const router = useRouter();
  const { mode } = useIntent();
  const [raw, setRaw] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');
  const [activeFilter, setActiveFilter] = useState<FilterKey | 'all'>('all');
  const [ghostLoading, setGhostLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const res = await fetch('/search-index.json', { cache: 'force-cache' });
      const data = await res.json();
      if (!cancelled) {
        setRaw(data);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const { equipmentCategories, totalProducts } = useMemo(() => {
    if (!raw) return { equipmentCategories: [] as Category[], totalProducts: 2500 };
    const normalized = normalizeSearchIndex(raw);
    const allItems = normalized.items;
    const total = normalized.totalProducts;

    const equipment = allItems.filter((i) => (i.kind || 'equipment') === 'equipment');

    // Group by category label
    const map = new Map<string, SearchItem[]>();
    for (const it of equipment) {
      const key = it.category || 'Diğer';
      map.set(key, [...(map.get(key) || []), it]);
    }

    const iconByLabel: Record<string, Category['icon']> = {
      'Solunum': Wind,
      'Tanı & Ölçüm': Activity,
      'Evde Bakım': Bed,
      'Ortopedi': Footprints,
    };

    const cats: Category[] = [
      {
        id: 'all',
        label: 'Tüm Ekipmanlar',
        icon: Stethoscope,
        items: equipment,
      },
      ...Array.from(map.entries()).map(([label, items]) => ({
        id: label.toLowerCase().replace(/\s+/g, '-'),
        label,
        icon: iconByLabel[label] || Stethoscope,
        items,
      })),
    ];

    return { equipmentCategories: cats, totalProducts: total };
  }, [raw]);

  const activeCategory = useMemo(() => {
    return equipmentCategories.find((c) => c.id === activeCategoryId) || equipmentCategories[0];
  }, [equipmentCategories, activeCategoryId]);

  // Support pre-applied filters from URL params (e.g. /ekipmanlar?category=solunum&mode=urgent)
  useEffect(() => {
    if (loading) return;
    if (!equipmentCategories.length) return;

    const filterParam = (params.get('filter') || '').toLowerCase();
    const catParamRaw = (params.get('category') || '').toLowerCase();
    const modeParam = params.get('mode');

    if (filterParam === 'kurulum' || filterParam === 'kiralik' || filterParam === 'vip' || filterParam === 'all') {
      setActiveFilter(filterParam as any);
    }

    if (catParamRaw) {
      const normalizedCat = catParamRaw.replace(/\s+/g, '-');
      const found =
        equipmentCategories.find((c) => c.id === normalizedCat) ||
        equipmentCategories.find((c) => c.label.toLowerCase() === catParamRaw) ||
        equipmentCategories.find((c) => c.label.toLowerCase().replace(/\s+/g, '-') === normalizedCat);
      if (found) setActiveCategoryId(found.id);
    }

    // Update URL if mode changes (for shareable links)
    if (modeParam && modeParam !== mode) {
      const newParams = new URLSearchParams(params.toString());
      newParams.set('mode', mode);
      router.replace(`/ekipmanlar?${newParams.toString()}`, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, equipmentCategories.length, mode]);

  // Intent-based filtering and ranking with fuzzy search
  const [fuzzyResults, setFuzzyResults] = useState<SearchItem[]>([]);
  const [isFuzzySearching, setIsFuzzySearching] = useState(false);

  const query = params.get('query');

  // Fuzzy search effect (async)
  useEffect(() => {
    if (!query || query.trim().length === 0 || !mode) {
      setFuzzyResults([]);
      setIsFuzzySearching(false);
      return;
    }

    setIsFuzzySearching(true);
    let cancelled = false;

    (async () => {
      const base = activeCategory?.items || [];
      
      // Apply filter
      let filtered = activeFilter === 'all' 
        ? base 
        : base.filter((x) => (x.filters || []).includes(activeFilter));

      // Apply category filter from URL
      const categoryParam = params.get('category');
      if (categoryParam && categoryParam !== 'all') {
        filtered = filterByCategoryAndMode(filtered, categoryParam, mode);
      }

      // Perform fuzzy search
      const results = await fuzzySearchWithIntent(filtered, query, mode);
      
      if (!cancelled) {
        setFuzzyResults(results.map((r) => r.item));
        setIsFuzzySearching(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [query, mode, activeCategory, activeFilter, params]);

  // Intent-based filtering and ranking (non-fuzzy)
  const filteredItems = useMemo(() => {
    // If fuzzy search is active, use fuzzy results
    if (query && query.trim().length > 0 && mode && fuzzyResults.length > 0) {
      return fuzzyResults;
    }

    const base = activeCategory?.items || [];
    
    // Apply filter
    let filtered = activeFilter === 'all' 
      ? base 
      : base.filter((x) => (x.filters || []).includes(activeFilter));

    // Apply category filter from URL
    const categoryParam = params.get('category');
    if (categoryParam && categoryParam !== 'all') {
      filtered = filterByCategoryAndMode(filtered, categoryParam, mode);
    }

    // Sort by intent weight if mode is active (no query)
    if (mode) {
      filtered = sortByIntentWeight(filtered, mode);
    }

    return filtered;
  }, [activeCategory, activeFilter, mode, params, query, fuzzyResults]);

  // Ghost loading on filter/category change (perceived performance)
  useEffect(() => {
    if (loading || isFuzzySearching) return;
    setGhostLoading(true);
    const t = window.setTimeout(() => setGhostLoading(false), 220);
    return () => window.clearTimeout(t);
  }, [activeCategoryId, activeFilter, loading, mode, isFuzzySearching]);

  // Log no-result queries
  useEffect(() => {
    if (loading || filteredItems.length > 0) return;
    
    const query = params.get('query');
    const category = params.get('category');
    if (query || category) {
      fetch('/api/demand_logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'catalog_no_result',
          query: query || null,
          category: category || null,
          mode: mode || null,
          filter: activeFilter,
          timestamp: new Date().toISOString(),
        }),
        keepalive: true,
      }).catch(() => {
        // Silent fail
      });
    }
  }, [loading, filteredItems.length, params, mode, activeFilter]);

  if (loading) {
    return <CatalogSkeleton />;
  }

  return (
    <section className="space-y-8">
      {/* Big icon categories */}
      <section className="rounded-3xl border border-slate-200 bg-white p-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Tüm Ekipmanlar</h2>
            <p className="mt-2 text-slate-600" style={{ lineHeight: 1.8 }}>
              Şu an <span className="font-semibold text-slate-900">{totalProducts.toLocaleString('tr-TR')}</span> ürün içinde arıyorsunuz.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <FilterIcon className="w-4 h-4" strokeWidth={1.5} />
            Tek tık filtre
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-4">
          {equipmentCategories.map((c) => {
            const Icon = c.icon;
            const active = c.id === activeCategoryId;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCategoryId(c.id)}
                className={`min-h-[88px] rounded-2xl border px-4 py-4 text-left transition-colors ${
                  active
                    ? 'border-brand-primary bg-blue-50/40'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                    active ? 'border-blue-200 bg-white' : 'border-slate-200 bg-slate-50'
                  }`}>
                    <Icon className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900 truncate">{c.label}</div>
                    <div className="text-xs text-slate-500">{c.items.length} öğe</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Single-click filters */}
        <div className="mt-6 flex flex-wrap gap-3">
          {([
            { id: 'all', label: 'Tümü' },
            { id: 'kurulum', label: 'Hemen Kurulum Yapılanlar' },
            { id: 'kiralik', label: 'Kiralık Ürünler' },
            { id: 'vip', label: 'VIP Hizmetler' },
          ] as Array<{ id: FilterKey | 'all'; label: string }>).map((f) => {
            const active = f.id === activeFilter;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`min-h-[48px] rounded-xl border px-5 text-sm font-semibold transition-colors ${
                  active ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Results list (ghost loading + virtualized) */}
      <section className="rounded-3xl border border-slate-200 bg-white p-2">
        {ghostLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <GhostCard key={i} />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <EmptyState
            query={params.get('query') || undefined}
            category={activeCategoryId !== 'all' ? activeCategoryId : undefined}
            onClearFilters={() => {
              setActiveCategoryId('all');
              setActiveFilter('all');
            }}
          />
        ) : (
          <VirtualizedCatalog
            items={filteredItems}
            mode={mode}
            onItemClick={(item, rank) => {
              // Log item click with rank position for analytics
              fetch('/api/demand_logs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  type: 'catalog_item_click',
                  itemId: item.id,
                  itemTitle: item.title,
                  category: item.category,
                  mode: mode || null,
                  rank: rank || null,
                  query: params.get('query') || null,
                  timestamp: new Date().toISOString(),
                }),
                keepalive: true,
              }).catch(() => {});
            }}
          />
        )}
      </section>
    </section>
  );
}


