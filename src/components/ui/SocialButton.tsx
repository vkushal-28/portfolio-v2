import { ArrowUpRight } from 'lucide-react'
import type { CSSProperties, SVGProps } from 'react'
import { cn } from '@/lib/cn'
import type { SocialIcon } from '@/data/types'
import { Pressable } from './Pressable'

type IconProps = SVGProps<SVGSVGElement>

const LinkedInIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
)

const GitHubIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3Z" />
  </svg>
)

/** Gmail M, single colour (`currentColor`). */
const GmailIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M2 8.5v9.25C2 18.44 2.56 19 3.25 19H6v-7.7L2 8.5Z" />
    <path d="M18 11.3V19h2.75c.69 0 1.25-.56 1.25-1.25V8.5l-4 2.8Z" />
    <path d="M18 6.6v4.7l4-2.8V7.1c0-1.55-1.77-2.43-3-1.5l-1 .99Z" />
    <path d="M6 11.3V6.6l6 4.4 6-4.4v4.7l-6 4.3-6-4.3Z" />
    <path d="M2 7.1v1.4l4 2.8V6.6l-1-.99C3.77 4.67 2 5.55 2 7.1Z" />
  </svg>
)

/** Brand colours: `bg`/`fg` for the logo chip, `glow` for the border beam, wash and arrow. */
const brands = {
  linkedin: { Icon: LinkedInIcon, bg: '#0a66c2', fg: '#ffffff', glow: '#3d9bff' },
  github: { Icon: GitHubIcon, bg: '#f0f6fc', fg: '#0d1117', glow: '#a371f7' },
  email: { Icon: GmailIcon, bg: '#ea4335', fg: '#ffffff', glow: '#ff6b5e' },
} satisfies Record<
  SocialIcon,
  { Icon: (props: IconProps) => unknown; bg: string; fg: string; glow: string }
>

export type SocialButtonProps = {
  icon: SocialIcon
  label: string
  href: string
  className?: string
}

/**
 * Profile / contact pill (http links open in a new tab; `mailto:` stays put) in the network's brand colours: logo chip that tilts on hover,
 * a rotating brand-coloured border, a wash sweeping up from below and a diagonal arrow.
 */
export function SocialButton({ icon, label, href, className }: SocialButtonProps) {
  const { Icon, bg, fg, glow } = brands[icon]
  const external = /^https?:/.test(href)
  return (
    <Pressable
      href={href}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      aria-label={external ? `${label} (opens in a new tab)` : label}
      style={{ '--brand-bg': bg, '--brand-fg': fg, '--glow-color': glow } as CSSProperties}
      className={cn(
        'group glow-border relative isolate inline-flex min-h-10 items-center gap-2 overflow-hidden rounded-full border border-[color-mix(in_srgb,var(--glow-color)_45%,transparent)] bg-s1/70 py-1 pr-3 pl-1 text-[13px] font-medium text-tx backdrop-blur-sm transition-[border-color,box-shadow] duration-500 select-none hover:border-transparent hover:shadow-[0_0_32px_-6px_color-mix(in_srgb,var(--glow-color)_70%,transparent)]',
        className,
      )}
    >
      {/* Brand-coloured wash that rises from the bottom edge on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 translate-y-full bg-[linear-gradient(to_top,color-mix(in_srgb,var(--glow-color)_22%,transparent),transparent)] transition-transform duration-500 ease-expo group-hover:translate-y-0"
      />
      <span
        aria-hidden="true"
        className="grid size-7 place-items-center rounded-full bg-(--brand-bg) text-(--brand-fg) shadow-[0_0_14px_-2px_color-mix(in_srgb,var(--glow-color)_55%,transparent)] transition-[rotate,scale,box-shadow] duration-500 ease-expo group-hover:scale-110 group-hover:-rotate-12 group-hover:shadow-[0_0_22px_0_color-mix(in_srgb,var(--glow-color)_75%,transparent)] motion-reduce:group-hover:rotate-0"
      >
        <Icon className="size-3.5" />
      </span>
      <span aria-hidden="true">{label}</span>
      <span
        aria-hidden="true"
        className="relative size-3.5 overflow-hidden text-(--glow-color) transition-colors duration-300"
      >
        <ArrowUpRight className="absolute inset-0 size-3.5 transition-transform duration-500 ease-expo group-hover:translate-x-3.5 group-hover:-translate-y-3.5" />
        <ArrowUpRight className="absolute inset-0 size-3.5 -translate-x-3.5 translate-y-3.5 transition-transform duration-500 ease-expo group-hover:translate-0" />
      </span>
    </Pressable>
  )
}
