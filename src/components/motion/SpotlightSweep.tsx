import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/cn'
import { ease } from './presets'

export type SpotlightSweepProps = {
  /** Seconds after entering view. */
  delay?: number
  /** Seconds. Default 1.6. */
  duration?: number
  className?: string
}

/** One-time lime light sweep across its parent (which needs `relative overflow-hidden`). */
export function SpotlightSweep({ delay = 0, duration = 1.6, className }: SpotlightSweepProps) {
  const reduce = useReducedMotion()
  if (reduce) return null

  return (
    <motion.span
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 z-10', className)}
      style={{
        backgroundImage:
          'linear-gradient(110deg, transparent 30%, color-mix(in srgb, var(--color-ac) 14%, transparent) 50%, transparent 70%)',
      }}
      initial={{ x: '-100%' }}
      whileInView={{ x: '100%' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, ease }}
    />
  )
}
