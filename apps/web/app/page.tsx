import { Navbar } from "@/components/layout/navbar";
import { GlobalAlertBar } from "@/components/sections/global-alert-bar";
import { BrandTrustTicker } from "@/components/sections/brand-trust-ticker";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { ServiceValueGrid } from "@/components/sections/service-value-grid";
import { DynamicHero } from "@/components/sections/hero/index";
import { ServiceMatrix } from "@/components/sections/service-matrix";
import { HyperLocalMap } from "@/components/sections/hyperlocal-map";
import { LiveActivityTicker } from "@/components/sections/live-activity-ticker";
import { FloatingRescueBar } from "@/components/sections/floating-rescue-bar";
import { SmartFAQ } from "@/components/sections/smart-faq";
import { Suspense } from "react";
import { detectIntent } from "@/lib/intent/detector";

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
  
  // Hide navbar in emergency mode
  const hideNavbar = intentResult.mode === 'CRITICAL_EMERGENCY';

  const isEmergency = intentResult.mode === 'CRITICAL_EMERGENCY';

  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      {/* Global Emergency Alert Bar */}
      {isEmergency && <GlobalAlertBar />}
      
      {/* Navbar */}
      <Navbar isEmergency={isEmergency} />

      {/* Live Activity Ticker */}
      <Suspense fallback={<TickerSkeleton />}>
        <LiveActivityTicker />
      </Suspense>

      {/* Dynamic Hero */}
      <DynamicHero intent={intentResult.mode} district={intentResult.district} />

      {/* Brand Trust Ticker */}
      <BrandTrustTicker />

      {/* Service Value Grid */}
      <ServiceValueGrid />

      {/* Product Showcase */}
      <ProductShowcase />

      {/* Service Matrix */}
      <ServiceMatrix intent={intentResult.mode} />

      {/* HyperLocal Map */}
      <Suspense fallback={<MapSkeleton />}>
        <HyperLocalMap district={intentResult.district || 'Istanbul'} />
      </Suspense>

      {/* Smart FAQ */}
      <SmartFAQ intent={intentResult.mode} />

      {/* Floating Rescue Bar (Mobile) */}
      <FloatingRescueBar intent={intentResult.mode} />

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
    </main>
  );
}
