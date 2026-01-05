import { REALITY_ANCHORS } from './reality-anchors';

/**
 * Operational Anchors: Single Source of Truth for Operational Claims
 * Chief Truth Architect + Global MedTech Standards Copy Auditor
 * 
 * These values are NEVER modified without explicit authorization.
 * All UI components MUST read from this file, never hardcode operational claims.
 * 
 * Philosophy: Authority through verification, process, and professional duty — not guarantees.
 */

export interface OperationalAnchors {
  communicationModel: {
    whatsapp: {
      acceptsMessages: "24/7";
      monitored: true;
      note: "7/24 mesaj kabul ediyoruz; acil durumlar önceliklidir";
      responseTime: "Yanıt süresi aciliyet seviyesine göre planlanır";
    };
    phone: {
      hours: "Pazartesi - Cuma: 09:00 - 18:00, Cumartesi: 09:00 - 13:00 (İstanbul saati)";
      afterHours: "Mesaj kabul ediliyor; yanıt süresi yoğunluğa göre";
      note: "Operasyon saatleri dışında WhatsApp üzerinden mesaj bırakabilirsiniz";
    };
  };
  responsePrinciples: {
    triage: "Kritik ekipman arızası triage sistemi ile değerlendirilir";
    dispatch: "Müdahale aciliyet seviyesine ve operasyon yoğunluğuna göre planlanır";
    escalation: "Tıbbi acil durumlarda 112 ve hastane yönlendirmesi önceliklidir";
    note: "Müdahale süresi yoğunluğa, trafik durumuna ve stok durumuna göre değişebilir";
  };
  serviceBoundaries: {
    diagnosis: false;
    prescription: false;
    treatment: false;
    medicalAdvice: false;
    note: "Tanı ve tedavi kararı hekimlere aittir; bu hizmet tıbbi tanı veya tedavi sunmaz";
  };
  qualityStandards: {
    traceability: string[];
    hygiene: string[];
    documentation: string[];
    dataProtection: string[];
  };
  languagePolicy: {
    noGuarantees: true;
    allowedGuaranteeType: "process guarantee only";
    badges: {
      fastInstallation: string;
      quickResponse: string;
      verifiedProcess: string;
      traceableEquipment: string;
      compliantService: string;
    };
    availabilityStatements: {
      whatsapp24h: string;
      phoneHours: string;
      messageOnly: string;
      emergencyTriage: string;
    };
    responseTimeStatements: {
      sameDayConditional: string;
      nextDayConditional: string;
      urgentPriority: string;
      standardTimeline: string;
    };
  };
  operationalCapacity: {
    mobileTeams: {
      count: number;
      verifiedDate: string;
      note: string;
    };
    coverageArea: string;
    serviceRadius: string;
  };
  pricing: {
    startingPrice: string;
    currency: string;
    note: string;
    disclaimer: string;
  };
}

