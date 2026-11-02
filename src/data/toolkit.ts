import type { TextRun } from './types'

export type TerminalLine = { mark: string; text: string; done?: boolean }

/** Copy for the Skills section. Skill lists themselves live in `skills.ts`. */
export const toolkit = {
  header: { index: '03', label: 'Skills' },
  title: [{ text: 'The toolkit' }, { text: '.', tone: 'accent' }] satisfies TextRun[],
  intro:
    'Tools change; fundamentals don’t. These are what I reach for to ship reliable, maintainable products.',
  explorer: {
    label: 'Skill explorer',
    tools: 'tools',
    domains: 'domains',
    /** Prefixed with the zero-padded count: "08 tools in this domain". */
    perDomain: 'tools in this domain',
    filterLabel: 'Skill domain',
  },
  coreStack: { label: 'Core stack', badge: 'daily drivers' },
  ai: {
    title: [
      { text: 'AI speed. ' },
      { text: 'Human-grade', tone: 'accent' },
      { text: ' review.' },
    ] satisfies TextRun[],
    terminalTitle: 'ai-workflow',
    lines: [
      { mark: '›', text: 'generate — components & test scaffolds' },
      { mark: '›', text: 'refactor — legacy modules, safely' },
      { mark: '›', text: 'review — every AI-written line' },
      { mark: '✓', text: 'ship with confidence', done: true },
    ] satisfies TerminalLine[],
    tools: ['Claude Code', 'Cursor', 'GitHub Copilot'],
  },
} as const
