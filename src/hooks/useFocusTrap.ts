import { useEffect, useEffectEvent, useRef } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * While `active`, keeps Tab focus inside the returned ref's element, focuses its first
 * control, calls `onEscape` on Esc, and restores the previous focus when deactivated.
 */
export function useFocusTrap<T extends HTMLElement>(active: boolean, onEscape?: () => void) {
  const ref = useRef<T>(null)
  const handleEscape = useEffectEvent(() => onEscape?.())

  useEffect(() => {
    const node = ref.current
    if (!active || !node) return
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const focusables = () =>
      Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0,
      )

    focusables()[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleEscape()
        return
      }
      if (event.key !== 'Tab') return
      const items = focusables()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previous?.focus()
    }
  }, [active])

  return ref
}
