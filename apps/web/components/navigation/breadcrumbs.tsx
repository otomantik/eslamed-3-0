'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getBreadcrumbsForPath } from '@/lib/routes/route-dictionary';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]; // Optional: if provided, use it; otherwise auto-generate from pathname
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const pathname = usePathname();
  const breadcrumbItems = items || getBreadcrumbsForPath(pathname);

  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className || 'text-slate-700'}`}>
      <ol className="flex flex-wrap items-center gap-2">
        {breadcrumbItems.map((item, idx) => {
          const isLast = idx === breadcrumbItems.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-slate-900 underline-offset-4 hover:underline min-h-[48px] inline-flex items-center"
                  aria-label={`${item.label} sayfasına git`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-slate-900 font-semibold' : ''}>
                  {item.label}
                </span>
              )}
              {!isLast && <span aria-hidden="true" className="text-slate-400">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}


