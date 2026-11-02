import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

type IconBadgeSize = 'md' | 'lg'

const sizes = {
  md: 'size-14 rounded-tile [&>svg]:size-6',
  lg: 'size-15 rounded-tile [&>svg]:size-7',
} satisfies Record<IconBadgeSize, string>

export type IconBadgeProps = {
  icon: LucideIcon
  /** `md` 56px, `lg` 60px. */
  size?: IconBadgeSize
  className?: string
}

/** Lime rounded square holding a dark icon. Decorative. */
export function IconBadge({ icon: Icon, size = 'md', className }: IconBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('grid shrink-0 place-items-center bg-ac text-bg', sizes[size], className)}
    >
      <Icon strokeWidth={1.75} />
    </span>
  )
}
