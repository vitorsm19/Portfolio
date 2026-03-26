import { LinkedInIcon, GitHubIcon } from '@/components/icons'
import { siteConfig } from '@/data/site'

export function SocialSidebar() {
  return (
    <div className="fixed bottom-0 left-8 z-10 hidden lg:flex flex-col items-center gap-4">
      <a
        href={siteConfig.linkedin.url}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="LinkedIn profile"
      >
        <LinkedInIcon
          size={24}
          className="text-accent hover:text-white hover:-translate-y-0.5 transition-all duration-300"
        />
      </a>

      <a
        href={siteConfig.github.url}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="GitHub profile"
      >
        <GitHubIcon
          size={24}
          className="text-accent hover:text-white hover:-translate-y-0.5 transition-all duration-300"
        />
      </a>

      <div className="w-1 h-20 bg-line" />
    </div>
  )
}
