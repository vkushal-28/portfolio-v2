// TEMPORARY (Phase 2): renders every shared component and variant. Remove in Phase 13.
import { ArrowUpRight, Code2, Menu } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import {
  Counter,
  Marquee,
  Orbit,
  Reveal,
  RollingText,
  SpotlightSweep,
  Stagger,
  StaggerItem,
  useTypewriter,
} from '@/components/motion'
import {
  Accent,
  Badge,
  Button,
  Caret,
  Card,
  Chip,
  Eyebrow,
  Field,
  FilterTabs,
  IconButton,
  MonoLabel,
  Muted,
  NavLink,
  Outline,
  OutlineNumber,
  PulseDot,
  Section,
  SectionHeader,
  SectionTitle,
  StatItem,
  TechPill,
  WindowFrame,
} from '@/components/ui'

const tokens = [
  'bg',
  'bg2',
  's1',
  's2',
  's3',
  'ln1',
  'ln2',
  'ln3',
  'ln4',
  'tx',
  'tx2',
  'tx3',
  'mu',
  'mu2',
  'mu3',
  'ac',
  'ac2',
  'info',
  'info-bg',
  'err',
] as const

const roles = ['Sr. Full Stack Engineer', 'Sr. Front End Engineer', 'Sr. React Developer']
const words = ['fintech platforms', 'design systems', 'cloud services', 'AI-assisted tools']
const skills = [
  'React',
  'TypeScript',
  'Node.js',
  'Next.js',
  'MongoDB',
  'Azure',
  'GraphQL',
  'Docker',
]

const outerBadges = [
  { id: 'react', angle: 180, content: <TechPill name="React" color="#61DAFB" /> },
  { id: 'node', angle: 60, content: <TechPill name="Node.js" color="#8CC84B" /> },
  { id: 'mongo', angle: 300, content: <TechPill name="MongoDB" color="#4DB33D" /> },
]
const innerBadges = [
  { id: 'claude', angle: 135, content: <TechPill name="Claude" color="#D97757" /> },
  { id: 'codex', angle: 315, content: <TechPill name="Codex" color="#EDEBE6" /> },
]

type Filter = 'all' | 'fintech' | 'enterprise' | 'cloud'
const filters = [
  { value: 'all', label: 'All' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'cloud', label: 'Cloud' },
] as const

function Demo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-5 border-t border-ln1 pt-8">
      <h3>
        <MonoLabel as="span">{title}</MonoLabel>
      </h3>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  )
}

function TypewriterDemo() {
  const text = useTypewriter(roles, { startDelay: 600 })
  return (
    <p className="h-[1.2em] text-[clamp(24px,2.6vw,34px)] font-medium tracking-[-0.03em] whitespace-nowrap text-ac">
      <span aria-hidden="true">{text}</span>
      <Caret />
      <span className="sr-only">Open to roles: {roles.join(', ')}</span>
    </p>
  )
}

