'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { generateCatalogSchema } from '@/lib/seo/generate-catalog-schema';
import { normalizeSearchIndex } from '@/lib/search/index-loader';
import type { SearchItem } from '@/lib/search/search-config';

/**
 * CatalogSchemaGenerator: Client-side JSON-LD schema generation
 * Dynamically generates ProductGroup, ItemList, and BreadcrumbList schemas
 */
export function CatalogSchemaGenerator() {
  const params = useSearchParams();
  const [schemas, setSchemas] = useState<ReturnType<typeof generateCatalogSchema> | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const res = await fetch('/search-index.json', { cache: 'force-cache' });
      const raw = await res.json();
      const normalized = normalizeSearchIndex(raw);
      
      const category = params.get('category') || 'all';
      const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://www.eslamed.com/ekipmanlar';
      
      // Filter items by category if specified
      let items: SearchItem[] = normalized.items.filter((i) => (i.kind || 'equipment') === 'equipment');
      if (category && category !== 'all') {
        items = items.filter((item) => {
          const itemCategory = item.category?.toLowerCase().replace(/\s+/g, '-');
          return itemCategory === category || item.category?.toLowerCase() === category;
        });
      }

      if (!cancelled) {
        const generated = generateCatalogSchema({
          items,
          category: category !== 'all' ? category : undefined,
          currentUrl,
          totalProducts: normalized.totalProducts,
        });
        setSchemas(generated);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [params]);

  if (!schemas) return null;

  return (
    <>
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }}
      />
      
      {/* ItemList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.itemList) }}
      />
      
      {/* ProductGroup Schema (only for category pages) */}
      {schemas.productGroup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.productGroup) }}
        />
      )}
    </>
  );
}


