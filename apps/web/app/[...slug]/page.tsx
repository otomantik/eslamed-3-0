import { DynamicHero } from "@/components/sections/hero/index";
import { detectIntent } from "@/lib/intent/detector";
import { ModeAwareNavbar } from "@/components/layout/mode-aware-navbar";
import { ModeWrapper } from "@/components/ui/mode-wrapper";

export default async function DynamicPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const pathname = resolvedParams.slug ? `/${resolvedParams.slug.join('/')}` : '/';
  
  // Merge pathname into searchParams for intent detection
  const searchParamsWithPath = {
    ...resolvedSearchParams,
    url: pathname,
  };

  // Detect intent using the new system
  const intentResult = await detectIntent(searchParamsWithPath);

  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      {/* Mode-aware navbar */}
      <ModeAwareNavbar serverMode={intentResult.mode} />

      {/* Hero - ALWAYS OUTSIDE ModeWrapper */}
      <DynamicHero intent={intentResult.mode} district={intentResult.district} />

      {/* Mode-specific content wrapper */}
      <ModeWrapper serverMode={intentResult.mode}>
        {/* Page content goes here - currently empty for dynamic pages */}
      </ModeWrapper>

      {/* Debug Info (For Development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 text-xs rounded-lg font-mono z-50 max-w-xs">
          <div className="font-bold mb-1">Dynamic Page Debug:</div>
          <div>Path: {pathname}</div>
          <div>Mode: {intentResult.mode}</div>
          <div>Score: {intentResult.score}/100</div>
          <div>District: {intentResult.district}</div>
          <div>Confidence: {(intentResult.confidence * 100).toFixed(0)}%</div>
        </div>
      )}
    </main>
  );
}







