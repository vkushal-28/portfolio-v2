import type { ExperienceType, TextRun } from './types'

export type JourneyFilter = 'All' | ExperienceType

export const journey = {
  header: { index: '02', label: 'Journey' },
  title: [
    { text: 'Experience ' },
    { text: '&', tone: 'faint' },
    { text: ' education' },
  ] satisfies TextRun[],
  filters: [
    { value: 'All', label: 'All' },
    { value: 'Experience', label: 'Experience' },
    { value: 'Education', label: 'Education' },
  ] satisfies { value: JourneyFilter; label: string }[],
  filterLabel: 'Filter milestones',
  logCommand: 'git log --journey',
  /** Count is prefixed: "06 milestones". */
  logCount: 'milestones',
  logHint: 'scroll to travel ↓',
  chapterLabel: 'Chapter',
  commitLabel: 'commit',
  nowLabel: 'Now',
  nextChapter: { label: 'Next chapter — with you?', href: '#contact' },
} as const
