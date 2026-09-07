import { siteConfig } from '@/data/site'

const links = [
  { label: 'Email', href: `mailto:${siteConfig.email}`, external: false },
  { label: 'LinkedIn', href: siteConfig.linkedin.url, external: true },
  { label: 'GitHub', href: siteConfig.github.url, external: true },
]

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1400px] px-5 pb-10 pt-20 sm:px-8 lg:px-12 lg:pt-28">
      <div className="flex flex-col gap-10 border-t border-line pt-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="display display-md">
            {siteConfig.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-[38ch] text-sm text-ink-mute">
            {siteConfig.role}. {siteConfig.citizenship}, working remotely across Europe.
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="link-wipe text-sm text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="meta mt-10">
        &copy; {new Date().getFullYear()} {siteConfig.name}
      </p>
    </footer>
  )
}
