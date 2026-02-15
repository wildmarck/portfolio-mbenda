import { useRef, useState } from 'react'
import { gsap } from '../../utils/gsapConfig'
import { useStore } from '../../store/useStore'

export default function MagneticButton({ children, onClick, variant = 'primary', style }) {
  const btnRef = useRef(null)
  const rippleRef = useRef(null)
  const setCursorVariant = useStore((s) => s.setCursorVariant)
  const [hovered, setHovered] = useState(false)
  const isPrimary = variant === 'primary'

  const handleMouseMove = (e) => {
    const btn = btnRef.current
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' })

    // Move ripple to cursor position
    if (rippleRef.current) {
      gsap.set(rippleRef.current, {
        left: e.clientX - rect.left,
        top: e.clientY - rect.top,
      })
    }
  }

  const handleMouseEnter = (e) => {
    setCursorVariant('link')
    setHovered(true)
    if (rippleRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      gsap.set(rippleRef.current, {
        left: e.clientX - rect.left,
        top: e.clientY - rect.top,
      })
      gsap.fromTo(rippleRef.current,
        { scale: 0, opacity: 1 },
        { scale: 2.5, opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
    }
  }

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' })
    setCursorVariant('default')
    setHovered(false)
    if (rippleRef.current) {
      gsap.to(rippleRef.current, { scale: 0, opacity: 0, duration: 0.3 })
    }
  }

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: '0.9rem',
        padding: '0.9rem 2rem',
        borderRadius: '50px',
        letterSpacing: '0.03em',
        transition: 'border-color 0.3s',
        background: isPrimary ? 'var(--terracotta)' : 'transparent',
        color: 'var(--warm-cream)',
        border: isPrimary ? '1px solid var(--terracotta)' : '1px solid rgba(245,230,211,0.3)',
        zIndex: 1,
        ...style,
      }}
    >
      {/* Hover ripple */}
      <div
        ref={rippleRef}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: isPrimary ? 'rgba(212,168,67,0.25)' : 'rgba(196,93,62,0.15)',
          transform: 'scale(0)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </button>
  )
}
