import { profile } from './profile'

export const hero = {
  eyebrow: `${profile.title} — Portfolio ’26`,
  /** Screen-reader prefix for the role typewriter. */
  rolesLabel: 'Open to roles',
  buildPrefix: 'I build',
  primaryCta: { label: 'View selected work', href: '#work' },
  resumeCta: { label: 'Download résumé', href: profile.resumeUrl },
  /** Shown after the social profile pills. Clicking also copies the address, since mailto: does nothing without a mail app. */
  emailCta: {
    label: 'Email me',
    href: `mailto:${profile.email}`,
    icon: 'email',
    copiedLabel: 'Email copied',
  },
  scrollHint: 'Scroll to explore',
  codeFile: '~/kushal/profile.ts',
  code: [
    'const engineer = {',
    '  name: "Kushal Vala",',
    '  role: "Senior Full Stack Dev",',
    '  based: "Greater Toronto Area, ON",',
    '  experience: "8+ years",',
    '  stack: ["React", "TypeScript", "Next.js", "Node"],',
    '  openToWork: true',
    '};',
  ].join('\n'),
} as const
