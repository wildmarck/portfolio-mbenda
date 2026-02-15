import { useScrollProgress } from '../../hooks/useScrollProgress'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        zIndex: 'var(--z-nav)',
        background: 'transparent',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, var(--terracotta), var(--golden-amber))',
          width: `${progress * 100}%`,
          transition: 'width 0.05s linear',
          borderRadius: '0 2px 2px 0',
          boxShadow: '0 0 8px rgba(196,93,62,0.4)',
        }}
      />
    </div>
  )
}
