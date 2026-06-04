import { Link, useRouterState } from "@tanstack/react-router";
import { useApp } from "@/lib/store";
import { Sparkles, LayoutDashboard, ClipboardList, BarChart3, User as UserIcon, LogOut } from "lucide-react";
import { Logo } from "@/components/Logo";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useApp();
  const pathname = useRouterState({ select: s => s.location.pathname });

  const nav = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/assessment", label: "Assessment", icon: ClipboardList },
    { to: "/results", label: "Results", icon: BarChart3 },
    { to: "/profile", label: "Profile", icon: UserIcon },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 glass border-b border-white/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 group">
             <Logo className="h-10 transition-transform group-hover:scale-105" />
          </Link>


          <nav className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
            {nav.map(item => {
              const active = pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    active
                      ? "gradient-bg text-white shadow-md shadow-purple-500/40 scale-105"
                      : "text-foreground/70 hover:text-foreground hover:bg-white/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {user && (
              <div className="hidden sm:flex items-center gap-2 glass rounded-full pl-1 pr-3 py-1">
                <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
            )}
            <button
              onClick={signOut}
              className="p-2 rounded-full glass hover:bg-white/80 transition-all hover:scale-110"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4 text-[#7c3aed]" />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="md:hidden flex items-center justify-around px-2 pb-2">
          {nav.map(item => {
            const active = pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-[10px] font-medium transition-all ${
                  active ? "gradient-text" : "text-foreground/60"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-[#7c3aed]" : ""}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">{children}</main>

      <footer className="text-center text-xs text-muted-foreground py-6">
        © {new Date().getFullYear()} SharafAi-SOS — Discover your path.
      </footer>
    </div>
  );
}