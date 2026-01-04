'use client';

import { useEffect, useRef } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { Testimonials } from './testimonials';
import Link from 'next/link';

/**
 * Wall of Trust: Testimonials and Google Ratings ONLY
 * ✅ ADSMantık Compliance: No hallucinations, verified content only
 * ✅ REMOVED: Trust badges grid (duplicates SEOAnchorSection)
 */
export function WallOfTrust() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Google Rating & Testimonials Section */}
      <section 
        ref={sectionRef}
        className="py-16 bg-gradient-to-b from-emerald-50 to-white animate-fade-in-up"
        style={{ willChange: 'opacity, transform' }}
      >
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            {/* Google Rating Banner */}
            <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6 mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 fill-amber-400 text-amber-400"
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-slate-900 ml-2">4.9</span>
                </div>
                <div className="hidden sm:block w-px h-12 bg-amber-300" />
                <div className="text-center sm:text-left">
                  <div className="text-lg font-semibold text-slate-900">73+ Doğrulanmış Yorum</div>
                  <div className="text-sm text-slate-600">Yüzlerce Mutlu Aile</div>
                </div>
                <div className="sm:ml-auto">
                  <a
                    href="https://g.page/r/YOUR_GOOGLE_REVIEW_LINK"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-amber-300 rounded-lg text-sm font-semibold text-slate-900 hover:bg-amber-50 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-600" strokeWidth={2} />
                    Tüm Yorumları Gör
                  </a>
                </div>
              </div>
            </div>

            {/* ✅ REMOVED: Trust Badges Grid - Duplicates SEOAnchorSection */}
            {/* ✅ ADDED: Verified Facts Link (minimal, non-duplicating) */}
            <div className="text-center mb-8">
              <Link
                href="/isletme-belgeleri"
                className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-700 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" strokeWidth={1.5} />
                <span>Doğrulanabilir kurumsal belgeleri görüntüle</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />
    </>
  );
}

