export default function DeviceMockup({ type = 'browser', screenshot, accent }) {
  if (type === 'phone') {
    return (
      <div style={{
        width: '260px',
        maxWidth: '100%',
        margin: '0 auto',
        borderRadius: '36px',
        border: `2px solid ${accent || 'rgba(245,230,211,0.15)'}`,
        background: 'rgba(26,18,9,0.8)',
        padding: '12px 8px',
        position: 'relative',
      }}>
        {/* Notch */}
        <div style={{
          width: '80px',
          height: '20px',
          background: 'var(--warm-black)',
          borderRadius: '0 0 16px 16px',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }} />
        <div style={{
          borderRadius: '28px',
          overflow: 'hidden',
          aspectRatio: '9/19.5',
        }}>
          <img
            src={screenshot}
            alt="App screenshot"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        </div>
      </div>
    )
  }

  if (type === 'desktop') {
    return (
      <div style={{
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
      }}>
        <div style={{
          borderRadius: '12px 12px 0 0',
          border: `1px solid ${accent || 'rgba(245,230,211,0.15)'}`,
          borderBottom: 'none',
          background: 'rgba(26,18,9,0.9)',
          overflow: 'hidden',
        }}>
          {/* Title bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 14px',
            background: 'rgba(45,27,14,0.8)',
          }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28ca41' }} />
          </div>
          <div style={{ aspectRatio: '16/10' }}>
            <img
              src={screenshot}
              alt="App screenshot"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="lazy"
            />
          </div>
        </div>
        {/* Stand */}
        <div style={{
          width: '40%',
          height: '20px',
          margin: '0 auto',
          background: `linear-gradient(to bottom, ${accent || 'rgba(245,230,211,0.15)'}, transparent)`,
          borderRadius: '0 0 4px 4px',
          opacity: 0.3,
        }} />
      </div>
    )
  }

  // Browser (default)
  return (
    <div style={{
      width: '100%',
      maxWidth: '560px',
      borderRadius: '12px',
      border: `1px solid ${accent || 'rgba(245,230,211,0.15)'}`,
      background: 'rgba(26,18,9,0.9)',
      overflow: 'hidden',
    }}>
      {/* Browser bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 14px',
        background: 'rgba(45,27,14,0.8)',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28ca41' }} />
        <div style={{
          flex: 1,
          marginLeft: '8px',
          height: '24px',
          borderRadius: '6px',
          background: 'rgba(245,230,211,0.05)',
        }} />
      </div>
      <div style={{ aspectRatio: '16/10' }}>
        <img
          src={screenshot}
          alt="Website screenshot"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
      </div>
    </div>
  )
}
