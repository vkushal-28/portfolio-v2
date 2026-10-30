import { useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type OrbitItem = {
  id: string
  /** Degrees, clockwise from 3 o'clock. */
  angle: number
  content: ReactNode
}

export type OrbitProps = {
  items: readonly OrbitItem[]
  /** Ring diameter in px. */
  size: number
  /** Seconds per revolution. Default 60. */
  duration?: number
  /** Rotate counter-clockwise. */
  reverse?: boolean
  /** Dashed `ln3` ring instead of solid `ln1`. */
  dashed?: boolean
  className?: string
}

/** A rotating ring whose items counter-rotate to stay upright. Decorative. */
export function Orbit({
  items,
  size,
  duration = 60,
  reverse = false,
  dashed = false,
  className,
}: OrbitProps) {
  const reduce = useReducedMotion()
  const spin = (dir: boolean) =>
    reduce
      ? undefined
      : { animationDuration: `${duration}s`, animationDirection: dir ? 'reverse' : 'normal' }
  const radius = size / 2

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none relative rounded-full border',
        dashed ? 'border-dashed border-ln3' : 'border-ln1',
        !reduce && 'animate-orbit',
        className,
      )}
      style={{ width: size, height: size, ...spin(reverse) }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute top-1/2 left-1/2"
          style={{
            transform: `rotate(${item.angle}deg) translateX(${radius}px) rotate(${-item.angle}deg)`,
          }}
        >
          <div className="-translate-x-1/2 -translate-y-1/2">
            <div className={cn(!reduce && 'animate-orbit')} style={spin(!reverse)}>
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
