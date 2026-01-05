import { ModeAwareNavbar } from "@/components/layout/mode-aware-navbar";
import { DynamicHero } from "@/components/sections/hero/index";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { detectIntent } from "@/lib/intent/detector";
import { ModeWrapper } from "@/components/ui/mode-wrapper";
import type { IntentMode } from "@/lib/intent/detector";

/**
 * ✅ ADSMantık Performance Optimization: Dynamic imports for Ghost Sections
 * Sections are only loaded when visibility.showSection is true
 * This eliminates unused code from the bundle
 * 
 * Note: ssr: false removed for Server Component compatibility
 * Components with 'use client' directive will still render client-side
 */
const SEOAnchorSection = dynamic(
  () => import("@/components/sections/seo-anchor-section").then((m) => ({ default: m.SEOAnchorSection }))
);
const BrandTrustTicker = dynamic(
  () => import("@/components/sections/brand-trust-ticker").then((m) => ({ default: m.BrandTrustTicker }))
);
const ProductShowcase = dynamic(
  () => import("@/components/sections/product-showcase").then((m) => ({ default: m.ProductShowcase }))
);
const ServiceValueGrid = dynamic(
  () => import("@/components/sections/service-value-grid").then((m) => ({ default: m.ServiceValueGrid }))
);
const ServiceMatrix = dynamic(
  () => import("@/components/sections/service-matrix").then((m) => ({ default: m.ServiceMatrix }))
);
const HyperLocalMap = dynamic(
  () => import("@/components/sections/hyperlocal-map").then((m) => ({ default: m.HyperLocalMap }))
);
const SmartFAQ = dynamic(
  () => import("@/components/sections/smart-faq").then((m) => ({ default: m.SmartFAQ }))
);
const TrustSafetyBridge = dynamic(
  () => import("@/components/sections/trust-safety-bridge").then((m) => ({ default: m.TrustSafetyBridge }))
);
const WallOfTrust = dynamic(
  () => import("@/components/sections/wall-of-trust").then((m) => ({ default: m.WallOfTrust }))
);
const Footer = dynamic(
  () => import("@/components/sections/footer").then((m) => ({ default: m.Footer }))
);
const PageFeedback = dynamic(
  () => import("@/components/ui/page-feedback").then((m) => ({ default: m.PageFeedback }))
);
const EmergencySteps = dynamic(
  () => import("@/components/sections/mode-specific/emergency-steps").then((m) => ({ default: m.EmergencySteps }))
);
const PriceTable = dynamic(
  () => import("@/components/sections/mode-specific/price-table").then((m) => ({ default: m.PriceTable }))
);
const GuideCategories = dynamic(
  () => import("@/components/sections/mode-specific/guide-categories").then((m) => ({ default: m.GuideCategories }))
);
const RentalProcess = dynamic(
  () => import("@/components/sections/mode-specific/rental-process").then((m) => ({ default: m.RentalProcess }))
);
const InteractiveStats = dynamic(
  () => import("@/components/sections/mode-specific/interactive-stats").then((m) => ({ default: m.InteractiveStats }))
);

/**
 * ✅ FIXED: Full Visibility interface covering all sections
 * Every mode MUST explicitly return true/false for every property
 */
interface SectionVisibility {
  showSEOAnchor: boolean;
  showInteractiveStats: boolean;
  showWallOfTrust: boolean;
  showServiceValueGrid: boolean;
  showProductShowcase: boolean;
  showServiceMatrix: boolean;
  showHyperLocalMap: boolean;
  showTrustSafetyBridge: boolean;
  showSmartFAQ: boolean;
  showBrandTrustTicker: boolean;
  showPageFeedback: boolean;
  showEmergencySteps: boolean;
  showPriceTable: boolean;
  showGuideCategories: boolean;
  showRentalProcess: boolean;
  showFooter: boolean; // ✅ FIXED: Renamed from shouldShowNavbar
}

/**
 * Section Visibility Matrix: Deterministic mode-based rendering
 * ✅ ADSMantık Compliance: Each mode shows ONLY relevant sections
 */
