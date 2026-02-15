import { useStore } from '../../store/useStore'
import { scrollTo } from '../../utils/smoothScrollConfig'

const sections = [
  { id: 'hero', label: 'Accueil' },
  { id: 'about', label: 'À propos' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projets' },
  { id: 'metrics', label: 'Impact' },
  { id: 'contact', label: 'Contact' },
]

export default function SideNav() {
  const activeSection = useStore((s) => s.activeSection)
  const setCursorVariant = useStore((s) => s.setCursorVariant)

  return (
    <div
      className="sidenav"
      style={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 'var(--z-sidenav)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        alignItems: 'flex-end',
      }}
    >
      {sections.map((sec, i) => (
        <button
          key={sec.id}
          onClick={() => scrollTo(`#${sec.id}`)}
          onMouseEnter={() => setCursorVariant('link')}
          onMouseLeave={() => setCursorVariant('default')}
          className="sidenav-dot-wrap"
          aria-label={sec.label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            padding: '4px',
          }}
        >
          <span
            className="sidenav-label"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: activeSection === i ? 'var(--terracotta)' : 'var(--sand)',
              opacity: 0,
              transform: 'translateX(10px)',
              transition: 'all 0.3s',
              whiteSpace: 'nowrap',
            }}
          >
            {sec.label}
          </span>
          <span
            style={{
              width: activeSection === i ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: activeSection === i ? 'var(--terracotta)' : 'var(--sand)',
              opacity: activeSection === i ? 1 : 0.4,
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        </button>
      ))}

      <style>{`
        .sidenav-dot-wrap:hover .sidenav-label {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        @media (max-width: 768px) {
          .sidenav { display: none !important; }
        }
      `}</style>
    </div>
  )
}
