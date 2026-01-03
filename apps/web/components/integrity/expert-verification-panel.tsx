'use client';

import { AlertCircle, User, Award, Calendar } from 'lucide-react';
import type { ExpertProfile } from '@/lib/integrity/eslamed-experts';

interface ExpertVerificationPanelProps {
  expert: ExpertProfile | null | undefined;
  lastReviewDate: string;
  contentId?: string;
  contentType?: 'product' | 'blog' | 'guide';
  className?: string;
}

/**
 * ExpertVerificationPanel: 2027 ADSMantik Integrity Score - Content Authority (Medical E-A-T)
 * Displays the profile of the specialist who reviewed the content, including license number
 * and professional credentials. Shows last review date and alerts if content hasn't been audited for 6 months.
 */
export function ExpertVerificationPanel({
  expert,
  lastReviewDate,
  contentId,
  contentType = 'guide',
  className = '',
}: ExpertVerificationPanelProps) {
  // Defensive check: return null if expert is not provided
  if (!expert) {
    return null;
  }

  const reviewDate = new Date(lastReviewDate);
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const needsReview = reviewDate < sixMonthsAgo;

  return (
    <div className={`rounded-xl border border-slate-200 bg-white p-5 space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-blue-600" strokeWidth={2} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-slate-900 mb-1">Uzman Doğrulaması</h3>
          <p className="text-xs text-slate-600">
            Bu içerik tıbbi uzman tarafından gözden geçirilmiştir.
          </p>
        </div>
      </div>

      {/* Expert Profile */}
      <div className="space-y-2 pt-2 border-t border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-slate-900">{expert.name}</span>
            <Award className="w-3.5 h-3.5 text-amber-600" strokeWidth={2} />
          </div>
          <p className="text-xs text-slate-600">{expert.title}</p>
          <p className="text-xs text-slate-500">{expert.organization}</p>
        </div>

        {/* License Number */}
        {expert.licenseNumber && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Lisans No:</span>
            <span className="font-mono text-slate-700">{expert.licenseNumber}</span>
          </div>
        )}

        {/* Credentials */}
        {expert.credentials.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {expert.credentials.map((cred, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-xs text-slate-700"
              >
                {cred}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Last Review Date */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
        <Calendar className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
        <div className="flex-1">
          <div className="text-xs text-slate-500">Son Gözden Geçirme</div>
          <div className="text-xs font-medium text-slate-700">
            {reviewDate.toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
      </div>

      {/* Review Alert */}
      {needsReview && (
        <div className="rounded-lg border-2 border-amber-300 bg-amber-50 p-3 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
          <div>
            <div className="text-xs font-semibold text-amber-900 mb-1">Güncelleme Gerekli</div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Bu içerik 6 aydan uzun süredir gözden geçirilmedi. Tıbbi doğruluk için güncellenmesi önerilir.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Re-export ESLAMED_EXPERTS from the lib file for convenience
export { ESLAMED_EXPERTS } from '@/lib/integrity/eslamed-experts';