export const OPERATIONAL_ANCHORS: OperationalAnchors = {
  communicationModel: {
    whatsapp: {
      acceptsMessages: "24/7",
      monitored: true,
      note: "7/24 mesaj kabul ediyoruz; acil durumlar önceliklidir",
      responseTime: "Yanıt süresi aciliyet seviyesine göre planlanır",
    },
    phone: {
      hours: "Pazartesi - Cuma: 09:00 - 18:00, Cumartesi: 09:00 - 13:00 (İstanbul saati)",
      afterHours: "Mesaj kabul ediliyor; yanıt süresi yoğunluğa göre",
      note: "Operasyon saatleri dışında WhatsApp üzerinden mesaj bırakabilirsiniz",
    },
  },
  responsePrinciples: {
    triage: "Kritik ekipman arızası triage sistemi ile değerlendirilir",
    dispatch: "Müdahale aciliyet seviyesine ve operasyon yoğunluğuna göre planlanır",
    escalation: "Tıbbi acil durumlarda 112 ve hastane yönlendirmesi önceliklidir",
    note: "Müdahale süresi yoğunluğa, trafik durumuna ve stok durumuna göre değişebilir",
  },
  serviceBoundaries: {
    diagnosis: false,
    prescription: false,
    treatment: false,
    medicalAdvice: false,
    note: "Tanı ve tedavi kararı hekimlere aittir; bu hizmet tıbbi tanı veya tedavi sunmaz",
  },
  qualityStandards: {
    traceability: [
      "ÜTS kayıt numarası ile doğrulanabilir",
      "Seri/lot kaydı ile izlenebilir (uygulanabilir durumlarda)",
      `ÇKYS kayıt numarası: ${REALITY_ANCHORS.ckysRegistrationNumber}`
    ],
    hygiene: [
      "Paketleme bütünlük kontrolü",
      "Teslim öncesi temel temizlik kontrolü",
      "Teslim formu (handover checklist)"
    ],
    documentation: [
      "Hizmet formu (service form)",
      "Kalibrasyon kaydı (uygulanabilir durumlarda)",
      "İşlem kaydı (transaction log)"
    ],
    dataProtection: [
      "KVKK kapsamında korunmakta",
      "Veri minimizasyonu prensibi",
      "EHDS uyumlu veri aktarımı"
    ],
  },
  languagePolicy: {
    noGuarantees: true,
    allowedGuaranteeType: "process guarantee only",
    badges: {
      fastInstallation: "Hızlı Kurulum (Mümkünse)",
      quickResponse: "Hızlı Müdahale (Acil Durumlar İçin)",
      verifiedProcess: "Doğrulanabilir Süreç",
      traceableEquipment: "ÜTS Kayıtlı Cihaz",
      compliantService: "CE Mevzuatına Uygun",
    },
    availabilityStatements: {
      whatsapp24h: "7/24 mesaj kabul ediyoruz; acil durumlar önceliklidir",
      phoneHours: "Telefon hattımızdan operasyon saatleri içinde ulaşabilirsiniz",
      messageOnly: "7/24 mesaj bırakabilirsiniz; yanıt süresi yoğunluğa göre",
      emergencyTriage: "24/7 mesaj alımı ve acil triage",
    },
    responseTimeStatements: {
      sameDayConditional: "Aynı gün müdahale hedeflenir (yoğunluğa ve aciliyet seviyesine göre)",
      nextDayConditional: "Genellikle aynı gün veya ertesi gün (yoğunluğa göre planlanır)",
      urgentPriority: "Acil durumlar önceliklidir; müdahale süresi yoğunluğa göre değişebilir",
      standardTimeline: "Süreç genellikle 1-3 iş günü içinde tamamlanır; acil durumlarda öncelikli planlama yapılır",
    },
  },
  operationalCapacity: {
    mobileTeams: {
      count: 2,
      verifiedDate: "2026-01-03",
      note: "İstanbul genelinde 2 tam yetkili mobil ekip (doğrulanabilir operasyon kapasitesi)",
    },
    coverageArea: "İstanbul metropolitan area",
    serviceRadius: "Çekmeköy merkezden yaklaşık 50 km yarıçap (yoğunluğa göre değişebilir)",
  },
  pricing: {
    startingPrice: "450 TL",
    currency: "TRY",
    note: "Fiyatlandırma cihaz tipine, teknik özelliklerine ve işlem türüne göre değişir",
    disclaimer: "Şeffaf fiyat çerçevesi iletişimde netleştirilir",
  },
} as const;

export function getOperationalCopy(
  category: keyof OperationalAnchors['languagePolicy'],
  key?: string
): string | string[] | Record<string, string> | boolean | undefined {
  const policy = (OPERATIONAL_ANCHORS.languagePolicy as any)[category];
  if (key && typeof policy === 'object' && !Array.isArray(policy) && key in policy) {
    return (policy as Record<string, any>)[key];
  }
  return policy;
}

export function getAvailabilityStatement(type: keyof OperationalAnchors['languagePolicy']['availabilityStatements']): string {
  return OPERATIONAL_ANCHORS.languagePolicy.availabilityStatements[type];
}

export function getResponseTimeStatement(type: keyof OperationalAnchors['languagePolicy']['responseTimeStatements']): string {
  return OPERATIONAL_ANCHORS.languagePolicy.responseTimeStatements[type];
}

export function getBadgeText(type: keyof OperationalAnchors['languagePolicy']['badges']): string {
  return OPERATIONAL_ANCHORS.languagePolicy.badges[type];
}
