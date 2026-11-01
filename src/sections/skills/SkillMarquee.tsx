import { Marquee } from '@/components/motion'
import { Chip } from '@/components/ui'
import { allSkills } from '@/data'

const half = Math.ceil(allSkills.length / 2)
const rows = [
  { skills: allSkills.slice(0, half), speed: 48, direction: 'left', dot: 'solid' },
  { skills: allSkills.slice(half), speed: 56, direction: 'right', dot: 'hollow' },
] as const

/** Two counter-scrolling rows of every skill. Decorative (the explorer lists them accessibly). */
export function SkillMarquee() {
  return (
    <div className="flex flex-col gap-3 py-8">
      {rows.map((row) => (
        <Marquee key={row.direction} speed={row.speed} direction={row.direction} fadeEdges gap={12}>
          {row.skills.map((skill) => (
            <Chip key={skill} variant="pill" dot={row.dot} interactive>
              {skill}
            </Chip>
          ))}
        </Marquee>
      ))}
    </div>
  )
}
