'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { tracker } from '@/lib/tracking/client';
import { getVisitorId } from '@/lib/tracking/ids';
import { ForensicErrorBoundary } from './forensic-error-boundary';

function setCookie(name: string, value: string, days: number) {
    if (typeof document === 'undefined') return;
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
}

function TrackingLogic() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lastPath = useRef('');

    useEffect(() => {
        // 1. Visitor ID'yi al (yoksa yaratır)
        const vid = getVisitorId();

        // 2. COOKIE SYNC (Server'ın bunu görebilmesi için)
        setCookie('esl_vid', vid, 7); // 7 gün TTL

        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

        if (lastPath.current && lastPath.current !== url) {
            tracker.track('navigation', {
                from_path: lastPath.current,
                to_path: url,
            });
        }

        lastPath.current = url;
    }, [pathname, searchParams]);

    return null;
}

export function TrackingProvider({ children }: { children: React.ReactNode }) {
    return (
        <ForensicErrorBoundary>
            <Suspense fallback={null}>
                <TrackingLogic />
            </Suspense>
            {children}
        </ForensicErrorBoundary>
    );
}
