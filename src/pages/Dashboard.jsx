import { useState } from "react";
import { BarChart3 } from 'lucide-react';

// ─── مصدر البيانات المشترك ─────────────────────────────────────
// هون بس غيّر الأرقام وبيتحدث الرادار والبارات مع بعض تلقائياً
const METRICS = [
  { label: "Strategic Alignment",    value: 0.88, color: "#2218dd" },
  { label: "Execution Velocity",     value: 0.74, color: "#818cf8" },
  { label: "Operational Efficiency", value: 0.92, color: "#e11d75" },
];

// ─── Radar Chart ───────────────────────────────────────────────
const RadarChart = ({ size = 200, metrics }) => {
  const cx = size / 2;
  const cy = size / 2;
  const r  = size * 0.42;
  const levels = 5;

  const axes = [
    { angle: -90 },
    { angle: 30  },
    { angle: 150 },
  ];

  const toRad = (deg) => (deg * Math.PI) / 180;

  const getPoint = (angle, radius) => ({
    x: cx + radius * Math.cos(toRad(angle)),
    y: cy + radius * Math.sin(toRad(angle)),
  });

  // كل metric بتحدد طول محورها + نقطتين ثابتتين على المحاور التانية
  const makePolygon = (primaryAxis, primaryValue, secondary1, secondary2) =>
    axes.map((a, i) => {
      const val = i === primaryAxis ? primaryValue
                : i === 1 ? secondary1
                : secondary2;
      const pt = getPoint(a.angle, r * val);
      return `${pt.x},${pt.y}`;
    }).join(" ");

  // كل polygon مربوط بـ metrics[i].value على محوره الرئيسي
  const poly0 = makePolygon(0, metrics[0].value, 0.55, 0.65); // Strategic
  const poly1 = makePolygon(1, metrics[1].value, 0.50, 0.60); // Velocity
  const poly2 = makePolygon(2, metrics[2].value, 0.60, 0.50); // Efficiency

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f9fafb" />
          <stop offset="100%" stopColor="#f3f4f6" />
        </radialGradient>
      </defs>

      {/* الحلقات الدائرية */}
      {Array.from({ length: levels }, (_, i) => (
        <circle key={i} cx={cx} cy={cy}
          r={(r * (i + 1)) / levels}
          fill={i === 0 ? "url(#bgGrad)" : "none"}
          stroke="#e5e7eb" strokeWidth="1"
        />
      ))}

      {/* خطوط المحاور */}
      {axes.map((a, i) => {
        const pt = getPoint(a.angle, r);
        return <line key={i} x1={cx} y1={cy} x2={pt.x} y2={pt.y}
          stroke="#d1d5db" strokeWidth="1" />;
      })}

      {/* البيانات — كل polygon بلون الـ metric تبعها */}
      <polygon points={poly2}
        fill={`${metrics[2].color}30`} stroke={metrics[2].color}
        strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points={poly1}
        fill={`${metrics[1].color}38`} stroke={metrics[1].color}
        strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points={poly0}
        fill={`${metrics[0].color}4D`} stroke={metrics[0].color}
        strokeWidth="2" strokeLinejoin="round" />

      {/* نقاط أطراف المحاور */}
      {axes.map((a, i) => {
        const pt = getPoint(a.angle, r);
        return <circle key={i} cx={pt.x} cy={pt.y} r="3" fill="#d1d5db" />;
      })}

      {/* نقطة المركز */}
      <circle cx={cx} cy={cy} r="3.5" fill="#9ca3af" />
    </svg>
  );
};

// ─── Progress Bar ──────────────────────────────────────────────
const ProgressBar = ({ label, value, color }) => (
  <div className="mb-5">
    <div className="flex justify-between items-center mb-1.5">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-bold text-gray-800">{value}%</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-2.5">
      <div
        className="h-2.5 rounded-full"
        style={{
          width: `${value}%`,
          backgroundColor: color,
          boxShadow: `0 0 6px ${color}55`,
        }}
      />
    </div>
  </div>
);

// ─── Insight Card ─────────────────────────────────────────────
const InsightCard = ({ quote, source, borderColor }) => (
  <div className="bg-gray-50 rounded-xl p-4 mb-3 border-l-4"
    style={{ borderLeftColor: borderColor }}>
    <p className="text-sm text-gray-700 italic mb-2">"{quote}"</p>
    <span className="text-xs font-semibold" style={{ color: borderColor }}>
      {source}
    </span>
  </div>
);

// ─── Resource Card ────────────────────────────────────────────
const ResourceCard = ({ title, image }) => (
  <div className="flex flex-col rounded-xl overflow-hidden border border-gray-100
    shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
    <div className="h-28 overflow-hidden">
      <img src={image} alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
    <div className="p-2.5 bg-white">
      <p className="text-xs font-semibold text-gray-700 leading-tight">{title}</p>
    </div>
  </div>
);

