import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../utils/gsapConfig'
import GlassCard from '../ui/GlassCard'

const contactMethods = [
  {
    label: 'WhatsApp',
    value: '+241 77 13 15 77',
    icon: '\u260E',
    href: 'https://wa.me/24177131577',
    color: '#25D366',
  },
  {
    label: 'Email',
    value: 'amazing444yt@gmail.com',
    icon: '\u2709',
    href: 'mailto:amazing444yt@gmail.com',
    color: '#D4A843',
  },
  {
    label: 'Entreprise',
    value: 'devs-solutions.tech',
    icon: '\u2318',
    href: 'https://devs-solutions.tech',
    color: '#7A9E7E',
  },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const photoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-heading > *', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })

      gsap.fromTo('.contact-card', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.7,
        scrollTrigger: { trigger: '.contact-cards', start: 'top 80%' },
      })

      if (photoRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            gsap.set(photoRef.current, { y: self.progress * -60 })
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="section" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'center',
        }} className="contact-grid">

          {/* Left — CTA */}
          <div>
            <div className="contact-heading">
              <div className="section-label">Contact</div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: 'var(--warm-cream)',
                lineHeight: 1.1,
                marginBottom: '1rem',
              }}>
                Travaillons<br />
                <span style={{ color: 'var(--terracotta)' }}>ensemble</span>
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 300,
                color: 'var(--sand)',
                lineHeight: 1.7,
                maxWidth: '440px',
                marginBottom: '2.5rem',
              }}>
                Disponible pour des projets freelance, des collaborations
                ou des opportunités professionnelles. N'hésitez pas à me contacter.
              </p>
            </div>

            <div className="contact-cards" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card"
                  style={{ textDecoration: 'none' }}
                >
                  <GlassCard style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.2rem',
                    padding: '1.2rem 1.5rem',
                  }}>
                    <span style={{
                      fontSize: '1.5rem',
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '14px',
                      background: `${method.color}15`,
                      border: `1px solid ${method.color}33`,
                      flexShrink: 0,
                    }}>
                      {method.icon}
                    </span>
                    <div>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: method.color,
                        display: 'block',
                        marginBottom: '0.2rem',
                      }}>
                        {method.label}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        color: 'var(--warm-cream)',
                      }}>
                        {method.value}
                      </span>
                    </div>
                  </GlassCard>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Photo */}
          <div ref={photoRef} style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <div style={{
              position: 'absolute',
              inset: '-15%',
              background: 'radial-gradient(ellipse, rgba(196,93,62,0.1), transparent 70%)',
              filter: 'blur(40px)',
            }} />
            <div style={{
              position: 'relative',
              width: 'clamp(260px, 20vw, 360px)',
              borderRadius: '40% 60% 50% 50% / 50% 50% 60% 40%',
              overflow: 'hidden',
              border: '2px solid rgba(196,93,62,0.12)',
            }}>
              <img
                src="/images/profile/marchant.png"
                alt="Prince Wildmarck MBENDA"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 'clamp(4rem, 6vw, 6rem)',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(245,230,211,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '1.1rem',
            color: 'var(--warm-cream)',
          }}>
            PRINCE<span style={{ color: 'var(--terracotta)' }}>.</span>
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--sand)',
            letterSpacing: '0.05em',
          }}>
            &copy; {new Date().getFullYear()} Prince Wildmarck MBENDA. Tous droits réservés.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .contact-grid > div:last-child { display: none; }
        }
      `}</style>
    </section>
  )
}
