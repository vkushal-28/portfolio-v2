import { cn } from '@/lib/cn'

type CaretVariant = 'line' | 'block'

const variants = {
  line: 'ml-1 h-[0.9em] w-[3px] align-[-0.1em]',
  block: 'ml-0.5 h-[1.1em] w-[0.55em] align-[-0.2em]',
} satisfies Record<CaretVariant, string>

/** Blinking lime text cursor. */
export function Caret({
  variant = 'line',
  className,
}: {
  variant?: CaretVariant
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block bg-ac motion-safe:animate-blink', variants[variant], className)}
    />
  )
}