// ─── Dashboard ────────────────────────────────────────────────
export default function Dashboard() {
  const [alertVisible, setAlertVisible] = useState(true);

  const btnStyle = {
    background: "linear-gradient(90deg, #e11d75, #7c3aed)",
  };
  const btnHoverIn = (e) => {
    e.currentTarget.style.background = "#fff";
    e.currentTarget.style.border = "2px solid #e11d74";
    e.currentTarget.style.backgroundImage = "linear-gradient(90deg, #e11d74, #7c3aed)";
    e.currentTarget.style.WebkitBackgroundClip = "text";
    e.currentTarget.style.WebkitTextFillColor = "transparent";
  };
  const btnHoverOut = (e) => {
    e.currentTarget.style.background = "linear-gradient(90deg, #e11d74, #7c3aed)";
    e.currentTarget.style.border = "2px solid transparent";
    e.currentTarget.style.WebkitBackgroundClip = "initial";
    e.currentTarget.style.WebkitTextFillColor = "#fff";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7 text-left">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-1">
              Analysis Results
            </h1>
            <p className="text-sm text-gray-500 max-w-sm">
              Visual synthesis of your performance metrics and strategic
              AI-driven recommendations for the upcoming quarter.
            </p>
          </div>
          <button
            className="self-start sm:self-auto flex items-center gap-2 sm:px-5
             py-2.5 text-white text-sm font-semibold rounded-xl
             active:scale-95 transition-all flex-shrink-0"
            style={btnStyle}
            onMouseEnter={btnHoverIn}
            onMouseLeave={btnHoverOut}
          >
            Export Report <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
          </button>
        </div>

        {/* ── Top Row: Radar + AI Path ── */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

  {/* Core Performance Radar - يأخذ عمودين من أصل 3 (ثلثي المساحة) */}
  <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-9">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
      <div className="flex items-center gap-1">
        <BarChart3 className="w-8 h-8 text-blue-900" />
        <h2 className="font-semibold text-gray-900 text-left ">Core Performance Radar</h2>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row gap-7 items-center">
      <div className="flex-shrink-0 flex justify-center">
        <RadarChart size={220} metrics={METRICS} /> 
      </div>
      <div className="flex-1 w-full">
        {METRICS.map((m) => (
          <ProgressBar
            key={m.label}
            label={m.label}
            value={Math.round(m.value * 100)}
            color={m.color}
          />
        ))}
      </div>
    </div>
          <div className="flex items-center gap-6 mt-4">
        {METRICS.map((m) => (
          <div key={m.label} className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: m.color }} />
            <span className="text-xs text-gray-500">{m.label.split(" ")[0]}</span>
          </div>
        ))}
      </div>
  </div>

  {/* AI Recommended Path - يأخذ عمود واحد من 3 (ثلث المساحة) */}
  <div className="lg:col-span-1 rounded-2xl p-0.5 shadow-sm"
    style={{ background: "linear-gradient(135deg,#a855f7 0%,#ec4899 50%,#f43f5e 100%)" }}>
    <div className="bg-white rounded-2xl p-5 h-full flex flex-col">
      <span className="text-xs font-bold tracking-widest uppercase mb-3"
        style={{ color: "#a855f7" }}>
        AI Recommended Path
      </span>
      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
        Strategic Acceleration Phase 2
      </h3>
      <p className="text-sm text-gray-500 mb-4 leading-relaxed">
        Based on your Velocity and Alignment scores, we recommend initiating
        the "Phase 2" pathway to maximize efficiency gains in your current workflow.
      </p>
      <div className="space-y-2.5 mb-6 flex-1">
        {["Optimization of data pipelines", "Automated insight generation"].map((item) => (
          <div key={item} className="flex items-center gap-2.5">
            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#7c3aed" }}>
              <svg className="w-3 h-3 text-white" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="text-sm text-gray-700">{item}</span>
          </div>
        ))}
      </div>
      <button
        className="w-full py-2.5 rounded-xl text-white text-sm font-semibold
          hover:opacity-90 active:scale-95 transition-all"
        style={btnStyle}
        onMouseEnter={btnHoverIn}
        onMouseLeave={btnHoverOut}
      >
        Start This Path
      </button>
    </div>
  </div>
</div>

        {/* ── Bottom Row: Insights + Resources ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

          {/* AI Insights & Feedback */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h2 className="font-semibold text-gray-800">AI Insights & Feedback</h2>
            </div>
            <InsightCard
              quote="Your strategic alignment is at an all-time high. Focus on delegating velocity-heavy tasks to the automated suite."
              source="Senior Strategy Engine"
              borderColor="#6366f1"
            />
            <InsightCard
              quote="Efficiency metrics indicate a bottleneck in the validation stage. Consider adopting asynchronous review processes."
              source="Process Analyst Agent"
              borderColor="#e11d75"
            />
          </div>

          {/* Growth Resources */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h2 className="font-semibold text-gray-800">Growth Resources</h2>
              </div>
              <button className="text-sm text-blue-500 hover:text-blue-700 font-medium transition-colors">
                View All
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <ResourceCard
                title="Advanced Scaling Frameworks"
                image="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=200&fit=crop"
              />
              <ResourceCard
                title="AI Optimization Guide"
                image="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop"
              />
            </div>
          </div>
        </div>

        {/* ── Alert Banner ── */}
        {alertVisible && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between
            gap-3 px-5 py-4 rounded-2xl text-white shadow-md"
            style={{ background: "linear-gradient(90deg, #e11d75 50%, #cccccc, #7c3aed 95%)" }}>
            <div className="flex items-start sm:items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="font-semibold text-sm">
                  Action Required: Quarterly Review Deadlines
                </p>
                <p className="text-xs text-white/80 mt-0.5">
                  Please finalize your pathway selection by Friday to ensure
                  AI synchronization for the next sprint.
                </p>
              </div>
            </div>
            <button
              onClick={() => setAlertVisible(false)}
              className="self-end sm:self-auto flex-shrink-0 px-4 py-1.5 border
                border-white/60 rounded-lg text-sm font-semibold hover:bg-white
                hover:text-blue-400 active:scale-95 transition-all"
            >
              Acknowledge
            </button>
          </div>
        )}
      </div>
    </div>
  );
}