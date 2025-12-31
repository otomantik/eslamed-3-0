'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Benzersiz Visitor ID oluşturucu (Basit versiyon)
const getVisitorId = () => {
  if (typeof window === 'undefined') return '';
  
  let vid = localStorage.getItem('vid');
  if (!vid) {
    vid = 'v_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    localStorage.setItem('vid', vid);
  }
  return vid;
};

// Session ID oluşturucu (30 dakika timeout ile)
const getSessionId = () => {
  if (typeof window === 'undefined') return '';
  
  const sessionKey = 'session_id';
  const sessionTimestampKey = 'session_timestamp';
  const sessionTimeout = 30 * 60 * 1000; // 30 dakika
  
  const now = Date.now();
  const lastSessionTime = parseInt(localStorage.getItem(sessionTimestampKey) || '0', 10);
  const existingSessionId = localStorage.getItem(sessionKey);
  
  // Eğer session yoksa veya timeout olmuşsa yeni session oluştur
  if (!existingSessionId || (now - lastSessionTime > sessionTimeout)) {
    const newSessionId = 'sess_' + getVisitorId() + '_' + now.toString(36);
    localStorage.setItem(sessionKey, newSessionId);
    localStorage.setItem(sessionTimestampKey, now.toString());
    return newSessionId;
  }
  
  // Mevcut session'ı güncelle (timestamp'i yenile)
  localStorage.setItem(sessionTimestampKey, now.toString());
  return existingSessionId;
};

