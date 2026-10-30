import { AppWindow, Cloud, Cpu, Database, ShieldCheck } from 'lucide-react'
import type { CoreStackItem, SkillGroup } from './types'

export const skillGroups: readonly SkillGroup[] = [
  {
    name: 'Frontend',
    icon: AppWindow,
    desc: 'Fast, accessible interfaces with modern React, server rendering and smart state management — tuned for Core Web Vitals.',
    items: [
      'React 19',
      'Next.js (SSR/SSG)',
      'TypeScript',
      'Redux',
      'React Query',
      'Tailwind CSS',
      'Material UI',
      'WCAG 2.1 AA',
    ],
  },
  {
    name: 'Backend & Data',
    icon: Database,
    desc: 'Secure RESTful APIs and modular microservices backed by well-modelled, well-indexed data.',
    items: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'Microservices',
      'MongoDB',
      'PostgreSQL',
      'Redis',
    ],
  },
  {
    name: 'Cloud & DevOps',
    icon: Cloud,
    desc: 'Serverless and containerized systems on AWS, shipped through automated, zero-downtime pipelines.',
    items: [
      'AWS Lambda',
      'ECS Fargate',
      'CDK / SAM',
      'Docker',
      'CodePipeline',
      'CloudWatch',
      'CI/CD',
    ],
  },
  {
    name: 'Security & Testing',
    icon: ShieldCheck,
    desc: 'Authentication, authorization and layered test suites that keep high-stakes releases safe.',
    items: [
      'OAuth 2.0',
      'JWT',
      'RBAC',
      'Passport.js',
      'Jest',
      'React Testing Library',
      'Selenium',
      'Supertest',
    ],
  },
  {
    name: 'AI & Workflow',
    icon: Cpu,
    desc: 'AI-accelerated delivery with rigorous human review, run inside collaborative Agile teams.',
    items: [
      'Claude Code',
      'Cursor',
      'GitHub Copilot',
      'Agile / Scrum',
      'Jira',
      'Code Reviews',
      'Mentoring',
    ],
  },
]

/** Every skill, in group order (37 today; derive counts from this, never hard-code). */
export const allSkills: readonly string[] = skillGroups.flatMap((group) => group.items)

export const coreStack: readonly CoreStackItem[] = [
  { name: 'React 19', sub: 'UI architecture' },
  { name: 'Next.js', sub: 'SSR · SSG' },
  { name: 'TypeScript', sub: 'Type-safe at scale' },
  { name: 'Node.js', sub: 'APIs · microservices' },
  { name: 'AWS', sub: 'Cloud-native' },
]
