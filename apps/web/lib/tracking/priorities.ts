/**
 * Event Priority Mapping
 * Chief Tracking Architect - ESLAMED Evidence Tracking v1
 * 
 * Defines drop policy and retention based on event importance.
 */

import { EventName } from './event-dictionary';

export type EventPriority = 'critical' | 'important' | 'noise';

export const EventPriorityMap: Record<EventName, EventPriority> = {
  'cta_clicked': 'critical',
  'quote_submitted': 'critical',
  'handover_completed': 'critical',
  'app_error': 'critical',

  'search_performed': 'important',
  'mode_changed': 'important',
  'navigation': 'important',

  'app_perf': 'noise',
};

export function getPriority(name: EventName): EventPriority {
  return EventPriorityMap[name] || 'noise';
}

