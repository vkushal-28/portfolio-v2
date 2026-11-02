import { useReducedMotion } from 'motion/react'
import { cn } from '@/lib/cn'

export type ScanLightProps = {
  /** Seconds per sweep. Default 4. */
  duration?: number
  className?: string
}

/** Looping lime light band sweeping top to bottom over its parent (`relative overflow-hidden`). */
export function ScanLight({ duration = 4, className }: ScanLightProps) {
  const reduce = useReducedMotion()
  if (reduce) return null

  return (
    <span
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 animate-scan', className)}
      style={{
        animationDuration: `${duration}s`,
        backgroundImage:
          'linear-gradient(to bottom, transparent 35%, color-mix(in srgb, var(--color-ac) 9%, transparent) 49.6%, color-mix(in srgb, var(--color-ac) 45%, transparent) 50%, transparent 50.4%)',
      }}
    />
  )
}
