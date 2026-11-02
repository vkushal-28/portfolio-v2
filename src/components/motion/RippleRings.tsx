import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'

export type RippleRingsProps = {
  /** Number of rings, evenly offset across one loop. Default 2. */
  count?: number
  /** Seconds per loop. Default 2.6. */
  duration?: number
  className?: string
}

/** Rings that expand to 2.2× and fade, filling a `relative` round parent. Off under reduced motion. */
export function RippleRings({ count = 2, duration = 2.6, className }: RippleRingsProps) {
  return Array.from({ length: count }, (_, i) => {
    const style: CSSProperties = {
      animationDuration: `${duration}s`,
      animationDelay: `${(duration / count) * i}s`,
    }
    return (
      <span
        key={i}
        aria-hidden="true"
        style={style}
        className={cn(
          'pointer-events-none absolute inset-0 hidden rounded-full border border-ac/60 motion-safe:block motion-safe:animate-ripple',
          className,
        )}
      />
    )
  })
}
