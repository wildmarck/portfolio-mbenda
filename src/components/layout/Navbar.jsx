import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../utils/gsapConfig'
import { scrollTo } from '../../utils/smoothScrollConfig'
import { useStore } from '../../store/useStore'

const navLinks = [
  { label: 'Accueil', target: '#hero' },
  { label: 'À propos', target: '#about' },
  { label: 'Skills', target: '#skills' },
  { label: 'Projets', target: '#projects' },
  { label: 'Contact', target: '#contact' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const setCursorVariant = useStore((s) => s.setCursorVariant)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 2.5, ease: 'power3.out' }
    )
  }, [])

  const handleNavClick = (target) => {
    setMenuOpen(false)
    scrollTo(target)
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 'var(--z-nav)',
        padding: '1rem 0',
        transition: 'background 0.3s, backdrop-filter 0.3s',
        background: scrolled ? 'rgba(26,18,9,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNavClick('#hero')}
          onMouseEnter={() => setCursorVariant('link')}
          onMouseLeave={() => setCursorVariant('default')}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '1.4rem',
            color: 'var(--warm-cream)',
          }}
        >
          PRINCE<span style={{ color: 'var(--terracotta)' }}>.</span>
        </button>

        {/* Desktop links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }}
          className="nav-desktop"
        >
          {navLinks.slice(1, -1).map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.target)}
              onMouseEnter={() => setCursorVariant('link')}
              onMouseLeave={() => setCursorVariant('default')}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'var(--sand)',
                letterSpacing: '0.05em',
                transition: 'color 0.3s',
              }}
              onMouseOver={(e) => (e.target.style.color = 'var(--warm-cream)')}
              onMouseOut={(e) => (e.target.style.color = 'var(--sand)')}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => handleNavClick('#contact')}
            onMouseEnter={() => setCursorVariant('link')}
            onMouseLeave={() => setCursorVariant('default')}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: 600,
              padding: '0.6rem 1.5rem',
              border: '1px solid var(--terracotta)',
              borderRadius: '30px',
              color: 'var(--terracotta)',
              transition: 'all 0.3s',
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'var(--terracotta)'
              e.target.style.color = 'var(--warm-cream)'
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent'
              e.target.style.color = 'var(--terracotta)'
            }}
          >
            Contact
          </button>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            padding: '4px',
          }}
        >
          <span
            style={{
              width: '24px',
              height: '2px',
              background: 'var(--warm-cream)',
              transition: 'all 0.3s',
              transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }}
          />
          <span
            style={{
              width: '24px',
              height: '2px',
              background: 'var(--warm-cream)',
              transition: 'all 0.3s',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              width: '24px',
              height: '2px',
              background: 'var(--warm-cream)',
              transition: 'all 0.3s',
              transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="nav-mobile-menu"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(26,18,9,0.97)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.4s',
          zIndex: -1,
        }}
      >
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => handleNavClick(link.target)}
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '1.5rem',
              color: 'var(--warm-cream)',
            }}
          >
            {link.label}
          </button>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
