import { lazy, Suspense } from 'react'
import { Footer, Navbar } from '@/components/layout'
import { About, Contact, Hero, Journey, MarqueeBand, Projects, Services, Skills } from '@/sections'

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
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
