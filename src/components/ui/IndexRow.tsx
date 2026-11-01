import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type IndexRowProps = {
  /** e.g. "01". */
  index: string
  title: ReactNode
  /** Muted text before the arrow. */
  meta?: ReactNode
  /** Force the highlighted state (otherwise it shows on hover). */
  active?: boolean
  as?: 'li' | 'div'
  className?: string
}

/**
 * Numbered list row: index · title · meta · arrow. On hover (or `active`) a lime gradient
 * sweeps in from the left, the row indents, the title turns lime and the arrow tilts up.
 */
// Full class names (not built from fragments) so Tailwind can see them.
const states = {
  hover: {
    row: 'hover:pl-[18px]',
    sweep: 'group-hover/row:scale-x-100',
    index: 'group-hover/row:text-ac',
    title: 'group-hover/row:text-ac',
    arrow: 'group-hover/row:-rotate-45 group-hover/row:text-ac',
  },
  active: {
    row: 'pl-[18px]',
    sweep: 'scale-x-100',
    index: 'text-ac',
    title: 'text-ac',
    arrow: '-rotate-45 text-ac',
  },
}

export function IndexRow({
  index,
  title,
  meta,
  active = false,
  as: Tag = 'li',
  className,
}: IndexRowProps) {
  const state = states[active ? 'active' : 'hover']
  return (
    <Tag
      className={cn(
        'group/row relative isolate grid grid-cols-[36px_1fr_24px] items-center gap-x-3 gap-y-1 overflow-hidden border-b border-ln2 py-4 pr-2 pl-0 transition-[padding] duration-500 ease-expo last:border-b-0 sm:grid-cols-[36px_1fr_auto_24px]',
        state.row,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 -z-10 origin-left scale-x-0 bg-linear-to-r from-ac/12 to-transparent transition-transform duration-500 ease-expo',
          state.sweep,
        )}
      />
      <span
        className={cn(
          'font-mono text-xs text-mu2 transition-colors max-sm:row-span-2',
          state.index,
        )}
      >
        {index}
      </span>
      <span
        className={cn(
          'text-[22px] leading-tight font-medium tracking-[-0.02em] whitespace-nowrap text-tx transition-colors duration-300',
          state.title,
        )}
      >
        {title}
      </span>
      {meta ? (
        <span className="text-sm text-mu max-sm:col-start-2 max-sm:row-start-2 sm:text-right">
          {meta}
        </span>
      ) : (
        <span className="max-sm:hidden" />
      )}
      <ArrowRight
        aria-hidden="true"
        className={cn(
          'size-5 text-mu2 transition duration-500 ease-expo max-sm:col-start-3 max-sm:row-span-2 max-sm:row-start-1',
          state.arrow,
        )}
      />
    </Tag>
  )
}
