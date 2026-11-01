import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { Stagger, StaggerItem, ease } from '@/components/motion'
import { Chip, FilterTabs, IconBadge, MonoLabel, OutlineNumber } from '@/components/ui'
import { allSkills, skillGroups, toolkit } from '@/data'

const pad = (n: number) => String(n).padStart(2, '0')
const options = skillGroups.map((group) => ({ value: group.name, label: group.tab ?? group.name }))

export function SkillExplorer() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(skillGroups[0].name)
  const index = skillGroups.findIndex((group) => group.name === active)
  const group = skillGroups[index]
  const { explorer } = toolkit

  return (
    <div className="flex h-full flex-col p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <MonoLabel>{explorer.label}</MonoLabel>
        <span className="font-mono text-xs text-mu2">
          {allSkills.length} {explorer.tools} · {skillGroups.length} {explorer.domains}
        </span>
      </div>

      <FilterTabs
        className="mt-6 self-start"
        options={options}
        value={active}
        onChange={setActive}
        ariaLabel={explorer.filterLabel}
        wrap
      />

      <div aria-live="polite" className="relative mt-8 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={group.name}
            initial={reduce ? false : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -28 }}
            transition={{ duration: 0.45, ease }}
            className="relative isolate"
          >
            <OutlineNumber
              value={pad(index + 1)}
              size="lg"
              tone="faint"
              className="absolute -top-10 right-0 -z-10"
            />
            <IconBadge icon={group.icon} />
            <h3 className="mt-6 text-[clamp(28px,3vw,40px)] leading-tight font-semibold tracking-[-0.035em] text-tx">
              {group.name}
            </h3>
            <p className="mt-2 font-mono text-xs text-ac">
              {pad(group.items.length)} {explorer.perDomain}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-mu">{group.desc}</p>

            <Stagger
              as="ul"
              step={0.06}
              viewport={{ amount: 0 }}
              className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]"
            >
              {group.items.map((skill, i) => (
                <StaggerItem key={skill} as="li" variant="pop">
                  <Chip variant="tile" interactive as="div" className="group/tile h-full">
                    <span className="font-mono text-xs text-mu2 transition-colors duration-300 group-hover/tile:text-ac">
                      {pad(i + 1)}
                    </span>
                    <span className="text-[15px] leading-snug text-tx">{skill}</span>
                    <span
                      aria-hidden="true"
                      className="relative mt-auto h-0.5 overflow-hidden rounded-full bg-ln2"
                    >
                      <span className="absolute inset-0 origin-left scale-x-0 bg-ac transition-transform duration-500 ease-expo group-hover/tile:scale-x-100" />
                    </span>
                  </Chip>
                </StaggerItem>
              ))}
            </Stagger>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
