import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const questions = [
  {
    id: 3, 
    total: 10,
    text: 'In the context of generative AI, which mechanism primarily enables the model to focus on specific segments of the input data while ignoring others?',
    options: [
      { label: 'A', text: 'Stochastic Gradient Descent and momentum-based optimization.' },
      { label: 'B', text: 'Self-Attention mechanisms within the Transformer architecture.' },
      { label: 'C', text: 'Dimensionality reduction via Principal Component Analysis.' },
      { label: 'D', text: 'Max-pooling operations in Convolutional Neural Networks.' },
    ],
    correct: 'B',
  },
]

export default function Pathways() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('B') 
  const [flagged, setFlagged] = useState(false)
  
  // الحالة الخاصة بالتحكم في ظهور واختفاء واجهة الشات بوت
  const [isBotOpen, setIsBotOpen] = useState(false)

  const q = questions[0]
  const progress = (q.id / q.total) * 100

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#faf8fa',
      backgroundImage: 'radial-gradient(circle at top left, rgba(235,215,255,0.5) 0%, transparent 40%), radial-gradient(circle at bottom right, rgba(253,230,240,0.6) 0%, transparent 35%)',
      fontFamily: '"Inter", -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
    }}>

      <div 
        onClick={() => setIsBotOpen(!isBotOpen)}
        style={{
          position: 'fixed',
          right: 'calc(max(24px, 50% - 560px) + 24px)', 
          top: '70px', 
          zIndex: 2000,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* زر الأيقونة الدائري الأنيق - تم إلغاء البوردر والتضخم الثابت عند الفتح */}
        <div 
          style={{
            width: '48px', 
            height: '48px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(124, 58, 237, 0.25)', 
            background: 'linear-gradient(135deg, #e11d74, #7c3aed)',
            borderRadius: '50%',
            transform: 'scale(1)', 
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.12)'; 
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(124, 58, 237, 0.35)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)'; 
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(124, 58, 237, 0.25)';
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="34" height="34">
            <defs>
              <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#512DA8" />
                <stop offset="50%" stopColor="#7B1FA2" />
                <stop offset="100%" stopColor="#C2185B" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="url(#purpleGradient)" />
            <path fill="#FFF" d="M38 42h24a4 4 0 014 4v18a4 4 0 01-4 4H38a4 4 0 01-4-4V46a4 4 0 014-4zm6 0l2-5h8l2 5zM30 50h4v10h-4zm36 0h4v10h-4z" />
            <path fill="#6A1B9A" d="M43 48a3 3 0 100 6 3 3 0 000-6zm14 0a3 3 0 100 6 3 3 0 000-6zm-14 11h14v3a1 1 0 01-1 1H44a1 1 0 01-1-1z" />
          </svg>
        </div>

        {/* مؤشر صغير أسفل الأيقونة يوضح حالة الفتح والإغلاق */}
        <div style={{
          width: '6px',
          height: '6px',
          backgroundColor: isBotOpen ? '#e11d74' : '#7c3aed',
          borderRadius: '50%',
          marginTop: '5px',
          transition: 'background-color 0.3s ease',
        }} />
      </div>

      <div>
        {/* ── Progress Header ── */}
        <div style={{ maxWidth: '920px', margin: '0 auto', padding: '40px 24px 0' }}>
          <p style={{
            fontSize: '11px', 
            fontWeight: 600, 
            color: '#6366f1', 
            letterSpacing: '0.08em', 
            marginBottom: '8px',
          }}>
            COGNITIVE EVALUATION
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', margin: 0 }}>
              Deep Learning Architecture Foundations
            </h2>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
              Question {String(q.id).padStart(2, '0')} / {q.total}
            </span>
          </div>

          <div style={{
            width: '100%', height: '4px',
            background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', width: `${progress}%`,
              background: '#8b5cf6', 
              borderRadius: '99px', transition: 'width 0.4s ease',
            }} />
          </div>
        </div>

        {/* ── Question Section ── */}
        <div style={{ maxWidth: '820px', margin: '0 auto', padding: '80px 24px 50px', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '28px', 
            fontWeight: 700,
            color: '#1e293b', 
            lineHeight: 1.4,
            margin: '0 auto',
            letterSpacing: '-0.01em',
          }}>
            {q.text}
          </h1>
        </div>

        {/* ── Options Grid ── */}
        <div style={{
          maxWidth: '920px', margin: '0 auto',
          padding: '0 24px 60px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '20px',
        }}>
          {q.options.map(opt => {
            const isSelected = selected === opt.label

            return (
              <button
                key={opt.label}
                onClick={() => setSelected(opt.label)}
                style={{
                  background: '#fff',
                  border: isSelected ? '2px solid #00039e' : '1px solid #f1f5f9',
                  borderRadius: '16px',
                  padding: '90px 28px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '40px',
                  position: 'relative',
                  boxShadow: isSelected
                    ? '0 10px 25px -5px rgba(220,20,60,0.06)'
                    : '0 4px 12px rgba(0,0,0,0.015)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  if (isSelected) {
                    e.currentTarget.style.boxShadow = '0 12px 30px -5px rgba(220,20,60,0.12)';
                  } else {
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.04)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  if (isSelected) {
                    e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(220,20,60,0.06)';
                  } else {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.015)';
                  }
                }}
              >
                <div style={{
                  minWidth: '30px', height: '40px',
                  borderRadius: '6px',
                  background: isSelected ? 'linear-gradient(90deg, #e11d74, #7c3aed)' : '#f8fafc',
                  border: isSelected ? 'none' : '1px solid #e2e8f0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '12px',
                  color: isSelected ? '#fff' : '#94a3b8',
                  flexShrink: 0,
                }}>
                  {opt.label}
                </div>

                <span style={{
                  fontSize: '16px', 
                  color: isSelected ? '#1e293b' : '#475569',
                  fontWeight: isSelected ? 600 : 500,
                  lineHeight: 1.5,
                }}>
                  {opt.text}
                </span>

                {isSelected && (
                  <div style={{
                    position: 'absolute', top: '12px', right: '12px',
                    width: '16px', height: '16px',
                    background: 'linear-gradient(90deg, #e11d74, #7c3aed)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="9" height="9" fill="none" stroke="#fff" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Bottom Navigation Bar ── */}
      <div style={{
        width: '100%',
        borderTop: '1px solid #f1f5f9',
        backgroundColor: 'transparent',
        padding: '24px 0 40px 0',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: '920px', 
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between', // يوزع الزر الجديد على اليسار والأزرار الأخرى على اليمين بالكامل
          alignItems: 'center',
        }}>
          

          <button
            onClick={() => console.log('Go to previous question')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              border: 'none',
              color: '#616060', // متناسق مع عينة التصميم المرفقة
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '8px 0',
              transition: 'transform 0.2s ease, opacity 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateX(-7px)';
              e.currentTarget.style.backgroundImage = 'linear-gradient(90deg, #e11d75, #7c3aed)';
  e.currentTarget.style.WebkitBackgroundClip = 'text';
  e.currentTarget.style.backgroundClip = 'text';
  e.currentTarget.style.WebkitTextFillColor = 'transparent';
  e.currentTarget.style.color = 'transparent';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.opacity = '1';
e.currentTarget.style.backgroundImage = 'none';
  e.currentTarget.style.WebkitBackgroundClip = 'initial';
  e.currentTarget.style.backgroundClip = 'initial';
  e.currentTarget.style.WebkitTextFillColor = 'initial';
  e.currentTarget.style.color = '#616060';
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>‹</span> Previous
          </button>

          {/* الحاوية اليمينية الخاصة بأزرار التقييم والمتابعة */}
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button
              onClick={() => setFlagged(!flagged)}
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
                e.currentTarget.style.border = '2px solid transparent';
                e.currentTarget.style.backgroundImage = 'linear-gradient(#fff, #fff), linear-gradient(90deg, #e11d74, #7c3aed)';
                e.currentTarget.style.backgroundOrigin = 'border-box';
                e.currentTarget.style.backgroundClip = 'padding-box, border-box';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = '2px solid #e5e7eb';
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.backgroundImage = 'none';
              }}
            >
              {flagged ? '⚑ Flagged' : 'Flag for Review'}
            </button>

            <button 
              style={{
                padding: '12px 24px', 
                borderRadius: '10px',
                border: '2px solid transparent',
                background: 'linear-gradient(90deg, #e11d74, #7c3aed) border-box', 
                color: '#fff', 
                fontSize: '14px', 
                fontWeight: 600, 
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.border = '2px solid #e11d74';
                e.currentTarget.style.backgroundClip = 'text';
                e.currentTarget.style.WebkitBackgroundClip = 'text';
                e.currentTarget.style.WebkitTextFillColor = 'transparent';
                e.currentTarget.style.backgroundImage = 'linear-gradient(90deg, #e11d74, #7c3aed)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'linear-gradient(90deg, #e11d74, #7c3aed) border-box';
                e.currentTarget.style.border = '2px solid transparent';
                e.currentTarget.style.backgroundClip = 'initial';
                e.currentTarget.style.WebkitBackgroundClip = 'initial';
                e.currentTarget.style.WebkitTextFillColor = '#fff';
                e.currentTarget.style.color = '#fff';
              }}
            >
              Continue <span style={{ fontSize: '14px' }}>›</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}