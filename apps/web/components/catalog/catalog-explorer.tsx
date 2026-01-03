'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Activity,
  Bed,
  RotateCcw,
  Footprints,
  Stethoscope,
  Wind,
} from 'lucide-react';
import type { SearchItem } from '@/lib/search/search-config';
import { normalizeSearchIndex } from '@/lib/search/index-loader';
import { CatalogSkeleton } from './skeleton';
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

interface UnifiedFilters {
  query: string;
  categoryId: string;
  filterTag: FilterKey | 'all';
}

/**
 * CatalogExplorer: Unified equipment catalog with consistent state management
 * - Single source of truth for filters (query, category, filter tags)
 * - Correct count displays (filtered results)
 * - URL sync for shareable links
 * - Reset button instead of confusing "Tek tık filtre"
 */
export function CatalogExplorer() {
  const params = useSearchParams();
  const router = useRouter();
  const { mode } = useIntent();
  const [raw, setRaw] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [ghostLoading, setGhostLoading] = useState(false);
  const [fuzzyResults, setFuzzyResults] = useState<SearchItem[]>([]);
  const [isFuzzySearching, setIsFuzzySearching] = useState(false);

  // Unified filter state - single source of truth
  const [filters, setFilters] = useState<UnifiedFilters>({
    query: params.get('query') || '',
    categoryId: params.get('category') || 'all',
    filterTag: (params.get('filter') as FilterKey) || 'all',
  });

  // Load search index
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

  // Initialize filters from URL on mount
  useEffect(() => {
    if (loading) return;
    const queryParam = params.get('query') || '';
    const categoryParam = params.get('category') || 'all';
    const filterParam = (params.get('filter') as FilterKey) || 'all';
    
    setFilters({
      query: queryParam,
      categoryId: categoryParam,
      filterTag: filterParam,
    });
  }, [loading, params]);

  // Build equipment categories
  const { equipmentCategories, allEquipment } = useMemo(() => {
    if (!raw) return { equipmentCategories: [] as Category[], allEquipment: [] as SearchItem[] };
    const normalized = normalizeSearchIndex(raw);
    const allItems = normalized.items;

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

    return { equipmentCategories: cats, allEquipment: equipment };
  }, [raw]);

  const activeCategory = useMemo(() => {
    return equipmentCategories.find((c) => c.id === filters.categoryId) || equipmentCategories[0];
  }, [equipmentCategories, filters.categoryId]);

  // Update URL when filters change (only if params actually changed)
  useEffect(() => {
    if (loading) return;
    
    const newParams = new URLSearchParams();
    if (filters.query) newParams.set('query', filters.query);
    if (filters.categoryId !== 'all') newParams.set('category', filters.categoryId);
    if (filters.filterTag !== 'all') newParams.set('filter', filters.filterTag);
    if (mode) newParams.set('mode', mode);

    // Compare current URL params with desired params
    const currentParams = new URLSearchParams(params.toString());
    
    const paramsChanged = 
      currentParams.get('query') !== newParams.get('query') ||
      currentParams.get('category') !== newParams.get('category') ||
      currentParams.get('filter') !== newParams.get('filter') ||
      currentParams.get('mode') !== newParams.get('mode');

    // Only update URL if params actually changed
    if (paramsChanged) {
      const newUrl = `/ekipmanlar${newParams.toString() ? `?${newParams.toString()}` : ''}`;
      router.replace(newUrl, { scroll: false });
    }
  }, [filters, mode, router, loading, params]);

  // Fuzzy search effect
  useEffect(() => {
    if (!filters.query || filters.query.trim().length === 0 || !mode) {
      setFuzzyResults([]);
      setIsFuzzySearching(false);
      return;
    }

    setIsFuzzySearching(true);
    let cancelled = false;

    (async () => {
      // Get base items from active category
      let base = filters.categoryId === 'all' 
        ? allEquipment 
        : (activeCategory?.items || []);

      // Apply filter tag
      if (filters.filterTag !== 'all') {
        const filterTag = filters.filterTag as FilterKey;
        base = base.filter((x) => (x.filters || []).includes(filterTag));
      }

      // Perform fuzzy search
      const results = await fuzzySearchWithIntent(base, filters.query, mode);
      
      if (!cancelled) {
        setFuzzyResults(results.map((r) => r.item));
        setIsFuzzySearching(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [filters.query, filters.categoryId, filters.filterTag, mode, activeCategory, allEquipment]);

  // Calculate filtered items (final results)
  const filteredItems = useMemo(() => {
    // If fuzzy search is active, use fuzzy results
    if (filters.query && filters.query.trim().length > 0 && mode && fuzzyResults.length > 0) {
      return fuzzyResults;
    }

    // Get base items
    let base = filters.categoryId === 'all' 
      ? allEquipment 
      : (activeCategory?.items || []);
    
    // Apply filter tag
    if (filters.filterTag !== 'all') {
      const filterTag = filters.filterTag as FilterKey;
      base = base.filter((x) => (x.filters || []).includes(filterTag));
    }

    // Sort by intent weight if mode is active
    if (mode) {
      base = sortByIntentWeight(base, mode);
    }

    return base;
  }, [filters, activeCategory, allEquipment, mode, fuzzyResults]);

  // Calculate category counts (with current filter tag applied)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    equipmentCategories.forEach((cat) => {
      let items = cat.items;
      
      // Apply current filter tag
      if (filters.filterTag !== 'all') {
        const filterTag = filters.filterTag as FilterKey;
        items = items.filter((x) => (x.filters || []).includes(filterTag));
      }
      
      counts[cat.id] = items.length;
    });

    return counts;
  }, [equipmentCategories, filters.filterTag]);

  // Ghost loading on filter/category change
  useEffect(() => {
    if (loading || isFuzzySearching) return;
    setGhostLoading(true);
    const t = window.setTimeout(() => setGhostLoading(false), 220);
    return () => window.clearTimeout(t);
  }, [filters.categoryId, filters.filterTag, loading, mode, isFuzzySearching]);

  // Log no-result queries
  useEffect(() => {
    if (loading || filteredItems.length > 0) return;
    
    if (filters.query || filters.categoryId !== 'all' || filters.filterTag !== 'all') {
      fetch('/api/demand_logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'catalog_no_result',
          query: filters.query || null,
          category: filters.categoryId !== 'all' ? filters.categoryId : null,
          mode: mode || null,
          filter: filters.filterTag,
          timestamp: new Date().toISOString(),
        }),
        keepalive: true,
      }).catch(() => {
        // Silent fail
      });
    }
  }, [loading, filteredItems.length, filters, mode]);

  // Reset all filters
  const handleReset = () => {
    setFilters({
      query: '',
      categoryId: 'all',
      filterTag: 'all',
    });
  };

  // Check if any filters are active
  const hasActiveFilters = filters.categoryId !== 'all' || filters.filterTag !== 'all' || filters.query.length > 0;

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
              Şu an <span className="font-semibold text-slate-900">{filteredItems.length.toLocaleString('tr-TR')}</span> ürün görüntüleniyor
              {allEquipment.length !== filteredItems.length && (
                <span className="text-slate-500">
                  {' '}(toplam {allEquipment.length.toLocaleString('tr-TR')})
                </span>
              )}
            </p>
          </div>
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-colors"
              aria-label="Tüm filtreleri sıfırla"
            >
              <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
              Sıfırla
            </button>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-4">
          {equipmentCategories.map((c) => {
            const Icon = c.icon;
            const active = c.id === filters.categoryId;
            const count = categoryCounts[c.id] || 0;
            
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, categoryId: c.id }))}
                className={`min-h-[88px] rounded-2xl border px-4 py-4 text-left transition-colors ${
                  active
                    ? 'border-brand-primary bg-blue-50/40'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
                aria-label={`${c.label} kategorisini seç (${count} ürün)`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                    active ? 'border-blue-200 bg-white' : 'border-slate-200 bg-slate-50'
                  }`}>
                    <Icon className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900 truncate">{c.label}</div>
                    <div className="text-xs text-slate-500">{count} ürün</div>
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
            const active = f.id === filters.filterTag;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, filterTag: f.id }))}
                className={`min-h-[48px] rounded-xl border px-5 text-sm font-semibold transition-colors ${
                  active 
                    ? 'border-slate-900 bg-slate-900 text-white' 
                    : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50'
                }`}
                aria-label={`${f.label} filtresini ${active ? 'kaldır' : 'uygula'}`}
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
            query={filters.query || undefined}
            category={filters.categoryId !== 'all' ? filters.categoryId : undefined}
            onClearFilters={handleReset}
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
                  query: filters.query || null,
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
