import { useState } from 'react'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import {
  Button,
  MonoLabel,
  ProcessTrack,
  RichText,
  Section,
  SectionHeader,
  SectionIntro,
  SectionTitle,
  ServiceRow,
} from '@/components/ui'
import { offer, services, workflow } from '@/data'
import { ServiceDetail } from './services/ServiceDetail'

const PANEL_ID = 'svc-panel'

export function Services() {
  const [active, setActive] = useState(0)

  return (
    <Section id="services" bordered="top" aria-labelledby="services-title">
      <SectionHeader index={offer.header.index} label={offer.header.label} />
      <SectionIntro
        title={
          <SectionTitle id="services-title">
            <RichText runs={offer.title} />
          </SectionTitle>
        }
        aside={offer.intro}
      />

      {/* 10.1 Service index + detail */}
      <div className="mt-12 grid items-start gap-[clamp(24px,3vw,40px)] md:mt-16 min-[960px]:grid-cols-[1fr_1.15fr]">
        <Stagger as="ul" step={0.06} aria-label={offer.listLabel} className="border-t border-ln2">
          {services.map((service, i) => (
            <StaggerItem key={service.title} as="li" variant="rise">
              <ServiceRow
                index={String(i + 1).padStart(2, '0')}
                title={service.title}
                metric={service.metric}
                active={i === active}
                onSelect={() => setActive(i)}
                controls={PANEL_ID}
              />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.15} className="min-[960px]:sticky min-[960px]:top-24">
          <ServiceDetail
            id={PANEL_ID}
            service={services[active]}
            index={active}
            total={services.length}
          />
        </Reveal>
      </div>

      {/* 10.2 Workflow */}
      <div className="mt-[clamp(72px,8vw,110px)]">
        <SectionIntro
          title={
            <div>
              <MonoLabel>{offer.workflow.label}</MonoLabel>
              <SectionTitle as="h3" size="lg" className="mt-4">
                <RichText runs={offer.workflow.title} />
              </SectionTitle>
            </div>
          }
          aside={offer.workflow.intro}
        />
        <ProcessTrack
          steps={workflow}
          stepLabel={offer.workflow.stepLabel}
          className="mt-12 md:mt-16"
        />
      </div>

      {/* 10.3 CTA strip */}
      <Reveal className="mt-14">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-bento border border-dashed border-ln3 p-6 md:p-8">
          <p className="max-w-2xl text-[clamp(20px,2.2vw,28px)] leading-snug font-medium tracking-[-0.02em] text-balance text-tx">
            {offer.cta.lead}
            <span className="text-mu">{offer.cta.rest}</span>
          </p>
          <Button href={offer.cta.button.href} icon="arrow">
            {offer.cta.button.label}
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}
