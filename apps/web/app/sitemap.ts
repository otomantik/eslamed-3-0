import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.eslamed.com';
  const lastModified = new Date();

  return [
    // Home & Emergency Modes - Priority 1.0
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    
    // Services - Priority 0.8
    {
      url: `${baseUrl}/hizmetler`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler/teknik-servis`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler/oksijen-dolum`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler/cihaz-kiralama`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler/cihaz-satisi`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler/ikinci-el-alim`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    
    // Guides - Priority 0.7
    {
      url: `${baseUrl}/rehber/solunum-sistemleri`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/rehber/evde-bakim-ekipmanlari`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/rehber/olcum-cihazlari`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    
    // Regional & Catalog - Priority 0.6
    {
      url: `${baseUrl}/istanbul`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ekipmanlar`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tabanlik`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    
    // Contact & Support - Priority 0.6
    {
      url: `${baseUrl}/iletisim`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/destek`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    
    // Legal Pages - Priority 0.5
    {
      url: `${baseUrl}/isletme-belgeleri`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/kvkk`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/gizlilik`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}

