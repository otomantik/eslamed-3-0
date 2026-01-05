#!/usr/bin/env node

/**
 * Copy Consistency Checker: Zero-Drift Terminology Enforcement
 * 
 * Scans files for forbidden terminology variants.
 * Used by lint-staged (staged files) and pre-push (full repo).
 * 
 * Exit codes:
 * - 0: No violations found
 * - 1: Violations found (commit/push blocked)
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import forbidden variants (Windows-compatible file:// URL)
const forbiddenVariantsPath = join(__dirname, '..', 'apps', 'web', 'lib', 'integrity', 'forbidden-variants.mjs');
const forbiddenVariantsUrl = pathToFileURL(forbiddenVariantsPath).href;
const forbiddenVariantsModule = await import(forbiddenVariantsUrl);
const FORBIDDEN_VARIANTS = forbiddenVariantsModule.FORBIDDEN_VARIANTS;

// Default scan directories (if no file args provided)
const DEFAULT_SCAN_DIRS = [
  'apps/web/app',
  'apps/web/components',
  'apps/web/lib',
  'apps/web/scripts',
];

// File extensions to scan
const SCAN_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.md', '.json'];

// Files/dirs to ignore
const IGNORE_PATTERNS = [
  'node_modules',
  '.next',
  '.git',
  'dist',
  'build',
  'coverage',
  '.cache',
  'package-lock.json',
  'tsconfig.json',
  'next.config.ts',
  'next-env.d.ts',
];

// Definition files that contain forbidden variants (exclude from scanning)
const DEFINITION_FILES = [
  'forbidden-variants.mjs',
  'business-credentials.ts',
];

/**
 * Check if path should be ignored
 */
function shouldIgnore(path) {
  if (IGNORE_PATTERNS.some(pattern => path.includes(pattern))) {
    return true;
  }
  // Ignore definition files that contain the blocklist
  if (DEFINITION_FILES.some(defFile => path.includes(defFile))) {
    return true;
  }
  return false;
}

/**
 * Recursively get all files to scan
 */
