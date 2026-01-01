import type { SearchItem } from './search-config';
import type { IntentMode } from '@/lib/intent/detector';

export interface IntentWeights {
  urgent: number;
  research: number;
  vip: number;
}

export interface FuzzySearchResult {
  item: SearchItem;
  score: number; // Combined score: (1 - fuseScore) * intentWeight
  rank: number; // Final position after sorting
}

/**
 * Get intent weight for a specific mode
 */
export function getIntentWeight(item: SearchItem, mode: IntentMode): number {
  if (!item.intent_weights) {
    // Fallback: use isUrgent flag or kind
    if (mode === 'CRITICAL_EMERGENCY' && item.isUrgent) return 0.8;
    if (mode === 'TRUST_SEEKER' && item.kind === 'vip') return 0.9;
    if (mode === 'INFORMATION_SEEKER' && item.kind === 'guide') return 0.9;
    return 0.5; // Default weight
  }

  const weights = item.intent_weights;
  switch (mode) {
    case 'CRITICAL_EMERGENCY':
      return weights.urgent;
    case 'INFORMATION_SEEKER':
      return weights.research;
    case 'TRUST_SEEKER':
      return weights.vip;
    default:
      return (weights.urgent + weights.research + weights.vip) / 3; // Average
  }
}

/**
 * Sort items by intent weight (descending)
 */
export function sortByIntentWeight(items: SearchItem[], mode: IntentMode): SearchItem[] {
  return [...items].sort((a, b) => {
    const weightA = getIntentWeight(a, mode);
    const weightB = getIntentWeight(b, mode);
    return weightB - weightA; // Descending
  });
}

/**
 * Filter items by category and mode
 */
export function filterByCategoryAndMode(
  items: SearchItem[],
  category?: string,
  mode?: IntentMode
): SearchItem[] {
  let filtered = items;

  // Filter by category
  if (category && category !== 'all') {
    filtered = filtered.filter((item) => {
      const itemCategory = item.category?.toLowerCase().replace(/\s+/g, '-');
      return itemCategory === category || item.category?.toLowerCase() === category;
    });
  }

  // Sort by intent weight if mode is provided
  if (mode) {
    filtered = sortByIntentWeight(filtered, mode);
  }

  return filtered;
}

/**
 * Fuzzy search with intent-aware ranking
 * Combines Fuse.js score with intent_weight for final ordering
 * Note: This function must be called from a client component (Fuse.js is client-only)
 */
export async function fuzzySearchWithIntent(
  items: SearchItem[],
  query: string,
  mode: IntentMode
): Promise<FuzzySearchResult[]> {
  if (!query || query.trim().length === 0) {
    // No query: just sort by intent weight
    return items.map((item, index) => ({
      item,
      score: getIntentWeight(item, mode),
      rank: index + 1,
    }));
  }

  // Dynamic import Fuse.js (client-only)
  const Fuse = (await import('fuse.js')).default;

  // Initialize Fuse.js
  const fuse = new Fuse(items, {
    keys: ['title', 'category', 'tags', 'synonyms'],
    threshold: 0.3,
    minMatchCharLength: 2,
    includeScore: true,
    ignoreLocation: true,
  });

  // Perform fuzzy search
  const fuseResults = fuse.search(query);

  // Combine Fuse score with intent weight
  const combinedResults: FuzzySearchResult[] = fuseResults.map((result, index) => {
    const item = result.item;
    const fuseScore = result.score || 1; // Lower is better in Fuse.js (0 = perfect match)
    const intentWeight = getIntentWeight(item, mode);

    // Final score: (1 - fuseScore) * intentWeight
    // Higher score = better match
    const combinedScore = (1 - fuseScore) * intentWeight;

    return {
      item,
      score: combinedScore,
      rank: index + 1, // Will be updated after sorting
    };
  });

  // Sort by combined score (descending)
  combinedResults.sort((a, b) => b.score - a.score);

  // Update ranks after sorting
  combinedResults.forEach((result, index) => {
    result.rank = index + 1;
  });

  return combinedResults;
}

