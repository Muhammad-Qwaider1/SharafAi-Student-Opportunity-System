import { UserCircle, ChevronRight } from "lucide-react";

const rows = [
  { label: "Student ID", value: "SH-2024-9981-AX", highlight: false, action: false },
  { label: "Institutional Email", value: "a.rivera@sharaf.ai", highlight: true, action: true },
  { label: "Current Semester", value: "Senior Phase – Q3", highlight: false, action: false },
  { label: "Primary Mentor", value: "Dr. Sarah Chen", highlight: false, action: false, icon: true },
];

export default function AccountInformation() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h3 className="font-semibold text-gray-900 mb-2">Account Information</h3>
      <div className="divide-y divide-gray-50">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-4">
            <span className={`text-sm ${row.highlight ? "text-[#8B1A4A] font-medium" : "text-gray-500"}`}>
              {row.label}
            </span>
            <div className="flex items-center gap-2">
              {row.icon && <UserCircle className="w-4 h-4 text-[#8B1A4A]" />}
              <span className="text-sm font-medium text-gray-800">{row.value}</span>
              {row.action && (
                <button className="w-7 h-7 bg-[#8B1A4A] rounded-full flex items-center justify-center shadow-sm hover:bg-[#701539] transition-colors ml-2">
                  <ChevronRight className="w-3.5 h-3.5 text-white" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}