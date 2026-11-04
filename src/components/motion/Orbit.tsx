import { motion, useReducedMotion, type Transition } from 'motion/react'
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
  /** Dashed ring instead of solid. */
  dashed?: boolean
  /** Seconds before the ring and its items enter. Default 0.3. */
  delay?: number
  className?: string
}

const ENTER_EASE = [0.16, 1, 0.3, 1] as const
const POP_EASE = [0.34, 1.56, 0.64, 1] as const

/** A rotating ring whose items pop in, bob gently and counter-rotate to stay upright. Decorative. */
export function Orbit({
  items,
  size,
  duration = 60,
  reverse = false,
  dashed = false,
  delay = 0.3,
  className,
}: OrbitProps) {
  const reduce = useReducedMotion()
  const radius = size / 2
  const turn = reverse ? -360 : 360
  const spin: Transition = { duration, ease: 'linear', repeat: Infinity }

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        'pointer-events-none relative rounded-full border border-ln4',
        dashed && 'border-dashed',
        className,
      )}
      style={{ width: size, height: size }}
      initial={reduce ? false : { opacity: 0, scale: 0.85, rotate: 0 }}
      animate={reduce ? undefined : { opacity: 1, scale: 1, rotate: turn }}
      transition={{
        opacity: { duration: 1.2, ease: ENTER_EASE, delay },
        scale: { duration: 1.4, ease: ENTER_EASE, delay },
        rotate: spin,
      }}
    >
      {items.map((item, i) => (
        <div
          key={item.id}
          className="absolute top-1/2 left-1/2"
          style={{
            transform: `rotate(${item.angle}deg) translateX(${radius}px) rotate(${-item.angle}deg)`,
          }}
        >
          <div className="-translate-x-1/2 -translate-y-1/2">
            {/* Counter-rotation keeps the item upright while the ring spins. */}
            <motion.div
              initial={reduce ? false : { rotate: 0 }}
              animate={reduce ? undefined : { rotate: -turn }}
              transition={spin}
            >
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.3, filter: 'blur(6px)' }}
                animate={
                  reduce ? undefined : { opacity: 1, scale: 1, filter: 'blur(0px)', y: [0, -7, 0] }
                }
                transition={{
                  default: { duration: 0.8, ease: POP_EASE, delay: delay + 0.2 + i * 0.12 },
                  filter: { duration: 0.6, delay: delay + 0.2 + i * 0.12 },
                  y: {
                    duration: 4.5,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    delay: delay + 1 + i * 0.7,
                  },
                }}
              >
                {item.content}
              </motion.div>
            </motion.div>
          </div>
        </div>
      ))}
    </motion.div>
  )
}