function getSectionVisibility(mode: IntentMode): SectionVisibility {
  switch (mode) {
    case 'CRITICAL_EMERGENCY':
      return {
        showSEOAnchor: false,
        showInteractiveStats: false,
        showWallOfTrust: false,
        showServiceValueGrid: false,
        showProductShowcase: false,
        showServiceMatrix: false,
        showHyperLocalMap: false,
        showTrustSafetyBridge: false,
        showSmartFAQ: false,
        showBrandTrustTicker: false,
        showPageFeedback: false,
        showEmergencySteps: true,
        showPriceTable: false,
        showGuideCategories: false,
        showRentalProcess: false,
        showFooter: false, // PanicRecoveryUI handles its own footer
      };

    case 'TRUST_SEEKER':
      return {
        showSEOAnchor: false, // PremiumConciergeUI has its own trust indicators
        showInteractiveStats: false, // ✅ FIXED: PremiumConciergeUI already shows credentials, no duplication
        showWallOfTrust: true, // Testimonials only (badges removed)
        showServiceValueGrid: true,
        showProductShowcase: true,
        showServiceMatrix: true,
        showHyperLocalMap: true,
        showTrustSafetyBridge: true,
        showSmartFAQ: true,
        showBrandTrustTicker: true,
        showPageFeedback: true,
        showEmergencySteps: false,
        showPriceTable: false,
        showGuideCategories: false,
        showRentalProcess: false,
        showFooter: true,
      };

    case 'PRICE_SENSITIVE':
      return {
        showSEOAnchor: true, // SEOAnchorSection shows credentials
        showInteractiveStats: false, // ✅ FIXED: SEOAnchorSection already shows credentials, no duplication
        showWallOfTrust: true,
        showServiceValueGrid: true,
        showProductShowcase: true,
        showServiceMatrix: true,
        showHyperLocalMap: true,
        showTrustSafetyBridge: true,
        showSmartFAQ: true,
        showBrandTrustTicker: true,
        showPageFeedback: true,
        showPriceTable: true,
        showEmergencySteps: false,
        showGuideCategories: false,
        showRentalProcess: false,
        showFooter: true,
      };

    case 'INFORMATION_SEEKER':
      return {
        showSEOAnchor: true, // SEOAnchorSection shows credentials
        showInteractiveStats: false, // ✅ FIXED: SEOAnchorSection already shows credentials, no duplication
        showWallOfTrust: true,
        showServiceValueGrid: true,
        showProductShowcase: true,
        showServiceMatrix: true,
        showHyperLocalMap: true,
        showTrustSafetyBridge: true,
        showSmartFAQ: true,
        showBrandTrustTicker: true,
        showPageFeedback: true,
        showGuideCategories: true,
        showEmergencySteps: false,
        showPriceTable: false,
        showRentalProcess: false,
        showFooter: true,
      };

    case 'COMMERCIAL_RENTAL':
      return {
        showSEOAnchor: true, // SEOAnchorSection shows credentials
        showInteractiveStats: false, // ✅ FIXED: SEOAnchorSection already shows credentials, no duplication
        showWallOfTrust: true,
        showServiceValueGrid: true,
        showProductShowcase: true,
        showServiceMatrix: true,
        showHyperLocalMap: true,
        showTrustSafetyBridge: true,
        showSmartFAQ: true,
        showBrandTrustTicker: true,
        showPageFeedback: true,
        showRentalProcess: true,
        showEmergencySteps: false,
        showPriceTable: false,
        showGuideCategories: false,
        showFooter: true,
      };

    default:
      // Fallback: show all sections (should not happen with typed modes)
      return {
        showSEOAnchor: true, // SEOAnchorSection shows credentials
        showInteractiveStats: false, // ✅ FIXED: SEOAnchorSection already shows credentials, no duplication
        showWallOfTrust: true,
        showServiceValueGrid: true,
        showProductShowcase: true,
        showServiceMatrix: true,
        showHyperLocalMap: true,
        showTrustSafetyBridge: true,
        showSmartFAQ: true,
        showBrandTrustTicker: true,
        showPageFeedback: true,
        showEmergencySteps: false,
        showPriceTable: false,
        showGuideCategories: false,
        showRentalProcess: false,
        showFooter: true,
      };
  }
}

