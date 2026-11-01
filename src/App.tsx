import { lazy, Suspense } from 'react'
import { Footer, Navbar } from '@/components/layout'
import { Section, SectionHeader } from '@/components/ui'
import { navLinks } from '@/data'
import { About, Hero, Journey, MarqueeBand, Projects, Services, Skills } from '@/sections'

// Temporary dev route until the real sections exist (removed in Phase 13).
const Playground = lazy(() => import('@/playground/Playground'))
const isPlayground = window.location.pathname.replace(/\/$/, '') === '/playground'

function App() {
  if (isPlayground) {
    return (
      <Suspense fallback={null}>
        <Playground />
      </Suspense>
    )
  }

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <MarqueeBand />
        <About />
        <Journey />
        <Skills />
        <Services />
        <Projects />
        {/* TEMPORARY: anchor targets for the nav; each is replaced by its real section in Phase 12. */}
        {navLinks.map((link, i) =>
          ['#about', '#journey', '#skills', '#services', '#work'].includes(link.href) ? null : (
            <Section
              key={link.href}
              id={link.href.slice(1)}
              band={i % 2 ? 'alt' : 'default'}
              className="min-h-[80vh]"
            >
              <SectionHeader index={String(i + 1).padStart(2, '0')} label={link.label} />
            </Section>
          ),
        )}
      </main>
      <Footer />
    </>
  )
}

export default App
