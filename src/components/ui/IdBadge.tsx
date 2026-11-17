import type { Badge } from '@/data/types'
import { useLocalTime } from '@/hooks/useLocalTime'
import { cn } from '@/lib/cn'
import { DeveloperAvatar } from './DeveloperAvatar'
import { PulseDot } from './PulseDot'

export type IdBadgeProps = {
  badge: Badge
  className?: string
}

const BARCODE =
  'repeating-linear-gradient(90deg, var(--color-tx2) 0 2px, transparent 2px 4px, var(--color-tx2) 4px 5px, transparent 5px 8px, var(--color-tx2) 8px 11px, transparent 11px 13px, var(--color-tx2) 13px 14px, transparent 14px 17px)'

const corners = [
  'top-3 left-3 border-t-2 border-l-2',
  'top-3 right-3 border-t-2 border-r-2',
  'bottom-3 left-3 border-b-2 border-l-2',
  'bottom-3 right-3 border-b-2 border-r-2',
]

/**
 * Developer ID badge hanging from a lanyard: sways gently, tilts in 3D on hover / focus-within
 * and speeds up the avatar's typing. Hover, sway, sheen and float live in `index.css` (`.id-*`).
 */
export function IdBadge({ badge, className }: IdBadgeProps) {
  const time = useLocalTime(badge.timeZone)

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[380px] pt-[92px] perspective-[1200px]',
        className,
      )}
    >
      {/* Lanyard */}
      <div
        aria-hidden="true"
        className="absolute -top-6 left-1/2 flex h-28 w-[30px] -translate-x-1/2 justify-center overflow-hidden rounded-[4px] border border-ln3 bg-s3"
      >
        <span className="font-mono text-[9px] tracking-[.3em] whitespace-nowrap text-ac/80 [writing-mode:vertical-rl]">
          {badge.lanyardText}
        </span>
      </div>
      {/* Clip (does not swing) */}
      <div
        aria-hidden="true"
        className="absolute top-[87px] left-1/2 z-[2] h-6 w-[46px] -translate-x-1/2 rounded-[7px] border border-[#6b717c] bg-[linear-gradient(180deg,#5a5f69,#2c3036)] shadow-[0_4px_10px_rgba(0,0,0,.5)]"
      />

      <div className="id-swing">
        <article
          aria-label={`Developer ID: ${badge.name}, ${badge.title}`}
          tabIndex={0}
          className="id-badge group/badge relative overflow-hidden rounded-card border border-ln3 bg-[linear-gradient(165deg,var(--color-s2),var(--color-s1)_70%)] outline-none focus-visible:ring-2 focus-visible:ring-ac/60"
        >
          {/* Punched hole */}
          <span
            aria-hidden="true"
            className="absolute top-3 left-1/2 h-2.5 w-[58px] -translate-x-1/2 rounded-full border border-ln3 bg-bg"
          />

          <div className="flex justify-between px-[22px] pt-[30px] font-mono text-[11px] tracking-[.14em] text-mu2">
            <span>{badge.header.left}</span>
            <span className="text-ac">{badge.header.right}</span>
          </div>

          {/* Illustration panel */}
          <div
            aria-hidden="true"
            className="relative mx-[22px] mt-4 h-[220px] overflow-hidden rounded-tile border border-ln2 bg-[radial-gradient(circle_at_30%_20%,var(--color-s3),var(--color-bg))]"
          >
            <span className="absolute inset-0 bg-[radial-gradient(var(--color-ln3)_1px,transparent_1px)] bg-size-[14px_14px] opacity-60" />
            <span className="id-scan absolute inset-x-0 top-0 h-[70px] bg-[linear-gradient(180deg,transparent,color-mix(in_srgb,var(--color-ac)_14%,transparent),transparent)]" />
            {corners.map((pos) => (
              <span key={pos} className={cn('absolute size-[18px] border-ac', pos)} />
            ))}
            {badge.artworkSrc ? (
              <img
                src={badge.artworkSrc}
                alt=""
                className="id-avatar absolute bottom-0 left-[14%] h-[96%] w-[72%] object-contain object-bottom"
              />
            ) : (
              <DeveloperAvatar className="id-avatar absolute bottom-0 left-[14%] h-[96%] w-[72%]" />
            )}
          </div>

          <div className="px-[22px] pt-5">
            <p className="text-[26px] leading-tight font-semibold tracking-[-0.03em] text-tx">
              {badge.name}
            </p>
            <p className="mt-1 text-[15px] text-ac">{badge.title}</p>
          </div>

          <dl className="mx-[22px] mt-[18px] grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-ln2">
            {badge.fields.map((field) => (
              <div key={field.label} className="bg-s1 px-3 py-2.5">
                <dt className="font-mono text-[10px] tracking-[.12em] text-mu2 uppercase">
                  {field.label}
                </dt>
                <dd
                  className={cn(
                    'mt-1 flex items-center gap-1.5 text-sm',
                    field.accent ? 'text-ac' : 'text-tx',
                  )}
                >
                  {field.pulse && <PulseDot size={6} />}
                  {field.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mx-[22px] mt-4 rounded-[10px] border border-ln2 bg-s3 px-3 py-2.5 text-[13px] text-tx2">
            <span className="font-mono text-[11px] text-mu2">NOW → </span>
            {badge.now}
          </p>

          <div className="mx-[22px] mt-[18px] mb-[22px] flex items-end justify-between gap-4 border-t border-dashed border-ln3 pt-4">
            <span
              aria-hidden="true"
              className="h-[34px] w-[150px] max-w-[50%] opacity-75"
              style={{ background: BARCODE }}
            />
            <p className="text-right">
              <span className="block font-mono text-[11px] tracking-[.1em] text-mu2">
                LOCAL TIME
              </span>
              <span className="text-[15px] text-tx">
                {time} <span className="text-ac">{badge.timeZoneLabel}</span>
              </span>
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}
