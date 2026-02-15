import { useEffect, useRef, useState } from 'react'
import { useInView } from '../../hooks/useInView'

export default function CounterNumber({ value, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ threshold: 0.5 })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

    const start = performance.now()
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value, duration])

  return (
    <span
      ref={ref}
      style={{
        fontFamily: 'var(--font-mono)',
        fontWeight: 500,
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        color: 'var(--golden-amber)',
        lineHeight: 1,
      }}
    >
      {count}{suffix}
    </span>
  )
}
