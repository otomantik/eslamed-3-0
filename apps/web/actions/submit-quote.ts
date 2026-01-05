'use server';

import { db } from '@/db/postgres/client';
import { users, visitorLinks } from '@/db/postgres/schema';
import { cookies } from 'next/headers';
import { z } from 'zod';

// Form Validasyonu
const QuoteSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
});

export async function submitQuoteAction(formData: FormData) {
    // 1. Form Verisini Parse Et
    const rawData = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
    };

    const validation = QuoteSchema.safeParse(rawData);
    if (!validation.success) return { success: false, error: 'Form geçersiz' };

    try {
        // 2. KULLANICIYI YARAT (Business Data)
        // insert ... returning { id }
        const [newUser] = await db.insert(users).values({
            email: validation.data.email,
            fullName: validation.data.fullName,
        }).returning({ id: users.id });

        // 3. THE GOLDEN LINK (Bağlantı Anı) 🔗
        const cookieStore = await cookies();
        const visitorId = cookieStore.get('esl_vid')?.value;

        if (visitorId) {
            // Postgres'e linki yaz: "Bu anonim visitor (X), aslında bu User (Y)"
            await db.insert(visitorLinks).values({
                visitorId: visitorId,
                userId: newUser.id,
            }).onConflictDoNothing(); // Zaten linklenmişse patlama
        }

        return { success: true, userId: newUser.id };

    } catch (error) {
        console.error('Quote Submit Error:', error);
        return { success: false, error: 'Sunucu hatası' };
    }
}
