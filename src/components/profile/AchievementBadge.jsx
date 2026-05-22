import { Medal } from "lucide-react";

export default function AchievementBadge() {
  return (
    <div className="rounded-2xl shadow-sm p-5 flex flex-col justify-between text-white min-h-[160px]" style={{background: 'linear-gradient(45deg, #b10150, #1f0055)'}}>
      <div className="flex items-start justify-between">
        <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
          <span className="text-2xl">🎖️</span>
        </div>
<span 
  className="text-xs px-3 py-1 rounded-lg font-medium border border-white/20 shadow-xl backdrop-blur-md bg-white/10 text-white relative overflow-hidden"
  style={{
    backgroundImage: "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.25) 50%)"
  }}
>
  Unlocked 2d ago
</span>
      </div>
      <div className="mt-4">
        <h4 className="text-base font-bold text-left">Master Optimizer</h4>
        <p className="text-xs text-white/70 mt-8 leading-relaxed text-left">
          Achieved top 1% efficiency in the AI latency challenge.
        </p>
      </div>
    </div>
  );
}