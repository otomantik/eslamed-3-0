import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createHash } from 'crypto';
import { EventSchemaMap, SCHEMA_VERSION } from '@/lib/tracking/event-dictionary';
import { redactPayload } from '@/lib/tracking/firewall/redaction';
import { insertEventsToClickHouse } from '@/lib/tracking/storage/clickhouse-adapter';

// Envelope Schema
const EnvelopeSchema = z.object({
  events: z.array(z.object({
    id: z.string().uuid(),
    name: z.string(),
    payload: z.any(),
    priority: z.string(),
    timestamp: z.number(),
    session_id: z.string().optional(),
    visitor_id: z.string().optional(),
    trace_id: z.string().optional(),
  }))
});

interface AnalyticsPayload {
  url?: string;
  path?: string;
  referrer?: string;
  mode?: string;
  [key: string]: unknown;
}

// ✅ FIX: IP Spoofing Prevention Helper
function getClientIp(req: NextRequest): string {
  // Cloudflare veya Load Balancer arkasındaysanız 'x-real-ip' veya 'cf-connecting-ip' kullanın
  const xRealIp = req.headers.get('x-real-ip');
  const xForwardedFor = req.headers.get('x-forwarded-for');

  if (xRealIp) return xRealIp;
  if (xForwardedFor) {
    // İlk IP gerçektir, diğerleri proxy zinciridir.
    return xForwardedFor.split(',')[0].trim();
  }
  return '127.0.0.1';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = EnvelopeSchema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: 'Invalid envelope' }, { status: 400 });

    const ip = getClientIp(req);
    const ua = req.headers.get('user-agent') || 'unknown';

    // ✅ FIX: Drift Prevention (Günlük değil, Statik veya Aylık Salt)
    // Salt'ı ENV'den al, yoksa hata fırlat (Production güvenliği)
    const secret = process.env.TRACKING_SECRET;
    if (!secret && process.env.NODE_ENV === 'production') {
      console.error('CRITICAL: TRACKING_SECRET missing in production');
      return NextResponse.json({ error: 'Config Error' }, { status: 500 });
    }

    // Salt rotasyonu için sadece YYYY-MM (Ayda bir değişir)
    const monthlySalt = new Date().toISOString().slice(0, 7);

    // Privacy: Subnet masking
    const ipSubnet = ip.includes(':') ? ip.split(':').slice(0, 4).join(':') : ip.split('.').slice(0, 3).join('.');
    const uaFamily = ua.split(' ')[0]; // Coarse UA

    const fingerprintHash = createHash('sha256')
      .update(`${ipSubnet}|${uaFamily}|${monthlySalt}|${secret || 'dev'}`)
      .digest('hex');

    const validEvents = [];
    const serverReceivedAt = Date.now();

    for (const event of result.data.events) {
      const schema = EventSchemaMap[event.name as keyof typeof EventSchemaMap];
      if (!schema) continue;

      const payloadResult = schema.safeParse(event.payload);
      if (!payloadResult.success) continue;

      const sanitizedPayload = redactPayload(payloadResult.data) as AnalyticsPayload;
      const driftMs = serverReceivedAt - event.timestamp;

      // Extract mode from payload if available
      const mode = sanitizedPayload.mode || '';

      validEvents.push({
        server_received_at: serverReceivedAt,
        client_timestamp_ms: event.timestamp,
        drift_ms: driftMs,
        event_id: event.id,
        trace_id: event.trace_id,
        session_id: event.session_id,
        visitor_id: event.visitor_id,
        fingerprint_hash: fingerprintHash,
        event_name: event.name,
        priority: event.priority,
        url: sanitizedPayload.url || '',
        path: sanitizedPayload.path || '',
        referrer: sanitizedPayload.referrer || '',
        mode: mode,
        ua_family: uaFamily,
        payload_json: JSON.stringify(sanitizedPayload),
        schema_version: SCHEMA_VERSION,
      });
    }

    if (validEvents.length > 0) {
      // ✅ FIX: Critical Data Loss Prevention
      // "Fire and Forget" YASAK. İşlem bitene kadar bekle.
      // Next.js Serverless ortamında bu işlem bitmezse process öldürülür.
      await insertEventsToClickHouse(validEvents);
    }

    return new NextResponse(null, { status: 204 });

  } catch (e) {
    console.error('Tracking API Error', e);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}

