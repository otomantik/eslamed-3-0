export type SearchTelemetryEvent = {
  term: string;
  resultCount: number;
  selectedId?: string;
  action?: 'select' | 'whatsapp' | 'open';
};

// Visitor ID (shared concept with Tracker)
function getVisitorId(): string {
  if (typeof window === 'undefined') return '';
  let vid = localStorage.getItem('vid');
  if (!vid) {
    vid = 'v_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    localStorage.setItem('vid', vid);
  }
  return vid;
}

// Session ID (30min rolling)
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  const sessionKey = 'session_id';
  const sessionTimestampKey = 'session_timestamp';
  const sessionTimeout = 30 * 60 * 1000;

  const now = Date.now();
  const lastSessionTime = parseInt(localStorage.getItem(sessionTimestampKey) || '0', 10);
  const existingSessionId = localStorage.getItem(sessionKey);

  if (!existingSessionId || now - lastSessionTime > sessionTimeout) {
    const newSessionId = 'sess_' + getVisitorId() + '_' + now.toString(36);
    localStorage.setItem(sessionKey, newSessionId);
    localStorage.setItem(sessionTimestampKey, now.toString());
    return newSessionId;
  }

  localStorage.setItem(sessionTimestampKey, now.toString());
  return existingSessionId;
}

function getIngestUrl(): string {
  // Prefer explicit config if provided.
  const envBase = (process.env.NEXT_PUBLIC_API_URL || '').trim();
  let base = envBase || (typeof window !== 'undefined' ? window.location.origin : '');

  // Normalize: if someone set base like https://eslamed.com/api, strip trailing /api
  if (base.endsWith('/api')) base = base.slice(0, -4);
  if (base.endsWith('/')) base = base.slice(0, -1);
  return `${base}/api/track/style.css`;
}

export function logSearchTelemetry(ev: SearchTelemetryEvent) {
  if (typeof window === 'undefined') return;

  const payload = {
    vid: getVisitorId(),
    url: window.location.href,
    ref: document.referrer || 'direct',
    events: [
      {
        type: 'search',
        timestamp: Date.now(),
        session_id: getSessionId(),
        scroll_depth: 0,
        element_id: 'search',
        button_proximity: 0,
        call_duration_est: 0,
        pref_intent: '',
        is_adblock_detected: 0,
        meta: {
          term: ev.term,
          result_count: ev.resultCount,
          selected_id: ev.selectedId || '',
          action: ev.action || '',
        },
      },
    ],
  };

  const url = getIngestUrl();
  const body = JSON.stringify(payload);

  // Best-effort, never block UX
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon(url, blob);
    return;
  }

  fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {});
}


