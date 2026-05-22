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
          alt="Alex Rivera"
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
        />
        <span className="absolute bottom-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white cursor-pointer shadow-sm hover:bg-red-600 transition-colors">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4z" />
          </svg>
        </span>
      </div>
      <h2 className="text-xl font-bold text-gray-900">Alex Rivera</h2>
      <p className="text-sm text-gray-500 mt-1">Advanced AI Ethics Pathway</p>

      <div className="flex gap-12 mt-6 pt-5 border-t border-gray-100 w-full justify-center">
        <div className="text-center">
          <p className="text-2xl font-black text-red-500">4.8</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mt-1">GPA Score</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-black text-purple-600">82%</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mt-1">Progress</p>
        </div>
      </div>
    </div>
  );
}