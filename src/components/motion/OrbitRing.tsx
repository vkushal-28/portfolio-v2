import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/cn'

export type OrbitRingProps = {
  /** Seconds per turn. Default 8. */
  duration?: number
  /** Distance outside the parent in px. Default 1. */
  inset?: number
  className?: string
}

/** Dashed ring around a `relative` round parent, rotating with a glowing, pulsing lime dot. */
export function OrbitRing({ duration = 8, inset = 1, className }: OrbitRingProps) {
  const reduce = useReducedMotion()

  return (
    <motion.span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute rounded-full border border-dashed border-ln4',
        className,
      )}
      style={{ inset: -inset }}
      initial={reduce ? false : { rotate: 0 }}
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration, ease: 'linear', repeat: Infinity }}
    >
      <motion.span
        className="absolute -top-0.75 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-ac shadow-glow"
        animate={reduce ? undefined : { scale: [1, 1.6, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
      />
    </motion.span>
  )
}
