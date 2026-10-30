import { lazy, Suspense } from 'react'
import { Button, Section, SectionTitle } from '@/components/ui'

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
    <main>
      <Section>
        <SectionTitle as="h1">Kushal Vala</SectionTitle>
        <Button href="/playground" icon="arrow" className="mt-8">
          Open component playground
        </Button>
      </Section>
    </main>
  )
}

export default App
