import { Menu } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { ease } from '@/components/motion'
import { Button, Container, IconButton, NavLink, PulseDot } from '@/components/ui'
import { availability, navLinks } from '@/data'
import { useMediaQuery } from '@/hooks'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { ScrollProgress } from './ScrollProgress'

const MENU_ID = 'mobile-menu'

/** Sticky 72px top bar with section links, availability CTA, mobile menu and scroll progress. */
export function Navbar() {
  const reduce = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 860px)')
  const showMenu = menuOpen && !isDesktop

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: '-100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease }}
        className="sticky top-0 z-50 border-b border-ln1 bg-bg/72 backdrop-blur-[14px]"
      >
        <Container className="flex h-[72px] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href} className="text-sm">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              href={availability.href}
              variant="ghost"
              size="sm"
              className="hidden min-[560px]:inline-flex"
            >
              <PulseDot />
              {availability.label}
            </Button>
            <IconButton
              icon={<Menu className="size-5" />}
              label="Open menu"
              aria-expanded={showMenu}
              aria-controls={MENU_ID}
              onClick={() => setMenuOpen(true)}
              className="md:hidden"
            />
          </div>
        </Container>
        <ScrollProgress />
      </motion.header>

      {/* Rendered outside the header: its backdrop-filter would trap a fixed overlay. */}
      <AnimatePresence>
        {showMenu && <MobileMenu id={MENU_ID} onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
