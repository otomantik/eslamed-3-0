/**
 * Testimonials Data (v4.6 - Privacy-Focused)
 * Using initials for privacy compliance (A.Y., G.E., S.K.)
 * Schema.org Review markup compatible
 */

export interface Testimonial {
  author: string; // Initials format: "A. Y."
  text: string;
  rating: number; // 1-5
  verified?: boolean;
  datePublished: string; // ISO 8601 format
  category?: 'service' | 'delivery' | 'rental';
}

export const testimonials: Testimonial[] = [
  {
    author: 'A. Y.',
    text: 'Esla Med medikal, yılbaşı sonrası olsa da 7/24 hizmet veren kurumu aradığımızda oksijen tüpü için gelip değişimi sağlayan yetkili arkadaşımıza teşekkürlerimi sunarım iyi ki varsınız.',
    rating: 5,
    verified: true,
    datePublished: '2026-01-02',
    category: 'service',
  },
  {
    author: 'G. E.',
    text: 'Gece yarısı aradık, ertesi gün sabah teslimat yaptılar. Çok profesyonel ve hızlı bir hizmet. Teşekkürler.',
    rating: 5,
    verified: true,
    datePublished: '2026-01-15',
    category: 'delivery',
  },
  {
    author: 'S. K.',
    text: 'Eslamed ekibi cihaz kurulumunda çok profesyoneldi. Annem için kiraladığımız konsantratör tertemiz geldi.',
    rating: 5,
    verified: true,
    datePublished: '2026-01-20',
    category: 'rental',
  },
];


