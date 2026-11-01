import { projectCategories, type ProjectCategory } from './types'

export type WorkFilter = 'All' | ProjectCategory

/** Copy for the Projects section. Project content lives in `projects.ts`. */
export const work = {
  header: { index: '05', label: 'Selected work' },
  title: 'Projects',
  filters: [
    { value: 'All', label: 'All' },
    ...projectCategories.map((cat) => ({ value: cat, label: cat })),
  ] satisfies { value: WorkFilter; label: string }[],
  filterLabel: 'Filter projects',
  caseStudyLabel: 'Open case study',
  liveLabel: 'Live',
  codeLabel: 'Code',
  screenshotPlaceholder: '[ screenshot ]',
}
