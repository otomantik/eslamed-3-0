import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

export function ServiceCard({
  title,
  desc,
  href,
  color,
  icon,
}: {
  title: string;
  desc: string;
  href: string;
  color: string; // hex
  icon: ReactNode;
}) {
  return (
    <article
      className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-sm"
      style={{ borderLeftWidth: 6, borderLeftColor: color }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${color}14` }}
          aria-hidden="true"
        >
          {icon}
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <p className="mt-2 text-[18px] text-slate-600" style={{ lineHeight: 1.8 }}>
            {desc}
          </p>
          <div className="mt-5">
            <Link
              href={href}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-base font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Detaylar
              <ArrowUpRight className="w-5 h-5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}




