import { motion, useReducedMotion, type Variants } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { ease, rise, spring } from '@/components/motion'
import { Badge, Card, Chip, IconButton, NavLink } from '@/components/ui'
import { work, type Project } from '@/data'
import { cn } from '@/lib/cn'
import { ProjectMedia } from './ProjectMedia'

type ProjectCardProps = {
  project: Project
  featured: boolean
  /** Seconds before the entrance (second card in a row waits a beat). */
  delay: number
}

const mediaIn = (delay: number): Variants => ({
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  show: { clipPath: 'inset(0% 0 0 0)', transition: { duration: 1.1, ease, delay } },
})

const bodyIn = (delay: number): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: delay + 0.55, staggerChildren: 0.1 } },
})

export function ProjectCard({ project, featured, delay }: ProjectCardProps) {
  const reduce = useReducedMotion()

  return (
    <Card
      as="article"
      variant="bento"
      layout={!reduce}
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      whileHover={reduce ? undefined : { y: -8, transition: spring }}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      style={{ borderRadius: 24 }}
      aria-labelledby={`project-${project.num}`}
      className={cn(
        'group/card flex flex-col transition-colors duration-500 hover:border-ln4',
        featured && 'md:col-span-2',
      )}
    >
      <motion.div
        variants={mediaIn(delay)}
        className={cn(
          'relative overflow-hidden border-b border-ln2 bg-s2',
          featured ? 'h-[260px] md:h-[420px] sm:h-[300px]' : 'h-[260px] sm:h-[300px]',
        )}
      >
        <ProjectMedia project={project} />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-14 -right-14 size-45 rounded-full border border-dashed border-ln3 motion-safe:animate-orbit"
          style={{ animationDuration: '30s' }}
        />
        <Badge className="absolute top-4 left-4 backdrop-blur-sm">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full"
            style={{ backgroundColor: project.tint }}
          />
          {project.cat}
        </Badge>
      </motion.div>

      <motion.div variants={bodyIn(delay)} className="flex flex-1 flex-col p-7">
        <motion.p variants={rise} className="font-mono text-xs text-mu2">
          {project.num} — {project.meta}
        </motion.p>
        <motion.div variants={rise} className="mt-3 flex items-start justify-between gap-5">
          <h3
            id={`project-${project.num}`}
            className="text-[clamp(24px,2.4vw,32px)] leading-tight font-medium tracking-[-0.03em] text-balance text-tx"
          >
            {project.title}
          </h3>
          <IconButton
            href={project.liveUrl}
            label={work.caseStudyLabel}
            icon={
              <ArrowRight className="size-5 transition-transform duration-500 ease-expo group-hover/card:-rotate-45" />
            }
            className="group-hover/card:border-ac group-hover/card:bg-ac group-hover/card:text-bg"
          />
        </motion.div>
        <motion.div variants={rise} className="mt-4 flex flex-1 flex-col">
          <p className="text-base leading-relaxed text-mu">{project.desc}</p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-1 md:mt-auto md:pt-6">
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Chip key={tech} as="li">
                  {tech}
                </Chip>
              ))}
            </ul>
            <div className="flex gap-5">
              <NavLink href={project.liveUrl} trailing="↗">
                {work.liveLabel}
              </NavLink>
              <NavLink href={project.codeUrl} trailing="↗">
                {work.codeLabel}
              </NavLink>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Card>
  )
}
