/**
 * Tracking Client: The Engine
 * Chief Tracking Architect - ESLAMED Evidence Tracking v1
 * 
 * Handles reliability, batching, priority-based dropping, and backpressure.
 */

'use client';

import { v4 as uuidv4 } from 'uuid';
import type { EventName, EventPayload } from './event-dictionary';
import { getPriority } from './priorities';
import { getSessionId, getVisitorId, getTraceId } from './ids';

// ✅ FIX: Debounce Helper (Main Thread Blocking Prevention)
function debounce<Args extends unknown[]>(func: (...args: Args) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: Args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

interface QueuedEvent {
  id: string;
  name: string;
  payload: unknown;
  priority: string;
  timestamp: number;
  attempts: number;
}



const MAX_QUEUE_SIZE = 50;
const BATCH_SIZE = 10;
const FLUSH_INTERVAL = 3000;

class TrackingClient {
  private queue: QueuedEvent[] = [];
  private isFlushing = false;
  // Storage işlemini 1 saniye geciktirerek grupla
  private debouncedSave = debounce(() => this.saveQueueActual(), 1000);

  constructor() {
    if (typeof window !== 'undefined') {
      this.rehydrate();
      setInterval(() => this.flush(), FLUSH_INTERVAL);
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this.flush(true);
        }
      });
    }
  }

  public track<T extends EventName>(name: T, payload: EventPayload<T>) {
    // Runtime Schema Check (Dev only)
    // Runtime Schema Check (Dev only)
    if (process.env.NODE_ENV === 'development') {
      import('./event-dictionary').then(({ EventSchemaMap }) => {
        const result = EventSchemaMap[name].safeParse(payload);
        if (!result.success) {
          console.error(`[Tracking Violation] ${name}:`, result.error);
        }
      });
    }

    const priority = getPriority(name);

    // Backpressure: Drop logic
    if (this.queue.length >= MAX_QUEUE_SIZE) {
      if (!this.dropLowPriority()) {
        if (priority !== 'critical') {
          console.warn('[Tracking] Queue full, dropping event:', name);
          return;
        }
        // If critical and queue full of criticals (unlikely), force flush
        this.flush(true);
      }
    }

    const event: QueuedEvent = {
      id: uuidv4(),
      name,
      payload,
      priority,
      timestamp: Date.now(),
      attempts: 0,
    };

    this.queue.push(event);
    // ✅ FIX: Performans için asenkron/debounce save
    this.debouncedSave();
  }

  private dropLowPriority(): boolean {
    // 1. Drop Noise
    const noiseIdx = this.queue.findIndex(e => e.priority === 'noise');
    if (noiseIdx > -1) {
      this.queue.splice(noiseIdx, 1);
      return true;
    }

    // 2. Drop Important
    const impIdx = this.queue.findIndex(e => e.priority === 'important');
    if (impIdx > -1) {
      this.queue.splice(impIdx, 1);
      return true;
    }

    return false; // Can't drop criticals
  }

  private async flush(useBeacon = false) {
    if (this.queue.length === 0 || (this.isFlushing && !useBeacon)) return;
    this.isFlushing = true;

    const batch = this.queue.slice(0, BATCH_SIZE);

    // Envelope
    const envelope = {
      events: batch.map(e => ({
        id: e.id,
        name: e.name,
        payload: e.payload,
        priority: e.priority,
        timestamp: e.timestamp,
        session_id: getSessionId(),
        visitor_id: getVisitorId(),
        trace_id: getTraceId(),
      }))
    };

    try {
      const body = JSON.stringify(envelope);

      let sent = false;

      // ✅ FIX: Beacon Reliability Fallback
      if (useBeacon && navigator.sendBeacon) {
        const blob = new Blob([body], { type: 'application/json' });
        sent = navigator.sendBeacon('/api/track', blob);
      }

      // Beacon reddedilirse veya kullanılmıyorsa Fetch dene
      if (!sent) {
        const blob = new Blob([body], { type: 'application/json' });
        await fetch('/api/track', {
          method: 'POST',
          body: blob,
          keepalive: true, // Tab kapansa bile isteği canlı tut
          headers: { 'Content-Type': 'application/json' }, // Beacon bazen header göndermez
        });
      }

      // Başarılı: Kuyruktan sil
      this.queue = this.queue.filter(q => !batch.find(b => b.id === q.id));
      this.saveQueueActual(); // Hemen kaydet

    } catch (err) {
      console.error('[Tracking] Flush failed', err);
      // Retry logic: Increment attempts
      batch.forEach(e => {
        const qItem = this.queue.find(q => q.id === e.id);
        if (qItem) {
          qItem.attempts++;
          if (qItem.attempts > 3 && qItem.priority !== 'critical') {
            // Drop stale non-criticals
            this.queue = this.queue.filter(q => q.id !== e.id);
          }
        }
      });
    } finally {
      this.isFlushing = false;
    }
  }

  // Gerçek senkron yazma işlemi (Debounce tarafından çağrılır)
  private saveQueueActual() {
    try {
      localStorage.setItem('esl_track_q', JSON.stringify(this.queue));
    } catch {
      // Ignore quota errors
    }
  }

  private rehydrate() {
    try {
      const q = localStorage.getItem('esl_track_q');
      if (q) {
        this.queue = JSON.parse(q);
      }
    } catch {
      // Ignore parse errors
    }
  }
}

export const tracker = new TrackingClient();

