import type { StaticImageData } from 'next/image'

import premierLeagueLogo from '@/assets/premier-league-logo.png'
import tottenhamLogo from '@/assets/tottenham-logo.png'
import livGolfLogo from '@/assets/liv-golf-logo.svg'
import veluxLogo from '@/assets/velux-logo.svg'
import uefaLogo from '@/assets/uefa-logo.svg'

import premierLeagueSnippet from '@/assets/premier-league-snippet.png'
import tottenhamSnippet from '@/assets/tottenham-snippet.png'
import livGolfSnippet from '@/assets/liv-golf-snippet.png'
import veluxSnippet from '@/assets/velux-snippet.png'

export interface Project {
  name: string
  title: string
  role: string
  description: string
  /** Scope markers, drawn from the engagement itself. No invented metrics. */
  facts: string[]
  url: string
  tech: string[]
  logo: StaticImageData | string
  /** Omitted when there is no shippable screenshot; the card falls back to a
   *  logo plate rather than a fabricated product shot. */
  snippet?: StaticImageData
}

/** The lead case. Gets the full-bleed treatment; the rest run as an index. */
export const featuredProject: Project & { snippet: StaticImageData } = {
  name: 'premier-league',
  title: 'Premier League',
  role: 'Senior Frontend Contractor',
  description:
    'The official platform, built with a large frontend team. Live scores, fixtures, results, player statistics, and Fantasy Premier League, all of it under match-day load.',
  facts: ['Live scores and fixtures', 'Fantasy Premier League', 'Server-rendered, CMS-driven'],
  url: 'https://www.premierleague.com',
  tech: ['React', 'TypeScript', 'SSR', 'CMS'],
  logo: premierLeagueLogo,
  snippet: premierLeagueSnippet,
}

export const projects: Project[] = [
  {
    name: 'tottenham-hotspur',
    title: 'Tottenham Hotspur',
    role: 'Senior Frontend Contractor',
    description:
      'Fan engagement features and responsive interfaces for the official club platform: match-day flows, fixtures, ticketing journeys, and dynamic content.',
    facts: ['Match-day flows', 'Ticketing journeys'],
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
      'A real-time fantasy sports platform built from the ground up, so fans could compete in leagues while tournaments were live.',
    facts: ['Built from zero', 'Real-time scoring'],
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
      'Reusable components and design system consistency across e-commerce and marketing platforms, plus CMS workflows and GA4 e-commerce tracking.',
    facts: ['30+ countries', 'Design system work'],
    url: 'https://www.velux.com',
    tech: ['Vue', 'Nuxt', 'TypeScript', 'Sitecore', 'GA4'],
    logo: veluxLogo,
    snippet: veluxSnippet,
  },
  {
    name: 'uefa-fantasy',
    title: 'UEFA Fantasy',
    role: 'Senior Frontend Contractor',
    description:
      'Fantasy football across the Champions League and Europa League: squad selection, transfers, private leagues, and scoring that updates live through a European match night.',
    facts: ['Two competitions', 'Live match-night scoring'],
    url: 'https://gaming.uefa.com/en/uclfantasy',
    tech: ['React', 'TypeScript', 'Real-time'],
    logo: uefaLogo,
  },
]

/**
 * Every client mark, in the order they appear on the wall under the hero.
 * `size` is an optical correction: a tall crest and a wide wordmark need
 * different heights to carry the same visual weight in a row.
 */
export const clients = [
  {
    name: 'Premier League',
    logo: premierLeagueLogo,
    url: 'https://www.premierleague.com',
    size: 'h-9 lg:h-11',
  },
  {
    name: 'Tottenham Hotspur',
    logo: tottenhamLogo,
    url: 'https://www.tottenhamhotspur.com',
    size: 'h-12 lg:h-16',
  },
  {
    name: 'LIV Golf',
    logo: livGolfLogo,
    url: 'https://fantasy.livgolf.com',
    size: 'h-6 lg:h-8',
  },
  { name: 'VELUX', logo: veluxLogo, url: 'https://www.velux.com', size: 'h-5 lg:h-6' },
  {
    name: 'UEFA',
    logo: uefaLogo,
    url: 'https://gaming.uefa.com/en/uclfantasy',
    size: 'h-8 lg:h-10',
  },
]
