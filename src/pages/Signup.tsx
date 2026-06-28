import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { useAuth } from "@/context/AuthContext";

export function Signup() {
  const { signUp, isDemo } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    setLoading(false);
    if (error) setError(error);
    else navigate("/dashboard");
  }

  return (
    <div className="flex h-screen">
      <Reveal variant="liquidGlass" duration={800} className="relative hidden flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-[#10CDB2] via-[#0BA391] to-[#0891b2] lg:flex">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full border-[3px] border-white/10" />
        <div className="absolute -bottom-16 -right-16 h-96 w-96 rounded-full border-[3px] border-white/10" />
        <div className="absolute left-1/3 top-1/4 h-48 w-48 rounded-full border-2 border-white/8" />
        <div className="absolute bottom-1/4 right-1/4 h-36 w-36 rounded-full border-2 border-white/8" />
        <div className="absolute left-1/4 top-1/2 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-1/3 bottom-1/3 h-52 w-52 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute left-[15%] top-[10%] h-4 w-4 rounded-full bg-white/20" />
        <div className="absolute right-[20%] top-[30%] h-3 w-3 rounded-full bg-white/20" />
        <div className="absolute left-[30%] bottom-[15%] h-5 w-5 rounded-full bg-white/15" />
        <div className="absolute right-[25%] bottom-[25%] h-2 w-2 rounded-full bg-white/20" />
        <div className="absolute left-[45%] top-[60%] h-3 w-3 rounded-full bg-white/15" />
        <div className="absolute left-[60%] top-[15%] h-2 w-2 rounded-full bg-white/20" />
        <div className="relative z-10 max-w-md px-8 text-white">
          <h2 className="font-display text-4xl font-bold leading-tight">
            Start Learning with <span className="text-white/90">Curio</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            Create your free account and unlock thousands of courses from every major provider. Your next skill is one click away.
          </p>
        </div>
      </Reveal>

      <Reveal variant="fadeUp" duration={600} delay={120} className="flex flex-1 items-center justify-center overflow-y-auto bg-white px-6">
        <div className="w-full max-w-sm py-6">
          <Link to="/" className="mb-1 flex justify-center">
            <Logo className="h-10" />
          </Link>
          <h1 className="text-center font-display text-xl font-bold text-ink">Create your account</h1>
          <p className="mt-1 text-center text-sm text-cool-500">Start comparing courses from every provider.</p>

          {isDemo && (
            <p className="mt-3 rounded-xl bg-mint-50 px-3 py-2 text-xs text-mint-800">
              Demo mode: this creates a local profile only. Connect Supabase for real accounts.
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <label className="text-xs font-semibold text-cool-700">Full name</label>
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-cool-100 px-4 py-2 text-sm outline-none transition-all focus:border-[#10CDB2] focus:shadow-[0_0_0_3px_rgba(16,205,178,0.12)]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-cool-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-cool-100 px-4 py-2 text-sm outline-none transition-all focus:border-[#10CDB2] focus:shadow-[0_0_0_3px_rgba(16,205,178,0.12)]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-cool-700">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-cool-100 px-4 py-2 text-sm outline-none transition-all focus:border-[#10CDB2] focus:shadow-[0_0_0_3px_rgba(16,205,178,0.12)]"
              />
              <p className="mt-1 text-xs text-cool-400">At least 6 characters.</p>
            </div>
            {error && <p className="text-xs font-medium text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#10CDB2] py-3 text-sm font-semibold text-white transition hover:bg-[#0BA391] disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-cool-100" />
            <span className="text-xs text-cool-400">or</span>
            <div className="h-px flex-1 bg-cool-100" />
          </div>

          <button
            onClick={() => {}}
            className="mt-4 flex w-full items-center justify-center gap-3 rounded-full border border-cool-100 py-3 text-sm font-medium text-ink transition hover:border-[#10CDB2] hover:bg-mint-50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign up with Google
          </button>

          <p className="mt-4 text-center text-sm text-cool-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#10CDB2] hover:text-[#0BA391]">
              Log in
            </Link>
          </p>
        </div>
      </Reveal>
    </div>
  );
}
