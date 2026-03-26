export interface Project {
  name: string
  title: string
  description: string
  url: string
  tech: string[]
}

export const projects: Project[] = [
  {
    name: 'premier-league',
    title: 'Premier League',
    description:
      'The official website for the Premier League, delivering live scores, fixtures, results, player statistics, and Fantasy Premier League to millions of football fans worldwide.',
    url: 'https://www.premierleague.com',
    tech: ['JavaScript', 'Firebase', 'Optimizely'],
  },
  {
    name: 'tottenham-hotspur',
    title: 'Tottenham Hotspur',
    description:
      'The official digital platform for Tottenham Hotspur Football Club, providing club news, match fixtures, ticketing, and fan engagement content.',
    url: 'https://www.tottenhamhotspur.com',
    tech: ['React', 'SSR', 'Dynamic Yield'],
  },
  {
    name: 'liv-golf-fantasy',
    title: 'LIV Golf Fantasy',
    description:
      'The official fantasy golf game for LIV Golf, allowing fans to build teams, compete in leagues, and engage with the LIV Golf tournament series.',
    url: 'https://fantasy.livgolf.com',
    tech: ['Next.js', 'Vercel', 'Contentful'],
  },
  {
    name: 'velux',
    title: 'VELUX',
    description:
      'The global digital presence for the VELUX Group, showcasing their range of roof windows, skylights, and daylight solutions for residential and commercial buildings.',
    url: 'https://www.velux.com',
    tech: ['React', 'Sitecore', 'Algolia'],
  },
  {
    name: 'growinco',
    title: 'Growinco.',
    description:
      'A B2B co-manufacturing and sourcing platform for the CPG industry, connecting brands with co-manufacturers, co-packers, and suppliers to facilitate product development and strategic sourcing.',
    url: 'https://growinco.com',
    tech: ['WordPress', 'Elementor', 'HubSpot'],
  },
]
