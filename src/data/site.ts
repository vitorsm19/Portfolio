export const siteConfig = {
  name: 'Vitor Mesquita',
  role: 'Senior Frontend Contractor',
  email: 'vitormesquita190902@gmail.com',
  location: 'Barcelona',
  citizenship: 'EU citizen',
  availability: 'Available for new contracts',
  rate: { amount: 60, currency: 'EUR', symbol: '€', unit: '/hr' },
  github: {
    username: 'vitorsm19',
    url: 'https://github.com/vitorsm19/',
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/vitormesquita19/',
  },
  hero: {
    headline: 'Vitor Mesquita',
    roleLine: 'Senior Frontend Engineer',
    lede: 'Six years inside product teams, building React, Next.js and TypeScript products for large European brands.',
    // Qualifying facts, not atmosphere. These are the three things a hiring
    // manager checks before they read anything else.
    rail: [
      { label: 'Based', value: 'Barcelona, remote across Europe' },
      { label: 'Engagements', value: 'Three months and up' },
      { label: 'Status', value: 'Available for new contracts' },
    ],
  },
  about: {
    lede: 'I own the frontend so the team moves faster.',
    body: [
      'Six years inside product teams, most of it on platforms where a bad deploy is visible to millions of people on a Saturday afternoon. Premier League, Tottenham Hotspur, LIV Golf, VELUX.',
      'I ramp up inside your stack and your rituals, then own delivery: architecture, design systems, performance, accessibility, and the small details nobody assigns a ticket to.',
      'Typed, tested, and documented by default. The kind of frontend you stop thinking about once it ships.',
    ],
    facts: [
      { label: 'Experience', value: '6+ years in product teams' },
      { label: 'Engagements', value: '3 months and up' },
      { label: 'Working hours', value: 'European time zones' },
      { label: 'Contract', value: 'Direct or through your agency' },
    ],
  },
  contact: {
    headline: 'Tell me what you are building.',
    body: 'I reply within a day, and I will tell you straight if I am not the right fit for the role.',
    cta: 'Get in touch',
  },
} as const

/** One label per intent, used everywhere on the page. */
export const CTA = {
  contact: 'Get in touch',
  work: 'See the work',
} as const
