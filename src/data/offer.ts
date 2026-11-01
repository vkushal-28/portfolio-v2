import type { TextRun } from './types'

/** Copy for the Services section. Service and workflow content lives in `services.ts` / `workflow.ts`. */
export const offer = {
  header: { index: '04', label: 'Services' },
  title: [
    { text: 'What I ' },
    { text: 'offer', tone: 'outline' },
    { text: '.', tone: 'accent' },
  ] satisfies TextRun[],
  intro:
    'Seven ways I help teams ship and keep shipping — each one backed by results from banking, energy and enterprise platforms.',
  listLabel: 'Services',
  detail: {
    service: 'Service',
    deliverLabel: 'What you get',
    provenAt: 'proven at',
  },
  workflow: {
    label: 'Workflow',
    title: [{ text: 'How I work' }, { text: '.', tone: 'accent' }] satisfies TextRun[],
    intro:
      'A clear, repeatable process from first conversation to long-term support — so there are no surprises.',
    stepLabel: 'Step',
  },
  cta: {
    lead: 'Need one of these on your team?',
    rest: ' Let’s talk about what you’re building.',
    button: { label: 'Start a conversation', href: '#contact' },
  },
} as const
