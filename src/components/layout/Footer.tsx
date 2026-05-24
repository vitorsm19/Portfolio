import { Marquee } from '@/components/ui/Marquee'
import { siteConfig } from '@/data/site'

export function Footer() {
  return (
    <>
      {/* ═══════════ 9. FOOTER MARQUEE ═══════════ */}
      <div className="border-t border-overlay/6 pt-6">
        <div className="footer-ghost text-6xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight! select-none">
          <Marquee text="LET'S TALK" speed={22} />
        </div>
      </div>

      {/* ═══════════ 10. FOOTER ═══════════ */}
      <footer className="px-6 lg:px-16 pb-10">
        <div className="max-w-6xl mx-auto pt-8 border-t border-overlay/6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-base font-medium text-text-heading tracking-wider!">
                {siteConfig.name}
              </p>
              <p className="footer-subtitle font-mono text-xs sm:text-sm mt-1 tracking-wide!">
                Turning wild ideas into polished interfaces
              </p>
            </div>

            <div className="flex items-center gap-3">
              {[
                { label: 'LinkedIn', href: siteConfig.linkedin.url, external: true },
                { label: 'GitHub', href: siteConfig.github.url, external: true },
                { label: 'Email', href: `mailto:${siteConfig.email}`, external: false },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="footer-social-pill py-2 text-[14px] pt-3 px-5 font-medium text-text-muted border rounded-full hover:text-text-heading"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <p className="footer-copyright text-sm mt-8 text-center">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
