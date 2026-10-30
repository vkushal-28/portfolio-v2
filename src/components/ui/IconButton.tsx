import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Pressable, type PressableProps } from './Pressable'

type IconButtonVariant = 'outline' | 'solid'

const variants = {
  outline: 'border border-ln3 text-tx hover:border-ac hover:text-ac',
  solid: 'bg-ac text-bg hover:bg-ac2',
} satisfies Record<IconButtonVariant, string>

export type IconButtonProps = PressableProps & {
  icon: ReactNode
  /** Accessible name (icon-only control). */
  label: string
  variant?: IconButtonVariant
}

/** 48px circular icon-only control. */
export function IconButton({
  icon,
  label,
  variant = 'outline',
  className,
  ...rest
}: IconButtonProps) {
  return (
    <Pressable
      aria-label={label}
      className={cn(
        'inline-flex size-12 shrink-0 items-center justify-center rounded-full transition-colors duration-300',
        variants[variant],
        className,
      )}
      {...rest}
    >
      <span aria-hidden="true" className="contents">
        {icon}
      </span>
    </Pressable>
  )
}
