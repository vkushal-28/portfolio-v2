import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

type NodeSurface = 'bg' | 'bg2'

const surfaces = { bg: 'bg-bg', bg2: 'bg-bg2' } satisfies Record<NodeSurface, string>

export type IconNodeProps = {
  icon: LucideIcon
  /** Fill behind the icon; match the section band. Default `bg`. */
  surface?: NodeSurface
  className?: string
}

/**
 * 56px circular node with a lime icon. When an ancestor `.group` is hovered it fills lime,
 * the icon turns dark and it scales to 1.08. Decorative.
 */
export function IconNode({ icon: Icon, surface = 'bg', className }: IconNodeProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative grid size-14 shrink-0 place-items-center rounded-full border border-ln4 transition duration-500 ease-expo group-hover:scale-[1.08] group-hover:border-ac group-hover:bg-ac',
        surfaces[surface],
        className,
      )}
    >
      <Icon className="size-5.5 text-ac transition-colors duration-500 group-hover:text-bg" />
    </span>
  )
}
