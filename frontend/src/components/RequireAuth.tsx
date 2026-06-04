import { useEffect } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useApp } from "@/lib/store";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // شرط أمان: لا تقم بالتوجيه إذا كنا أصلاً بصفحة المصادقة
    if (!user && !location.pathname.startsWith("/auth") && location.pathname !== "/signin" && location.pathname !== "/signup") {
      navigate({ to: "/auth" });
    }
  }, [user, navigate, location.pathname]);

  if (!user) return null;
  return <>{children}</>;
}