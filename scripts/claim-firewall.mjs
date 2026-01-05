#!/usr/bin/env node

/**
 * Claim Firewall: Prevents risky guarantee language from entering the codebase
 * Chief Truth Architect + Global MedTech Standards Copy Auditor
 * 
 * Scans repository for forbidden phrases that imply operational guarantees.
 * Uses rule-based matching with allow patterns to reduce false positives.
 * Exits with code 1 if violations are found.
 */

import { readdir, readFile } from 'fs/promises';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// Turkish-safe normalization: İ -> i, ı -> i (for case-insensitive matching)
function turkishNormalize(text) {
  return text
    .replace(/İ/g, 'i')
    .replace(/ı/g, 'i')
    .toLowerCase();
}

// Normalize text: Turkish-safe lowercasing, collapse whitespace, strip punctuation
function normalizeText(text) {
  return turkishNormalize(text)
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/[.,;:!?()[\]{}'"`]/g, '') // Strip surrounding punctuation
    .trim();
}

// Rules: phrase -> allow patterns (if line/context contains any of these, allow)
const RULES = {
  '7/24': {
    allowPatterns: [
      'mesaj kabul',
      'mesaj bırak',
      'mesaj alımı',
      'triage',
      'yanıt süresi',
      'iş günü',
      'acil durumlar önceliklidir',
      'müdahale aciliyet',
      'yoğunluğa göre',
    ],
    contextLines: 1, // Check same line + 1 next line
    recommendation: 'Replace with: "7/24 mesaj kabul ediyoruz; acil durumlar önceliklidir"',
  },
  '24/7': {
    allowPatterns: [
      'mesaj kabul',
      'mesaj bırak',
      'mesaj alımı',
      'triage',
      'yanıt süresi',
      'iş günü',
      'acil durumlar önceliklidir',
      'müdahale aciliyet',
      'yoğunluğa göre',
    ],
    contextLines: 1,
    recommendation: 'Replace with: "24/7 mesaj alımı ve acil triage"',
  },
  'aynı gün': {
    allowPatterns: [
      'mümkünse',
      'genellikle',
      'çoğunlukla',
      'duruma göre',
      'değişebilir',
      'stok',
      'trafik',
      'ilçe',
      'yoğunluk',
      'planlı',
      'randevu',
      'öncelikli',
      'hedeflenir',
      'mümkündür',
    ],
    contextLines: 2, // Check same line + 2 next lines
    recommendation: 'Add conditional wording: "genellikle aynı gün (yoğunluğa göre)" or "aynı gün (mümkünse)"',
  },
  garanti: {
    allowPatterns: [
      'değişir',
      'cihaz tipine göre',
      'işlem türüne göre',
      'üretici garantisi',
      'kapsam',
      'şart',
      'süre',
      'koşul',
      'var mı',
      'süresi',
    ],
    contextLines: 2,
    recommendation: 'Add qualifier: "Garanti (cihaz tipine göre değişir)" or "Garanti süresi cihaz tipine göre değişir"',
  },
  mutlaka: {
    allowPatterns: [
      'hekimin',
      'doktor',
      '112',
      'acil',
      'tıbbi',
      'hekim',
      'tıbbi karar',
      'tedavi kararı',
    ],
    contextLines: 0, // Same line only (medical disclaimers are typically in same sentence)
    recommendation: 'Keep if in medical disclaimer, otherwise remove or reword',
  },
  // Always fail (no exceptions)
  '%100': {
    allowPatterns: [],
    contextLines: 0,
    recommendation: 'Replace with: "Doğrulanabilir süreç" or remove percentage',
  },
  kesin: {
    // Allow if: imperative verb context (like "kesin ve kapatın") or technical term
    allowPatterns: [
      'elektrik kesintisi',
      'bağlantısını kesin',
      'kesin ve',
      'kesintisi',
      'kesinti',
    ],
    contextLines: 0,
    recommendation: 'If guarantee meaning: Replace with "hedeflenir" / "planlanır" / "mümkünse". If technical term (elektrik kesintisi) or imperative (kesin ve kapatın), this is acceptable.',
  },
  anında: {
    // Allow if: panic context, real-time technical term, or imperative usage
    allowPatterns: [
      'panik anında',
      'gerçek zamanlı',
      'zamanlı olarak',
      'anında uygulanabilir',
      'anında inceleme', // QR code context (technical feature)
      'hareket alanında', // "alanında" contains "anında" but means "within the area" - check separately
    ],
    contextLines: 1,
    recommendation: 'If guarantee meaning: Replace with "aciliyet seviyesine göre planlanır" or "yanıt süresi yoğunluğa göre". If describing panic context or real-time technical feature, review for appropriateness.',
  },
};

// Paths to ignore (relative to repo root)
const IGNORE_PATHS = [
  'apps/web/lib/integrity/operational-anchors.ts',
  'docs',
  'apps/web/data/testimonials.ts',
  'node_modules',
  '.next',
  '.git',
  'dist',
  'build',
];

// File extensions to scan
const SCAN_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.md', '.json'];

// Technical terms that contain "kesin" but are not guarantees
const TECHNICAL_TERMS = [
  'elektrik kesintisi',
  'kesintisi',
];

/**
 * Check if a file path should be ignored
 */
function shouldIgnore(filePath) {
  // Normalize path separators for cross-platform compatibility
  const relativePath = relative(repoRoot, filePath).replace(/\\/g, '/');
  
  for (const ignorePath of IGNORE_PATHS) {
    const normalizedIgnorePath = ignorePath.replace(/\\/g, '/');
    // Exact file match
    if (relativePath === normalizedIgnorePath) {
      return true;
    }
    // Directory match (path starts with directory + /)
    if (relativePath.startsWith(normalizedIgnorePath + '/')) {
      return true;
    }
  }
  
  return false;
}

/**
 * Check if file should be scanned based on extension
 */
function shouldScan(filePath) {
  return SCAN_EXTENSIONS.some(ext => filePath.endsWith(ext));
}

/**
 * Check if text contains any of the allow patterns (normalized)
 */
function containsAllowPattern(text, allowPatterns) {
  const normalized = normalizeText(text);
  return allowPatterns.some(pattern => normalized.includes(normalizeText(pattern)));
}

/**
 * Check if "kesin" is part of a technical term
 */
function isTechnicalTerm(text, matchIndex) {
  const context = text.substring(Math.max(0, matchIndex - 20), Math.min(text.length, matchIndex + 20));
  return TECHNICAL_TERMS.some(term => normalizeText(context).includes(normalizeText(term)));
}

/**
 * Check if line is inside user-generated content (testimonials/reviews)
 */
function isUserGeneratedContent(line, lineNum, allLines) {
  const lineLower = turkishNormalize(line);
  
  // Check if we're inside a reviewBody, reviewBody, or similar field
  // Look backwards for reviewBody, reviewBody, testimonials, etc.
  const contextLines = allLines.slice(Math.max(0, lineNum - 5), lineNum + 1).join(' ');
  const contextLower = turkishNormalize(contextLines);
  
  // Patterns that indicate user-generated content
  const userContentPatterns = [
    'reviewbody',
    'review body',
    'testimonial',
    'user review',
    'customer review',
    'author',
    'datepublished',
    'ratingvalue',
  ];
  
  return userContentPatterns.some(pattern => contextLower.includes(pattern)) &&
         (lineLower.includes("'") || lineLower.includes('"'));
}

/**
 * Find violations in content with rule-based matching
 */
function findViolations(content, filePath) {
  const violations = [];
  const lines = content.split('\n');
  
  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    const line = lines[lineNum];
    const lineLower = turkishNormalize(line);
    
    // Skip user-generated content (testimonials/reviews)
    if (isUserGeneratedContent(line, lineNum, lines)) {
      continue;
    }
    
    // Check each rule
    for (const [phrase, rule] of Object.entries(RULES)) {
      const phraseLower = turkishNormalize(phrase);
      
      // Find all occurrences of phrase in line
      let searchIndex = 0;
      while ((searchIndex = lineLower.indexOf(phraseLower, searchIndex)) !== -1) {
        // Special handling for "anında" - check if it's part of "alanında" (within area) or "zamanlı" (real-time)
        if (phrase === 'anında') {
          const before = lineLower.substring(Math.max(0, searchIndex - 5), searchIndex);
          const after = lineLower.substring(searchIndex + phraseLower.length, searchIndex + phraseLower.length + 3);
          // "alanında" = "within the area" (not "instantly")
          if (before.includes('al') && after === 'da') {
            searchIndex += phraseLower.length;
            continue; // Skip - it's part of "alanında"
          }
          // "zamanlı" = real-time (already in allowPatterns, but double-check)
          if (after.includes('lı') || before.includes('zaman')) {
            // Will be caught by allowPatterns check below
          }
        }
        
        // Special handling for "kesin" - check if it's part of a technical term
        if (phrase === 'kesin' && isTechnicalTerm(line, searchIndex)) {
          searchIndex += phraseLower.length;
          continue; // Skip - it's a technical term
        }
        
        // Build context (current line + following contextLines)
        const contextLines = [line];
        for (let i = 1; i <= rule.contextLines && lineNum + i < lines.length; i++) {
          contextLines.push(lines[lineNum + i]);
        }
        const context = contextLines.join(' ');
        
        // Check if context contains any allow pattern
        if (rule.allowPatterns.length > 0 && containsAllowPattern(context, rule.allowPatterns)) {
          // Allowed - skip this occurrence
          searchIndex += phraseLower.length;
          continue;
        }
        
        // Violation found - extract snippet
        const matchIndex = lineLower.indexOf(phraseLower, searchIndex);
        const start = Math.max(0, matchIndex - 40);
        const end = Math.min(line.length, matchIndex + phraseLower.length + 40);
        const snippet = line.substring(start, end).trim();
        
        violations.push({
          file: relative(repoRoot, filePath),
          line: lineNum + 1,
          phrase,
          snippet: snippet.length > 120 ? snippet.substring(0, 120) + '...' : snippet,
          fullLine: line.trim(),
          rule: phrase,
          recommendation: rule.recommendation,
        });
        
        // Move past this occurrence
        searchIndex += phraseLower.length;
      }
    }
  }
  
  return violations;
}

