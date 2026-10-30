import { X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { ease, Stagger, StaggerItem } from '@/components/motion'
import { Button, Container, IconButton, MonoLabel, NavLink } from '@/components/ui'
import { availability, navLinks, profile } from '@/data'
import { useFocusTrap, useScrollLock } from '@/hooks'
import { Logo } from './Logo'

export type MobileMenuProps = {
  id: string
  onClose: () => void
}

/** Full-screen menu dialog for small screens: focus trap, Esc to close, staggered links. */
export function MobileMenu({ id, onClose }: MobileMenuProps) {
  const reduce = useReducedMotion()
  const ref = useFocusTrap<HTMLDivElement>(true, onClose)
  useScrollLock(true)

  return (
    <motion.div
      ref={ref}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-60 flex flex-col bg-bg/95 backdrop-blur-[14px] md:hidden"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.4, ease }}
    >
      <div className="border-b border-ln1">
        <Container className="flex h-[72px] items-center justify-between gap-4">
          <Logo onClick={onClose} />
          <IconButton icon={<X className="size-5" />} label="Close menu" onClick={onClose} />
        </Container>
      </div>

      <Container className="flex flex-1 flex-col justify-between gap-10 overflow-y-auto py-10">
        <nav aria-label="Mobile">
          <Stagger as="ol" step={0.07} delay={0.1} className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <StaggerItem as="li" key={link.href} className="flex items-baseline gap-4">
                <span aria-hidden="true" className="font-mono text-xs text-ac">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <NavLink
                  href={link.href}
                  onClick={onClose}
                  className="min-h-14 text-[clamp(36px,11vw,56px)] font-semibold tracking-[-0.045em] text-tx"
                >
                  {link.label}
                </NavLink>
              </StaggerItem>
            ))}
          </Stagger>
        </nav>

        <div className="flex flex-col gap-5">
          <Button href={availability.href} onClick={onClose} icon="arrow" className="w-full">
            {availability.label}
          </Button>
          <MonoLabel>
            {profile.location} — {profile.timezone}
          </MonoLabel>
        </div>
      </Container>
    </motion.div>
  )
}
