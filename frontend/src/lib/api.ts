// Thin fetch-based API client for the Student-Opportunity backend.
// Mirrors the endpoints defined in the Student-Opportunity Postman collection 1:1.

const BASE_URL =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_API_BASE_URL) ||
  "http://localhost:8000/api";

const TOKEN_KEY = "sos_token";

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {}
}

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;
  body?: unknown;

  constructor(message: string, status: number, errors?: Record<string, string[]>, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
    this.body = body;
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  auth?: boolean; // attach bearer token if present
};

async function request<T = any>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = false } = opts;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (body !== undefined) headers["Content-Type"] = "application/json";

  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    throw new ApiError("Network error — could not reach the server.", 0);
  }

  const text = await res.text();
  let data: any = undefined;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `Request failed with status ${res.status}`;
    throw new ApiError(message, res.status, data?.errors, data);
  }

  // The backend wraps successful responses in an envelope:
  // { status: true, message: "...", data: { ...actual payload... } }
  // Unwrap it so callers always work with the real payload directly.
  if (data && typeof data === "object" && !Array.isArray(data) && "data" in data) {
    return data.data as T;
  }

  return data as T;
}

// ---------- Types ----------

export type Track = "Scientific" | "Literary";

export type ApiUser = {
  name: string;
  email: string;
  track: Track;
  avatar?: string;
  [key: string]: unknown;
};

export type AuthResponse = {
  user?: ApiUser;
  token?: string;
  access_token?: string;
  [key: string]: unknown;
};

export type Stream = "engineering" | "medical" | "business" | "arts" | "humanities";

export type ApiQuestionOption = {
  id: string;
  label: string;
  labelAr?: string;
};

export type ApiQuestion = {
  id: string;
  text: string;
  textAr?: string;
  options: ApiQuestionOption[];
};

export type SubmitAssessmentResponse = {
  id: string;
  date: string;
  topStream: Stream;
  scores: Record<Stream, number>;
  recommendedFaculties: string[];
};

export type HistoryEntry = {
  id: string;
  date: string;
  topStream: Stream;
  matchPercentage: number;
};

// ---------- Auth ----------

export function signup(payload: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  track: Track;
}) {
  return request<AuthResponse>("/auth/signup", { method: "POST", body: payload });
}

export function signin(payload: { email: string; password: string }) {
  // The backend's validation expects `identifier`, not `email`
  // (despite the Postman collection's sample body using `email`).
  return request<AuthResponse>("/auth/signin", {
    method: "POST",
    body: { identifier: payload.email, password: payload.password },
  });
}

export function sendOtp(payload: { email: string }) {
  return request("/auth/send-otp", { method: "POST", body: payload });
}

export function resendOtp(payload: { email: string }) {
  return request("/auth/resend-otp", { method: "POST", body: payload });
}

export function verifyOtp(payload: { email: string; code: string }) {
  return request("/auth/verify-otp", { method: "POST", body: payload });
}

export function forgetPassword(payload: { email: string }) {
  return request("/auth/forget-password", { method: "POST", body: payload });
}

export function resetPassword(payload: {
  email: string;
  code: string;
  password: string;
  password_confirmation: string;
}) {
  return request("/auth/reset-password", { method: "POST", body: payload });
}

export function logout() {
  return request("/auth/logout", { method: "POST", auth: true });
}

// ---------- Profile ----------

export function getProfile() {
  return request<{ user?: ApiUser } & ApiUser>("/profile", { method: "GET", auth: true });
}

export function updateProfile(payload: {
  name?: string;
  track?: Track;
  password?: string;
}) {
  return request<{ user?: ApiUser } & ApiUser>("/profile", {
    method: "PUT",
    body: payload,
    auth: true,
  });
}

// ---------- Assessment ----------

export function getQuestions() {
  return request<ApiQuestion[]>("/assessment/questions", {
    method: "GET",
    auth: true,
  });
}

export function submitAssessment(payload: { answers: Record<string, string> }) {
  return request<SubmitAssessmentResponse>("/assessment/submit", {
    method: "POST",
    body: payload,
    auth: true,
  });
}

export function getAssessmentHistory() {
  return request<HistoryEntry[]>("/profile/history", {
    method: "GET",
    auth: true,
  });
}