// Skeleton components for Suspense
function MapSkeleton() {
  return (
    <div className="py-20 bg-slate-50">
      <div className="container-wide">
        <div className="h-[500px] bg-slate-200 rounded-2xl animate-pulse" />
      </div>
    </div>
  );
}

function TickerSkeleton() {
  return (
    <div className="bg-slate-900 py-3">
      <div className="container-wide">
        <div className="h-4 bg-slate-700 rounded w-64 animate-pulse" />
      </div>
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  
  // Detect intent
  const intentResult = await detectIntent(resolvedParams);
  
  // Get section visibility matrix for current mode
  const visibility = getSectionVisibility(intentResult.mode);

  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900 pb-16 lg:pb-0">
      {/* Mode-aware navbar - handles all modes correctly */}
      <ModeAwareNavbar serverMode={intentResult.mode} />

      {/* Hero - ALWAYS OUTSIDE ModeWrapper */}
      <DynamicHero intent={intentResult.mode} district={intentResult.district} />

      {/* SEO Anchor Section - Conditional based on mode */}
      {visibility.showSEOAnchor && <SEOAnchorSection />}

      {/* Mode-specific content wrapper */}
      <ModeWrapper serverMode={intentResult.mode}>
        {/* Mode-specific sections */}
        {visibility.showEmergencySteps && <EmergencySteps />}
        {visibility.showPriceTable && <PriceTable />}
        {visibility.showGuideCategories && <GuideCategories />}
        {visibility.showRentalProcess && <RentalProcess />}
        
        {/* Conditional sections based on visibility matrix */}
        {visibility.showInteractiveStats && <InteractiveStats />}
        {visibility.showServiceValueGrid && <ServiceValueGrid intent={intentResult.mode} />}
        {visibility.showProductShowcase && <ProductShowcase />}
        {visibility.showServiceMatrix && <ServiceMatrix intent={intentResult.mode} />}
        {visibility.showWallOfTrust && <WallOfTrust />}
        
        {visibility.showHyperLocalMap && (
          <Suspense fallback={<MapSkeleton />}>
            <HyperLocalMap district={intentResult.district || 'Istanbul'} />
          </Suspense>
        )}
        
        {visibility.showTrustSafetyBridge && <TrustSafetyBridge />}
        {visibility.showSmartFAQ && <SmartFAQ intent={intentResult.mode} />}
        {visibility.showBrandTrustTicker && <BrandTrustTicker />}
        {visibility.showPageFeedback && <PageFeedback />}

        {/* ✅ FIXED: Footer visibility renamed for clarity */}
        {visibility.showFooter && <Footer />}

        {/* Debug Info (Development Only + Query Flag) */}
        {process.env.NODE_ENV === 'development' && 
         typeof resolvedParams.debug === 'string' && 
         resolvedParams.debug === '1' && (
          <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 text-xs rounded-lg font-mono z-50 max-w-sm shadow-2xl border border-slate-700">
            <div className="font-bold mb-2 text-yellow-400">Intent Debug:</div>
            <div className="space-y-1 mb-2">
              <div><span className="text-slate-400">Mode:</span> <span className="text-white font-semibold">{intentResult.mode}</span></div>
              <div><span className="text-slate-400">Score:</span> <span className="text-white">{intentResult.score}/100</span></div>
              <div><span className="text-slate-400">District:</span> <span className="text-green-400 font-semibold">{intentResult.district || 'Not detected'}</span></div>
              <div><span className="text-slate-400">Confidence:</span> <span className="text-white">{(intentResult.confidence * 100).toFixed(0)}%</span></div>
            </div>
            <div className="text-slate-500 text-[10px] border-t border-slate-700 pt-2 mt-2">
              <div>URL: {typeof resolvedParams.url === 'string' ? resolvedParams.url : 'N/A'}</div>
              <div>Query: {typeof resolvedParams.q === 'string' ? resolvedParams.q : 'N/A'}</div>
              <div>District Param: {typeof resolvedParams.district === 'string' ? resolvedParams.district : 'N/A'}</div>
            </div>
          </div>
        )}
      </ModeWrapper>
    </main>
  );
}
