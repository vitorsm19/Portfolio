import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vitor Mesquita, Senior Frontend Contractor',
    short_name: 'Vitor Mesquita',
    description:
      'Senior React, Next.js and TypeScript contractor for European product teams.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f0f2ee',
    theme_color: '#f0f2ee',
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
