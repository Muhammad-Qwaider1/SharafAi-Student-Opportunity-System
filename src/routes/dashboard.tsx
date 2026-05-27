import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { RequireAuth } from "@/components/RequireAuth";
import { useApp } from "@/lib/store";
import { ClipboardList, ArrowRight, Sparkles, Trophy, Clock, GraduationCap } from "lucide-react";
import { STREAM_LABELS } from "@/lib/questions";

export const Route = createFileRoute("/dashboard")({ component: () => <RequireAuth><AppShell><Dashboard /></AppShell></RequireAuth> });

function Dashboard() {
  const { user, history } = useApp();
  if (!user) return null;
  const last = history[0];

  return (
    <div className="space-y-6 fade-up">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-3xl glass p-6 sm:p-8 ring-gradient">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#e11d74]/25 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#7c3aed]/25 blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 text-xs font-medium text-[#7c3aed] mb-3">
            <Sparkles className="w-3 h-3" /> Your academic compass
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold mb-2">
            Welcome, <span className="gradient-text">{user.name}</span>!
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Ready to discover your ideal university major? The assessment takes ~2 minutes and uses a smart rule-based engine to match you to faculties.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile quick view */}
        <div className="glass rounded-3xl p-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">Your Profile</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-purple-500/40">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-bold text-lg">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm bg-white/60 rounded-xl px-3 py-2">
            <GraduationCap className="w-4 h-4 text-[#7c3aed]" />
            <span className="text-muted-foreground">Track:</span>
            <span className="font-semibold">{user.track}</span>
          </div>
          <Link to="/profile" className="block mt-4 text-xs font-semibold text-[#7c3aed] hover:underline">
            Manage profile →
          </Link>
        </div>

        {/* Main action card */}
        <Link to="/assessment" className="lg:col-span-2 group">
          <div className="relative h-full glass rounded-3xl p-6 sm:p-8 overflow-hidden ring-gradient transition-all hover:scale-[1.01] hover:shadow-2xl hover:shadow-purple-500/40">
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full gradient-bg opacity-20 blur-3xl group-hover:opacity-30 transition-opacity" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-pink-500/40 mb-4 animate-pulseGlow">
                <ClipboardList className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Take the Academic Assessment</h2>
              <p className="text-muted-foreground mb-4 max-w-lg">
                Six strategic questions. Our rule-based engine scores your answers across five university streams — Engineering & IT, Medical Sciences, Business & Economics, Arts & Design, and Humanities & Languages — and recommends the faculties that fit you best.
              </p>
              <div className="inline-flex items-center gap-2 gradient-bg text-white font-semibold px-6 py-3 rounded-full shadow-lg shadow-purple-500/40 group-hover:scale-105 transition-transform">
                Start Assessment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Last result */}
      {last && (
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" /> Last assessment
            </h3>
            <Link to="/results" className="text-xs font-semibold text-[#7c3aed] hover:underline">View full results →</Link>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="w-5 h-5 text-[#e11d74]" />
            <div className="font-bold">Top match: <span className="gradient-text">{STREAM_LABELS[last.topStream]}</span></div>
            <span className="text-xs text-muted-foreground ml-auto">{new Date(last.date).toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
