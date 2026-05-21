export default function CTASection() {
  return (
    <>
      {/* CTA Bar */}
      <section style={{
        maxWidth: '1100px',
        margin: '0 auto 80px',
        padding: '0 24px',
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          border: '1px solid #f0e8f0',
          padding: '32px 40px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          boxShadow: '0 2px 16px rgba(200,100,150,0.07)',
        }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
              Ready to transform your path?
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              Sign up today and get full access to the SharafAI SDS toolset and dashboard.
            </p>
          </div>

  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {/* زر Get Started Now */}
            <button 
              style={{
                padding: '12px 24px',
                borderRadius: '10px',
                border: '2px solid transparent',
                background: 'linear-gradient(90deg, #e11d74, #7c3aed) border-box',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.target.style.background = '#fff';
                e.target.style.border = '2px solid #e11d74';
                e.target.style.backgroundClip = 'text';
                e.target.style.WebkitBackgroundClip = 'text';
                e.target.style.WebkitTextFillColor = 'transparent';
                e.target.style.backgroundImage = 'linear-gradient(90deg, #e11d74, #7c3aed)';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'linear-gradient(90deg, #e11d74, #7c3aed) border-box';
                e.target.style.border = '2px solid transparent';
                e.target.style.backgroundClip = 'initial';
                e.target.style.WebkitBackgroundClip = 'initial';
                e.target.style.WebkitTextFillColor = '#fff';
                e.target.style.color = '#fff';
              }}
            >
              Get Started Now →
            </button>

            {/* زر Log In */}
            <button 
              style={{
                padding: '12px 24px',
                borderRadius: '10px',
                border: '2px solid #e5e7eb',
                background: '#fff',
                color: '#374151',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                // تكتيك صناعة إطار ملون بالتدرج اللوني عبر الجافاسكربت
                e.target.style.border = '2px solid transparent';
                e.target.style.backgroundImage = 'linear-gradient(#fff, #fff), linear-gradient(90deg, #e11d74, #7c3aed)';
                e.target.style.backgroundOrigin = 'border-box';
                e.target.style.backgroundClip = 'padding-box, border-box';
              }}
              onMouseLeave={e => {
                e.target.style.border = '2px solid #e5e7eb';
                e.target.style.background = '#fff';
                e.target.style.backgroundImage = 'none';
              }}
            >
              Log In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #f0e8f0',
        padding: '28px 24px',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '12px' }}>
          {['PRECISION', 'URGENCY', 'INTELLIGENCE'].map(word => (
            <span key={word} style={{
              fontSize: '11px', color: '#d1d5db',
              letterSpacing: '0.12em', fontWeight: 600,
            }}>{word}</span>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: '#d1d5db' }}>
          © 2024 SharafAI. Secure Emergency & Guidance Infrastructure.
        </p>
      </footer>
    </>
  )
}