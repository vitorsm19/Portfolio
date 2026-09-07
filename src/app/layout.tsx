import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, IBM_Plex_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import { Grain } from '@/components/ui/Grain'
import { SmoothScroll } from '@/components/motion/SmoothScroll'
import { themeBootstrapScript } from '@/lib/theme'
import { faqs } from '@/data/faq'
import { siteConfig } from '@/data/site'
import './globals.css'

const instrument = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-instrument',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

// Thunder is the brand face, so it is preloaded rather than left to FOUT.
// Only the two weights the page actually sets are shipped.
const thunder = localFont({
  src: [
    { path: '../../public/fonts/Thunder-MediumLC.otf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/Thunder-BoldLC.otf', weight: '700', style: 'normal' },
  ],
  variable: '--font-thunder',
  display: 'swap',
  preload: true,
})

const SITE_URL = 'https://vitormesquita.com'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f0f2ee' },
    { media: '(prefers-color-scheme: dark)', color: '#141916' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Vitor Mesquita, Senior Frontend Developer & React Contractor',
    template: '%s | Vitor Mesquita',
  },
  description:
    'Freelance senior frontend developer and React contractor, remote across Europe. 6+ years building high-performance React, Next.js, and TypeScript products for teams like Premier League and VELUX.',
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
    siteName: 'Vitor Mesquita, Freelance Senior Frontend Developer',
    title: 'Freelance Senior Frontend Developer | React, Next.js, TypeScript',
    description:
      'Frontend Contractor helping European product teams build high-performance React, Next.js, and TypeScript products. Remote, EU-based, available for new contracts.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vitor Mesquita, Freelance Senior Frontend Developer',
        type: 'image/png',
      },
    ],
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: 'technology',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Emitted as separate <script> blocks (one top-level @type each) rather than a
  // single @graph, so simple schema scanners detect each type. Cross-references
  // via @id still resolve across blocks for Google.
  const schemaNodes = [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Vitor Mesquita, Freelance Senior Frontend Developer',
      description:
        'Freelance Senior Frontend Developer and Frontend Contractor available for remote React, Next.js, and TypeScript contract projects across Europe.',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Vitor Mesquita',
      jobTitle: 'Senior Frontend Developer & React Contractor',
      description:
        'Freelance senior frontend developer with 6+ years building high-performance React, Next.js, and TypeScript products for global product teams. Remote across Europe.',
      url: SITE_URL,
      image: `${SITE_URL}/profile.png`,
      email: 'vitormesquita190902@gmail.com',
      knowsLanguage: ['English'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Barcelona',
        addressCountry: 'ES',
      },
      sameAs: ['https://github.com/vitorsm19/', 'https://www.linkedin.com/in/vitormesquita19/'],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Frontend Developer',
        occupationLocation: { '@type': 'Place', name: 'Europe' },
        skills:
          'React, Next.js, TypeScript, frontend architecture, design systems, performance optimization, accessibility, testing',
      },
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
        'AI Product Interfaces',
        'Streaming UI',
        'Vue.js',
        'Nuxt',
        'Server-Side Rendering',
        'Core Web Vitals',
      ],
      worksFor: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Vitor Mesquita',
      url: SITE_URL,
      description:
        'Independent frontend contracting: senior React, Next.js, and TypeScript delivery for European product teams.',
      email: 'vitormesquita190902@gmail.com',
      founder: { '@id': `${SITE_URL}/#person` },
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon-512.png`,
        width: 512,
        height: 512,
      },
      sameAs: ['https://github.com/vitorsm19/', 'https://www.linkedin.com/in/vitormesquita19/'],
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: 'Vitor Mesquita, Senior Frontend Developer & React Contractor',
      description:
        'Freelance senior frontend developer and React contractor, remote across Europe.',
      inLanguage: 'en',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#person` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.png`,
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: 'Vitor Mesquita, Freelance Frontend Contracting',
      provider: { '@id': `${SITE_URL}/#person` },
      url: SITE_URL,
      description:
        'Senior frontend contracting services for European product teams: React, Next.js, and TypeScript delivery, frontend architecture, design systems, performance optimization, and rescue engagements.',
      serviceType: [
        'Embedded Frontend Contractor',
        'Greenfield Frontend Builds',
        'AI Product Interfaces',
        'E-commerce & Product Frontends',
      ],
      areaServed: { '@type': 'Place', name: 'Europe' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Frontend Contracting Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Embedded Frontend Contractor',
              description:
                'Senior React, Next.js, and TypeScript contractor embedded in your product team. Frontend architecture, design systems, testing, accessibility, and performance.',
            },
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: String(siteConfig.rate.amount),
              priceCurrency: siteConfig.rate.currency,
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
              name: 'AI Product Interfaces',
              description:
                'Frontends for AI features: streaming responses, agent and tool-call state, retry and failure handling, and review or evaluation dashboards.',
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
  ]

  return (
    <html
      lang="en"
      className={`${instrument.variable} ${plexMono.variable} ${thunder.variable}`}
      suppressHydrationWarning
    >
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
      <body className="bg-paper text-ink-body antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-accent"
        >
          Skip to content
        </a>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W5QBSKDD"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <SmoothScroll />
        {children}
        <Grain />

        {/* JSON-LD Structured Data — one script per type for broad detection */}
        {schemaNodes.map((node) => (
          <script
            key={node['@id']}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({ '@context': 'https://schema.org', ...node }),
            }}
          />
        ))}
      </body>
    </html>
  )
}
