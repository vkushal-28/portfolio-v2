import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'

type GridVariant = 'lines' | 'dots'

const images = {
  lines:
    'linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)',
  dots: 'radial-gradient(circle, var(--grid-color) 1px, transparent 1.5px)',
} satisfies Record<GridVariant, string>

export type GridPatternProps = {
  /** `lines` square grid or `dots` dot grid. */
  variant?: GridVariant
  /** Cell size in px. Default 48. */
  size?: number
  /** CSS colour of the lines/dots. Default `ln1`. */
  color?: string
  /** Pan diagonally by one cell on a 6s loop. */
  animated?: boolean
  /** CSS mask-image, e.g. a radial fade. */
  mask?: string
  className?: string
}

/** Decorative background grid filling its `relative` parent. */
export function GridPattern({
  variant = 'lines',
  size = 48,
  color = 'var(--color-ln1)',
  animated = false,
  mask,
  className,
}: GridPatternProps) {
  const style: CSSProperties & Record<'--grid-size' | '--grid-color', string> = {
    '--grid-size': `${size}px`,
    '--grid-color': color,
    backgroundImage: images[variant],
    backgroundSize: `${size}px ${size}px`,
    maskImage: mask,
    WebkitMaskImage: mask,
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0',
        animated && 'motion-safe:animate-grid-pan',
        className,
      )}
      style={style}
    />
  )
}
