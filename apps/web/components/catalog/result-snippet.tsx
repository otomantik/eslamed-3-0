'use client';

import { Clock, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import type { IntentMode } from '@/lib/intent/detector';
import type { SearchItem } from '@/lib/search/search-config';

interface ResultSnippetProps {
  item: SearchItem;
  mode: IntentMode;
  rank?: number;
}

/**
 * ResultSnippet: Mode-specific badges and tooltips
 * URGENT: "Aynı Gün Kurulum" / "Stokta Var"
 * RESEARCH: "Teknik Detayları İncele" / "Uzman Görüşü"
 * VIP: "Kişiye Özel Analiz Dahil"
 */
export function ResultSnippet({ item, mode, rank }: ResultSnippetProps) {
  const badges: React.ReactNode[] = [];

  // URGENT mode badges
  if (mode === 'CRITICAL_EMERGENCY') {
    if (item.filters?.includes('kurulum')) {
      badges.push(
        <span
          key="same-day"
          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-red-100 text-red-700 font-semibold"
        >
          <Clock className="w-3 h-3" strokeWidth={2} />
          Aynı Gün Kurulum
        </span>
      );
    }
    if (item.isUrgent) {
      badges.push(
        <span
          key="in-stock"
          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700 font-semibold"
        >
          <CheckCircle2 className="w-3 h-3" strokeWidth={2} />
          Stokta Var
        </span>
      );
    }
  }

  // RESEARCH mode badges
  if (mode === 'INFORMATION_SEEKER') {
    if (item.kind === 'guide' || item.href) {
      badges.push(
        <span
          key="tech-details"
          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-semibold"
          title="Teknik detayları ve kullanım kılavuzunu inceleyin"
        >
          <FileText className="w-3 h-3" strokeWidth={2} />
          Teknik Detayları İncele
        </span>
      );
    }
    if (item.intent_weights?.research && item.intent_weights.research >= 0.7) {
      badges.push(
        <span
          key="expert-opinion"
          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-slate-100 text-slate-700 font-semibold"
          title="Uzman görüşü ve karşılaştırma bilgisi mevcut"
        >
          <FileText className="w-3 h-3" strokeWidth={2} />
          Uzman Görüşü
        </span>
      );
    }
  }

  // VIP mode badges
  if (mode === 'TRUST_SEEKER') {
    if (item.kind === 'vip' || item.filters?.includes('vip')) {
      badges.push(
        <span
          key="custom-analysis"
          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-amber-100 text-amber-700 font-semibold"
        >
          <Sparkles className="w-3 h-3" strokeWidth={2} />
          Kişiye Özel Analiz Dahil
        </span>
      );
    }
  }

  if (badges.length === 0) return null;

  return (
    <div className="mt-1 flex flex-wrap gap-1">
      {badges}
    </div>
  );
}


