import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vitor Mesquita — Frontend Developer',
    short_name: 'VM Dev',
    description:
      'Senior frontend developer offering web development, e-commerce, and complex system services.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030202',
    theme_color: '#030202',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
