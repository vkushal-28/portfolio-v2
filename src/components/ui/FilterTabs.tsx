import { motion, useReducedMotion } from 'motion/react'
import { useId } from 'react'
import { spring } from '@/components/motion/presets'
import { cn } from '@/lib/cn'
import { usePressMotion } from './interaction'

export type FilterOption<T extends string> = { value: T; label: string }

export type FilterTabsProps<T extends string> = {
  options: readonly FilterOption<T>[]
  value: T
  onChange: (value: T) => void
  /** Accessible name for the group. */
  ariaLabel: string
  /** Wrap onto extra rows instead of scrolling sideways when space runs out. */
  wrap?: boolean
  className?: string
}

/** Segmented filter with a sliding lime indicator. Buttons use `aria-pressed`. */
export function FilterTabs<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  wrap = false,
  className,
}: FilterTabsProps<T>) {
  const id = useId()
  const reduce = useReducedMotion()
  const pressMotion = usePressMotion()

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex max-w-full gap-1 border border-ln2 bg-s1 p-1',
        wrap ? 'flex-wrap rounded-[26px]' : 'no-scrollbar overflow-x-auto rounded-full',
        className,
      )}
    >
      {options.map((option) => {
        const active = option.value === value
        return (
          <motion.button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative min-h-11 shrink-0 rounded-full px-3 font-mono text-[13px] whitespace-nowrap transition-colors duration-300 sm:px-4',
              active ? 'text-bg' : 'text-mu hover:text-tx',
            )}
            {...pressMotion}
          >
            {active && (
              <motion.span
                layoutId={`${id}-indicator`}
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-ac"
                transition={reduce ? { duration: 0 } : spring}
              />
            )}
            <span className="relative">{option.label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
