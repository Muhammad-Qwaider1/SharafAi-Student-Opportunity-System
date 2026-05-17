import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import sharafLogo from  '../assets/sharafai-logo.jpg'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  

  return (
    <nav style={{
      width: '100%',
      borderBottom: '1px solid #f0e8f0',
      background: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

{/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src={sharafLogo} 
            alt="SharafAI Logo" 
            style={{ 
              width: '150px', 
              height: '50px', 
              objectFit: 'cover'
            }} 
          />

        </div>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '32px' }} className="desktop-nav">
{['Dashboard', 'Pathways', 'Resources', 'Mentorship'].map(item => (
  <a key={item} href="#" style={{
    fontSize: '14px', color: '#374151',
    textDecoration: 'none', fontWeight: 600,
    cursor: 'pointer'
  }}
    onMouseEnter={e => {
      e.target.style.background = 'linear-gradient(135deg, #e11d74, #7c3aed)';
      e.target.style.WebkitBackgroundClip = 'text';
      e.target.style.WebkitTextFillColor = 'transparent';
      e.target.style.transform = 'scale(1.1)';
    }}
    onMouseLeave={e => {
      e.target.style.background = 'none';
      e.target.style.WebkitBackgroundClip = 'initial';
      e.target.style.WebkitTextFillColor = 'initial';
      e.target.style.color = '#374151';
      e.target.style.transform = 'scale(1)';
    }}
  >{item}</a>
))}
        </div>

        {/* Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Bell */}
<svg width="22" height="22" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24" 
  style={{ cursor: 'pointer', transition: 'stroke 0.2s' }}
  onMouseEnter={e => e.currentTarget.setAttribute('stroke', '#e11d74')}
  onMouseLeave={e => e.currentTarget.setAttribute('stroke', '#6b7280')}
>
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
</svg>
          {/* User */}
<svg width="22" height="22" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24" 
  style={{ cursor: 'pointer', transition: 'stroke 0.2s' }}
  onMouseEnter={e => e.currentTarget.setAttribute('stroke', '#e11d74')}
  onMouseLeave={e => e.currentTarget.setAttribute('stroke', '#6b7280')}
>
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

          {/* Hamburger - mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn"
            style={{
              display: 'none',
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
            }}
          >
            <svg width="22" height="22" fill="none" stroke="#374151" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

{/* Mobile Menu */}
{menuOpen && (
  <div style={{
    position: 'fixed',
    top: '80px',
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(255,255,255,0.3)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '28px',
    borderRadius: '100px 0px 0px 100px',
    zIndex: 1000,
    animation: 'fadeSlideDown 0.8s ease forwards',
  }} className="mobile-menu">
    
    {['Dashboard', 'Pathways', 'Resources', 'Mentorship'].map(item => (
      <a 
        key={item} 
        href="#" 
        style={{
          fontSize: '15.5px',
          color: '#1f2937',
          textDecoration: 'none',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          padding: '8px 0',
          position: 'relative',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={e => {
          e.target.style.color = 'transparent';
          e.target.style.background = 'linear-gradient(90deg, #e11d74, #7c3aed)';
          e.target.style.WebkitBackgroundClip = 'text';
          e.target.style.WebkitTextFillColor = 'transparent';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={e => {
          e.target.style.background = 'none';
          e.target.style.WebkitBackgroundClip = 'initial';
          e.target.style.WebkitTextFillColor = 'initial';
          e.target.style.color = '#1f2937';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        {item}
      </a>
    ))}
  </div>
)}

{/* Animation */}
<style>{`
  @keyframes fadeSlideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 640px) {
    .desktop-nav { display: none !important; }
    .hamburger-btn { display: block !important; }
  }
`}</style>
    </nav>
  )
}