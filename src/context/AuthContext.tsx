import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { Profile, AdminPermission } from "@/lib/types";
import { SUPER_ADMIN_EMAIL } from "@/lib/types";

interface AuthContextValue {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isDemo: boolean;
  userEmail: string;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  adminEmails: string[];
  addAdmin: (email: string) => void;
  removeAdmin: (email: string) => void;
  getAdminPermissions: (email: string) => AdminPermission[];
  setAdminPermissions: (email: string, permissions: AdminPermission[]) => void;
  isSuperAdmin: (email: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const DEMO_KEY = "curio_demo_profile_v1";
const DEMO_EMAIL_KEY = "curio_demo_email_v1";
const ADMIN_EMAIL = "billionboi34@gmail.com";
const ADMIN_PASSWORD = "ThankGod1236";
const ADMIN_LIST_KEY = "curio_admin_list_v1";
const PERMISSIONS_KEY = "curio_admin_permissions_v1";

function getAdminEmails(): string[] {
  try {
    const raw = localStorage.getItem(ADMIN_LIST_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function setAdminEmails(emails: string[]) {
  localStorage.setItem(ADMIN_LIST_KEY, JSON.stringify(emails));
}

function isAdminEmail(email: string): boolean {
  return email === ADMIN_EMAIL || getAdminEmails().includes(email);
}

function loadPermissions(): Record<string, AdminPermission[]> {
  try {
    const raw = localStorage.getItem(PERMISSIONS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function savePermissions(perms: Record<string, AdminPermission[]>) {
  localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(perms));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminEmails, setAdminEmailsState] = useState<string[]>(() => getAdminEmails());
  const [adminPermissions, setAdminPermissionsState] = useState<Record<string, AdminPermission[]>>(() => loadPermissions());
  const [userEmail, setUserEmail] = useState<string>(() => {
    if (!isSupabaseConfigured) {
      try { return localStorage.getItem(DEMO_EMAIL_KEY) ?? ""; } catch { return ""; }
    }
    return "";
  });

  function isSuperAdmin(email: string) {
    return email === SUPER_ADMIN_EMAIL;
  }

  function getAdminPermissions(email: string): AdminPermission[] {
    if (isSuperAdmin(email)) {
      return ["create_courses", "manage_pricing", "manage_admins", "approve_courses", "manage_permissions"];
    }
    return adminPermissions[email] ?? [];
  }

  function setAdminPermissions(email: string, permissions: AdminPermission[]) {
    const updated = { ...adminPermissions, [email]: permissions };
    setAdminPermissionsState(updated);
    savePermissions(updated);
  }

  useEffect(() => {
    if (!isSupabaseConfigured) {
      try {
        const raw = localStorage.getItem(DEMO_KEY);
        if (raw) setProfile(JSON.parse(raw));
      } catch {}
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) {
        setUserEmail(data.session.user.email ?? "");
        void loadProfile(data.session.user.id, data.session.user.email);
      }
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession) {
        setUserEmail(newSession.user.email ?? "");
        void loadProfile(newSession.user.id, newSession.user.email);
      } else {
        setProfile(null);
        setUserEmail("");
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function loadProfile(userId: string, email?: string) {
    const { data } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
    if (data) {
      setProfile({
        id: data.id,
        full_name: data.full_name ?? email ?? "Curio Learner",
        avatar_url: data.avatar_url,
        headline: data.headline,
        is_instructor: data.is_instructor ?? false,
        is_admin: email ? isAdminEmail(email) : false,
      });
    }
  }

  async function signUp(email: string, password: string, fullName: string) {
    if (!isSupabaseConfigured) {
      const isAdmin = isAdminEmail(email);
      setUserEmail(email);
      localStorage.setItem(DEMO_EMAIL_KEY, email);
      const demoProfile: Profile = {
        id: isAdmin ? "admin-user" : "demo-user",
        full_name: isAdmin ? "Admin" : fullName || email.split("@")[0],
        is_instructor: false,
        is_admin: isAdmin,
      };
      localStorage.setItem(DEMO_KEY, JSON.stringify(demoProfile));
      setProfile(demoProfile);
      return { error: null };
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) return { error: error.message };
    if (data.user) {
      await supabase.from("profiles").upsert({ id: data.user.id, full_name: fullName });
    }
    return { error: null };
  }

  async function signIn(email: string, password: string) {
    if (!isSupabaseConfigured) {
      const isSuper = email === SUPER_ADMIN_EMAIL;
      const isAdmin = isSuper
        ? password === ADMIN_PASSWORD
        : isAdminEmail(email);
      setUserEmail(email);
      localStorage.setItem(DEMO_EMAIL_KEY, email);
      const demoProfile: Profile = {
        id: isAdmin ? "admin-user" : "demo-user",
        full_name: isAdmin ? "Admin" : email.split("@")[0],
        is_instructor: false,
        is_admin: isAdmin,
      };
      localStorage.setItem(DEMO_KEY, JSON.stringify(demoProfile));
      setProfile(demoProfile);
      return { error: null };
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  }

  async function signInWithGoogle() {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signInWithOAuth({ provider: "google" });
  }

  async function signOut() {
    if (!isSupabaseConfigured) {
      localStorage.removeItem(DEMO_KEY);
      localStorage.removeItem(DEMO_EMAIL_KEY);
      setProfile(null);
      setUserEmail("");
      return;
    }
    await supabase.auth.signOut();
  }

  function addAdmin(email: string) {
    const updated = [...new Set([...adminEmails, email])];
    setAdminEmails(updated);
    setAdminEmailsState(updated);
  }

  function removeAdmin(email: string) {
    const updated = adminEmails.filter((e) => e !== email);
    setAdminEmails(updated);
    setAdminEmailsState(updated);
  }

  return (
      <AuthContext.Provider
        value={{ session, profile, loading, isDemo: !isSupabaseConfigured, userEmail, signUp, signIn, signInWithGoogle, signOut, adminEmails, addAdmin, removeAdmin, getAdminPermissions, setAdminPermissions, isSuperAdmin }}
      >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
