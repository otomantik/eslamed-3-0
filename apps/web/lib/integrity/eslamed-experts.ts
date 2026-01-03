/**
 * Predefined expert profiles for ESLAMED
 * Exported from a server-safe file (no 'use client')
 */

export interface ExpertProfile {
  name: string;
  title: string;
  licenseNumber: string;
  credentials: string[];
  organization: string;
}

export const ESLAMED_EXPERTS: Record<string, ExpertProfile> = {
  salih: {
    name: 'Salih Cevheroğlu',
    title: 'Responsible Manager (Mesul Müdür) & Medical Device Specialist',
    licenseNumber: 'TC: 10904197720',
    credentials: ['Mesul Müdür', 'Medikal Cihaz Uzmanı'],
    organization: 'ESLAMED Medikal',
  },
  muratcan: {
    name: 'Muratcan Teknik',
    title: 'Teknik Servis Uzmanı',
    licenseNumber: 'TS-TR-2019-045',
    credentials: ['Medikal Cihaz Teknisyeni', 'Kalibrasyon Uzmanı'],
    organization: 'ESLAMED Medikal',
  },
};

