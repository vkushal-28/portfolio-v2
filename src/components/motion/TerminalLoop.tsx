import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type TerminalLoopProps = {
  lines: readonly ReactNode[]
  /** Seconds per full cycle. Default 10. */
  duration?: number
  /** Seconds between line starts. Default 0.9. */
  stagger?: number
  /** Seconds each line takes to type in. Default 0.7. */
  typeTime?: number
  /** Thin lime bar that fills across each cycle. Default true. */
  progress?: boolean
  className?: string
}

const HIDDEN = 'inset(0 100% 0 0)'
const SHOWN = 'inset(0 0% 0 0)'

/**
 * Lines type in one after another, hold, fade out together and restart. Starts once in view.
 * Screen readers get every line as plain text; reduced motion shows them all statically.
 */
export function TerminalLoop({
  lines,
  duration = 10,
  stagger = 0.9,
  typeTime = 0.7,
  progress = true,
  className,
}: TerminalLoopProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const play = inView && !reduce
  const fadeAt = 0.86
  const goneAt = 0.94

  return (
    <div ref={ref} className={className}>
      <ul className="flex flex-col gap-2">
        {lines.map((line, i) => {
          const start = (i * stagger) / duration
          const typed = start + typeTime / duration
          return (
            <motion.li
              key={i}
              className="sm:whitespace-nowrap"
              initial={reduce ? false : { clipPath: HIDDEN, opacity: 1 }}
              animate={
                play
                  ? {
                      clipPath: [HIDDEN, HIDDEN, SHOWN, SHOWN, SHOWN, HIDDEN],
                      opacity: [1, 1, 1, 1, 0, 0],
                    }
                  : undefined
              }
              transition={{
                duration,
                times: [0, start, typed, fadeAt, goneAt, 1],
                ease: 'linear',
                repeat: Infinity,
              }}
            >
              {line}
            </motion.li>
          )
        })}
      </ul>
      {progress && (
        <div aria-hidden="true" className="mt-5 h-[3px] overflow-hidden rounded-full bg-ln2">
          <motion.div
            className={cn('h-full origin-left rounded-full bg-ac', reduce && 'scale-x-100')}
            initial={reduce ? false : { scaleX: 0 }}
            animate={play ? { scaleX: [0, 1] } : undefined}
            transition={{ duration, ease: 'linear', repeat: Infinity }}
          />
        </div>
      )}
    </div>
  )
}
