import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { spring } from './presets'

export type MaskRevealProps = {
  children: ReactNode
  /** Seconds after mount. */
  delay?: number
  className?: string
}

/** Content rises from below (y 110%) inside an overflow-hidden mask, on mount. */
export function MaskReveal({ children, delay = 0, className }: MaskRevealProps) {
  const reduce = useReducedMotion()
  return (
    <span className={cn('inline-block overflow-hidden px-[0.04em] pb-[0.1em] align-bottom', className)}>
      <motion.span
        className="inline-block"
        initial={reduce ? false : { y: '110%' }}
        animate={{ y: 0 }}
        transition={{ ...spring, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}
