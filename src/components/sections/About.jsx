import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../utils/gsapConfig'
import { timeline } from '../../data/timeline'

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-photo-wrap', { x: -80, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1,
        scrollTrigger: { trigger: '.about-photo-wrap', start: 'top 80%' },
      })

      gsap.fromTo('.about-text > *', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.8,
        scrollTrigger: { trigger: '.about-text', start: 'top 75%' },
      })

      gsap.fromTo('.timeline-item', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.6,
        scrollTrigger: { trigger: '.about-timeline', start: 'top 80%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="section">
      <div className="container">
        <div className="section-label">A propos</div>
        <h2 className="section-title">Mon parcours</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 'clamp(2rem, 5vw, 5rem)',
          marginTop: '3rem',
          alignItems: 'start',
        }} className="about-grid">

          {/* Photo column */}
          <div className="about-photo-wrap" style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              inset: '-10%',
              background: 'linear-gradient(135deg, rgba(196,93,62,0.1), rgba(122,158,126,0.08))',
              borderRadius: '50% 50% 40% 60% / 40% 60% 50% 50%',
              animation: 'blob-morph 10s ease-in-out infinite',
              filter: 'blur(30px)',
            }} />
            <div style={{
              position: 'relative',
              borderRadius: '30% 70% 60% 40% / 50% 40% 60% 50%',
              overflow: 'hidden',
              border: '2px solid rgba(196,93,62,0.15)',
              animation: 'blob-morph 10s ease-in-out infinite reverse',
            }}>
              <img
                src="/images/profile/debout.png"
                alt="Prince Wildmarck MBENDA"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

          </div>

          {/* Text column */}
          <div className="about-text" style={{ paddingTop: '2rem' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'var(--sand)',
              marginBottom: '1.5rem',
            }}>
              Originaire du <strong style={{ color: 'var(--warm-cream)', fontWeight: 500 }}>Gabon</strong>,
              je suis un développeur full-stack passionné par la création de solutions numériques
              qui font la différence. Ma curiosité insatiable m'a conduit à explorer
              le développement web, mobile, les systèmes et l'intelligence artificielle.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'var(--sand)',
              marginBottom: '1.5rem',
            }}>
              De la publication d'une application sur <strong style={{ color: 'var(--warm-cream)', fontWeight: 500 }}>Amazon App Store</strong> à
              la conception de plateformes enterprise intégrant le <strong style={{ color: 'var(--warm-cream)', fontWeight: 500 }}>Big Data</strong> et
              l'<strong style={{ color: 'var(--warm-cream)', fontWeight: 500 }}>IA</strong>, chaque projet
              est une opportunité d'innover et de repousser mes limites.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'var(--sand)',
            }}>
              Mon objectif : combiner expertise technique et vision créative pour construire
              le futur numérique, un projet à la fois.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="about-timeline" style={{ marginTop: 'clamp(4rem, 6vw, 6rem)' }}>
          <div style={{
            display: 'flex',
            gap: '0',
            overflowX: 'auto',
            padding: '2rem 0',
            position: 'relative',
          }}>
            {/* Line */}
            <div style={{
              position: 'absolute',
              top: '2rem',
              left: 0,
              right: 0,
              height: '2px',
              background: 'rgba(196,93,62,0.15)',
            }}>
              <div style={{
                height: '100%',
                background: 'var(--terracotta)',
                width: '100%',
                transformOrigin: 'left',
              }} />
            </div>

            {timeline.map((item, i) => (
              <div
                key={i}
                className="timeline-item"
                style={{
                  flex: '1',
                  minWidth: '200px',
                  paddingTop: '3rem',
                  position: 'relative',
                }}
              >
                {/* Dot */}
                <div style={{
                  position: 'absolute',
                  top: 'calc(2rem - 6px)',
                  left: '0',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: item.type === 'project' ? 'var(--terracotta)' : 'var(--sage-green)',
                  border: '2px solid var(--warm-black)',
                }} />

                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: item.type === 'project' ? 'var(--terracotta)' : 'var(--sage-green)',
                  letterSpacing: '0.05em',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}>
                  {item.year}
                </span>
                <h4 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--warm-cream)',
                  marginBottom: '0.3rem',
                }}>
                  {item.title}
                </h4>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--sand)',
                  lineHeight: 1.5,
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .about-photo-wrap { max-width: 300px; margin: 0 auto; }
        }
      `}</style>
    </section>
  )
}
