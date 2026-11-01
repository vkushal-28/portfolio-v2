import { cn } from '@/lib/cn'

export type GlowProps = {
  /** Diameter in px. Default 320. */
  size?: number
  /** `pulse` breathes (6s), `drift` wanders ±30/20px (14s), `none` stays still. Default `pulse`. */
  motion?: 'pulse' | 'drift' | 'none'
  /** Glow strength (% lime at the centre). Default 22. */
  strength?: number
  /** Position it, e.g. `-top-24 -right-24`. */
  className?: string
}

/** Soft lime radial glow for card corners. Parent needs `relative overflow-hidden`. */
export function Glow({ size = 320, motion = 'pulse', strength = 22, className }: GlowProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute rounded-full',
        motion === 'pulse' && 'motion-safe:animate-glow-pulse',
        motion === 'drift' && 'motion-safe:animate-drift',
        className,
      )}
      style={{
        width: size,
        height: size,
        backgroundImage: `radial-gradient(circle, color-mix(in srgb, var(--color-ac) ${strength}%, transparent), transparent 65%)`,
      }}
    />
  )
}
