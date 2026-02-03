import React, { Suspense } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

const Art = React.lazy(() => import('./components/Art'))

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />

      <Hero />

      <section className="h-[150px]" />

      <About />

      <Suspense fallback={null}>
        <Art />
      </Suspense>

      <Contact />
      <Footer />
    </main>
  )
}

export default App
