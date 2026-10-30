import type { Transition, Variants } from 'motion/react'

export const ease = [0.16, 1, 0.3, 1] as const // expo-out
export const spring = {
  type: 'spring',
  stiffness: 140,
  damping: 18,
  mass: 0.9,
} as const satisfies Transition
export const softSpring = {
  type: 'spring',
  stiffness: 90,
  damping: 20,
} as const satisfies Transition

export const fadeUp = {
  hidden: { opacity: 0, y: 48, scale: 0.97, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 1.1, ease } },
} satisfies Variants

export const headingIn = {
  hidden: { opacity: 0, y: 70, skewY: 3, clipPath: 'inset(0 0 100% 0)' },
  show: {
    opacity: 1,
    y: 0,
    skewY: 0,
    clipPath: 'inset(-10% -10% -20% -10%)',
    transition: { duration: 1.2, ease },
  },
} satisfies Variants

export const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease } },
} satisfies Variants

export const slideLeft = {
  hidden: { opacity: 0, x: -90, rotate: -3 },
  show: { opacity: 1, x: 0, rotate: 0, transition: spring },
} satisfies Variants

export const slideRight = {
  hidden: { opacity: 0, x: 90, rotate: 3 },
  show: { opacity: 1, x: 0, rotate: 0, transition: spring },
} satisfies Variants

export const stagger = (step = 0.08, delay = 0) =>
  ({
    hidden: {},
    show: { transition: { staggerChildren: step, delayChildren: delay } },
  }) satisfies Variants

export type RevealVariant = 'fadeUp' | 'heading' | 'fade' | 'slideLeft' | 'slideRight'

export const revealVariants = {
  fadeUp,
  heading: headingIn,
  fade,
  slideLeft,
  slideRight,
} satisfies Record<RevealVariant, Variants>

export const viewportOnce = { once: true, amount: 0.15, margin: '0px 0px -6% 0px' } as const

/** Returns a copy of `variants` whose `show` transition starts after `delay` seconds. */
export function withDelay(variants: Variants, delay: number): Variants {
  const show = variants.show
  if (!delay || !show || typeof show === 'function') return variants
  return { ...variants, show: { ...show, transition: { ...show.transition, delay } } }
}
