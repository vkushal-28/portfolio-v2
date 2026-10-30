import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type NavLinkVariant = 'inline' | 'row'

const variants = {
  inline: 'inline-flex min-h-11 items-center gap-1.5 text-mu hover:text-tx',
  row: 'flex min-h-14 w-full items-center justify-between gap-4 border-b border-ln2 py-4 text-tx2 hover:text-ac',
} satisfies Record<NavLinkVariant, string>

export type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children: ReactNode
  /** Trailing glyph such as ↗ or ↑. */
  trailing?: ReactNode
  /** `inline` text link with growing underline, or full-width bordered `row`. */
  variant?: NavLinkVariant
  /** Marks the current section (`aria-current="location"`). */
  active?: boolean
}

/** Text link with an underline that grows left → right on hover. */
export function NavLink({
  href,
  children,
  trailing,
  variant = 'inline',
  active = false,
  className,
  ...rest
}: NavLinkProps) {
  return (
    <a
      href={href}
      aria-current={active ? 'location' : undefined}
      className={cn(
        'group transition-colors duration-300',
        variants[variant],
        active && 'text-tx',
        className,
      )}
      {...rest}
    >
      <span
        className={cn(
          'bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-expo group-hover:bg-[length:100%_1px]',
          active && 'bg-[length:100%_1px]',
        )}
      >
        {children}
      </span>
      {trailing && (
        <span
          aria-hidden="true"
          className="transition-transform duration-300 ease-expo group-hover:-translate-y-0.5"
        >
          {trailing}
        </span>
      )}
    </a>
  )
}
