import { useEffect, useRef } from 'react'
import { ScrollTrigger } from './utils/gsapConfig'
import { initSmoothScroll } from './utils/smoothScrollConfig'
import { useStore } from './store/useStore'

import Preloader from './components/layout/Preloader'
import Navbar from './components/layout/Navbar'
import SideNav from './components/layout/SideNav'
import CustomCursor from './components/layout/CustomCursor'
import BackgroundShader from './components/webgl/BackgroundShader'
import InteractiveGecko from './components/ui/InteractiveGecko'
import ScrollProgress from './components/layout/ScrollProgress'

import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Metrics from './components/sections/Metrics'
import Contact from './components/sections/Contact'

const sectionIds = ['hero', 'about', 'skills', 'projects', 'metrics', 'contact']

export default function App() {
  const isLoading = useStore((s) => s.isLoading)
  const setActiveSection = useStore((s) => s.setActiveSection)
  const mainRef = useRef(null)

  useEffect(() => {
    const lenis = initSmoothScroll()
    return () => lenis?.destroy()
  }, [])

  useEffect(() => {
    if (isLoading) return

    // Track active section
    sectionIds.forEach((id, index) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(index),
        onEnterBack: () => setActiveSection(index),
      })
    })

    ScrollTrigger.refresh()
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [isLoading, setActiveSection])

  return (
    <>
      <BackgroundShader />
      {isLoading && <Preloader />}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <SideNav />
      <InteractiveGecko />

      <main ref={mainRef}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Metrics />
        <Contact />
      </main>
    </>
  )
}
