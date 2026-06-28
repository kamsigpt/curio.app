import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CourseCard } from "@/components/ui/CourseCard";
import type { Course } from "@/lib/types";

export function CourseRail({
  title,
  subtitle,
  courses,
}: {
  title: string;
  subtitle?: string;
  courses: Course[];
  viewAllHref?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = 304 + 20;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-cool-500">{subtitle}</p>}
        </div>
        <Link
          to="/marketplace"
          className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-semibold text-mint-700 shadow-glass transition hover:bg-white sm:inline-flex"
        >
          View all <ArrowRight size={15} />
        </Link>
      </div>
      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cool-200 bg-white text-cool-500 shadow-lg transition hover:border-mint-300 hover:text-mint-600"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-5 overflow-hidden"
        >
          {courses.map((course) => (
            <div key={course.id} className="w-72 shrink-0">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cool-200 bg-white text-cool-500 shadow-lg transition hover:border-mint-300 hover:text-mint-600"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </section>
  );
}
