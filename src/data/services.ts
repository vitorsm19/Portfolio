export interface Service {
  id: string
  title: string
  subtitle: string
  description: string
  features: string[]
  pricing: {
    type: 'fixed' | 'hourly' | 'custom'
    amount: number
    label: string
  }
  featured?: boolean
}

export const services: Service[] = [
  {
    id: 'dedicated-contractor',
    title: 'Dedicated Frontend Contractor',
    subtitle: 'Embedded in your product team',
    description:
      'Bring me into your team as a Senior Frontend Contractor for React, Next.js, and TypeScript delivery. Ideal for teams that need senior frontend capacity without a long hiring cycle.',
    features: [
      'React / Next.js / TypeScript delivery',
      'Join existing teams quickly',
      'Frontend architecture & code reviews',
      'Reusable components & design systems',
      'Testing, accessibility, performance',
      'Remote Europe availability',
    ],
    pricing: {
      type: 'hourly',
      amount: 45,
      label: 'From',
    },
    featured: true,
  },
  {
    id: 'greenfield',
    title: 'Greenfield Frontend Builds',
    subtitle: 'Production-ready, from zero',
    description:
      'Production-ready frontend applications built from scratch using modern React, Next.js, TypeScript, APIs, and scalable component architecture.',
    features: [
      'Frontend architecture from day one',
      'SSR & API integrations',
      'Design implementation from Figma',
      'Scalable component structure',
      'Testing setup & CI integration',
      'Performance-focused delivery',
    ],
    pricing: {
      type: 'custom',
      amount: 0,
      label: 'Project-based or hourly',
    },
  },
  {
    id: 'rescue-performance',
    title: 'Frontend Rescue & Performance',
    subtitle: 'Stabilize, refactor, ship faster',
    description:
      'For teams with slow, messy, or hard-to-maintain frontend codebases that need senior help to stabilize, refactor, and unblock delivery.',
    features: [
      'Codebase audit',
      'Core Web Vitals & performance',
      'Accessibility fixes (WCAG)',
      'Testing & reliability improvements',
      'Refactoring for maintainability',
      'Developer experience cleanup',
    ],
    pricing: {
      type: 'custom',
      amount: 0,
      label: 'Custom',
    },
  },
  {
    id: 'product-frontends',
    title: 'E-commerce & Product Frontends',
    subtitle: 'High-traffic product UI',
    description:
      'Frontend delivery for e-commerce, SaaS dashboards, sports platforms, and high-traffic product experiences where performance and UX directly drive revenue.',
    features: [
      'E-commerce & checkout flows',
      'CMS integrations (Sitecore, headless)',
      'Analytics & GA4 implementation',
      'Multi-market frontend delivery',
      'SaaS dashboards & data-heavy UI',
      'Conversion-aware UX',
    ],
    pricing: {
      type: 'custom',
      amount: 0,
      label: 'Custom',
    },
  },
]
