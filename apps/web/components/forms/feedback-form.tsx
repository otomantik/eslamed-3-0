'use client';

import { useState } from 'react';
import { X, Star, Send } from 'lucide-react';

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * FeedbackForm: Simple 1-click feedback modal (v4.6)
 * Quick "How are we doing?" score collection
 * Schema.org/UserComments compatible
 */
export function FeedbackForm({ isOpen, onClose }: FeedbackFormProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log feedback to demand_logs API
    try {
      await fetch('/api/demand_logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'feedback',
          rating,
          comment: comment.trim() || null,
          timestamp: new Date().toISOString(),
        }),
        keepalive: true,
      });
    } catch (error) {
      // Silent fail
    }

    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setRating(null);
      setComment('');
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-emerald-600" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Teşekkürler!</h3>
            <p className="text-slate-600">Geri bildiriminiz kaydedildi.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">Nasılsınız?</h2>
            <p className="text-slate-600 mb-6">Deneyiminizi bizimle paylaşın.</p>

            <form onSubmit={handleSubmit}>
              {/* Star Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Genel Değerlendirme
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded"
                      aria-label={`${star} yıldız`}
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          rating && star <= rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-slate-200 text-slate-200'
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Comment */}
              <div className="mb-6">
                <label htmlFor="comment" className="block text-sm font-medium text-slate-700 mb-2">
                  Yorumunuz (Opsiyonel)
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 resize-none"
                  placeholder="Görüşlerinizi paylaşın..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!rating}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" strokeWidth={2} />
                Gönder
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

