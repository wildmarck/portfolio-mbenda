import { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsapConfig'
import { useInView } from '../../hooks/useInView'

export default function AnimatedText({ children, as: Tag = 'div', delay = 0, style, className }) {
  const [viewRef, inView] = useInView({ threshold: 0.3 })
  const textRef = useRef(null)

  useEffect(() => {
    if (!inView || !textRef.current) return
    const words = textRef.current.querySelectorAll('.anim-word')
    gsap.fromTo(
      words,
      { y: '110%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        stagger: 0.03,
        duration: 0.8,
        ease: 'power3.out',
        delay,
      }
    )
  }, [inView, delay])

  const text = typeof children === 'string' ? children : ''

  return (
    <Tag ref={viewRef} style={style} className={className}>
      <span ref={textRef} style={{ display: 'inline' }}>
        {text.split(' ').map((word, i) => (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}>
            <span className="anim-word" style={{ display: 'inline-block', opacity: 0, transform: 'translateY(110%)' }}>
              {word}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
