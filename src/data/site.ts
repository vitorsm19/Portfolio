export const siteConfig = {
  name: 'Vitor Mesquita',
  title: 'Frontend Developer',
  email: 'vitormesquita190902@gmail.com',
  phone: '+34 614 08 82 64',
  location: 'Spain',
  citizenship: 'EU Citizen',
  github: {
    username: 'vitorsm19',
    url: 'https://github.com/vitorsm19/',
    apiUrl: 'https://api.github.com/users/vitorsm19/repos',
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/vitormesquita19/',
  },
  about: {
    paragraphs: [
      "I'm a detail-oriented developer, always bringing a unique perspective to the team.",
      'Self-starter and a fast learner, looking for a position where I can continue to grow as a developer.',
    ],
  },
  hero: {
    greeting: "Hey, I'm Vitor Mesquita",
    headingTop: 'FRONTEND',
    headingBottom: 'DEVELOPER',
    typewriterWords: ['responsive', 'interactive', 'user-friendly', 'intuitive', 'pixel-perfect'],
    tagline: 'Creative dev with a passion for building beautiful and',
    taglineSuffix: 'web applications',
  },
  contact: {
    heading: 'Are you hiring?',
    body: "I'm ready to join the team! Let's chat about how I can bring my skills to the table!",
  },
} as const
