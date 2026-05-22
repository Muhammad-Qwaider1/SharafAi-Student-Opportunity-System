import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import sharafLogo from '../../assets/sharafai-logo.jpg'

export default function SignUp() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة!')
      return
    }

    setError('')
    // هنا يتم حفظ البيانات أو إرسالها للباك إند لاحقاً
    // تجريبياً: سنقوم بحفظ توكن وتوجيهه للداخل فوراً
    localStorage.setItem('userToken', 'mock-jwt-token-12345')
    navigate('/dashboard')
  }

  // ميثود مخصصة لتأثير التركيز (Focus) على الحقول مثل كود الـ Login الخاص بك
  const handleFocus = (e) => {
    const parent = e.currentTarget.parentElement;
    parent.style.borderColor = 'transparent';
    parent.style.backgroundImage = 'linear-gradient(#fff, #fff), linear-gradient(90deg, #e11d74 0%, #7c3aed 100%)';
    parent.style.backgroundOrigin = 'border-box';
    parent.style.backgroundClip = 'padding-box, border-box';
  }

  const handleBlur = (e) => {
    const parent = e.currentTarget.parentElement;
    parent.style.borderColor = '#e5e7eb';
    parent.style.backgroundImage = 'none';
    parent.style.backgroundOrigin = 'initial';
    parent.style.backgroundClip = 'initial';
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ede9f6 0%, #f8f6ff 40%, #eef1fb 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
      padding: '24px',
      boxSizing: 'border-box',
    }}>
      
      {/* ===== Card ===== */}
      <div style={{
        width: '100%',
        maxWidth: '600px', // أعرض بقليل من الـ Login لتستوعب الحقول براحة
        background: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 8px 40px rgba(100, 80, 180, 0.10)',
        padding: '40px 44px 36px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}>
        
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0px' }}>
          <img src={sharafLogo} alt="SharafAI" style={{ height: '180px', width: 'auto', objectFit: 'contain' }} />
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px', textAlign: 'center' }}>
          Create an Account
        </h1>
        <p style={{ fontSize: '15px',// 1. نضع التدرج كخلفية للنص
  backgroundImage: 'linear-gradient(90deg, #e11d754d, #7c3aed5b)',
  
  // 2. نخبر المتصفح أن يقص الخلفية على حدّ حدود الحروف فقط
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  
  // 3. نجعل لون النص الأصلي شفافاً تماماً لتظهر الخلفية المقصوصة من تحته
  WebkitTextFillColor: 'transparent',
  color: 'transparent', marginBottom: '24px', textAlign: 'center' }}>
          Join SharafAI today and start your personalized AI journey.
        </p>

        {/* Errors */}
        {error && (
          <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '16px', fontWeight: 600, textAlign: 'center' }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Full Name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '15.6px', fontWeight: 600, color: '#374151' }}>Full Name</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e5e7eb', borderRadius: '10px', padding: '10px 14px', background: '#fff', gap: '10px' }}>
              <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" required style={{ flex: 1, border: 'none', outline: 'none', fontSize: '15px', color: '#1f2937', background: 'transparent', cursor: 'pointer' }} onFocus={handleFocus} onBlur={handleBlur} />
            </div>
          </div>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '15px', fontWeight: 600, color: '#374151' }}>Email Address</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e5e7eb', borderRadius: '10px', padding: '10px 14px', background: '#fff', gap: '10px' }}>
              <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" required style={{ flex: 1, border: 'none', outline: 'none', fontSize: '15px', color: '#1f2937', background: 'transparent',cursor: 'pointer' }} onFocus={handleFocus} onBlur={handleBlur} />
            </div>
          </div>

          {/* Role Selection Dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '15px', fontWeight: 600, color: '#374151' }}>Select Your Role</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e5e7eb', borderRadius: '10px', padding: '10px 14px', background: '#fff', gap: '10px' }}>
              <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <select value={role} onChange={(e) => setRole(e.target.value)} required style={{ flex: 1, border: 'none', outline: 'none', fontSize: '15px', color: '#1f2937', background: 'transparent', cursor: 'pointer', appearance: 'none' }} onFocus={handleFocus} onBlur={handleBlur}>
                <option value="" disabled hidden>Choose your current field...</option>
                <option value="student">Student / University Specialist</option>
                <option value="developer">Software Engineer / Developer</option>
                <option value="professional">Other Professional</option>
              </select>
            </div>
          </div>

          {/* Password & Confirm Password Container (متجاوب تلقائياً بفضل الـ FlexWrap) */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 200px' }}>
              <label style={{ fontSize: '15px', fontWeight: 600, color: '#374151' }}>Password</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e5e7eb', borderRadius: '10px', padding: '10px 14px', background: '#fff', gap: '10px' }}>
                <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', color: '#1f2937', background: 'transparent', letterSpacing: '0.15em', cursor: 'pointer' }} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            </div>

            {/* Confirm Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 200px' }}>
              <label style={{ fontSize: '15px', fontWeight: 600, color: '#374151' }}>Confirm Password</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e5e7eb', borderRadius: '10px', padding: '10px 14px', background: '#fff', gap: '10px' }}>
                <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', color: '#1f2937', background: 'transparent', letterSpacing: '0.15em', cursor: 'pointer' }} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" style={{ width: '100%', padding: '13px', borderRadius: '10px', border: 'none', background: 'linear-gradient(90deg, #e11d74 0%, #7c3aed 100%)', color: '#fff', fontSize: '15px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.02em', transition: 'opacity 0.2s', marginTop: '10px' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.8'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            Sign Up →
          </button>
        </form>

        {/* Existing Account Link */}
        <p style={{ marginTop: '24px', fontSize: '14px', color: '#9ca3af' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#e11d74', fontWeight: 700, textDecoration: 'none' }}>
            Sign In
          </Link>
        </p>

      </div>
    </div>
  )
}