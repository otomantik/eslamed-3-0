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
 * MedicalBedIllustration: 3D isometric medical bed with interactive hotspots
 * Enhanced with shadows, improved 3D perspective, and hover effects
 * Zero external images, pure SVG
 */
export function MedicalBedIllustration() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const hotspots: Hotspot[] = [
    {
      id: 'head',
      x: 30, // Head section center (50 + 70 = 120) / 400 = 30%
      y: 33, // Rotated head center approx (80 + 35 = 115) / 350 ≈ 33%
      tip: 'Elektronik Baş Ayarı\nSolunum konforu için 0-85° açı.',
    },
    {
      id: 'side',
      x: 9, // Left safety rail center (50 - 18 + 5 = 37) / 400 ≈ 9%
      y: 38, // (80 + 15 + 37.5 = 132.5) / 350 ≈ 38%
      tip: 'Güvenlik Korkuluğu\nParmak sıkışmasını önleyen emniyet kilidi.',
    },
    {
      id: 'base',
      x: 55, // Anti-trendelenburg base center (50 + 110 + 60 = 220) / 400 = 55%
      y: 54, // (80 + 105 + 5 = 190) / 350 ≈ 54%
      tip: 'Anti-Trendelenburg\nÖdem ve dolaşım yönetimi desteği.',
    },
    {
      id: 'wheels',
      x: 17.5, // First wheel center (50 + 20 = 70) / 400 = 17.5%
      y: 61, // (80 + 135 = 215) / 350 ≈ 61%
      tip: 'Merkezi Fren Sistemi\nTek dokunuşla tam sabitleme.',
    },
  ];

  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-gradient-to-br from-blue-50/60 to-indigo-50/40 rounded-2xl border border-blue-200/50 overflow-visible">
      {/* SVG Illustration - Enhanced High-Fidelity 4-Motor Medical Bed */}
      <svg
        viewBox="0 0 400 350"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full max-w-md medical-bed-svg"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="4 motorlu hasta yatağı cihazı görseli"
      >
        <defs>
          <pattern id="metalTexture" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="20" y2="20" stroke="#BAE6FD" strokeWidth="0.5" opacity="0.3" />
          </pattern>
          <linearGradient id="mattressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>
        </defs>

        {/* Ground shadows - Wheel shadows for depth */}
        <g transform="translate(50, 80)">
          {[0, 1, 2, 3].map((i) => (
            <ellipse
              key={i}
              cx={20 + i * 60}
              cy="138"
              rx="10"
              ry="3"
              fill="#000000"
              opacity="0.1"
            />
          ))}
        </g>

        {/* Bed Frame - Enhanced Isometric 3D Perspective */}
        <g transform="translate(50, 80)">
          {/* Headboard - Vertical back support */}
          <rect x="-5" y="-30" width="8" height="70" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" rx="1" className="medical-bed-part" />
          <rect x="-3" y="-28" width="4" height="66" fill="#F1F5F9" opacity="0.5" />
          
          {/* Main Bed Frame Base */}
          <path
            d="M 0 0 L 240 0 L 260 15 L 260 95 L 240 110 L 0 110 L -20 95 L -20 15 Z"
            fill="#E2E8F0"
            stroke="#94A3B8"
            strokeWidth="2.5"
            className="drop-shadow-md medical-bed-part"
          />
          <path
            d="M 0 0 L 240 0 L 260 15 L 260 95 L 240 110 L 0 110 L -20 95 L -20 15 Z"
            fill="url(#metalTexture)"
            opacity="0.5"
          />
          
          {/* Head Section - ELEVATED at 35° angle */}
          <g transform="rotate(-35 80 60)" className="medical-bed-part">
            <path
              d="M 20 20 L 120 5 L 125 30 L 25 45 Z"
              fill="#DBEAFE"
              stroke="#3B82F6"
              strokeWidth="2"
            />
            <path
              d="M 25 25 L 118 12 L 121 32 L 28 43 Z"
              fill="url(#mattressGrad)"
              stroke="#0EA5E9"
              strokeWidth="1.5"
            />
            <g opacity="0.3">
              {[0, 1, 2, 3].map((i) => (
                <line
                  key={i}
                  x1={30 + i * 22}
                  y1={26}
                  x2={32 + i * 22}
                  y2={41}
                  stroke="#0EA5E9"
                  strokeWidth="0.5"
                />
              ))}
            </g>
          </g>
          
          {/* Center Mattress Section - Flat */}
          <rect x="120" y="25" width="120" height="60" fill="url(#mattressGrad)" stroke="#0EA5E9" strokeWidth="1.5" rx="3" className="medical-bed-part" />
          <g opacity="0.25">
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1={125 + i * 24}
                y1="28"
                x2={125 + i * 24}
                y2="82"
                stroke="#0EA5E9"
                strokeWidth="0.5"
              />
            ))}
          </g>
          
          {/* Foot Section - Slightly elevated at 15° */}
          <g transform="rotate(-15 80 95)" className="medical-bed-part">
            <path
              d="M 20 75 L 120 70 L 122 95 L 22 100 Z"
              fill="#DBEAFE"
              stroke="#3B82F6"
              strokeWidth="2"
            />
            <path
              d="M 23 77 L 118 73 L 119.5 92 L 24.5 97 Z"
              fill="url(#mattressGrad)"
              stroke="#0EA5E9"
              strokeWidth="1.5"
            />
            <g opacity="0.3">
              {[0, 1, 2, 3].map((i) => (
                <line
                  key={i}
                  x1={28 + i * 22}
                  y1={78}
                  x2={29 + i * 22}
                  y2={94}
                  stroke="#0EA5E9"
                  strokeWidth="0.5"
                />
              ))}
            </g>
          </g>
          
          {/* Control Panel - Central hanging */}
          <rect x="140" y="40" width="80" height="35" fill="#FFFFFF" stroke="#0EA5E9" strokeWidth="2" rx="4" className="medical-bed-part" />
          <rect x="145" y="45" width="70" height="25" fill="#F8FAFC" stroke="#3B82F6" strokeWidth="1" rx="2" />
          {/* Control buttons */}
          <circle cx="165" cy="57" r="4" fill="#0EA5E9" opacity="0.7" />
          <circle cx="180" cy="57" r="4" fill="#10B981" className="animate-pulse" style={{ animationDuration: '2s' }} />
          <circle cx="195" cy="57" r="4" fill="#0EA5E9" opacity="0.7" />
          
          {/* Side Rails - TALL and VISIBLE safety rails */}
          <g className="medical-bed-part">
            {/* Left Rail */}
            <rect x="-18" y="15" width="10" height="75" fill="#BAE6FD" stroke="#0EA5E9" strokeWidth="2" rx="2" />
            <rect x="-16" y="18" width="6" height="69" fill="#DBEAFE" opacity="0.6" />
            <rect x="-12" y="35" width="2" height="35" fill="#3B82F6" />
            <circle cx="-11" cy="50" r="2.5" fill="#10B981" className="animate-pulse" style={{ animationDuration: '2s' }} />
            
            {/* Right Rail */}
            <rect x="240" y="15" width="10" height="75" fill="#BAE6FD" stroke="#0EA5E9" strokeWidth="2" rx="2" />
            <rect x="242" y="18" width="6" height="69" fill="#DBEAFE" opacity="0.6" />
            <rect x="242" y="35" width="2" height="35" fill="#3B82F6" />
            <circle cx="243" cy="50" r="2.5" fill="#10B981" className="animate-pulse" style={{ animationDuration: '2s' }} />
          </g>
          
          {/* Bed Frame Legs/Supports */}
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={i * 75 - 4} y="110" width="8" height="25" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" rx="1" className="medical-bed-part" />
          ))}
          
          {/* Wheels with Lock Mechanism - Enhanced with shadows */}
          <g transform="translate(20, 135)">
            {[0, 1, 2, 3].map((i) => (
              <g key={i} transform={`translate(${i * 70}, 0)`} className="medical-bed-part">
                <circle cx="0" cy="0" r="14" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
                <circle cx="0" cy="0" r="10" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" />
                <circle cx="0" cy="0" r="5" fill="#64748B" />
                {/* Spokes - pre-calculated to avoid hydration mismatch */}
                <line x1="0" y1="0" x2="10" y2="0" stroke="#94A3B8" strokeWidth="0.8" />
                <line x1="0" y1="0" x2="5" y2="8.6603" stroke="#94A3B8" strokeWidth="0.8" />
                <line x1="0" y1="0" x2="-5" y2="8.6603" stroke="#94A3B8" strokeWidth="0.8" />
                <line x1="0" y1="0" x2="-10" y2="0" stroke="#94A3B8" strokeWidth="0.8" />
                <line x1="0" y1="0" x2="-5" y2="-8.6603" stroke="#94A3B8" strokeWidth="0.8" />
                <line x1="0" y1="0" x2="5" y2="-8.6603" stroke="#94A3B8" strokeWidth="0.8" />
                {/* Brake lever - Enhanced with pulse */}
                <g className="brake-lever-group">
                  <rect x="10" y="-10" width="6" height="12" fill="#10B981" stroke="#059669" strokeWidth="1" rx="1" className="brake-lever-pulse" />
                </g>
              </g>
            ))}
          </g>
          
          {/* Anti-Trendelenburg Base */}
          <rect x="110" y="105" width="120" height="10" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" rx="2" className="medical-bed-part" />
          <g opacity="0.4">
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1={115 + i * 24}
                y1="107"
                x2={115 + i * 24}
                y2="113"
                stroke="#64748B"
                strokeWidth="0.8"
              />
            ))}
          </g>
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
            className="relative w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-lg hover:bg-[#1D4ED8] transition-all hover:scale-110 z-10"
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
