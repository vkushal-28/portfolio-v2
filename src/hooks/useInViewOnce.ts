import { useInView } from 'motion/react'
import { useRef } from 'react'

type InViewOptions = NonNullable<Parameters<typeof useInView>[1]>

/** Returns a ref and whether that element has entered the viewport (latches true). */
export function useInViewOnce<T extends Element>(
  options: Omit<InViewOptions, 'once' | 'root'> = {},
) {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { amount: 0.15, ...options, once: true })
  return [ref, inView] as const
}
