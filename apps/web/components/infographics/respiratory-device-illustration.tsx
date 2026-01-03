'use client';

/**
 * RespiratoryDeviceIllustration: Medical-grade isometric SVG illustration
 * Clean, flat 3D style with medical color palette (Blues, Teals, Whites)
 * Includes animated status light for "live" feel
 */
export function RespiratoryDeviceIllustration() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-gradient-to-br from-blue-50/50 to-teal-50/30 rounded-2xl border border-slate-200/50">
      {/* SVG Illustration - Isometric Oxygen Concentrator */}
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full max-w-md"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Oksijen konsantratörü cihazı görseli"
      >
        {/* Device Base */}
        <g transform="translate(50, 150)">
          {/* Main Body - Isometric Perspective */}
          <path
            d="M 0 0 L 200 0 L 220 20 L 220 120 L 200 140 L 0 140 L -20 120 L -20 20 Z"
            fill="#E0F2FE"
            stroke="#0EA5E9"
            strokeWidth="2"
            className="drop-shadow-sm"
          />
          
          {/* Top Panel */}
          <rect x="20" y="20" width="160" height="30" fill="#F0F9FF" stroke="#0EA5E9" strokeWidth="1.5" rx="2" />
          
          {/* Control Panel */}
          <rect x="30" y="60" width="140" height="50" fill="#FFFFFF" stroke="#0EA5E9" strokeWidth="1.5" rx="3" />
          
          {/* Display Screen */}
          <rect x="40" y="70" width="120" height="30" fill="#0EA5E9" stroke="#0284C7" strokeWidth="1" rx="2" />
          <text x="100" y="90" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontFamily="system-ui" fontWeight="600">
            O₂
          </text>
          
          {/* Status Light - Animated Pulse */}
          <circle
            cx="180"
            cy="85"
            r="6"
            fill="#10B981"
            className="animate-pulse"
            style={{ animationDuration: '2s' }}
          >
            <title>Cihaz Durumu: Aktif</title>
          </circle>
          {/* Pulse Ring Effect */}
          <circle
            cx="180"
            cy="85"
            r="6"
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            opacity="0.4"
            className="animate-ping"
            style={{ animationDuration: '2s' }}
          />
          
          {/* Air Intake Vents */}
          <g transform="translate(50, 120)">
            {[0, 1, 2, 3, 4].map((i) => (
              <rect
                key={i}
                x={i * 20}
                y="0"
                width="12"
                height="15"
                fill="#CBD5E1"
                stroke="#94A3B8"
                strokeWidth="1"
                rx="1"
              />
            ))}
          </g>
          
          {/* Output Port */}
          <circle cx="10" cy="70" r="8" fill="#FFFFFF" stroke="#0EA5E9" strokeWidth="2" />
          <circle cx="10" cy="70" r="4" fill="#0EA5E9" />
          
          {/* Side Panel Details */}
          <rect x="-15" y="40" width="10" height="60" fill="#BAE6FD" stroke="#0EA5E9" strokeWidth="1" rx="1" />
          
          {/* Bottom Base */}
          <ellipse cx="100" cy="140" rx="110" ry="8" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" opacity="0.6" />
        </g>
        
        {/* Medical Symbol - Subtle */}
        <g transform="translate(320, 50)" opacity="0.1">
          <circle cx="0" cy="0" r="40" fill="none" stroke="#0EA5E9" strokeWidth="2" />
          <path
            d="M -20 0 L 0 -20 L 20 0 L 0 20 Z"
            fill="none"
            stroke="#0EA5E9"
            strokeWidth="2"
          />
        </g>
      </svg>
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #0EA5E9 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
    </div>
  );
}


