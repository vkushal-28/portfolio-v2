import type { Profile } from './types'

export const profile: Profile = {
  name: 'Kushal Vala',
  initials: 'kv',
  title: 'Senior Full Stack Developer',
  location: 'Calgary, AB',
  timezone: 'Mountain Time',
  headline:
    '8+ years architecting secure, high-performance web platforms across banking, energy and enterprise — with React, Next.js, TypeScript, Node.js and AWS, accelerated by AI-assisted development.',
  openToRoles: ['Sr. Full Stack Engineer', 'Sr. Front End Engineer', 'Sr. React Developer'],
  rotatingWords: [
    'secure banking platforms',
    'scalable microservices',
    'fast, accessible UIs',
    'cloud-native systems',
  ],
  currently: 'Full Stack Developer @ Enbridge',
  about: [
    'Senior Full Stack Developer with 8+ years building secure, high-performance platforms for banking, energy and enterprise teams — from real-time digital banking dashboards at CIBC to enterprise applications at Enbridge. I specialize in scalable frontend architecture, Node.js microservices and OAuth 2.0 / JWT / RBAC security.',
    'I use AI coding tools — GitHub Copilot, Cursor and Claude Code — to ship faster while holding every line to a rigorous review bar. I mentor developers, drive code reviews and Agile delivery, and partner closely with product, UX, QA and business stakeholders.',
  ],
  aboutStatement: [
    { text: 'I turn ambiguous problems into ' },
    { text: 'calm, well-crafted software', tone: 'accent' },
    { text: ' — from first sketch to production at scale.', tone: 'muted' },
  ],
  facts: [
    { label: 'Based in', value: 'Calgary, AB' },
    { label: 'Focus', value: 'Full-stack · Security' },
    { label: 'Experience', value: '8+ years' },
    { label: 'Domains', value: 'Banking · Energy' },
  ],
  stats: [
    { value: 35, suffix: '%', label: 'higher API throughput' },
    { value: 30, suffix: '%', label: 'faster page loads' },
    { value: 50, suffix: '%', label: 'faster release cycles' },
    { value: 50, suffix: 'K+', label: 'daily transactions handled' },
  ],
  marquee: [
    'Microservices',
    'Full-Stack Engineering',
    'AWS Cloud',
    'Performance',
    'AI-Assisted Development',
    'OAuth · JWT · RBAC',
  ],
  // PLACEHOLDER: replace with your real address.
  email: '[you@yourdomain.com]',
  // PLACEHOLDER: add the file at public/resume.pdf.
  resumeUrl: '/resume.pdf',
  // PLACEHOLDER: set to an imported image (e.g. src/assets/portrait.jpg) when available.
  portrait: undefined,
}
