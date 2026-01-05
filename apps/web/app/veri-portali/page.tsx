import type { Metadata } from 'next';
import { Database, Download, FileText, Calendar, Shield } from 'lucide-react';
import { ModeAwareNavbar } from '@/components/layout/mode-aware-navbar';
import { Footer } from '@/components/sections/footer';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { PatientDataPortal } from '@/components/integrity/patient-data-portal';

export const metadata: Metadata = {
  title: 'Veri Portali - EHDS Uyumlu Veri İndirme | ESLAMED',
  description:
    'Kiralama geçmişi, teknik servis raporları ve sterilizasyon loglarınızı EHDS standartlarına uygun formatta indirin.',
  alternates: { canonical: '/veri-portali' },
};

export default async function VeriPortaliPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <ModeAwareNavbar serverMode="INFORMATION_SEEKER" />

      <header className="pt-28 sm:pt-24 pb-12">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { label: 'Ana Sayfa', href: '/' },
              { label: 'Kurumsal', href: '/kvkk' },
              { label: 'Veri Portali' },
            ]}
            className="text-slate-400"
          />

          <div className="mt-8 max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Database className="w-6 h-6 text-emerald-600" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900">
                  Veri Portali
                </h1>
                <p className="text-sm text-slate-600 mt-1">EHDS (European Health Data Space) Uyumlu</p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
              <p className="text-sm text-blue-900 leading-relaxed">
                <strong>2027 ADSMantik Integrity Score:</strong> Bu portal, Avrupa Sağlık Veri Alanı (EHDS) standartlarına uygun olarak tasarlanmıştır. 
                Tüm verileriniz KVKK/GDPR kapsamında korunmakta ve makine okunabilir formatta (JSON/PDF) indirilebilir.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="container-wide">
          <PatientDataPortal />
        </div>
      </section>

      <Footer />
    </main>
  );
}


