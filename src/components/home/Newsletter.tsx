import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function Newsletter() {
  const stars = useMemo(() => {
    const positions: { top: string; left: string; delay: string; size: string }[] = [];
    const cols = 10;
    const rows = 10;
    const cellW = 92 / cols;
    const cellH = 86 / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const top = 7 + r * cellH + (Math.random() - 0.5) * cellH * 0.35;
        const left = 4 + c * cellW + (Math.random() - 0.5) * cellW * 0.35;
        if (top > 62 && top < 78 && left > 32 && left < 68) continue;
        positions.push({
          top: `${top}%`,
          left: `${left}%`,
          delay: `${Math.random() * 1.5}s`,
          size: `${10 + Math.random() * 12}px`,
        });
      }
    }
    return positions;
  }, []);

  return (
    <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8">
      <div className="group relative mx-auto max-w-5xl overflow-hidden rounded-3xl px-8 py-16 text-center shadow-[0_4px_40px_-10px_rgba(16,205,178,0.4)] sm:px-14 sm:py-20">
        <div className="absolute inset-0 -z-10 rounded-3xl bg-cool-50 transition-all duration-700 group-hover:bg-white group-hover:shadow-[0_0_80px_-16px_rgba(16,205,178,0.6),0_18px_60px_-28px_rgba(10,26,31,0.35),inset_0_1px_0_rgba(255,255,255,0.85)]" />
        <div className="absolute inset-0 -z-20 rounded-3xl bg-gradient-to-br from-mint-500/20 to-aqua-500/15 opacity-60 blur-xl transition-all duration-700 group-hover:opacity-100 group-hover:from-mint-500/30 group-hover:to-aqua-500/25" />

        <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl border border-[#10CDB2]/30 transition-all duration-700 group-hover:border-mint-400/70 group-hover:shadow-[inset_0_0_0_1px_rgba(16,205,178,0.4),0_0_0_2px_rgba(16,205,178,0.25)]" />

        <div className="pointer-events-none absolute -inset-[2px] -z-10 rounded-[calc(1.5rem+2px)] border-2 border-transparent opacity-0 transition-all duration-700 group-hover:border-[#10CDB2] group-hover:opacity-100" />

        {stars.map((s, i) => (
          <div
            key={i}
            className="star-wrapper"
            style={{
              top: s.top,
              left: s.left,
            }}
          >
            <div
              className="star"
              style={{
                fontSize: s.size,
                animationDelay: s.delay,
              }}
            >
              ★
            </div>
          </div>
        ))}

        <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Stay Ahead of the Curve
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-cool-500 sm:text-lg">
          Join thousands of learners receiving updates on new courses, emerging skills, and learning
          opportunities from across the web.
        </p>
        <Link
          to="/signup"
          className="group/btn mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#10CDB2] hover:text-ink hover:shadow-[0_0_30px_-6px_rgba(16,205,178,0.6)]"
        >
          Join Curio <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>
      </div>

      <style>{`
        .star-wrapper {
          position: absolute;
          pointer-events: none;
          z-index: 10;
          opacity: 0;
          transition: opacity 0.8s ease;
        }
        .group:hover .star-wrapper {
          opacity: 1;
        }
        .star {
          color: #10CDB2;
          animation: star-pop 1.6s ease-out infinite;
          animation-play-state: paused;
        }
        .group:hover .star {
          animation-play-state: running;
        }
        @keyframes star-pop {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          40% { transform: scale(1.3) rotate(20deg); opacity: 1; }
          100% { transform: scale(0) rotate(40deg) translateY(-20px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
