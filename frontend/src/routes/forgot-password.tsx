import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Field } from "./signin";
import { KeyRound, ArrowLeft, Mail, Lock, ShieldCheck } from "lucide-react";
import * as api from "@/lib/api";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPassword,
});

const requestSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
});

const resetSchema = z
  .object({
    email: z.string().trim().email("Enter a valid email").max(255),
    code: z.string().trim().min(4, "Enter the code sent to your email").max(10),
    password: z.string().min(8, "Password must be at least 8 characters long").max(100),
    password_confirmation: z.string(),
  })
  .refine(d => d.password === d.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

function ForgotPassword() {
  const nav = useNavigate();
  const [stage, setStage] = useState<"request" | "reset">("request");
  const [form, setForm] = useState({
    email: "",
    code: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const requestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const r = requestSchema.safeParse({ email: form.email });
    if (!r.success) {
      setErrors({ email: r.error.issues[0].message });
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      await api.forgetPassword({ email: form.email.trim() });
      setMessage("A reset code has been sent to your email.");
      setStage("reset");
    } catch (err) {
      setMessage(err instanceof api.ApiError ? err.message : "Could not send the reset code.");
    } finally {
      setBusy(false);
    }
  };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const r = resetSchema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      await api.resetPassword({
        email: form.email.trim(),
        code: form.code.trim(),
        password: form.password,
        password_confirmation: form.password_confirmation,
      });
      setMessage("Your password has been reset. You can now sign in.");
      setTimeout(() => nav({ to: "/signin" }), 1200);
    } catch (err) {
      setMessage(err instanceof api.ApiError ? err.message : "Could not reset password. Check your code and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full fade-up">
        <Link to="/signin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to sign in
        </Link>
        <div className="glass rounded-3xl p-8 ring-gradient">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl gradient-bg mx-auto mb-3 flex items-center justify-center shadow-lg shadow-purple-500/40">
              <KeyRound className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">Reset your password</h1>
            <p className="text-sm text-muted-foreground">
              {stage === "request" ? "Enter your email to receive a reset code." : "Enter the code and your new password."}
            </p>
          </div>

          {stage === "request" ? (
            <form onSubmit={requestCode} className="space-y-4">
              <Field icon={Mail} label="Email" type="email" value={form.email}
                onChange={v => setForm({ ...form, email: v })} error={errors.email} placeholder="you@example.com" />

              {message && <div className="text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">{message}</div>}

              <button type="submit" disabled={busy}
                className="w-full gradient-bg text-white font-semibold py-3 rounded-xl hover:scale-[1.02] transition-transform animate-pulseGlow disabled:opacity-60 disabled:cursor-not-allowed">
                {busy ? "Sending…" : "Send reset code"}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Already have a code?{" "}
                <button type="button" onClick={() => setStage("reset")} className="text-[#7c3aed] font-semibold hover:underline">
                  Enter it here
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={resetPassword} className="space-y-4">
              <Field icon={Mail} label="Email" type="email" value={form.email}
                onChange={v => setForm({ ...form, email: v })} error={errors.email} placeholder="you@example.com" />
              <Field icon={ShieldCheck} label="Reset Code" value={form.code}
                onChange={v => setForm({ ...form, code: v })} error={errors.code} placeholder="••••" />
              <Field icon={Lock} label="New Password" type="password" value={form.password}
                onChange={v => setForm({ ...form, password: v })} error={errors.password} placeholder="••••••••" />
              <Field icon={Lock} label="Confirm New Password" type="password" value={form.password_confirmation}
                onChange={v => setForm({ ...form, password_confirmation: v })} error={errors.password_confirmation} placeholder="••••••••" />

              {message && (
                <div className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{message}</div>
              )}

              <button type="submit" disabled={busy}
                className="w-full gradient-bg text-white font-semibold py-3 rounded-xl hover:scale-[1.02] transition-transform animate-pulseGlow disabled:opacity-60 disabled:cursor-not-allowed">
                {busy ? "Resetting…" : "Reset password"}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Need a new code?{" "}
                <button type="button" onClick={() => setStage("request")} className="text-[#7c3aed] font-semibold hover:underline">
                  Request again
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
