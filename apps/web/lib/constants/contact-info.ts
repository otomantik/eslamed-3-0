import { REALITY_ANCHORS } from '../integrity/reality-anchors';

/**
 * Contact Information Constants
 * ✅ ADSMantık Compliance: Single source of truth for all contact methods
 * Centralizes phone numbers and WhatsApp links to prevent hardcoding inconsistencies
 */

export const CONTACT_INFO = {
  phone: {
    formatted: REALITY_ANCHORS.contact.phoneFormatted,
    tel: REALITY_ANCHORS.contact.phone,
    display: REALITY_ANCHORS.contact.phoneFormatted,
  },
  whatsapp: {
    number: REALITY_ANCHORS.contact.whatsapp,
    baseUrl: `https://wa.me/${REALITY_ANCHORS.contact.whatsapp}`,
  },
} as const;

/**
 * Helper to generate tel: link
 */
export function getPhoneLink(): string {
  return `tel:${CONTACT_INFO.phone.tel}`;
}

/**
 * Helper to generate WhatsApp base URL
 */
export function getWhatsAppBaseUrl(): string {
  return CONTACT_INFO.whatsapp.baseUrl;
}
