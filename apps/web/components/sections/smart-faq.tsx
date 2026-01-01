import { CheckCircle2 } from 'lucide-react';
import type { IntentMode } from '@/lib/intent/detector';

interface SmartFAQProps {
  intent: IntentMode;
}

export function SmartFAQ({ intent }: SmartFAQProps) {
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

  const medicalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Eslamed',
    description: 'Evde kullanım için medikal ekipman seçimi ve süreç yönlendirmesi (solunum desteği, evde bakım, ölçüm ve takip). Tanı/tedavi kararı yerine geçmez.',
    areaServed: {
      '@type': 'City',
      name: 'Istanbul'
    },
    telephone: '+905372425535',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Alemdağ Mah. Atabey Caddesi 19/BA',
      addressLocality: 'Çekmeköy',
      addressRegion: 'İstanbul',
      addressCountry: 'TR'
    }
  };

  return (
    <section className="py-20 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
      />

      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900 mb-4 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" strokeWidth={1.5} />
            Sık Sorulan Sorular
          </h2>
          <p className="text-base text-slate-600">
            Süreç, güvenlik ve sınırlar hakkında kısa yanıtlar
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {relevantFaqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden transition-all hover:border-slate-300"
            >
              <summary className="px-6 py-4 cursor-pointer font-semibold text-slate-900 flex items-center justify-between list-none">
                <span>{faq.question}</span>
                <span className="text-slate-400 group-open:text-slate-600 transition-transform group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <div className="px-6 pb-4 text-slate-600 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}



