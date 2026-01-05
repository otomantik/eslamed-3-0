import type { Metadata } from 'next';
import { FieldServiceInterface } from '@/components/field-service/field-service-interface';

export const metadata: Metadata = {
  title: 'Saha Terminali - Teknisyen Arayüzü | ESLAMED',
  description: 'Teknisyenler için teslimat protokolü, QR kod üretici ve dijital devir-teslim formu',
  robots: 'noindex, nofollow', // Internal tool, not for SEO
};

export default function FieldServicePage() {
  return <FieldServiceInterface />;
}


