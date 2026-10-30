import { useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

export type TypewriterOptions = {
  /** Milliseconds before typing starts. Default 1300. */
  startDelay?: number
  /** Random per-character typing delay range, ms. Default 55–90. */
  typeMin?: number
  typeMax?: number
  /** How long a full item stays, ms. Default 1800. */
  hold?: number
  /** Per-character delete delay, ms. Default 24. */
  deleteSpeed?: number
  /** Pause between deleting and typing the next item, ms. Default 350. */
  pause?: number
  /** Reduced motion: swap whole items at this interval, ms. Default 3200. */
  reducedInterval?: number
}

/**
 * Type / hold / delete loop over `items`; returns the text to display.
 * Pass a stable array (e.g. from `src/data`) so the loop isn't restarted every render.
 */
export function useTypewriter(items: readonly string[], options: TypewriterOptions = {}): string {
  const {
    startDelay = 1300,
    typeMin = 55,
    typeMax = 90,
    hold = 1800,
    deleteSpeed = 24,
    pause = 350,
    reducedInterval = 3200,
  } = options
  const reduce = useReducedMotion()
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!reduce || items.length < 2) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % items.length), reducedInterval)
    return () => clearInterval(timer)
  }, [reduce, items, reducedInterval])

  useEffect(() => {
    if (reduce || items.length === 0) return
    let timer: ReturnType<typeof setTimeout>
    let item = 0
    let chars = 0
    let deleting = false

    const tick = () => {
      const word = items[item]
      chars += deleting ? -1 : 1
      setText(word.slice(0, chars))

      if (!deleting && chars === word.length) {
        deleting = true
        timer = setTimeout(tick, hold)
      } else if (deleting && chars === 0) {
        deleting = false
        item = (item + 1) % items.length
        timer = setTimeout(tick, pause)
      } else {
        timer = setTimeout(
          tick,
          deleting ? deleteSpeed : typeMin + Math.random() * (typeMax - typeMin),
        )
      }
    }

    timer = setTimeout(tick, startDelay)
    return () => clearTimeout(timer)
  }, [reduce, items, startDelay, typeMin, typeMax, hold, deleteSpeed, pause])

  return reduce ? (items[index] ?? '') : text
}
