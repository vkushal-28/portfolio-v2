import { profile } from '@/data'

/** Lime `kv` mark + name; links back to the top. */
export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a
      href="#top"
      onClick={onClick}
      aria-label={`${profile.name} — back to top`}
      className="group inline-flex min-h-11 shrink-0 items-center gap-3"
    >
      <span
        aria-hidden="true"
        className="grid size-[34px] place-items-center rounded-[10px] bg-ac font-mono text-sm font-medium text-bg transition-transform duration-500 ease-expo group-hover:-rotate-6"
      >
        {profile.initials}
      </span>
      <span className="font-semibold tracking-[-0.02em] whitespace-nowrap">{profile.name}</span>
    </a>
  )
}
