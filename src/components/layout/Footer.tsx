import { Container, NavLink } from '@/components/ui'
import { footer, profile } from '@/data'

/** Copyright line and back-to-top link. */
export function Footer() {
  return (
    <footer className="border-t border-ln2">
      <Container className="flex flex-col gap-2 py-8 text-sm text-mu sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. {footer.tagline}
        </p>
        <NavLink href="#top" trailing="↑" className="text-sm">
          {footer.backToTop}
        </NavLink>
      </Container>
    </footer>
  )
}
