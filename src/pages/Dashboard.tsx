import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import { CheckCircle2, BookOpen, DollarSign, ArrowRight, Search, PlusCircle, TrendingUp, User, ExternalLink, BarChart3, Eye, Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCourses } from "@/context/CourseContext";
import { fetchEnrolledCourses, boostCourses, isBoosted, getBoostedUntil } from "@/lib/enrollment";
import type { EnrolledCourse } from "@/lib/types";
import { CourseThumb } from "@/components/ui/CourseThumb";
import { formatPrice } from "@/lib/utils";

export function Dashboard() {
  const { profile, loading, userEmail } = useAuth();
  const { courses } = useCourses();
  const [params, setParams] = useSearchParams();
  const [enrolled, setEnrolled] = useState<EnrolledCourse[]>([]);
  const [boosting, setBoosting] = useState(false);
  const justPurchased = params.get("purchased") === "1";

  useEffect(() => {
    void fetchEnrolledCourses().then(setEnrolled);
    if (justPurchased) {
      const next = new URLSearchParams(params);
      next.delete("purchased");
      setParams(next, { replace: true });
    }
  }, []);

  const published = courses.filter((c) => c.id.startsWith("submitted-"));
  const totalSpent = enrolled.reduce((s, e) => s + e.course.price, 0);

  if (loading) return null;

  if (!profile) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">Log in to see your learning</h1>
        <p className="mt-2 text-sm text-cool-500">Your enrolled courses and progress live here once you're signed in.</p>
        <Link to="/login" className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">
          Log in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {justPurchased && (
        <div className="mb-6 flex items-center gap-2 rounded-2xl border border-mint-200 bg-mint-50 px-5 py-3.5 text-sm font-medium text-mint-800">
          <CheckCircle2 size={18} /> Purchase complete — your courses are ready below.
        </div>
      )}

      <Reveal variant="fadeUp" duration={550} className="mb-1 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Dashboard</h1>
          <p className="mt-0.5 text-sm text-cool-500">Welcome back, {profile.full_name}.</p>
        </div>
        <Link
          to="/marketplace"
          className="hidden items-center gap-2 rounded-full bg-[#10CDB2] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0BA391] sm:inline-flex"
        >
          <Search size={15} /> Browse Courses
        </Link>
      </Reveal>

      <Reveal variant="popIn" duration={600} delay={80} className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-cool-100 bg-white p-4 transition hover:border-mint-200 hover:shadow-sm">
          <BookOpen size={20} className="text-[#10CDB2]" />
          <p className="mt-3 font-display text-2xl font-bold text-ink">{enrolled.length}</p>
          <p className="text-xs text-cool-500">Enrolled courses</p>
        </div>
        <div className="rounded-2xl border border-cool-100 bg-white p-4 transition hover:border-mint-200 hover:shadow-sm">
          <DollarSign size={20} className="text-[#10CDB2]" />
          <p className="mt-3 font-display text-2xl font-bold text-ink">{formatPrice(totalSpent)}</p>
          <p className="text-xs text-cool-500">Total spent</p>
        </div>
        <div className="rounded-2xl border border-cool-100 bg-white p-4 transition hover:border-mint-200 hover:shadow-sm">
          <BarChart3 size={20} className="text-[#10CDB2]" />
          <p className="mt-3 font-display text-2xl font-bold text-ink">{published.length}</p>
          <p className="text-xs text-cool-500">Published courses</p>
        </div>
      </Reveal>

      <Reveal variant="slideLeft" duration={550} delay={120} className="mt-6 grid gap-4 sm:grid-cols-3">
        <Link
          to="/marketplace"
          className="flex items-center justify-between rounded-2xl border border-cool-100 bg-white p-4 transition hover:border-[#10CDB2] hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-50">
              <Search size={18} className="text-[#10CDB2]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Explore courses</p>
              <p className="text-xs text-cool-500">Find your next skill</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-cool-300" />
        </Link>
        <Link
          to="/publish"
          className="flex items-center justify-between rounded-2xl border border-cool-100 bg-white p-4 transition hover:border-[#10CDB2] hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-50">
              <PlusCircle size={18} className="text-[#10CDB2]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Publish a course</p>
              <p className="text-xs text-cool-500">Reach new learners</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-cool-300" />
        </Link>
        <Link
          to="/marketplace?sort=bestseller"
          className="flex items-center justify-between rounded-2xl border border-cool-100 bg-white p-4 transition hover:border-[#10CDB2] hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-50">
              <TrendingUp size={18} className="text-[#10CDB2]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Bestsellers</p>
              <p className="text-xs text-cool-500">Top rated courses</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-cool-300" />
        </Link>
      </Reveal>

      {published.length > 0 && (
        <Reveal variant="liquidGlass" duration={700} delay={100} className="mt-8 rounded-2xl border border-mint-200 bg-gradient-to-br from-mint-50 to-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-[#10CDB2]" />
              <h2 className="font-display text-lg font-semibold text-ink">Publisher Dashboard</h2>
            </div>
            <Link
              to="/publish"
              className="text-xs font-semibold text-[#10CDB2] hover:text-[#0BA391]"
            >
              + New course
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {published.map((course) => (
              <div
                key={course.id}
                className="rounded-xl border border-mint-100 bg-white p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-cool-400">{course.provider}</p>
                    <h3 className="mt-0.5 font-display font-semibold text-ink line-clamp-1">
                      {course.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-3 text-xs text-cool-500">
                      <span className="flex items-center gap-1">
                        <Eye size={12} /> —
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign size={12} /> {formatPrice(course.price)}
                      </span>
                    </div>
                  </div>
                  <a
                    href={course.description ? "#" : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#10CDB2] px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#0BA391]"
                  >
                    <ExternalLink size={12} /> View
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-dashed border-mint-200 bg-white/60 p-4 text-center">
            <p className="text-sm text-cool-500">
              Want more eyes on your courses?{" "}
              <button
                disabled={boosting}
                onClick={() => boostCourses(userEmail || profile?.full_name + "@curio.app", setBoosting)}
                className="font-semibold text-[#10CDB2] hover:text-[#0BA391] disabled:opacity-50"
              >
                {boosting ? "Opening Paystack…" : isBoosted(getBoostedUntil()) ? "Boost active — extend for $10" : "Boost all courses for $10"}
              </button>
            </p>
          </div>
        </Reveal>
      )}

      {enrolled.length === 0 ? (
        <Reveal variant="fadeUp" duration={550} delay={60} className="mt-8 rounded-2xl border border-dashed border-cool-100 p-12 text-center">
          <BookOpen className="mx-auto text-cool-300" size={40} />
          <p className="mt-3 font-display font-semibold text-ink">No courses yet</p>
          <p className="mt-1 text-sm text-cool-500">
            When you purchase a course on Curio, it appears here so you can always find it.
          </p>
          <Link
            to="/marketplace"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
          >
            Browse courses <ArrowRight size={15} />
          </Link>
        </Reveal>
      ) : (
        <Reveal variant="slideRight" duration={600} delay={80} className="mt-8">
          <h2 className="mb-4 font-display text-lg font-semibold text-ink">My Learning</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {enrolled.map(({ course, is_featured }) => (
              <Link
                key={course.id}
                to={`/course/${course.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-cool-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {is_featured && (
                  <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-ink shadow-md">
                    <Star size={12} className="fill-ink" /> Featured
                  </div>
                )}
                <CourseThumb seed={course.id} categoryIcon={course.category.icon} className="h-32 w-full" />
                <div className="p-4">
                  <p className="text-xs text-cool-400">{course.provider}</p>
                  <h3 className="mt-1 font-display font-semibold text-ink line-clamp-2">{course.title}</h3>
                  <p className="mt-1 text-xs text-cool-500">{course.instructor.name}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-cool-500">
                    <span>{formatPrice(course.price)}</span>
                    <span className="flex items-center gap-1">
                      <ExternalLink size={12} /> Visit provider
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      )}

      <Reveal variant="scaleIn" duration={550} delay={100} className="mt-8 rounded-2xl border border-cool-100 bg-white p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-50">
            <User size={18} className="text-[#10CDB2]" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-ink">{profile.full_name}</h2>
            <p className="text-xs text-cool-500">
              {published.length > 0
                ? `${published.length} course${published.length > 1 ? "s" : ""} published`
                : "Learner"}
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
