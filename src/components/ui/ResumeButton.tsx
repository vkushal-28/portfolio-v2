import { Check } from 'lucide-react'
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { Pressable } from './Pressable'

export type ResumeButtonProps = {
  href: string
  label: string
  className?: string
}

type Phase = 'idle' | 'loading' | 'done'

const LOAD_S = 1.4
const DONE_MS = 2000

const arrow = 'absolute inset-x-0 top-0 h-[11px] transition-transform duration-500 ease-expo'
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

/** Arrow above a tray; on hover (or while loading) the arrow drops into the tray and a new one falls in. */
function DownloadGlyph({ active }: { active: boolean }) {
  return (
    <span aria-hidden="true" className="relative block size-4">
      <span className="absolute inset-x-0 top-0 h-[11px] overflow-hidden">
        <svg
          viewBox="0 0 16 11"
          {...stroke}
          className={cn(arrow, active ? 'translate-y-[11px]' : 'group-hover:translate-y-[11px]')}
        >
          <path d="M8 1v8M4.5 5.5 8 9l3.5-3.5" />
        </svg>
        <svg
          viewBox="0 0 16 11"
          {...stroke}
          className={cn(
            arrow,
            'delay-100',
            active
              ? 'translate-y-0 animate-bounce'
              : '-translate-y-[11px] group-hover:translate-y-0',
          )}
        >
          <path d="M8 1v8M4.5 5.5 8 9l3.5-3.5" />
        </svg>
      </span>
      <svg viewBox="0 0 16 16" {...stroke} className="absolute inset-0 size-4">
        <path d="M2 11.5v1.5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1.5" />
      </svg>
    </span>
  )
}

const swap = {
  initial: { y: '110%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '-110%', opacity: 0 },
  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
} as const

/**
 * Résumé download pill.
 * - Rest: spinning lime border, breathing glow, shimmer, label and a bobbing download glyph.
 * - Hover: a lime fill sweeps left → right, text flips dark, the arrow drops into the tray.
 * - Click: the browser downloads the file while the pill plays a 0 → 100% progress fill with a
 *   live counter, then shows "Saved ✓" before resetting.
 */
export function ResumeButton({ href, label, className }: ResumeButtonProps) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('idle')
  const [percent, setPercent] = useState(0)
  const progress = useMotionValue(0)
  const scaleX = useTransform(progress, [0, 100], [0, 1])
  const sheenLeft = useTransform(progress, (v) => `${v}%`)
  const timer = useRef<number | undefined>(undefined)

  useMotionValueEvent(progress, 'change', (v) => setPercent(Math.round(v)))
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const start = () => {
    if (phase !== 'idle') return
    window.clearTimeout(timer.current)
    const finish = () => {
      setPhase('done')
      timer.current = window.setTimeout(() => {
        setPhase('idle')
        progress.set(0)
      }, DONE_MS)
    }
    if (reduce) {
      progress.set(100)
      finish()
      return
    }
    setPhase('loading')
    progress.set(0)
    animate(progress, 100, { duration: LOAD_S, ease: [0.65, 0, 0.35, 1], onComplete: finish })
  }

  const busy = phase !== 'idle'

  return (
    <Pressable
      href={href}
      download
      onClick={start}
      aria-label={phase === 'done' ? `${label} — saved` : label}
      className={cn(
        'group relative isolate inline-flex rounded-full p-[1.5px] select-none',
        className,
      )}
    >
      {/* Breathing lime halo behind the pill. */}
      <span
        aria-hidden="true"
        className="absolute -inset-1 -z-20 rounded-full bg-ac/35 blur-lg [animation-duration:2.8s] motion-safe:animate-glow-pulse"
      />
      {/* Always-spinning conic border. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full motion-safe:animate-spin-ang"
        style={{
          background:
            'conic-gradient(from var(--ang), color-mix(in srgb, var(--color-ac) 25%, transparent) 0deg, var(--color-ac) 90deg, #fff 120deg, var(--color-ac) 150deg, color-mix(in srgb, var(--color-ac) 25%, transparent) 240deg, color-mix(in srgb, var(--color-ac) 25%, transparent) 360deg)',
        }}
      />

      <span
        className={cn(
          'relative isolate flex min-h-[45px] w-full items-center justify-between gap-3 overflow-hidden rounded-full bg-bg pr-5 pl-6 text-[15px] font-medium whitespace-nowrap text-tx transition-colors duration-500 ease-expo group-hover:text-bg',
          busy && 'text-bg',
        )}
      >
        {/* Hover sweep: dims back while the progress fill runs. */}
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-0 -z-20 origin-left scale-x-0 bg-ac transition-transform duration-700 ease-expo group-hover:scale-x-100 motion-reduce:transition-none',
            busy && 'scale-x-100 opacity-35',
          )}
        />
        {/* Progress fill, driven by the click animation. */}
        <motion.span
          aria-hidden="true"
          style={{ scaleX }}
          className="absolute inset-0 -z-10 origin-left bg-ac"
        />
        {/* Leading-edge sheen on the progress fill. */}
        {phase === 'loading' && (
          <motion.span
            aria-hidden="true"
            style={{ left: sheenLeft }}
            className="absolute inset-y-0 -z-10 w-10 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55))] mix-blend-overlay"
          />
        )}
        {/* Diagonal shimmer that crosses the pill every few seconds. */}
        {!reduce && phase === 'idle' && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 w-14 -skew-x-[20deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)]"
            initial={{ left: '-25%' }}
            animate={{ left: '125%' }}
            transition={{ duration: 1.1, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2.2 }}
          />
        )}

        {/* All labels share one grid cell so the pill keeps the width of the longest. */}
        <span className="relative grid overflow-hidden">
          <span aria-hidden="true" className="invisible col-start-1 row-start-1">
            {label}
          </span>
          <span aria-hidden="true" className="invisible col-start-1 row-start-1 font-mono">
            Downloading 100%
          </span>
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={phase}
              {...swap}
              className={cn(
                'col-start-1 row-start-1',
                phase === 'loading' && 'font-mono tabular-nums',
              )}
            >
              {phase === 'idle' && label}
              {phase === 'loading' && `Downloading ${percent}%`}
              {phase === 'done' && 'Saved to device'}
            </motion.span>
          </AnimatePresence>
        </span>

        <span
          className={cn(
            'relative grid size-4 place-items-center text-ac transition-colors duration-500 group-hover:text-bg',
            busy && 'text-bg',
          )}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {phase === 'done' ? (
              <motion.span
                key="check"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 22 }}
              >
                <Check aria-hidden="true" className="size-4" strokeWidth={2.5} />
              </motion.span>
            ) : (
              <motion.span key="glyph" exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
                <motion.span
                  className="block"
                  animate={!reduce && phase === 'idle' ? { y: [0, 2.5, 0] } : { y: 0 }}
                  transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity }}
                >
                  <DownloadGlyph active={phase === 'loading'} />
                </motion.span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </span>
    </Pressable>
  )
}
