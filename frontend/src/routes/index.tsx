import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, GraduationCap, Brain, Compass } from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({
  component: Welcome,
});

function Welcome() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#7c3aed]/20 blur-3xl animate-floaty" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#e11d74]/20 blur-3xl animate-floaty" style={{ animationDelay: "1s" }} />

      <div className="relative max-w-4xl w-full">
        <div className="glass rounded-3xl p-8 sm:p-14 fade-up ring-gradient">
          <div className="flex justify-center mb-6">
<div className="animate-floaty mb-4">
  <Logo className="h-20" />
</div>
          </div>

          <h1 className="text-center text-4xl sm:text-6xl font-bold tracking-tight mb-4">
            <span className="gradient-text">Discover the major</span><br />
            <span className="text-foreground">built for your mind.</span>
          </h1>

          <p className="text-center text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            A premium academic guidance platform for High School Graduates — built with a smart rule-based engine that maps your interests to the right university faculty.
          </p>
          <p dir="rtl" className="text-center text-sm sm:text-base text-muted-foreground/90 max-w-2xl mx-auto mb-10">
            منصة التوجيه الأكاديمي لطلاب البكالوريا — اكتشف اختصاصك الجامعي المثالي.
          </p>

          <div className="grid sm:grid-cols-3 gap-3 mb-10">
            {[
              { icon: Brain, title: "Smart Engine", desc: "Rule-based logic analyzes every answer." },
              { icon: Compass, title: "Clear Direction", desc: "Mapped to real university faculties." },
              { icon: Sparkles, title: "Beautiful UX", desc: "Designed to feel premium and personal." },
            ].map((f, i) => (
              <div key={i} className="glass rounded-2xl p-4 hover:scale-105 transition-transform">
                <f.icon className="w-6 h-6 text-[#7c3aed] mb-2" />
                <div className="font-semibold text-sm">{f.title}</div>
                <div className="text-xs text-muted-foreground">{f.desc}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              to="/auth"
              className="group inline-flex items-center gap-3 gradient-bg text-white px-8 py-4 rounded-full font-semibold text-lg animate-pulseGlow hover:scale-105 transition-transform"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
