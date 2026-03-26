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
    description:
      'The official website for the Premier League, delivering live scores, fixtures, results, player statistics, and Fantasy Premier League to millions of football fans worldwide.',
    url: 'https://www.premierleague.com',
    tech: ['JavaScript', 'Firebase', 'Optimizely'],
    logo: premierLeagueLogo,
    snippet: premierLeagueSnippet,
  },
  {
    name: 'tottenham-hotspur',
    title: 'Tottenham Hotspur',
    description:
      'The official digital platform for Tottenham Hotspur Football Club, providing club news, match fixtures, ticketing, and fan engagement content.',
    url: 'https://www.tottenhamhotspur.com',
    tech: ['React', 'SSR', 'Dynamic Yield'],
    logo: tottenhamLogo,
    snippet: tottenhamSnippet,
  },
  {
    name: 'liv-golf-fantasy',
    title: 'LIV Golf Fantasy',
    description:
      'The official fantasy golf game for LIV Golf, allowing fans to build teams, compete in leagues, and engage with the LIV Golf tournament series.',
    url: 'https://fantasy.livgolf.com',
    tech: ['Next.js', 'Vercel', 'Contentful'],
    logo: livGolfLogo,
    snippet: livGolfSnippet,
  },
  {
    name: 'velux',
    title: 'VELUX',
    description:
      'The global digital presence for the VELUX Group, showcasing their range of roof windows, skylights, and daylight solutions for residential and commercial buildings.',
    url: 'https://www.velux.com',
    tech: ['React', 'Sitecore', 'Algolia'],
    logo: veluxLogo,
    snippet: veluxSnippet,
  },
  {
    name: 'growinco',
    title: 'Growinco.',
    description:
      'A B2B co-manufacturing and sourcing platform for the CPG industry, connecting brands with co-manufacturers, co-packers, and suppliers to facilitate product development and strategic sourcing.',
    url: 'https://growinco.com',
    tech: ['WordPress', 'Elementor', 'HubSpot'],
    logo: growincoLogo,
    snippet: growincoSnippet,
  },
]
