/**
 * Event Dictionary: Master allowlist for all tracking events
 * Chief Tracking Architect - ESLAMED Evidence Tracking v1
 * 
 * NO event exists unless defined here. This prevents drift and enforces schema compliance.
 */

import { z } from 'zod';

// --- Primitives ---
const BasePayload = z.object({
  url: z.string().optional(),
  path: z.string().optional(),
});

// --- Critical Events ---
const CtaClickSchema = BasePayload.extend({
  location: z.enum(['header', 'hero', 'footer', 'modal', 'sticky_bar']),
  channel: z.enum(['phone', 'whatsapp', 'form']),
  destination_masked: z.string(), // e.g., "tel:+90555***"
});

const QuoteSubmittedSchema = BasePayload.extend({
  service_type: z.string(),
  intent_score: z.number().optional(),
  has_files: z.boolean(),
});

const HandoverCompletedSchema = BasePayload.extend({
  device_type: z.string(),
  outcome: z.enum(['success', 'fail', 'aborted']),
  duration_ms: z.number(),
});

const AppErrorSchema = BasePayload.extend({
  code: z.string(),
  component: z.string().optional(),
  message_hash: z.string().optional(), // NEVER raw message
});

// --- Important Events ---
const SearchPerformedSchema = BasePayload.extend({
  category: z.string(),
  query_len: z.number(),
  results_count: z.number(),
  query_hash: z.string().optional(), // SHA256, computed client-side
});

const ModeChangedSchema = BasePayload.extend({
  from: z.string(),
  to: z.string(),
  trigger: z.string(),
});

// --- Noise Events ---
const AppPerfSchema = BasePayload.extend({
  metric: z.string(), // LCP, CLS, FID
  value: z.number(),
  rating: z.string().optional(),
});

const NavigationSchema = BasePayload.extend({
  from_path: z.string(),
  to_path: z.string(),
});

// --- Master Dictionary ---
export const EventSchemaMap = {
  'cta_clicked': CtaClickSchema,
  'quote_submitted': QuoteSubmittedSchema,
  'handover_completed': HandoverCompletedSchema,
  'app_error': AppErrorSchema,
  'search_performed': SearchPerformedSchema,
  'mode_changed': ModeChangedSchema,
  'app_perf': AppPerfSchema,
  'navigation': NavigationSchema,
} as const;

export type EventName = keyof typeof EventSchemaMap;
export type EventPayload<T extends EventName> = z.infer<typeof EventSchemaMap[T]>;

export const SCHEMA_VERSION = 1;

