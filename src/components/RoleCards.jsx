export default function RoleCards() {
  return (
    <section style={{
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '0 24px 64px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
    }}>

      {/* Card 1 - Knowledge Seeker */}
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        border: '1px solid #f0e8f0',
        padding: '36px 32px',
        boxShadow: '0 2px 16px rgba(200,100,150,0.07)',
        transition: 'all 0.8s ease',
        
      }}
      onMouseEnter={e => {
    // هنا نضع ظلاً كبيراً وناعماً يدمج بين الوردي والبنفسجي ليحاكي التدرج اللوني
    e.currentTarget.style.boxShadow = '5px 5px 5px #e11d7550, 5px 5px 5px #7c3aed65';
    e.currentTarget.style.transform = 'translateY(-4px)'; // رفع الكارد قليلاً لأعلى ليعطي إيحاء عمق ثلاثي الأبعاد
  }}
  onMouseLeave={e => {
    // العودة للوضع الافتراضي عند خروج الماوس
    e.currentTarget.style.boxShadow = '0 2px 16px rgba(200,100,150,0.07)';
    e.currentTarget.style.transform = 'translateY(0)';
  }}
      
      >
        {/* Icon */}
        <div style={{
          width: '48px', height: '48px',
          background: '#fce7f3',
          borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '20px',
        }}>
          <svg width="24" height="24" fill="none" stroke="#e11d74" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l6.16-3.422A12 12 0 0121 12.35" />
          </svg>
        </div>

        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
          Knowledge Seeker
        </h2>
        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, marginBottom: '24px' }}>
          Unlock adaptive pathways and mentorship designed to accelerate your career in tech.
          Join thousands of students navigating their future with SharafAI.
        </p>

        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {['AI-Powered Career Roadmap', 'Direct Mentor Access', 'Project-Based Learning'].map(item => (
            <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#374151' }}>
              <svg width="16" height="16" fill="none" stroke="#e11d74" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Card 2 - Path Guardian */}
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        border: '1px solid #f0e8f0',
        padding: '36px 32px',
        boxShadow: '0 2px 16px rgba(200,100,150,0.07)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.8s ease',
        
      }}
      onMouseEnter={e => {
    // هنا نضع ظلاً كبيراً وناعماً يدمج بين الوردي والبنفسجي ليحاكي التدرج اللوني
    e.currentTarget.style.boxShadow = '5px 5px 5px #e11d7550, 5px 5px 5px #7c3aed65';
    e.currentTarget.style.transform = 'translateY(-4px)'; // رفع الكارد قليلاً لأعلى ليعطي إيحاء عمق ثلاثي الأبعاد
  }}
  onMouseLeave={e => {
    // العودة للوضع الافتراضي عند خروج الماوس
    e.currentTarget.style.boxShadow = '0 2px 16px rgba(200,100,150,0.07)';
    e.currentTarget.style.transform = 'translateY(0)';
  }}
      
      >
        {/* Icon */}
        <div>
          <div style={{
            width: '48px', height: '48px',
            background: '#ede9fe',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '20px',
          }}>
            <svg width="24" height="24" fill="none" stroke="#7c3aed" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 110-8 4 4 0 010 8zm6 4a2 2 0 100-4 2 2 0 000 4zM5 16a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
            Path Guardian
          </h2>
          <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, marginBottom: '32px' }}>
            Share your expertise and guide the next generation. Manage curriculum,
            track progress, and provide high-stakes guidance.
          </p>
        </div>

        {/* Instructor Portal */}
        <div style={{
          borderTop: '1px solid #f3e8ff',
          paddingTop: '20px',
        }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#7c3aed', letterSpacing: '0.1em', marginBottom: '4px' }}>
            INSTRUCTOR PORTAL
          </p>
          <p style={{ fontSize: '13px', color: '#9ca3af' }}>
            Manage Guidance, Curriculum & Assessments
          </p>
        </div>
      </div>

    </section>
  )
}