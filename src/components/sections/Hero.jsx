import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../utils/gsapConfig'
import MagneticButton from '../ui/MagneticButton'
import { scrollTo } from '../../utils/smoothScrollConfig'
import { useStore } from '../../store/useStore'

export default function Hero() {
  const sectionRef = useRef(null)
  const photoRef = useRef(null)
  const textRef = useRef(null)
  const setCursorVariant = useStore((s) => s.setCursorVariant)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.2 })

      tl.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo('.hero-name-line', { y: '120%' }, { y: '0%', stagger: 0.15, duration: 0.9, ease: 'power3.out' }, '-=0.3')
        .fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, '-=0.3')
        .fromTo('.hero-stat', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, '-=0.3')
        .fromTo(photoRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }, '-=0.8')
        // no floating pills

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (textRef.current) gsap.set(textRef.current, { y: self.progress * -80 })
          if (photoRef.current) gsap.set(photoRef.current, { y: self.progress * -40 })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 0 80px',
      }}
    >
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(2rem, 4vw, 4rem)',
        alignItems: 'center',
      }}>
        {/* Left — Text */}
        <div ref={textRef} className="hero-left">
          <div
            className="hero-badge"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--terracotta)',
              padding: '0.4rem 1rem',
              border: '1px solid rgba(196,93,62,0.3)',
              borderRadius: '20px',
              marginBottom: '1.5rem',
              opacity: 0,
            }}
          >
            Développeur Full-Stack
          </div>

          <h1 style={{ marginBottom: '1.5rem' }}>
            {['PRINCE', 'WILDMARCK', 'MBENDA'].map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span
                  className="hero-name-line"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: i === 1 ? 'clamp(2.5rem, 6.5vw, 5.5rem)' : 'clamp(2rem, 5.5vw, 4.5rem)',
                    lineHeight: 1.05,
                    background: i === 1
                      ? 'linear-gradient(135deg, var(--terracotta), var(--golden-amber))'
                      : 'none',
                    color: i === 1 ? 'transparent' : 'var(--warm-cream)',
                    WebkitBackgroundClip: i === 1 ? 'text' : undefined,
                    backgroundClip: i === 1 ? 'text' : undefined,
                    transform: 'translateY(120%)',
                  }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="hero-subtitle"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
              fontWeight: 300,
              color: 'var(--sand)',
              lineHeight: 1.7,
              maxWidth: '460px',
              marginBottom: '2rem',
              opacity: 0,
            }}
          >
            Passionné par la création d'expériences numériques innovantes.
            Du Gabon au monde tech — Web, Mobile, Big Data & IA.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <div className="hero-cta" style={{ opacity: 0 }}>
              <MagneticButton onClick={() => scrollTo('#projects')}>
                Voir mes projets
              </MagneticButton>
            </div>
            <div className="hero-cta" style={{ opacity: 0 }}>
              <MagneticButton variant="outline" onClick={() => scrollTo('#contact')}>
                Me contacter
              </MagneticButton>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '3rem' }}>
            {[
              { num: '5+', label: 'Projets' },
              { num: '8+', label: 'Technologies' },
            ].map((stat) => (
              <div key={stat.label} className="hero-stat" style={{ opacity: 0 }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '1.8rem',
                  color: 'var(--golden-amber)',
                  display: 'block',
                }}>
                  {stat.num}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  color: 'var(--sand)',
                  textTransform: 'uppercase',
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Photo + Blob */}
        <div
          ref={photoRef}
          className="hero-right"
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0,
          }}
        >
          {/* Organic blob background */}
          <div style={{
            position: 'absolute',
            width: '110%',
            height: '110%',
            background: 'linear-gradient(135deg, rgba(196,93,62,0.15), rgba(122,158,126,0.1))',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            animation: 'blob-morph 8s ease-in-out infinite',
            filter: 'blur(40px)',
          }} />

          {/* Photo */}
          <div style={{
            position: 'relative',
            width: 'clamp(280px, 22vw, 380px)',
            height: 'clamp(360px, 30vw, 480px)',
            borderRadius: '50% 50% 45% 55% / 40% 40% 60% 60%',
            overflow: 'hidden',
            border: '2px solid rgba(196,93,62,0.2)',
          }}>
            <img
              src="/images/profile/profile.png"
              alt="Prince Wildmarck MBENDA"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
            />
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div
        className="hero-scroll-hint"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0,
          animation: 'fadeInUp 0.6s 3.5s forwards',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--sand)',
        }}>
          Scroll
        </span>
        <div style={{
          width: '1px',
          height: '40px',
          position: 'relative',
          overflow: 'hidden',
          background: 'rgba(184,169,154,0.15)',
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: 'var(--terracotta)',
            animation: 'scrollLine 2s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
        @media (max-width: 768px) {
          #hero .container {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-left { order: 2; display: flex; flex-direction: column; align-items: center; }
          .hero-right { order: 1; margin-bottom: 1rem; }
          .hero-left > div:last-child { justify-content: center; }
          .hero-scroll-hint { display: none !important; }
        }
      `}</style>
    </section>
  )
}