function getAllFiles(dir, baseDir = dir) {
  const files = [];
  
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      const relPath = relative(baseDir, fullPath);
      
      if (shouldIgnore(relPath)) {
        continue;
      }
      
      if (entry.isDirectory()) {
        files.push(...getAllFiles(fullPath, baseDir));
      } else if (entry.isFile()) {
        const ext = entry.name.substring(entry.name.lastIndexOf('.'));
        if (SCAN_EXTENSIONS.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  } catch (err) {
    // Skip directories that can't be read
    if (err.code !== 'ENOENT' && err.code !== 'EACCES') {
      console.error(`Warning: Could not read ${dir}: ${err.message}`);
    }
  }
  
  return files;
}

/**
 * Check if text contains canonical form (to avoid false positives)
 */
function containsCanonicalForm(text) {
  const canonicalPatterns = [
    /tanı ve tedavi kararı hekimlere aittir[^;]*tıbbi tanı veya tedavi sunmaz/i,
    /üts kayıtlı/i, // When used correctly (case may vary in context)
  ];
  return canonicalPatterns.some(pattern => pattern.test(text));
}

/**
 * Scan a single file for forbidden variants
 */
function scanFile(filePath) {
  const violations = [];
  
  try {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    FORBIDDEN_VARIANTS.forEach(variant => {
      const lowerVariant = variant.toLowerCase();
      const lowerContent = content.toLowerCase();
      
      // Skip if variant is part of canonical form
      if (variant === 'tanı veya tedavi sunmaz' || variant === 'ÜTS kayıtlı') {
        // Check if it's part of canonical form
        if (containsCanonicalForm(content)) {
          // For "tanı veya tedavi sunmaz", only flag if NOT in full canonical context
          if (variant === 'tanı veya tedavi sunmaz') {
            const canonicalContext = /tanı ve tedavi kararı hekimlere aittir[^;]*tıbbi tanı veya tedavi sunmaz/i;
            if (canonicalContext.test(content)) {
              return; // Skip - it's in canonical form
            }
          }
          // For "ÜTS kayıtlı", check if it's actually "ÜTS Kayıtlı" (canonical)
          if (variant === 'ÜTS kayıtlı') {
            // Only flag if it's lowercase "üts kayıtlı" not "ÜTS Kayıtlı"
            const hasCanonical = /ÜTS\s+Kayıtlı/.test(content);
            if (hasCanonical && !/üts\s+kayıtlı(?!\s*[A-Z])/.test(content)) {
              return; // Skip - canonical form exists
            }
          }
        }
      }
      
      if (lowerContent.includes(lowerVariant)) {
        // Find line numbers
        lines.forEach((line, index) => {
          const lowerLine = line.toLowerCase();
          if (lowerLine.includes(lowerVariant)) {
            // Skip comments (single-line and multi-line)
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('//') || 
                trimmedLine.startsWith('*') || 
                trimmedLine.startsWith('/*') ||
                trimmedLine.includes('✅ REMOVED') ||
                trimmedLine.includes('hallucination') ||
                trimmedLine.includes('removed from')) {
              return; // Skip comment lines
            }
            
            // Additional check: skip if line contains canonical form
            if (!containsCanonicalForm(line)) {
              violations.push({
                file: filePath,
                line: index + 1,
                variant,
                snippet: line.trim().substring(0, 100),
              });
            }
          }
        });
      }
    });
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(`Error reading ${filePath}: ${err.message}`);
    }
  }
  
  return violations;
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);
  // Get repo root: scripts/ is in root, so parent is repo root
  const repoRoot = join(__dirname, '..');
  
  // Ensure we're working from repo root
  process.chdir(repoRoot);
  
  // Get files to scan
  let filesToScan = [];
  
  if (args.length > 0) {
    // Files provided by lint-staged
    filesToScan = args
      .map(file => join(repoRoot, file))
      .filter(file => {
        const ext = file.substring(file.lastIndexOf('.'));
        return SCAN_EXTENSIONS.includes(ext) && !shouldIgnore(file);
      });
  } else {
    // Full repo scan (pre-push)
    DEFAULT_SCAN_DIRS.forEach(dir => {
      const fullDir = join(repoRoot, dir);
      if (statSync(fullDir, { throwIfNoEntry: false })?.isDirectory()) {
        filesToScan.push(...getAllFiles(fullDir, repoRoot));
      }
    });
  }
  
  // Scan all files
  const allViolations = [];
  
  for (const file of filesToScan) {
    const violations = scanFile(file);
    allViolations.push(...violations);
  }
  
  // Report results
  if (allViolations.length > 0) {
    console.error('\n❌ TERMINOLOGY DRIFT DETECTED\n');
    console.error('Forbidden variants found. Use canonical terms only.\n');
    
    // Group by file
    const byFile = {};
    allViolations.forEach(v => {
      if (!byFile[v.file]) {
        byFile[v.file] = [];
      }
      byFile[v.file].push(v);
    });
    
    // Print violations
    Object.entries(byFile).forEach(([file, violations]) => {
      const relPath = relative(repoRoot, file);
      console.error(`\n📄 ${relPath}`);
      
      violations.forEach(v => {
        console.error(`  Line ${v.line}: Found "${v.variant}"`);
        console.error(`  → ${v.snippet}...`);
      });
    });
    
    console.error('\n📚 Canonical terms:');
    console.error('  - "ÜTS Kayıtlı" (not "ÜTS kayıtlı" or "Sağlık Bakanlığı ÜTS kayıtlı")');
    console.error('  - "ÇKYS Kayıtlı" (not "ÇKYS Onayı" or "ÇKYS Sistemi")');
    console.error('  - "Ruhsatlı İşletme" (not "Resmi İşletme" or "Lisanslı İşletme")');
    console.error('  - "CE mevzuatına uygun ürün tedariki" (not "CE belgeli" or "CE standartlarına uygun")');
    console.error('  - "Tanı ve tedavi kararı hekimlere aittir; bu hizmet tıbbi tanı veya tedavi sunmaz."');
    console.error('\n🔒 Commit blocked. Fix violations and try again.\n');
    
    process.exit(1);
  }
  
  // Success
  if (args.length > 0) {
    console.log(`✅ Copy consistency check passed (${filesToScan.length} staged files)`);
  } else {
    console.log(`✅ Full repo copy consistency check passed (${filesToScan.length} files scanned)`);
  }
  
  process.exit(0);
}

// Run
main();

