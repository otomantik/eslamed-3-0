'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import type { SearchItem } from '@/lib/search/search-config';

interface VirtualizedCatalogProps {
  items: SearchItem[];
  onItemClick?: (item: SearchItem) => void;
}

function makeWhatsAppLink(title: string) {
  return `https://wa.me/905372425535?text=${encodeURIComponent(
    `Merhaba, ${title} hakkında kurulum ve fiyat bilgisi almak istiyorum.`
  )}`;
}

/**
 * VirtualizedCatalog: High-performance rendering for 2500+ items
 * Uses @tanstack/react-virtual for 60fps scrolling
 */
export function VirtualizedCatalog({ items, onItemClick }: VirtualizedCatalogProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 88, // Fixed row height
    overscan: 10, // Render 10 extra items outside viewport
  });

  return (
    <div
      ref={parentRef}
      className="max-h-[520px] overflow-auto"
      style={{ contain: 'strict' }} // CSS containment for performance
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const item = items[virtualRow.index]!;
          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className="px-2"
            >
              <div className="h-full rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors px-5 py-4 flex items-center justify-between gap-4">
                {/* Image placeholder with fixed aspect ratio (prevents CLS) */}
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                  <div className="aspect-[4/3] w-full h-full relative">
                    {/* Placeholder: Category icon or default */}
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs">
                      {item.category.charAt(0)}
                    </div>
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-base font-semibold text-slate-900 truncate">{item.title}</div>
                  <div className="text-sm text-slate-600 truncate">{item.category}</div>
                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <a
                  href={makeWhatsAppLink(item.title)}
                  onClick={() => onItemClick?.(item)}
                  className="min-h-[48px] inline-flex items-center justify-center rounded-xl bg-slate-900 text-white px-5 text-sm font-semibold hover:bg-slate-800 transition-colors flex-shrink-0"
                  aria-label={`${item.title} hakkında WhatsApp ile iletişime geç`}
                >
                  WhatsApp
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

