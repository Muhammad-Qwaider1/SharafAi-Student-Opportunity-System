import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useApp } from "@/lib/store";
import { Mail, Lock, ArrowLeft, LogIn, Eye, EyeOff } from "lucide-react"; // تم إضافة Eye و EyeOff هنا

export const Route = createFileRoute("/signin")({ component: SignIn });

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters long (letters, numbers, or symbols like @)").max(100),
});

function SignIn() {
  const { signIn } = useApp();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [authError, setAuthError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    const ok = await signIn(form.email, form.password);
    if (ok) nav({ to: "/dashboard" });
    else setAuthError("Invalid email or password. Try signing up first.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full fade-up">
        <Link to="/auth" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <div className="glass rounded-3xl p-8 ring-gradient">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl gradient-bg mx-auto mb-3 flex items-center justify-center shadow-lg shadow-purple-500/40">
              <LogIn className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in to continue your assessment.</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <Field icon={Mail} label="Email" type="email" value={form.email}
              onChange={v => setForm({ ...form, email: v })} error={errors.email} placeholder="you@example.com" />
            <Field icon={Lock} label="Password" type="password" value={form.password}
              onChange={v => setForm({ ...form, password: v })} error={errors.password} placeholder="••••••••" />
            <div className="text-right -mt-2">
              <Link to="/forgot-password" className="text-xs font-semibold text-[#7c3aed] hover:underline">
                Forgot password?
              </Link>
            </div>

            {authError && <div className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{authError}</div>}

            <button type="submit" className="w-full gradient-bg text-white font-semibold py-3 rounded-xl hover:scale-[1.02] transition-transform animate-pulseGlow">
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            New here? <Link to="/signup" className="gradient-text font-semibold">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export function Field({
  icon: Icon, label, type = "text", value, onChange, error, placeholder, options,
}: {
  icon?: any; label: string; type?: string; value: string;
  onChange: (v: string) => void; error?: string; placeholder?: string;
  options?: { value: string; label: string }[];
}) {
  // حالة مخصصة للتحكم بظهور كلمة المرور وإخفائها
  const [showPassword, setShowPassword] = useState(false);

  // تغيير نوع الحقل ديناميكياً بناءً على حالة العين
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div>
      <label className="block text-xs font-semibold text-foreground/80 mb-1.5">{label}</label>
      <div 
        className={`relative flex items-center glass rounded-xl transition-all duration-200 border border-transparent shadow-sm ${
          error 
            ? "ring-2 ring-red-500/50 border-red-500" 
            : "focus-within:ring-2 focus-within:ring-[#7c3aed] focus-within:border-[#7c3aed] focus-within:shadow-md focus-within:shadow-[#7c3aed]/10"
        }`}
      >
        {Icon && <Icon className="w-4 h-4 text-[#7c3aed] absolute left-3.5 pointer-events-none" />}
        {options ? (
          <select
            className={`w-full bg-transparent py-3 ${Icon ? "pl-10" : "pl-4"} pr-4 text-sm outline-none cursor-pointer appearance-none text-foreground`}
            value={value} onChange={e => onChange(e.target.value)}
          >
            <option value="" className="bg-background">Select…</option>
            {options.map(o => <option key={o.value} value={o.value} className="bg-background text-foreground">{o.label}</option>)}
          </select>
        ) : (
          <input
            type={inputType} value={value} placeholder={placeholder}
            onChange={e => onChange(e.target.value)}
            // تم تعديل الـ pr (Padding Right) إلى pr-10 لكي لا يتداخل النص مع زر العين
            className={`w-full bg-transparent py-3 ${Icon ? "pl-10" : "pl-4"} ${type === "password" ? "pr-10" : "pr-4"} text-sm outline-none placeholder:text-muted-foreground/60 text-foreground`}
          />
        )}

        {/* زر العين يظهر فقط إذا كان نوع الحقل الأساسي password */}
        {type === "password" && (
          <button
            type="button" // ضروري جداً لكي لا يقوم بعمل Submit للفورم عند الضغط عليه
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-muted-foreground/70 hover:text-[#7c3aed] transition-colors duration-150"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}