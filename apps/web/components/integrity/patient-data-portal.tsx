'use client';

import { useState } from 'react';
import { Download, FileText, Calendar, Shield, Loader2, CheckCircle2 } from 'lucide-react';

interface ExportData {
  rentalHistory: Array<{
    deviceName: string;
    rentalStart: string;
    rentalEnd?: string;
    serviceReports: number;
  }>;
  serviceReports: Array<{
    reportId: string;
    deviceName: string;
    serviceDate: string;
    technicianName: string;
    serviceType: string;
  }>;
  sterilizationLogs: Array<{
    logId: string;
    deviceName: string;
    sterilizationDate: string;
    method: string;
    verifiedBy: string;
  }>;
}

/**
 * PatientDataPortal: 2027 ADSMantik Integrity Score - User Empowerment & EHDS Compliance
 * Allows users to export their medical equipment rental history, service reports, and sterilization logs
 * in machine-readable JSON or PDF format, adhering to EHDS interoperability standards
 */
export function PatientDataPortal() {
  const [exportFormat, setExportFormat] = useState<'json' | 'pdf'>('json');
  const [loading, setLoading] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    setExported(false);

    try {
      const response = await fetch('/api/integrity/export-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format: exportFormat }),
      });

      if (!response.ok) throw new Error('Export failed');

      if (exportFormat === 'json') {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `eslamed-veri-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `eslamed-veri-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }

      setExported(true);
      setTimeout(() => setExported(false), 3000);
    } catch (error) {
      console.error('Export error:', error);
      alert('Veri indirme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Export Format Selection */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Veri İndirme</h2>
        <p className="text-sm text-slate-600 mb-6">
          Aşağıdaki verilerinizi EHDS standartlarına uygun formatta indirebilirsiniz:
        </p>

        <div className="space-y-4">
          {/* Format Selection */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="format"
                value="json"
                checked={exportFormat === 'json'}
                onChange={() => setExportFormat('json')}
                className="w-4 h-4 text-emerald-600"
              />
              <span className="text-sm font-medium text-slate-900">JSON (Makine Okunabilir)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="format"
                value="pdf"
                checked={exportFormat === 'pdf'}
                onChange={() => setExportFormat('pdf')}
                className="w-4 h-4 text-emerald-600"
              />
              <span className="text-sm font-medium text-slate-900">PDF (İnsan Okunabilir)</span>
            </label>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            disabled={loading}
            className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white px-6 font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                İndiriliyor...
              </>
            ) : exported ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                İndirildi!
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Verileri İndir ({exportFormat.toUpperCase()})
              </>
            )}
          </button>
        </div>
      </div>

      {/* Data Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Rental History */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" strokeWidth={2} />
            </div>
            <h3 className="font-semibold text-slate-900">Kiralama Geçmişi</h3>
          </div>
          <p className="text-sm text-slate-600">
            Tüm kiraladığınız cihazlar, başlangıç/bitiş tarihleri ve servis raporları.
          </p>
        </div>

        {/* Service Reports */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" strokeWidth={2} />
            </div>
            <h3 className="font-semibold text-slate-900">Teknik Servis Raporları</h3>
          </div>
          <p className="text-sm text-slate-600">
            Kalibrasyon, bakım ve onarım kayıtları, teknik uzman bilgileri.
          </p>
        </div>

        {/* Sterilization Logs */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-600" strokeWidth={2} />
            </div>
            <h3 className="font-semibold text-slate-900">Sterilizasyon Logları</h3>
          </div>
          <p className="text-sm text-slate-600">
            Cihaz sterilizasyon kayıtları, yöntem ve doğrulama bilgileri.
          </p>
        </div>
      </div>

      {/* EHDS Compliance Note */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-1">EHDS Uyumluluğu</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              İndirilen veriler Avrupa Sağlık Veri Alanı (EHDS) standartlarına uygundur. 
              JSON formatı makine okunabilir ve FHIR/HL7 gibi sağlık veri standartlarıyla uyumludur. 
              Tüm veriler KVKK/GDPR kapsamında şifrelenmiş ve güvenli bir şekilde saklanmaktadır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


