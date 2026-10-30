import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type WindowVariant = 'editor' | 'terminal' | 'browser'

const frames = {
  editor:
    'rounded-window border border-ln3 bg-s2 shadow-[0_40px_100px_-30px_rgb(0_0_0/0.8),0_20px_40px_-20px_rgb(0_0_0/0.6)]',
  terminal: 'rounded-tile border border-ln2 bg-bg',
  browser: 'rounded-2xl border border-ln3 bg-s3',
} satisfies Record<WindowVariant, string>

const bars = {
  editor: 'gap-4 border-b border-ln2 px-5 py-3.5',
  terminal: 'gap-3 border-b border-ln1 px-4 py-2.5',
  browser: 'gap-3 border-b border-ln2 px-4 py-2.5',
} satisfies Record<WindowVariant, string>

const titles = {
  editor: 'font-mono text-xs text-mu2',
  terminal: 'font-mono text-[11px] tracking-[0.1em] text-mu2 uppercase',
  browser: 'min-w-0 flex-1 truncate rounded-full bg-s2 px-3 py-1 font-mono text-[11px] text-mu2',
} satisfies Record<WindowVariant, string>

const bodies = {
  editor: 'p-6 font-mono text-sm leading-[1.95]',
  terminal: 'p-4 font-mono text-[13px] leading-relaxed',
  browser: 'p-4',
} satisfies Record<WindowVariant, string>

export type WindowFrameProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  /** Filename, terminal name or address-bar text. */
  title?: ReactNode
  variant?: WindowVariant
  bodyClassName?: string
}

/** Window chrome (3 dots + title) around content: code editor, terminal or mock browser. */
export function WindowFrame({
  title,
  variant = 'editor',
  bodyClassName,
  className,
  children,
  ...rest
}: WindowFrameProps) {
  return (
    <div className={cn('overflow-hidden', frames[variant], className)} {...rest}>
      <div className={cn('flex items-center', bars[variant])}>
        <span aria-hidden="true" className="flex shrink-0 gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-ln3" />
          ))}
        </span>
        {title && <span className={titles[variant]}>{title}</span>}
      </div>
      <div className={cn(bodies[variant], bodyClassName)}>{children}</div>
    </div>
  )
}
