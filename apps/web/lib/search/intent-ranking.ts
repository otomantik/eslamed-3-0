import type { SearchItem } from './search-config';
import type { IntentMode } from '@/lib/intent/detector';

export interface IntentWeights {
  urgent: number;
  research: number;
  vip: number;
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

