import { useEffect, useState } from 'react'

const REFRESH_MS = 20_000

/** Time in `timeZone` (e.g. "4:07 p.m."), or '' if `Intl` can't format it. DST is handled by `Intl`. */
function formatTime(timeZone: string, at: number): string {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone,
    }).format(at)
  } catch {
    return ''
  }
}

/** Formatted local time for an IANA time zone, refreshed every 20s. */
export function useLocalTime(timeZone: string): string {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), REFRESH_MS)
    return () => window.clearInterval(id)
  }, [])

  return formatTime(timeZone, now)
}
