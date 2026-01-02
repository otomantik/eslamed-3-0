import type { SearchItem } from '@/lib/search/search-config';

interface CatalogSchemaOptions {
  items: SearchItem[];
  category?: string;
  currentUrl: string;
  totalProducts: number;
}

/**
 * Generate ProductGroup and ItemList JSON-LD schemas for catalog pages
 * Supports deep nesting: Home > Ekipmanlar > [Category] > [Product]
 */
export function generateCatalogSchema({
  items,
  category,
  currentUrl,
  totalProducts,
}: CatalogSchemaOptions) {
  const baseUrl = 'https://www.eslamed.com';
  const breadcrumbs = [
    { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${baseUrl}/` },
    { '@type': 'ListItem', position: 2, name: 'Tüm Ekipmanlar', item: `${baseUrl}/ekipmanlar` },
  ];

  if (category && category !== 'all') {
    breadcrumbs.push({
      '@type': 'ListItem',
      position: 3,
      name: category,
      item: `${baseUrl}/ekipmanlar?category=${encodeURIComponent(category)}`,
    });
  }

  // Top 50 items for mainEntity (or all if less than 50)
  const topItems = items.slice(0, 50).map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.title,
    url: item.href ? `${baseUrl}${item.href}` : `${baseUrl}/ekipmanlar?query=${encodeURIComponent(item.title)}`,
  }));

  // ProductGroup schema (for category pages)
  const productGroupSchema = category && category !== 'all' ? {
    '@context': 'https://schema.org',
    '@type': 'ProductGroup',
    '@id': `${currentUrl}#productgroup`,
    name: `${category} Ekipmanları`,
    url: currentUrl,
    description: `${category} kategorisindeki medikal ekipmanlar.`,
    category: category,
    numberOfItems: items.length,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${category} Ekipmanları`,
      itemListElement: topItems,
    },
  } : null;

  // ItemList schema (for all catalog pages)
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${currentUrl}#itemlist`,
    name: category && category !== 'all' ? `${category} Ekipmanları` : 'Tüm Ekipmanlar',
    url: currentUrl,
    numberOfItems: totalProducts,
    itemListElement: topItems,
  };

  // BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${currentUrl}#breadcrumb`,
    itemListElement: breadcrumbs,
  };

  return {
    productGroup: productGroupSchema,
    itemList: itemListSchema,
    breadcrumb: breadcrumbSchema,
  };
}


