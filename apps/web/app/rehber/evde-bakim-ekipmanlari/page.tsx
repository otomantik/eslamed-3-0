import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertCircle, BookOpen, MessageCircle, ShoppingBag, ArrowRight, Bed, Accessibility } from 'lucide-react';
import { ModeAwareNavbar } from '@/components/layout/mode-aware-navbar';
import { Footer } from '@/components/sections/footer';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { QuickActionCard } from '@/components/rehber/quick-action-card';
import { MedicalBedIllustration } from '@/components/infographics/medical-bed-illustration';
import { WheelchairIllustration } from '@/components/infographics/wheelchair-illustration';
import { ProcessTracker } from '@/components/infographics/process-tracker';
import { ExpertVerificationPanel } from '@/components/integrity/expert-verification-panel';
import { ESLAMED_EXPERTS } from '@/lib/integrity/eslamed-experts';

// Get site URL from env or fallback to production
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eslamed.com';

export const metadata: Metadata = {
  title: 'Evde Bakım Ekipmanları Rehberi | ESLAMED',
  description:
    'Hasta yatağı ve mobilite ekipmanları için sakin, anlaşılır teknik rehber. Kurulum, temizlik ve güvenli kullanım adımları.',
  alternates: { canonical: '/rehber/evde-bakim-ekipmanlari' },
};

