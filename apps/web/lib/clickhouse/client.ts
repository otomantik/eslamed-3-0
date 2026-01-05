/**
 * ClickHouse Client Adapter
 * Chief Tracking Architect - ESLAMED Evidence Tracking v1
 */

// Dynamic import for ClickHouse (optional dependency)
let clickhouse: any = null;

if (typeof window === 'undefined' && process.env.CLICKHOUSE_URL) {
  // Only load on server-side
  try {
    const { createClient } = require('@clickhouse/client');
    clickhouse = createClient({
      url: process.env.CLICKHOUSE_URL,
      username: process.env.CLICKHOUSE_USER || 'default',
      password: process.env.CLICKHOUSE_PASSWORD || '',
      database: process.env.CLICKHOUSE_DATABASE || 'default',
    });
  } catch (e) {
    // ClickHouse not available, will use mock mode
    console.warn('[Tracking] ClickHouse client not available, using mock mode');
  }
}

export { clickhouse };
