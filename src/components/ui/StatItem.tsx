import { Counter } from '@/components/motion/Counter'
import { cn } from '@/lib/cn'

export type StatItemProps = {
  value: number
  prefix?: string
  suffix?: string
  label: string
  /** Lime number. */
  accent?: boolean
  className?: string
}

/** Count-up number with a muted label. */
export function StatItem({
  value,
  prefix,
  suffix,
  label,
  accent = false,
  className,
}: StatItemProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Counter
        to={value}
        prefix={prefix}
        suffix={suffix}
        delay={0.35}
        className={cn(
          'text-[clamp(36px,3.6vw,48px)] leading-none font-semibold tracking-[-0.04em] tabular-nums',
          accent ? 'text-ac' : 'text-tx',
        )}
      />
      <span className="text-sm text-mu">{label}</span>
    </div>
  )
}
