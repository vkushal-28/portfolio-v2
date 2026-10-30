import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type BadgeTone = 'accent' | 'info' | 'neutral'

const tones = {
  accent: 'bg-ac text-bg',
  info: 'bg-info-bg text-info',
  neutral: 'border border-ln3 bg-s3 text-tx2',
} satisfies Record<BadgeTone, string>

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone
  /** Leading dot in the text colour. */
  dot?: boolean
}

/** Compact mono status/category pill. */
export function Badge({ tone = 'neutral', dot = false, className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-xs leading-none font-medium tracking-[0.06em] uppercase',
        tones[tone],
        className,
      )}
      {...rest}
    >
      {dot && <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}
