import { cn } from '@/lib/cn'

export type OrbitRingProps = {
  /** Seconds per turn. Default 8. */
  duration?: number
  /** Distance outside the parent in px. Default 10. */
  inset?: number
  className?: string
}

/** Dashed ring around a `relative` round parent, rotating with a glowing lime dot. */
export function OrbitRing({ duration = 8, inset = 10, className }: OrbitRingProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute rounded-full border border-dashed border-ln4 motion-safe:animate-orbit',
        className,
      )}
      style={{ inset: -inset, animationDuration: `${duration}s` }}
    >
      <span className="absolute -top-[3px] left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-ac shadow-[0_0_10px_2px_color-mix(in_srgb,var(--color-ac)_70%,transparent)]" />
    </span>
  )
}
