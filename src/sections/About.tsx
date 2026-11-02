import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import {
  Chip,
  FactGrid,
  MediaFrame,
  PulseDot,
  RichText,
  Section,
  SectionHeader,
  SectionTitle,
  StatItem,
} from '@/components/ui'
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

        <div className="flex w-full max-w-[440px] flex-col gap-5 max-md:mx-auto md:max-w-none">
          <Reveal>
            <MediaFrame
              src={profile.portrait}
              alt={about.portraitAlt}
              placeholder={about.portraitPlaceholder}
              scan
            >
              <Chip
                variant="pill"
                className="absolute bottom-4 left-4 z-10 max-w-[calc(100%-2rem)] bg-bg/80 text-sm whitespace-normal backdrop-blur-md"
              >
                <PulseDot />
                <span>
                  <span className="text-mu">{about.currentlyLabel}</span> {profile.currently}
                </span>
              </Chip>
            </MediaFrame>
          </Reveal>

          <Reveal delay={0.15}>
            <FactGrid facts={profile.facts} />
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
