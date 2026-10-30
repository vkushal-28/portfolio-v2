import { cn } from '@/lib/cn'

export type TechPillProps = {
  name: string
  /** Dot colour (data-driven, e.g. a brand colour). */
  color: string
  className?: string
}

/** Text tech label with a glowing coloured dot. No logos. */
export function TechPill({ name, color, className }: TechPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-ln3 bg-s2/92 py-1.5 pr-3.5 pl-1.5 font-mono text-xs whitespace-nowrap text-tx2 shadow-[0_10px_30px_rgb(0_0_0/0.45)]',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="grid size-[18px] place-items-center rounded-full border"
        style={{ borderColor: `color-mix(in srgb, ${color} 40%, transparent)` }}
      >
        <span
          className="size-1.5 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
        />
      </span>
      {name}
    </span>
  )
}
