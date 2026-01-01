export function Footer() {
  return (
    <footer id="kurumsal" className="border-t border-slate-200 bg-white">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Kapsam</h3>
            <div className="mt-4 space-y-6 text-sm leading-relaxed text-slate-600">
              <div>
                <div className="font-medium text-slate-800">Ne yaparız</div>
                <p className="mt-1">
                  Oksijen konsantratörü ve ilgili ekipmanlarda kurulum, kullanım yönlendirmesi, planlı teslimat ve teknik destek
                  süreçlerini yürütürüz.
                </p>
              </div>
              <div>
                <div className="font-medium text-slate-800">Ne yapmayız</div>
                <p className="mt-1">
                  Tanı koymayız, tedavi planlamayız ve tıbbi karar yerine geçecek yönlendirme yapmayız. Acil tıbbi durumda iletişim
                  kanallarımız, acil sağlık hizmetlerinin yerine geçmez.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Sorumluluk & şeffaflık</h3>
            <div className="mt-4 space-y-6 text-sm leading-relaxed text-slate-600">
              <div>
                <div className="font-medium text-slate-800">Tıbbi sorumluluk notu</div>
                <p className="mt-1">
                  Belirtileriniz hızla artıyorsa, bilinç değişikliği, ciddi nefes darlığı veya göğüs ağrısı gibi durumlarda{" "}
                  <span className="font-medium text-slate-800">112</span> ile iletişime geçin.
                </p>
              </div>

              <div>
                <div className="font-medium text-slate-800">Gizlilik & veri</div>
                <p className="mt-1">
                  Ziyaret verileri yalnızca hizmetin sürekliliği ve hata tespiti için sınırlı ve ölçülü şekilde işlenir. Tıbbi
                  içerikli kişisel verileri bu sayfa üzerinden paylaşmamanızı öneririz.
                </p>
              </div>

              <div>
                <div className="font-medium text-slate-800">İletişim</div>
                <p className="mt-1">
                  Telefon / WhatsApp: <span className="font-mono text-slate-800">+90 537 242 55 35</span>
                  <br />
                  Adres: Alemdağ Mah. Atabey Caddesi 19/BA, Çekmeköy/İstanbul
                  <br />
                  Çalışma saatleri: talebe göre planlama (detaylar iletişimde netleşir)
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Kısa bağlantılar</h3>
            <div className="mt-4 grid grid-cols-1 gap-6 text-sm text-slate-600">
              <div>
                <div className="font-medium text-slate-800">Kurumsal</div>
                <ul className="mt-2 space-y-2">
                  <li>
                    <a href="/isletme-belgeleri" className="min-h-[48px] inline-flex items-center py-3 hover:underline underline-offset-4">
                      İşletme Belgeleri
                    </a>
                  </li>
                  <li>
                    <a href="/kvkk" className="min-h-[48px] inline-flex items-center py-3 hover:underline underline-offset-4">
                      KVKK
                    </a>
                  </li>
                  <li>
                    <a href="/gizlilik" className="min-h-[48px] inline-flex items-center py-3 hover:underline underline-offset-4">
                      Gizlilik
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="font-medium text-slate-800">Destek</div>
                <ul className="mt-2 space-y-2">
                  <li>
                    <a href="/destek" className="min-h-[48px] inline-flex items-center py-3 hover:underline underline-offset-4">
                      Destek & Sınırlar
                    </a>
                  </li>
                  <li>
                    <a href="/iletisim" className="min-h-[48px] inline-flex items-center py-3 hover:underline underline-offset-4">
                      İletişim
                    </a>
                  </li>
                  <li>
                    <a href="/rehber/evde-bakim-ekipmanlari" className="min-h-[48px] inline-flex items-center py-3 hover:underline underline-offset-4">
                      Evde Bakım Rehberi
                    </a>
                  </li>
                  <li>
                    <a href="/ekipmanlar" className="min-h-[48px] inline-flex items-center py-3 hover:underline underline-offset-4">
                      Tüm Ekipmanlar
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Eslamed</div>
          <div className="flex gap-3">
            <a href="/kvkk" className="min-h-[48px] inline-flex items-center py-3 hover:underline underline-offset-4">
              KVKK
            </a>
            <span aria-hidden="true">·</span>
            <a href="/gizlilik" className="min-h-[48px] inline-flex items-center py-3 hover:underline underline-offset-4">
              Gizlilik
            </a>
            <span aria-hidden="true">·</span>
            <a href="/isletme-belgeleri" className="min-h-[48px] inline-flex items-center py-3 hover:underline underline-offset-4">
              İşletme Belgeleri
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


