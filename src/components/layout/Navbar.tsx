import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, LogOut, LayoutDashboard, Shield } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { items } = useCart();
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate(query ? `/marketplace?q=${encodeURIComponent(query)}` : "/marketplace");
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 px-3 py-2 sm:px-5">
      <div className="glass-panel mx-auto flex h-16 max-w-7xl items-center gap-3 rounded-full px-4 sm:h-18 sm:px-6 lg:px-7">
        <Link to="/" aria-label="Curio home" className="flex shrink-0 items-center">
          <Logo className="h-14 sm:h-16 lg:h-20" />
        </Link>

        <form onSubmit={handleSearch} className="relative hidden flex-1 max-w-xl md:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cool-400" size={17} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            placeholder="Search for anything you're curious about"
            className="w-full rounded-full border border-white/70 bg-white/55 py-2.5 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-cool-400 focus:border-mint-300 focus:bg-white/80 focus:shadow-glow"
          />
        </form>

        <nav className="ml-auto hidden items-center gap-2 rounded-full border border-white/50 bg-white/35 p-1 text-sm font-semibold text-cool-700 md:flex">
          <Link to="/about" className="rounded-full px-4 py-2 transition hover:bg-white/75 hover:text-mint-600">
            About
          </Link>
          <Link to="/marketplace" className="rounded-full px-4 py-2 transition hover:bg-white/75 hover:text-mint-600">
            View courses
          </Link>
          <Link to="/publish" className="rounded-full px-4 py-2 transition hover:bg-white/75 hover:text-mint-600">
            Publish on Curio
          </Link>
        </nav>

        <Link
          to="/cart"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/45 text-ink transition hover:bg-white/80 hover:text-mint-600"
          aria-label="Cart"
        >
          <ShoppingCart size={20} />
          {profile && items.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-mint-500 text-[11px] font-bold text-ink">
              {items.length}
            </span>
          )}
        </Link>

        {profile ? (
          <div className="relative hidden md:block">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-mint-500 font-display font-bold text-ink shadow-glow"
            >
              {profile.full_name.charAt(0).toUpperCase()}
            </button>
            {menuOpen && (
              <div
                className="glass-panel absolute right-0 top-12 w-52 overflow-hidden rounded-2xl py-1"
                onMouseLeave={() => setMenuOpen(false)}
              >
                <div className="border-b border-cool-100 px-4 py-2.5">
                  <p className="truncate text-sm font-semibold text-ink">{profile.full_name}</p>
                </div>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-cool-700 hover:bg-cool-50"
                  onClick={() => setMenuOpen(false)}
                >
                  <LayoutDashboard size={15} /> My Learning
                </Link>
                {profile.is_admin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-cool-700 hover:bg-cool-50"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Shield size={15} /> Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    void signOut();
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-cool-700 hover:bg-cool-50"
                >
                  <LogOut size={15} /> Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/login"
              className="rounded-full px-4 py-2 text-sm font-semibold text-ink transition hover:bg-[#10CDB2] hover:text-white"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-[#10CDB2]"
            >
              Sign up
            </Link>
          </div>
        )}

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/50 text-ink md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="glass-panel mx-3 mt-2 rounded-3xl px-4 py-4 md:hidden">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cool-400" size={17} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search courses"
              className="w-full rounded-full border border-white/70 bg-white/65 py-2.5 pl-10 pr-4 text-sm outline-none"
            />
          </form>
          <div className="flex flex-col gap-1 text-sm font-medium text-cool-700">
            <Link to="/about" className="rounded-lg px-2 py-2.5 hover:bg-cool-50" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <Link to="/marketplace" className="rounded-lg px-2 py-2.5 hover:bg-cool-50" onClick={() => setMobileOpen(false)}>
              View courses
            </Link>
            {profile ? (
              <>
                <Link to="/dashboard" className="rounded-lg px-2 py-2.5 hover:bg-cool-50" onClick={() => setMobileOpen(false)}>
                  My Learning
                </Link>
                {profile.is_admin && (
                  <Link to="/admin" className="rounded-lg px-2 py-2.5 hover:bg-cool-50" onClick={() => setMobileOpen(false)}>
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    void signOut();
                    setMobileOpen(false);
                  }}
                  className="rounded-lg px-2 py-2.5 text-left hover:bg-cool-50"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="rounded-lg px-2 py-2.5 hover:bg-cool-50" onClick={() => setMobileOpen(false)}>
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="rounded-lg bg-ink px-2 py-2.5 text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
