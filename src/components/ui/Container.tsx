import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/** Centred 1280px column with fluid side padding. */
export function Container({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mx-auto w-full max-w-[1280px] px-[clamp(16px,4vw,48px)]', className)}
      {...rest}
    />
  )
}
