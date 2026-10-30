import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/cn'
import { MonoLabel } from './MonoLabel'

export type SectionHeaderProps = {
  /** e.g. "01" */
  index: string
  /** e.g. "About me" */
  label: string
  className?: string
}

/** `● 01 —— About me` label above a section title. */
export function SectionHeader({ index, label, className }: SectionHeaderProps) {
  return (
    <Reveal className={cn('mb-8 md:mb-12', className)}>
      <MonoLabel dot>
        <span className="text-ac">{index}</span>
        <span aria-hidden="true" className="h-px w-10 bg-ln3" />
        <span>{label}</span>
      </MonoLabel>
    </Reveal>
  )
}
