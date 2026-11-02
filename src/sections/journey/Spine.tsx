import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import type { RefObject } from 'react'

type SpineProps = {
  /** The milestone list; the lime fill tracks scrolling through it. */
  listRef: RefObject<HTMLElement | null>
}

const comets = [0, 3]

/** Timeline spine: flowing dashes, scroll-driven lime fill and two travelling comets. */
export function Spine({ listRef }: SpineProps) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 80%', 'end 40%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-5 left-[28px] w-10 -translate-x-1/2 overflow-hidden md:left-1/2"
    >
      <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,var(--color-ln4)_0_10px,transparent_10px_24px)] motion-safe:animate-dash-flow" />
      <motion.span
        className="absolute inset-y-0 left-1/2 w-0.5 origin-top -translate-x-1/2 bg-linear-to-b from-ac to-ac2 shadow-glow-sm"
        style={{ scaleY: reduce ? 1 : fill }}
      />
      {/* Each comet rides a spine-height layer that slides down by its own height (transform only). */}
      {comets.map((delay) => (
        <span
          key={delay}
          className="absolute inset-0 hidden will-change-transform motion-safe:block motion-safe:animate-comet"
          style={{ animationDelay: `${delay}s` }}
        >
          <span className="absolute -top-40 left-1/2 h-40 w-2.5 -translate-x-1/2 rounded-full bg-linear-to-b from-transparent to-ac drop-shadow-[0_0_8px_var(--color-ac)]" />
        </span>
      ))}
    </div>
  )
}
