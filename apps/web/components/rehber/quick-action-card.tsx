import { ReactNode } from 'react';
import { AlertTriangle, Info } from 'lucide-react';

type Variant = 'warning' | 'info';

export function QuickActionCard({
  variant = 'info',
  title,
  icon,
  children,
}: {
  variant?: Variant;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  const styles =
    variant === 'warning'
      ? {
          wrapper: 'bg-amber-50 border-amber-200',
          title: 'text-amber-950',
          body: 'text-amber-900',
          iconWrap: 'bg-amber-100 border-amber-200',
          defaultIcon: (
            <AlertTriangle className="w-5 h-5 text-amber-800" strokeWidth={1.5} />
          ),
        }
      : {
          wrapper: 'bg-blue-50 border-blue-200',
          title: 'text-slate-900',
          body: 'text-slate-700',
          iconWrap: 'bg-white/70 border-blue-200',
          defaultIcon: <Info className="w-5 h-5 text-blue-700" strokeWidth={1.5} />,
        };

  return (
    <aside
      role="note"
      className={`rounded-2xl border ${styles.wrapper} p-6 sm:p-7`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-11 h-11 rounded-xl border ${styles.iconWrap} flex items-center justify-center flex-shrink-0`}
          aria-hidden="true"
        >
          {icon ?? styles.defaultIcon}
        </div>
        <div className="min-w-0">
          <div className={`text-base font-semibold ${styles.title}`}>{title}</div>
          <div className={`mt-2 text-sm leading-relaxed ${styles.body}`} style={{ lineHeight: 1.8 }}>
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}


