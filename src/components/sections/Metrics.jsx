import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../utils/gsapConfig'
import { metrics } from '../../data/metrics'
import CounterNumber from '../ui/CounterNumber'
import TiltCard from '../ui/TiltCard'

export default function Metrics() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.metric-item', { y: 50, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      // Parallax bg image
      if (bgRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            gsap.set(bgRef.current, { y: self.progress * 60 })
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="metrics" className="section" style={{ position: 'relative' }}>
      {/* Background image overlay with parallax */}
      <div ref={bgRef} style={{
        position: 'absolute',
        inset: '-30px 0',
        backgroundImage: 'url(/images/stock/Colorful Code Display.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.08,
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, var(--warm-black), rgba(45,27,14,0.95), var(--warm-black))',
      }} />

      {/* Top separator line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(196,93,62,0.2), transparent)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label">Impact</div>
          <h2 className="section-title">Les chiffres parlent</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
        }} className="metrics-grid">
          {metrics.map((m, i) => (
            <TiltCard
              key={i}
              className="metric-item"
              intensity={10}
              style={{
                textAlign: 'center',
                padding: '2.5rem 1rem',
                background: 'rgba(45,27,14,0.4)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                border: '1px solid rgba(245,230,211,0.05)',
                transition: 'border-color 0.3s',
              }}
            >
              <CounterNumber value={m.value} suffix={m.suffix} />
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--sand)',
                marginTop: '0.8rem',
                lineHeight: 1.4,
              }}>
                {m.label}
              </p>
            </TiltCard>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
