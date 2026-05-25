import type { StaticImageData } from 'next/image'

import premierLeagueLogo from '@/assets/premier-league-logo.png'
import tottenhamLogo from '@/assets/tottenham-logo.png'
import livGolfLogo from '@/assets/liv-golf-logo.svg'
import veluxLogo from '@/assets/velux-logo.svg'
import growincoLogo from '@/assets/growinco-logo.svg'

import premierLeagueSnippet from '@/assets/premier-league-snippet.png'
import tottenhamSnippet from '@/assets/tottenham-snippet.png'
import livGolfSnippet from '@/assets/liv-golf-snippet.png'
import veluxSnippet from '@/assets/velux-snippet.png'
import growincoSnippet from '@/assets/growinco-snippet.png'

export interface Project {
  name: string
  title: string
  role: string
  description: string
  url: string
  tech: string[]
  logo: StaticImageData | string
  snippet: StaticImageData
}

export const projects: Project[] = [
  {
    name: 'premier-league',
    title: 'Premier League',
    role: 'Senior Frontend Contractor',
    description:
      'Contributed to the official high-traffic platform serving millions of football fans worldwide — live scores, fixtures, results, player statistics, and Fantasy Premier League features.',
    url: 'https://www.premierleague.com',
    tech: ['React', 'TypeScript', 'SSR', 'CMS'],
    logo: premierLeagueLogo,
    snippet: premierLeagueSnippet,
  },
  {
    name: 'tottenham-hotspur',
    title: 'Tottenham Hotspur',
    role: 'Senior Frontend Contractor',
    description:
      'Built fan engagement features and responsive interfaces for the official digital platform — match-day flows, fixtures, ticketing journeys, and dynamic content.',
    url: 'https://www.tottenhamhotspur.com',
    tech: ['React', 'TypeScript', 'SSR'],
    logo: tottenhamLogo,
    snippet: tottenhamSnippet,
  },
  {
    name: 'liv-golf-fantasy',
    title: 'LIV Golf Fantasy',
    role: 'Senior Frontend Contractor',
    description:
      'Helped build a real-time fantasy sports platform from the ground up, enabling fans to compete in leagues during live tournaments.',
    url: 'https://fantasy.livgolf.com',
    tech: ['React', 'TypeScript', 'Tailwind', 'Real-time'],
    logo: livGolfLogo,
    snippet: livGolfSnippet,
  },
  {
    name: 'velux',
    title: 'VELUX',
    role: 'Frontend Developer',
    description:
      'Built reusable components and improved design system consistency across e-commerce and marketing platforms in 30+ countries. Supported CMS workflows and GA4 e-commerce tracking.',
    url: 'https://www.velux.com',
    tech: ['Vue', 'Nuxt', 'TypeScript', 'Sitecore', 'GA4'],
    logo: veluxLogo,
    snippet: veluxSnippet,
  },
  {
    name: 'growinco',
    title: 'GrowinCo.',
    role: 'Full-Stack Contractor',
    description:
      'Built and maintained frontend and backend features for a B2B platform connecting brands with co-manufacturers, co-packers, and suppliers in the CPG industry.',
    url: 'https://growinco.com',
    tech: ['Angular', 'Node.js', 'Express', 'MongoDB'],
    logo: growincoLogo,
    snippet: growincoSnippet,
  },
]
