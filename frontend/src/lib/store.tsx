import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Stream } from "./questions";
import * as api from "./api";
import { ApiError, getToken, setToken } from "./api";

export type User = {
  name: string;
  email: string;
  track: "Scientific" | "Literary";
  avatar?: string;
};

export type AssessmentResult = {
  id: string;
  date: string;
  scores: Record<Stream, number>;
  topStream: Stream;
  recommendedFaculties?: string[];
};

type AppState = {
  user: User | null;
  history: AssessmentResult[];
  loading: boolean;
  signUp: (u: User & { password: string }) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  updateUser: (patch: Partial<User> & { password?: string }) => Promise<boolean>;
  addResult: (r: AssessmentResult) => void;
  submitAssessment: (answers: Record<string, string>) => Promise<AssessmentResult | null>;
  authError: string;
  setAuthError: (msg: string) => void;
};

const Ctx = createContext<AppState | null>(null);

const LS_USER = "sos_user";
const LS_HIST = "sos_history";

function normalizeUser(raw: any, fallback?: Partial<User>): User {
  const u = raw?.user ?? raw ?? {};
  return {
    name: u.name ?? fallback?.name ?? "",
    email: u.email ?? fallback?.email ?? "",
    track: (u.track ?? fallback?.track ?? "Scientific") as User["track"],
    avatar: u.avatar ?? fallback?.avatar,
  };
}

function extractToken(raw: any): string | null {
  return raw?.token ?? raw?.access_token ?? raw?.data?.token ?? null;
}

function extractErrorMessage(err: unknown, fallback: string): string {
  if (err instanceof ApiError) {
    if (err.errors) {
      const first = Object.values(err.errors)[0];
      if (Array.isArray(first) && first.length) return first[0];
    }
    if (err.message) return err.message;
  }
  return fallback;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<AssessmentResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    try {
      const h = localStorage.getItem(LS_HIST);
      if (h) setHistory(JSON.parse(h));
    } catch {}

    // If a token already exists from a previous session, try to restore the
    // profile from the backend so refreshes don't lose the session.
    (async () => {
      const token = getToken();
      if (!token) {
        try {
          const u = localStorage.getItem(LS_USER);
          if (u) setUser(JSON.parse(u));
        } catch {}
        return;
      }
      try {
        const res = await api.getProfile();
        const u = normalizeUser(res);
        setUser(u);
        localStorage.setItem(LS_USER, JSON.stringify(u));
      } catch {
        // token invalid/expired — clear session
        setToken(null);
        setUser(null);
        localStorage.removeItem(LS_USER);
        return;
      }

      // Session restored — pull the real assessment history from the backend.
      try {
        const entries = await api.getAssessmentHistory();
        const mapped: AssessmentResult[] = entries.map(e => ({
          id: e.id,
          date: e.date,
          topStream: e.topStream,
          scores: { [e.topStream]: e.matchPercentage } as Record<Stream, number>,
        }));
        persistHist(mapped);
      } catch {
        // keep whatever was cached locally if the history fetch fails
      }
    })();
  }, []);

  const persistUser = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem(LS_USER, JSON.stringify(u));
    else localStorage.removeItem(LS_USER);
  };

  const persistHist = (h: AssessmentResult[]) => {
    setHistory(h);
    localStorage.setItem(LS_HIST, JSON.stringify(h));
  };

  const signUp: AppState["signUp"] = async ({ password, ...rest }) => {
    setAuthError("");
    setLoading(true);
    try {
      const res = await api.signup({
        name: rest.name,
        email: rest.email,
        password,
        password_confirmation: password,
        track: rest.track,
      });
      const token = extractToken(res);
      if (token) setToken(token);
      const u = normalizeUser(res, rest);
      persistUser(u);
      return true;
    } catch (err) {
      setAuthError(extractErrorMessage(err, "Could not create account. Please try again."));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signIn: AppState["signIn"] = async (email, password) => {
    setAuthError("");
    setLoading(true);
    try {
      const res = await api.signin({ email, password });
      const token = extractToken(res);
      if (token) setToken(token);
      const u = normalizeUser(res, { email });
      persistUser(u);
      return true;
    } catch (err) {
      setAuthError(extractErrorMessage(err, "Invalid email or password. Try signing up first."));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    // Fire and forget — we clear local session regardless of API result.
    api.logout().catch(() => {});
    setToken(null);
    persistUser(null);
  };

  const updateUser: AppState["updateUser"] = async (patch) => {
    if (!user) return false;

    // The backend's Update Profile endpoint only accepts name/track/password.
    // `avatar` (used for the local file-preview in profile.tsx) has no API
    // counterpart in the collection, so it's applied locally only.
    const hasApiFields = patch.name !== undefined || patch.track !== undefined || patch.password !== undefined;
    if (!hasApiFields) {
      persistUser({ ...user, ...patch });
      return true;
    }

    setAuthError("");
    setLoading(true);
    try {
      const res = await api.updateProfile({
        name: patch.name,
        track: patch.track,
        password: patch.password,
      });
      const u = normalizeUser(res, { ...user, ...patch });
      persistUser(u);
      return true;
    } catch (err) {
      setAuthError(extractErrorMessage(err, "Could not update profile. Please try again."));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addResult: AppState["addResult"] = (r) => persistHist([r, ...history]);

  const submitAssessment: AppState["submitAssessment"] = async (answers) => {
    try {
      const res = await api.submitAssessment({ answers });
      const result: AssessmentResult = {
        id: res.id,
        date: res.date,
        topStream: res.topStream,
        scores: res.scores,
        recommendedFaculties: res.recommendedFaculties,
      };
      addResult(result);
      return result;
    } catch (err) {
      setAuthError(extractErrorMessage(err, "Could not submit your assessment. Please try again."));
      return null;
    }
  };

  return (
    <Ctx.Provider
      value={{ user, history, loading, signUp, signIn, signOut, updateUser, addResult, submitAssessment, authError, setAuthError }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used within AppProvider");
  return v;
}