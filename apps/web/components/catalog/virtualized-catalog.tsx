'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { CheckCircle2, X, GitCompare, Shield } from 'lucide-react';
import type { SearchItem } from '@/lib/search/search-config';
import type { IntentMode } from '@/lib/intent/detector';
import { ResultSnippet } from './result-snippet';
import { CategoryIcon3D } from './category-icon-3d';
import { IntegrityBadge } from '@/components/integrity/integrity-badge';

interface VirtualizedCatalogProps {
  items: SearchItem[];
  mode?: IntentMode;
  onItemClick?: (item: SearchItem, rank: number) => void;
  comparisonMode?: boolean;
  onComparisonToggle?: (itemIds: string[]) => void;
}

function makeWhatsAppLink(title: string) {
  return `https://wa.me/905372425535?text=${encodeURIComponent(
    `Merhaba, ${title} hakkında kurulum ve fiyat bilgisi almak istiyorum.`
  )}`;
}

/**
 * ProductImage: Multi-layer fallback system
 * Priority 1: High-res WebP product image
 * Priority 2: High-quality 3D category-specific medical icons
 * Priority 3: Text placeholder (category initial)
 */
function ProductImage({ item, className = '' }: { item: SearchItem; className?: string }) {
  const [imageError, setImageError] = useState(false);
  const [use3DIcon, setUse3DIcon] = useState(false);

  // Try WebP image first
  if (item.imageUrl && !imageError && !use3DIcon) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover"
          sizes="64px"
          onError={() => setImageError(true)}
          onLoad={() => {
            // If image loads successfully, keep it
          }}
        />
        {/* Fallback if image fails to load */}
        {imageError && (
          <div className="absolute inset-0" onLoad={() => setUse3DIcon(true)}>
            <CategoryIcon3D item={item} className="w-full h-full" />
          </div>
        )}
      </div>
    );
  }

  // Fallback to 3D category icon
  return (
    <div className={className}>
      <CategoryIcon3D item={item} className="w-full h-full" />
    </div>
  );
}

/**
 * UTSCertifiedBadge: Shows UTS registration status
 */
function UTSCertifiedBadge({ item }: { item: SearchItem }) {
  const uts = item.utsRegistration;
  if (!uts?.registered) return null;

  return (
    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-xs">
      <Shield className="w-3 h-3 text-emerald-600" strokeWidth={2} />
      <span className="text-emerald-700 font-medium">ÜTS Kayıtlı</span>
      {uts.registrationNumber && (
        <span className="text-emerald-600 font-mono text-[10px] ml-1">{uts.registrationNumber.slice(0, 6)}</span>
      )}
    </div>
  );
}

/**
 * TechnicalSpecsDisplay: Shows specs for comparison mode
 */
function TechnicalSpecsDisplay({ item, compact = false }: { item: SearchItem; compact?: boolean }) {
  const specs = item.technicalSpecs;
  if (!specs) return null;

  if (compact) {
    return (
      <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
        {specs.noiseLevel !== undefined && (
          <span title="Gürültü seviyesi">
            🔊 {specs.noiseLevel} dB
          </span>
        )}
        {specs.weight !== undefined && (
          <span title="Ağırlık">
            ⚖️ {specs.weight} kg
          </span>
        )}
        {specs.batteryLife !== undefined && (
          <span title="Pil ömrü">
            🔋 {specs.batteryLife} saat
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
      {specs.noiseLevel !== undefined && (
        <div className="flex flex-col">
          <span className="text-slate-500">Gürültü</span>
          <span className="text-slate-900 font-semibold">{specs.noiseLevel} dB</span>
        </div>
      )}
      {specs.weight !== undefined && (
        <div className="flex flex-col">
          <span className="text-slate-500">Ağırlık</span>
          <span className="text-slate-900 font-semibold">{specs.weight} kg</span>
        </div>
      )}
      {specs.batteryLife !== undefined && (
        <div className="flex flex-col">
          <span className="text-slate-500">Pil Ömrü</span>
          <span className="text-slate-900 font-semibold">{specs.batteryLife} saat</span>
        </div>
      )}
    </div>
  );
}

/**
 * VirtualizedCatalog: High-performance rendering for 2500+ items
 * Enhanced with:
 * - Multi-layer image fallback (WebP -> 3D icons -> placeholder)
 * - UTS certification badges
 * - Comparison mode for technical specs
 */
export function VirtualizedCatalog({ 
  items, 
  mode, 
  onItemClick,
  comparisonMode = false,
  onComparisonToggle
}: VirtualizedCatalogProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [selectedForComparison, setSelectedForComparison] = useState<Set<string>>(new Set());

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => comparisonMode ? 140 : 88, // Taller when showing specs
    overscan: 10,
  });

  const toggleComparison = (itemId: string) => {
    const newSelected = new Set(selectedForComparison);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedForComparison(newSelected);
    onComparisonToggle?.(Array.from(newSelected));
  };

  return (
    <div className="space-y-4">
      {/* Comparison Mode Toggle */}
      {comparisonMode && selectedForComparison.size > 0 && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-blue-900">
            <GitCompare className="w-4 h-4" strokeWidth={2} />
            <span className="font-semibold">{selectedForComparison.size} ürün karşılaştırılıyor</span>
          </div>
          <button
            onClick={() => {
              setSelectedForComparison(new Set());
              onComparisonToggle?.([]);
            }}
            className="text-xs text-blue-700 hover:text-blue-900 underline"
          >
            Temizle
          </button>
        </div>
      )}

      <div
        ref={parentRef}
        className="max-h-[520px] overflow-auto"
        style={{ contain: 'strict' }}
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
            const rank = virtualRow.index + 1;
            const isSelected = selectedForComparison.has(item.id);
            const hasSpecs = Boolean(item.technicalSpecs);

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
                <div 
                  className={`h-full rounded-2xl border transition-all px-5 py-4 flex items-center justify-between gap-4 ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  {/* Image with multi-layer fallback */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative">
                    <ProductImage item={item} className="w-full h-full" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <div className="text-base font-semibold text-slate-900 truncate">{item.title}</div>
                          <IntegrityBadge item={item} />
                        </div>
                        <div className="text-sm text-slate-600 truncate">{item.category}</div>
                      </div>

                      {/* Comparison mode checkbox */}
                      {comparisonMode && hasSpecs && (
                        <button
                          onClick={() => toggleComparison(item.id)}
                          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-slate-300 hover:border-blue-300'
                          }`}
                          aria-label={`${item.title} karşılaştırmaya ${isSelected ? 'ekle' : 'çıkar'}`}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={2} />}
                        </button>
                      )}
                    </div>
                    
                    {/* Mode-specific result snippets */}
                    {mode && <ResultSnippet item={item} mode={mode} rank={rank} />}
                    
                    {/* Technical specs - show in comparison mode or when item is selected */}
                    {(comparisonMode || isSelected) && hasSpecs && (
                      <TechnicalSpecsDisplay item={item} compact={!comparisonMode} />
                    )}

                    {/* Full specs in comparison mode for selected items */}
                    {comparisonMode && isSelected && hasSpecs && (
                      <TechnicalSpecsDisplay item={item} compact={false} />
                    )}
                    
                    {/* Tags */}
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
                    onClick={() => onItemClick?.(item, rank)}
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
    </div>
  );
}
