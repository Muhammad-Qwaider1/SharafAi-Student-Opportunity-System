import { useState } from "react";

export default function ProfileHeader() {
  // 🌟 فصلنا الـ State: كل زر أصبح لديه الحارس الخاص به
  const [isPathHovered, setIsPathHovered] = useState(false);
  const [isIdentityHovered, setIsIdentityHovered] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div className="text-left">
        <h1 className="text-3xl font-bold text-gray-900">Student Profile</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Manage your academic journey and system preferences.
        </p>
      </div>

      <div className="flex gap-3 items-center">
        {/* 1️⃣ زر View Public Path - يقرأ ويعدل (isPathHovered) فقط */}
<button
  className="px-6 py-2 font-semibold rounded-lg transition-all duration-500 focus:outline-none relative"
  onMouseEnter={() => setIsPathHovered(true)}
  onMouseLeave={() => setIsPathHovered(false)}
  style={{
    // هنا نضع التنسيق للحالتين بشكل واضح
    background: isPathHovered 
      ? "linear-gradient(#fff, #fff) padding-box, linear-gradient(135deg, #e11d74, #7c3aed) border-box" 
      : "#ffffff", // الحالة العادية: خلفية بيضاء صريحة
    border: "2px solid transparent",
  }}
>
  <span
    style={{
      // في الحالة العادية لون النص رمادي طبيعي وبدون أي خلفية
      background: isPathHovered 
        ? "linear-gradient(135deg, #e11d74, #7c3aed)" 
        : "transparent",
      WebkitBackgroundClip: isPathHovered ? "text" : "unset",
      backgroundClip: isPathHovered ? "text" : "unset",
      WebkitTextFillColor: isPathHovered ? "transparent" : "#374151", // النص الرمادي العادي
      transition: "all 0.5s ease"
    }}
  >
    View Public Path
  </span>
</button>

        {/* 2️⃣ زر Edit Identity - يقرأ ويعدل (isIdentityHovered) فقط */}
        <button
          className="px-6 py-2 font-semibold rounded-lg shadow-sm focus:outline-none transition-all duration-500 border-2"
          onMouseEnter={() => setIsIdentityHovered(true)}
          onMouseLeave={() => setIsIdentityHovered(false)}
          style={{
            background: isIdentityHovered ? "#ffffff" : "linear-gradient(135deg, #e11d74, #7c3aed)",
            borderColor: isIdentityHovered ? "#e11d74" : "transparent", // أعدنا تفعيل الـ border ليحافظ على انحنائه المتناسق مع التدرج
          }}
        >
          <span
            className="transition-all duration-500 inline-block"
            style={{
              backgroundImage: isIdentityHovered ? "linear-gradient(135deg, #e11d74, #7c3aed)" : "none",
              WebkitBackgroundClip: isIdentityHovered ? "text" : "unset",
              backgroundClip: isIdentityHovered ? "text" : "unset",
              WebkitTextFillColor: isIdentityHovered ? "transparent" : "unset",
              color: isIdentityHovered ? "transparent" : "#ffffff"
            }}
          >
            Edit Identity
          </span>
        </button>
      </div>
    </div>
  );
}