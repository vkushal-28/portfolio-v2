import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { spring } from '@/components/motion/presets'
import { cn } from '@/lib/cn'

export type ServiceRowProps = {
  /** e.g. "01". */
  index: string
  title: string
  /** Mono figure on the right; hidden under 560px. */
  metric?: string
  active: boolean
  /** Fired on click, hover and keyboard focus. */
  onSelect: () => void
  /** Id of the panel this row controls. */
  controls: string
  className?: string
}

/**
 * Selectable list row (a `<button>` with `aria-pressed`). The active row gets a full lime sweep,
 * springs its indent to 20px and lights its number, metric and arrow; a hovered row shows a partial sweep.
 */
export function ServiceRow({
  index,
  title,
  metric,
  active,
  onSelect,
  controls,
  className,
}: ServiceRowProps) {
  const reduce = useReducedMotion()
  return (
    <motion.button
      type="button"
      aria-pressed={active}
      aria-controls={controls}
      onClick={onSelect}
      onFocus={onSelect}
      onPointerEnter={(e) => e.pointerType === 'mouse' && onSelect()}
      animate={{ paddingLeft: active ? 20 : 0 }}
      transition={reduce ? { duration: 0 } : spring}
      className={cn(
        'group/row relative isolate grid min-h-[76px] w-full grid-cols-[44px_1fr_24px] items-center gap-3 overflow-hidden border-b border-ln2 pr-3 text-left min-[560px]:grid-cols-[44px_1fr_auto_24px]',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 -z-10 origin-left bg-linear-to-r from-ac/14 via-ac/5 to-transparent transition-transform duration-500 ease-expo',
          active ? 'scale-x-100' : 'scale-x-0 group-hover/row:scale-x-[0.35]',
        )}
      />
      <span
        className={cn(
          'font-mono text-xs transition-colors duration-300',
          active ? 'text-ac' : 'text-mu2',
        )}
      >
        {index}
      </span>
      <span
        className={cn(
          'text-[clamp(18px,1.8vw,24px)] leading-snug font-medium tracking-[-0.02em] transition-colors duration-300',
          active ? 'text-tx' : 'text-mu group-hover/row:text-tx2',
        )}
      >
        {title}
      </span>
      {metric && (
        <span
          className={cn(
            'hidden font-mono text-xs transition-colors duration-300 min-[560px]:block',
            active ? 'text-ac' : 'text-mu2',
          )}
        >
          {metric}
        </span>
      )}
      <ArrowRight
        aria-hidden="true"
        className={cn(
          'size-5 transition duration-500 ease-expo',
          active ? '-rotate-45 text-ac' : 'text-mu2',
        )}
      />
    </motion.button>
  )
}
