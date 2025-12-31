'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface HyperLocalMapProps {
  district: string;
}

export function HyperLocalMap({ district }: HyperLocalMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Lightweight map placeholder - Replace with Leaflet or Mapbox in production
    setIsLoaded(true);
  }, []);

  // Mock coordinates for districts
  const districtCoords: Record<string, { lat: number; lng: number }> = {
    'Istanbul': { lat: 41.0082, lng: 28.9784 },
    'Umraniye': { lat: 41.0214, lng: 29.1088 },
    'Kadikoy': { lat: 40.9819, lng: 29.0244 },
    'Atasehir': { lat: 40.9833, lng: 29.1167 },
  };

  const coords = districtCoords[district] || districtCoords['Istanbul'];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-4">
            {district} Bölgesinde Hizmet Veriyoruz
          </h2>
          <p className="text-lg text-slate-600">
            En yakın mobil ekibimizin konumunu görüntüleyin
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-200">
          {/* Map Placeholder */}
          <div 
            ref={mapRef}
            className="relative h-[500px] bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center"
          >
            {isLoaded ? (
              <div className="text-center">
                <MapPin className="w-16 h-16 text-red-500 mx-auto mb-4 animate-bounce" strokeWidth={1.5} />
                <p className="text-slate-600 font-semibold text-lg">
                  Harita Yükleniyor...
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  {district} - {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
                </p>
              </div>
            ) : (
              <div className="animate-pulse">
                <div className="w-32 h-32 bg-slate-400 rounded-full"></div>
              </div>
            )}

            {/* Mobile Unit Pin */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                <div className="relative bg-red-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                  <Navigation className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>

          {/* Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500" strokeWidth={1.5} />
              Mobil Ekip Konumu
            </h3>
            <p className="text-sm text-slate-600 mb-1">
              <strong>{district}</strong> bölgesinde aktif
            </p>
            <p className="text-xs text-slate-500">
              Tahmini varış süresi: <strong className="text-emerald-600">15-30 dakika</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}





