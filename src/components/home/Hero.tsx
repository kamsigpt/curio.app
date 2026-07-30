import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import heroBg from "@/assets/hero/hero-bg.jpg";
import heroPerson from "@/assets/hero/hero-person.png";
import { useCourses } from "@/context/CourseContext";

export function Hero() {
  const navigate = useNavigate();
  const { courses } = useCourses();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    navigate(query.trim() ? `/marketplace?q=${encodeURIComponent(query.trim())}` : "/marketplace");
  }

  function selectSuggestion(title: string) {
    setQuery(title);
    setOpen(false);
    navigate(`/marketplace?q=${encodeURIComponent(title)}`);
  }

  return (
    <section className="relative min-h-[520px] overflow-hidden pb-20 pt-16 sm:min-h-[600px] sm:pt-24">
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 from-0% via-white/70 via-50% to-transparent to-65%" />
      <img
        src={heroPerson}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 z-10 h-[101%] select-none object-contain drop-shadow-2xl"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-b from-transparent to-white" />
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal variant="fadeUp" duration={650}>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Learn Anything.{" "}
              <span className="text-[#10CDB2]">Master Everything.</span>
            </h1>
          </Reveal>
          <Reveal variant="fadeUp" duration={600} delay={120}>
            <p className="mt-4 text-base text-cool-700 sm:text-lg">
              Discover courses from leading educators, learning platforms, and industry experts—all in one
              place. <span className="text-[#10CDB2]">Curio</span> helps you find the right learning path faster, explore new opportunities, and
              build skills that move your career and ambitions forward. Start learning <span className="text-[#10CDB2]">today</span>.
            </p>
          </Reveal>
          <Reveal variant="fadeUp" duration={550} delay={240}>
            <div className="mt-8" ref={wrapperRef}>
              <form
                onSubmit={handleSearch}
                className="relative flex max-w-xl items-center gap-2 rounded-full border border-cool-200/70 bg-white/75 p-1.5 pl-4 shadow-sm backdrop-blur-sm transition focus-within:border-cool-300 focus-within:shadow-md"
              >
                <Search size={18} className="shrink-0 text-cool-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                  }}
                  onFocus={() => query.trim().length > 0 && setOpen(true)}
                  placeholder="Try 'React' or 'Data Science'..."
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-cool-400"
                />
                <button
                  type="submit"
                  className="rounded-full bg-mint-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-mint-700"
                >
                  Search
                </button>
              </form>
              {open && suggestions.length > 0 && (
                <div className="absolute z-50 mt-2 w-full max-w-xl overflow-hidden rounded-2xl border border-cool-100 bg-white shadow-xl">
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
            </div>
          </Reveal>
          <Reveal variant="fadeUp" duration={500} delay={360}>
            <p className="mt-6 text-xs text-cool-500">
              Not sure where to start?{" "}
              <Link to="/marketplace" className="font-medium text-mint-700 underline-offset-2 hover:underline">
                Browse all courses →
              </Link>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
