import type { Metadata } from 'next'
import { Fira_Sans } from 'next/font/google'
import './globals.css'

const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Portfolio - Vitor Mesquita',
  description: 'Frontend Developer portfolio — Vitor Mesquita',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={firaSans.className}>
      <head>
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
      </body>
    </html>
  )
}
