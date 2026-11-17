import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { IdBadge, RichText, Section, SectionHeader, SectionTitle, StatItem } from '@/components/ui'
import { about, profile } from '@/data'

export function About() {
  return (
    <Section id="about" aria-labelledby="about-title">
      <SectionHeader index={about.header.index} label={about.header.label} />

      <div className="grid gap-14 md:grid-cols-[1.5fr_1fr] md:gap-16 lg:gap-24">
        <div>
          <SectionTitle id="about-title" size="lg">
            <RichText runs={profile.aboutStatement} />
          </SectionTitle>

          <Stagger step={0.12} delay={0.15} className="mt-8 flex max-w-[62ch] flex-col gap-5">
            {profile.about.map((paragraph) => (
              <StaggerItem key={paragraph.slice(0, 24)} as="div">
                <p className="text-lg leading-[1.75] text-mu">{paragraph}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger
            as="ul"
            step={0.1}
            className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-x-8 gap-y-10 border-t border-ln2 pt-10"
          >
            {profile.stats.map((stat, i) => (
              <StaggerItem key={stat.label} as="li">
                <StatItem {...stat} accent={i === 0} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal className="w-full max-w-[440px] max-md:mx-auto md:max-w-none">
          <IdBadge badge={profile.badge} />
        </Reveal>
      </div>
    </Section>
  )
}
