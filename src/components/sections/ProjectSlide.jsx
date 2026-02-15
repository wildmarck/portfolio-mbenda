import { useRef, useEffect } from 'react'
import { gsap } from '../../utils/gsapConfig'
import DeviceMockup from '../ui/DeviceMockup'
import TiltCard from '../ui/TiltCard'

export default function ProjectSlide({ project, index }) {
  const slideRef = useRef(null)
  const mockupRef = useRef(null)

  useEffect(() => {
    const el = slideRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Reveal info elements on scroll into view
      gsap.fromTo(el.querySelectorAll('.proj-reveal'),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'left 80%', horizontal: false },
        }
      )

      // Mockup subtle float
      if (mockupRef.current) {
        gsap.to(mockupRef.current, {
          y: -10,
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      }
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={slideRef}
      className="project-slide"
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Accent blob */}
      <div style={{
        position: 'absolute',
        width: '50vw',
        height: '50vw',
        maxWidth: '600px',
        maxHeight: '600px',
        background: project.accent,
        borderRadius: '50%',
        opacity: 0.04,
        filter: 'blur(100px)',
        right: '-10%',
        top: '10%',
        pointerEvents: 'none',
      }} />

      {/* Decorative number watermark */}
      <div style={{
        position: 'absolute',
        right: '5%',
        bottom: '5%',
        fontFamily: 'var(--font-heading)',
        fontWeight: 800,
        fontSize: 'clamp(8rem, 15vw, 14rem)',
        color: project.accent,
        opacity: 0.03,
        lineHeight: 1,
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        {project.num}
      </div>

      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.1fr',
        gap: 'clamp(2rem, 5vw, 5rem)',
        alignItems: 'center',
        padding: '0 2rem',
      }}>
        {/* Info */}
        <div className="project-info" style={{ order: index % 2 === 0 ? 1 : 2 }}>
          <span className="proj-reveal" style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(4rem, 8vw, 8rem)',
            color: project.accent,
            opacity: 0.12,
            lineHeight: 1,
            display: 'block',
            marginBottom: '-1.5rem',
          }}>
            {project.num}
          </span>

          {project.logo && (
            <img
              className="proj-reveal"
              src={project.logo}
              alt={`${project.name} logo`}
              style={{
                height: '40px',
                width: 'auto',
                objectFit: 'contain',
                marginBottom: '1rem',
                opacity: 0.9,
              }}
              loading="lazy"
            />
          )}

          <h3 className="proj-reveal" style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            color: 'var(--warm-cream)',
            marginBottom: '0.5rem',
          }}>
            {project.name}
          </h3>

          <p className="proj-reveal" style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: project.accent,
            marginBottom: '1rem',
          }}>
            {project.tagline}
          </p>

          <p className="proj-reveal" style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'var(--sand)',
            marginBottom: '1.5rem',
            maxWidth: '500px',
          }}>
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="proj-reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.tech.map((t) => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                padding: '0.3rem 0.7rem',
                borderRadius: '20px',
                border: `1px solid ${project.accent}44`,
                color: project.accent,
                background: `${project.accent}11`,
                transition: 'all 0.3s',
              }}
              onMouseOver={(e) => {
                e.target.style.background = `${project.accent}25`
                e.target.style.transform = 'translateY(-1px)'
              }}
              onMouseOut={(e) => {
                e.target.style.background = `${project.accent}11`
                e.target.style.transform = 'translateY(0)'
              }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Mockup with tilt */}
        <div className="project-mockup" style={{
          order: index % 2 === 0 ? 2 : 1,
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div ref={mockupRef}>
            <TiltCard intensity={6} style={{ borderRadius: '12px' }}>
              <DeviceMockup
                type={project.mockupType}
                screenshot={project.screenshots[0]}
                accent={project.accent}
              />
            </TiltCard>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-slide .container {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .project-info { order: 2 !important; }
          .project-mockup { order: 1 !important; margin-bottom: 1rem; }
          .project-slide { height: auto !important; min-height: 100vh; padding: 80px 0 40px; }
        }
      `}</style>
    </div>
  )
}
