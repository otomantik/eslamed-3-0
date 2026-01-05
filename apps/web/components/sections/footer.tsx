import Link from 'next/link';
import { ShieldCheck, Phone, MapPin, Clock, Database } from 'lucide-react';
import { REALITY_ANCHORS } from '@/lib/integrity/reality-anchors';

export function Footer() {
  return (
    <footer id="kurumsal" className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Section A: Kapsam */}
          <div className="space-y-4">
            <h4 className="font-serif text-slate-900 font-semibold tracking-tight">Kapsam</h4>
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>Evde medikal ekipman kullanım süreçlerinde, cihaz seçimi ve teknik hazırlık aşamalarında rehberlik sunar.</p>
              <p className="border-t border-slate-200 pt-3 italic text-slate-500">
                Doğrudan tıbbi teşhis, tedavi veya ilaç tavsiyesi sunulmaz; süreçler hekim yönlendirmesiyle yürütülmelidir.
              </p>
            </div>
          </div>

          {/* Section B: Sorumluluk & Şeffaflık */}
          <div className="space-y-4">
            <h4 className="font-serif text-slate-900 font-semibold tracking-tight">Sorumluluk & Şeffaflık</h4>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                <p>Kullanılan tüm teknik cihazlar ÜTS Kayıtlı ve CE mevzuatına uygun ürün tedariki ile sağlanmaktadır.</p>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                <p>Verileriniz KVKK kapsamında korunmakta ve tıbbi gizlilik esas alınmaktadır.</p>
              </div>
            </div>
          </div>

          {/* Section C: İletişim */}
          <div className="space-y-4">
            <h4 className="font-serif text-slate-900 font-semibold tracking-tight">İletişim</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>Planlı Teknik Destek & Bilgi Hattı</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <span>{REALITY_ANCHORS.address.street}, {REALITY_ANCHORS.address.city}, {REALITY_ANCHORS.address.region}</span>
              </li>
              <li className="flex items-center gap-2 italic text-slate-500">
                <Clock className="w-4 h-4" />
                <span>Lojistik süreçler talebe göre planlanır.</span>
              </li>
            </ul>
          </div>

          {/* Section D: Kısa Bağlantılar */}
          <div className="space-y-4">
            <h4 className="font-serif text-slate-900 font-semibold tracking-tight">Kurumsal</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/isletme-belgeleri" className="hover:underline transition-all">İşletme Belgeleri</Link></li>
              <li><Link href="/kvkk" className="hover:underline transition-all">KVKK Aydınlatma Metni</Link></li>
              <li><Link href="/gizlilik" className="hover:underline transition-all">Gizlilik Politikası</Link></li>
              <li>
                <Link href="/veri-portali" className="hover:underline transition-all flex items-center gap-1.5 text-emerald-700 font-medium">
                  <Database className="w-3.5 h-3.5" strokeWidth={2} />
                  Veri Portali (EHDS)
                </Link>
              </li>
              <li><Link href="/hizmetler" className="hover:underline transition-all border-t border-slate-200 block pt-2 mt-2 font-medium">Tüm Hizmetler</Link></li>
              <li><Link href="/iletisim" className="hover:underline transition-all font-medium">Bize Ulaşın</Link></li>
            </ul>
          </div>
        </div>

        {/* Closing Line & Copyright */}
        <div className="border-t border-slate-200 pt-8 flex flex-col items-center gap-4">
          <p className="text-xs text-slate-400 tracking-wide text-center uppercase">
            {REALITY_ANCHORS.address.region} genelinde evde kullanılan medikal ekipmanlar için süreç yönlendirmesi sunar.
          </p>
          <p className="text-[10px] text-slate-300">
            &copy; {new Date().getFullYear()} {REALITY_ANCHORS.officialBusinessName}. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
