import { useState } from 'react'
import sharafLogo from  '../../assets/sharafai-logo.jpg'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keepSignedIn, setKeepSignedIn] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: اربط مع authApi.js
    console.log({ email, password, keepSignedIn })
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ede9f6 0%, #f8f6ff 40%, #eef1fb 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
        padding: '24px',
        position: 'relative',
      }}
    >
      {/* ===== Card ===== */}
      <div
        style={{
          width: '100%',
          maxWidth: '580px', 
          background: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 8px 40px rgba(100, 80, 180, 0.10)',
          padding: '48px 44px 36px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0px' }}>
          <img src={sharafLogo} alt="SharafAI" style={{ height: '180px', width: 'auto', objectFit: 'contain' }} />
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 800,
            color: '#0f172a',
            margin: '0 0 6px',
            textAlign: 'center',
          }}
        >
          Welcome Back
        </h1>
        <p style={{ fontSize: '14px', color: '#8b8fa8', marginBottom: '32px', textAlign: 'center' }}>
          Sign in to access your SharafAI dashboard.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '18px' }}>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>
              Email Address
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1.5px solid #e5e7eb',
                borderRadius: '10px',
                padding: '10px 14px',
                gap: '10px',
                background: '#fff',
              }}
            >
              {/* Mail icon */}
              <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  color: '#1f2937',
                  background: 'transparent',
                }}
onFocus={(e) => {
                  const parent = e.currentTarget.parentElement;
                  parent.style.borderColor = 'transparent';
                  parent.style.backgroundImage = 'linear-gradient(#fff, #fff), linear-gradient(90deg, #e11d74 0%, #7c3aed 100%)';
                  parent.style.backgroundOrigin = 'border-box';
                  parent.style.backgroundClip = 'padding-box, border-box';
                }}
                // عند الخروج نرجع كل شيء لأصله الطبيعي والناعم
                onBlur={(e) => {
                  const parent = e.currentTarget.parentElement;
                  parent.style.borderColor = '#e5e7eb';
                  parent.style.backgroundImage = 'none';
                  parent.style.backgroundOrigin = 'initial';
                  parent.style.backgroundClip = 'initial';
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>
                Password
              </label>
              <a href="#" style={{ fontSize: '12px', color: '#e11d74', textDecoration: 'none', fontWeight: 500 }}>
                Forgot password?
              </a>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1.5px solid #e5e7eb',
                borderRadius: '10px',
                padding: '10px 14px',
                gap: '10px',
                background: '#fff',
              }}
              
            >
              {/* Lock icon */}
              <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  color: '#1f2937',
                  background: 'transparent',
                  letterSpacing: '0.15em',
                }}
                onFocus={(e) => {
                  const parent = e.currentTarget.parentElement;
                  parent.style.borderColor = 'transparent';
                  parent.style.backgroundImage = 'linear-gradient(#fff, #fff), linear-gradient(90deg, #e11d74 0%, #7c3aed 100%)';
                  parent.style.backgroundOrigin = 'border-box';
                  parent.style.backgroundClip = 'padding-box, border-box';
                }}
                // عند الخروج نرجع كل شيء لأصله الطبيعي والناعم
                onBlur={(e) => {
                  const parent = e.currentTarget.parentElement;
                  parent.style.borderColor = '#e5e7eb';
                  parent.style.backgroundImage = 'none';
                  parent.style.backgroundOrigin = 'initial';
                  parent.style.backgroundClip = 'initial';
                }}
              />
            </div>
          </div>

          {/* Keep me signed in */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              id="keep"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
              style={{ width: '15px', height: '15px', accentColor: '#e11d74', cursor: 'pointer' }}
            />
            <label htmlFor="keep" style={{ fontSize: '13px', color: '#6b7280', cursor: 'pointer' }}>
              Keep me signed in
            </label>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(90deg, #e11d74 0%, #7c3aed 100%)',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.02em',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Sign In →
          </button>
        </form>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            margin: '24px 0 20px',
          }}
        >
          <div style={{ flex: 1, height: '1px', background: '#f0f0f4' }} />
          <span style={{ fontSize: '11px', color: '#b0b3c6', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            or continue with
          </span>
          <div style={{ flex: 1, height: '1px', background: '#f0f0f4' }} />
        </div>

        {/* Social Buttons */}
        <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
          <button
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '11px',
              border: '1.5px solid #e5e7eb',
              borderRadius: '10px',
              background: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.backgroundImage = 'linear-gradient(#fff, #fff), linear-gradient(90deg, #e11d74 0%, #7c3aed 100%)';
              e.currentTarget.style.backgroundOrigin = 'border-box';
              e.currentTarget.style.backgroundClip = 'padding-box, border-box';
            }}
            // عند إبعاد الماوس، يعود الزر لحالته الطبيعية الناعمة
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.backgroundImage = 'none';
              e.currentTarget.style.backgroundOrigin = 'initial';
              e.currentTarget.style.backgroundClip = 'initial';
            }}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              style={{ width: '18px', height: '18px' }}
            />
            Google
          </button>

          <button
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '11px',
              border: '1.5px solid #e5e7eb',
              borderRadius: '10px',
              background: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.backgroundImage = 'linear-gradient(#fff, #fff), linear-gradient(90deg, #e11d74 0%, #7c3aed 100%)';
              e.currentTarget.style.backgroundOrigin = 'border-box';
              e.currentTarget.style.backgroundClip = 'padding-box, border-box';
            }}
            // عند إبعاد الماوس، يعود الزر لحالته الطبيعية الناعمة
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.backgroundImage = 'none';
              e.currentTarget.style.backgroundOrigin = 'initial';
              e.currentTarget.style.backgroundClip = 'initial';
            }}
          >
            {/* Cloud/SSO icon */}
            <svg width="18" height="18" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 15a4 4 0 004 4h9a5 5 0 10-4.9-6H7a4 4 0 00-4 4z" />
            </svg>
            SSO
          </button>
        </div>

        {/* Request Access */}
        <p style={{ marginTop: '28px', fontSize: '13px', color: '#9ca3af' }}>
          New to the platform?{' '}
          <a href="#" style={{ color: '#e11d74', fontWeight: 700, textDecoration: 'none' }}>
            Request access
          </a>
        </p>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', gap: '24px', marginTop: '28px' }}>
        {['Privacy Policy', 'Terms of Service', 'Contact Support'].map((item) => (
          <a
            key={item}
            href="#"
            style={{ fontSize: '12px', color: '#c084a0', textDecoration: 'none' }}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  )
}