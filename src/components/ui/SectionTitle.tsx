import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'
import { headingIn, viewportOnce, withDelay } from '@/components/motion/presets'
import { cn } from '@/lib/cn'

type TitleSize = 'lg' | 'xl' | 'display'

const sizes = {
  lg: 'text-[clamp(30px,3.6vw,48px)] leading-[1.05] font-semibold tracking-[-0.045em]',
  xl: 'text-[clamp(40px,5.5vw,76px)] leading-none font-semibold tracking-[-0.05em]',
  display: 'text-[clamp(52px,9vw,140px)] leading-[0.92] font-bold tracking-[-0.055em]',
} satisfies Record<TitleSize, string>

const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3 }

export type SectionTitleProps = Omit<
  HTMLMotionProps<'h2'>,
  'children' | 'variants' | 'initial' | 'whileInView'
> & {
  as?: keyof typeof tags
  /** `lg` sub-heading, `xl` section H2, `display` contact headline. */
  size?: TitleSize
  /** Seconds after entering view. */
  delay?: number
  /** Compose with `Accent`, `Outline` and `Muted`. */
  children: ReactNode
}

/** Display heading that reveals with `headingIn`. */
export function SectionTitle({
  as = 'h2',
  size = 'xl',
  delay = 0,
  className,
  children,
  ...rest
}: SectionTitleProps) {
  const reduce = useReducedMotion()
  const Tag = tags[as]
  return (
    <Tag
      variants={withDelay(headingIn, delay)}
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={viewportOnce}
      className={cn('text-balance text-tx', sizes[size], className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
