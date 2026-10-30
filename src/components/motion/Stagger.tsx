import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import { revealVariants, stagger, viewportOnce, type RevealVariant } from './presets'

const containerTags = { div: motion.div, ul: motion.ul, ol: motion.ol }
const itemTags = { div: motion.div, li: motion.li, article: motion.article }

export type StaggerProps = Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'whileInView'> & {
  /** Seconds between children. Default 0.08. */
  step?: number
  /** Seconds before the first child. */
  delay?: number
  as?: keyof typeof containerTags
}

/** Reveals its `StaggerItem` children one after another once in view. */
export function Stagger({ step = 0.08, delay = 0, as = 'div', viewport, ...rest }: StaggerProps) {
  const reduce = useReducedMotion()
  const Tag = containerTags[as] as typeof motion.div
  return (
    <Tag
      variants={stagger(step, delay)}
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ ...viewportOnce, ...viewport }}
      {...rest}
    />
  )
}

export type StaggerItemProps = Omit<HTMLMotionProps<'div'>, 'variants'> & {
  /** Animation preset. Default `fadeUp`. */
  variant?: RevealVariant
  as?: keyof typeof itemTags
}

/** A child of `Stagger`; inherits its timing. */
export function StaggerItem({ variant = 'fadeUp', as = 'div', ...rest }: StaggerItemProps) {
  const Tag = itemTags[as] as typeof motion.div
  return <Tag variants={revealVariants[variant]} {...rest} />
}
