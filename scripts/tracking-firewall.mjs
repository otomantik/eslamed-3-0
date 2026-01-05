#!/usr/bin/env node

/**
 * Tracking Firewall: CI/CD Guard
 * Chief Tracking Architect - ESLAMED Evidence Tracking v1
 * 
 * Scans codebase for forbidden PII keys in tracking payloads.
 * Exits with code 1 if violations found.
 */

import fs from 'fs';
import { readdir, stat } from 'fs/promises';
import { join, relative } from 'path';

const FORBIDDEN_KEYS = ['phone', 'email', 'tc_no', 'address', 'full_address', 'credit_card', 'name', 'tc', 'identity'];
const TRACK_REGEX = /tracker\.track\(['"](.+?)['"],\s*({[\s\S]*?})\)/g;

let violations = 0;

/**
 * Recursively get all .ts/.tsx files
 */
async function getAllFiles(dir, baseDir = dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relPath = relative(baseDir, fullPath);
    
    // Skip ignored paths
    if (relPath.includes('node_modules') || 
        relPath.includes('docs') || 
        relPath.includes('.next') || 
        relPath.includes('dist') || 
        relPath.includes('build')) {
      continue;
    }
    
    if (entry.isDirectory()) {
      await getAllFiles(fullPath, baseDir, files);
    } else if (entry.isFile() && (relPath.endsWith('.ts') || relPath.endsWith('.tsx'))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

async function main() {
  console.log('🔍 Tracking Firewall: Scanning for PII violations...\n');
  
  const repoRoot = process.cwd();
  const scanDirs = [
    join(repoRoot, 'apps/web'),
  ];
  
  let allFiles = [];
  for (const dir of scanDirs) {
    try {
      const files = await getAllFiles(dir, repoRoot);
      allFiles.push(...files);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.warn(`Warning: Could not scan ${dir}: ${err.message}`);
      }
    }
  }

  for (const file of allFiles) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      let match;
      
      while ((match = TRACK_REGEX.exec(content)) !== null) {
        const [fullMatch, eventName, payload] = match;
        
        // Check for Forbidden Keys in Payload Code text
        FORBIDDEN_KEYS.forEach(key => {
          if (payload.includes(key)) {
            console.error(`❌ [FIREWALL] Forbidden key '${key}' found in ${file}`);
            console.error(`   Event: ${eventName}`);
            console.error(`   Context: ${payload.substring(0, 100)}...\n`);
            violations++;
          }
        });
      }
    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.warn(`Warning: Could not read ${file}: ${err.message}`);
      }
    }
  }

  if (violations > 0) {
    console.error(`\n⚠️  [FIREWALL] Build failed with ${violations} tracking violation(s).\n`);
    console.error('Allowed locations for these phrases:');
    console.error('  - Server-side only (API routes)');
    console.error('  - With explicit redaction\n');
    process.exit(1);
  } else {
    console.log('✅ [FIREWALL] Tracking compliance passed.\n');
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

