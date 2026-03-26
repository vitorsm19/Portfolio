import { siteConfig } from '@/data/site'

export function EmailSidebar() {
  return (
    <div className="fixed top-0 right-8 z-30 hidden lg:flex flex-col items-center gap-4 min-h-[85vh] justify-start pt-0">
      <div className="w-1 h-20 bg-line" />

      <a
        href={`mailto:${siteConfig.email}`}
        className="[writing-mode:vertical-rl] text-accent font-bold hover:text-white transition-colors duration-300"
      >
        {siteConfig.email}
      </a>
    </div>
  )
}
