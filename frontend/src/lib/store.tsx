import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Stream } from "./questions";

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
};

type AppState = {
  user: User | null;
  history: AssessmentResult[];
  signUp: (u: User & { password: string }) => void;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
  updateUser: (patch: Partial<User>) => void;
  addResult: (r: AssessmentResult) => void;
};

const Ctx = createContext<AppState | null>(null);

const LS_USER = "sos_user";
const LS_PASS = "sos_pass_map";
const LS_HIST = "sos_history";

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<AssessmentResult[]>([]);

  useEffect(() => {
    try {
      const u = localStorage.getItem(LS_USER);
      if (u) setUser(JSON.parse(u));
      const h = localStorage.getItem(LS_HIST);
      if (h) setHistory(JSON.parse(h));
    } catch {}
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

  const signUp: AppState["signUp"] = ({ password, ...rest }) => {
    const map = JSON.parse(localStorage.getItem(LS_PASS) || "{}");
    map[rest.email.toLowerCase()] = password;
    localStorage.setItem(LS_PASS, JSON.stringify(map));
    persistUser(rest);
  };

  const signIn: AppState["signIn"] = (email, password) => {
    const map = JSON.parse(localStorage.getItem(LS_PASS) || "{}");
    if (map[email.toLowerCase()] === password) {
      // restore minimal user (name unknown — use email prefix)
      const existing = localStorage.getItem(LS_USER);
      const u: User = existing
        ? JSON.parse(existing)
        : { name: email.split("@")[0], email, track: "Scientific" };
      persistUser(u);
      return true;
    }
    return false;
  };

  const signOut = () => persistUser(null);

  const updateUser: AppState["updateUser"] = (patch) => {
    if (!user) return;
    persistUser({ ...user, ...patch });
  };

  const addResult: AppState["addResult"] = (r) => persistHist([r, ...history]);

  return (
    <Ctx.Provider value={{ user, history, signUp, signIn, signOut, updateUser, addResult }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used within AppProvider");
  return v;
}
