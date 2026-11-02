import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useCourses } from "@/context/CourseContext";
import { CourseCard } from "@/components/ui/CourseCard";
import type { Course } from "@/lib/types";

function isBoosted(boosted_until?: string | null): boolean {
  return Boolean(boosted_until && new Date(boosted_until).getTime() > Date.now());
}

function isExpired(expiresAt?: string | null): boolean {
  return Boolean(expiresAt && new Date(expiresAt).getTime() <= Date.now());
}

function relevance(course: Course, query: string): number {
  const q = query.toLocaleLowerCase();
  if (!q) return 0;
  let score = 0;
  if (course.title.toLocaleLowerCase().includes(q)) score += 8;
  if ((course.subtitle ?? "").toLocaleLowerCase().includes(q)) score += 4;
  if ((course.tags ?? []).some((tag) => tag.toLocaleLowerCase().includes(q))) score += 3;
  if ((course.category?.name ?? "").toLocaleLowerCase().includes(q)) score += 3;
  if ((course.instructor?.name ?? "").toLocaleLowerCase().includes(q)) score += 2;
  if ((course.provider ?? "").toLocaleLowerCase().includes(q)) score += 2;
  if ((course.description ?? "").toLocaleLowerCase().includes(q)) score += 1;
  return score;
}

export function Marketplace({ dealsOnly = false }: { dealsOnly?: boolean }) {
  const { courses, loading } = useCourses();
  const [params, setParams] = useSearchParams();
  const [suggestOpen, setSuggestOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const query = params.get("q") ?? "";
  const sort = params.get("sort") ?? "relevance";
  const priceFilter = params.get("price") ?? "all";
  const categoryFilter = params.get("category") ?? "all";
  const providerFilter = params.get("provider") ?? "all";
  const levelFilter = params.get("level") ?? "all";
  const dealFilter = params.get("deal") ?? "all";
  const ratingFilter = params.get("rating") ?? "all";
  const [page, setPage] = useState(1);
  const pageSize = 18;
  const categories = [...new Set(courses.map((course) => course.category.name))].sort();
  const providers = [...new Set(courses.map((course) => course.provider))].sort();

  const suggestions = query.trim().length > 0
    ? courses
        .filter((course) => relevance(course, query) > 0)
        .slice(0, 6)
    : [];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setSuggestOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function updateParam(key: string, value: string | null) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  }

  function selectSuggestion(title: string) {
    const next = new URLSearchParams(params);
    next.set("q", title);
    setParams(next);
    setSuggestOpen(false);
  }

  const filtered = useMemo(() => {
    let result = [...courses];

    if (query) {
      result = result.filter((c) => relevance(c, query) > 0);
    }
    if (categoryFilter !== "all") result = result.filter((c) => c.category.slug === categoryFilter || c.category.name === categoryFilter);
    if (providerFilter !== "all") result = result.filter((c) => c.provider === providerFilter);
    if (levelFilter !== "all") result = result.filter((c) => c.level === levelFilter);
    if (ratingFilter !== "all") result = result.filter((c) => c.rating >= Number(ratingFilter) && c.rating_count > 0);
    if (priceFilter === "free") result = result.filter((c) => c.pricing_type !== "unavailable" && (c.price === 0 || c.pricing_type === "free" || c.pricing_type === "temporarily_free"));
    if (priceFilter === "paid") result = result.filter((c) => c.price > 0);
    if (dealFilter === "discounted") result = result.filter((c) => c.original_price != null && c.original_price > c.price && !isExpired(c.offer_expires_at));
    if (dealFilter === "free") result = result.filter((c) => c.pricing_type !== "unavailable" && (c.price === 0 || c.pricing_type === "free" || c.pricing_type === "temporarily_free") && !isExpired(c.offer_expires_at));
    if (dealsOnly) result = result.filter((c) => (c.pricing_type === "temporarily_free" || (c.original_price != null && c.original_price > c.price)) && !isExpired(c.offer_expires_at));

    if (sort === "popular") result.sort((a, b) => b.student_count - a.student_count);
    if (sort === "newest") result.sort((a, b) => (a.last_updated < b.last_updated ? 1 : -1));
    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sort === "relevance" && query) result.sort((a, b) => relevance(b, query) - relevance(a, query));

    result.sort((a, b) => {
      const aBoosted = isBoosted(a.boosted_until) ? 0 : 1;
      const bBoosted = isBoosted(b.boosted_until) ? 0 : 1;
      return aBoosted - bBoosted;
    });

    return result;
  }, [courses, query, priceFilter, categoryFilter, providerFilter, levelFilter, dealFilter, ratingFilter, sort, dealsOnly]);

  useEffect(() => setPage(1), [query, priceFilter, categoryFilter, providerFilter, levelFilter, dealFilter, ratingFilter, sort]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visibleCourses = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-mint-700">Curio discovery</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink">{dealsOnly ? "Free courses & deals" : "Explore courses"}</h1>
        <p className="mt-2 max-w-2xl text-sm text-cool-500">Compare learning options from independent providers. Enrolment and learning happen with the provider.</p>
      </div>

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

      <div className="relative mb-6 max-w-md" ref={wrapperRef}>
        <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cool-400" />
        <input
          value={query}
          onChange={(e) => {
            const next = new URLSearchParams(params);
            if (e.target.value) next.set("q", e.target.value);
            else next.delete("q");
            setParams(next);
            setSuggestOpen(true);
          }}
          onFocus={() => query.trim().length > 0 && setSuggestOpen(true)}
          placeholder="Search title, skill, instructor, or provider..."
          className="w-full rounded-full border border-cool-100 bg-white py-3 pl-11 pr-4 text-sm text-ink outline-none transition-all placeholder:text-cool-400 focus:border-[#10CDB2] focus:shadow-[0_0_0_3px_rgba(16,205,178,0.15)]"
        />
        {suggestOpen && suggestions.length > 0 && (
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
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <select aria-label="Category" value={categoryFilter} onChange={(e) => updateParam("category", e.target.value === "all" ? null : e.target.value)} className="rounded-xl border border-cool-100 bg-white px-3 py-2.5 text-sm text-cool-700"><option value="all">All categories</option>{[...new Map(courses.map((course) => [course.category.slug, course.category.name])).entries()].sort((a, b) => a[1].localeCompare(b[1])).map(([slug, name]) => <option key={slug} value={slug}>{name}</option>)}</select>
        <select aria-label="Provider" value={providerFilter} onChange={(e) => updateParam("provider", e.target.value === "all" ? null : e.target.value)} className="rounded-xl border border-cool-100 bg-white px-3 py-2.5 text-sm text-cool-700"><option value="all">All providers</option>{providers.map((name) => <option key={name}>{name}</option>)}</select>
        <select aria-label="Course level" value={levelFilter} onChange={(e) => updateParam("level", e.target.value === "all" ? null : e.target.value)} className="rounded-xl border border-cool-100 bg-white px-3 py-2.5 text-sm text-cool-700"><option value="all">All levels</option>{["Beginner", "Intermediate", "Advanced", "All Levels"].map((level) => <option key={level}>{level}</option>)}</select>
        <select aria-label="Offer type" value={dealFilter} onChange={(e) => updateParam("deal", e.target.value === "all" ? null : e.target.value)} className="rounded-xl border border-cool-100 bg-white px-3 py-2.5 text-sm text-cool-700"><option value="all">All offers</option><option value="free">Free</option><option value="discounted">Discounted</option></select>
        <select aria-label="Minimum rating" value={ratingFilter} onChange={(e) => updateParam("rating", e.target.value === "all" ? null : e.target.value)} className="rounded-xl border border-cool-100 bg-white px-3 py-2.5 text-sm text-cool-700"><option value="all">Any rating</option><option value="4">4+ stars</option><option value="4.5">4.5+ stars</option></select>
      </div>

      <div className="flex gap-8">
        <div className="flex-1">
          <div className="mb-5 flex items-center justify-end gap-3">
            <select
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="ml-auto rounded-full border border-cool-100 px-4 py-2 text-sm text-cool-700 outline-none focus:border-mint-500"
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
              <option value="rating">Highest rated</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="popular">Popularity</option>
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-cool-100 bg-white p-4">
                  <div className="h-36 rounded-xl bg-cool-100" />
                  <div className="mt-4 h-4 w-3/4 rounded bg-cool-100" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-cool-100" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display text-lg font-semibold text-ink">No courses found</p>
              <p className="mt-1 text-sm text-cool-500">Try clearing a filter or searching a broader term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
              {visibleCourses.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          )}
          {!loading && filtered.length > pageSize && <div className="mt-8 flex items-center justify-center gap-3"><button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="rounded-full border border-cool-200 px-4 py-2 text-sm disabled:opacity-40">Previous</button><span className="text-sm text-cool-500">Page {page} of {pageCount}</span><button disabled={page === pageCount} onClick={() => setPage((p) => p + 1)} className="rounded-full border border-cool-200 px-4 py-2 text-sm disabled:opacity-40">Next</button></div>}
        </div>
      </div>
    </div>
  );
}
