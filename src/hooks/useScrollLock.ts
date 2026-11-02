import { useEffect } from 'react'

/** Prevents the page behind an overlay from scrolling while `active`. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    const { overflow } = document.documentElement.style
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = overflow
    }
  }, [active])
}
