import { useRef } from 'react'
import { gsap } from '../../utils/gsapConfig'

export default function TiltCard({ children, style, className, intensity = 12 }) {
  const cardRef = useRef(null)
  const glareRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    gsap.to(card, {
      rotateY: x * intensity,
      rotateX: -y * intensity,
      duration: 0.4,
      ease: 'power2.out',
    })

    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0.15,
        x: `${x * 100}%`,
        y: `${y * 100}%`,
        duration: 0.4,
      })
    }
  }

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    })
    if (glareRef.current) {
      gsap.to(glareRef.current, { opacity: 0, duration: 0.4 })
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        perspective: '800px',
        transformStyle: 'preserve-3d',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
      {/* Glare overlay */}
      <div
        ref={glareRef}
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle at center, rgba(245,230,211,0.3), transparent 60%)',
          pointerEvents: 'none',
          opacity: 0,
        }}
      />
    </div>
  )
}
