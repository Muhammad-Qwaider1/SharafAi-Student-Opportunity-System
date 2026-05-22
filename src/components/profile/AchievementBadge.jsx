import { Trophy } from "lucide-react";

export default function AchievementBadge() {
  return (
    <div className="rounded-2xl shadow-sm p-5 flex flex-col justify-between text-white min-h-[160px]" style={{background: 'linear-gradient(135deg, #E8203A 0%, #C0386B 40%, #7B3FA0 70%, #5B4FCF 100%)'}}>
      <div className="flex items-start justify-between">
        <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <span className="text-xs bg-white/25 backdrop-blur-sm px-2.5 py-1 rounded-full font-medium border border-white/20">
          Unlocked 2d ago
        </span>
      </div>
      <div className="mt-4">
        <h4 className="text-base font-bold">Master Optimizer</h4>
        <p className="text-xs text-white/70 mt-1 leading-relaxed">
          Achieved top 1% efficiency in the AI latency challenge.
        </p>
      </div>
    </div>
  );
}