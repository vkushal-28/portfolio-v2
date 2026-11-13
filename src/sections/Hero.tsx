import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import {
  MaskReveal,
  Orbit,
  Reveal,
  RollingText,
  Typewriter,
  type OrbitItem,
} from '@/components/motion'
import {
  Accent,
  Button,
  CodeBlock,
  Eyebrow,
  GridPattern,
  Outline,
  Section,
  WindowFrame,
} from '@/components/ui'
import { hero, profile, techBadges, type TechBadge } from '@/data'

const GRID_MASK = 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 100%)'

const BADGE_SHADOW = '0 10px 30px rgba(0, 0, 0, 0.45)'

/** `#rrggbb` + alpha (0–1) → `rgba(...)`, so motion can interpolate the glow. */
const rgba = (hex: string, alpha: number) => {
  const n = Number.parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
}

const orbitItems = (ring: TechBadge['ring'], glow: boolean): OrbitItem[] =>
  techBadges
    .filter((badge) => badge.ring === ring)
    .map((badge, i) => ({
      id: badge.name,
      angle: badge.angle,
      content: (
        <motion.span
          className="grid size-14 place-items-center rounded-xl border bg-s2/92"
          style={{
            borderColor: `color-mix(in srgb, ${badge.color} 42%, transparent)`,
            boxShadow: `${BADGE_SHADOW}, 0 0 0 0 ${rgba(badge.color, 0)}`,
          }}
          animate={
            glow
              ? {
                  boxShadow: [
                    `${BADGE_SHADOW}, 0 0 0 0 ${rgba(badge.color, 0)}`,
                    `${BADGE_SHADOW}, 0 0 22px 2px ${rgba(badge.color, 0.45)}`,
                    `${BADGE_SHADOW}, 0 0 0 0 ${rgba(badge.color, 0)}`,
                  ],
                }
              : undefined
          }
          transition={{ duration: 3.6, ease: 'easeInOut', repeat: Infinity, delay: i * 0.9 }}
        >
          <img
            src={badge.imageLink}
            alt={badge.name}
            width={40}
            height={40}
            loading="lazy"
            decoding="async"
            className="size-9 object-contain"
          />
        </motion.span>
      ),
    }))

const [firstName, lastName] = profile.name.split(' ')

/** Landing hero: name, role typewriter, rolling phrase, CTAs and the typed code card. */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const outerItems = orbitItems('outer', !reduce)
  const innerItems = orbitItems('inner', !reduce)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.15])
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96])
  const filter = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(6px)'])

  return (
    <Section
      ref={ref}
      id="top"
      contained={false}
      className="flex min-h-[calc(100svh-72px)] items-center overflow-hidden"
    >
      <GridPattern animated mask={GRID_MASK} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 origin-top-right max-md:scale-[0.6] max-md:opacity-60 max-sm:hidden"
      >
        <Orbit
          items={outerItems}
          size={520}
          duration={60}
          dashed
          className="absolute -top-20 -right-30"
        />
        <Orbit
          items={innerItems}
          size={360}
          duration={40}
          reverse
          delay={0.9}
          className="absolute top-0 right-0"
        />
      </div>

      <motion.div
        style={reduce ? undefined : { opacity, y, scale, filter }}
        className="relative mx-auto grid w-full max-w-[1400px] items-center gap-[72px] px-[clamp(16px,3vw,40px)] md:grid-cols-[1.35fr_1fr] md:max-lg:gap-10"
      >
        <div className="min-w-0">
          <Reveal delay={0.1}>
            <Eyebrow dot>{hero.eyebrow}</Eyebrow>
          </Reveal>

          <h1 className="mt-6 text-[clamp(46px,6.4vw,96px)] leading-[0.95] font-semibold tracking-[-0.05em] md:whitespace-nowrap">
            <MaskReveal delay={0.15}>{firstName}</MaskReveal>{' '}
            <MaskReveal delay={0.28}>
              <Outline>{lastName}</Outline>
            </MaskReveal>
            <MaskReveal delay={0.4} className="px-0">
              <Accent>.</Accent>
            </MaskReveal>
          </h1>

          <Reveal variant="fade" delay={0.6} className="mt-[22px]">
            <Typewriter
              items={profile.openToRoles}
              srLabel={hero.rolesLabel}
              className="text-[clamp(24px,2.6vw,34px)] font-medium tracking-[-0.03em] text-ac"
            />
          </Reveal>

          <Reveal variant="fade" delay={0.7} className="mt-[18px]">
            <p className="text-[clamp(20px,2.1vw,28px)] leading-[1.2] tracking-[-0.02em] text-mu">
              {hero.buildPrefix}{' '}
              <RollingText words={profile.rotatingWords} className="font-medium text-tx" />
            </p>
          </Reveal>

          <Reveal delay={0.8}>
            <p className="mt-[18px] max-w-[540px] text-lg leading-relaxed text-mu">
              {profile.headline}
            </p>
          </Reveal>

          <Reveal delay={0.9} className="mt-[34px] flex flex-wrap gap-3">
            <Button href={hero.primaryCta.href} icon="arrow">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.resumeCta.href} variant="ghost" download>
              {hero.resumeCta.label}
            </Button>
          </Reveal>

          <Reveal variant="fade" delay={1.1} className="mt-14">
            <p className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs tracking-[0.1em] text-mu2 uppercase md:flex-wrap sm:flex-nowrap lg:flex-nowrap">
              <span className="shrink-0">{hero.scrollHint}</span>
              <span
                aria-hidden="true"
                className="hidden h-px min-w-6 flex-1 bg-ln2 md:hidden sm:block lg:block"
              />
              <span className="shrink-0">
                {profile.location} — {profile.timezone}
              </span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.5} className="relative min-w-0">
          <div
            aria-hidden="true"
            className="absolute inset-[30px_-20px_-30px_20px] rounded-window border border-ln1 bg-s1"
          />
          <WindowFrame title={hero.codeFile} className="relative" bodyClassName="md:max-lg:p-4">
            <CodeBlock code={hero.code} delay={1} className="text-[clamp(12px,1.1vw,14px)]" />
          </WindowFrame>
        </Reveal>
      </motion.div>
    </Section>
  )
}
