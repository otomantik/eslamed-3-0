'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface Hotspot {
  id: string;
  x: number; // Percentage from left
  y: number; // Percentage from top
  tip: string;
}

/**
 * WheelchairIllustration: 3D isometric wheelchair with interactive hotspots
 * Enhanced with shadows, pulse animations, and hover effects for field tech demos
 * Zero external images, pure SVG
 */
export function WheelchairIllustration() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const hotspots: Hotspot[] = [
    {
      id: 'brakes',
      x: 28, // Left wheel brake lever (70 + 15 + 25 = 110) / 400 ≈ 27.5%
      y: 42, // (80 + 75 - 10 = 145) / 350 ≈ 41%
      tip: 'Merkezi Fren Sistemi\nTek dokunuşla tam sabitleme.',
    },
    {
      id: 'footrest',
      x: 27, // Left footrest center (70 + 25 + 15 = 110) / 400 ≈ 27.5%
      y: 40, // (80 + 60 = 140) / 350 ≈ 40%
      tip: 'Ayak desteği: Yükseklik ayarını kontrol edin',
    },
    {
      id: 'wheels',
      x: 21, // Left wheel center (70 + 15 = 85) / 400 ≈ 21%
      y: 44, // (80 + 75 = 155) / 350 ≈ 44%
      tip: 'Tekerlekler: Basınç ve lastik durumunu kontrol edin',
    },
  ];

  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-gradient-to-br from-teal-50/50 to-slate-50/30 rounded-2xl border border-slate-200/50 overflow-visible">
      {/* SVG Illustration - Enhanced Isometric Wheelchair */}
      <svg
        viewBox="0 0 400 350"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full max-w-md wheelchair-svg"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Tekerlekli sandalye cihazı görseli"
      >
        <defs>
          <linearGradient id="seatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0FDFA" />
            <stop offset="100%" stopColor="#CCFBF1" />
          </linearGradient>
          <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
        </defs>

        {/* Ground shadows - Wheel shadows for depth */}
        <g transform="translate(70, 80)">
          {/* Left wheel shadow */}
          <ellipse cx="95" cy="150" rx="18" ry="4" fill="#000000" opacity="0.1" />
          {/* Right wheel shadow */}
          <ellipse cx="155" cy="150" rx="18" ry="4" fill="#000000" opacity="0.1" />
          {/* Front caster shadows */}
          <ellipse cx="85" cy="155" rx="6" ry="2" fill="#000000" opacity="0.08" />
          <ellipse cx="185" cy="155" rx="6" ry="2" fill="#000000" opacity="0.08" />
        </g>

        {/* Wheelchair Frame - Isometric 3D Perspective */}
        <g transform="translate(70, 80)">
          {/* Metal Frame Structure */}
          <rect x="-8" y="10" width="6" height="50" fill="#0D9488" stroke="#0F766E" strokeWidth="1.5" rx="1" className="wheelchair-part" />
          <rect x="122" y="10" width="6" height="50" fill="#0D9488" stroke="#0F766E" strokeWidth="1.5" rx="1" className="wheelchair-part" />
          <rect x="-8" y="55" width="136" height="6" fill="#0D9488" stroke="#0F766E" strokeWidth="1.5" rx="1" className="wheelchair-part" />
          
          {/* Main Seat */}
          <path
            d="M 0 10 L 120 10 L 125 20 L 125 55 L 120 60 L 0 60 L -5 55 L -5 20 Z"
            fill="url(#seatGrad)"
            stroke="#14B8A6"
            strokeWidth="2.5"
            className="drop-shadow-md wheelchair-part"
          />
          <path
            d="M 5 15 L 118 15 L 120 22 L 120 53 L 118 58 L 5 58 L 3 53 L 3 22 Z"
            fill="#FFFFFF"
            stroke="#14B8A6"
            strokeWidth="1"
            opacity="0.7"
          />
          {/* Seat seams */}
          <g opacity="0.3">
            <line x1="30" y1="16" x2="30" y2="57" stroke="#0D9488" strokeWidth="0.5" />
            <line x1="60" y1="16" x2="60" y2="57" stroke="#0D9488" strokeWidth="0.5" />
            <line x1="90" y1="16" x2="90" y2="57" stroke="#0D9488" strokeWidth="0.5" />
          </g>
          
          {/* Backrest - Tall and angled */}
          <path
            d="M 0 -5 L 120 -5 L 125 5 L 125 15 L 120 12 L 0 12 L -5 15 L -5 5 Z"
            fill="url(#seatGrad)"
            stroke="#14B8A6"
            strokeWidth="2.5"
            className="wheelchair-part"
          />
          <path
            d="M 3 -3 L 117 -3 L 118 4 L 118 11 L 117 10 L 3 10 L 2 11 L 2 4 Z"
            fill="#FFFFFF"
            stroke="#14B8A6"
            strokeWidth="1"
            opacity="0.8"
          />
          {/* Backrest supports */}
          <rect x="15" y="-5" width="3" height="18" fill="#0D9488" opacity="0.4" />
          <rect x="55" y="-5" width="3" height="18" fill="#0D9488" opacity="0.4" />
          <rect x="95" y="-5" width="3" height="18" fill="#0D9488" opacity="0.4" />
          
          {/* Armrests - LEFT */}
          <path
            d="M -15 15 L -5 12 L -5 55 L -15 58 L -15 15 Z"
            fill="#B2F5EA"
            stroke="#14B8A6"
            strokeWidth="2"
            className="wheelchair-part"
          />
          <rect x="-12" y="18" width="4" height="35" fill="#CCFBF1" opacity="0.6" />
          <rect x="-13" y="35" width="6" height="8" fill="#F0FDFA" stroke="#14B8A6" strokeWidth="1" rx="1" />
          
          {/* Armrests - RIGHT */}
          <path
            d="M 125 12 L 135 15 L 135 58 L 125 55 L 125 12 Z"
            fill="#B2F5EA"
            stroke="#14B8A6"
            strokeWidth="2"
            className="wheelchair-part"
          />
          <rect x="128" y="18" width="4" height="35" fill="#CCFBF1" opacity="0.6" />
          <rect x="127" y="35" width="6" height="8" fill="#F0FDFA" stroke="#14B8A6" strokeWidth="1" rx="1" />
          
          {/* Footrests */}
          <g transform="translate(25, 60)" className="wheelchair-part">
            <path
              d="M 0 0 L 30 -5 L 32 3 L 2 8 Z"
              fill="#94A3B8"
              stroke="#64748B"
              strokeWidth="2"
            />
            <rect x="3" y="0" width="26" height="6" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.5" />
            <line x1="15" y1="8" x2="15" y2="12" stroke="#64748B" strokeWidth="2" />
          </g>
          <g transform="translate(65, 60)" className="wheelchair-part">
            <path
              d="M 0 0 L 30 -5 L 32 3 L 2 8 Z"
              fill="#94A3B8"
              stroke="#64748B"
              strokeWidth="2"
            />
            <rect x="3" y="0" width="26" height="6" fill="#CBD5E1" stroke="#64748B" strokeWidth="0.5" />
            <line x1="15" y1="8" x2="15" y2="12" stroke="#64748B" strokeWidth="2" />
          </g>
          
          {/* Large Rear Wheels */}
          {/* Left rear wheel */}
          <g transform="translate(15, 75)" className="wheelchair-part">
            <circle cx="0" cy="0" r="32" fill="#E2E8F0" stroke="#64748B" strokeWidth="3" />
            <circle cx="0" cy="0" r="28" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
            <circle cx="0" cy="0" r="12" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
            <circle cx="0" cy="0" r="6" fill="#64748B" />
            
            {/* Spokes - pre-calculated to avoid hydration mismatch (18 spokes, 20° intervals) */}
            <line x1="0" y1="0" x2="26.311" y2="9.576" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="21.449" y2="17.998" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="14" y2="24.249" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="4.846" y2="27.517" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-4.846" y2="27.517" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-14" y2="24.249" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-21.449" y2="17.998" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-26.311" y2="9.576" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-28" y2="0" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-26.311" y2="-9.576" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-21.449" y2="-17.998" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-14" y2="-24.249" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-4.846" y2="-27.517" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="4.846" y2="-27.517" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="14" y2="-24.249" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="21.449" y2="-17.998" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="26.311" y2="-9.576" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="28" y2="0" stroke="#94A3B8" strokeWidth="0.8" />
            
            {/* Handrim - Outer push rim */}
            <circle cx="0" cy="0" r="30" fill="none" stroke="#14B8A6" strokeWidth="4" opacity="0.8" />
            <circle cx="0" cy="0" r="30" fill="none" stroke="#0D9488" strokeWidth="1.5" />
            
            {/* Brake Lever - ENHANCED with pulse animation */}
            <g className="brake-lever-group">
              <path
                d="M 25 -12 L 35 -15 L 38 -8 L 28 -5 Z"
                fill="#10B981"
                stroke="#059669"
                strokeWidth="2"
                className="brake-lever-pulse"
              />
              <rect x="30" y="-15" width="3" height="18" fill="#059669" />
              <circle cx="33" cy="5" r="3" fill="#10B981" stroke="#059669" strokeWidth="1.5" className="brake-lever-pulse" />
            </g>
          </g>
          
          {/* Right rear wheel */}
          <g transform="translate(75, 75)" className="wheelchair-part">
            <circle cx="0" cy="0" r="32" fill="#E2E8F0" stroke="#64748B" strokeWidth="3" />
            <circle cx="0" cy="0" r="28" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
            <circle cx="0" cy="0" r="12" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
            <circle cx="0" cy="0" r="6" fill="#64748B" />
            
            {/* Spokes - pre-calculated to avoid hydration mismatch (18 spokes, 20° intervals) */}
            <line x1="0" y1="0" x2="26.311" y2="9.576" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="21.449" y2="17.998" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="14" y2="24.249" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="4.846" y2="27.517" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-4.846" y2="27.517" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-14" y2="24.249" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-21.449" y2="17.998" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-26.311" y2="9.576" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-28" y2="0" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-26.311" y2="-9.576" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-21.449" y2="-17.998" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-14" y2="-24.249" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-4.846" y2="-27.517" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="4.846" y2="-27.517" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="14" y2="-24.249" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="21.449" y2="-17.998" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="26.311" y2="-9.576" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="28" y2="0" stroke="#94A3B8" strokeWidth="0.8" />
            
            <circle cx="0" cy="0" r="30" fill="none" stroke="#14B8A6" strokeWidth="4" opacity="0.8" />
            <circle cx="0" cy="0" r="30" fill="none" stroke="#0D9488" strokeWidth="1.5" />
            
            {/* Brake Lever - ENHANCED */}
            <g className="brake-lever-group">
              <path
                d="M 25 -12 L 35 -15 L 38 -8 L 28 -5 Z"
                fill="#10B981"
                stroke="#059669"
                strokeWidth="2"
                className="brake-lever-pulse"
              />
              <rect x="30" y="-15" width="3" height="18" fill="#059669" />
              <circle cx="33" cy="5" r="3" fill="#10B981" stroke="#059669" strokeWidth="1.5" className="brake-lever-pulse" />
            </g>
          </g>
          
          {/* Front Casters */}
          <g transform="translate(5, 80)" className="wheelchair-part">
            <path
              d="M 0 0 L -4 -8 L 4 -8 L 0 0 Z"
              fill="#64748B"
              stroke="#475569"
              strokeWidth="1.5"
            />
            <circle cx="0" cy="0" r="10" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="2" />
            <circle cx="0" cy="0" r="7" fill="#F1F5F9" stroke="#64748B" strokeWidth="1" />
            <circle cx="0" cy="0" r="3" fill="#64748B" />
            {/* Spokes - pre-calculated (5 spokes, 72° intervals) */}
            <line x1="0" y1="0" x2="6.66" y2="2.163" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-2.063" y2="6.537" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-6.66" y2="-2.163" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="2.063" y2="-6.537" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="7" y2="0" stroke="#94A3B8" strokeWidth="0.8" />
          </g>
          
          <g transform="translate(105, 80)" className="wheelchair-part">
            <path
              d="M 0 0 L -4 -8 L 4 -8 L 0 0 Z"
              fill="#64748B"
              stroke="#475569"
              strokeWidth="1.5"
            />
            <circle cx="0" cy="0" r="10" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="2" />
            <circle cx="0" cy="0" r="7" fill="#F1F5F9" stroke="#64748B" strokeWidth="1" />
            <circle cx="0" cy="0" r="3" fill="#64748B" />
            {/* Spokes - pre-calculated (5 spokes, 72° intervals) */}
            <line x1="0" y1="0" x2="6.66" y2="2.163" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-2.063" y2="6.537" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-6.66" y2="-2.163" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="2.063" y2="-6.537" stroke="#94A3B8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="7" y2="0" stroke="#94A3B8" strokeWidth="0.8" />
          </g>
          
          {/* Frame connectors */}
          <line x1="15" y1="55" x2="15" y2="75" stroke="#0D9488" strokeWidth="3" className="wheelchair-part" />
          <line x1="75" y1="55" x2="75" y2="75" stroke="#0D9488" strokeWidth="3" className="wheelchair-part" />
        </g>
      </svg>
      
      {/* Interactive Hotspots */}
      {hotspots.map((hotspot) => (
        <div
          key={hotspot.id}
          className="absolute"
          style={{
            left: `${hotspot.x}%`,
            top: `${hotspot.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <button
            onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
            className="relative w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg hover:bg-teal-700 transition-all hover:scale-110 z-10"
            aria-label={`İpucu: ${hotspot.tip}`}
          >
            {activeHotspot === hotspot.id ? (
              <X className="w-4 h-4" strokeWidth={2} />
            ) : (
              <Plus className="w-4 h-4" strokeWidth={2} />
            )}
          </button>
          
          {/* Tooltip with Label and Sub-text - Mobile responsive positioning */}
          {activeHotspot === hotspot.id && (
            <div
              className={`
                absolute p-4 bg-slate-900 text-white text-xs rounded-lg shadow-xl z-20
                w-[min(calc(100vw-2rem),224px)] sm:w-56
                ${hotspot.x < 20 ? 'left-0 transform-none' : hotspot.x > 80 ? 'right-0 transform-none' : 'left-1/2 -translate-x-1/2'}
                ${hotspot.y > 70 ? 'bottom-full mb-2 top-auto' : 'top-full mt-2'}
              `}
            >
              <p className="font-semibold text-sm mb-1">{hotspot.tip.split('\n')[0]}</p>
              <p className="text-xs text-slate-300 leading-relaxed">{hotspot.tip.split('\n')[1] || ''}</p>
              {/* Arrow - position based on tooltip placement */}
              <div
                className={`absolute w-2 h-2 bg-slate-900 rotate-45 ${
                  hotspot.y > 70
                    ? 'bottom-[-4px] left-1/2 -translate-x-1/2'
                    : 'top-[-4px] left-1/2 -translate-x-1/2'
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
