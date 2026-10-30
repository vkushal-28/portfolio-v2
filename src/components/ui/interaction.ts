import { useReducedMotion } from 'motion/react'
import { spring } from '@/components/motion/presets'

/** The one shared hover/tap spring for every pressable control. Empty under reduced motion. */
export function usePressMotion() {
  const reduce = useReducedMotion()
  if (reduce) return {}
  return { whileHover: { scale: 1.03 }, whileTap: { scale: 0.96 }, transition: spring } as const
}
