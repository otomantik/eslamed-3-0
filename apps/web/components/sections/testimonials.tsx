'use client';

import { Star, CheckCircle2 } from 'lucide-react';
import { testimonials as defaultTestimonialsData, type Testimonial } from '@/data/testimonials';

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

/**
 * Testimonials Section: Social Proof with Google Reviews (v4.6 - Privacy-Focused)
 * Displays verified customer testimonials with 5-star ratings
 * Uses initials for privacy compliance (A.Y., G.E., S.K.)
 * Includes schema.org Review markup for Star Snippets in Google SERP
 */
export function Testimonials({ testimonials }: TestimonialsProps) {
  const displayTestimonials = testimonials || defaultTestimonialsData;

  return (
    <section className="py-20 bg-white" id="testimonials">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900 mb-4">
            Neden Bizi Tercih Ediyorlar?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed" style={{ lineHeight: 1.8 }}>
            Yüzlerce mutlu aile, 7/24 güvenli destek deneyimini bizimle yaşıyor. Acil durumlardan günlük kullanıma kadar, 
            her adımda yanınızdayız. İşte müşterilerimizin gerçek hikayeleri.
          </p>
        </div>


        {/* Testimonials Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * TestimonialCard: Premium style testimonial card with 5-star rating
 */
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < testimonial.rating);

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
      {/* Rating Stars */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1">
          {stars.map((filled, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                filled ? 'fill-[#FBBF24] text-[#FBBF24]' : 'fill-slate-200 text-slate-200'
              }`}
              strokeWidth={1.5}
            />
          ))}
        </div>
        {testimonial.verified && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" strokeWidth={2} />
            <span className="text-xs font-semibold text-emerald-700">Google Doğrulanmış Yorum</span>
          </div>
        )}
      </div>

      {/* Testimonial Text */}
      <blockquote className="text-[18px] text-slate-700 leading-relaxed mb-6" style={{ lineHeight: 1.8 }}>
        "{testimonial.text}"
      </blockquote>

      {/* Author */}
      <footer className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div>
          <div className="font-semibold text-slate-900">{testimonial.author}</div>
          {testimonial.datePublished && (
            <div className="text-sm text-slate-500 mt-1">
              {new Date(testimonial.datePublished).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          )}
        </div>
      </footer>
    </article>
  );
}

