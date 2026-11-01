import { AnimatePresence } from 'motion/react'
import { useRef, useState } from 'react'
import { Reveal } from '@/components/motion'
import {
  Chip,
  FilterTabs,
  PulseDot,
  RichText,
  Section,
  SectionHeader,
  SectionTitle,
} from '@/components/ui'
import { experience, journey, type JourneyFilter } from '@/data'
import { useMediaQuery } from '@/hooks'
import { MilestoneRow } from './journey/MilestoneRow'
import { Spine } from './journey/Spine'

const pad = (n: number) => String(n).padStart(2, '0')

export function Journey() {
  const [filter, setFilter] = useState<JourneyFilter>('All')
  const listRef = useRef<HTMLOListElement>(null)
  const compact = !useMediaQuery('(min-width: 860px)')

  const milestones = experience
    .map((milestone, i) => ({ milestone, chapter: pad(experience.length - i) }))
    .filter(({ milestone }) => filter === 'All' || milestone.type === filter)

  return (
    <Section
      id="journey"
      band="alt"
      bordered="both"
      aria-labelledby="journey-title"
      className="overflow-x-clip"
    >
      <SectionHeader index={journey.header.index} label={journey.header.label} />

      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <SectionTitle id="journey-title">
          <RichText runs={journey.title} />
        </SectionTitle>
        <Reveal delay={0.1}>
          <FilterTabs
            options={journey.filters}
            value={filter}
            onChange={setFilter}
            ariaLabel={journey.filterLabel}
          />
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <p aria-live="polite" className="mt-6 font-mono text-[13px] text-mu2">
          <span className="text-ac">$</span> {journey.logCommand} · {pad(milestones.length)}{' '}
          {journey.logCount} · {journey.logHint}
        </p>
      </Reveal>

      <div className="relative mt-14 md:mt-20">
        <Spine listRef={listRef} />

        <div className="relative flex md:justify-center">
          <Chip
            variant="pill"
            className="border-ac/70 bg-bg2 font-mono text-[13px] text-ac shadow-[0_0_24px_-6px_color-mix(in_srgb,var(--color-ac)_50%,transparent)]"
          >
            <PulseDot />
            {journey.nowLabel}
          </Chip>
        </div>

        <ol ref={listRef} className="relative flex flex-col gap-14 py-14 md:gap-20 md:py-20">
          <AnimatePresence mode="popLayout" initial={false}>
            {milestones.map(({ milestone, chapter }, i) => (
              <MilestoneRow
                key={`${filter}-${milestone.hash}`}
                milestone={milestone}
                chapter={chapter}
                side={i % 2 ? 'right' : 'left'}
                compact={compact}
              />
            ))}
          </AnimatePresence>
        </ol>

        <div className="relative flex md:justify-center">
          <a
            href={journey.nextChapter.href}
            className="inline-flex min-h-11 items-center rounded-full border border-dashed border-ln4 bg-bg2 px-5 py-2.5 text-[15px] font-medium transition-colors duration-300 hover:border-ac"
          >
            <span className="text-shimmer">{journey.nextChapter.label}</span>
          </a>
        </div>
      </div>
    </Section>
  )
}
