'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
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
  const [raw, setRaw] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');
  const [activeFilter, setActiveFilter] = useState<FilterKey | 'all'>('all');
  const [ghostLoading, setGhostLoading] = useState(false);

  // For basic windowing
  const listRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);

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

  // Support pre-applied filters from links (e.g. /ekipmanlar?filter=kiralik&category=solunum)
  useEffect(() => {
    if (loading) return;
    if (!equipmentCategories.length) return;

    const filterParam = (params.get('filter') || '').toLowerCase();
    const catParamRaw = (params.get('category') || '').toLowerCase();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, equipmentCategories.length]);

  const filteredItems = useMemo(() => {
    const base = activeCategory?.items || [];
    if (activeFilter === 'all') return base;
    return base.filter((x) => (x.filters || []).includes(activeFilter));
  }, [activeCategory, activeFilter]);

  // Ghost loading on filter/category change (perceived performance)
  useEffect(() => {
    if (loading) return;
    setGhostLoading(true);
    const t = window.setTimeout(() => setGhostLoading(false), 220);
    return () => window.clearTimeout(t);
  }, [activeCategoryId, activeFilter, loading]);

  const rowHeight = 88; // fixed height for basic virtualization
  const viewportHeight = 520;
  const totalRows = filteredItems.length;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 5);
  const endIndex = Math.min(totalRows, startIndex + Math.ceil(viewportHeight / rowHeight) + 10);
  const visible = filteredItems.slice(startIndex, endIndex);

  const paddingTop = startIndex * rowHeight;
  const paddingBottom = Math.max(0, (totalRows - endIndex) * rowHeight);

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

      {/* Results list (ghost loading + basic virtualization) */}
      <section className="rounded-3xl border border-slate-200 bg-white p-2">
        {ghostLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-[88px] rounded-2xl border border-slate-200 bg-slate-50 animate-pulse" />
            ))}
          </div>
        ) : (
          <div
            ref={listRef}
            className="max-h-[520px] overflow-auto p-2"
            onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
          >
            <div style={{ paddingTop, paddingBottom }}>
              {visible.map((it) => (
                <div
                  key={it.id}
                  className="h-[88px] rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors px-5 py-4 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="text-base font-semibold text-slate-900 truncate">{it.title}</div>
                    <div className="text-sm text-slate-600 truncate">{it.category}</div>
                  </div>
                  <a
                    href={makeWhatsAppLink(it.title)}
                    className="min-h-[48px] inline-flex items-center justify-center rounded-xl bg-slate-900 text-white px-5 text-sm font-semibold hover:bg-slate-800 transition-colors flex-shrink-0"
                  >
                    WhatsApp
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </section>
  );
}


