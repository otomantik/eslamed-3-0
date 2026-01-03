/**
 * RouteDictionary: Centralized route metadata for breadcrumbs and navigation
 * Ensures consistent titles and paths across the application
 */

export type RouteMetadata = {
  title: string;
  description?: string;
  parent?: string; // parent route path
};

export const routeDictionary: Record<string, RouteMetadata> = {
  '/': {
    title: 'Ana Sayfa',
    description: 'Evde medikal ekipman yönlendirme merkezi',
  },
  '/ekipmanlar': {
    title: 'Tüm Ekipmanlar',
    parent: '/',
  },
  '/hizmetler': {
    title: 'Hizmetler',
    parent: '/',
  },
  '/hizmetler/teknik-servis': {
    title: 'Teknik Servis',
    parent: '/hizmetler',
  },
  '/hizmetler/oksijen-dolum': {
    title: 'Oksijen Dolum',
    parent: '/hizmetler',
  },
  '/hizmetler/cihaz-kiralama': {
    title: 'Cihaz Kiralama',
    parent: '/hizmetler',
  },
  '/hizmetler/cihaz-satisi': {
    title: 'Cihaz Satışı',
    parent: '/hizmetler',
  },
  '/hizmetler/ikinci-el-alim': {
    title: '2. El Alım',
    parent: '/hizmetler',
  },
  '/iletisim': {
    title: 'İletişim',
    parent: '/',
  },
  '/destek': {
    title: 'Destek & Sınırlar',
    parent: '/',
  },
  '/istanbul': {
    title: 'İstanbul Medikal Destek',
    parent: '/',
  },
  '/tabanlik': {
    title: 'Kişiye Özel Tabanlık',
    parent: '/',
  },
  '/isletme-belgeleri': {
    title: 'İşletme Belgeleri',
    parent: '/',
  },
  '/kvkk': {
    title: 'KVKK',
    parent: '/',
  },
  '/gizlilik': {
    title: 'Gizlilik Politikası',
    parent: '/',
  },
  '/rehber/solunum-sistemleri': {
    title: 'Solunum Sistemleri Rehberi',
    parent: '/',
  },
  '/rehber/olcum-cihazlari': {
    title: 'Ölçüm Cihazları Rehberi',
    parent: '/',
  },
  '/rehber/evde-bakim-ekipmanlari': {
    title: 'Evde Bakım Ekipmanları Rehberi',
    parent: '/',
  },
  '/field-service': {
    title: 'Saha Terminali - Teknisyen Arayüzü',
    parent: '/',
  },
};

/**
 * Get breadcrumb items for a given path
 */
export function getBreadcrumbsForPath(pathname: string): Array<{ label: string; href?: string }> {
  const items: Array<{ label: string; href?: string }> = [];
  let currentPath = pathname;

  // Normalize path (remove trailing slash, ensure leading slash)
  currentPath = currentPath.replace(/\/$/, '') || '/';

  const visited = new Set<string>();

  while (currentPath && !visited.has(currentPath)) {
    visited.add(currentPath);
    const meta = routeDictionary[currentPath];

    if (meta) {
      items.unshift({
        label: meta.title,
        href: currentPath === pathname ? undefined : currentPath,
      });

      if (meta.parent) {
        currentPath = meta.parent;
      } else {
        break;
      }
    } else {
      // Fallback: use path segments
      const segments = currentPath.split('/').filter(Boolean);
      if (segments.length > 0) {
        const lastSegment = segments[segments.length - 1];
        items.unshift({
          label: lastSegment
            .split('-')
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join(' '),
          href: currentPath === pathname ? undefined : currentPath,
        });
      }
      break;
    }
  }

  // Always ensure "Ana Sayfa" is first
  if (items.length === 0 || items[0].href !== '/') {
    items.unshift({ label: 'Ana Sayfa', href: '/' });
  }

  return items;
}



