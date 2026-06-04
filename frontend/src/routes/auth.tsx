import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useApp } from "@/lib/store";
import { LogIn, UserPlus, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthGate,
});

function AuthGate() {
  const { user } = useApp();
  const nav = useNavigate();
  useEffect(() => { if (user) nav({ to: "/dashboard" }); }, [user, nav]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full fade-up">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-5xl font-bold mb-3">
            <span className="gradient-text">Welcome.</span> Let's get you started.
          </h2>
          <p className="text-muted-foreground">Do you already have an account?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/signin" className="group relative">
            <div className="glass rounded-3xl p-8 h-full transition-all hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/30">
              <div className="w-14 h-14 rounded-2xl bg-[#7c3aed]/15 flex items-center justify-center mb-4 group-hover:gradient-bg transition-colors">
                <LogIn className="w-7 h-7 text-[#7c3aed] group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-1">I have an account</h3>
              <p className="text-sm text-muted-foreground mb-4">Sign in and continue your journey.</p>
              <span className="inline-flex items-center gap-2 text-[#7c3aed] font-semibold text-sm">
                Sign In →
              </span>
            </div>
          </Link>

          <Link to="/signup" className="group relative">
            <div className="glass rounded-3xl p-8 h-full transition-all hover:scale-[1.03] hover:shadow-2xl hover:shadow-pink-500/30 ring-gradient">
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-4 shadow-lg shadow-pink-500/40">
                <UserPlus className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-1">I'm new here</h3>
              <p className="text-sm text-muted-foreground mb-4">Create your account and take the assessment.</p>
              <span className="inline-flex items-center gap-2 gradient-text font-semibold text-sm">
                Sign Up →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
