import type { Fact } from '@/data/types'
import { cn } from '@/lib/cn'

export type FactGridProps = {
  facts: readonly Fact[]
  /** Default 2. */
  columns?: 2 | 3 | 4
  className?: string
}

const cols = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' } satisfies Record<
  NonNullable<FactGridProps['columns']>,
  string
>

/** Label / value grid separated by 1px hairlines. */
export function FactGrid({ facts, columns = 2, className }: FactGridProps) {
  return (
    <dl
      className={cn(
        'grid gap-px overflow-hidden rounded-2xl border border-ln2 bg-ln2',
        cols[columns],
        className,
      )}
    >
      {facts.map((fact) => (
        <div key={fact.label} className="flex flex-col gap-2 bg-s1 p-5">
          <dt className="font-mono text-[11px] tracking-[0.1em] text-mu2 uppercase">
            {fact.label}
          </dt>
          <dd className="text-base text-tx">{fact.value}</dd>
        </div>
      ))}
    </dl>
  )
}
