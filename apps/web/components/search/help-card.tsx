import { MessageCircle, LifeBuoy } from 'lucide-react';

export function HelpCard({ term }: { term: string }) {
  const text = `Merhaba, "${term}" hakkında bilgi almak istemiştim.`;
  const href = `https://wa.me/905372425535?text=${encodeURIComponent(text)}`;

  return (
    <aside role="note" className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center flex-shrink-0" aria-hidden="true">
          <LifeBuoy className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-900">
            Aradığınızı bulamadık ancak uzman ekibimiz size 1 dakika içinde yardımcı olabilir.
          </div>
          <div className="mt-3">
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="min-h-[48px] inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white px-5 text-base font-semibold hover:bg-emerald-700 transition-colors animate-[pulse_2.2s_ease-in-out_infinite]"
            >
              <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
              WhatsApp ile yaz
            </a>
          </div>
          <div className="mt-3 text-xs text-slate-600" style={{ lineHeight: 1.8 }}>
            Mesaj metni otomatik doldurulur: <span className="font-mono">"{text}"</span>
          </div>
        </div>
      </div>
    </aside>
  );
}


