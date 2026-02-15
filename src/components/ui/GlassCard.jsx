import { useStore } from '../../store/useStore'

export default function GlassCard({ children, style, onClick }) {
  const setCursorVariant = useStore((s) => s.setCursorVariant)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setCursorVariant('link')}
      onMouseLeave={() => setCursorVariant('default')}
      style={{
        background: 'rgba(45,27,14,0.4)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(245,230,211,0.08)',
        borderRadius: '20px',
        padding: '2rem',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.borderColor = 'rgba(196,93,62,0.3)'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(245,230,211,0.08)'
      }}
    >
      {children}
    </div>
  )
}
