import { AlertTriangle } from 'lucide-react';

export function GlobalAlertBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-red-700 text-white h-12 flex items-center">
      <div className="container-wide">
        <div className="flex items-center justify-center gap-3 h-full">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
          <p className="text-sm font-medium text-center">
            Acil durumlarda 7/24 mesaj kabul ediyoruz; müdahale aciliyet seviyesine göre planlanır - İstanbul geneli
          </p>
        </div>
      </div>
    </div>
  );
}

