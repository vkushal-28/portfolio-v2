import { profile } from './profile'

export const hero = {
  eyebrow: `${profile.title} — Portfolio ’26`,
  /** Screen-reader prefix for the role typewriter. */
  rolesLabel: 'Open to roles',
  buildPrefix: 'I build',
  primaryCta: { label: 'View selected work', href: '#work' },
  resumeCta: { label: 'Download résumé', href: profile.resumeUrl },
  scrollHint: 'Scroll to explore',
  codeFile: '~/kushal/profile.ts',
  code: [
    'const engineer = {',
    '  name: "Kushal Vala",',
    '  role: "Senior Full Stack Dev",',
    '  based: "Calgary, AB",',
    '  experience: "8+ years",',
    '  stack: ["React", "Next.js", "Node"],',
    '  openToWork: true',
    '};',
  ].join('\n'),
} as const
