import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'

/** 2px lime page-progress bar; place inside a `relative` container (the navbar). */
export function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -bottom-px h-[2px] origin-left bg-linear-to-r from-ac to-ac2 shadow-[0_0_12px_color-mix(in_srgb,var(--color-ac)_55%,transparent)]"
      style={{ scaleX: reduce ? scrollYProgress : smoothProgress }}
    />
  )
}