export default async function EvdeBakimEkipmanlariRehberPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Rehber sayfası için sabit mode (INFORMATION_SEEKER) - detectIntent gereksiz SSR maliyeti yaratır
  const serverMode = 'INFORMATION_SEEKER';
  
  // WhatsApp message helpers with proper encoding
  const whatsAppMessages = {
    hero: encodeURIComponent('Merhaba, evde bakım ekipmanları hakkında kurulum/kiralama bilgisi almak istiyorum.'),
    kurulum: encodeURIComponent('Merhaba, hasta yatağı kurulum/kiralama hakkında bilgi almak istiyorum.'),
  };
  
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Hasta Yatağı Temel Ayarları Nasıl Yapılır?',
    description:
      'Hasta yatağında baş/ayak yükseltme ve pozisyon ayarlarının güvenli teknik kullanım adımları. Bu rehber tıbbi karar yerine geçmez; cihazın temel teknik ayarları için bilgilendirme amaçlıdır.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Güvenlik kontrolü',
        text: 'Kablo ve kumanda bağlantılarını kontrol edin. Yatak hareket alanında engel olmadığından emin olun.',
      },
      {
        '@type': 'HowToStep',
        name: 'Baş ve sırt yükseltme',
        text: 'Kumandadan baş/sırt bölümünü yavaşça yükseltin. Kullanıcı konforunu gözleyin; ağrı varsa durdurun.',
      },
      {
        '@type': 'HowToStep',
        name: 'Ayak bölümünü ayarlama',
        text: 'Ayak bölümünü küçük adımlarla ayarlayın. Dengeyi bozacak hızlı hareketlerden kaçının.',
      },
      {
        '@type': 'HowToStep',
        name: 'Kilit ve kablo düzeni',
        text: 'Teker kilitlerini kontrol edin. Kabloların takılma riskini azaltacak şekilde düzenleyin.',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Hasta yatağı kurulumu zor mu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Kurulum genellikle teknik adımlarla tamamlanır: yerleşim, elektrik bağlantısı, kumanda testi ve kısa güvenlik kontrolü. ESLAMED ekipleri yerinde ücretsiz kurulum desteği sunmaktadır.',
        },
      },
      {
        '@type': 'Question',
        name: 'Temizliği nasıl yapılır?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Nemli bez ve yüzeye uygun temizleyici ile düzenli silme yeterlidir. Elektrik aksamına sıvı temasından kaçının. Kılıf/örtüler için üretici talimatlarını izleyin.',
        },
      },
      {
        '@type': 'Question',
        name: 'Yatak yarası nasıl önlenir?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Bası yarası riski tıbbi değerlendirme gerektirir. Genel destek adımları: düzenli pozisyon değişimi, cildin kuru/temiz tutulması ve uygun destek yüzeyi (ör. havalı yatak) kullanımıdır. Risk yüksekse hekim/hemşire ile plan oluşturulmalıdır.',
        },
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Evde Bakım Ekipmanları Rehberi',
    description:
      'Hasta yatağı ve mobilite ekipmanlarında güvenli kurulum, anlaşılır kullanım ve düşük stresli bakım rutini için teknik rehber.',
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString(), // Full ISO timestamp
    author: {
      '@type': 'Organization',
      name: 'ESLAMED',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ESLAMED Medikal',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/rehber/evde-bakim-ekipmanlari`,
    },
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <ModeAwareNavbar serverMode={serverMode} />

      <header className="pt-28 sm:pt-24 pb-12">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { label: 'Ana Sayfa', href: '/' },
              { label: 'Rehber', href: '/rehber/solunum-sistemleri' },
              { label: 'Evde Bakım Ekipmanları' },
            ]}
            className="text-slate-400"
          />
          
          {/* Medical Disclaimer - Prominent at top */}
          <div className="mt-6 rounded-xl border-2 border-amber-300 bg-amber-50 p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
            <div>
              <h3 className="text-sm font-semibold text-amber-900 mb-1">Önemli Tıbbi Hatırlatma</h3>
              <p className="text-sm text-amber-800 leading-relaxed">
                Bu rehber bilgilendirme amaçlıdır. Cihaz seçimi ve kullanımı mutlaka <strong>hekiminizin veya bakım planınızı yöneten profesyonelin onayıyla</strong> yapılmalıdır. Tıbbi kararlar hekim/hemşire planına göre verilir.
              </p>
            </div>
          </div>

          {/* Hero Layout - 2 Column Grid with CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 items-center">
            {/* Left Side: Title and Description */}
            <div className="space-y-6 order-2 md:order-1">
              <div>
                <h1 className="text-3xl sm:text-4xl font-display font-semibold text-slate-900">
                  Evde Bakım Ekipmanları Rehberi
                </h1>
                <p className="mt-4 text-base text-slate-900 leading-relaxed" style={{ lineHeight: 1.8 }}>
                  Hasta yatağı ve mobilite ekipmanlarında güvenli kurulum, anlaşılır kullanım ve düşük stresli bakım rutini için teknik rehber.
                </p>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/ekipmanlar?category=evde-bakim"
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white px-6 font-semibold hover:bg-blue-700 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" strokeWidth={2} />
                  Hemen Ürünleri Gör
                </Link>
                <a
                  href={`https://wa.me/905372425535?text=${whatsAppMessages.hero}`}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-600 text-emerald-700 px-6 font-semibold hover:bg-emerald-50 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={2} />
                  Uzmana Danışın
                </a>
              </div>
            </div>
            
            {/* Right Side: Visual Illustration */}
            <div className="order-1 md:order-2 overflow-visible px-2 sm:px-0">
              <MedicalBedIllustration />
            </div>
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="container-wide space-y-8">
          {/* Table of Contents (TOC) */}
          <nav className="rounded-2xl border border-slate-200 bg-white p-6 sticky top-4 z-30 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
              <h2 className="text-base font-semibold text-slate-900">Rehber İçeriği</h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
              <li>
                <a href="#hasta-yataklari-mobilite" className="text-blue-600 hover:text-blue-700 hover:underline font-medium flex items-center gap-1">
                  Hasta Yatakları ve Mobilite
                  <ArrowRight className="w-3 h-3" strokeWidth={2} />
                </a>
              </li>
              <li>
                <a href="#hasta-yatagi-ayarlari" className="text-blue-600 hover:text-blue-700 hover:underline font-medium flex items-center gap-1">
                  Hasta Yatağı Ayarları
                  <ArrowRight className="w-3 h-3" strokeWidth={2} />
                </a>
              </li>
              <li>
                <a href="#guvenlik-hatirlatma" className="text-blue-600 hover:text-blue-700 hover:underline font-medium flex items-center gap-1">
                  Güvenlik Hatırlatması
                  <ArrowRight className="w-3 h-3" strokeWidth={2} />
                </a>
              </li>
              <li>
                <a href="#sik-sorulanlar" className="text-blue-600 hover:text-blue-700 hover:underline font-medium flex items-center gap-1">
                  Sık Sorulanlar
                  <ArrowRight className="w-3 h-3" strokeWidth={2} />
                </a>
              </li>
            </ul>
          </nav>

          {/* Section 1: Hasta Yatakları ve Mobilite */}
          <section id="hasta-yataklari-mobilite" className="scroll-mt-[120px] rounded-3xl border border-slate-200 bg-white overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-10">
                <h2 className="text-2xl font-semibold text-slate-900">Hasta Yatakları ve Mobilite</h2>
                <p className="mt-3 text-slate-900 leading-relaxed" style={{ lineHeight: 1.8 }}>
                  Bu rehber, teknik kullanım güvenliği içindir. Tıbbi kararlar hekim/hemşire planına göre verilir.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <article className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <Bed className="w-5 h-5 text-slate-900" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">Hasta Yatağı</h3>
                        <p className="mt-2 text-sm text-slate-900" style={{ lineHeight: 1.8 }}>
                          Konumlandırma, kumanda kullanımı, güvenlik kontrolleri.
                        </p>
                      </div>
                    </div>
                  </article>
                  <article className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <Accessibility className="w-5 h-5 text-slate-900" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">Mobilite</h3>
                        <p className="mt-2 text-sm text-slate-900" style={{ lineHeight: 1.8 }}>
                          Teker kilidi, denge, transfer güvenliği için temel noktalar.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>

                {/* Secondary CTA after section */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/ekipmanlar?category=evde-bakim&filter=kiralik"
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white text-slate-700 px-5 font-medium hover:bg-slate-50 transition-colors text-sm"
                  >
                    Kiralık Ürünleri Gör
                  </Link>
                  <a
                    href={`https://wa.me/905372425535?text=${whatsAppMessages.kurulum}`}
                    target="_blank"
                    rel="noreferrer"
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-600 text-emerald-700 px-5 font-medium hover:bg-emerald-50 transition-colors text-sm"
                  >
                    Kurulum Talebi
                  </a>
                </div>
              </div>

              <div className="relative h-[280px] sm:h-[340px] lg:h-auto lg:min-h-[420px] overflow-visible px-2 sm:px-0">
                <WheelchairIllustration />
              </div>
            </div>
          </section>

          {/* Section 2: Güvenlik Hatırlatması */}
          <section id="guvenlik-hatirlatma" className="scroll-mt-[120px]">
            <QuickActionCard variant="info" title="Kısa güvenlik hatırlatması">
              Elektrikli yataklarda kablo/fiş güvenliği ve teker kilitleri kritik noktadır. Kullanım sırasında ağrı, baş dönmesi veya belirgin kötüleşme olursa tıbbi ekibinize danışın.
            </QuickActionCard>
          </section>

          {/* Section 3: Hasta Yatağı Ayarları */}
          <section id="hasta-yatagi-ayarlari" className="scroll-mt-[120px] rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Hasta Yatağı Ayarları Nasıl Yapılır?</h2>
            <ProcessTracker />
            
            {/* Expert Verification Panel */}
            <div className="mt-8">
              <ExpertVerificationPanel
                expert={ESLAMED_EXPERTS.salih}
                lastReviewDate="2026-01-03"
                contentId="hasta-yatagi-ayarlari"
                contentType="guide"
              />
            </div>
          </section>

          {/* Section 4: FAQ */}
          <section id="sik-sorulanlar" className="scroll-mt-[120px] rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Sık Sorulanlar</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <article className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6">
                <h3 className="text-base font-semibold text-slate-900">Hasta yatağı kurulumu zor mu?</h3>
                <p className="mt-2 text-sm text-slate-900" style={{ lineHeight: 1.8 }}>
                  Kurulum genellikle yerleşim, elektrik bağlantısı, kumanda testi ve kısa güvenlik kontrolü adımlarından oluşur. ESLAMED ekipleri yerinde ücretsiz kurulum desteği sunmaktadır.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6">
                <h3 className="text-base font-semibold text-slate-900">Temizliği nasıl yapılır?</h3>
                <p className="mt-2 text-sm text-slate-900" style={{ lineHeight: 1.8 }}>
                  Nemli bez ve yüzeye uygun temizleyici ile düzenli silme yeterlidir. Elektrik aksamına sıvı temasından kaçının. Kılıf/örtüler için üretici talimatlarını izleyin.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 md:col-span-2">
                <h3 className="text-base font-semibold text-slate-900">Yatak yarası nasıl önlenir?</h3>
                <p className="mt-2 text-sm text-slate-900" style={{ lineHeight: 1.8 }}>
                  Bası yarası riski tıbbi değerlendirme gerektirir. Genel destek adımları: düzenli pozisyon değişimi, cildin kuru/temiz tutulması ve uygun destek yüzeyi (ör. havalı yatak) kullanımıdır. Risk yüksekse hekim/hemşire ile plan oluşturulmalıdır.
                </p>
              </article>
            </div>
          </section>

          {/* Related Guides Section (replaces category cards) */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">İlgili Rehberler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/rehber/solunum-sistemleri"
                className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 hover:bg-slate-50 hover:border-slate-300 transition-colors group"
              >
                <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Solunum Sistemleri Rehberi
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Oksijen konsantratörü kullanımı, filtre temizliği ve bakım ipuçları.
                </p>
              </Link>
              <Link
                href="/rehber/olcum-cihazlari"
                className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 hover:bg-slate-50 hover:border-slate-300 transition-colors group"
              >
                <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Ölçüm Cihazları Rehberi
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Tansiyon ölçümü, doğru kullanım teknikleri ve kalibrasyon.
                </p>
              </Link>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
