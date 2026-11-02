import type { ReactNode } from 'react'
import { Reveal, SpotlightSweep } from '@/components/motion'
import { Card } from '@/components/ui'
import { cn } from '@/lib/cn'

type BentoCardProps = {
  /** Seconds after the grid enters view; the light sweep follows. */
  delay: number
  /** Grid placement, e.g. `min-[960px]:col-span-7`. */
  className?: string
  cardClassName?: string
  children: ReactNode
}

/** Bento tile: rises in, then a lime light sweep passes across it once. */
export function BentoCard({ delay, className, cardClassName, children }: BentoCardProps) {
  return (
    <Reveal delay={delay} className={className}>
      <Card variant="bento" className={cn('h-full', cardClassName)}>
        {children}
        <SpotlightSweep delay={delay + 0.35} />
      </Card>
    </Reveal>
  )
}
