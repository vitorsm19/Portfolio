import { siteConfig } from '@/data/site'
import { featuredProject, projects } from '@/data/projects'
import { engagements, process } from '@/data/engagements'
import { faqs } from '@/data/faq'

const SITE_URL = 'https://vitormesquita.com'

const SUMMARY =
  'Senior frontend contractor specializing in React, Next.js, and TypeScript. 6+ years building high-performance web apps for global product teams. Remote across Europe, available for new contracts of three months and up.'

const ABOUT_SHORT =
  'Vitor Mesquita is a senior frontend contractor with 6+ years inside product teams, including the Premier League, Tottenham Hotspur, LIV Golf, and VELUX platforms. He embeds in existing teams and owns frontend delivery: architecture, design systems, performance, accessibility, and testing. He works mainly in React, Next.js, and TypeScript, remotely across Europe, and is an EU citizen based in Barcelona.'

/** Generate the llms.txt body. `full` adds long-form content (llms-full.txt). */
export function buildLlms(full: boolean): string {
  const lines: string[] = []
  const allWork = [featuredProject, ...projects]

  lines.push('# Vitor Mesquita, Senior Frontend Contractor', '')
  lines.push(`> ${SUMMARY}`, '')

  lines.push('## About', '')
  lines.push(full ? siteConfig.about.body.join('\n\n') : ABOUT_SHORT)
  lines.push('')

  lines.push('## Engagements', '')
  for (const e of engagements) {
    if (full) {
      lines.push(`### ${e.title}`)
      lines.push(e.summary)
      lines.push(...e.points.map((p) => `- ${p}`), '')
    } else {
      lines.push(`- ${e.title}: ${e.summary}`)
    }
  }
  lines.push('')

  lines.push('## Selected work', '')
  for (const p of allWork) {
    if (full) {
      lines.push(`### ${p.title} (${p.role})`)
      lines.push(p.description)
      lines.push(`Scope: ${p.facts.join(', ')}`)
      lines.push(`Tech: ${p.tech.join(', ')}`)
      lines.push(`Link: ${p.url}`, '')
    } else {
      lines.push(`- ${p.title} (${p.role}): ${p.url}`)
    }
  }
  lines.push('')

  if (full) {
    lines.push('## How an engagement starts', '')
    process.forEach((step, i) => {
      lines.push(`${i + 1}. ${step.title}. ${step.body}`)
    })
    lines.push('')

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
  lines.push(`- Availability: ${siteConfig.availability}`)
  lines.push('')

  return lines.join('\n')
}
