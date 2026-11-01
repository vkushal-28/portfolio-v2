import { motion, useReducedMotion, type Variants } from 'motion/react'
import { Briefcase, GraduationCap } from 'lucide-react'
import {
  OrbitRing,
  RippleRings,
  ease,
  rise,
  slideLeft,
  slideRight,
  spring,
} from '@/components/motion'
import { Badge, Card, Chip, IconNode, MonoLabel, OutlineNumber } from '@/components/ui'
import { journey, type Milestone } from '@/data'
import { cn } from '@/lib/cn'

type Side = 'left' | 'right'

type MilestoneRowProps = {
  milestone: Milestone
  /** Zero-padded chapter number, e.g. "06". */
  chapter: string
  /** Desktop side of the card; on mobile every card sits on the right. */
  side: Side
  /** Narrow (<860px) single-rail layout. */
  compact: boolean
}

const cardIn = (side: Side): Variants => {
  const from = side === 'left' ? slideLeft : slideRight
  return {
    hidden: from.hidden,
    show: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { ...spring, delayChildren: 0.2, staggerChildren: 0.07 },
    },
    hover: { y: -6, transition: spring },
  }
}

const nodeIn = {
  hidden: { scale: 0, rotate: -120 },
  show: { scale: 1, rotate: 0, transition: spring },
} satisfies Variants

const chapterIn = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease } },
} satisfies Variants

const numberIn = {
  hidden: { letterSpacing: '0.2em' },
  show: { letterSpacing: '-0.06em', transition: { duration: 1.2, ease } },
} satisfies Variants

const connectorIn = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { delay: 0.45, duration: 0.6, ease } },
} satisfies Variants

const icons = { Experience: Briefcase, Education: GraduationCap } as const

export function MilestoneRow({ milestone, chapter, side, compact }: MilestoneRowProps) {
  const reduce = useReducedMotion()
  const Icon = icons[milestone.type]
  const cardSide: Side = compact ? 'right' : side
  const isLeft = cardSide === 'left'

  return (
    <motion.li
      layout={!reduce}
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      whileHover={reduce ? undefined : 'hover'}
      viewport={{ once: true, amount: 0.25 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      className="group grid grid-cols-[56px_1fr] items-start gap-x-4 md:grid-cols-[1fr_120px_1fr] md:items-center md:gap-x-0"
    >
      {/* Node + connector */}
      <div className="relative col-start-1 row-start-1 flex justify-center pt-6 md:col-start-2 md:pt-0">
        <motion.span
          aria-hidden="true"
          variants={connectorIn}
          className={cn(
            'absolute top-1/2 hidden h-px w-8 md:block',
            isLeft
              ? 'left-0 origin-left bg-linear-to-r from-ln4 to-ac'
              : 'right-0 origin-right bg-linear-to-l from-ln4 to-ac',
          )}
        />
        <motion.div variants={nodeIn} className="relative size-14 shrink-0">
          <RippleRings />
          <OrbitRing />
          <IconNode icon={Icon} surface="bg2" />
        </motion.div>
      </div>

      {/* Chapter (desktop only, opposite the card) */}
      <motion.div
        aria-hidden="true"
        variants={chapterIn}
        className={cn(
          'row-start-1 hidden md:block',
          isLeft ? 'col-start-3 pl-4 text-left' : 'col-start-1 pr-4 text-right',
        )}
      >
        <MonoLabel as="span">{journey.chapterLabel}</MonoLabel>
        <motion.div variants={numberIn} className="mt-2">
          <OutlineNumber
            value={chapter}
            className="tracking-[inherit] group-hover:[-webkit-text-stroke-color:var(--color-ac)]"
          />
        </motion.div>
        <span className="mt-3 block font-mono text-xs text-mu2">{milestone.when}</span>
      </motion.div>

      {/* Card */}
      <Card
        as="article"
        variant="raised"
        variants={cardIn(cardSide)}
        className={cn(
          'glow-border col-start-2 row-start-1 p-6 transition-shadow duration-500 group-hover:shadow-[0_30px_70px_-35px_color-mix(in_srgb,var(--color-ac)_45%,transparent)] md:p-8',
          isLeft ? 'md:col-start-1' : 'md:col-start-3',
        )}
      >
        <motion.div variants={rise} className="flex flex-wrap items-center justify-between gap-3">
          <Badge tone={milestone.type === 'Education' ? 'info' : 'accent'} dot>
            {milestone.type}
          </Badge>
          <span className="font-mono text-xs text-mu2">
            {journey.commitLabel} {milestone.hash}
          </span>
        </motion.div>
        <motion.h3
          variants={rise}
          className="mt-5 text-[clamp(22px,2.2vw,30px)] leading-tight font-medium tracking-[-0.03em] text-tx"
        >
          <span className="underline-grow [box-decoration-break:clone] pb-1">
            {milestone.title}
          </span>
        </motion.h3>
        <motion.p variants={rise} className="mt-2 text-ac">
          {milestone.org}
        </motion.p>
        <motion.p variants={rise} className="mt-1 font-mono text-xs text-mu2">
          {milestone.when}
        </motion.p>
        {milestone.desc && (
          <motion.p variants={rise} className="mt-4 text-base leading-relaxed text-mu">
            {milestone.desc}
          </motion.p>
        )}
        <motion.ul variants={rise} className="mt-5 flex flex-wrap gap-2">
          {milestone.tags.map((tag) => (
            <Chip key={tag} as="li">
              {tag}
            </Chip>
          ))}
        </motion.ul>
      </Card>
    </motion.li>
  )
}
