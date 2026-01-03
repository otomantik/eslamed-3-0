export function CatalogSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">
      <div className="h-6 w-56 bg-slate-200 rounded animate-pulse" />
      <div className="mt-4 h-4 w-80 bg-slate-200 rounded animate-pulse" />

      {/* Big Icon Category grid skeleton */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="min-h-[88px] rounded-2xl border border-slate-200 bg-slate-50 animate-pulse"
          />
        ))}
      </div>

      {/* Filter row skeleton */}
      <div className="mt-6 flex flex-wrap gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-[48px] w-48 rounded-xl border border-slate-200 bg-slate-50 animate-pulse" />
        ))}
      </div>

      {/* Results list skeleton (matches row geometry) */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-2">
        <div className="p-6 space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-[88px] rounded-2xl border border-slate-200 bg-slate-50 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}




