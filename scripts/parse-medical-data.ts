#!/usr/bin/env node

/**
 * Smart Data Parser: Transform RAW CSV/Excel into search-index.json
 * 
 * Usage:
 *   ts-node scripts/parse-medical-data.ts input.csv output.json
 * 
 * CSV Format (expected columns):
 *   Brand, Model, Category, Description, Price, Tags, Filters
 */

import * as fs from 'fs';
import * as path from 'path';

interface RawProduct {
  Brand: string;
  Model: string;
  Category: string;
  Description: string;
  Price?: string;
  Tags?: string; // Comma-separated
  Filters?: string; // Comma-separated: kurulum, kiralik, vip
}

interface IntentWeights {
  urgent: number;
  research: number;
  vip: number;
}

interface SearchItem {
  id: string;
  kind: 'guide' | 'equipment' | 'vip';
  title: string;
  category: string;
  tags: string[];
  synonyms?: string[];
  href?: string;
  whatsappText: string;
  filters?: Array<'kurulum' | 'kiralik' | 'vip'>;
  isUrgent?: boolean;
  intent_weights?: IntentWeights;
  meta_title?: string;
  slug?: string;
}

interface SearchIndexV2 {
  meta: {
    version: number;
    totalProducts: number;
  };
  categories: Array<{
    id: string;
    label: string;
    kind: 'guide' | 'equipment' | 'vip';
    items: SearchItem[];
  }>;
}

/**
 * Calculate intent weights based on category
 */
function calculateIntentWeights(category: string): IntentWeights {
  const catLower = category.toLowerCase();

  // Oxygen/Respiratory -> High urgent weight
  if (catLower.includes('oksijen') || catLower.includes('solunum') || catLower.includes('respiratory')) {
    return { urgent: 0.9, research: 0.4, vip: 0.1 };
  }

  // VIP Insole/Orthopedic -> High VIP weight
  if (catLower.includes('tabanlık') || catLower.includes('tabanlik') || catLower.includes('ortopedi') || catLower.includes('insole')) {
    return { urgent: 0.1, research: 0.6, vip: 1.0 };
  }

  // Measurement devices -> Research weight
  if (catLower.includes('ölçüm') || catLower.includes('tansiyon') || catLower.includes('glukoz')) {
    return { urgent: 0.3, research: 0.8, vip: 0.2 };
  }

  // Hospital beds/Mobility -> Balanced
  if (catLower.includes('yatak') || catLower.includes('mobilite') || catLower.includes('tekerlekli')) {
    return { urgent: 0.5, research: 0.5, vip: 0.3 };
  }

  // Default: Balanced weights
  return { urgent: 0.4, research: 0.5, vip: 0.3 };
}

/**
 * Generate slug from Brand + Model + Category
 */
function generateSlug(brand: string, model: string, category: string): string {
  const parts = [brand, model, category]
    .filter(Boolean)
    .map((s) => s.toLowerCase().trim())
    .map((s) => s.replace(/[^a-z0-9]+/g, '-'))
    .map((s) => s.replace(/^-+|-+$/g, ''))
    .filter(Boolean);

  return parts.join('-');
}

/**
 * Generate meta title: "Brand Model Category | ESLAMED"
 */
function generateMetaTitle(brand: string, model: string, category: string): string {
  const parts = [brand, model, category].filter(Boolean);
  return `${parts.join(' ')} | ESLAMED`;
}

/**
 * Parse CSV (simple implementation - for production use a proper CSV parser)
 */
function parseCSV(filePath: string): RawProduct[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter((line) => line.trim());
  const headers = lines[0]!.split(',').map((h) => h.trim());

  const products: RawProduct[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i]!.split(',').map((v) => v.trim());
    const product: Partial<RawProduct> = {};

    headers.forEach((header, idx) => {
      (product as any)[header] = values[idx] || '';
    });

    products.push(product as RawProduct);
  }

  return products;
}

/**
 * Transform raw products to SearchItem[]
 */
function transformProducts(raw: RawProduct[]): SearchItem[] {
  return raw.map((product) => {
    const slug = generateSlug(product.Brand, product.Model, product.Category);
    const intentWeights = calculateIntentWeights(product.Category);
    const tags = product.Tags?.split(',').map((t) => t.trim()).filter(Boolean) || [];
    const filters = product.Filters?.split(',').map((f) => f.trim()) as Array<'kurulum' | 'kiralik' | 'vip'> || [];

    const isUrgent = intentWeights.urgent >= 0.7;
    const isVip = intentWeights.vip >= 0.8;

    return {
      id: slug,
      kind: isVip ? 'vip' : 'equipment',
      title: `${product.Brand} ${product.Model}`.trim(),
      category: product.Category,
      tags,
      synonyms: [], // Can be enhanced with synonym generation
      href: `/ekipmanlar/${slug}`, // Optional: only if dedicated page exists
      whatsappText: `Merhaba, ${product.Brand} ${product.Model} hakkında kurulum ve fiyat bilgisi almak istiyorum.`,
      filters: filters.length > 0 ? filters : undefined,
      isUrgent,
      intent_weights: intentWeights,
      meta_title: generateMetaTitle(product.Brand, product.Model, product.Category),
      slug,
    };
  });
}

/**
 * Group items by category
 */
function groupByCategory(items: SearchItem[]): SearchIndexV2['categories'] {
  const map = new Map<string, SearchItem[]>();

  for (const item of items) {
    const key = item.category || 'Diğer';
    map.set(key, [...(map.get(key) || []), item]);
  }

  return Array.from(map.entries()).map(([label, categoryItems]) => {
    const kind = categoryItems.some((i) => i.kind === 'vip') ? 'vip' : 'equipment';
    return {
      id: label.toLowerCase().replace(/\s+/g, '-'),
      label,
      kind,
      items: categoryItems,
    };
  });
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: ts-node scripts/parse-medical-data.ts <input.csv> <output.json>');
    process.exit(1);
  }

  const [inputPath, outputPath] = args;
  const absoluteInput = path.resolve(inputPath);
  const absoluteOutput = path.resolve(outputPath);

  console.log(`📖 Reading: ${absoluteInput}`);

  const rawProducts = parseCSV(absoluteInput);
  console.log(`✅ Parsed ${rawProducts.length} products`);

  const searchItems = transformProducts(rawProducts);
  console.log(`✅ Transformed to ${searchItems.length} search items`);

  const categories = groupByCategory(searchItems);
  console.log(`✅ Grouped into ${categories.length} categories`);

  const output: SearchIndexV2 = {
    meta: {
      version: 2,
      totalProducts: searchItems.length,
    },
    categories,
  };

  fs.writeFileSync(absoluteOutput, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`✅ Written to: ${absoluteOutput}`);
  console.log(`📊 Total products: ${output.meta.totalProducts}`);
}

if (require.main === module) {
  main();
}

export { calculateIntentWeights, generateSlug, generateMetaTitle };

