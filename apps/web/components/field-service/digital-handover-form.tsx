'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, PenTool, User, Mail, Phone, Package, Calendar, FileText } from 'lucide-react';

interface FormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deviceName: string;
  deviceModel?: string;
  deliveryDate: string;
  technicianName: string;
  notes?: string;
  signatureData: string | null;
}

/**
 * SignatureCanvas: Simple signature capture component
 */
function SignatureCanvas({
  onSignatureChange,
  className = '',
}: {
  onSignatureChange: (dataUrl: string | null) => void;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;

    // Set drawing styles
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0]!.clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0]!.clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0]!.clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0]!.clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();

    setHasSignature(true);
    const dataUrl = canvas.toDataURL('image/png');
    onSignatureChange(dataUrl);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onSignatureChange(null);
  };

  return (
    <div className={className}>
      <div className="rounded-xl border-2 border-slate-300 bg-white overflow-hidden">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-[200px] cursor-crosshair touch-none"
        />
      </div>
      {hasSignature && (
        <button
          type="button"
          onClick={clearSignature}
          className="mt-2 text-sm text-slate-600 hover:text-slate-900 underline"
        >
          İmzayı temizle
        </button>
      )}
    </div>
  );
}

/**
 * DigitalHandoverForm: Form with signature capture and email trigger
 */
export function DigitalHandoverForm() {
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deviceName: '',
    deviceModel: '',
    deliveryDate: new Date().toISOString().split('T')[0]!,
    technicianName: '',
    notes: '',
    signatureData: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/field-service/handover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          deviceName: '',
          deviceModel: '',
          deliveryDate: new Date().toISOString().split('T')[0]!,
          technicianName: '',
          notes: '',
          signatureData: null,
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.customerName &&
    formData.customerEmail &&
    formData.customerPhone &&
    formData.deviceName &&
    formData.deliveryDate &&
    formData.technicianName &&
    formData.signatureData;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Dijital Devir-Teslim Formu</h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Müşteri bilgileri, cihaz detayları ve dijital imza ile devir-teslim kaydı
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4" strokeWidth={2} />
              Müşteri Bilgileri
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Ad Soyad *</label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => updateField('customerName', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">E-posta *</label>
                <input
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={(e) => updateField('customerEmail', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Telefon *</label>
                <input
                  type="tel"
                  required
                  value={formData.customerPhone}
                  onChange={(e) => updateField('customerPhone', e.target.value)}
                  placeholder="05XX XXX XX XX"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Device Information */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Package className="w-4 h-4" strokeWidth={2} />
              Cihaz Bilgileri
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Cihaz Adı *</label>
                <input
                  type="text"
                  required
                  value={formData.deviceName}
                  onChange={(e) => updateField('deviceName', e.target.value)}
                  placeholder="Örn: Oksijen Konsantratörü"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Model</label>
                <input
                  type="text"
                  value={formData.deviceModel || ''}
                  onChange={(e) => updateField('deviceModel', e.target.value)}
                  placeholder="Opsiyonel"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" strokeWidth={2} />
                  Teslimat Tarihi *
                </label>
                <input
                  type="date"
                  required
                  value={formData.deliveryDate}
                  onChange={(e) => updateField('deliveryDate', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Teknisyen Adı *</label>
                <input
                  type="text"
                  required
                  value={formData.technicianName}
                  onChange={(e) => updateField('technicianName', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Notlar</label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => updateField('notes', e.target.value)}
              rows={3}
              placeholder="Teslimat ile ilgili önemli notlar, özel durumlar..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-slate-900 resize-none"
            />
          </div>

          {/* Signature */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <PenTool className="w-4 h-4" strokeWidth={2} />
              Müşteri İmzası *
            </h3>
            <p className="text-sm text-slate-600">
              Lütfen aşağıdaki alana imzanızı çizin (fare veya dokunmatik ekran ile)
            </p>
            <SignatureCanvas
              onSignatureChange={(dataUrl) => updateField('signatureData', dataUrl || '')}
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              * Zorunlu alanlar
            </p>
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                isFormValid && !isSubmitting
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>Gönderiliyor...</>
              ) : (
                <>
                  <Send className="w-4 h-4" strokeWidth={2} />
                  Devir-Teslim Kaydı Oluştur ve E-posta Gönder
                </>
              )}
            </button>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="rounded-xl border-2 border-green-500 bg-green-50 p-4 text-green-900">
              ✓ Devir-teslim kaydı başarıyla oluşturuldu ve müşteriye e-posta gönderildi!
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="rounded-xl border-2 border-red-500 bg-red-50 p-4 text-red-900">
              ✗ Bir hata oluştu. Lütfen tekrar deneyin veya destek ekibiyle iletişime geçin.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}


