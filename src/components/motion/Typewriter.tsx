import { Caret } from '@/components/ui/Caret'
import { cn } from '@/lib/cn'
import { useTypewriter, type TypewriterOptions } from './useTypewriter'

export type TypewriterProps = {
  /** Pass a stable array (e.g. from `src/data`). */
  items: readonly string[]
  /** Screen-reader prefix, e.g. "Open to roles" → "Open to roles: A, B, C". */
  srLabel: string
  options?: TypewriterOptions
  className?: string
}

/**
 * Fixed-height (1.2em) typed line with a blinking caret. The animated text is hidden from
 * assistive tech; a visually hidden paragraph lists every item instead.
 */
export function Typewriter({ items, srLabel, options, className }: TypewriterProps) {
  const text = useTypewriter(items, options)
  return (
    <>
      <p aria-hidden="true" className={cn('h-[1.2em] leading-[1.2] whitespace-nowrap', className)}>
        {text}
        <Caret />
      </p>
      <p className="sr-only">
        {srLabel}: {items.join(', ')}
      </p>
    </>
  )
}
