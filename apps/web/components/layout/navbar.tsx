import Link from 'next/link';
import { Phone } from 'lucide-react';

export function Navbar() {
    return (
        <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-white/70 backdrop-blur-md shadow-sm">
            <div className="container-wide h-20 flex items-center justify-between">
                {/* LOGO */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                        E
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight text-slate-800">
                        Eslamed<span className="text-brand-primary">.com</span>
                    </span>
                </Link>

                {/* RIGHT ACTION */}
                <Link
                    href="tel:05555555555"
                    className="flex items-center gap-2 bg-brand-accent hover:bg-red-600 text-white px-5 py-2.5 rounded-full transition-all shadow-lg hover:shadow-red-500/30 animate-pulse-fast"
                >
                    <Phone className="w-5 h-5" />
                    <span className="font-bold hidden sm:inline">Acil Servis: 0555 555 55 55</span>
                    <span className="font-bold sm:hidden">Ara</span>
                </Link>
            </div>
        </header>
    );
}
