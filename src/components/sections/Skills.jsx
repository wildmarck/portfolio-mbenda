import { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsapConfig'
import { skillDomains } from '../../data/skills'
import TiltCard from '../ui/TiltCard'

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skill-card', { y: 60, opacity: 0, scale: 0.95 }, {
        y: 0, opacity: 1, scale: 1,
        stagger: { amount: 0.6, from: 'random' },
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })

      // Stagger pills inside each card
      document.querySelectorAll('.skill-card').forEach((card) => {
        gsap.fromTo(card.querySelectorAll('.skill-pill'),
          { opacity: 0, scale: 0, y: 10 },
          {
            opacity: 1, scale: 1, y: 0,
            stagger: { amount: 0.5, from: 'random' },
            duration: 0.4,
            ease: 'back.out(1.7)',
            scrollTrigger: { trigger: card, start: 'top 80%' },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="section">
      <div className="container">
        <div className="section-label">Compétences</div>
        <h2 className="section-title">Mon arsenal technique</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(1rem, 2vw, 2rem)',
          marginTop: '3rem',
        }} className="skills-grid">
          {skillDomains.map((domain, domainIdx) => (
            <TiltCard
              key={domain.id}
              className="skill-card"
              intensity={8}
              style={{
                background: 'rgba(45,27,14,0.3)',
                border: '1px solid rgba(245,230,211,0.06)',
                borderRadius: '24px',
                padding: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                position: 'relative',
                transform: domainIdx % 2 === 1 ? 'translateY(40px)' : 'none',
                transition: 'border-color 0.3s',
              }}
            >
              {/* Organic shape accent */}
              <div style={{
                position: 'absolute',
                top: '-30%',
                right: '-20%',
                width: '200px',
                height: '200px',
                background: domain.accent,
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                opacity: 0.06,
                filter: 'blur(40px)',
                animation: `blob-morph ${8 + domainIdx}s ease-in-out infinite`,
                pointerEvents: 'none',
              }} />

              {/* Icon */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.2rem',
                color: domain.accentSolid || domain.accent,
                marginBottom: '1rem',
                opacity: 0.7,
              }}>
                {domain.icon}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)',
                color: 'var(--warm-cream)',
                marginBottom: '1.2rem',
              }}>
                {domain.title}
              </h3>

              {/* Skill pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {domain.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-pill"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 400,
                      padding: '0.35rem 0.75rem',
                      borderRadius: '20px',
                      border: `1px solid ${(domain.accentSolid || domain.accent)}33`,
                      color: domain.accentSolid || domain.accent,
                      background: `${(domain.accentSolid || domain.accent)}0D`,
                      transition: 'all 0.3s',
                      cursor: 'default',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = `${(domain.accentSolid || domain.accent)}22`
                      e.target.style.borderColor = `${(domain.accentSolid || domain.accent)}66`
                      e.target.style.transform = 'translateY(-2px) scale(1.05)'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = `${(domain.accentSolid || domain.accent)}0D`
                      e.target.style.borderColor = `${(domain.accentSolid || domain.accent)}33`
                      e.target.style.transform = 'translateY(0) scale(1)'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr !important; }
          .skill-card { transform: none !important; }
        }
      `}</style>
    </section>
  )
}
