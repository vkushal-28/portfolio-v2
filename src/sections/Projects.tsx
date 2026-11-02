import { AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { FilterTabs, Section, SectionHeader, SectionIntro, SectionTitle } from '@/components/ui'
import { projects, work, type WorkFilter } from '@/data'
import { useMediaQuery } from '@/hooks'
import { ProjectCard } from './projects/ProjectCard'

export function Projects() {
  const [filter, setFilter] = useState<WorkFilter>('All')
  const twoColumns = useMediaQuery('(min-width: 860px)')
  const shown = projects.filter((project) => filter === 'All' || project.cat === filter)
  const hasFeatured = filter === 'All'

  return (
    <Section id="work" band="alt" bordered="top" aria-labelledby="work-title">
      <SectionHeader index={work.header.index} label={work.header.label} />
      <SectionIntro
        title={<SectionTitle id="work-title">{work.title}</SectionTitle>}
        aside={
          <FilterTabs
            options={work.filters}
            value={filter}
            onChange={setFilter}
            ariaLabel={work.filterLabel}
          />
        }
      />

      <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((project, i) => {
            const featured = hasFeatured && i === 0
            const slot = hasFeatured ? i - 1 : i
            const secondInRow = twoColumns && !featured && slot % 2 === 1
            return (
              <ProjectCard
                key={project.num}
                project={project}
                featured={featured}
                delay={secondInRow ? 0.14 : 0}
              />
            )
          })}
        </AnimatePresence>
      </div>
    </Section>
  )
}
