import type { NavItem } from './types'

export const navLinks: readonly NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

/** Keyboard skip link; targets `<main id="main">`. */
export const skipLink: NavItem = { label: 'Skip to content', href: '#main' }

export const availability: NavItem = { label: 'Available for work', href: '#contact' }

export const footer = {
  tagline: 'Designed & built with care.',
  backToTop: 'Back to top',
} as const
