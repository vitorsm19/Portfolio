import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
})

const SITE_URL = 'https://vitormesquita.com'

export const viewport: Viewport = {
  themeColor: '#030202',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Vitor Mesquita — Frontend Developer | Web Development Services',
    template: '%s | Vitor Mesquita',
  },
  description:
    'Senior frontend developer with 6+ years of experience building high-performance websites, e-commerce platforms, and complex web applications for brands like Premier League, Tottenham Hotspur, VELUX, and LIV Golf. Hire a freelance developer for your next project.',
  keywords: [
    'frontend developer',
    'freelance web developer',
    'hire frontend developer',
    'website development services',
    'e-commerce developer',
    'React developer',
    'Next.js developer',
    'Vue developer',
    'TypeScript developer',
    'web application development',
    'responsive web design',
    'freelance developer for hire',
    'senior frontend engineer',
    'custom website development',
    'web development agency alternative',
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
    siteName: 'Vitor Mesquita — Frontend Developer',
    title: 'Vitor Mesquita — Frontend Developer | Web Development Services',
    description:
      'Senior frontend developer building high-performance websites and web applications. 6+ years shipping production code for top brands in sports, retail, and tech. Available for freelance projects.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vitor Mesquita — Frontend Developer',
    description:
      'Senior frontend developer building high-performance websites and web applications. Available for freelance projects.',
    creator: '@vitorsm19',
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: 'technology',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        <meta name="theme-color" content="#030202" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#030202" media="(prefers-color-scheme: light)" />
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
      <body className="bg-bg-primary text-white/87">
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
                  name: 'Vitor Mesquita — Frontend Developer',
                  description:
                    'Senior frontend developer with 6+ years building high-performance web applications.',
                  publisher: { '@id': `${SITE_URL}/#person` },
                },
                {
                  '@type': 'Person',
                  '@id': `${SITE_URL}/#person`,
                  name: 'Vitor Mesquita',
                  jobTitle: 'Senior Frontend Developer',
                  url: SITE_URL,
                  sameAs: [
                    'https://github.com/vitorsm19/',
                    'https://www.linkedin.com/in/vitormesquita19/',
                  ],
                  knowsAbout: [
                    'Frontend Development',
                    'React',
                    'Next.js',
                    'Vue.js',
                    'TypeScript',
                    'Tailwind CSS',
                    'E-Commerce Development',
                    'Web Application Development',
                    'Responsive Web Design',
                    'Performance Optimization',
                  ],
                  worksFor: {
                    '@type': 'Organization',
                    name: 'Freelance',
                  },
                },
                {
                  '@type': 'ProfessionalService',
                  '@id': `${SITE_URL}/#service`,
                  name: 'Vitor Mesquita — Web Development Services',
                  provider: { '@id': `${SITE_URL}/#person` },
                  url: SITE_URL,
                  description:
                    'Freelance web development services including custom websites, e-commerce platforms, and complex web applications.',
                  serviceType: [
                    'Website Design & Development',
                    'E-Commerce Development',
                    'Complex Web Application Development',
                    'Frontend Engineering',
                  ],
                  areaServed: {
                    '@type': 'Place',
                    name: 'Worldwide',
                  },
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Web Development Services',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Website Design & Development',
                          description:
                            'Custom-designed, responsive websites built with modern technologies.',
                        },
                        priceSpecification: {
                          '@type': 'PriceSpecification',
                          price: '600',
                          priceCurrency: 'EUR',
                          minPrice: '600',
                        },
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'E-Commerce Development',
                          description:
                            'Full-featured online stores with payment integrations and inventory management.',
                        },
                        priceSpecification: {
                          '@type': 'PriceSpecification',
                          price: '2500',
                          priceCurrency: 'EUR',
                          minPrice: '2500',
                        },
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Full-Time Developer Engagement',
                          description:
                            'Dedicated frontend developer for ongoing projects and team augmentation.',
                        },
                        priceSpecification: {
                          '@type': 'UnitPriceSpecification',
                          price: '45',
                          priceCurrency: 'EUR',
                          unitText: 'HOUR',
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
