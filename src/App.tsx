// Temporary Phase 1 smoke test: confirms Tailwind and both fonts load.
function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-950 p-6 text-neutral-100">
      <h1 className="font-sans text-5xl font-semibold tracking-tight">Kushal Vala</h1>
      <p className="font-mono text-sm tracking-widest text-lime-300 uppercase">
        Phase 1 · setup complete
      </p>
    </main>
  )
}

export default App
