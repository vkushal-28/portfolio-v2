import { Footer, Navbar, SkipLink } from '@/components/layout'
import { About, Contact, Hero, Journey, MarqueeBand, Projects, Services, Skills } from '@/sections'

function App() {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
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
