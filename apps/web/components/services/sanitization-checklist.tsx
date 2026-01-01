import { CheckCircle2 } from 'lucide-react';

export function SanitizationChecklist() {
  const items = [
    'Gövde yüzey temizliği ve dezenfeksiyon (uygun ürünlerle)',
    'UV-C / kontrollü yüzey dezenfeksiyonu (uygunsa)',
    'Filtre / sarf kontrolü ve gerekiyorsa değişim',
    'Aksesuar seti kontrolü (hortum, bağlantı, başlık vb.)',
    'Fonksiyon testi ve alarm/hata senaryosu kontrolü',
    'Kullanıcıya kısa güvenlik brifingi ve tekrar edilebilir adımlar',
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8">
      <h2 className="text-2xl font-semibold text-slate-900">Hijyen ve Sterilizasyon Kontrol Listesi</h2>
      <p className="mt-3 text-[18px] text-slate-600" style={{ lineHeight: 1.8 }}>
        Kiralama döngüsünde amaç: güvenli, temiz ve izlenebilir bir hazırlık süreci. Bu liste, sürecin görünür olmasını sağlar.
      </p>
      <ul className="mt-6 space-y-3">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-3 text-slate-700" style={{ lineHeight: 1.8 }}>
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
            <span className="text-[18px]">{t}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}



