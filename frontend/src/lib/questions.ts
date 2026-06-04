export type Stream = "engineering" | "medical" | "business" | "arts" | "humanities";

export const STREAM_LABELS: Record<Stream, string> = {
  engineering: "Engineering & IT",
  medical: "Medical Sciences",
  business: "Business & Economics",
  arts: "Arts & Design",
  humanities: "Humanities & Languages",
};

export type Option = { id: string; label: string; labelAr?: string; weights: Partial<Record<Stream, number>> };
export type Question = { id: string; text: string; textAr?: string; options: Option[] };

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "Which activity excites you the most?",
    textAr: "أي نشاط يثير حماسك أكثر؟",
    options: [
      { id: "a", label: "Solving a tricky math or logic puzzle", labelAr: "حل لغز رياضي معقد", weights: { engineering: 3, business: 1 } },
      { id: "b", label: "Helping someone recover from illness", labelAr: "مساعدة شخص على الشفاء", weights: { medical: 3, humanities: 1 } },
      { id: "c", label: "Designing a poster or short film", labelAr: "تصميم بوستر أو فيلم قصير", weights: { arts: 3, humanities: 1 } },
      { id: "d", label: "Debating ideas, history or languages", labelAr: "النقاش في الأفكار واللغات", weights: { humanities: 3, business: 1 } },
    ],
  },
  {
    id: "q2",
    text: "Pick a subject you genuinely enjoy.",
    textAr: "اختر المادة التي تستمتع بها فعلاً.",
    options: [
      { id: "a", label: "Physics & Mathematics", weights: { engineering: 3 } },
      { id: "b", label: "Biology & Chemistry", weights: { medical: 3 } },
      { id: "c", label: "Economics & Accounting", weights: { business: 3 } },
      { id: "d", label: "Literature & Art", weights: { arts: 2, humanities: 2 } },
    ],
  },
  {
    id: "q3",
    text: "Your friends would describe you as…",
    textAr: "أصدقاؤك يصفونك بأنك...",
    options: [
      { id: "a", label: "Analytical and curious", weights: { engineering: 2, medical: 1, business: 1 } },
      { id: "b", label: "Caring and empathetic", weights: { medical: 3, humanities: 1 } },
      { id: "c", label: "Creative and expressive", weights: { arts: 3 } },
      { id: "d", label: "Strategic and persuasive", weights: { business: 3, humanities: 1 } },
    ],
  },
  {
    id: "q4",
    text: "Where do you see yourself working?",
    textAr: "أين ترى نفسك تعمل؟",
    options: [
      { id: "a", label: "A tech lab or startup", weights: { engineering: 3, business: 1 } },
      { id: "b", label: "A hospital or research clinic", weights: { medical: 3 } },
      { id: "c", label: "A creative studio or gallery", weights: { arts: 3 } },
      { id: "d", label: "A corporate boardroom", weights: { business: 3 } },
      { id: "e" as string, label: "A school, embassy, or newsroom", weights: { humanities: 3 } },
    ],
  },
  {
    id: "q5",
    text: "Which skill do you want to master?",
    textAr: "أي مهارة ترغب بإتقانها؟",
    options: [
      { id: "a", label: "Building software & systems", weights: { engineering: 3 } },
      { id: "b", label: "Diagnosing & healing", weights: { medical: 3 } },
      { id: "c", label: "Leading teams & investing", weights: { business: 3 } },
      { id: "d", label: "Visual storytelling", weights: { arts: 3 } },
      { id: "e" as string, label: "Languages & cultural research", weights: { humanities: 3 } },
    ],
  },
  {
    id: "q6",
    text: "Pick a tool you'd love to use daily.",
    textAr: "اختر أداة تحب استخدامها يومياً.",
    options: [
      { id: "a", label: "A laptop & code editor", weights: { engineering: 3 } },
      { id: "b", label: "A stethoscope & microscope", weights: { medical: 3 } },
      { id: "c", label: "A spreadsheet & market terminal", weights: { business: 3 } },
      { id: "d", label: "A camera & sketchbook", weights: { arts: 3 } },
    ],
  },
];

export const FACULTY_MAP: Record<Stream, string[]> = {
  engineering: ["Computer Engineering", "Software Engineering", "Electrical Engineering", "Information Technology"],
  medical: ["Human Medicine", "Pharmacy", "Dentistry", "Nursing"],
  business: ["Business Administration", "Economics", "Accounting", "Marketing"],
  arts: ["Architecture", "Fine Arts", "Graphic Design", "Media Production"],
  humanities: ["Law", "Languages & Translation", "History", "Journalism"],
};

export function scoreAnswers(answers: Record<string, string>): Record<Stream, number> {
  const totals: Record<Stream, number> = {
    engineering: 0, medical: 0, business: 0, arts: 0, humanities: 0,
  };
  for (const q of QUESTIONS) {
    const ansId = answers[q.id];
    const opt = q.options.find(o => o.id === ansId);
    if (!opt) continue;
    for (const [k, v] of Object.entries(opt.weights)) {
      totals[k as Stream] += v ?? 0;
    }
  }
  // Normalize to percentages
  const max = Math.max(...Object.values(totals), 1);
  const norm = {} as Record<Stream, number>;
  (Object.keys(totals) as Stream[]).forEach(k => {
    norm[k] = Math.round((totals[k] / max) * 100);
  });
  return norm;
}
