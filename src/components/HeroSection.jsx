export default function HeroSection() {
  return (
    <section style={{
      textAlign: 'center',
      padding: '64px 24px 40px',
      maxWidth: '700px',
      margin: '0 auto',
    }}>
<h1 style={{
  fontSize: 'clamp(32px, 8vw, 48px)',
  fontWeight: 800,
  color: '#0f172a',
  lineHeight: 1.2,
  marginBottom: '16px',
}}>
  Join the{' '}
  <span style={{ 
    background: "linear-gradient(90deg, #e11d74, #7c3aed, #ffffff)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    animation: "shine 3s linear infinite",
  }}>
    Future
  </span>
  <style>
{`
  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
`}
</style>
</h1>
      <p style={{
        fontSize: 'clamp(14px, 2vw, 16px)',
        color: '#6b7280',
        lineHeight: 1.7,
        maxWidth: '500px',
        margin: '0 auto',
      }}>
        Select your role to start your personalized AI-driven guidance journey.
        Experience a platform built for professional excellence and rapid response.
      </p>
    </section>
  )
}