export default function Playground() {
  const [filter, setFilter] = useState<Filter>('all')

  return (
    <main>
      <Section bordered="none">
        <SectionHeader index="00" label="Playground" />
        <SectionTitle as="h1">
          Component <Outline>library</Outline>
          <Accent>.</Accent>
        </SectionTitle>
        <p className="mt-6 max-w-xl text-lg text-mu">
          Every shared component and variant from Phase 2. Temporary — removed in Phase 13.
        </p>
      </Section>

      <Section band="alt" bordered="both" className="flex flex-col">
        <div className="flex flex-col gap-12">
          <Demo title="Colour tokens">
            <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-3">
              {tokens.map((t) => (
                <div key={t} className="flex flex-col gap-2">
                  <span
                    className="h-14 rounded-tile border border-ln2"
                    style={{ background: `var(--color-${t})` }}
                  />
                  <span className="font-mono text-xs text-mu2">{t}</span>
                </div>
              ))}
            </div>
          </Demo>

          <Demo title="Typography">
            <div className="flex flex-col gap-3">
              <p className="text-4xl font-light tracking-tight">Geist 300 — Senior Full Stack</p>
              <p className="text-4xl font-semibold tracking-[-0.045em]">
                Geist 600 — Senior Full Stack
              </p>
              <p className="text-4xl font-extrabold tracking-[-0.055em]">
                Geist 800 — Senior Full Stack
              </p>
              <p className="font-mono text-sm text-tx2">
                JetBrains Mono 400 — const engineer = {'{}'}
              </p>
              <p className="font-mono text-sm font-medium text-tx2">
                JetBrains Mono 500 — 0123456789
              </p>
            </div>
          </Demo>

          <Demo title="SectionTitle sizes + Accent / Outline / Muted">
            <div className="flex flex-col gap-8">
              <SectionTitle as="h3" size="lg">
                How I work<Accent>.</Accent>
              </SectionTitle>
              <SectionTitle size="xl">
                Experience <Muted tone="faint">&amp;</Muted> education
              </SectionTitle>
              <SectionTitle size="display">
                Let’s build <Outline>something</Outline> <Accent>great.</Accent>
              </SectionTitle>
              <SectionTitle size="xl">
                What I <Outline>offer</Outline>
                <Accent>.</Accent> <Muted>(muted)</Muted>
              </SectionTitle>
            </div>
          </Demo>

          <Demo title="Eyebrow / MonoLabel">
            <Eyebrow dot>Senior Full Stack Developer — Portfolio ’26</Eyebrow>
            <MonoLabel>Skill explorer</MonoLabel>
            <MonoLabel tone="accent" dot>
              daily drivers
            </MonoLabel>
          </Demo>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-12">
          <Demo title="Button">
            <Button href="#work" icon="arrow">
              View selected work
            </Button>
            <Button variant="ghost" href="/resume.pdf" download>
              Download résumé
            </Button>
            <Button size="sm" variant="ghost" icon={<PulseDot />}>
              Available for work
            </Button>
            <Button size="sm">Small primary</Button>
          </Demo>

          <Demo title="IconButton">
            <IconButton icon={<ArrowUpRight className="size-5" />} label="Open case study" />
            <IconButton
              icon={<ArrowUpRight className="size-5" />}
              label="Open case study"
              variant="solid"
            />
            <IconButton icon={<Menu className="size-5" />} label="Open menu" href="#menu" />
          </Demo>

          <Demo title="NavLink">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#journey" active>
              Journey (active)
            </NavLink>
            <NavLink href="#" trailing="↗">
              Live
            </NavLink>
            <NavLink href="#top" trailing="↑">
              Back to top
            </NavLink>
            <div className="w-full max-w-md">
              <NavLink href="#" variant="row" trailing="↗">
                GitHub
              </NavLink>
              <NavLink href="#" variant="row" trailing="↗">
                LinkedIn
              </NavLink>
            </div>
          </Demo>

          <Demo title="FilterTabs">
            <FilterTabs
              options={filters}
              value={filter}
              onChange={setFilter}
              ariaLabel="Filter projects"
            />
            <span className="font-mono text-sm text-mu2">value: {filter}</span>
          </Demo>
        </div>
      </Section>

      <Section band="alt" bordered="both">
        <div className="flex flex-col gap-12">
          <Demo title="Chip">
            <Chip>React</Chip>
            <Chip interactive>interactive tag</Chip>
            <Chip variant="pill" dot="solid" interactive>
              TypeScript
            </Chip>
            <Chip variant="pill" dot="hollow" interactive>
              GraphQL
            </Chip>
            <Chip variant="tile" interactive className="w-44">
              <span className="font-mono text-xs text-mu2">01</span>
              <span>Node.js</span>
            </Chip>
          </Demo>

          <Demo title="Badge">
            <Badge tone="accent" dot>
              Experience
            </Badge>
            <Badge tone="info" dot>
              Education
            </Badge>
            <Badge tone="neutral">Fintech</Badge>
          </Demo>

          <Demo title="TechPill · PulseDot · Caret">
            <TechPill name="React" color="#61DAFB" />
            <TechPill name="Claude" color="#D97757" />
            <PulseDot />
            <PulseDot size={12} />
            <PulseDot color="var(--color-info)" />
            <span className="text-2xl">
              line
              <Caret />
            </span>
            <span className="font-mono text-sm">
              block
              <Caret variant="block" />
            </span>
          </Demo>

          <Demo title="Card">
            <div className="grid w-full gap-5 md:grid-cols-3">
              <Card className="p-6">default</Card>
              <Card variant="raised" hoverLift className="p-6">
                raised + hoverLift
              </Card>
              <Card variant="bento" hoverLift className="p-6">
                <SpotlightSweep delay={0.3} />
                bento + SpotlightSweep
              </Card>
            </div>
          </Demo>

          <Demo title="WindowFrame">
            <div className="grid w-full gap-5 lg:grid-cols-3">
              <WindowFrame title="~/kushal/profile.ts">
                <span className="text-[#C792EA]">const</span> engineer = {'{'}
                <br />
                &nbsp;&nbsp;name: <span className="text-ac">"Kushal Vala"</span>,
                <br />
                &nbsp;&nbsp;openToWork: <span className="text-[#F78C6C]">true</span>
                <br />
                {'};'}
                <Caret variant="block" />
              </WindowFrame>
              <WindowFrame variant="terminal" title="Terminal">
                <p className="text-tx3">› generate — components &amp; test scaffolds</p>
                <p className="text-ac">
                  ✓ ship with confidence
                  <Caret variant="block" />
                </p>
              </WindowFrame>
              <WindowFrame variant="browser" title="cibc.com/dashboard">
                <div className="h-3 w-[45%] rounded-full bg-ac/70" />
                <div className="mt-3 h-2 w-3/4 rounded-full bg-ln3" />
                <div className="mt-2 h-2 w-1/2 rounded-full bg-ln3" />
                <div className="mt-4 h-16 rounded-lg bg-s2" />
              </WindowFrame>
            </div>
          </Demo>

          <Demo title="StatItem · OutlineNumber">
            <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-6">
              <StatItem value={8} suffix="+" label="Years shipping" accent />
              <StatItem value={35} suffix="%" label="Faster releases" />
              <StatItem value={120} label="Components built" />
              <StatItem value={4} label="Industries" />
            </div>
            <div className="flex items-end gap-8">
              <OutlineNumber value="06" size="sm" />
              <OutlineNumber value="05" />
              <OutlineNumber value="03" size="lg" tone="faint" />
            </div>
          </Demo>

          <Demo title="Field">
            <Card className="grid w-full max-w-2xl gap-6 p-6 sm:grid-cols-2">
              <Field label="Your name" id="pg-name" placeholder="Jane Doe" />
              <Field
                label="Email"
                id="pg-email"
                type="email"
                placeholder="jane@company.com"
                error="Enter a valid email"
              />
              <Field
                as="textarea"
                label="Message"
                id="pg-message"
                placeholder="Tell me about it…"
                className="sm:col-span-2"
              />
            </Card>
          </Demo>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-12">
          <Demo title="Reveal variants">
            <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Reveal>
                <Card className="p-6">fadeUp</Card>
              </Reveal>
              <Reveal variant="fade" delay={0.1}>
                <Card className="p-6">fade</Card>
              </Reveal>
              <Reveal variant="slideLeft" delay={0.2}>
                <Card className="p-6">slideLeft</Card>
              </Reveal>
              <Reveal variant="slideRight" delay={0.3}>
                <Card className="p-6">slideRight</Card>
              </Reveal>
            </div>
          </Demo>

          <Demo title="Stagger + StaggerItem">
            <Stagger
              as="ul"
              step={0.1}
              className="grid w-full grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3"
            >
              {skills.map((s, i) => (
                <StaggerItem as="li" key={s}>
                  <Chip variant="tile" interactive as="div">
                    <span className="font-mono text-xs text-mu2">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {s}
                  </Chip>
                </StaggerItem>
              ))}
            </Stagger>
          </Demo>

          <Demo title="Counter">
            <span className="text-5xl font-semibold text-ac">
              <Counter to={35} suffix="%" />
            </span>
            <span className="text-5xl font-semibold">
              <Counter to={1.5} decimals={1} prefix="$" suffix="B" />
            </span>
          </Demo>

          <Demo title="useTypewriter + RollingText">
            <div className="flex flex-col gap-4">
              <TypewriterDemo />
              <p className="text-[clamp(20px,2.1vw,28px)]">
                <span className="text-mu">I build </span>
                <RollingText words={words} className="font-medium text-tx" />
              </p>
            </div>
          </Demo>
        </div>
      </Section>

      <div className="border-y border-ln1 bg-bg2 py-[22px]">
        <Marquee gap={28}>
          {['Full stack', 'Fintech', 'Design systems', 'Cloud', 'AI workflow'].map((w, i) => (
            <span
              key={w}
              className="flex items-center gap-7 text-[clamp(22px,2.6vw,34px)] font-medium"
            >
              <span className={i % 2 ? 'text-tx' : 'text-mu3'}>{w}</span>
              <span className="text-ac">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      <Section>
        <div className="flex flex-col gap-12">
          <Demo title="Marquee — pills, fadeEdges, both directions">
            <div className="flex w-full flex-col gap-3">
              <Marquee speed={48} fadeEdges gap={12}>
                {skills.map((s) => (
                  <Chip key={s} variant="pill" dot="solid" interactive>
                    {s}
                  </Chip>
                ))}
              </Marquee>
              <Marquee speed={56} direction="right" fadeEdges gap={12}>
                {skills.map((s) => (
                  <Chip key={s} variant="pill" dot="hollow" interactive>
                    {s}
                  </Chip>
                ))}
              </Marquee>
            </div>
          </Demo>

          <Demo title="Orbit">
            <div className="relative grid h-[600px] w-full place-items-center overflow-hidden rounded-bento border border-ln2 bg-s1">
              <div className="absolute">
                <Orbit size={520} duration={60} dashed items={outerBadges} />
              </div>
              <div className="absolute">
                <Orbit size={360} duration={40} reverse items={innerBadges} />
              </div>
              <Code2 aria-hidden="true" className="size-8 text-ac" />
            </div>
          </Demo>
        </div>
      </Section>
    </main>
  )
}
