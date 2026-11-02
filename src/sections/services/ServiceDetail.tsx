import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Stagger, StaggerItem, ease, spring } from '@/components/motion'
import { Card, CheckItem, Chip, Glow, IconBadge, MonoLabel, OutlineNumber } from '@/components/ui'
import { offer, type Service } from '@/data'
import { pad2 } from '@/lib/format'

type ServiceDetailProps = {
  id: string
  service: Service
  index: number
  total: number
}

/** Sticky detail card for the selected service; cross-fades between services. */
export function ServiceDetail({ id, service, index, total }: ServiceDetailProps) {
  const reduce = useReducedMotion()
  const { detail } = offer

  return (
    <Card
      id={id}
      role="region"
      aria-live="polite"
      aria-label={service.title}
      className="relative isolate overflow-hidden p-6 md:p-9"
    >
      <Glow size={360} className="-bottom-40 -left-32 -z-10" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={service.title}
          initial={reduce ? false : { opacity: 0, y: 18, scale: 0.985, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={reduce ? undefined : { opacity: 0, y: -10, filter: 'blur(4px)' }}
          transition={{ duration: 0.6, ease }}
          className="relative"
        >
          <OutlineNumber
            value={pad2(index + 1)}
            size="lg"
            tone="faint"
            className="absolute -top-12 -right-2 -z-10"
          />
          <div className="flex items-start justify-between gap-4">
            <motion.span
              initial={reduce ? false : { scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={spring}
            >
              <IconBadge icon={service.icon} size="lg" />
            </motion.span>
            <span className="font-mono text-xs text-mu2">
              {detail.service} {pad2(index + 1)} / {pad2(total)}
            </span>
          </div>

          <h3 className="mt-7 text-[clamp(26px,2.8vw,36px)] leading-[1.1] font-semibold tracking-[-0.035em] text-tx">
            {service.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-mu">{service.desc}</p>

          <MonoLabel className="mt-8">{detail.deliverLabel}</MonoLabel>
          <Stagger
            as="ul"
            step={0.06}
            delay={0.2}
            viewport={{ amount: 0 }}
            className="mt-4 flex flex-col gap-3"
          >
            {service.deliver.map((item) => (
              <StaggerItem key={item} as="li" variant="rise">
                <CheckItem>{item}</CheckItem>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 rounded-2xl border border-ln2 bg-bg/60 p-5">
            <div>
              <p className="text-[clamp(34px,3.4vw,46px)] leading-none font-semibold tracking-[-0.04em] text-ac">
                {service.metric}
              </p>
              <p className="mt-2 text-sm text-mu">{service.metricLabel}</p>
            </div>
            <p className="font-mono text-xs text-mu2">
              {detail.provenAt} <span className="text-tx2">{service.where}</span>
            </p>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2">
            {service.stack.map((tech) => (
              <Chip key={tech} as="li">
                {tech}
              </Chip>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </Card>
  )
}
