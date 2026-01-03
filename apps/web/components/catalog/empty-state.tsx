'use client';

import { MessageCircle, X } from 'lucide-react';

interface EmptyStateProps {
  query?: string;
  category?: string;
  onClearFilters: () => void;
}

/**
 * EmptyState: No-results UX with WhatsApp CTA
 * "Size en yakın alternatifi bulalım" CTA
 */
export function EmptyState({ query, category, onClearFilters }: EmptyStateProps) {
  const whatsAppMessage = query
    ? `Merhaba, "${query}" araması için sonuç bulamadım. Size en yakın alternatifi bulabilir misiniz?`
    : category
    ? `Merhaba, "${category}" kategorisinde aradığım ürünü bulamadım. Size en yakın alternatifi bulabilir misiniz?`
    : 'Merhaba, aradığım ürünü bulamadım. Size en yakın alternatifi bulabilir misiniz?';

  const whatsAppUrl = `https://wa.me/905372425535?text=${encodeURIComponent(whatsAppMessage)}`;

  return (
    <div className="p-8 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <X className="w-8 h-8 text-slate-400" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Sonuç bulunamadı
        </h3>
        <p className="text-slate-600 mb-6" style={{ lineHeight: 1.8 }}>
          {query
            ? `"${query}" araması için sonuç bulunamadı. Size en yakın alternatifi bulalım.`
            : category
            ? `"${category}" kategorisinde sonuç bulunamadı. Size en yakın alternatifi bulalım.`
            : 'Bu filtreler için sonuç bulunamadı. Size en yakın alternatifi bulalım.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className="min-h-[56px] inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-6 font-semibold transition-colors"
            aria-label="WhatsApp ile en yakın alternatifi bul"
          >
            <MessageCircle className="w-5 h-5" strokeWidth={2} />
            <span>Size En Yakın Alternatifi Bulalım</span>
          </a>
          <button
            onClick={onClearFilters}
            className="min-h-[56px] inline-flex items-center justify-center rounded-xl border-2 border-slate-300 hover:border-slate-400 text-slate-900 px-6 font-semibold transition-colors"
            aria-label="Filtreleri temizle"
          >
            Filtreleri Temizle
          </button>
        </div>
      </div>
    </div>
  );
}



