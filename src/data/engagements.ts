export interface Engagement {
  id: string
  title: string
  summary: string
  points: string[]
  /** The lead offer. Rendered as the solid accent cell in the grid. */
  lead?: boolean
}

export const engagements: Engagement[] = [
  {
    id: 'embedded',
    lead: true,
    title: 'Embedded in your team',
    summary:
      'Senior frontend capacity without a hiring cycle. I work inside your repo, your board, and your standups, the way an employee would.',
    points: [
      'React, Next.js and TypeScript delivery',
      'Architecture calls and code review',
      'Design systems and shared components',
      'Testing, accessibility and performance',
    ],
  },
  {
    id: 'greenfield',
    title: 'Greenfield builds',
    summary:
      'A production frontend from an empty repo: architecture, component structure, CI, and the first release.',
    points: ['Frontend architecture from day one', 'Figma to production interfaces', 'SSR and API integration'],
  },
  {
    id: 'rescue',
    title: 'Rescue and performance',
    summary:
      'For a codebase that has become slow, brittle, or frightening to touch. Audit first, then fix in priority order.',
    points: ['Core Web Vitals and load performance', 'Accessibility remediation', 'Refactoring for maintainability'],
  },
  {
    id: 'commerce',
    title: 'Commerce and product UI',
    summary:
      'High-traffic surfaces where the frontend is the revenue: checkout flows, dashboards, and multi-market storefronts.',
    points: ['Checkout and commerce flows', 'Headless and Sitecore CMS', 'Multi-market delivery, GA4'],
  },
]

/** How an engagement actually starts. Four beats, no ceremony. */
export const process: { title: string; body: string }[] = [
  {
    title: 'A short call',
    body: 'Twenty minutes on the role, the team, the stack and the timeline. No pitch. We both find out whether this is a match.',
  },
  {
    title: 'Scope in writing',
    body: 'Engagement type, start date, weekly hours and what I am accountable for, agreed before anything is signed.',
  },
  {
    title: 'Contract and ramp-up',
    body: 'A straightforward contract, an NDA if you need one, then access to the repo and a fast ramp inside your tools.',
  },
  {
    title: 'Delivery in the open',
    body: 'Tickets, PRs, reviews, standups, and a weekly written update. You always know where the work stands.',
  },
]
