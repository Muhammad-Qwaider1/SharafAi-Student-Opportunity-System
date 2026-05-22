import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import sharafLogo from '../assets/welcomLogo.jpg'

export default function Welcome() {
  const navigate = useNavigate()

  // هوك لمراقبة عرض الشاشة من أجل ضمان التجاوب الكامل (Responsiveness)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // تحديد أحجام مرنة بناءً على حجم الشاشة (Mobile vs Desktop)
  const isMobile = windowWidth <= 768
  const logoSize = isMobile ? '80px' : '100px'
  const titleFontSize = isMobile ? '32px' : '48px'
  const subtitleFontSize = isMobile ? '14px' : '16px'

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#fff5f8', // الخلفية الزهرية الناعمة جداً
      backgroundImage: 'radial-gradient(circle at top, rgba(255,240,245,0.8) 0%, transparent 60%)',
      fontFamily: 'Inter, -apple-system, sans-serif',
      textAlign: 'center',
      padding: '24px',
      boxSizing: 'border-box',
    }}>
      
      {/* أولاً: إضافة الشعار (Logo) بشكل دائري وأنيق في المنتصف */}
      <div style={{
        marginBottom: isMobile ? '24px' : '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease'
      }}>
        <img 
          src={sharafLogo} 
          alt="SharafAI Logo" 
          style={{
            width: '90%',
            height: '90%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* ثانياً: النص الترحيبي الرئيسي مع حجم خط متجاوب */}
      <h1 style={{
        fontSize: titleFontSize,
        fontWeight: 700,
        color: '#0f172a',
        marginBottom: isMobile ? '20px' : '30px',
        letterSpacing: '-0.02em',
        lineHeight: '1.2',
      }}>
        Welcome to <span style={{
          background: 'linear-gradient(90deg, #e11d74, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 800
        }}>SharafAI</span>
      </h1>

      {/* ثالثاً: الوصف الفرعي */}
      <p style={{
        fontSize: subtitleFontSize,
        color: '#64748b',
        maxWidth: '540px',
        lineHeight: '1.6',
        marginBottom: isMobile ? '30px' : '36px',
        fontWeight: 500,
        padding: isMobile ? '0 8px' : '0',
      }}>
        Your intelligent learning companion. Start your cognitive evaluation and discover personalized pathways.
      </p>

      {/* رابعاً: زر الانتقال مع الحفاظ على التعديلات اللمسية والـ Hover الخاصة بك */}
      <button 
        onClick={() => navigate('/login')}
        style={{
          background: 'linear-gradient(90deg, #e11d74, #7c3aed)',
          color: '#fff',
          border: 'none',
          padding: isMobile ? '12px 28px' : '14px 32px',
          fontSize: isMobile ? '14px' : '15px',
          fontWeight: 600,
          borderRadius: '12px',
          cursor: 'pointer',
          boxShadow: '0 10px 25px -5px rgba(225, 29, 116, 0.4)',
          transition: 'transform 0.2s ease, boxShadow 0.2s ease, background 0.2s ease, color 0.2s ease',
          width: isMobile ? '100%' : 'auto', // يصبح الزر عريضاً على الهواتف لسهولة الضغط
          maxWidth: '280px',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 15px 30px 5px #7c3aeda1'
          e.currentTarget.style.background = '#fff5f8'
          e.currentTarget.style.color = '#e11d74'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(225, 29, 116, 0.4)'
          e.currentTarget.style.color = '#fff'
          e.currentTarget.style.background = 'linear-gradient(90deg, #e11d74, #7c3aed)'
        }}
      >
        Start Assessment →
      </button>

    </div>
  )
}