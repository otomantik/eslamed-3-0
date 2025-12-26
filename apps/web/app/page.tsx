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

// Layout Components (Placeholders - Will be moved to /components/layouts)
const EmergencyRepairLayout = ({ data }: { data: IntentData }) => (
  <main className="min-h-screen bg-rose-50 text-rose-900 p-10 text-center">
    <h1 className="text-4xl font-bold mb-4">🚨 Cihazınız Arıza mı Yaptı?</h1>
    <p>Konum: {data.district} (Hemen Müdahale)</p>
    <button className="bg-red-600 text-white px-8 py-4 rounded-full mt-8 font-bold text-xl uppercase animate-pulse">
      Acil Servis Çağır
    </button>
  </main>
);

const StandardRentalLayout = ({ data }: { data: IntentData }) => (
  <main className="min-h-screen bg-sky-50 text-sky-900 p-10 text-center">
    <h1 className="text-4xl font-bold mb-4">🏥 Oksijen Konsantratörü Kiralama</h1>
    <p>Bölge: {data.district} (Aynı Gün Teslimat)</p>
    <button className="bg-blue-600 text-white px-8 py-4 rounded-lg mt-8 font-bold text-xl">
      Kirala - 900 TL/Ay
    </button>
  </main>
);

const SalesLayout = ({ data }: { data: IntentData }) => (
  <main className="min-h-screen bg-emerald-50 text-emerald-900 p-10 text-center">
    <h1 className="text-4xl font-bold mb-4">💰 Cihaz Satın Al</h1>
    <p>Bölge: {data.district} (Garantili Satış)</p>
    <button className="bg-green-600 text-white px-8 py-4 rounded-lg mt-8 font-bold text-xl">
      Tüm Modelleri Gör
    </button>
  </main>
);

const GhostLayout = () => <div className="text-transparent">...</div>;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const gclid = typeof resolvedParams.gclid === 'string' ? resolvedParams.gclid : undefined;

  const intent = await getIntent(gclid);

  switch (intent.type) {
    case 'URGENT_REPAIR':
      return <EmergencyRepairLayout data={intent} />;
    case 'RENTAL':
      return <StandardRentalLayout data={intent} />;
    case 'SALES':
      return <SalesLayout data={intent} />;
    case 'WASTE':
      return <GhostLayout />;
    default:
      return <StandardRentalLayout data={intent} />;
  }
}
