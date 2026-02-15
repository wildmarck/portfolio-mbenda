import { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsapConfig'
import { useStore } from '../../store/useStore'

export default function Preloader() {
  const containerRef = useRef(null)
  const setIsLoading = useStore((s) => s.setIsLoading)
  const name = 'PRINCE WILDMARCK'

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete: () => setIsLoading(false),
        })
      },
    })

    tl.to('.preloader-letter', {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: 'power2.out',
      delay: 0.3,
    })

    tl.to('.preloader-bar-inner', {
      scaleX: 1,
      duration: 1.2,
      ease: 'power2.inOut',
    }, '-=0.3')

    tl.to({}, { duration: 0.3 })

    return () => tl.kill()
  }, [setIsLoading])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-preloader)',
        background: 'var(--warm-black)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      <div style={{ display: 'flex', gap: '0.15em', overflow: 'hidden' }}>
        {name.split('').map((char, i) => (
          <span
            key={i}
            className="preloader-letter"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              color: 'var(--warm-cream)',
              opacity: 0,
              transform: 'translateY(20px)',
              display: 'inline-block',
              minWidth: char === ' ' ? '0.3em' : undefined,
            }}
          >
            {char}
          </span>
        ))}
      </div>

      <div
        style={{
          width: 'min(300px, 60vw)',
          height: '2px',
          background: 'rgba(196,93,62,0.2)',
          borderRadius: '1px',
          overflow: 'hidden',
        }}
      >
        <div
          className="preloader-bar-inner"
          style={{
            width: '100%',
            height: '100%',
            background: 'var(--terracotta)',
            transformOrigin: 'left',
            transform: 'scaleX(0)',
          }}
        />
      </div>

      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          color: 'var(--sand)',
          textTransform: 'uppercase',
        }}
      >
        Développeur Full-Stack
      </span>
    </div>
  )
}
