import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import { revealVariants, viewportOnce, withDelay, type RevealVariant } from './presets'

export type RevealProps = Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'whileInView'> & {
  /** Animation preset. Default `fadeUp`. */
  variant?: RevealVariant
  /** Seconds to wait after entering the viewport. */
  delay?: number
}

/** Plays a reveal preset once when scrolled into view. Renders the final state under reduced motion. */
export function Reveal({ variant = 'fadeUp', delay = 0, viewport, ...rest }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      variants={withDelay(revealVariants[variant], delay)}
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ ...viewportOnce, ...viewport }}
      {...rest}
    />
  )
}
