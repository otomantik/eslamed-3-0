import { Shield, Stethoscope } from 'lucide-react';

export function BoundaryCard() {
  return (
    <section aria-label="Hizmet sınırları" className="rounded-3xl border border-slate-200 bg-white p-8">
      <h2 className="text-2xl font-semibold text-slate-900">Destek Sınırları (YMYL)</h2>
      <p className="mt-3 text-slate-600 leading-relaxed" style={{ lineHeight: 1.8 }}>
        ESLAMED bir “teknik rehberlik ve süreç desteği” merkezidir. Aşağıdaki ayrım, doğru yere başvurmanızı kolaylaştırır.
      </p>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <article className="rounded-2xl border border-slate-200 bg-slate-50/60 p-7">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <Shield className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Teknik Destek (Bizim alanımız)</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700" style={{ lineHeight: 1.8 }}>
                <li>- Cihaz kurulum adımları ve güvenli kullanım yönlendirmesi</li>
                <li>- Alarm / hata durumunda temel kontrol listesi</li>
                <li>- Filtre, aksesuar, sarf kullanımı hakkında teknik bilgi</li>
                <li>- Yerinde kurulum ve kullanıcı eğitimi (planlı)</li>
              </ul>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50/60 p-7">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <Stethoscope className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Tıbbi Müdahale (Bizim alanımız değil)</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700" style={{ lineHeight: 1.8 }}>
                <li>- Tanı koyma, tedavi planlama, ilaç/oksijen doz ayarı</li>
                <li>- Semptom değerlendirmesi ile “ne yapmalıyım” kararı verme</li>
                <li>- Acil durum yönetimi</li>
              </ul>
              <p className="mt-3 text-sm text-slate-600" style={{ lineHeight: 1.8 }}>
                Ciddi nefes darlığı, göğüs ağrısı, bilinç değişikliği gibi durumlarda <span className="font-semibold text-slate-900">112</span>.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}




