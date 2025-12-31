import { CheckCircle2 } from 'lucide-react';
import type { IntentMode } from '@/lib/intent/detector';

interface SmartFAQProps {
  intent: IntentMode;
}

export function SmartFAQ({ intent }: SmartFAQProps) {
  const faqs = [
    {
      question: 'Oksijen cihazı kiralama ücreti ne kadar?',
      answer: 'Haftalık kiralama 450 TL\'den başlar. Aylık paketlerde indirim uygulanır. Net fiyatlandırma.',
      intentRelevant: ['PRICE_SENSITIVE', 'COMMERCIAL_RENTAL']
    },
    {
      question: 'Acil durumlarda ne kadar sürede ulaşırsınız?',
      answer: '7/24 acil servis hattımız açık. İstanbul içi genellikle 30-45 dakika içinde yanınızdayız.',
      intentRelevant: ['CRITICAL_EMERGENCY']
    },
    {
      question: 'Cihazlarınız Sağlık Bakanlığı onaylı mı?',
      answer: 'Evet, tüm cihazlarımız Sağlık Bakanlığı onaylıdır. Sterilizasyon sertifikalarımız mevcuttur.',
      intentRelevant: ['TRUST_SEEKER']
    },
    {
      question: 'Oksijen tüpü dolum ne kadar sürer?',
      answer: 'Kapınıza kadar gelip dolum yapıyoruz. İşlem yaklaşık 15-20 dakika sürer.',
      intentRelevant: ['COMMERCIAL_RENTAL', 'PRICE_SENSITIVE']
    },
    {
      question: '2. el cihaz alım yapıyor musunuz?',
      answer: 'Evet, kullanılmış cihazlarınızı değerinde alıyoruz. Ücretsiz ekspertiz hizmetimiz var.',
      intentRelevant: ['PRICE_SENSITIVE', 'COMMERCIAL_RENTAL']
    },
    {
      question: 'Cihaz nasıl kullanılır? Eğitim veriyor musunuz?',
      answer: 'Kurulum sırasında detaylı kullanım eğitimi veriyoruz. Ayrıca video kılavuzlarımız var.',
      intentRelevant: ['INFORMATION_SEEKER']
    }
  ];

  // Filter FAQs based on intent
  const relevantFaqs = faqs.filter(faq => 
    faq.intentRelevant.includes(intent) || intent === 'COMMERCIAL_RENTAL'
  ).slice(0, 6);

  // Schema.org JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: relevantFaqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const medicalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Eslamed Medical',
    description: 'Oksijen cihazı kiralama, dolum ve teknik servis hizmetleri',
    areaServed: {
      '@type': 'City',
      name: 'Istanbul'
    },
    telephone: '+905555555555'
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
            Size yardımcı olabileceğimiz konular
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



