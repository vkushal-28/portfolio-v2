import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { PulseDot } from './PulseDot'

type Tone = 'muted' | 'accent'

const tones = { muted: 'text-mu2', accent: 'text-ac' } satisfies Record<Tone, string>

export type MonoLabelProps = {
  children: ReactNode
  tone?: Tone
  /** Leading pulsing lime dot. */
  dot?: boolean
  as?: 'span' | 'p' | 'div'
  className?: string
}

/** Uppercase mono label / eyebrow (12px, 0.1em tracking). Also exported as `Eyebrow`. */
export function MonoLabel({
  children,
  tone = 'muted',
  dot = false,
  as: Tag = 'p',
  className,
}: MonoLabelProps) {
  return (
    <Tag
      className={cn(
        'inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.1em] uppercase',
        tones[tone],
        className,
      )}
    >
      {dot && <PulseDot size={6} />}
      {children}
    </Tag>
  )
}
