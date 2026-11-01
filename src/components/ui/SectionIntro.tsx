import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/cn'

export type SectionIntroProps = {
  /** Usually a `SectionTitle`. */
  title: ReactNode
  /** Right-hand paragraph or control (e.g. `FilterTabs`). Strings render as a muted paragraph. */
  aside?: ReactNode
  className?: string
}

/** Section title with a paragraph or control beside it; wraps under it on narrow screens. */
export function SectionIntro({ title, aside, className }: SectionIntroProps) {
  return (
    <div className={cn('flex flex-wrap items-end justify-between gap-x-12 gap-y-6', className)}>
      {title}
      {aside && (
        <Reveal delay={0.1} className="max-w-md">
          {typeof aside === 'string' ? (
            <p className="text-base leading-relaxed text-mu md:text-lg">{aside}</p>
          ) : (
            aside
          )}
        </Reveal>
      )}
    </div>
  )
}
