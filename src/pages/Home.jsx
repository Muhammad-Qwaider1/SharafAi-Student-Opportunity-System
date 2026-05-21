import HeroSection from '../components/HeroSection'
import RoleCards from '../components/RoleCards'
import CTASection from '../components/CTASection'

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #fff0f6 0%, #fdf4ff 40%, #f8faff 100%)',
      fontFamily: 'Inter, -apple-system, sans-serif',
    }}>
      <HeroSection />
      <RoleCards />
      <CTASection />
    </div>
  )
}