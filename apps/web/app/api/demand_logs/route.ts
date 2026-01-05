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
      case 'pageview':
        logData.url = body?.url;
        logData.ref = body?.ref;
        logData.vid = body?.vid;
        logData.session_id = body?.session_id;
        logData.meta = body?.meta;
        break;
      case 'click':
        logData.element_id = body?.element_id;
        logData.url = body?.url;
        logData.button_proximity = body?.button_proximity;
        logData.hover_duration = body?.hover_duration;
        logData.vid = body?.vid;
        logData.session_id = body?.session_id;
        logData.meta = body?.meta;
        break;
      case 'scroll':
        logData.scroll_depth = body?.scroll_depth;
        logData.scroll_percentage = body?.scroll_percentage;
        logData.vid = body?.vid;
        logData.session_id = body?.session_id;
        break;
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
      case 'intent_shift':
        logData.mode = body?.mode;
        logData.originalParam = body?.originalParam;
        logData.district = body?.district;
        logData.sessionId = body?.sessionId;
        logData.previousMode = body?.previousMode;
        logData.newMode = body?.newMode;
        logData.subtype = body?.subtype; // e.g., 'High_Intent_Conversion_Signal'
        logData.intent_mode = body?.mode || body?.newMode; // Canonical field name for analytics
        break;
      case 'feedback':
      case 'feedback_submission':
        logData.rating = body?.rating;
        logData.comment = body?.comment;
        logData.sessionId = body?.sessionId;
        break;
      default:
        // Generic event handling - preserve all fields
        Object.assign(logData, body);
        // Legacy: search term logging
        if (body?.term) {
          logData.term = body?.term;
          logData.source = body?.source;
          logData.ts = body?.ts;
        }
    }

    // Mock for now: later forward to backend/ClickHouse demand_logs table.
    // Keep it privacy-minimal: only store normalized data and coarse metadata.
    
    // Debug logging (only in development or when DEBUG env is set)
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG === 'true') {
      console.log('[demand_logs]', logData);
    }
    
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}


