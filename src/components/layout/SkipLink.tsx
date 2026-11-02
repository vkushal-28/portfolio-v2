import { skipLink } from '@/data'

/** Visually hidden until focused; first tab stop, jumps past the nav to `<main>`. */
export function SkipLink() {
  return (
    <a
      href={skipLink.href}
      className="sr-only rounded-full bg-ac font-medium text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5! focus:py-3!"
    >
      {skipLink.label}
    </a>
  )
}
