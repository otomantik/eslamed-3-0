import type { SearchItem } from './search-config';

export type SearchIndexV2 = {
  meta?: {
    version?: number;
    totalProducts?: number;
  };
  categories?: Array<{
    id: string;
    label: string;
    kind: 'guide' | 'equipment' | 'vip';
    items: SearchItem[];
  }>;
};

export function normalizeSearchIndex(raw: any): { items: SearchItem[]; totalProducts: number } {
  // Backward compatibility: raw can be an array of items (v1)
  if (Array.isArray(raw)) {
    return { items: raw as SearchItem[], totalProducts: 2500 };
  }

  const metaTotal = Number(raw?.meta?.totalProducts);
  const totalProducts = Number.isFinite(metaTotal) && metaTotal > 0 ? metaTotal : 2500;

  const cats = Array.isArray(raw?.categories) ? (raw.categories as SearchIndexV2['categories']) : [];
  const items = (cats || []).flatMap((c) =>
    (c?.items || []).map((it) => ({
      ...it,
      // If item kind isn't provided, inherit from category.
      kind: it.kind || c.kind,
      category: it.category || c.label,
    }))
  );

  return { items, totalProducts };
}


