import ProfileHeader from "../components/profile/ProfileHeader";
import NotificationSettings from "../components/profile/NotificationSettings";
import AIInsights from "../components/profile/AIInsights";
import ActivePathway from "../components/profile/ActivePathway";
import AchievementBadge from "../components/profile/AchievementBadge";
import AccountInformation from "../components/profile/AccountInformation";

const AVATAR_URL = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans pb-12">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* رأس الصفحة العلوية */}
        <ProfileHeader />
        
        {/* شبكة توزيع العناصر (Grid System) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* العمود الأيسر - كرت الصورة والـ Insights */}
          <div className="flex flex-col gap-6">
            <AvatarCard avatarUrl={AVATAR_URL} />
            <AIInsights />
          </div>

          {/* العمود الأيمن - الإعدادات والمعلومات (يأخذ مساحة أكبر) */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <NotificationSettings />
            
            {/* توزيع البطاقات الصغيرة جنباً إلى جنب */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ActivePathway />
              <AchievementBadge />
            </div>
            
            <AccountInformation />
          </div>

        </div>
      </main>
    </div>
  );
}

function AvatarCard({ avatarUrl }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center text-center border border-gray-100">
      <div className="relative mb-4">
        <img
          src={avatarUrl}
          alt="Muhammad Qwaider"
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
        />
<span className="absolute bottom-1 right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white cursor-pointer shadow-sm transition-colors" style={{ backgroundColor: '#7c3aed' }}>
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L14.05 4.31L17.11 4.14L18.1 7.02L20.89 8.24L20.5 11.27L22 13.92L19.86 16.08L19.46 19.11L16.4 19.89L14.7 22.44L12 21.2L9.3 22.44L7.6 19.89L4.54 19.11L4.14 16.08L2 13.92L3.5 11.27L3.11 8.24L5.9 7.02L6.89 4.14L9.95 4.31L12 2Z" fill="white" />
    <path d="M9 12.5L11 14.5L15.5 10" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
</span>
      </div>
      <h2 className="text-xl font-bold text-gray-900">Muhammad Qwaider</h2>
      <p className="text-sm text-gray-500 mt-1">Advanced AI Ethics Pathway</p>

<div className="flex gap-12 mt-6 pt-5 border-t border-gray-100 w-full justify-center">
  <div className="text-center">
    <p 
  className="text-2xl font-black" 
  style={{ color: '#e11d74' }}
>
  4.8
</p>
    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mt-1" style={{ color: '#e11d74' }}>GPA Score</p>
  </div>
  <div className="text-center">
    <p className="text-2xl font-black" style={{ color: '#7c3aed' }}>82%</p>
    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mt-1" style={{ color: '#7c3aed' }}>Progress</p>
  </div>
</div>
    </div>
  );
}