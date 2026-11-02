import { useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type MarqueeProps = {
  children: ReactNode
  /** Seconds per loop. Default 32. */
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  /** Fade both edges with a horizontal mask. */
  fadeEdges?: boolean
  /** Pixels between items (and between the two copies). Default 32. */
  gap?: number
  className?: string
}

/** Infinite horizontal scroll. Decorative: hidden from assistive tech. */
export function Marquee({
  children,
  speed = 32,
  direction = 'left',
  pauseOnHover = true,
  fadeEdges = false,
  gap = 32,
  className,
}: MarqueeProps) {
  const reduce = useReducedMotion()
  const group = (
    <div className="flex shrink-0 items-center" style={{ gap, paddingRight: gap }}>
      {children}
    </div>
  )

  return (
    <div
      aria-hidden="true"
      className={cn(
        'group flex overflow-hidden',
        fadeEdges &&
          '[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        className,
      )}
    >
      <div
        className={cn(
          'flex w-max',
          !reduce && 'animate-marquee will-change-transform',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
        )}
        style={
          reduce
            ? undefined
            : {
                animationDuration: `${speed}s`,
                animationDirection: direction === 'right' ? 'reverse' : 'normal',
              }
        }
      >
        {group}
        {group}
      </div>
    </div>
  )
}
