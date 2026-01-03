'use client';

import { Video, Camera, CheckCircle2 } from 'lucide-react';

interface ComingSoonCardProps {
  title?: string;
  subtitle?: string;
  icon?: 'video' | 'camera';
  badge?: string;
}

/**
 * ComingSoonCard: Intentional placeholder that signals active maintenance
 * Changes perception from "Missing Content" to "Active Maintenance"
 */
export function ComingSoonCard({
  title = 'Görsel Anlatım Hazırlanıyor',
  subtitle = 'Teknik ekip tarafından hazırlanıyor',
  icon = 'video',
  badge = 'Teknik Ekip Onaylı',
}: ComingSoonCardProps) {
  const IconComponent = icon === 'video' ? Video : Camera;

  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-blue-50/30 p-8 text-center">
      <div className="flex flex-col items-center gap-4">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
          <IconComponent className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

        {/* Subtitle */}
        <p className="text-sm text-slate-600 leading-relaxed max-w-sm" style={{ lineHeight: 1.8 }}>
          {subtitle}
        </p>

        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" strokeWidth={2} />
            <span className="text-xs font-semibold text-emerald-700">{badge}</span>
          </div>
        )}
      </div>
    </div>
  );
}