/**
 * Recursively scan directory
 */
async function scanDirectory(dirPath, allViolations = [], fileCount = { count: 0 }) {
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dirPath, entry.name);
      
      // Skip ignored paths
      if (shouldIgnore(fullPath)) {
        continue;
      }
      
      if (entry.isDirectory()) {
        await scanDirectory(fullPath, allViolations, fileCount);
      } else if (entry.isFile() && shouldScan(fullPath)) {
        fileCount.count++;
        try {
          const content = await readFile(fullPath, 'utf-8');
          const violations = findViolations(content, fullPath);
          allViolations.push(...violations);
        } catch (error) {
          // Skip files that can't be read (binary, permissions, etc.)
          if (error.code !== 'EISDIR' && error.code !== 'EACCES') {
            console.warn(`Warning: Could not read ${relative(repoRoot, fullPath)}: ${error.message}`);
          }
        }
      }
    }
    
    return { violations: allViolations, fileCount: fileCount.count };
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'EACCES') {
      // Directory doesn't exist or no permission - skip
      return { violations: allViolations, fileCount: fileCount.count };
    }
    throw error;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🔍 Claim Firewall: Scanning repository for forbidden phrases...\n');
  
  const scanPaths = [
    join(repoRoot, 'apps/web/app'),
    join(repoRoot, 'apps/web/components'),
    join(repoRoot, 'apps/web/lib'),
  ];
  
  const allViolations = [];
  let totalFilesScanned = 0;
  
  for (const scanPath of scanPaths) {
    try {
      const result = await scanDirectory(scanPath, allViolations, { count: 0 });
      totalFilesScanned += result.fileCount;
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`Error scanning ${scanPath}: ${error.message}`);
        process.exit(1);
      }
    }
  }
  
  if (allViolations.length > 0) {
    console.error('❌ CLAIM FIREWALL VIOLATION DETECTED\n');
    console.error('Forbidden phrases found in repository:\n');
    
    // Group violations by file
    const violationsByFile = {};
    for (const violation of allViolations) {
      if (!violationsByFile[violation.file]) {
        violationsByFile[violation.file] = [];
      }
      violationsByFile[violation.file].push(violation);
    }
    
    // Print violations grouped by file
    for (const [file, violations] of Object.entries(violationsByFile)) {
      console.error(`📄 ${file}:`);
      for (const violation of violations) {
        console.error(`   Line ${violation.line}: "${violation.phrase}"`);
        console.error(`   Snippet: ${violation.snippet}`);
        console.error(`   Rule: ${violation.rule}`);
        console.error(`   Fix: ${violation.recommendation}`);
        console.error('');
      }
    }
    
    // Breakdown by phrase
    const breakdownByPhrase = {};
    for (const violation of allViolations) {
      if (!breakdownByPhrase[violation.phrase]) {
        breakdownByPhrase[violation.phrase] = 0;
      }
      breakdownByPhrase[violation.phrase]++;
    }
    
    console.error(`\n⚠️  Summary:`);
    console.error(`   Total files scanned: ${totalFilesScanned}`);
    console.error(`   Total violations: ${allViolations.length}`);
    console.error(`   Breakdown by phrase:`);
    for (const [phrase, count] of Object.entries(breakdownByPhrase).sort((a, b) => b[1] - a[1])) {
      console.error(`     - "${phrase}": ${count} violation(s)`);
    }
    
    console.error('\nAllowed locations for these phrases:');
    console.error('  - apps/web/lib/integrity/operational-anchors.ts (source of truth)');
    console.error('  - docs/** (documentation)');
    console.error('  - apps/web/data/testimonials.ts (user-generated content)');
    console.error('\nSee docs/TRUTH_COPY_STANDARD.md for approved alternatives.\n');
    
    process.exit(1);
  }
  
  console.log('✅ Claim Firewall: No violations detected.');
  console.log(`   Files scanned: ${totalFilesScanned}`);
  console.log(`   Directories scanned: ${scanPaths.length}`);
  console.log('   All operational claims must reference operational-anchors.ts or use conditional language.\n');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
