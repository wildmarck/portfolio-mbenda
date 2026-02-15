import { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsapConfig'
import { useStore } from '../../store/useStore'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export default function CustomCursor() {
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const cursorVariant = useStore((s) => s.cursorVariant)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    if (isMobile) return

    const outer = outerRef.current
    const inner = innerRef.current

    const moveCursor = (e) => {
      gsap.to(inner, { x: e.clientX, y: e.clientY, duration: 0.1 })
      gsap.to(outer, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [isMobile])

  useEffect(() => {
    if (isMobile) return
    const outer = outerRef.current
    const inner = innerRef.current

    if (cursorVariant === 'link') {
      gsap.to(outer, { scale: 1.8, opacity: 0.3, duration: 0.3 })
      gsap.to(inner, { scale: 0.5, duration: 0.3 })
    } else {
      gsap.to(outer, { scale: 1, opacity: 0.5, duration: 0.3 })
      gsap.to(inner, { scale: 1, duration: 0.3 })
    }
  }, [cursorVariant, isMobile])

  if (isMobile) return null

  return (
    <>
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          top: '-20px',
          left: '-20px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1.5px solid var(--terracotta)',
          pointerEvents: 'none',
          zIndex: 'var(--z-cursor)',
          opacity: 0.5,
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          top: '-4px',
          left: '-4px',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--terracotta)',
          pointerEvents: 'none',
          zIndex: 'var(--z-cursor)',
        }}
      />
      <style>{`
        * { cursor: none !important; }
        @media (max-width: 768px) { * { cursor: auto !important; } }
      `}</style>
    </>
  )
}
