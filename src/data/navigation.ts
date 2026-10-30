import type { NavItem } from './types'

export const navLinks: readonly NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export const availability: NavItem = { label: 'Available for work', href: '#contact' }

export const footer = {
  tagline: 'Designed & built with care.',
  backToTop: 'Back to top',
} as const