export default function Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  // Çift sayımı engellemek için ref kullanıyoruz
  const lastPath = useRef(''); 
  // Scroll depth tracking için milestone'ları takip et
  const scrollMilestones = useRef<Set<number>>(new Set());
  // Pre-flight interceptor: Hover/touch tracking için
  const hoverTimers = useRef<Map<string, number>>(new Map());
  // Call duration estimator: Page visibility tracking
  const callStartTime = useRef<number | null>(null);

  // Client-side only - prevent SSR issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Ad-blocker detection
  const detectAdblocker = (): number => {
    if (typeof window === 'undefined') return 0;
    
    // Test if common ad-blocker patterns exist
    const testDiv = document.createElement('div');
    testDiv.innerHTML = '&nbsp;';
    testDiv.className = 'adsbox';
    testDiv.style.position = 'absolute';
    testDiv.style.left = '-9999px';
    document.body.appendChild(testDiv);
    
    const isBlocked = testDiv.offsetHeight === 0 || 
                      testDiv.offsetLeft === 0 || 
                      window.getComputedStyle(testDiv).display === 'none';
    
    document.body.removeChild(testDiv);
    return isBlocked ? 1 : 0;
  };

  // Get prefilled intent based on URL/pathname
  const getPrefIntent = (): string => {
    const url = window.location.href.toLowerCase();
    const path = pathname.toLowerCase();
    
    if (url.includes('dolum') || url.includes('refill') || path.includes('dolum')) {
      return 'Refill';
    }
    if (url.includes('tamir') || url.includes('repair') || url.includes('ses') || path.includes('tamir')) {
      return 'Repair';
    }
    if (url.includes('kiralik') || url.includes('rental') || path.includes('kiralik')) {
      return 'Rental';
    }
    return '';
  };

  // Generic event sender function (enhanced with new fields)
  const sendEvent = async (
    eventType: string, 
    scrollDepth?: number, 
    elementId?: string, 
    meta?: Record<string, any>,
    buttonProximity?: number,
    callDurationEst?: number,
    prefIntent?: string
  ) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 
        (typeof window !== 'undefined' && window.location.hostname === 'eslamed.com' 
          ? 'https://eslamed.com/api' 
          : 'http://localhost:8080');
      
      // Detect ad-blocker once per session
      const adblockKey = 'adblock_detected';
      let isAdblockDetected = 0;
      if (!sessionStorage.getItem(adblockKey)) {
        isAdblockDetected = detectAdblocker();
        sessionStorage.setItem(adblockKey, isAdblockDetected.toString());
      } else {
        isAdblockDetected = parseInt(sessionStorage.getItem(adblockKey) || '0', 10);
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 saniye timeout
      
      try {
        await fetch(`${apiUrl}/api/track/style.css`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            vid: getVisitorId(),
            url: window.location.href,
            ref: document.referrer || 'direct',
            events: [{
              type: eventType,
              timestamp: Date.now(),
              session_id: getSessionId(),
              scroll_depth: scrollDepth || 0,
              element_id: elementId || '',
              button_proximity: buttonProximity || 0,
              call_duration_est: callDurationEst || 0,
              pref_intent: prefIntent || getPrefIntent(),
              is_adblock_detected: isAdblockDetected,
              meta: meta || {}
            }]
          }),
          keepalive: true,
          signal: controller.signal
        });
        clearTimeout(timeoutId);
      } catch (fetchErr) {
        clearTimeout(timeoutId);
        // Sadece ilk hatada logla, sonra sessizce devam et
        const errorKey = 'track_error_logged';
        if (!sessionStorage.getItem(errorKey)) {
          sessionStorage.setItem(errorKey, 'true');
          if (process.env.NODE_ENV === 'development') {
            console.warn('Backend tracking unavailable (backend not running). This is normal in development.');
          }
        }
        // Hata durumunda sessizce devam et, kullanıcı deneyimini bozma
      }
    } catch (err) {
      // Sadece beklenmeyen hataları logla
      if (process.env.NODE_ENV === 'development' && err instanceof Error && !err.message.includes('aborted')) {
        console.error('Unexpected track error:', err);
      }
    }
  };

  // Pageview tracking
  useEffect(() => {
    // Only track after component is mounted (client-side)
    if (!mounted) return;
    // Sayfa her değiştiğinde çalışır
    const currentPath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    if (lastPath.current === currentPath) return;
    lastPath.current = currentPath;
    
    // Reset scroll milestones for new page
    scrollMilestones.current.clear();

    // Send pageview event
    sendEvent('pageview', 0, '', {
      width: window.innerWidth,
      height: window.innerHeight,
      pathname: pathname,
      searchParams: searchParams?.toString() || ''
    });
  }, [pathname, searchParams, mounted]);

  // Pre-flight interceptor: Hover and touch tracking
  useEffect(() => {
    if (!mounted) return;

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;
      
      let element: HTMLElement = target;
      let trackValue = element.getAttribute?.('data-track') || null;
      
      // Traverse up the DOM tree
      while (!trackValue && element.parentElement) {
        element = element.parentElement;
        trackValue = element.getAttribute?.('data-track') || null;
      }

      if (trackValue) {
        const hoverStart = Date.now();
        hoverTimers.current.set(trackValue, hoverStart);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;
      
      let element: HTMLElement = target;
      let trackValue = element.getAttribute?.('data-track') || null;
      
      while (!trackValue && element.parentElement) {
        element = element.parentElement;
        trackValue = element.getAttribute?.('data-track') || null;
      }

      if (trackValue && hoverTimers.current.has(trackValue)) {
        const hoverStart = hoverTimers.current.get(trackValue)!;
        const hoverDuration = Date.now() - hoverStart;
        
        // If hovered for more than 1.5 seconds, send pre-flight event
        if (hoverDuration >= 1500) {
          sendEvent('hover_intent', 0, trackValue, {
            hover_duration: hoverDuration,
            element_text: element.textContent?.substring(0, 100) || ''
          }, hoverDuration);
        }
        
        hoverTimers.current.delete(trackValue);
      }
    };

    // Touch tracking (mobile) - fires 300ms before click
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;
      
      let element: HTMLElement = target;
      let trackValue = element.getAttribute?.('data-track') || null;
      
      while (!trackValue && element.parentElement) {
        element = element.parentElement;
        trackValue = element.getAttribute?.('data-track') || null;
      }

      if (trackValue) {
        const touchStart = Date.now();
        hoverTimers.current.set(trackValue + '_touch', touchStart);
        
        // Send pre-flight event immediately for mobile
        sendEvent('touch_intent', 0, trackValue, {
          touch_start: touchStart,
          element_text: element.textContent?.substring(0, 100) || ''
        }, 300); // 300ms pre-flight
      }
    };

    document.addEventListener('mouseenter', handleMouseEnter as any, true);
    document.addEventListener('mouseleave', handleMouseLeave as any, true);
    document.addEventListener('touchstart', handleTouchStart, true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter as any, true);
      document.removeEventListener('mouseleave', handleMouseLeave as any, true);
      document.removeEventListener('touchstart', handleTouchStart, true);
    };
  }, [mounted]);

  // Click tracking: Listen for clicks on elements with data-track attribute
  useEffect(() => {
    if (!mounted) return;

    const handleClick = (e: MouseEvent | TouchEvent) => {
      let target: EventTarget | null = e.target;
      
      // Handle TouchEvent
      if (e instanceof TouchEvent && !target) {
        target = e.targetTouches?.[0]?.target || e.changedTouches?.[0]?.target || null;
      }
      
      // Ensure target is HTMLElement
      if (!target || !(target instanceof HTMLElement)) return;

      // Check if clicked element or its parent has data-track attribute
      let element: HTMLElement = target;
      let trackValue = element.getAttribute?.('data-track') || null;
      
      // Traverse up the DOM tree to find data-track attribute
      while (!trackValue && element.parentElement) {
        element = element.parentElement;
        trackValue = element.getAttribute?.('data-track') || null;
      }

      if (trackValue) {
        // Get hover duration if available
        const hoverStart = hoverTimers.current.get(trackValue);
        const touchStart = hoverTimers.current.get(trackValue + '_touch');
        const hoverDuration = hoverStart 
          ? Date.now() - hoverStart
          : touchStart
          ? Date.now() - touchStart
          : 0;

        // Clear hover timer
        hoverTimers.current.delete(trackValue);
        hoverTimers.current.delete(trackValue + '_touch');

        // Check if it's a call button (tel: link)
        const isCallButton = element.getAttribute('href')?.startsWith('tel:') || 
                           trackValue === 'call';

        // Send click event with proximity data
        sendEvent('click', 0, trackValue, {
          element_text: element.textContent?.substring(0, 100) || '',
          element_tag: element.tagName.toLowerCase(),
          x: (e as MouseEvent).clientX || (e as TouchEvent).touches?.[0]?.clientX || 0,
          y: (e as MouseEvent).clientY || (e as TouchEvent).touches?.[0]?.clientY || 0,
          hover_duration: hoverDuration
        }, hoverDuration, 0, getPrefIntent());

        // If it's a call button, start call duration tracking
        if (isCallButton) {
          callStartTime.current = Date.now();
        }
      }
    };

    document.addEventListener('click', handleClick, true); // Use capture phase
    document.addEventListener('touchend', handleClick, true); // Mobile support
    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('touchend', handleClick, true);
    };
  }, [mounted]);

  // Scroll depth tracking: Track 25%, 50%, 75%, 90% milestones
  useEffect(() => {
    if (!mounted) return;

    let ticking = false; // Throttle flag

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

          // Check milestones: 25, 50, 75, 90
          const milestones = [25, 50, 75, 90];
          
          milestones.forEach(milestone => {
            // Only send if we've crossed this milestone and haven't sent it yet
            if (scrollPercentage >= milestone && !scrollMilestones.current.has(milestone)) {
              scrollMilestones.current.add(milestone);
              sendEvent('scroll', milestone, '', {
                scroll_percentage: scrollPercentage,
                scroll_top: scrollTop,
                document_height: documentHeight
              });
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mounted]);

  // Call duration estimator: Track page visibility for call duration
  useEffect(() => {
    if (!mounted) return;

    const handleVisibilityChange = () => {
      if (callStartTime.current) {
        if (document.hidden) {
          // Page went to background (user is on dialer)
          // Call duration tracking started
        } else {
          // Page came back to foreground
          const callDuration = Math.floor((Date.now() - callStartTime.current) / 1000);
          
          if (callDuration > 0) {
            // Send call duration event
            sendEvent('call_completed', 0, 'call', {
              call_duration_seconds: callDuration,
              call_quality: callDuration < 5 ? 'junk' : 
                           callDuration < 30 ? 'short' :
                           callDuration < 120 ? 'normal' :
                           callDuration < 300 ? 'long' : 'critical'
            }, 0, callDuration);
          }
          
          callStartTime.current = null;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [mounted]);

  return null; // Ekranda hiçbir şey göstermez
}

