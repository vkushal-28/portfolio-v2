import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { Container } from './Container'

type Band = 'default' | 'alt'
type Bordered = 'top' | 'both' | 'none'

const bands = { default: 'bg-bg', alt: 'bg-bg2' } satisfies Record<Band, string>
const borders = {
  top: 'border-t border-ln1',
  both: 'border-y border-ln1',
  none: '',
} satisfies Record<Bordered, string>

export type SectionProps = HTMLAttributes<HTMLElement> & {
  /** `alt` uses the `bg2` band colour. */
  band?: Band
  bordered?: Bordered
  /** Wrap children in `Container`. Default true. */
  contained?: boolean
}

/** Page section: vertical rhythm, band colour, borders and anchor offset. */
export function Section({
  band = 'default',
  bordered = 'none',
  contained = true,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn(
        'relative scroll-mt-20 py-[clamp(80px,10vw,140px)]',
        bands[band],
        borders[bordered],
        className,
      )}
      {...rest}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  )
}
