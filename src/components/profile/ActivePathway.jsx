import { ExternalLink } from "lucide-react";

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
];

export default function ActivePathway() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
          Active Pathway
        </span>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
      <h4 className="text-base font-bold text-gray-900 mb-1 text-left">LLM Optimization</h4>
      <p className="text-xs text-gray-500 flex-1 leading-relaxed text-left">
        Applying advanced neural pruning techniques to edge devices.
      </p>
      <div className="flex items-center mt-4 gap-1">
        {avatars.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="collaborator"
            className="w-7 h-7 rounded-full border-2 border-white object-cover -ml-1 first:ml-0"
          />
        ))}
        <span className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-600 -ml-1">
          +4
        </span>
      </div>
    </div>
  );
}