/**
 * Reality Anchors: Absolute, unchangeable truth source
 * ADSMantık Robotu - Single Source of Truth
 * 
 * These values are NEVER modified without explicit authorization.
 * All components MUST read from this file, never hardcode these values.
 */
export interface RealityAnchors {
  officialBusinessName: string;
  managerName: string;
  managerTitle: string;
  managerID: string;
  utsFirmNumber: string;
  ckysRegistrationNumber: string;
  taxID: string;
  businessLicense: {
    number: string;
    issuedDate: string;
  };
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  lastVerifiedDate: string;
  expertReviewDate: string;
}

export const REALITY_ANCHORS: RealityAnchors = {
  officialBusinessName: 'ESLAMED MEDİKAL - SALİH CEVHEROĞLU',
  managerName: 'Salih Cevheroğlu',
  managerTitle: 'Responsible Manager (Mesul Müdür) & Medical Device Specialist',
  managerID: 'TC: 10904197720',
  utsFirmNumber: '26672691179647',
  ckysRegistrationNumber: '5120489',
  taxID: '2070554381',
  businessLicense: {
    number: '84',
    issuedDate: '17-03-2025',
  },
  address: {
    street: 'Alemdağ Mah. Atabey Cad. No:19/E1A',
    city: 'Çekmeköy',
    region: 'İstanbul',
    postalCode: '34797',
    country: 'TR',
  },
  lastVerifiedDate: '2026-01-03',
  expertReviewDate: '2026-01-03',
} as const;

// Formatted address string for UI
export const FORMATTED_ADDRESS = `${REALITY_ANCHORS.address.street}, ${REALITY_ANCHORS.address.city}, ${REALITY_ANCHORS.address.region} ${REALITY_ANCHORS.address.postalCode} ${REALITY_ANCHORS.address.country}`;


