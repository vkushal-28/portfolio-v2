import { RichText, Section, SectionHeader, SectionIntro, SectionTitle } from '@/components/ui'
import { toolkit } from '@/data'
import { AiWorkflow } from './skills/AiWorkflow'
import { BentoCard } from './skills/BentoCard'
import { CoreStack } from './skills/CoreStack'
import { SkillExplorer } from './skills/SkillExplorer'
import { SkillMarquee } from './skills/SkillMarquee'

export function Skills() {
  return (
    <Section id="skills" aria-labelledby="skills-title">
      <SectionHeader index={toolkit.header.index} label={toolkit.header.label} />
      <SectionIntro
        title={
          <SectionTitle id="skills-title">
            <RichText runs={toolkit.title} />
          </SectionTitle>
        }
        aside={toolkit.intro}
      />

      <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 min-[960px]:grid-cols-12">
        <BentoCard delay={0} className="min-[960px]:col-span-7 min-[960px]:row-span-2">
          <SkillExplorer />
        </BentoCard>
        <BentoCard delay={0.12} className="min-[960px]:col-span-5">
          <CoreStack />
        </BentoCard>
        <BentoCard
          delay={0.22}
          className="min-[960px]:col-span-5"
          cardClassName="bg-linear-to-br from-ac-deep to-s1"
        >
          <AiWorkflow />
        </BentoCard>
        <BentoCard delay={0.3} className="min-[960px]:col-span-12">
          <SkillMarquee />
        </BentoCard>
      </div>
    </Section>
  )
}
