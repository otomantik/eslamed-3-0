import Link from 'next/link';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-700">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-slate-900 underline-offset-4 hover:underline"
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


