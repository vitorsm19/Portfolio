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
    id: 'web-design',
    title: 'Website Design & Development',
    subtitle: 'From concept to launch',
    description:
      'Custom-designed, responsive websites built with modern technologies. Pixel-perfect execution that turns visitors into clients.',
    features: [
      'Custom UI/UX design',
      'Responsive across all devices',
      'Performance optimized',
      'SEO-ready architecture',
      'CMS integration',
    ],
    pricing: {
      type: 'fixed',
      amount: 600,
      label: 'Starting from',
    },
    featured: true,
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce',
    subtitle: 'Sell online, scale fast',
    description:
      'Full-featured online stores with seamless checkout, inventory management, and payment integrations that drive revenue from day one.',
    features: [
      'Product catalog & management',
      'Secure payment gateways',
      'Shopping cart & checkout flow',
      'Order tracking & analytics',
      'Multi-currency support',
    ],
    pricing: {
      type: 'fixed',
      amount: 1500,
      label: 'Starting from',
    },
  },
  {
    id: 'complex-systems',
    title: 'Complex Systems',
    subtitle: 'AI, integrations & beyond',
    description:
      'Enterprise-grade applications with AI capabilities, third-party integrations, and custom architectures for problems that don\'t have off-the-shelf solutions.',
    features: [
      'AI & machine learning integration',
      'Custom API development',
      'Third-party system integration',
      'Real-time data processing',
      'Scalable cloud architecture',
    ],
    pricing: {
      type: 'custom',
      amount: 0,
      label: 'Depending on project requirements',
    },
  },
  {
    id: 'full-time',
    title: 'Full-Time Engagement',
    subtitle: 'Your dedicated developer',
    description:
      'Embed me directly into your team for ongoing development, code reviews, architecture decisions, and continuous delivery.',
    features: [
      'Dedicated availability',
      'Daily standups & collaboration',
      'Code reviews & mentoring',
      'Architecture consulting',
      'Flexible commitment',
    ],
    pricing: {
      type: 'hourly',
      amount: 45,
      label: 'Per hour',
    },
  },
]
