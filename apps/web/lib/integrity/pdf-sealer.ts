/**
 * PDF Sealer: Build-time metadata sealing with REALITY_ANCHORS
 * ADSMantık Integrity Feature - Ensures all PDF documents contain verified business credentials
 * 
 * This utility seals PDF metadata with official business information from REALITY_ANCHORS
 * to prevent metadata drift and ensure document integrity.
 */

import { REALITY_ANCHORS } from './reality-anchors';

export interface PDFMetadata {
  title: string;
  author: string;
  creator: string;
  producer: string;
  subject?: string;
  keywords?: string[];
  creationDate?: Date;
  modificationDate?: Date;
}

/**
 * Seals PDF metadata with REALITY_ANCHORS data
 * Ensures all PDF documents contain verified business credentials
 * 
 * @param title - Document title
 * @param subject - Optional document subject
 * @param keywords - Optional additional keywords
 * @returns PDF metadata object with sealed REALITY_ANCHORS data
 */
export function sealPDFMetadata(
  title: string,
  subject?: string,
  keywords?: string[]
): PDFMetadata {
  const now = new Date();
  
  return {
    title,
    author: REALITY_ANCHORS.managerName,
    creator: REALITY_ANCHORS.officialBusinessName,
    producer: `${REALITY_ANCHORS.officialBusinessName} - ÜTS: ${REALITY_ANCHORS.utsFirmNumber}`,
    subject: subject || 'Medical Equipment Documentation',
    keywords: [
      REALITY_ANCHORS.utsFirmNumber,
      REALITY_ANCHORS.ckysRegistrationNumber,
      'ESLAMED',
      'Medikal Cihaz',
      ...(keywords || []),
    ],
    creationDate: now,
    modificationDate: now,
  };
}

/**
 * Formats PDF metadata for use with PDF generation libraries
 * (jsPDF, PDFKit, etc.)
 */
export function formatPDFMetadataForLibrary(metadata: PDFMetadata): Record<string, string> {
  return {
    title: metadata.title,
    author: metadata.author,
    creator: metadata.creator,
    producer: metadata.producer,
    subject: metadata.subject || '',
    keywords: metadata.keywords?.join(', ') || '',
  };
}

