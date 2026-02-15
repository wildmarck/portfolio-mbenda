import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../../utils/gsapConfig'
import { projects } from '../../data/projects'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import ProjectSlide from './ProjectSlide'

export default function Projects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    if (isMobile) return

    const ctx = gsap.context(() => {
      const track = trackRef.current
      const slides = track.querySelectorAll('.project-slide')
      const totalWidth = slides.length * window.innerWidth

      gsap.set(track, { width: totalWidth })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${totalWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        animation: gsap.to(track, {
          x: -(totalWidth - window.innerWidth),
          ease: 'none',
        }),
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (projects.length - 1))
          setCurrentSlide(idx)
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  return (
    <section ref={sectionRef} id="projects" style={{ overflow: 'hidden', position: 'relative' }}>
      {/* Section header */}
      <div style={{
        position: 'absolute',
        top: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        textAlign: 'center',
        pointerEvents: 'none',
      }}>
        <div className="section-label" style={{ marginBottom: '0.3rem' }}>Projets</div>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: 'clamp(1.3rem, 2vw, 1.8rem)',
          color: 'var(--warm-cream)',
        }}>
          Ce que j'ai construit
        </h2>
      </div>

      {/* Slide counter (desktop only) */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          pointerEvents: 'none',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: 'var(--terracotta)',
          }}>
            {String(currentSlide + 1).padStart(2, '0')}
          </span>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {projects.map((_, i) => (
              <div key={i} style={{
                width: currentSlide === i ? '24px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: currentSlide === i ? 'var(--terracotta)' : 'rgba(184,169,154,0.3)',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }} />
            ))}
          </div>

          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: 'var(--sand)',
            opacity: 0.5,
          }}>
            {String(projects.length).padStart(2, '0')}
          </span>
        </div>
      )}

      {isMobile ? (
        <div style={{ paddingTop: '100px' }}>
          {projects.map((project, i) => (
            <ProjectSlide key={project.id} project={project} index={i} />
          ))}
        </div>
      ) : (
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            willChange: 'transform',
          }}
        >
          {projects.map((project, i) => (
            <ProjectSlide key={project.id} project={project} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}
