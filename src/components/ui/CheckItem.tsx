import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type CheckItemProps = {
  children: ReactNode
  className?: string
}

/** Checklist line: a 20px lime check circle followed by text. Render inside a `<ul>`/`<ol>` item. */
export function CheckItem({ children, className }: CheckItemProps) {
  return (
    <span className={cn('flex items-start gap-3 text-[15px] leading-relaxed text-tx2', className)}>
      <span
        aria-hidden="true"
        className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ac text-bg"
      >
        <Check className="size-3" strokeWidth={3} />
      </span>
      <span>{children}</span>
    </span>
  )
}
