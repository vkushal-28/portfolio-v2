import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { ease } from './presets'

export type RollingTextProps = {
  words: readonly string[]
  /** Milliseconds each word is shown. Default 4000. */
  interval?: number
  /** Screen-reader text. Defaults to all words joined. */
  srLabel?: string
  className?: string
}

/** Rolls vertically through `words` inside a 1.2em overflow-hidden slot. */
export function RollingText({ words, interval = 4000, srLabel, className }: RollingTextProps) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (words.length < 2) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <span className={cn('relative inline-flex h-[1.2em] overflow-hidden align-bottom', className)}>
      <span className="sr-only">{srLabel ?? words.join(', ')}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={index}
          aria-hidden="true"
          className="inline-block leading-[1.2em] whitespace-nowrap"
          initial={{ y: reduce ? 0 : '100%' }}
          animate={{ y: 0 }}
          exit={{ y: reduce ? 0 : '-100%' }}
          transition={{ duration: reduce ? 0 : 0.6, ease }}
        >
          {words[index % words.length]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
