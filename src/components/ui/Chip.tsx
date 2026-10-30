import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type ChipVariant = 'tag' | 'pill' | 'tile'

const variants = {
  tag: 'inline-flex items-center gap-1.5 rounded-md border border-ln2 bg-s3 px-2.5 py-1 font-mono text-xs text-tx3',
  pill: 'inline-flex items-center gap-2.5 rounded-full border border-ln2 bg-s2 px-4 py-2 text-[15px] whitespace-nowrap text-tx2',
  tile: 'flex flex-col gap-3 rounded-tile border border-ln2 bg-s3 p-4 text-tx2',
} satisfies Record<ChipVariant, string>

const interactiveStyles = {
  tag: 'hover:border-ln4 hover:text-tx',
  pill: 'hover:border-ac hover:text-ac',
  tile: 'hover:-translate-y-1 hover:border-ac hover:bg-ac/[0.06]',
} satisfies Record<ChipVariant, string>

export type ChipProps = HTMLAttributes<HTMLElement> & {
  /** `tag` mono chip, `pill` rounded skill pill, `tile` block tile. */
  variant?: ChipVariant
  /** Adds hover styling. */
  interactive?: boolean
  /** Leading dot: solid lime or hollow muted. */
  dot?: 'solid' | 'hollow'
  as?: 'span' | 'li' | 'div'
}

/** Small labelled chip used for tags, stack items and skill tiles. */
export function Chip({
  variant = 'tag',
  interactive = false,
  dot,
  as: Tag = 'span',
  className,
  children,
  ...rest
}: ChipProps) {
  return (
    <Tag
      className={cn(
        variants[variant],
        interactive && ['transition duration-300 ease-expo', interactiveStyles[variant]],
        className,
      )}
      {...rest}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn(
            'size-1.5 shrink-0 rounded-full',
            dot === 'solid' ? 'bg-ac' : 'border border-mu',
          )}
        />
      )}
      {children}
    </Tag>
  )
}
