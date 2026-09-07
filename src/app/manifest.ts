import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vitor Mesquita, Senior Frontend Contractor',
    short_name: 'Vitor Mesquita',
    description:
      'Senior React, Next.js and TypeScript contractor for European product teams.',
    start_url: '/',
    display: 'standalone',
    background_color: '#e9eaec',
    theme_color: '#e9eaec',
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
