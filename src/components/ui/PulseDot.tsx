import { cn } from '@/lib/cn'

export type PulseDotProps = {
  /** Diameter in px. Default 8. */
  size?: number
  /** Any CSS colour. Default the accent. */
  color?: string
  /** Show the ripple. Default true. */
  pulse?: boolean
  className?: string
}

/** Small status dot with a 2s box-shadow ripple. */
export function PulseDot({
  size = 8,
  color = 'var(--color-ac)',
  pulse = true,
  className,
}: PulseDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-block shrink-0 rounded-full bg-current',
        pulse && 'motion-safe:animate-pulse-ring',
        className,
      )}
      style={{ width: size, height: size, color }}
    />
  )
}
