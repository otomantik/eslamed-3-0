/**
 * GhostCard: Perfect skeleton match for catalog items
 * 4:3 aspect-ratio image placeholder to prevent CLS
 */
export function GhostCard() {
  return (
    <div className="h-[88px] rounded-2xl border border-slate-200 bg-white animate-pulse px-5 py-4 flex items-center justify-between gap-4">
      {/* Image placeholder - 4:3 aspect ratio */}
      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-slate-200 border border-slate-200 overflow-hidden">
        <div className="aspect-[4/3] w-full h-full bg-slate-200" />
      </div>

      {/* Text placeholders */}
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-4 bg-slate-200 rounded w-3/4" />
        <div className="h-3 bg-slate-200 rounded w-1/2" />
        <div className="flex gap-1 mt-1">
          <div className="h-4 bg-slate-200 rounded w-12" />
          <div className="h-4 bg-slate-200 rounded w-16" />
        </div>
      </div>

      {/* Button placeholder */}
      <div className="flex-shrink-0 w-24 h-12 bg-slate-200 rounded-xl" />
    </div>
  );
}



