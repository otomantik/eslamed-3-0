export type SearchItem = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  synonyms?: string[];
  href?: string; // optional (if a full page exists)
  whatsappText: string;
  kind?: 'guide' | 'equipment' | 'vip';
  filters?: Array<'kurulum' | 'kiralik' | 'vip'>;
  isUrgent?: boolean;
};

export type SearchConfig = {
  vip: {
    itemId: string;
    triggers: string[];
  };
  maxResults: number;
  fuse: {
    threshold: number;
    minMatchCharLength: number;
  };
};

export const searchConfig: SearchConfig = {
  vip: {
    itemId: 'kisiye-ozel-tabanlik',
    triggers: [
      'ortopedi',
      'ortopedik',
      'tabanlik',
      'tabanlık',
      'insol',
      'insole',
      'ayak',
      'topuk',
      'düz taban',
      'duz taban',
      'pronasyon',
      'supinasyon',
      'basma',
    ],
  },
  maxResults: 20,
  fuse: {
    threshold: 0.4,
    minMatchCharLength: 2,
  },
};

export function normalizeQuery(input: string): string {
  const s = (input || '').trim().toLowerCase();
  return s
    .replaceAll('ı', 'i')
    .replaceAll('İ', 'i')
    .replaceAll('ğ', 'g')
    .replaceAll('ş', 's')
    .replaceAll('ö', 'o')
    .replaceAll('ü', 'u')
    .replaceAll('ç', 'c')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isOrthopedicIntent(q: string): boolean {
  const nq = normalizeQuery(q);
  if (!nq) return false;
  return searchConfig.vip.triggers.some((t) => nq.includes(normalizeQuery(t)));
}


