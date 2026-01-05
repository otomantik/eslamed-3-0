'use client';

import { CheckCircle2, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { IntentMode } from '@/lib/intent/detector';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { useIntent } from '@/context/IntentContext';
import { REALITY_ANCHORS } from '@/lib/integrity/reality-anchors';
import { getPhoneLink } from '@/lib/constants/contact-info';

interface SmartFAQProps {
  intent: IntentMode;
}

export function SmartFAQ({ intent }: SmartFAQProps) {
  const { mode } = useIntent();
  const [clickedFaqCount, setClickedFaqCount] = useState(0);
  const [showFastTrackCTA, setShowFastTrackCTA] = useState(false);

  // Track FAQ clicks for predictive CTA injection
  const handleFaqClick = () => {
    const newCount = clickedFaqCount + 1;
    setClickedFaqCount(newCount);

    // Show CTA when conditions are met: urgent mode + 2+ FAQs clicked
    if (mode === 'CRITICAL_EMERGENCY' && newCount >= 2 && !showFastTrackCTA) {
      // Check session storage to avoid showing if already shown
      const fastTrackShown = typeof window !== 'undefined' ? sessionStorage.getItem('eslamed_fast_track_cta_shown') : null;

      if (fastTrackShown !== 'true') {
        setShowFastTrackCTA(true);
        sessionStorage.setItem('eslamed_fast_track_cta_shown', 'true');

        // Log High_Intent_Conversion_Signal to demand_logs API
        const sessionId = sessionStorage.getItem('eslamed_session_id') || `session_${Date.now()}`;
        sessionStorage.setItem('eslamed_session_id', sessionId);

        fetch('/api/demand_logs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'intent_shift',
            subtype: 'High_Intent_Conversion_Signal',
            mode: 'CRITICAL_EMERGENCY',
            previousMode: mode,
            newMode: mode,
            sessionId,
            faqClickCount: newCount,
            trigger: 'fast_track_cta_displayed',
            timestamp: new Date().toISOString(),
          }),
          keepalive: true,
        }).catch(() => {
          // Silent fail for analytics
        });
      }
    }
  };

  // Check on mount if already shown in session (to keep it visible on refresh if state lost but session kept)
  useEffect(() => {
    // Intentionally left empty to avoid synchronous setState error.
    // Persistence is not critical for this ephemeral CTA.
  }, []);
  const faqs = [
    // Foundation (always relevant)
    {
      id: 'emergency',
      question: 'Ne zaman acildir?',
      answer:
        'Ciddi nefes darlığı, bilinç değişikliği, göğüs ağrısı, morarma veya hızla kötüleşme varsa 112 ile iletişime geçin. Bu sayfadaki bilgiler acil sağlık hizmetlerinin yerine geçmez.',
      intentRelevant: ['CRITICAL_EMERGENCY', 'TRUST_SEEKER', 'INFORMATION_SEEKER', 'PRICE_SENSITIVE', 'COMMERCIAL_RENTAL'],
    },
    {
      id: 'not-suitable',
      question: 'Bu hizmet benim için uygun değilse ne olur?',
      answer:
        'Uygunluk; mevcut cihazınızın durumu, hekim önerisi ve kullanım koşullarına göre netleşir. Uygun değilse teknik olarak uygulanabilir alternatifleri konuşuruz; tıbbi karar yerine geçecek yönlendirme yapmayız.',
      intentRelevant: ['TRUST_SEEKER', 'INFORMATION_SEEKER', 'PRICE_SENSITIVE', 'COMMERCIAL_RENTAL', 'CRITICAL_EMERGENCY'],
    },
    {
      id: 'who-decides',
      question: 'Ne ihtiyacım olduğuna kim karar verir?',
      answer:
        'Tıbbi karar hekimindir. Biz; mevcut ekipmanı ve kullanım koşullarını teknik olarak değerlendirir, kurulumu ve güvenli kullanım adımlarını anlatırız.',
      intentRelevant: ['TRUST_SEEKER', 'INFORMATION_SEEKER', 'CRITICAL_EMERGENCY', 'PRICE_SENSITIVE', 'COMMERCIAL_RENTAL'],
    },
    {
      id: 'after-contact',
      question: 'İletişime geçtikten sonra süreç nasıl işler?',
      answer:
        'Kısa bir ihtiyaç ve durum özeti alırız (model, kullanım süresi, arıza belirtisi, adres). Uygunluğu ve teslimat/servis planını netleştirir, gerekli ise kurulum ve kullanım yönlendirmesi yaparız.',
      intentRelevant: ['INFORMATION_SEEKER', 'TRUST_SEEKER', 'CRITICAL_EMERGENCY', 'PRICE_SENSITIVE', 'COMMERCIAL_RENTAL'],
    },

    // Intent-specific (kept short and bounded)
    {
      id: 'pricing',
      question: 'Fiyat nasıl belirlenir?',
      answer:
        'Fiyat; cihaz tipi, süre ve hizmet kapsamına göre değişir. Net ücret için kısa bir ihtiyaç özetiyle bilgi veririz.',
      intentRelevant: ['PRICE_SENSITIVE', 'COMMERCIAL_RENTAL'],
    },
    {
      id: 'approved',
      question: 'Cihaz ve sarf malzemeleriyle ilgili standartlar nedir?',
      answer:
        'Kullanılan ürünler ve süreçler; ürün kaynağı, seri/etiket bilgisi ve bakım kayıtlarıyla izlenebilir olmalıdır. Detaylar model ve kurulum koşuluna göre paylaşılır.',
      intentRelevant: ['TRUST_SEEKER', 'INFORMATION_SEEKER'],
    },
    {
      id: 'usage',
      question: 'Kurulum ve kullanım yönlendirmesi veriyor musunuz?',
      answer:
        'Evet. Kurulum sırasında temel güvenlik adımlarını, filtre/nemlendirme gibi bakımı ve cihazın doğru kullanımını anlatırız. Klinik karar ve doz ayarı hekim tarafından belirlenmelidir.',
      intentRelevant: ['INFORMATION_SEEKER', 'TRUST_SEEKER'],
    },
  ];

  // Keep cognitive load stable: always show the foundation items first, then fill with intent-relevant items.
  const foundationIds = new Set(['emergency', 'not-suitable', 'who-decides', 'after-contact']);
  const foundation = faqs.filter((f) => foundationIds.has(f.id));
  const intentSpecific = faqs.filter((f) => !foundationIds.has(f.id) && f.intentRelevant.includes(intent));
  const relevantFaqs = [...foundation, ...intentSpecific].slice(0, 6);

  // Schema.org JSON-LD
  // Keep this stable (YMYL-safe): only publish the always-shown foundation items to avoid intent-variant mismatch.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: foundation.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-20 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900 mb-4 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" strokeWidth={1.5} />
            Teknik Destek ve Bilgi Merkezi (SSS)
          </h2>
          <p className="text-base text-slate-600">
            Süreç, güvenlik ve sınırlar hakkında kısa yanıtlar
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FAQAccordion
            faqs={relevantFaqs.map((faq) => ({
              id: faq.id,
              question: faq.question,
              answer: faq.answer,
            }))}
            autoExpand={intent === 'INFORMATION_SEEKER'}
            staggerDelay={100}
            onFaqClick={handleFaqClick}
          />

          {/* Predictive CTA: Fast-Track Call (urgent mode + 2+ FAQs clicked) */}
          {showFastTrackCTA && (
            <div
              className="mt-8 rounded-2xl border-2 border-red-200 bg-red-50 p-6 animate-in fade-in slide-in-from-bottom-4 duration-300"
              style={{ containIntrinsicSize: 'auto 120px' }}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-1 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Acil durumda mısınız? Hızlı destek alın
                  </h3>
                  <p className="text-slate-700 mb-4 leading-relaxed">
                    Sorularınıza hızlıca yanıt almak ve acil teknik destek için doğrudan arayabilirsiniz.
                  </p>
                  <a
                    href={getPhoneLink()}
                    className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors min-h-[48px]"
                  >
                    <Phone className="w-5 h-5" strokeWidth={2} />
                    Hemen Ara: {REALITY_ANCHORS.contact.phoneFormatted}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}



