import { cn } from '@/lib/cn'

export type GlowProps = {
  /** Diameter in px. Default 320. */
  size?: number
  /** Breathe on a slow loop. Default true. */
  pulse?: boolean
  /** Position it, e.g. `-top-24 -right-24`. */
  className?: string
}

/** Soft lime radial glow for card corners. Parent needs `relative overflow-hidden`. */
export function Glow({ size = 320, pulse = true, className }: GlowProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-ac)_22%,transparent),transparent_65%)]',
        pulse && 'motion-safe:animate-glow-pulse',
        className,
      )}
      style={{ width: size, height: size }}
    />
  )
}
