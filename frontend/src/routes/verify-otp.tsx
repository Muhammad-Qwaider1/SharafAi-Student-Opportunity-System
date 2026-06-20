import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Field } from "./signin";
import { ShieldCheck, ArrowLeft, Mail } from "lucide-react";
import * as api from "@/lib/api";

const searchSchema = z.object({
  email: z.string().optional(),
});

export const Route = createFileRoute("/verify-otp")({
  component: VerifyOtp,
  validateSearch: searchSchema,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  code: z.string().trim().min(4, "Enter the code sent to your email").max(10),
});

function VerifyOtp() {
  const nav = useNavigate();
  const search = useSearch({ from: "/verify-otp" });
  const [form, setForm] = useState({ email: search.email ?? "", code: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "verifying" | "verified">("idle");
  const [message, setMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const sendCode = async () => {
    setMessage("");
    const r = z.string().trim().email().safeParse(form.email);
    if (!r.success) {
      setErrors({ ...errors, email: "Enter a valid email first" });
      return;
    }
    setStatus("sending");
    try {
      await api.sendOtp({ email: form.email.trim() });
      setMessage("A verification code has been sent to your email.");
      setCooldown(30);
    } catch (err) {
      setMessage(
        err instanceof api.ApiError ? err.message : "Could not send the code. Please try again."
      );
    } finally {
      setStatus("idle");
    }
  };

  const resendCode = async () => {
    setMessage("");
    setStatus("sending");
    try {
      await api.resendOtp({ email: form.email.trim() });
      setMessage("A new verification code has been sent to your email.");
      setCooldown(30);
    } catch (err) {
      setMessage(
        err instanceof api.ApiError ? err.message : "Could not resend the code. Please try again."
      );
    } finally {
      setStatus("idle");
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("verifying");
    try {
      await api.verifyOtp({ email: form.email.trim(), code: form.code.trim() });
      setStatus("verified");
      setMessage("Your email has been verified.");
      setTimeout(() => nav({ to: "/dashboard" }), 1200);
    } catch (err) {
      setMessage(
        err instanceof api.ApiError ? err.message : "Invalid or expired code. Please try again."
      );
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full fade-up">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to dashboard
        </Link>
        <div className="glass rounded-3xl p-8 ring-gradient">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl gradient-bg mx-auto mb-3 flex items-center justify-center shadow-lg shadow-purple-500/40">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">Verify your email</h1>
            <p className="text-sm text-muted-foreground">Enter the code we sent to your inbox.</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <Field icon={Mail} label="Email" type="email" value={form.email}
              onChange={v => setForm({ ...form, email: v })} error={errors.email} placeholder="you@example.com" />
            <Field icon={ShieldCheck} label="Verification Code" value={form.code}
              onChange={v => setForm({ ...form, code: v })} error={errors.code} placeholder="••••" />

            {message && (
              <div className={`text-sm rounded-lg px-3 py-2 border ${
                status === "verified"
                  ? "text-emerald-600 bg-emerald-50 border-emerald-200"
                  : "text-red-500 bg-red-50 border-red-200"
              }`}>
                {message}
              </div>
            )}

            <button type="submit" disabled={status === "verifying" || status === "verified"}
              className="w-full gradient-bg text-white font-semibold py-3 rounded-xl hover:scale-[1.02] transition-transform animate-pulseGlow disabled:opacity-60 disabled:cursor-not-allowed">
              {status === "verifying" ? "Verifying…" : status === "verified" ? "Verified!" : "Verify Code"}
            </button>
          </form>

          <div className="flex items-center justify-between mt-6 text-sm">
            <button onClick={sendCode} disabled={status === "sending" || cooldown > 0}
              className="text-[#7c3aed] font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline">
              Send code
            </button>
            <button onClick={resendCode} disabled={status === "sending" || cooldown > 0}
              className="text-[#7c3aed] font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline">
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
