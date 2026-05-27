import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useApp } from "@/lib/store";
import { Field } from "./signin";
import { Mail, Lock, User as UserIcon, GraduationCap, ArrowLeft, UserPlus } from "lucide-react";

export const Route = createFileRoute("/signup")({ component: SignUp });

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters long (letters, numbers, or symbols like @)").max(100),
  track: z.enum(["Scientific", "Literary"], { message: "Pick your track" }),
});

function SignUp() {
  const { signUp } = useApp();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", track: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    signUp({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      track: form.track as "Scientific" | "Literary",
    });
    nav({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" dir="ltr">
      <div className="max-w-md w-full fade-up">
        <Link to="/auth" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <div className="glass rounded-3xl p-8 ring-gradient">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl gradient-bg mx-auto mb-3 flex items-center justify-center shadow-lg shadow-pink-500/40">
              <UserPlus className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">Create your account</h1>
            <p className="text-sm text-muted-foreground">Start your guided academic journey.</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <Field icon={UserIcon} label="Full Name" value={form.name}
              onChange={v => setForm({ ...form, name: v })} error={errors.name} placeholder="Your full name" />
            <Field icon={Mail} label="Email" type="email" value={form.email}
              onChange={v => setForm({ ...form, email: v })} error={errors.email} placeholder="you@example.com" />
            <Field icon={Lock} label="Password" type="password" value={form.password}
              onChange={v => setForm({ ...form, password: v })} error={errors.password} placeholder="••••••••" />
            <Field icon={GraduationCap} label="High School Track" value={form.track}
              onChange={v => setForm({ ...form, track: v })} error={errors.track}
              options={[
                { value: "Scientific", label: "العلمي — Scientific" },
                { value: "Literary", label: "الأدبي — Literary" },
              ]} />

            <button type="submit" className="w-full gradient-bg text-white font-semibold py-3 rounded-xl hover:scale-[1.02] transition-transform animate-pulseGlow">
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already a member? <Link to="/signin" className="gradient-text font-semibold">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}