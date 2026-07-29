import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Star, Menu, X, LogOut, LayoutDashboard, Shield } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useCourses } from "@/context/CourseContext";

export function Navbar() {
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileSuggestOpen, setMobileSuggestOpen] = useState(false);
  const { wishlist } = useWishlist();
  const { profile, signOut } = useAuth();
  const { courses } = useCourses();
  const navigate = useNavigate();
  const desktopRef = useRef<HTMLFormElement>(null);
  const mobileRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const suggestions = query.trim().length > 0
    ? courses
        .filter(
          (c) =>
            c.title.toLowerCase().includes(query.toLowerCase()) ||
            c.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
            c.category.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 6)
    : [];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (desktopRef.current && !desktopRef.current.contains(e.target as Node)) {
        setDesktopOpen(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setMobileSuggestOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setDesktopOpen(false);
    setMobileSuggestOpen(false);
    navigate(query.trim() ? `/marketplace?q=${encodeURIComponent(query.trim())}` : "/marketplace");
    setMobileOpen(false);
  }

  function selectSuggestion(title: string) {
    setQuery(title);
    setDesktopOpen(false);
    setMobileSuggestOpen(false);
    navigate(`/marketplace?q=${encodeURIComponent(title)}`);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 px-1 py-1.5 sm:px-3 sm:py-2 lg:px-5">
      <div className="glass-panel mx-auto flex h-12 max-w-7xl items-center gap-0.5 rounded-full px-2 sm:h-14 sm:gap-1.5 sm:px-3 md:h-16 md:gap-3 lg:h-18 lg:px-7">
        <Link to="/" aria-label="Curio home" className="flex shrink-0 items-center">
          <Logo className="h-9 sm:h-11 md:h-14 lg:h-20" />
        </Link>

        <form onSubmit={handleSearch} className="relative hidden flex-1 max-w-xl sm:block" ref={desktopRef}>
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cool-400" size={17} />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setDesktopOpen(true);
            }}
            onFocus={() => query.trim().length > 0 && setDesktopOpen(true)}
            type="search"
            placeholder="Search for anything you're curious about"
            className="w-full rounded-full border border-white/70 bg-white/55 py-2 pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-cool-400 focus:border-mint-300 focus:bg-white/80 focus:shadow-glow md:py-2.5"
          />
          {desktopOpen && suggestions.length > 0 && (
            <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-2xl border border-cool-100 bg-white shadow-xl">
              {suggestions.map((c) => (
                <button
                  key={c.id}
                  onClick={() => selectSuggestion(c.title)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-cool-50"
                >
                  <Search size={14} className="shrink-0 text-cool-400" />
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink">{c.title}</p>
                    <p className="truncate text-xs text-cool-400">{c.category.name} · {c.instructor.name}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </form>

        <nav className="ml-auto flex items-center gap-px rounded-full border border-white/50 bg-white/35 p-0.5 text-[10px] font-semibold text-cool-700 sm:gap-1 sm:p-1 sm:text-xs md:text-sm">
          <Link to="/marketplace" className="rounded-full px-2 py-1 transition hover:bg-white/75 hover:text-mint-600 sm:px-3 sm:py-1.5 md:px-4 md:py-2">
            Courses
          </Link>
          <Link to="/publish" className="rounded-full px-2 py-1 transition hover:bg-white/75 hover:text-mint-600 sm:px-3 sm:py-1.5 md:px-4 md:py-2">
            Publish
          </Link>
        </nav>

        {profile && (
          <Link
            to="/wishlist"
            className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-white/45 text-ink transition hover:bg-white/80 hover:text-mint-600 sm:h-9 sm:w-9 md:h-10 md:w-10"
            aria-label="Wishlist"
          >
            <Star size={16} className={wishlist.length > 0 ? "fill-[#10CDB2] text-[#10CDB2]" : "sm:size-[20px]"} />
            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#10CDB2] text-[9px] font-bold text-ink sm:h-5 sm:w-5 sm:text-[11px]">
                {wishlist.length}
              </span>
            )}
          </Link>
        )}

        {profile ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-mint-500 font-display text-xs font-bold text-ink shadow-glow sm:h-9 sm:w-9 md:h-10 md:w-10 md:text-sm"
            >
              {profile.full_name.charAt(0).toUpperCase()}
            </button>
            {menuOpen && (
              <div
                className="glass-panel absolute right-0 top-11 z-50 w-48 overflow-hidden rounded-2xl py-1 sm:w-52"
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
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/login"
              className="rounded-full px-2 py-1 text-[10px] font-semibold text-ink transition hover:bg-[#10CDB2] hover:text-white sm:px-3 sm:py-1.5 sm:text-xs md:px-4 md:py-2 md:text-sm"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-ink px-2 py-1 text-[10px] font-semibold text-white shadow-glow transition hover:bg-[#10CDB2] sm:px-3 sm:py-1.5 sm:text-xs md:px-4 md:py-2 md:text-sm"
            >
              Sign up
            </Link>
          </div>
        )}

        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-white/50 text-ink sm:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 sm:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        </div>
      )}

      {mobileOpen && (
        <div className="glass-panel relative z-50 mx-1 mt-2 rounded-3xl px-3 py-3 sm:hidden">
          <form onSubmit={handleSearch} className="relative mb-4" ref={mobileRef}>
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cool-400" size={17} />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setMobileSuggestOpen(true);
              }}
              onFocus={() => query.trim().length > 0 && setMobileSuggestOpen(true)}
              type="search"
              placeholder="Search courses"
              className="w-full rounded-full border border-white/70 bg-white/65 py-2.5 pl-10 pr-4 text-sm outline-none"
            />
            {mobileSuggestOpen && suggestions.length > 0 && (
              <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-2xl border border-cool-100 bg-white shadow-xl">
                {suggestions.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => selectSuggestion(c.title)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-cool-50"
                  >
                    <Search size={14} className="shrink-0 text-cool-400" />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-ink">{c.title}</p>
                      <p className="truncate text-xs text-cool-400">{c.category.name} · {c.instructor.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </form>
          <div className="flex flex-col gap-1 text-sm font-medium text-cool-700">
            <Link to="/marketplace" className="rounded-lg px-2 py-2.5 hover:bg-cool-50" onClick={() => setMobileOpen(false)}>
              Browse all courses
            </Link>
            <Link to="/publish" className="rounded-lg px-2 py-2.5 hover:bg-cool-50" onClick={() => setMobileOpen(false)}>
              Publish on Curio
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
