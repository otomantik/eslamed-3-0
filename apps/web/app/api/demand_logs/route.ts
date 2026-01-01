import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    
    // Enhanced logging for catalog operations
    const logData: Record<string, any> = {
      type: body?.type || 'unknown',
      timestamp: body?.timestamp || new Date().toISOString(),
    };

    // Handle different log types
    switch (body?.type) {
      case 'catalog_no_result':
        logData.query = body?.query;
        logData.category = body?.category;
        logData.mode = body?.mode;
        logData.filter = body?.filter;
        break;
      case 'catalog_item_click':
        logData.itemId = body?.itemId;
        logData.itemTitle = body?.itemTitle;
        logData.category = body?.category;
        logData.mode = body?.mode;
        break;
      case 'intent_switch':
        logData.mode = body?.mode;
        logData.originalParam = body?.originalParam;
        logData.district = body?.district;
        logData.sessionId = body?.sessionId;
        break;
      default:
        // Legacy: search term logging
        logData.term = body?.term;
        logData.source = body?.source;
        logData.ts = body?.ts;
    }

    // Mock for now: later forward to backend/ClickHouse demand_logs table.
    // Keep it privacy-minimal: only store normalized data and coarse metadata.
    console.log('[demand_logs]', logData);
    
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}


