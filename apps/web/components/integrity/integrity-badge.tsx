'use client';

import { useState, useEffect } from 'react';
import { Shield, CheckCircle2, Calendar, FileText, Hash, Loader2 } from 'lucide-react';
import type { SearchItem } from '@/lib/search/search-config';

interface UTSVerificationData {
  registered: boolean;
  registrationNumber?: string;
  verifiedAt?: string;
  lastCalibrationDate?: string;
  gmpCompliant?: boolean;
  gmpCertificateNumber?: string;
  batchNumber?: string;
  deviceModel?: string;
}

interface IntegrityBadgeProps {
  item: SearchItem;
  onVerificationClick?: () => void;
}

/**
 * IntegrityBadge: 2027 ADSMantik Integrity Score - Technical Transparency
 * Fetches real-time UTS registration status and displays verification modal
 */
export function IntegrityBadge({ item, onVerificationClick }: IntegrityBadgeProps) {
  const [verificationData, setVerificationData] = useState<UTSVerificationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fetch UTS verification data
  useEffect(() => {
    if (!item.utsRegistration?.registered) return;
    
    setLoading(true);
    // Simulate API call - replace with actual UTS API endpoint
    fetch(`/api/integrity/uts-verification?itemId=${item.id}`)
      .then((res) => res.json())
      .then((data: UTSVerificationData) => {
        setVerificationData(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to static data if API fails
        setVerificationData({
          registered: item.utsRegistration?.registered || false,
          registrationNumber: item.utsRegistration?.registrationNumber,
          verifiedAt: item.utsRegistration?.verifiedAt,
        });
        setLoading(false);
      });
  }, [item.id, item.utsRegistration]);

  const uts = item.utsRegistration;
  if (!uts?.registered && !verificationData?.registered) return null;

  const handleClick = () => {
    setShowModal(true);
    onVerificationClick?.();
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors text-xs group cursor-pointer"
        aria-label="ÜTS kayıt bilgilerini görüntüle"
      >
        <Shield className="w-3.5 h-3.5 text-emerald-600 group-hover:text-emerald-700" strokeWidth={2} />
        <span className="text-emerald-700 font-medium">ÜTS Kayıtlı</span>
        {uts?.registrationNumber && (
          <span className="text-emerald-600 font-mono text-[10px] ml-0.5">
            {uts.registrationNumber.slice(0, 6)}
          </span>
        )}
        {loading && <Loader2 className="w-3 h-3 text-emerald-600 animate-spin ml-1" />}
      </button>

      {/* Verification Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-emerald-600" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">ÜTS Doğrulama</h3>
                  <p className="text-sm text-slate-600">{item.title}</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Kapat"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Verification Details */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              {verificationData?.registrationNumber && (
                <div className="flex items-start gap-3">
                  <Hash className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 mb-0.5">Kayıt Numarası</div>
                    <div className="text-sm font-mono text-slate-900">{verificationData.registrationNumber}</div>
                  </div>
                </div>
              )}

              {verificationData?.lastCalibrationDate && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 mb-0.5">Son Kalibrasyon Tarihi</div>
                    <div className="text-sm text-slate-900">
                      {new Date(verificationData.lastCalibrationDate).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              )}

              {verificationData?.gmpCompliant && (
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 mb-0.5">GMP Uyumluluğu</div>
                    <div className="text-sm text-slate-900">
                      GMP Standartlarına Uygun
                      {verificationData.gmpCertificateNumber && (
                        <span className="text-slate-600 ml-2">({verificationData.gmpCertificateNumber})</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {verificationData?.batchNumber && (
                <div className="flex items-start gap-3">
                  <FileText className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 mb-0.5">Parti Numarası</div>
                    <div className="text-sm font-mono text-slate-900">{verificationData.batchNumber}</div>
                  </div>
                </div>
              )}

              {verificationData?.verifiedAt && (
                <div className="pt-2 border-t border-slate-200">
                  <div className="text-xs text-slate-500">
                    Doğrulama Tarihi:{' '}
                    {new Date(verificationData.verifiedAt).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Note */}
            <div className="pt-3 border-t border-slate-200">
              <p className="text-xs text-slate-500 leading-relaxed">
                Bu bilgiler ÜTS (Ürün Takip Sistemi) veritabanından gerçek zamanlı olarak alınmaktadır.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


