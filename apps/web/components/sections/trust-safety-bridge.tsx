import { ShieldCheck } from 'lucide-react';

export function TrustSafetyBridge() {
  return (
    <aside
      role="note"
      aria-label="Medical Disclaimer"
      className="bg-white"
    >
      <div className="container-wide">
        <div className="mx-auto max-w-4xl border-t border-slate-200 pt-6">
          <div className="text-[10px] tracking-widest text-slate-500 font-semibold uppercase">
            SÜREÇ GÜVENLİĞİ VE ŞEFFAFLIK
          </div>
          <div className="mt-3 flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-slate-400 mt-0.5" strokeWidth={1.5} />
            <p className="text-sm text-slate-500 leading-relaxed">
              Bu sayfa tıbbi tanı veya tedavi amacı taşımaz. Tanı, tedavi ve cihaz kullanımına ilişkin klinik kararlar hekimlere aittir. Biz; ekipman uygunluğu, ev tipi cihaz kurulumu ve güvenli kullanım adımlarında süreç yönlendirmesi sağlar, teknik değerlendirme sürecini netleştiririz.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}



