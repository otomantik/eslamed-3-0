import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero";

// Intent Types
type IntentType = 'URGENT_REPAIR' | 'RENTAL' | 'SALES' | 'WASTE';

interface IntentData {
  type: IntentType;
  district: string;
}

// Mock Intent Logic (Real one calls Backend/Go or Edge Config)
async function getIntent(gclid?: string): Promise<IntentData> {
  // Simulating sub-10ms lookup
  // In production, this fetches from the Go Backend via Internal API or Edge Config
  if (!gclid) return { type: 'RENTAL', district: 'Istanbul' };
  if (gclid.includes('Urgent')) return { type: 'URGENT_REPAIR', district: 'Umraniye' };
  if (gclid.includes('Buy')) return { type: 'SALES', district: 'Kadikoy' };
  return { type: 'RENTAL', district: 'Istanbul' };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const gclid = typeof resolvedParams.gclid === 'string' ? resolvedParams.gclid : undefined;

  const intent = await getIntent(gclid);

  return (
    <main className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <Navbar />
      <HeroSection intent={intent.type} />

      {/* Debug Info (For Development) */}
      <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 text-xs rounded-lg font-mono z-50">
        Intent: {intent.type} | District: {intent.district}
      </div>
    </main>
  );
}
