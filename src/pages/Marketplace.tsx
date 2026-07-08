import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useCourses } from "@/context/CourseContext";
import { CourseCard } from "@/components/ui/CourseCard";

function isBoosted(boosted_until?: string | null): boolean {
  if (!boosted_until) return false;
  return new Date(boosted_until).getTime() > Date.now();
}

export function Marketplace() {
  const { courses, loading } = useCourses();
  const [params, setParams] = useSearchParams();

  const query = params.get("q") ?? "";
  const sort = params.get("sort") ?? "relevance";
  const priceFilter = params.get("price") ?? "all";

  function updateParam(key: string, value: string | null) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  }

  const filtered = useMemo(() => {
    let result = [...courses];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.subtitle.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)) ||
          c.category.name.toLowerCase().includes(q)
      );
    }
    if (priceFilter === "free") result = result.filter((c) => c.price === 0);
    if (priceFilter === "paid") result = result.filter((c) => c.price > 0);

    if (sort === "bestseller") result = result.filter((c) => c.bestseller);
    if (sort === "newest") result.sort((a, b) => (a.last_updated < b.last_updated ? 1 : -1));
    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

    result.sort((a, b) => {
      const aBoosted = isBoosted(a.boosted_until) ? 0 : 1;
      const bBoosted = isBoosted(b.boosted_until) ? 0 : 1;
      return aBoosted - bBoosted;
    });

    return result;
  }, [query, priceFilter, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-full bg-white/60 p-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06),0_4px_20px_-8px_rgba(16,205,178,0.3)] backdrop-blur-xl">
          {(["all", "free", "paid"] as const).map((label) => (
            <button
              key={label}
              onClick={() => updateParam("price", label === "all" ? null : label)}
              className={`rounded-full px-6 py-2 text-sm font-semibold capitalize transition-all duration-300 ${
                priceFilter === label
                  ? "bg-[#10CDB2] text-white shadow-[0_2px_12px_-4px_rgba(16,205,178,0.5)]"
                  : "text-cool-500 hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cool-400" />
        <input
          value={query}
          onChange={(e) => {
            const next = new URLSearchParams(params);
            if (e.target.value) next.set("q", e.target.value);
            else next.delete("q");
            setParams(next);
          }}
          placeholder="Search for a course..."
          className="w-full rounded-full border border-cool-100 bg-white py-3 pl-11 pr-4 text-sm text-ink outline-none transition-all placeholder:text-cool-400 focus:border-[#10CDB2] focus:shadow-[0_0_0_3px_rgba(16,205,178,0.15)]"
        />
      </div>

      <div className="flex gap-8">
        <div className="flex-1">
          <div className="mb-5 flex items-center justify-end gap-3">
            <select
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="ml-auto rounded-full border border-cool-100 px-4 py-2 text-sm text-cool-700 outline-none focus:border-mint-500"
            >
              <option value="relevance">Most relevant</option>
              <option value="bestseller">Bestseller</option>
              <option value="newest">Newest</option>
              <option value="rating">Highest rated</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </div>

          {loading || filtered.length === 0 ? (
            <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-cool-100 bg-white p-4">
                  <div className="h-40 w-full rounded-xl bg-cool-100" />
                  <div className="mt-3 h-4 w-3/4 rounded bg-cool-100" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-cool-100" />
                  <div className="mt-4 h-10 w-full rounded-xl bg-cool-100" />
                </div>
              ))}
              {!loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-xl bg-white/80 px-6 py-3 text-center shadow-lg backdrop-blur-sm">
                    <p className="font-display font-semibold text-ink">No courses match these filters yet.</p>
                    <p className="text-sm text-cool-500">Try clearing a filter or searching a broader term.</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
