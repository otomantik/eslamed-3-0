import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ESLAMED',
    short_name: 'ESLAMED',
    description:
      'Evde kullanım için medikal ekipman uygunluğu ve süreç yönlendirmesi. Tanı ve tedavi kararı hekimlere aittir.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563EB',
    icons: [
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}



