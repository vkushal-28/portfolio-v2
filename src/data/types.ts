import type { LucideIcon } from 'lucide-react'

/** Heading copy split into styled runs (rendered with Accent / Muted). */
export type TextRun = { text: string; tone?: 'accent' | 'muted' | 'faint' | 'outline' }

export type Fact = { label: string; value: string }

export type Stat = { value: number; prefix?: string; suffix?: string; label: string }

export type Profile = {
  name: string
  initials: string
  title: string
  location: string
  timezone: string
  headline: string
  /** Typed one at a time in the hero. Any length. */
  openToRoles: readonly string[]
  rotatingWords: readonly string[]
  currently: string
  about: readonly string[]
  aboutStatement: readonly TextRun[]
  facts: readonly Fact[]
  stats: readonly Stat[]
  marquee: readonly string[]
  email: string
  resumeUrl: string
  /** Portrait image URL; the About card shows a placeholder until set. */
  portrait?: string
  badge: Badge
}

export type BadgeField = {
  label: string
  value: string
  /** Value in the accent colour. */
  accent?: boolean
  /** Leading pulsing dot. */
  pulse?: boolean
}

/** Developer ID badge in the About section. */
export type Badge = {
  lanyardText: string
  header: { left: string; right: string }
  name: string
  title: string
  fields: readonly BadgeField[]
  now: string
  /** IANA zone for the live clock, e.g. `America/Toronto`. */
  timeZone: string
  timeZoneLabel: string
  /** Real illustration; until set, the animated `DeveloperAvatar` is shown. */
  artworkSrc?: string
}

export type SocialIcon = 'linkedin' | 'github' | 'email'

export type Social = { label: string; href: string; icon?: SocialIcon }

export type NavItem = { label: string; href: string }

export const experienceTypes = ['Experience', 'Education'] as const
export type ExperienceType = (typeof experienceTypes)[number]

export type Milestone = {
  type: ExperienceType
  when: string
  title: string
  org: string
  desc?: string
  tags: readonly string[]
  /** Short fake commit hash shown on the card. */
  hash: string
}

export type SkillGroup = {
  name: string
  /** Short label for the explorer tabs (defaults to `name`). */
  tab?: string
  icon: LucideIcon
  desc: string
  items: readonly string[]
}

export type CoreStackItem = { name: string; sub: string }

export type Service = {
  title: string
  icon: LucideIcon
  desc: string
  /** Exactly three "what you get" items. */
  deliver: readonly [string, string, string]
  metric: string
  metricLabel: string
  where: string
  stack: readonly string[]
}

export type WorkflowStep = {
  title: string
  icon: LucideIcon
  desc: string
  tag: string
}

export const projectCategories = ['Full-Stack', 'Front-End', 'Back-End'] as const
export type ProjectCategory = (typeof projectCategories)[number]

export type Project = {
  cat: ProjectCategory
  num: string
  meta: string
  title: string
  desc: string
  stack: readonly string[]
  /** Accent colour for the mock browser bar. */
  tint: string
  liveUrl: string
  codeUrl: string
  /** Screenshot URL; the card shows a placeholder until set. */
  image?: string
}

export type TechBadge = {
  name: string
  color: string
  imageLink: string
  ring: 'outer' | 'inner'
  /** Degrees, clockwise from 3 o'clock (see `Orbit`). */
  angle: number
}
