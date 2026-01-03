'use client';

import { useState, useMemo } from 'react';
import { MapPin, Download, Copy } from 'lucide-react';

/**
 * QRCodeGenerator: Dynamic QR code generator for Google Maps review page
 * Pre-fills with local keywords like 'İstanbul medikal cihaz teslimatı'
 */
export function QRCodeGenerator() {
  const [location, setLocation] = useState('İstanbul');
  const [keywords, setKeywords] = useState('medikal cihaz teslimatı');
  const [googlePlaceId, setGooglePlaceId] = useState(''); // Optional: specific Google Place ID

  // Generate Google Maps review URL
  const reviewUrl = useMemo(() => {
    // Google Maps Review URL format:
    // https://www.google.com/maps/place/?q=[query] or use Place ID if available
    
    const query = `${location} ${keywords}`.trim();
    
    if (googlePlaceId) {
      // If Place ID is provided, use it for more accurate results
      return `https://www.google.com/maps/place/?q=place_id:${googlePlaceId}`;
    }
    
    // Use search query
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }, [location, keywords, googlePlaceId]);

  const downloadQR = () => {
    const canvas = document.getElementById('qr-code-canvas') as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `eslamed-review-qr-${location}-${Date.now()}.png`;
      link.href = url;
      link.click();
    }
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(reviewUrl);
      alert('URL panoya kopyalandı!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Google Maps İnceleme QR Kodu</h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Müşterilere anında inceleme sayfasına yönlendiren QR kod oluştur
            </p>
          </div>
        </div>

        {/* Configuration Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Konum</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="İstanbul, Ankara, İzmir..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Anahtar Kelimeler</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="medikal cihaz teslimatı"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-900"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Google Place ID <span className="text-xs text-slate-500">(Opsiyonel)</span>
            </label>
            <input
              type="text"
              value={googlePlaceId}
              onChange={(e) => setGooglePlaceId(e.target.value)}
              placeholder="ChIJN1t_tDeuEmsRUsoyG83frY4"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-900 text-sm font-mono"
            />
            <p className="text-xs text-slate-500 mt-1">
              Belirli bir mekan için Place ID kullanılırsa, arama sonuçları yerine doğrudan o mekan açılır
            </p>
          </div>
        </div>

        {/* QR Code Display */}
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-slate-50 rounded-xl">
          <div className="flex-shrink-0">
            <div className="p-4 bg-white rounded-xl border border-slate-200">
              {/* QR Code using online API - no external dependencies */}
              <img
                id="qr-code-canvas"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(reviewUrl)}&margin=1`}
                alt="QR Code"
                className="w-[200px] h-[200px]"
              />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Oluşturulan URL</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={reviewUrl}
                  readOnly
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-mono"
                />
                <button
                  onClick={copyUrl}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
                  aria-label="URL'yi kopyala"
                >
                  <Copy className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={downloadQR}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" strokeWidth={2} />
                QR Kodu İndir
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <p>• QR kod müşterilerin telefonuyla taranabilir</p>
              <p>• Google Maps inceleme sayfasına yönlendirir</p>
              <p>• Konum ve anahtar kelimeler önceden doldurulur</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

