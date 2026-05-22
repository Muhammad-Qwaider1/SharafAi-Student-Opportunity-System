import { useState } from "react";
import { Brain, UserPlus } from "lucide-react";

// 1️⃣ أيقونة منصة الـ SOS (نص هندسي عريض خلفية بنفسجية باهتة)
function SOSIcon() {
  return (
    <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 border border-purple-100/50">
      <span className="text-purple-500 text-xs font-black tracking-tight font-mono">
        SOS
      </span>
    </div>
  );
}

// 2️⃣ أيقونة الذكاء الاصطناعي (العقل الانسيابي الاحترافي الجاهز)
function AIIcon() {
  return (
    <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 border border-purple-100/50">
      <Brain className="w-4 h-4 text-purple-500 stroke-[2.5]" />
    </div>
  );
}

// 3️⃣ أيقونة الـ Peer Collaboration (شخص وإشارة زائد خلفية بيج باهتة)
function PeerIcon() {
  return (
    <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center flex-shrink-0 border border-stone-200/50">
      <UserPlus className="w-4 h-4 text-stone-700 stroke-[2.5]" />
    </div>
  );
}
const notifications = [
  {
    id: "sos",
    Icon: SOSIcon,
    title: "Emergency SOS Alerts",
    description: "Instant notifications for high-priority academic alerts",
    defaultOn: true,
  },
  {
    id: "ai",
    Icon: AIIcon,
    title: "AI Career Guidance",
    description: "Daily pathway optimizations based on your learning speed",
    defaultOn: false,
  },
  {
    id: "peer",
    Icon: PeerIcon,
    title: "Peer Collaboration",
    description: "Receive requests from mentors and study groups",
    defaultOn: true,
  },
];

// 🛠️ تم تعديل اللون هنا ليعتمد على الألوان الديناميكية من tailwind.config.js
function Toggle({ on, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors duration-300 focus:outline-none flex-shrink-0 overflow-hidden"
    >
      <span
        className={`absolute inset-0 transition-opacity duration-300 ${
          on ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(135deg, #e11d74, #7c3aed)",
        }}
      />
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 z-10 ${
          on ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export default function NotificationSettings() {
  const [states, setStates] = useState(
    Object.fromEntries(notifications.map((n) => [n.id, n.defaultOn]))
  );

  const toggle = (id, val) => setStates((s) => ({ ...s, [id]: val }));

  return (
<div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 text-left">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Notification Settings</h3>
        <span className="text-xs text-green-600 font-medium bg-green-50 px-2.5 py-1 rounded-full">
          Real-time alerts active
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {notifications.map((n) => (
          <div key={n.id} className="flex items-center gap-3">
            <n.Icon />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800">{n.title}</p>
              <p className="text-xs text-gray-400 truncate">{n.description}</p>
            </div>
            <Toggle on={states[n.id]} onChange={(v) => toggle(n.id, v)} />
          </div>
        ))}
      </div>
    </div>
  );
}