import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ESLAMED',
    short_name: 'ESLAMED',
    description:
      'Evde kullanım için medikal ekipman uygunluğu ve süreç yönlendirmesi. Tanı ve tedavi kararı hekimlere aittir; bu hizmet tıbbi tanı veya tedavi sunmaz.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563EB',
    // Icons are automatically handled by Next.js via app/icon.svg and app/apple-icon.tsx
    // Next.js adds appropriate icon links in the HTML <head> automatically
    // No need to reference them in the manifest - this avoids dynamic route errors
  };
}




