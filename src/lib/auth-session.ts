export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: "student" | "owner";
  program?: string;
  studentId?: string;
  phone?: string;
  avatar?: string;
  gyms?: Array<{ id: number; name: string; slug: string }>;
};

const SESSION_COOKIE_NAME = "fitfinder_session";

export function setSession(user: AuthUser) {
  if (typeof window === "undefined") return;
  const userJson = JSON.stringify(user);
  const encoded = encodeURIComponent(userJson);
  // Set cookie for 7 days
  document.cookie = `${SESSION_COOKIE_NAME}=${encoded}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
  window.localStorage.setItem(SESSION_COOKIE_NAME, userJson);
}

export function getSession(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const cookieMatch = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${SESSION_COOKIE_NAME}=`));
  if (cookieMatch) {
    try {
      const value = decodeURIComponent(cookieMatch.split("=")[1]);
      return JSON.parse(value) as AuthUser;
    } catch {
      // Fallback to localStorage
    }
  }

  const stored = window.localStorage.getItem(SESSION_COOKIE_NAME);
  if (stored) {
    try {
      return JSON.parse(stored) as AuthUser;
    } catch {
      return null;
    }
  }

  return null;
}

export function clearSession() {
  if (typeof window === "undefined") return;
  document.cookie = `${SESSION_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
  window.localStorage.removeItem(SESSION_COOKIE_NAME);
}
