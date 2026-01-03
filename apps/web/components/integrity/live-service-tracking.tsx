'use client';

import { useState, useEffect } from 'react';
import { MapPin, Clock, User, Phone, Loader2, Navigation } from 'lucide-react';

interface TechnicianLocation {
  technicianId: string;
  technicianName: string;
  phone: string;
  latitude: number;
  longitude: number;
  estimatedArrival: string; // ISO timestamp
  status: 'dispatched' | 'en_route' | 'arrived';
}

interface LiveServiceTrackingProps {
  serviceRequestId?: string;
  customerAddress?: string;
  onClose?: () => void;
}

/**
 * LiveServiceTracking: 2027 ADSMantik Integrity Score - Real-Time Service Visibility
 * Shows real-time technician location and ETA when a technician is dispatched
 * Connects physical "Akücü" signals to digital interface
 */
export function LiveServiceTracking({
  serviceRequestId,
  customerAddress,
  onClose,
}: LiveServiceTrackingProps) {
  const [technician, setTechnician] = useState<TechnicianLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceRequestId) {
      setLoading(false);
      return;
    }

    // Fetch technician location
    const fetchTechnicianLocation = async () => {
      try {
        const response = await fetch(`/api/integrity/service-tracking?requestId=${serviceRequestId}`);
        if (!response.ok) throw new Error('Failed to fetch tracking data');
        
        const data: TechnicianLocation = await response.json();
        setTechnician(data);
        setLoading(false);
      } catch (err) {
        setError('Konum bilgisi alınamadı');
        setLoading(false);
      }
    };

    fetchTechnicianLocation();

    // Poll for updates every 10 seconds
    const interval = setInterval(fetchTechnicianLocation, 10000);

    return () => clearInterval(interval);
  }, [serviceRequestId]);

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-center gap-3 py-8">
          <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
          <span className="text-sm text-slate-600">Teknisyen konumu yükleniyor...</span>
        </div>
      </div>
    );
  }

  if (error || !technician) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
        <p className="text-sm text-amber-800">{error || 'Teknisyen bilgisi bulunamadı'}</p>
      </div>
    );
  }

  const etaMinutes = Math.round(
    (new Date(technician.estimatedArrival).getTime() - Date.now()) / (1000 * 60)
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">Canlı Servis Takibi</h3>
          <p className="text-sm text-slate-600">Teknisyeniniz yola çıktı</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Kapat"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Technician Info */}
      <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <User className="w-6 h-6 text-blue-600" strokeWidth={2} />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-slate-900">{technician.technicianName}</div>
          <div className="text-sm text-slate-600">Teknik Servis Uzmanı</div>
        </div>
        <a
          href={`tel:${technician.phone}`}
          className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          aria-label="Teknisyeni ara"
        >
          <Phone className="w-4 h-4" strokeWidth={2} />
        </a>
      </div>

      {/* ETA */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
        <Clock className="w-5 h-5 text-emerald-600" strokeWidth={2} />
        <div className="flex-1">
          <div className="text-sm font-semibold text-emerald-900">Tahmini Varış Süresi</div>
          <div className="text-lg font-bold text-emerald-700">
            {etaMinutes > 0 ? `${etaMinutes} dakika` : 'Yakında'}
          </div>
        </div>
        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
      </div>

      {/* Map Component */}
      <div className="relative h-64 rounded-lg border border-slate-200 bg-slate-100 overflow-hidden">
        {/* Google Maps or Leaflet integration */}
        <iframe
          src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&origin=${technician.latitude},${technician.longitude}&destination=${encodeURIComponent(customerAddress || '')}&mode=driving`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="pointer-events-none"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 flex items-center gap-1.5">
          <Navigation className="w-3.5 h-3.5 text-blue-600 animate-pulse" strokeWidth={2} />
          <span>Canlı Konum</span>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-200">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        <span className="text-xs text-slate-600">
          Durum: {technician.status === 'en_route' ? 'Yolda' : 'Yola Çıktı'}
        </span>
      </div>
    </div>
  );
}

