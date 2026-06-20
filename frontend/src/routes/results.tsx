import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { RequireAuth } from "@/components/RequireAuth";
import { useApp } from "@/lib/store";
import { STREAM_LABELS, FACULTY_MAP, type Stream } from "@/lib/questions";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Download, Share2, Trophy, GraduationCap, ClipboardList } from "lucide-react";

export const Route = createFileRoute("/results")({
  component: () => <RequireAuth><AppShell><Results /></AppShell></RequireAuth>,
});

function Results() {
  const { history, user } = useApp();
  const last = history[0];

  if (!last) {
    return (
      <div className="max-w-xl mx-auto glass rounded-3xl p-10 text-center fade-up">
        <ClipboardList className="w-12 h-12 mx-auto text-[#7c3aed] mb-3" />
        <h2 className="text-2xl font-bold mb-2">No assessment yet</h2>
        <p className="text-muted-foreground mb-6">Take your first assessment to see your personalized university roadmap.</p>
        <Link to="/assessment" className="inline-flex gradient-bg text-white font-semibold px-6 py-3 rounded-full animate-pulseGlow hover:scale-105 transition-transform">
          Start Assessment
        </Link>
      </div>
    );
  }

  const data = (Object.keys(STREAM_LABELS) as Stream[]).map(k => ({
    stream: STREAM_LABELS[k].replace(" & ", " &\n"),
    key: k,
    score: last.scores[k] ?? 0,
  }));
  const sorted = [...data].sort((a, b) => b.score - a.score);
  const faculties = last.recommendedFaculties ?? FACULTY_MAP[last.topStream];

  const handleDownload = () => {
    const text = [
      `Student Opportunity System — Assessment Results`,
      `Name: ${user?.name}`,
      `Date: ${new Date(last.date).toLocaleString()}`,
      ``,
      ...sorted.map(s => `${STREAM_LABELS[s.key as Stream]}: ${s.score}% match`),
      ``,
      `Recommended faculties:`,
      ...faculties.map(f => `- ${f}`),
    ].join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "assessment-results.txt"; a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const text = `My top university match is ${STREAM_LABELS[last.topStream]} (${last.scores[last.topStream]}% match)!`;
    if (navigator.share) {
      try { await navigator.share({ title: "My Results", text }); } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div className="space-y-6 fade-up">
      <div className="glass rounded-3xl p-6 sm:p-8 ring-gradient relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-[#7c3aed]/20 blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 text-xs font-semibold text-[#e11d74] mb-3">
              <Trophy className="w-3 h-3" /> Top match
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold mb-2">
              <span className="gradient-text">{STREAM_LABELS[last.topStream]}</span>
            </h1>
            <p className="text-muted-foreground max-w-lg">
              Based on your answers, this stream best fits your interests and strengths. Below is a full breakdown across all five university categories.
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleDownload} className="inline-flex items-center gap-2 glass px-4 py-2.5 rounded-full text-sm font-semibold hover:scale-105 transition-transform">
              <Download className="w-4 h-4" /> Download
            </button>
            <button onClick={handleShare} className="inline-flex items-center gap-2 gradient-bg text-white px-4 py-2.5 rounded-full text-sm font-semibold hover:scale-105 transition-transform shadow-lg shadow-purple-500/40">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Radar chart */}
        <div className="lg:col-span-3 glass rounded-3xl p-4 sm:p-6">
          <h3 className="font-bold mb-2">Interest Radar</h3>
          <p className="text-xs text-muted-foreground mb-4">Your alignment across five university streams.</p>
          <div className="h-[360px] sm:h-[440px]">
            <ResponsiveContainer>
              <RadarChart data={data} outerRadius="75%">
                <defs>
                  <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#e11d74" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <PolarGrid stroke="rgba(124,58,237,0.2)" />
                <PolarAngleAxis dataKey="stream" tick={{ fill: "#4c1d95", fontSize: 11, fontWeight: 600 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fill: "#7c3aed", fontSize: 10 }} stroke="rgba(124,58,237,0.2)" />
                <Tooltip
                  contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #7c3aed", borderRadius: 12, fontSize: 12 }}
                  formatter={(v: number) => [`${v}% match`, ""]}
                />
                <Radar name="Match" dataKey="score" stroke="#7c3aed" strokeWidth={2} fill="url(#radarFill)" />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scores */}
        <div className="lg:col-span-2 glass rounded-3xl p-6">
          <h3 className="font-bold mb-4">Detailed Scores</h3>
          <div className="space-y-4">
            {sorted.map((s, i) => (
              <div key={s.key}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2 font-medium">
                    {i === 0 && <Trophy className="w-3.5 h-3.5 text-[#e11d74]" />}
                    {STREAM_LABELS[s.key as Stream]}
                  </div>
                  <span className="font-bold gradient-text">{s.score}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-white/60 overflow-hidden">
                  <div
                    className="h-full rounded-full gradient-bg transition-all duration-700 ease-out"
                    style={{ width: `${s.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended faculties */}
      <div className="glass rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold">Recommended Faculties</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {faculties.map(f => (
            <div key={f} className="glass rounded-2xl p-4 hover:scale-[1.03] transition-transform">
              <div className="text-xs text-muted-foreground mb-1">Faculty of</div>
              <div className="font-semibold">{f}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}