'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, Search, Menu, X, Phone } from 'lucide-react';
import dynamic from 'next/dynamic';

const SearchModal = dynamic(
  () => import('@/components/search/search-modal').then((m) => m.SearchModal),
  { ssr: false, loading: () => null }
);

interface NavbarProps {
  isEmergency?: boolean;
}

export function Navbar({ isEmergency = false }: NavbarProps = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const openSearch = (prefill?: string) => {
    if (typeof window === 'undefined') return;
    // If the modal chunk isn't mounted yet, store a pending request.
    (window as any).__eslamed_search_pending = { prefill: prefill || '' };
    window.dispatchEvent(new CustomEvent('eslamed:open-search', { detail: { prefill } }));
  };

  // Cmd/Ctrl+K should load the modal chunk only when needed.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isK = e.key.toLowerCase() === 'k';
      const isCmdK = (e.metaKey || e.ctrlKey) && isK;
      if (!isCmdK) return;
      e.preventDefault();
      setSearchEnabled(true);
      // Dispatch after a tick so the dynamic chunk has a chance to mount.
      window.setTimeout(() => openSearch(), 50);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Sticky header scroll detection (60fps optimized with requestAnimationFrame)
  useEffect(() => {
    let ticking = false;
    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed w-full z-50 border-b border-slate-200 shadow-sm transition-all duration-300 ease-out ${isEmergency ? 'top-12' : 'top-0'} ${
          isScrolled 
            ? 'backdrop-blur-md bg-white/90 h-14' 
            : 'bg-white h-16'
        }`}
        style={{ willChange: 'height, background-color' }}
      >
        <div className="container-wide">
          {/* Top Row: Logo + Navigation + CTA */}
          <div className={`flex items-center justify-between gap-3 transition-all duration-300 ${isScrolled ? 'h-14' : 'h-16'}`}>
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                E
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-display font-bold text-lg tracking-tight text-slate-900">
                  ESLAMED
                </span>
                <span className="text-xs text-slate-500 font-normal">
                  Medikal Çözüm Merkezi
                </span>
              </div>
              <div className="sm:hidden flex flex-col leading-tight">
                <span className="font-display font-bold text-lg tracking-tight text-slate-900">
                  ESLAMED
                </span>
                <span className="text-[10px] text-slate-500 font-normal">
                  Medikal Çözüm Merkezi
                </span>
              </div>
            </Link>

            {/* NAVIGATION LINKS - Desktop with Playfair Display */}
            <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
              <Link 
                href="/rehber/solunum-sistemleri" 
                className="text-slate-700 hover:text-brand-primary font-medium text-sm transition-colors"
                title="Oksijen konsantratörü ve solunum destek sistemleri"
              >
                Oksijen
              </Link>
              <Link 
                href="/rehber/evde-bakim-ekipmanlari" 
                className="text-slate-700 hover:text-brand-primary font-medium text-sm transition-colors"
                title="Evde bakım ekipmanları ve hasta yatakları"
              >
                Evde Bakım
              </Link>
              <Link 
                href="/ekipmanlar" 
                className="text-slate-700 hover:text-brand-primary font-medium text-sm transition-colors"
                title="Tüm medikal ekipman kataloğu"
              >
                Ekipmanlar
              </Link>
              <Link 
                href="/hizmetler" 
                className="text-slate-700 hover:text-brand-primary font-medium text-sm transition-colors"
                title="Teknik servis, kiralama ve satış hizmetleri"
              >
                Hizmetler
              </Link>
              <Link 
                href="/tabanlik" 
                className="text-slate-700 hover:text-brand-primary font-medium text-sm transition-colors"
                style={{ fontFamily: 'var(--font-premium)' }}
                title="Kişiye özel tabanlık analizi ve çözümleri"
              >
                VIP Tabanlık
              </Link>
            </nav>

            {/* SEARCH - Desktop Only (XL) */}
            <div className="hidden xl:flex items-center flex-1 max-w-xs">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="İsterseniz arayabilirsiniz..."
                  readOnly
                  onFocus={() => {
                    setSearchEnabled(true);
                    window.setTimeout(() => openSearch(), 50);
                  }}
                  onKeyDown={(e) => {
                    // If user starts typing, open modal and prefill with the first character.
                    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                      e.preventDefault();
                      setSearchEnabled(true);
                      window.setTimeout(() => openSearch(e.key), 50);
                    }
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 text-slate-700 hover:text-slate-900 transition-colors"
              aria-label="Menü"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={1.5} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              )}
            </button>

            {/* ACIL DESTEK BUTTON - Desktop */}
            <Link
              href="tel:+905372425535"
              className="hidden lg:flex min-h-[48px] items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg transition-colors font-semibold text-sm flex-shrink-0 shadow-sm"
              title="Acil teknik destek için hemen arayın"
            >
              <Phone className="w-5 h-5" strokeWidth={2} />
              <span>Acil Destek</span>
            </Link>
          </div>

          {/* Second Row: Mobile Search */}
          <div className="xl:hidden pb-3">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="İsterseniz arayabilirsiniz..."
                readOnly
                onFocus={() => {
                  setSearchEnabled(true);
                  window.setTimeout(() => openSearch(), 50);
                }}
                onKeyDown={(e) => {
                  if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    e.preventDefault();
                    setSearchEnabled(true);
                    window.setTimeout(() => openSearch(e.key), 50);
                  }
                }}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary focus:bg-white transition-colors"
              />
            </div>
          </div>
        </div>
      </header>

      {searchEnabled && <SearchModal />}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/5 backdrop-blur-sm z-[55] lg:hidden transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />
          <div 
            className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-[60] lg:hidden border-b border-slate-200 transition-transform" 
            style={{ marginTop: isEmergency ? '76px' : '64px' }}
          >
            <div className="container-wide py-8 relative">
              {/* Close Button - Inside Menu Panel */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors z-[70]"
                aria-label="Menüyü Kapat"
              >
                <X className="w-6 h-6" strokeWidth={1.5} />
              </button>
              
              <nav className="flex flex-col gap-0">
                <Link
                  href="/rehber/solunum-sistemleri"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-5 text-slate-700 hover:bg-slate-50 rounded-lg font-medium text-base transition-colors"
                  title="Oksijen konsantratörü ve solunum destek sistemleri"
                >
                  Oksijen Çözümleri
                </Link>
                <Link
                  href="/rehber/evde-bakim-ekipmanlari"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-5 text-slate-700 hover:bg-slate-50 rounded-lg font-medium text-base transition-colors"
                  title="Evde bakım ekipmanları ve hasta yatakları"
                >
                  Evde Bakım
                </Link>
                <Link
                  href="/ekipmanlar"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-5 text-slate-700 hover:bg-slate-50 rounded-lg font-medium text-base transition-colors"
                  title="Tüm medikal ekipman kataloğu"
                >
                  Ekipmanlar
                </Link>
                <Link
                  href="/hizmetler"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-5 text-slate-700 hover:bg-slate-50 rounded-lg font-medium text-base transition-colors"
                  title="Teknik servis, kiralama ve satış hizmetleri"
                >
                  Hizmetler
                </Link>
                <Link
                  href="/tabanlik"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-5 text-slate-700 hover:bg-slate-50 rounded-lg font-medium text-base transition-colors"
                  style={{ fontFamily: 'var(--font-premium)' }}
                  title="Kişiye özel tabanlık analizi ve çözümleri"
                >
                  VIP Tabanlık
                </Link>
                <Link
                  href="/iletisim"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-5 text-slate-700 hover:bg-slate-50 rounded-lg font-medium text-base transition-colors"
                  title="İletişim bilgileri ve adres"
                >
                  İletişim
                </Link>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
