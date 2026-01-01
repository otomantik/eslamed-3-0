import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    // Mock for now: later forward to backend/ClickHouse demand_logs table.
    // Keep it privacy-minimal: only store the normalized term and coarse metadata.
    console.log('[demand_logs]', {
      term: body?.term,
      source: body?.source,
      ts: body?.ts,
    });
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}


