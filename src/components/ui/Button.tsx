import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Pressable, type PressableProps } from './Pressable'

type ButtonVariant = 'primary' | 'ghost'
type ButtonSize = 'sm' | 'md'

const variants = {
  primary: 'bg-ac text-bg hover:bg-ac2',
  ghost: 'border border-ln3 bg-bg/40 text-tx hover:border-ln4 hover:bg-s2',
} satisfies Record<ButtonVariant, string>

const sizes = {
  sm: 'min-h-11 gap-2 px-4 text-sm',
  md: 'min-h-12 gap-2.5 px-6 text-[15px]',
} satisfies Record<ButtonSize, string>

export type ButtonProps = PressableProps & {
  variant?: ButtonVariant
  size?: ButtonSize
  /** `'arrow'` for the standard trailing arrow, or any node. */
  icon?: 'arrow' | ReactNode
  children: ReactNode
}

/** Pill CTA. Pass `href` (and optionally `download`) for a link. */
export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      className={cn(
        'group inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap transition-colors duration-300 select-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
      {icon === 'arrow' ? (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5"
        />
      ) : (
        icon
      )}
    </Pressable>
  )
}
