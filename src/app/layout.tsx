import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { themeBootstrapScript } from '@/lib/theme'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
})

const SITE_URL = 'https://vitormesquita.com'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#030202' },
    { media: '(prefers-color-scheme: light)', color: '#f7f5f0' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Vitor Mesquita — Freelance Senior Frontend Developer / React Contractor',
    template: '%s | Vitor Mesquita',
  },
  description:
    'Freelance Senior Frontend Developer and Frontend Contractor based in Barcelona, available for remote React, Next.js, and TypeScript contract projects across Europe. 6+ years shipping high-performance frontend products for Sony, Premier League, Tottenham Hotspur, LIV Golf, and VELUX.',
  keywords: [
    'Freelance Senior Frontend Developer',
    'Frontend Contractor',
    'React Contractor',
    'Next.js Developer',
    'TypeScript Developer',
    'React.js',
    'Next.js',
    'TypeScript',
    'Remote Europe',
    'Contract projects',
    'High-performance web applications',
    'Frontend architecture',
    'Design systems',
    'E-commerce',
    'SaaS dashboards',
    'Sports platforms',
    'Performance optimization',
    'Accessibility',
    'Testing',
    'Senior Frontend Engineer',
    'Product teams',
    'Long-term contracts',
    'Vitor Mesquita',
  ],
  authors: [{ name: 'Vitor Mesquita', url: SITE_URL }],
  creator: 'Vitor Mesquita',
  publisher: 'Vitor Mesquita',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Vitor Mesquita — Freelance Senior Frontend Developer',
    title: 'Freelance Senior Frontend Developer | React • Next.js • TypeScript',
    description:
      'Frontend Contractor helping European product teams build high-performance React, Next.js, and TypeScript products. Remote, EU-based, available for 3+ month contracts.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vitor Mesquita — Freelance Senior Frontend Developer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Freelance Senior Frontend Developer | React • Next.js • TypeScript',
    description:
      'Frontend Contractor helping European product teams build high-performance React, Next.js, and TypeScript products.',
    images: ['/og-image.png'],
    creator: '@vitorsm19',
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: 'technology',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <head>
        {/* Theme bootstrap — sets data-theme on <html> before paint, no FOUC */}
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W5QBSKDD');`,
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-bg-primary text-overlay/87">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W5QBSKDD"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <NoiseOverlay />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: 'Vitor Mesquita — Freelance Senior Frontend Developer',
                  description:
                    'Freelance Senior Frontend Developer and Frontend Contractor available for remote React, Next.js, and TypeScript contract projects across Europe.',
                  publisher: { '@id': `${SITE_URL}/#person` },
                },
                {
                  '@type': 'Person',
                  '@id': `${SITE_URL}/#person`,
                  name: 'Vitor Mesquita',
                  jobTitle: 'Freelance Senior Frontend Developer / Frontend Contractor',
                  url: SITE_URL,
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Barcelona',
                    addressCountry: 'ES',
                  },
                  sameAs: [
                    'https://github.com/vitorsm19/',
                    'https://www.linkedin.com/in/vitormesquita19/',
                  ],
                  knowsAbout: [
                    'React',
                    'Next.js',
                    'TypeScript',
                    'Frontend Architecture',
                    'Design Systems',
                    'Performance Optimization',
                    'Accessibility',
                    'Testing',
                    'E-Commerce',
                    'SaaS Dashboards',
                    'Sports Platforms',
                    'Vue.js',
                    'Nuxt',
                    'Server-Side Rendering',
                    'Core Web Vitals',
                  ],
                  worksFor: {
                    '@type': 'Organization',
                    name: 'Freelance / Independent Contractor',
                  },
                },
                {
                  '@type': 'ProfessionalService',
                  '@id': `${SITE_URL}/#service`,
                  name: 'Vitor Mesquita — Freelance Frontend Contracting',
                  provider: { '@id': `${SITE_URL}/#person` },
                  url: SITE_URL,
                  description:
                    'Senior frontend contracting services for European product teams: React, Next.js, and TypeScript delivery, frontend architecture, design systems, performance optimization, and rescue engagements.',
                  serviceType: [
                    'Dedicated Frontend Contractor',
                    'Greenfield Frontend Builds',
                    'Frontend Rescue & Performance',
                    'E-commerce & Product Frontends',
                  ],
                  areaServed: {
                    '@type': 'Place',
                    name: 'Europe',
                  },
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Frontend Contracting Services',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Dedicated Frontend Contractor',
                          description:
                            'Senior React, Next.js, and TypeScript contractor embedded in your product team. Frontend architecture, design systems, testing, accessibility, and performance.',
                        },
                        priceSpecification: {
                          '@type': 'UnitPriceSpecification',
                          price: '45',
                          priceCurrency: 'EUR',
                          unitText: 'HOUR',
                        },
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Greenfield Frontend Builds',
                          description:
                            'Production-ready frontend applications built from scratch using React, Next.js, and TypeScript with scalable component architecture.',
                        },
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Frontend Rescue & Performance',
                          description:
                            'Senior help for slow, messy, or hard-to-maintain frontend codebases — audits, performance fixes, Core Web Vitals, accessibility, refactoring.',
                        },
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'E-commerce & Product Frontends',
                          description:
                            'Frontend delivery for e-commerce, SaaS dashboards, sports platforms, and high-traffic product experiences.',
                        },
                      },
                    ],
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
