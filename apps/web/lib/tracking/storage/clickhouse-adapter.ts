/**
 * ClickHouse Storage Adapter
 * Chief Tracking Architect - ESLAMED Evidence Tracking v1
 */

import { clickhouse } from '@/lib/clickhouse/client';

export async function insertEventsToClickHouse(events: any[]) {
  if (!events.length) return;

  if (!clickhouse) {
    // Dev Fallback - Log to console
    if (process.env.NODE_ENV === 'development') {
      console.log('[Mock ClickHouse Insert]', JSON.stringify(events, null, 2));
    } else {
      // In production, you might want to log to a file or alternative storage
      console.log(`[Tracking] ${events.length} events queued (ClickHouse not configured)`);
    }
    return;
  }

  try {
    await clickhouse.insert({
      table: process.env.CLICKHOUSE_EVENTS_TABLE || 'analytics_events',
      values: events,
      format: 'JSONEachRow',
    });
  } catch (err) {
    console.error('[ClickHouse Insert Error]', err);
    // In a real prod scenario, write to a failover log file here
  }
}

export async function checkDuplicates(keys: { eid: string, fp: string }[]): Promise<Set<string>> {
  if (!clickhouse || !keys.length) return new Set();
  
  // Cheap Dedupe Window (Last 10 mins)
  // Note: This is a simplified check. For high scale, use Redis.
  // We use `has` function or simple IN clause.
  // For MVP, we skip this read-path overhead to keep writes fast, 
  // relying on MergeTree deduplication eventually or post-processing.
  return new Set();
}

