import { siteConfig } from '@/data/site'

const links = [
  { label: 'Email', href: `mailto:${siteConfig.email}`, external: false },
  { label: 'LinkedIn', href: siteConfig.linkedin.url, external: true },
  { label: 'GitHub', href: siteConfig.github.url, external: true },
]

export function Footer() {
  return (
    <footer className="px-6 lg:px-12 pb-12 pt-20 lg:pt-28">
      <div className="max-w-5xl mx-auto">
        <div className="rule pt-10 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-sans text-4xl lg:text-5xl font-bold text-text-heading tracking-[-0.02em] leading-none">
              Vitor Mesquita
            </p>
            <p className="mt-3 text-sm text-text-muted">
              Senior frontend contractor building calm, reliable product UIs.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="btn-ghost rounded-full px-5 py-2 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-10 text-xs text-text-muted">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
