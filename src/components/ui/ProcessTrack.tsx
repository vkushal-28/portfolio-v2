import { motion, useInView, useReducedMotion, type Variants } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import { ease, spring } from '@/components/motion/presets'
import { cn } from '@/lib/cn'
import { pad2 } from '@/lib/format'
import { Chip } from './Chip'
import { IconNode } from './IconNode'

export type ProcessStepData = {
  title: string
  icon: LucideIcon
  desc: string
  tag: string
}

export type ProcessStepProps = ProcessStepData & {
  /** Zero-based position; drives the label and entrance delay. */
  index: number
  /** e.g. "Step" → "Step 01". */
  stepLabel: string
}

const stepIn: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease, delay: 0.25 + i * 0.22 },
  }),
}

const nodeIn: Variants = {
  hidden: { scale: 0, rotate: -90 },
  show: (i: number) => ({ scale: 1, rotate: 0, transition: { ...spring, delay: 0.25 + i * 0.22 } }),
}

/** One step of a `ProcessTrack`: node, "Step 0N", title, description and tag. */
export function ProcessStep({ index, stepLabel, title, icon, desc, tag }: ProcessStepProps) {
  return (
    <motion.li
      custom={index}
      variants={stepIn}
      className="group relative grid grid-cols-[56px_1fr] gap-x-5 gap-y-2 min-[620px]:flex min-[620px]:flex-col min-[620px]:items-center min-[620px]:px-3 min-[620px]:text-center"
    >
      <motion.span
        data-process-node
        custom={index}
        variants={nodeIn}
        className="row-span-4 self-start min-[620px]:self-center"
      >
        <IconNode icon={icon} />
      </motion.span>
      <span className="font-mono text-xs text-ac min-[620px]:mt-4">
        {stepLabel} {pad2(index + 1)}
      </span>
      <h4 className="text-[19px] leading-snug font-semibold text-tx">{title}</h4>
      <p className="text-sm leading-relaxed text-mu">{desc}</p>
      <Chip className="mt-1 justify-self-start min-[620px]:mt-2">{tag}</Chip>
    </motion.li>
  )
}

export type ProcessTrackProps = {
  steps: readonly ProcessStepData[]
  stepLabel: string
  className?: string
}

type ConnectorProps = {
  axis: 'x' | 'y'
  /** Start the travelling dot. */
  play: boolean
  dotDelay: number
  className?: string
  style?: CSSProperties
}

const connectorStyles = {
  x: {
    dashes: 'bg-[repeating-linear-gradient(to_right,var(--color-ln4)_0_8px,transparent_8px_16px)]',
    fill: 'origin-left bg-linear-to-r',
    dot: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2',
  },
  y: {
    dashes: 'bg-[repeating-linear-gradient(to_bottom,var(--color-ln4)_0_8px,transparent_8px_16px)]',
    fill: 'origin-top bg-linear-to-b',
    dot: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
  },
}

const drawIn = { duration: 1.8, ease, delay: 0.2 }
const fillIn = {
  x: { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: drawIn } },
  y: { hidden: { scaleY: 0 }, show: { scaleY: 1, transition: drawIn } },
} satisfies Record<ConnectorProps['axis'], Variants>

/** Dashed line through the node centres: lime fill draws along it, then a dot travels it. */
function Connector({ axis, play, dotDelay, className, style }: ConnectorProps) {
  const styles = connectorStyles[axis]
  return (
    <span
      aria-hidden="true"
      className={cn('pointer-events-none absolute', className)}
      style={style}
    >
      <span className={cn('absolute inset-0', styles.dashes)} />
      <motion.span
        className={cn('absolute inset-0 from-ac to-ac2 shadow-glow-sm', styles.fill)}
        variants={fillIn[axis]}
      />
      {play && (
        // The dot sits at the start of a line-length layer; moving the layer by 100% of its own
        // size carries the dot to the end using transforms only. The wrapper clips the layer once
        // it has passed the end (otherwise it widens the page) while leaving room for the glow.
        <span className="absolute -inset-4 overflow-hidden">
          <motion.span
            className="absolute inset-4 will-change-transform"
            initial={{ [axis]: '0%', opacity: 0 }}
            animate={{ [axis]: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 4.5,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: dotDelay,
              opacity: {
                duration: 4.5,
                times: [0, 0.08, 0.92, 1],
                repeat: Infinity,
                delay: dotDelay,
              },
            }}
          >
            <span className={cn('absolute size-2.5 rounded-full bg-ac2 shadow-glow', styles.dot)} />
          </motion.span>
        </span>
      )}
    </span>
  )
}

/** Vertical span between the first and last node centres, measured (step heights vary). */
function useNodeSpan(ref: RefObject<HTMLElement | null>) {
  const [span, setSpan] = useState<{ top: number; height: number }>()
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    // Layout offsets, not bounding rects: steps are mid-entrance (translated) when first measured.
    const centre = (node: HTMLElement) => {
      let top = node.offsetHeight / 2
      for (
        let n: HTMLElement | null = node;
        n && n !== el;
        n = n.offsetParent as HTMLElement | null
      ) {
        top += n.offsetTop
      }
      return top
    }
    const measure = () => {
      const nodes = el.querySelectorAll<HTMLElement>('[data-process-node]')
      if (nodes.length < 2) return
      const top = centre(nodes[0])
      setSpan({ top, height: centre(nodes[nodes.length - 1]) - top })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
  return span
}

/**
 * Ordered process: one row of N steps on wide screens (3 columns under 1100px, a vertical list
 * under 620px). Once in view a lime fill draws along the dashed connector (horizontal on wide
 * screens, vertical on phones), steps rise in one by one, then a glowing dot travels the line on a loop.
 */
export function ProcessTrack({ steps, stepLabel, className }: ProcessTrackProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const span = useNodeSpan(ref)
  const inset = `calc(100% / ${steps.length * 2})`
  const dotDelay = 0.25 + steps.length * 0.22 + 0.4
  const play = !reduce && inView

  return (
    <motion.div
      ref={ref}
      initial={reduce ? 'show' : 'hidden'}
      animate={inView || reduce ? 'show' : 'hidden'}
      className={cn('relative', className)}
      style={{ ['--steps' as string]: steps.length }}
    >
      <Connector
        axis="x"
        play={play}
        dotDelay={dotDelay}
        className="top-[27px] hidden h-0.5 min-[1100px]:block"
        style={{ left: inset, right: inset }}
      />
      {span && (
        <Connector
          axis="y"
          play={play}
          dotDelay={dotDelay}
          className="left-[27px] w-0.5 min-[620px]:hidden"
          style={span}
        />
      )}
      <ol className="relative grid gap-y-10 min-[620px]:grid-cols-3 min-[620px]:gap-y-14 min-[1100px]:grid-cols-[repeat(var(--steps),minmax(0,1fr))]">
        {steps.map((step, i) => (
          <ProcessStep key={step.title} index={i} stepLabel={stepLabel} {...step} />
        ))}
      </ol>
    </motion.div>
  )
}
