import { cn } from '@/lib/cn'

type OutlineSize = 'sm' | 'md' | 'lg'
type OutlineTone = 'strong' | 'faint'

const sizes = {
  sm: 'text-[clamp(44px,5vw,72px)]',
  md: 'text-[clamp(60px,6.5vw,100px)]',
  lg: 'text-[clamp(110px,14vw,180px)]',
} satisfies Record<OutlineSize, string>

const tones = {
  strong: '[-webkit-text-stroke-color:var(--color-ln4)]',
  faint: '[-webkit-text-stroke-color:var(--color-ln2)]',
} satisfies Record<OutlineTone, string>

export type OutlineNumberProps = {
  value: string
  /** `md` timeline chapter, `lg` watermark. */
  size?: OutlineSize
  /** `strong` = ln4 stroke, `faint` = ln2 stroke (watermarks). */
  tone?: OutlineTone
  className?: string
}

/** Big stroke-only number. Decorative (`aria-hidden`). */
export function OutlineNumber({
  value,
  size = 'md',
  tone = 'strong',
  className,
}: OutlineNumberProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'block leading-none font-bold tracking-[-0.06em] text-transparent tabular-nums transition-[-webkit-text-stroke-color] duration-500 select-none [-webkit-text-stroke-width:1px]',
        sizes[size],
        tones[tone],
        className,
      )}
    >
      {value}
    </span>
  )
}
