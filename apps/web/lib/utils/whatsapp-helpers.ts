import type { IntentMode } from '@/lib/intent/detector';
import { CONTACT_INFO } from '@/lib/constants/contact-info';

/**
 * WhatsApp Helper Functions
 * ✅ ADSMantık Compliance: Centralized WhatsApp message generation
 * Prevents duplicate message logic and ensures consistency across all components
 */

/**
 * Get mode-specific message text for WhatsApp
 */
export function getModeText(mode: IntentMode): string {
  switch (mode) {
    case 'CRITICAL_EMERGENCY':
      return 'acil medikal ekipman desteği';
    case 'TRUST_SEEKER':
      return 'güvenilir medikal ekipman yönlendirmesi';
    case 'PRICE_SENSITIVE':
      return 'fiyat bilgisi ve şeffaf kapsam';
    case 'COMMERCIAL_RENTAL':
      return 'cihaz kiralama ve satış süreçleri';
    case 'INFORMATION_SEEKER':
    default:
      return 'medikal ekipman bilgisi';
  }
}

/**
 * Build a WhatsApp message with mode and district context
 */
export function buildWhatsAppMessage(mode: IntentMode, district?: string): string {
  const districtText = district ? `${district} bölgesinde ` : '';
  const modeText = getModeText(mode);
  return `Merhaba, ${districtText}${modeText} hakkında bilgi almak istiyorum.`;
}

/**
 * Generate a WhatsApp URL with dynamic message based on mode and district
 */
export function getWhatsAppUrl(mode: IntentMode, district?: string): string {
  const message = buildWhatsAppMessage(mode, district);
  return `${CONTACT_INFO.whatsapp.baseUrl}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate WhatsApp URL with custom message text
 */
export function getWhatsAppUrlWithText(text: string): string {
  return `${CONTACT_INFO.whatsapp.baseUrl}?text=${encodeURIComponent(text)}`;
}

/**
 * Pre-defined WhatsApp message templates for specific use cases
 */
export const WHATSAPP_MESSAGES = {
  EMERGENCY: 'Acil teknik destek ihtiyacım var.',
  PRICE: 'Fiyat bilgisi ve teklif almak istiyorum.',
  VIP: 'VIP danışmanlık randevusu planlamak istiyorum.',
  GENERAL: 'Merhaba, medikal ekipman bilgisi hakkında bilgi almak istiyorum.',
} as const;

/**
 * Generate WhatsApp URL using pre-defined message template
 */
export function getWhatsAppUrlWithTemplate(template: keyof typeof WHATSAPP_MESSAGES): string {
  return getWhatsAppUrlWithText(WHATSAPP_MESSAGES[template]);
}

