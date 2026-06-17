import { siteConfig } from '@/data/site'
import { projects } from '@/data/projects'
import { services } from '@/data/services'
import { faqs } from '@/data/faq'

const SITE_URL = 'https://vitormesquita.com'

const SUMMARY =
  'Freelance senior frontend developer specializing in React, Next.js, and TypeScript. 6+ years building high-performance web apps for global product teams. Remote across Europe, available for new contracts.'

const ABOUT_SHORT =
  'Vitor Mesquita is a senior frontend developer with 6+ years building and maintaining high-performance web apps for global brands across sports, e-commerce, SaaS, and tech. He embeds in existing product teams, owns frontend delivery (architecture, design systems, performance, accessibility), and ships clean, maintainable code. He works mainly in React, Next.js, and TypeScript, remotely across Europe.'

const ABOUT_FULL = [
  "I'm Vitor, a senior frontend developer with 6+ years building and maintaining high-performance products for global brands across sports, e-commerce, SaaS, and tech.",
  'I work the way a good teammate does: ramp up fast inside your stack and rituals, communicate clearly, and take real ownership of frontend delivery, from architecture and design systems to performance and the small details.',
  'I work mainly in React, Next.js, and TypeScript. I can drop into an existing team, translate Figma into production-ready interfaces, and help you ship faster with clean, maintainable code. Remote across Europe, in it for the long term.',
]

function priceLine(s: (typeof services)[number]): string {
  if (s.pricing.type === 'hourly') return `From €${s.pricing.amount}/hour`
  if (s.pricing.type === 'custom') return s.pricing.label
  return `€${s.pricing.amount}`
}

/** Generate the llms.txt body. `full` adds long-form content (llms-full.txt). */
export function buildLlms(full: boolean): string {
  const lines: string[] = []

  lines.push('# Vitor Mesquita, Senior Frontend Contractor', '')
  lines.push(`> ${SUMMARY}`, '')

  lines.push('## About', '')
  if (full) {
    lines.push(ABOUT_FULL.join('\n\n'))
  } else {
    lines.push(ABOUT_SHORT)
  }
  lines.push('')

  lines.push('## Services', '')
  for (const s of services) {
    if (full) {
      lines.push(`### ${s.title}`)
      lines.push(`${s.subtitle}. ${s.description}`)
      lines.push(...s.features.map((f) => `- ${f}`))
      lines.push(`Pricing: ${priceLine(s)}`, '')
    } else {
      lines.push(`- ${s.title}: ${s.subtitle}. ${priceLine(s)}`)
    }
  }
  lines.push('')

  lines.push('## Selected work', '')
  for (const p of projects) {
    if (full) {
      lines.push(`### ${p.title} (${p.role})`)
      lines.push(p.description)
      lines.push(`Tech: ${p.tech.join(', ')}`)
      lines.push(`Link: ${p.url}`, '')
    } else {
      lines.push(`- ${p.title} (${p.role}): ${p.url}`)
    }
  }
  lines.push('')

  if (full) {
    lines.push('## FAQ', '')
    for (const f of faqs) {
      lines.push(`### ${f.q}`)
      lines.push(f.a, '')
    }
  }

  lines.push('## Contact', '')
  lines.push(`- Email: ${siteConfig.email}`)
  lines.push(`- LinkedIn: ${siteConfig.linkedin.url}`)
  lines.push(`- GitHub: ${siteConfig.github.url}`)
  lines.push(`- Website: ${SITE_URL}`)
  lines.push(`- Location: ${siteConfig.location}, remote across Europe`)
  lines.push('')

  return lines.join('\n')
}
