import type { ReactNode } from 'react'
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
