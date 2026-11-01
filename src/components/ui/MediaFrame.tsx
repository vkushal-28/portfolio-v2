import type { HTMLAttributes, ReactNode } from 'react'
import { ScanLight } from '@/components/motion/ScanLight'
import { cn } from '@/lib/cn'
import { GridPattern } from './GridPattern'

export type MediaFrameProps = HTMLAttributes<HTMLDivElement> & {
  /** Image URL. Without it the mono `placeholder` is shown. */
  src?: string
  alt: string
  /** Shown (mono, muted) when there is no image. */
  placeholder?: string
  /** CSS aspect-ratio. Default `4 / 5`. */
  aspect?: string
  /** Dot-grid overlay cell size in px; 0 hides it. Default 14. */
  dots?: number
  /** Looping scan-light sweep. */
  scan?: boolean
  /** Overlays, e.g. a status pill. */
  children?: ReactNode
}

/** Bordered image frame with a dark radial backdrop and a placeholder until an image exists. */
export function MediaFrame({
  src,
  alt,
  placeholder,
  aspect = '4 / 5',
  dots = 14,
  scan = false,
  className,
  style,
  children,
  ...rest
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        'relative isolate overflow-hidden rounded-window border border-ln2',
        'bg-[radial-gradient(ellipse_80%_70%_at_50%_30%,var(--color-s2),var(--color-bg))]',
        className,
      )}
      style={{ aspectRatio: aspect, ...style }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={alt} className="absolute inset-0 size-full object-cover" />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 grid place-items-center font-mono text-sm text-mu2"
        >
          {placeholder}
        </div>
      )}
      {dots > 0 && <GridPattern variant="dots" size={dots} color="var(--color-ln3)" />}
      {scan && <ScanLight />}
      {children}
    </div>
  )
}
