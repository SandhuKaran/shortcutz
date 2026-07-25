import { lazy, Suspense } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Ticker from './components/Ticker.jsx'
import Gallery from './components/Gallery.jsx'
import Services from './components/Services.jsx'
import Team from './components/Team.jsx'
import Visit from './components/Visit.jsx'
import Footer from './components/Footer.jsx'

// three.js is ~40% of the bundle — keep it out of the critical path so
// the hero paints immediately and the scene fades in behind it.
const Scene = lazy(() => import('./three/Scene.jsx'))

export default function App() {
  return (
    <>
      {/* Fixed 3D backdrop. Sits behind everything and ignores pointers. */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        {/* Vignette — keeps the models from fighting the copy for attention */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% 45%, transparent 40%, rgba(5,5,5,0.72) 100%)',
          }}
        />
        {/* Phones have no room to keep 3D and text apart, so knock the
            scene back further there. Desktop keeps it at full strength. */}
        <div className="absolute inset-0 bg-ink/45 md:hidden" />
      </div>

      {/* Film grain over the whole page */}
      <div
        className="grain pointer-events-none fixed inset-0 z-1 opacity-[0.16] mix-blend-overlay"
        aria-hidden="true"
      />

      <div className="relative z-2">
        <Nav />
        <main id="main">
          <Hero />
          <Ticker />
          <Gallery />
          <Services />
          <Team />
          <Visit />
        </main>
        <Footer />
      </div>
    </>
  )
}
