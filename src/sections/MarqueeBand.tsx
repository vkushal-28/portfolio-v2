import { Marquee } from '@/components/motion'
import { cn } from '@/lib/cn'
import { profile } from '@/data'

/** Decorative full-width word band between the hero and About. */
export function MarqueeBand() {
  return (
    <div className="border-y border-ln1 bg-bg2 py-[22px]">
      <Marquee gap={28}>
        {profile.marquee.map((word, i) => (
          <span
            key={word}
            className="flex items-center gap-7 text-[clamp(22px,2.6vw,34px)] font-medium whitespace-nowrap"
          >
            <span className={cn(i % 2 ? 'text-tx' : 'text-mu3')}>{word}</span>
            <span className="text-ac">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  )
}
