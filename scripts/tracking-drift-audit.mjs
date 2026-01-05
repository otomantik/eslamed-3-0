#!/usr/bin/env node

/**
 * Tracking Drift Audit: Dictionary Compliance Check
 * Chief Tracking Architect - ESLAMED Evidence Tracking v1
 * 
 * Ensures all tracked events are defined in event-dictionary.ts.
 * Exits with code 1 if undefined events found.
 */

import fs from 'fs';
import { readdir } from 'fs/promises';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TRACK_REGEX = /tracker\.track\(['"](.+?)['"]/g;

let undefinedEvents = 0;

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
  console.log('🔍 Tracking Drift Audit: Checking event dictionary compliance...\n');
  
  // Resolve dictionary file path (relative to script location)
  const repoRoot = join(__dirname, '..');
  const dictPath = join(repoRoot, 'apps/web/lib/tracking/event-dictionary.ts');
  
  // Extract defined events from dictionary
  let definedEvents = [];
  try {
    const dictContent = fs.readFileSync(dictPath, 'utf-8');
    // Match event names in EventSchemaMap
    const matches = dictContent.matchAll(/'([a-z_]+)':/g);
    definedEvents = Array.from(matches).map(m => m[1]);
    console.log(`📋 Found ${definedEvents.length} defined events in dictionary.\n`);
  } catch (err) {
    console.error(`Error reading dictionary file: ${err.message}`);
    console.error(`  Path tried: ${dictPath}`);
    process.exit(1);
  }

  // Scan codebase for tracker.track calls
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

  const eventUsage = new Map();

  for (const file of allFiles) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      let match;
      
      while ((match = TRACK_REGEX.exec(content)) !== null) {
        const eventName = match[1];
        
        // Skip if event is defined
        if (definedEvents.includes(eventName)) {
          continue;
        }
        
        // Track undefined event
        if (!eventUsage.has(eventName)) {
          eventUsage.set(eventName, []);
        }
        eventUsage.get(eventName).push(relative(repoRoot, file));
        undefinedEvents++;
      }
    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.warn(`Warning: Could not read ${file}: ${err.message}`);
      }
    }
  }

  if (undefinedEvents > 0) {
    console.error('❌ [DRIFT] Undefined events found:\n');
    for (const [eventName, files] of eventUsage.entries()) {
      console.error(`   Event '${eventName}' used in:`);
      files.forEach(f => console.error(`     - ${f}`));
      console.error('');
    }
    console.error(`\n⚠️  [DRIFT] Found ${undefinedEvents} undefined event usage(s).\n`);
    console.error('Fix: Add event to apps/web/lib/tracking/event-dictionary.ts\n');
    process.exit(1);
  } else {
    console.log('✅ [DRIFT] All tracked events are defined in dictionary.\n');
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
