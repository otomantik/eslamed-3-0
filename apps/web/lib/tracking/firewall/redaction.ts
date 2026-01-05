/**
 * PII Redaction Firewall
 * Chief Tracking Architect - ESLAMED Evidence Tracking v1
 * 
 * Automatically redacts or drops forbidden keys and patterns.
 */

const FORBIDDEN_KEYS = [
  'name', 'phone', 'email', 'tc', 'tc_no', 'identity',
  'address', 'full_address', 'diagnosis', 'note', 'free_text',
  'message', 'cc', 'credit_card', 'iban'
];

// Regex for TR Phone, Email, TC (11 digits)
const FORBIDDEN_PATTERNS = [
  /\b0?5\d{9}\b/, // Mobile phone
  /\b\d{11}\b/,   // TC Identity-like
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/ // Email
];


// ✅ FIX: Zero-width & Invisible Character Attack Prevention
function normalizeString(str: string): string {
  // NFKC normalization + remove non-printable characters
  // \u200B-\u200D (Zero width spaces/joiners), \uFEFF (BOM)
  return str.normalize('NFKC').replace(/[\u200B-\u200D\uFEFF]/g, '');
}

/**
 * Recursively redact payload, removing forbidden keys and patterns
 */
export function redactPayload(payload: unknown, depth = 0): unknown {
  // ✅ FIX: Stack Overflow Prevention (DoS)
  if (depth > 5) return '[PRUNED_DEPTH]';

  if (typeof payload !== 'object' || payload === null) {
    // Check primitive values if string
    if (typeof payload === 'string') {
      const normalized = normalizeString(payload);
      for (const pattern of FORBIDDEN_PATTERNS) {
        if (pattern.test(normalized)) {
          return '[REDACTED]';
        }
      }
    }
    return payload;
  }

  if (Array.isArray(payload)) {
    return payload.map(item => redactPayload(item, depth + 1));
  }

  const clean: Record<string, unknown> = {};
  const obj = payload as Record<string, unknown>;

  for (const key in obj) {
    // 1. Key Check
    if (FORBIDDEN_KEYS.includes(key.toLowerCase())) {
      continue; // Drop forbidden key
    }

    const value = obj[key];

    // 2. Value Pattern Check (String only)
    if (typeof value === 'string') {
      const normalized = normalizeString(value); // Önce temizle
      let isForbidden = false;
      for (const pattern of FORBIDDEN_PATTERNS) {
        if (pattern.test(normalized)) { // Sonra test et
          isForbidden = true;
          break;
        }
      }
      if (isForbidden) {
        clean[key] = '[REDACTED]';
        continue;
      }
      clean[key] = value; // Orijinalini sakla
    } else if (typeof value === 'object' && value !== null) {
      // 3. Recursion
      clean[key] = redactPayload(value, depth + 1);
    } else {
      clean[key] = value;
    }
  }

  return clean;
}
