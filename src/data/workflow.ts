import { ArrowUp, Code, LayoutGrid, Search, ShieldCheck, Wrench } from 'lucide-react'
import type { WorkflowStep } from './types'

export const workflow: readonly WorkflowStep[] = [
  {
    title: 'Discover',
    icon: Search,
    desc: 'Understand goals, users and constraints with product, UX and business teams.',
    tag: 'Stakeholders',
  },
  {
    title: 'Architect',
    icon: LayoutGrid,
    desc: 'Plan components, APIs, data models, security and performance budgets.',
    tag: 'System design',
  },
  {
    title: 'Build',
    icon: Code,
    desc: 'Ship in focused sprints with typed, modular code — AI-accelerated, human-reviewed.',
    tag: 'Agile · AI-assisted',
  },
  {
    title: 'Test & review',
    icon: ShieldCheck,
    desc: 'Unit, integration and end-to-end tests plus code review before anything merges.',
    tag: 'Jest · RTL · Selenium',
  },
  {
    title: 'Deploy',
    icon: ArrowUp,
    desc: 'Automated pipelines and zero-downtime releases to production.',
    tag: 'CI/CD',
  },
  {
    title: 'Maintain',
    icon: Wrench,
    desc: 'Monitor, fix and keep improving with profiling, upgrades and support.',
    tag: 'CloudWatch',
  },
]
