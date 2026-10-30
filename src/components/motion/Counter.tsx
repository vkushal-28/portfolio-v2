import { animate, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useInViewOnce } from '@/hooks/useInViewOnce'
import { ease } from './presets'

export type CounterProps = {
  to: number
  from?: number
  prefix?: string
  suffix?: string
  /** Seconds. Default 1.8. */
  duration?: number
  /** Seconds after entering view. */
  delay?: number
  decimals?: number
  className?: string
}

/** Counts from `from` to `to` once in view. Screen readers get the final value only. */
export function Counter({
  to,
  from = 0,
  prefix = '',
  suffix = '',
  duration = 1.8,
  delay = 0,
  decimals = 0,
  className,
}: CounterProps) {
  const reduce = useReducedMotion()
  const [ref, inView] = useInViewOnce<HTMLSpanElement>({ amount: 0.6 })
  const [value, setValue] = useState(from)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(from, to, { duration, delay, ease, onUpdate: setValue })
    return () => controls.stop()
  }, [inView, reduce, from, to, duration, delay])

  const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{format(to)}</span>
      <span aria-hidden="true">{format(reduce ? to : value)}</span>
    </span>
  )
}
