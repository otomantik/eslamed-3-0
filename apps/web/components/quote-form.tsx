'use client';

import { submitQuoteAction } from '@/actions/submit-quote';
import { tracker } from '@/lib/tracking/client';
import { useState } from 'react';

export function QuoteForm() {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);

        // 1. Server Action Çağır (Postgres İşleri)
        const result = await submitQuoteAction(formData);

        if (result.success) {
            // 2. ANALYTICS SUCCESS (ClickHouse İşleri)
            // Server hatasız döndüyse event'i fırlat
            tracker.track('quote_submitted', {
                service_type: 'General', // Formdan dinamik alınabilir
                has_files: false,
                intent_score: 100
            });

            alert("Teklifiniz alındı!");
        } else {
            // Hata takibi
            tracker.track('app_error', {
                code: 'QUOTE_SUBMIT_FAIL',
                component: 'QuoteForm'
            });
        }

        setLoading(false);
    }

    return (
        <form action={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-lg max-w-md">
            <h3 className="text-lg font-bold">Teklif Alın</h3>
            <input
                name="fullName"
                placeholder="Adınız"
                required
                className="border p-2 rounded"
            />
            <input
                name="email"
                type="email"
                placeholder="E-posta"
                required
                className="border p-2 rounded"
            />
            <button
                disabled={loading}
                type="submit"
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Gönderiliyor...' : 'Teklif Al'}
            </button>
        </form>
    );
}
