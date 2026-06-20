import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { RequireAuth } from "@/components/RequireAuth";
import { useApp } from "@/lib/store";
import { QUESTIONS, scoreAnswers, type Question, type Stream } from "@/lib/questions";
import * as api from "@/lib/api";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/assessment")({
  component: () => <RequireAuth><AppShell><Assessment /></AppShell></RequireAuth>,
});

function Assessment() {
  const { addResult, submitAssessment } = useApp();
  const nav = useNavigate();
  const [questions, setQuestions] = useState<Question[]>(QUESTIONS);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [transitionKey, setTransitionKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.getQuestions()
      .then(res => {
        if (Array.isArray(res) && res.length > 0 && res.every(q => q.id && q.text && Array.isArray(q.options))) {
          setQuestions(res as unknown as Question[]);
        }
      })
      .catch(() => {
        // backend unreachable/failed — keep the local question bank already in state
      });
  }, []);

  const q = questions[step];
  const total = questions.length;
  const progress = Math.round((step / total) * 100);
  const isLast = step === total - 1;
  const selected = answers[q.id];

  const go = (delta: number) => {
    const next = step + delta;
    if (next < 0 || next >= total) return;
    setStep(next);
    setTransitionKey(k => k + 1);
  };

  const finish = async () => {
    setSubmitting(true);
    const result = await submitAssessment(answers);
    if (!result) {
      // Backend unreachable/failed — fall back to local scoring so the
      // user still gets a result instead of being stuck.
      const scores = scoreAnswers(answers);
      const topStream = (Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]) as Stream;
      addResult({
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        scores,
        topStream,
      });
    }
    setSubmitting(false);
    nav({ to: "/results" });
  };

  return (
    <div className="max-w-3xl mx-auto fade-up">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-2">
          <span>Question {step + 1} of {total}</span>
          <span className="gradient-text">{progress}% complete</span>
        </div>
        <div className="h-2 rounded-full bg-white/60 overflow-hidden glass">
          <div className="h-full gradient-bg transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div key={transitionKey} className="glass rounded-3xl p-6 sm:p-10 fade-up">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">{q.text}</h2>
        {q.textAr && <p dir="rtl" className="text-sm text-muted-foreground mb-6">{q.textAr}</p>}

        <div className="space-y-3 mb-8">
          {q.options.map((opt, i) => {
            const active = selected === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setAnswers({ ...answers, [q.id]: opt.id })}
                className={`group w-full text-left flex items-center gap-4 p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 ${
                  active
                    ? "border-transparent gradient-bg text-white scale-[1.02] shadow-xl shadow-purple-500/40"
                    : "border-white/60 bg-white/50 hover:border-[#7c3aed]/40 hover:bg-white/80 hover:scale-[1.01]"
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  active ? "bg-white/30 text-white" : "bg-[#7c3aed]/10 text-[#7c3aed] group-hover:bg-[#7c3aed]/20"
                }`}>
                  {active ? <Check className="w-4 h-4" /> : String.fromCharCode(65 + i)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{opt.label}</div>
                  {opt.labelAr && (
                    <div dir="rtl" className={`text-xs mt-0.5 ${active ? "text-white/80" : "text-muted-foreground"}`}>
                      {opt.labelAr}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => go(-1)}
            disabled={step === 0}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {!isLast ? (
            <button
              onClick={() => go(1)}
              disabled={!selected}
              className="inline-flex items-center gap-2 gradient-bg text-white font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-purple-500/40 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={finish}
              disabled={!selected || submitting}
              className="inline-flex items-center gap-2 gradient-bg text-white font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-pink-500/40 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform animate-pulseGlow"
            >
              {submitting ? "Scoring…" : "See Results"} <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}