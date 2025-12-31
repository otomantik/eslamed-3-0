import { headers } from 'next/headers';
import { cookies } from 'next/headers';

export type IntentMode = 
  | 'CRITICAL_EMERGENCY' 
  | 'TRUST_SEEKER' 
  | 'PRICE_SENSITIVE' 
  | 'COMMERCIAL_RENTAL' 
  | 'INFORMATION_SEEKER';

export interface IntentResult {
  mode: IntentMode;
  score: number;
  district?: string;
  confidence: number;
}

/**
 * Multi-dimensional intent detection engine
 * Analyzes headers, cookies, searchParams, and temporal signals
 */
export async function detectIntent(
  searchParams: { [key: string]: string | string[] | undefined },
  userAgent?: string,
  referer?: string
): Promise<IntentResult> {
  const headersList = await headers();
  const cookieStore = await cookies();
  
  // Extract signals
  const gclid = typeof searchParams.gclid === 'string' ? searchParams.gclid : '';
  const query = typeof searchParams.q === 'string' ? searchParams.q.toLowerCase() : '';
  const url = typeof searchParams.url === 'string' ? searchParams.url.toLowerCase() : '';
  const referrer = referer || headersList.get('referer') || '';
  const ua = userAgent || headersList.get('user-agent') || '';
  
  // Temporal analysis (Istanbul timezone: UTC+3)
  const now = new Date();
  const istTime = new Date(now.getTime() + (3 * 60 * 60 * 1000));
  const hour = istTime.getUTCHours();
  const isNightTime = hour >= 23 || hour < 7;
  
  // Semantic keyword analysis
  const emergencyKeywords = ['acil', 'nöbetçi', 'arıza', 'bozuldu', 'ses', 'beep', 'emergency', 'broken'];
  const trustKeywords = ['şikayet', 'yorum', 'güvenilir', 'onaylı', 'sertifika', 'review', 'complaint'];
  const priceKeywords = ['fiyat', 'kaç para', 'ücret', 'kiralama ücreti', 'ucuz', 'price', 'cost'];
  const infoKeywords = ['nedir', 'nasıl', 'kullanım', 'what is', 'how to'];
  
  // Scoring matrix
  let semanticScore = 0;
  let temporalScore = 0;
  let behavioralScore = 0;
  let technographicScore = 0;
  
  // 1. SEMANTIC ANALYSIS (40% weight)
  const allText = `${query} ${url} ${referrer}`.toLowerCase();
  
  if (emergencyKeywords.some(kw => allText.includes(kw))) {
    semanticScore += 50;
    if (isNightTime) semanticScore += 30; // Night + emergency = critical
  }
  if (trustKeywords.some(kw => allText.includes(kw))) {
    semanticScore += 40;
  }
  if (priceKeywords.some(kw => allText.includes(kw))) {
    semanticScore += 30;
  }
  if (infoKeywords.some(kw => allText.includes(kw))) {
    semanticScore += 10;
  }
  
  // GCLID analysis
  if (gclid) {
    if (gclid.toLowerCase().includes('urgent') || gclid.toLowerCase().includes('emergency')) {
      semanticScore += 40;
    } else if (gclid.toLowerCase().includes('price') || gclid.toLowerCase().includes('buy')) {
      semanticScore += 25;
    }
  }
  
  // 2. TEMPORAL ANALYSIS (20% weight)
  if (isNightTime) {
    temporalScore = 30; // Night queries are urgent
  } else if (hour >= 9 && hour <= 18) {
    temporalScore = 10; // Business hours = commercial
  }
  
  // 3. BEHAVIORAL ANALYSIS (20% weight) - Mock for now
  // In production, this would check cookies for scroll depth, time on page, etc.
  const scrollDepth = cookieStore.get('scroll_depth')?.value;
  if (scrollDepth && parseInt(scrollDepth) > 75) {
    behavioralScore = 20; // Deep engagement
  }
  
  // 4. TECHNOGRAPHIC ANALYSIS (20% weight)
  const isMobile = /mobile|android|iphone/i.test(ua);
  const isSlowConnection = /2g|edge/i.test(ua);
  
  if (isMobile && isSlowConnection) {
    technographicScore = 15; // Mobile + slow = likely urgent need
  }
  
  // Calculate final score (0-100)
  const finalScore = Math.min(100, 
    (semanticScore * 0.4) + 
    (temporalScore * 0.2) + 
    (behavioralScore * 0.2) + 
    (technographicScore * 0.2)
  );
  
  // Determine intent mode
  let mode: IntentMode;
  let confidence = 0.8;
  
  if (finalScore >= 85) {
    mode = 'CRITICAL_EMERGENCY';
    confidence = 0.95;
  } else if (finalScore >= 60) {
    mode = 'TRUST_SEEKER';
    confidence = 0.85;
  } else if (finalScore >= 40) {
    mode = 'PRICE_SENSITIVE';
    confidence = 0.75;
  } else if (finalScore >= 20) {
    mode = 'COMMERCIAL_RENTAL';
    confidence = 0.70;
  } else {
    mode = 'INFORMATION_SEEKER';
    confidence = 0.65;
  }
  
  // Extract district from multiple sources
  const istanbulDistricts = [
    'umraniye', 'kadikoy', 'atasehir', 'besiktas', 'sisli', 'uskudar',
    'beyoglu', 'fatih', 'kartal', 'maltepe', 'pendik', 'tuzla',
    'beylikduzu', 'bakirkoy', 'zeytinburnu', 'gaziosmanpasa', 'kagithane',
    'sariyer', 'beykoz', 'sultanbeyli', 'sancaktepe', 'esenler', 'bagcilar',
    'bahcelievler', 'gungoren', 'kucukcekmece', 'buyukcekmece', 'avcilar',
    'silivri', 'catalca', 'arnavutkoy', 'beykoz', 'adalar'
  ];
  
  let district = 'Istanbul';
  
  // 1. Check searchParams for explicit district parameter
  const districtParam = typeof searchParams.district === 'string' 
    ? searchParams.district.toLowerCase() 
    : null;
  
  if (districtParam && istanbulDistricts.includes(districtParam)) {
    district = districtParam.charAt(0).toUpperCase() + districtParam.slice(1);
  } else {
    // 2. Check URL path
    const urlLower = url.toLowerCase();
    const urlDistrictMatch = istanbulDistricts.find(d => urlLower.includes(`/${d}`) || urlLower.includes(`-${d}`));
    if (urlDistrictMatch) {
      district = urlDistrictMatch.charAt(0).toUpperCase() + urlDistrictMatch.slice(1);
    } else {
      // 3. Check referrer
      const referrerLower = referrer.toLowerCase();
      const refDistrictMatch = istanbulDistricts.find(d => referrerLower.includes(`/${d}`) || referrerLower.includes(`-${d}`));
      if (refDistrictMatch) {
        district = refDistrictMatch.charAt(0).toUpperCase() + refDistrictMatch.slice(1);
      } else {
        // 4. Check query string for district keywords
        const queryLower = query.toLowerCase();
        const queryDistrictMatch = istanbulDistricts.find(d => queryLower.includes(d));
        if (queryDistrictMatch) {
          district = queryDistrictMatch.charAt(0).toUpperCase() + queryDistrictMatch.slice(1);
        }
      }
    }
  }
  
  return {
    mode,
    score: Math.round(finalScore),
    district,
    confidence
  };
}

