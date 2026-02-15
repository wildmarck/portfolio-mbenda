import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from '../../utils/gsapConfig'
import { useMediaQuery } from '../../hooks/useMediaQuery'

/*
 * Interactive Gecko — wanders the screen, eyes track cursor,
 * reacts to clicks, does random idle actions, flips to face direction.
 */

const GECKO_W = 80
const GECKO_H = 70
const MARGIN = 10
const WANDER_INTERVAL_MIN = 3000
const WANDER_INTERVAL_MAX = 7000

const messages = [
  'Ne me cliquez pas :(',
  'Arrêtez svp...',
  'Je suis timide !',
  'Encore ?!',
  'OK je bouge plus.',
  '... pourquoi ?',
  'Bon, on est amis ?',
  '*soupir*',
]

export default function InteractiveGecko() {
  const wrapRef = useRef(null)
  const geckoRef = useRef(null)
  const leftEyeRef = useRef(null)
  const rightEyeRef = useRef(null)
  const tailRef = useRef(null)
  const bubbleRef = useRef(null)
  const bodyRef = useRef(null)
  const tongueRef = useRef(null)
  const leftFrontLegRef = useRef(null)
  const rightFrontLegRef = useRef(null)
  const leftBackLegRef = useRef(null)
  const rightBackLegRef = useRef(null)

  const posRef = useRef({ x: 60, y: window.innerHeight - 100 })
  const isWalking = useRef(false)
  const walkTween = useRef(null)
  const legTween = useRef(null)
  const wanderTimer = useRef(null)
  const idleTimer = useRef(null)
  const facingRight = useRef(true)
  const clickCountRef = useRef(0)

  const [clickCount, setClickCount] = useState(0)
  const isMobile = useMediaQuery('(max-width: 768px)')

  // Random in range
  const rand = (min, max) => Math.random() * (max - min) + min

  // Pick a random point on screen edges or anywhere
  const getRandomTarget = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    return {
      x: rand(MARGIN, vw - GECKO_W - MARGIN),
      y: rand(vh * 0.3, vh - GECKO_H - MARGIN),
    }
  }, [])

  // Flip gecko to face movement direction
  const updateFacing = useCallback((targetX) => {
    const goingRight = targetX > posRef.current.x
    if (goingRight !== facingRight.current) {
      facingRight.current = goingRight
      if (geckoRef.current) {
        gsap.to(geckoRef.current, {
          scaleX: goingRight ? 1 : -1,
          duration: 0.2,
          ease: 'power2.out',
        })
      }
    }
  }, [])

  // Animate legs while walking
  const startLegAnimation = useCallback(() => {
    if (legTween.current) legTween.current.kill()

    const legs = [leftFrontLegRef.current, rightFrontLegRef.current, leftBackLegRef.current, rightBackLegRef.current]
    if (legs.some(l => !l)) return

    const tl = gsap.timeline({ repeat: -1 })

    // Walking cycle: front-left + back-right, then front-right + back-left
    tl.to([leftFrontLegRef.current, rightBackLegRef.current], {
      rotation: 15, duration: 0.15, ease: 'sine.inOut',
    }, 0)
    tl.to([rightFrontLegRef.current, leftBackLegRef.current], {
      rotation: -15, duration: 0.15, ease: 'sine.inOut',
    }, 0)
    tl.to([leftFrontLegRef.current, rightBackLegRef.current], {
      rotation: -15, duration: 0.15, ease: 'sine.inOut',
    }, 0.15)
    tl.to([rightFrontLegRef.current, leftBackLegRef.current], {
      rotation: 15, duration: 0.15, ease: 'sine.inOut',
    }, 0.15)

    // Subtle body bob
    tl.to(bodyRef.current, { y: -1.5, duration: 0.15, ease: 'sine.inOut' }, 0)
    tl.to(bodyRef.current, { y: 0, duration: 0.15, ease: 'sine.inOut' }, 0.15)

    legTween.current = tl
  }, [])

  const stopLegAnimation = useCallback(() => {
    if (legTween.current) {
      legTween.current.kill()
      legTween.current = null
    }
    const legs = [leftFrontLegRef.current, rightFrontLegRef.current, leftBackLegRef.current, rightBackLegRef.current]
    legs.forEach(leg => { if (leg) gsap.to(leg, { rotation: 0, duration: 0.3 }) })
    if (bodyRef.current) gsap.to(bodyRef.current, { y: 0, duration: 0.3 })
  }, [])

  // Walk to a target position
  const walkTo = useCallback((target) => {
    if (!wrapRef.current) return
    if (walkTween.current) walkTween.current.kill()

    const dx = target.x - posRef.current.x
    const dy = target.y - posRef.current.y
    const dist = Math.hypot(dx, dy)
    const speed = 120 // px/s
    const duration = Math.max(dist / speed, 0.5)

    isWalking.current = true
    updateFacing(target.x)
    startLegAnimation()

    walkTween.current = gsap.to(wrapRef.current, {
      left: target.x,
      top: target.y,
      duration,
      ease: 'none',
      onUpdate() {
        const rect = wrapRef.current?.getBoundingClientRect()
        if (rect) {
          posRef.current.x = rect.left
          posRef.current.y = rect.top
        }
      },
      onComplete() {
        isWalking.current = false
        posRef.current = { ...target }
        stopLegAnimation()
        doRandomIdleAction()
      },
    })
  }, [updateFacing, startLegAnimation, stopLegAnimation])

  // Random idle actions
  const doRandomIdleAction = useCallback(() => {
    const action = Math.random()

    if (action < 0.25) {
      // Tongue flick
      if (tongueRef.current) {
        gsap.fromTo(tongueRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }
        )
      }
    } else if (action < 0.45) {
      // Head tilt
      if (geckoRef.current) {
        gsap.to(geckoRef.current, {
          rotation: rand(-8, 8),
          duration: 0.4,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
        })
      }
    } else if (action < 0.6) {
      // Tail wag (fast)
      if (tailRef.current) {
        gsap.to(tailRef.current, {
          rotation: 20,
          duration: 0.12,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: 5,
          onComplete() {
            gsap.to(tailRef.current, { rotation: 0, duration: 0.4 })
          },
        })
      }
    } else if (action < 0.75) {
      // Pushup (flex)
      if (wrapRef.current) {
        gsap.to(wrapRef.current, {
          y: -8,
          duration: 0.25,
          ease: 'power2.out',
          yoyo: true,
          repeat: 3,
        })
      }
    }
    // else: just chill
  }, [])

  // Wander loop
  useEffect(() => {
    if (isMobile) return

    const scheduleWander = () => {
      wanderTimer.current = setTimeout(() => {
        if (!isWalking.current) {
          walkTo(getRandomTarget())
        }
        scheduleWander()
      }, rand(WANDER_INTERVAL_MIN, WANDER_INTERVAL_MAX))
    }

    // Initial position
    if (wrapRef.current) {
      const startX = 60
      const startY = window.innerHeight - 100
      wrapRef.current.style.left = startX + 'px'
      wrapRef.current.style.top = startY + 'px'
      posRef.current = { x: startX, y: startY }
    }

    // Start wandering after a delay
    const startDelay = setTimeout(() => {
      scheduleWander()
    }, 4000)

    return () => {
      clearTimeout(startDelay)
      clearTimeout(wanderTimer.current)
      if (walkTween.current) walkTween.current.kill()
    }
  }, [isMobile, walkTo, getRandomTarget])

  // Eye tracking
  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e) => {
      const wrap = wrapRef.current
      if (!wrap) return

      const rect = wrap.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2

      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const angle = Math.atan2(dy, dx)
      const dist = Math.min(Math.hypot(dx, dy) / 200, 1)

      const eyeX = Math.cos(angle) * 3 * dist
      const eyeY = Math.sin(angle) * 2.5 * dist

      // Flip eye direction if gecko is facing left
      const ex = facingRight.current ? eyeX : -eyeX

      if (leftEyeRef.current) gsap.to(leftEyeRef.current, { x: ex, y: eyeY, duration: 0.15 })
      if (rightEyeRef.current) gsap.to(rightEyeRef.current, { x: ex, y: eyeY, duration: 0.15 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile])

  // Idle tail sway
  useEffect(() => {
    if (!tailRef.current) return
    const tl = gsap.to(tailRef.current, {
      rotation: 6,
      transformOrigin: '0% 50%',
      duration: 2.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
    return () => tl.kill()
  }, [])

  // Breathing
  useEffect(() => {
    if (!bodyRef.current) return
    const tl = gsap.to(bodyRef.current, {
      scaleY: 1.02,
      scaleX: 0.99,
      transformOrigin: '50% 100%',
      duration: 2.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
    return () => tl.kill()
  }, [])

  // Blink
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        const eyes = geckoRef.current?.querySelectorAll('.gecko-eyelid')
        if (!eyes?.length) return
        gsap.to(eyes, { scaleY: 1, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.in' })
      }
    }, rand(2500, 4500))
    return () => clearInterval(interval)
  }, [])

  // Click handler
  const handleClick = useCallback((e) => {
    e.stopPropagation()

    clickCountRef.current += 1
    setClickCount(clickCountRef.current)

    // Stop walking if currently moving
    if (walkTween.current) {
      walkTween.current.kill()
      isWalking.current = false
      stopLegAnimation()
    }

    // Tongue flick
    if (tongueRef.current) {
      gsap.fromTo(tongueRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.12, yoyo: true, repeat: 1 })
    }

    // Startled jump
    if (wrapRef.current) {
      gsap.to(wrapRef.current, {
        y: '-=25',
        duration: 0.18,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
      })
    }

    // Shake head
    if (geckoRef.current) {
      gsap.to(geckoRef.current, {
        rotation: 5,
        duration: 0.06,
        ease: 'none',
        yoyo: true,
        repeat: 5,
        onComplete() { gsap.set(geckoRef.current, { rotation: 0 }) },
      })
    }

    // Show bubble
    if (bubbleRef.current) {
      gsap.killTweensOf(bubbleRef.current)
      gsap.fromTo(bubbleRef.current,
        { opacity: 0, scale: 0.5, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.7)' }
      )

      clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => {
        if (bubbleRef.current) {
          gsap.to(bubbleRef.current, { opacity: 0, scale: 0.8, duration: 0.3 })
        }
      }, 2800)
    }

    // After click, run away
    setTimeout(() => {
      const runTarget = {
        x: rand(MARGIN, window.innerWidth - GECKO_W - MARGIN),
        y: rand(window.innerHeight * 0.4, window.innerHeight - GECKO_H - MARGIN),
      }
      walkTo(runTarget)
    }, 600)
  }, [walkTo, stopLegAnimation])

  if (isMobile) return null

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        zIndex: 80,
        cursor: 'pointer',
        left: '60px',
        top: `${window.innerHeight - 100}px`,
      }}
    >
      {/* Speech bubble */}
      <div
        ref={bubbleRef}
        style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px',
          background: 'rgba(45,27,14,0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(196,93,62,0.35)',
          borderRadius: '12px',
          padding: '0.45rem 0.75rem',
          whiteSpace: 'nowrap',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--terracotta)',
        }}>
          {messages[Math.min(clickCount, messages.length - 1)]}
        </span>
        <div style={{
          position: 'absolute',
          bottom: '-6px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          width: '10px',
          height: '10px',
          background: 'rgba(45,27,14,0.92)',
          borderRight: '1px solid rgba(196,93,62,0.35)',
          borderBottom: '1px solid rgba(196,93,62,0.35)',
        }} />
      </div>

      {/* Gecko SVG */}
      <svg
        ref={geckoRef}
        onClick={handleClick}
        width="80"
        height="70"
        viewBox="0 0 120 100"
        fill="none"
        style={{
          overflow: 'visible',
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
          transformOrigin: '50% 50%',
        }}
        aria-label="Petit gecko interactif"
        role="img"
      >
        {/* Tail */}
        <g ref={tailRef} style={{ transformOrigin: '25px 55px' }}>
          <path
            d="M20,58 Q5,55 -5,45 Q-10,38 -2,35 Q5,32 12,42 Q16,48 20,52"
            fill="var(--terracotta)"
            opacity="0.85"
          />
        </g>

        {/* Back left leg */}
        <g ref={leftBackLegRef} style={{ transformOrigin: '35px 62px' }}>
          <path d="M35,65 Q28,78 20,82 Q18,83 17,80 Q22,72 30,62" fill="var(--terracotta)" opacity="0.7" />
          <circle cx="17" cy="80" r="2" fill="var(--terracotta)" opacity="0.5" />
        </g>

        {/* Back right leg */}
        <g ref={rightBackLegRef} style={{ transformOrigin: '70px 62px' }}>
          <path d="M70,65 Q77,78 85,82 Q87,83 88,80 Q83,72 75,62" fill="var(--terracotta)" opacity="0.7" />
          <circle cx="88" cy="80" r="2" fill="var(--terracotta)" opacity="0.5" />
        </g>

        {/* Front left leg */}
        <g ref={leftFrontLegRef} style={{ transformOrigin: '38px 42px' }}>
          <path d="M38,45 Q28,38 22,32 Q20,30 22,28 Q26,30 35,40" fill="var(--terracotta)" opacity="0.7" />
          <circle cx="22" cy="28" r="2" fill="var(--terracotta)" opacity="0.5" />
        </g>

        {/* Front right leg */}
        <g ref={rightFrontLegRef} style={{ transformOrigin: '72px 42px' }}>
          <path d="M72,45 Q82,38 88,32 Q90,30 88,28 Q84,30 75,40" fill="var(--terracotta)" opacity="0.7" />
          <circle cx="88" cy="28" r="2" fill="var(--terracotta)" opacity="0.5" />
        </g>

        {/* Body */}
        <g ref={bodyRef} style={{ transformOrigin: '55px 65px' }}>
          <ellipse cx="55" cy="55" rx="30" ry="18" fill="var(--terracotta)" opacity="0.9" />
          <circle cx="45" cy="52" r="3" fill="var(--terracotta-light)" opacity="0.3" />
          <circle cx="60" cy="58" r="2.5" fill="var(--terracotta-light)" opacity="0.25" />
          <circle cx="52" cy="60" r="2" fill="var(--terracotta-light)" opacity="0.2" />
        </g>

        {/* Head */}
        <ellipse cx="55" cy="35" rx="22" ry="16" fill="var(--terracotta)" />
        <ellipse cx="55" cy="32" rx="15" ry="8" fill="var(--terracotta-light)" opacity="0.15" />

        {/* Left eye */}
        <ellipse cx="43" cy="32" rx="8" ry="7" fill="#1A1209" />
        <ellipse cx="43" cy="32" rx="6.5" ry="5.5" fill="#F5E6D3" opacity="0.95" />
        <circle ref={leftEyeRef} cx="44" cy="32" r="3" fill="#1A1209" />
        <circle cx="42" cy="30" r="1.2" fill="white" opacity="0.8" />
        <ellipse className="gecko-eyelid" cx="43" cy="27" rx="7" ry="3" fill="var(--terracotta)" style={{ transformOrigin: '43px 30px', transform: 'scaleY(0)' }} />

        {/* Right eye */}
        <ellipse cx="67" cy="32" rx="8" ry="7" fill="#1A1209" />
        <ellipse cx="67" cy="32" rx="6.5" ry="5.5" fill="#F5E6D3" opacity="0.95" />
        <circle ref={rightEyeRef} cx="68" cy="32" r="3" fill="#1A1209" />
        <circle cx="66" cy="30" r="1.2" fill="white" opacity="0.8" />
        <ellipse className="gecko-eyelid" cx="67" cy="27" rx="7" ry="3" fill="var(--terracotta)" style={{ transformOrigin: '67px 30px', transform: 'scaleY(0)' }} />

        {/* Nostrils */}
        <circle cx="49" cy="24" r="1" fill="#1A1209" opacity="0.4" />
        <circle cx="61" cy="24" r="1" fill="#1A1209" opacity="0.4" />

        {/* Mouth */}
        <path d="M42,39 Q55,44 68,39" stroke="#1A1209" strokeWidth="1" fill="none" opacity="0.3" />

        {/* Tongue */}
        <g ref={tongueRef} style={{ transformOrigin: '55px 42px', transform: 'scaleX(0)' }}>
          <path d="M55,42 Q55,52 50,56 M55,42 Q55,52 60,56" stroke="#E85D5D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  )
}
