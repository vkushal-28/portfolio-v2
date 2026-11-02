import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

type CopyButtonProps = {
  value: string
  label: string
  copiedLabel: string
  className?: string
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text)
  // Fallback for non-secure contexts (e.g. testing over a LAN IP).
  const el = document.createElement('textarea')
  el.value = text
  el.setAttribute('readonly', '')
  el.style.position = 'fixed'
  el.style.opacity = '0'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  el.remove()
}

/** Icon button that copies `value` and briefly swaps to a check mark. */
export function CopyButton({ value, label, copiedLabel, className }: CopyButtonProps) {
  const reduce = useReducedMotion()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  async function onClick() {
    try {
      await copyText(value)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  const Icon = copied ? Check : Copy

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={copied ? copiedLabel : label}
      title={copied ? copiedLabel : label}
      className={cn(
        'grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-ln3 text-mu transition-colors hover:border-ac hover:text-ac',
        copied && 'border-ac text-ac',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? 'check' : 'copy'}
          initial={reduce ? false : { scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={reduce ? undefined : { scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" role="status">
        {copied ? copiedLabel : ''}
      </span>
    </button>
  )
}
