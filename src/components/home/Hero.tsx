import { useRef } from "react";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import heroBg from "@/assets/hero/hero-bg.jpg";
import heroPerson from "@/assets/hero/hero-person.png";

export function Hero() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = inputRef.current?.value.trim();
    navigate(q ? `/marketplace?q=${encodeURIComponent(q)}` : "/marketplace");
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
            <div className="mt-8">
              <form
                onSubmit={handleSearch}
                className="flex max-w-xl items-center gap-2 rounded-full border border-cool-200/70 bg-white/75 p-1.5 pl-4 shadow-sm backdrop-blur-sm transition focus-within:border-cool-300 focus-within:shadow-md"
              >
                <Search size={18} className="shrink-0 text-cool-400" />
                <input
                  ref={inputRef}
                  type="text"
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
              <div className="mt-3 flex flex-wrap gap-2">
                {["React", "Data Science", "UI/UX Design", "Python", "Photography"].map((topic) => (
                  <Link
                    key={topic}
                    to={`/marketplace?q=${encodeURIComponent(topic)}`}
                    className="rounded-full border border-cool-200/60 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-cool-500 transition hover:border-cool-300 hover:bg-white hover:text-ink"
                  >
                    {topic}
                  </Link>
                ))}
              </div>
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
