import type { ReactNode } from 'react'
import type { TextRun } from '@/data/types'
import { cn } from '@/lib/cn'

type TextProps = { children: ReactNode; className?: string }

/** Lime accent text inside headings. */
export function Accent({ children, className }: TextProps) {
  return <span className={cn('text-ac', className)}>{children}</span>
}

/** Outlined (stroke-only) text inside headings. */
export function Outline({ children, className }: TextProps) {
  return <span className={cn('text-outline', className)}>{children}</span>
}

/** Muted text inside headings. `faint` uses `mu3` (decorative glyphs only). */
export function Muted({
  children,
  tone = 'default',
  className,
}: TextProps & { tone?: 'default' | 'faint' }) {
  return (
    <span className={cn(tone === 'faint' ? 'text-mu3' : 'text-mu', className)}>{children}</span>
  )
}

/** Renders data-driven heading copy (`TextRun[]`) with `Accent` / `Muted`. */
export function RichText({ runs }: { runs: readonly TextRun[] }) {
  return runs.map(({ text, tone }, i) =>
    tone === 'accent' ? (
      <Accent key={i}>{text}</Accent>
    ) : tone === 'muted' ? (
      <Muted key={i}>{text}</Muted>
    ) : (
      text
    ),
  )
}
