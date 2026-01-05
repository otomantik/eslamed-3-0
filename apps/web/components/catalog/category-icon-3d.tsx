'use client';

import type { SearchItem } from '@/lib/search/search-config';

interface CategoryIcon3DProps {
  item: SearchItem;
  className?: string;
}

/**
 * CategoryIcon3D: High-quality 3D isometric SVG icons for medical categories
 * Fallback for when product images are not available
 */
export function CategoryIcon3D({ item, className = '' }: CategoryIcon3DProps) {
  const category = item.category.toLowerCase();
  const isRespiratory = category.includes('solunum') || item.tags.some((t) => t.includes('oksijen') || t.includes('solunum'));
  const isMeasurement = category.includes('ölçüm') || category.includes('tanı') || item.tags.some((t) => t.includes('tansiyon') || t.includes('ölçüm'));
  const isHomeCare = category.includes('evde bakım') || category.includes('bakım') || item.tags.some((t) => t.includes('yatak') || t.includes('mobilite'));
  const isOrthopedic = category.includes('ortopedi') || item.tags.some((t) => t.includes('ortopedi') || t.includes('tabanlık'));

  // Respiratory device (Oxygen Concentrator style)
  if (isRespiratory) {
    return (
      <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg" aria-label={`${item.category} ikonu`}>
        <defs>
          <linearGradient id="respGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
        </defs>
        {/* Device body - isometric */}
        <path d="M 10 20 L 50 15 L 54 45 L 14 50 Z" fill="url(#respGrad)" stroke="#0EA5E9" strokeWidth="1.5" />
        <path d="M 14 50 L 54 45 L 52 55 L 12 60 Z" fill="#BAE6FD" stroke="#0EA5E9" strokeWidth="1" />
        {/* Control panel */}
        <rect x="20" y="25" width="24" height="12" fill="#F0F9FF" stroke="#0284C7" strokeWidth="1" rx="2" />
        <circle cx="26" cy="31" r="2" fill="#0EA5E9" />
        <circle cx="32" cy="31" r="2" fill="#0EA5E9" />
        <circle cx="38" cy="31" r="2" fill="#0EA5E9" />
      </svg>
    );
  }

  // Measurement device (BP Monitor style)
  if (isMeasurement) {
    return (
      <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg" aria-label={`${item.category} ikonu`}>
        <defs>
          <linearGradient id="measGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0FDF4" />
            <stop offset="100%" stopColor="#BBF7D0" />
          </linearGradient>
        </defs>
        {/* Monitor body */}
        <rect x="12" y="15" width="40" height="28" fill="url(#measGrad)" stroke="#10B981" strokeWidth="1.5" rx="3" />
        {/* Screen */}
        <rect x="16" y="19" width="32" height="18" fill="#FFFFFF" stroke="#059669" strokeWidth="1" rx="2" />
        {/* Display lines */}
        <line x1="20" y1="25" x2="44" y2="25" stroke="#10B981" strokeWidth="1.5" />
        <line x1="20" y1="30" x2="40" y2="30" stroke="#10B981" strokeWidth="1.5" />
        {/* Stand */}
        <rect x="28" y="43" width="8" height="12" fill="#86EFAC" stroke="#10B981" strokeWidth="1" rx="1" />
      </svg>
    );
  }

  // Home care (Medical Bed style)
  if (isHomeCare) {
    return (
      <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg" aria-label={`${item.category} ikonu`}>
        <defs>
          <linearGradient id="careGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
        </defs>
        {/* Bed frame */}
        <path d="M 8 25 L 56 20 L 58 35 L 10 40 Z" fill="url(#careGrad)" stroke="#F59E0B" strokeWidth="1.5" />
        {/* Mattress */}
        <rect x="12" y="27" width="40" height="8" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" rx="2" />
        {/* Headboard */}
        <rect x="10" y="20" width="6" height="18" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1" rx="1" />
        {/* Legs */}
        <rect x="15" y="38" width="3" height="8" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
        <rect x="46" y="38" width="3" height="8" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
      </svg>
    );
  }

  // Orthopedic (Foot/Insole style)
  if (isOrthopedic) {
    return (
      <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg" aria-label={`${item.category} ikonu`}>
        <defs>
          <linearGradient id="orthoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCE7F3" />
            <stop offset="100%" stopColor="#FBCFE8" />
          </linearGradient>
        </defs>
        {/* Insole shape */}
        <path d="M 15 20 Q 25 15 35 18 Q 45 22 50 30 Q 52 38 48 45 Q 42 50 32 48 Q 22 46 18 40 Q 12 35 14 28 Q 15 23 15 20 Z" fill="url(#orthoGrad)" stroke="#EC4899" strokeWidth="1.5" />
        {/* Arch support highlight */}
        <path d="M 28 25 Q 32 28 28 35" stroke="#DB2777" strokeWidth="1.5" fill="none" strokeDasharray="2,2" />
      </svg>
    );
  }

  // Default medical cross
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg" aria-label={`${item.category} ikonu`}>
      <defs>
        <linearGradient id="defaultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="24" fill="url(#defaultGrad)" stroke="#64748B" strokeWidth="2" />
      <path d="M 32 18 L 32 46 M 18 32 L 46 32" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}


