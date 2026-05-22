import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const insights = [
  { label: "Critical Thinking Proficiency", value: 72 },
  { label: "Collaboration Velocity", value: 58 },
];

function InsightBar({ label, value }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 300);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div className="mb-3 last:mb-0">
      <p className="text-xs text-gray-600 mb-1.5">{label}</p>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-[#E63950] to-[#8B1A4A] transition-all duration-700 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function AIInsights() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-[#8B1A4A]" />
        <h3 className="font-semibold text-gray-900 text-sm">AI Insights</h3>
      </div>
      {insights.map((i) => (
        <InsightBar key={i.label} label={i.label} value={i.value} />
      ))}
    </div>
  );
}