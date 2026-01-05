/**
 * Contact Information Constants
 * ✅ ADSMantık Compliance: Single source of truth for all contact methods
 * Centralizes phone numbers and WhatsApp links to prevent hardcoding inconsistencies
 */

export const CONTACT_INFO = {
  phone: {
    formatted: '0537 242 55 35',
    tel: '+905372425535',
    display: '0537 242 55 35',
  },
  whatsapp: {
    number: '905372425535',
    baseUrl: 'https://wa.me/905372425535',
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


