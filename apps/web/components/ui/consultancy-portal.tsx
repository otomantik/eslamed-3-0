'use client';

import { useState } from 'react';
import { Calendar, MapPin, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * ConsultancyPortal: VIP mode - Refined booking form
 */
export function ConsultancyPortal() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: '',
    service: 'tabanlik',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `VIP Danışmanlık Randevusu:\n\nAd Soyad: ${formData.name}\nTelefon: ${formData.phone}\nİlçe: ${formData.district}\nHizmet: ${formData.service}\nTarih: ${formData.preferredDate}\nSaat: ${formData.preferredTime}\nNotlar: ${formData.notes || 'Yok'}`;
    window.open(`https://wa.me/905372425535?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border-2 p-8"
      style={{ borderColor: 'var(--accent-vip)' }}
    >
      <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-premium)', color: 'var(--accent-vip)' }}>
        Özel Danışmanlık Randevusu
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
            Ad Soyad *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full min-h-[48px] px-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Adınız ve soyadınız"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
            Telefon *
          </label>
          <input
            type="tel"
            id="phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full min-h-[48px] px-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="05XX XXX XX XX"
          />
        </div>

        <div>
          <label htmlFor="district" className="block text-sm font-medium text-slate-700 mb-2">
            İlçe *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" strokeWidth={1.5} />
            <input
              type="text"
              id="district"
              required
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              className="w-full min-h-[48px] pl-10 pr-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="İstanbul ilçesi"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-2">
              Tercih Edilen Tarih
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" strokeWidth={1.5} />
              <input
                type="date"
                id="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full min-h-[48px] pl-10 pr-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-slate-700 mb-2">
              Tercih Edilen Saat
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" strokeWidth={1.5} />
              <input
                type="time"
                id="time"
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full min-h-[48px] pl-10 pr-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-2">
            Ek Notlar
          </label>
          <textarea
            id="notes"
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            placeholder="Özel istekleriniz veya sorularınız..."
          />
        </div>

        <button
          type="submit"
          className="w-full min-h-[56px] inline-flex items-center justify-center gap-2 font-semibold text-lg rounded-xl transition-all hover:scale-105"
          style={{ backgroundColor: 'var(--accent-vip)', color: '#111827' }}
        >
          <User className="w-5 h-5" strokeWidth={2} />
          <span>Randevu Talebini Gönder</span>
        </button>
      </form>
    </motion.div>
  );
}

