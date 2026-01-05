/**
 * ID Management: Session, Visitor, Trace IDs
 * Chief Tracking Architect - ESLAMED Evidence Tracking v1
 * 
 * Privacy-first ID generation with TTL management.
 */

import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEYS = {
  SESSION: 'esl_sid',
  SESSION_EXP: 'esl_sid_exp',
  VISITOR: 'esl_vid',
  VISITOR_EXP: 'esl_vid_exp',
  TRACE: 'esl_trace',
};

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 mins
const VISITOR_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Get or create session ID (30 min TTL)
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  const now = Date.now();
  let sid = sessionStorage.getItem(STORAGE_KEYS.SESSION);
  const exp = sessionStorage.getItem(STORAGE_KEYS.SESSION_EXP);

  if (!sid || !exp || now > parseInt(exp, 10)) {
    sid = uuidv4();
    sessionStorage.setItem(STORAGE_KEYS.SESSION, sid);
  }
  
  // Rotate expiration on access
  sessionStorage.setItem(STORAGE_KEYS.SESSION_EXP, (now + SESSION_TIMEOUT).toString());
  return sid;
}

/**
 * Get or create visitor ID (7 day TTL, random UUID - NOT a fingerprint)
 */
export function getVisitorId(): string {
  if (typeof window === 'undefined') return '';

  const now = Date.now();
  let vid = localStorage.getItem(STORAGE_KEYS.VISITOR);
  const exp = localStorage.getItem(STORAGE_KEYS.VISITOR_EXP);

  if (!vid || !exp || now > parseInt(exp, 10)) {
    vid = uuidv4(); // Random UUID, NO PII
    localStorage.setItem(STORAGE_KEYS.VISITOR, vid);
  }

  // Extend TTL on access
  localStorage.setItem(STORAGE_KEYS.VISITOR_EXP, (now + VISITOR_TTL).toString());
  return vid;
}

/**
 * Get or create trace ID (ephemeral per interaction chain)
 */
export function getTraceId(): string {
  if (typeof window === 'undefined') return '';
  let trace = sessionStorage.getItem(STORAGE_KEYS.TRACE);
  if (!trace) {
    trace = uuidv4();
    sessionStorage.setItem(STORAGE_KEYS.TRACE, trace);
  }
  return trace;
}

