import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import { spring } from '@/components/motion/presets'
import { cn } from '@/lib/cn'

type CardVariant = 'default' | 'raised' | 'bento' | 'dashed'

const variants = {
  default: 'rounded-card border border-ln2 bg-s1',
  raised: 'rounded-card border border-ln2 bg-linear-to-b from-s2 to-bg2',
  bento: 'overflow-hidden rounded-bento border border-ln2 bg-s1',
  dashed: 'rounded-bento border border-dashed border-ln3',
} satisfies Record<CardVariant, string>

const tags = { div: motion.div, article: motion.article, li: motion.li, section: motion.section }

export type CardProps = HTMLMotionProps<'div'> & {
  variant?: CardVariant
  /** Spring lift (y −6) and stronger border on hover. */
  hoverLift?: boolean
  as?: keyof typeof tags
}

/** Surface container for every card in the site. */
export function Card({
  variant = 'default',
  hoverLift = false,
  as = 'div',
  className,
  ...rest
}: CardProps) {
  const reduce = useReducedMotion()
  const Tag = tags[as] as typeof motion.div
  const lift = hoverLift && !reduce ? { whileHover: { y: -6 }, transition: spring } : {}

  return (
    <Tag
      className={cn(
        'relative',
        variants[variant],
        hoverLift && 'transition-[border-color,box-shadow] duration-500 hover:border-ln4',
        className,
      )}
      {...lift}
      {...rest}
    />
  )
}
