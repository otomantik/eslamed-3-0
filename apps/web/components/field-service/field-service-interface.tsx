'use client';

import { useState } from 'react';
import { ModeAwareNavbar } from '@/components/layout/mode-aware-navbar';
import { Footer } from '@/components/sections/footer';
import { ExpertDeliveryProtocol } from './expert-delivery-protocol';
import { QRCodeGenerator } from './qr-code-generator';
import { DigitalHandoverForm } from './digital-handover-form';
import { Clipboard, QrCode, FileText, Settings } from 'lucide-react';

/**
 * FieldServiceInterface: Technician terminal for field operations
 * Features:
 * - Expert Delivery Protocol checklist
 * - Dynamic QR code generator for Google Maps reviews
 * - Digital handover form with signature capture
 */
export function FieldServiceInterface() {
  const [activeTab, setActiveTab] = useState<'protocol' | 'qr' | 'handover'>('protocol');

  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <ModeAwareNavbar serverMode="INFORMATION_SEEKER" />

      <header className="pt-28 sm:pt-24 pb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-blue-200">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-3xl font-display font-semibold text-slate-900">Saha Terminali</h1>
              <p className="text-sm text-slate-600 mt-1">Teknisyen Arayüzü - Teslimat ve Devir-Teslim Protokolleri</p>
            </div>
          </div>
        </div>
      </header>

      <section className="py-8">
        <div className="container-wide">
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('protocol')}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'protocol'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clipboard className="w-4 h-4" strokeWidth={2} />
              Teslimat Protokolü
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'qr'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <QrCode className="w-4 h-4" strokeWidth={2} />
              QR Kod Oluştur
            </button>
            <button
              onClick={() => setActiveTab('handover')}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'handover'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" strokeWidth={2} />
              Devir-Teslim Formu
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'protocol' && <ExpertDeliveryProtocol />}
            {activeTab === 'qr' && <QRCodeGenerator />}
            {activeTab === 'handover' && <DigitalHandoverForm />}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


