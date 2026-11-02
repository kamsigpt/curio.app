import { Reveal } from "@/components/ui/Reveal";
import { Hero } from "@/components/home/Hero";
import { CourseRail } from "@/components/home/CourseRail";
import { useCourses } from "@/context/CourseContext";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { WhyCurio } from "@/components/home/WhyCurio";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Faq } from "@/components/home/Faq";
import { Link } from "react-router-dom";

export function Home() {
  const { courses } = useCourses();
  const sorted = [...courses].sort((a, b) => (b.last_updated ? new Date(b.last_updated).getTime() : 0) - (a.last_updated ? new Date(a.last_updated).getTime() : 0));
  const newReleases = sorted.slice(0, 6);
  const ranked = [...courses].sort((a, b) => {
    const aScore = (a.rating_count > 0 ? a.rating * Math.log10(a.rating_count + 1) : 0) + Math.log10(a.student_count + 1);
    const bScore = (b.rating_count > 0 ? b.rating * Math.log10(b.rating_count + 1) : 0) + Math.log10(b.student_count + 1);
    return bScore - aScore;
  });
  const promoted = courses.filter((course) => course.boosted_until && new Date(course.boosted_until).getTime() > Date.now());
  const featuredPicks = (promoted.length ? promoted : ranked).slice(0, 6);
  const popular = [...courses].filter((course) => course.student_count > 0).sort((a, b) => b.student_count - a.student_count).slice(0, 6);
  const providers = [...new Set(courses.map((course) => course.provider).filter(Boolean))].sort();
  const freeCourses = courses.filter((course) => course.pricing_type !== "unavailable" && (course.price === 0 || course.pricing_type === "free")).slice(0, 6);
  const deals = courses.filter((course) =>
    (course.pricing_type === "temporarily_free" || (course.original_price != null && course.original_price > course.price)) &&
    (!course.offer_expires_at || new Date(course.offer_expires_at).getTime() > Date.now())
  ).slice(0, 6);

  return (
    <>
      <Hero />
      {providers.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8" aria-label="Course providers in the catalogue">
          <div className="glass-panel flex flex-wrap items-center justify-center gap-2 rounded-2xl px-4 py-4 sm:gap-3">
            <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-cool-500">Explore providers</span>
            {providers.slice(0, 8).map((provider) => (
              <Link key={provider} to={`/marketplace?provider=${encodeURIComponent(provider)}`} className="rounded-full border border-cool-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-cool-700 transition hover:border-mint-400 hover:text-mint-800">{provider}</Link>
            ))}
          </div>
        </section>
      )}
      {featuredPicks.length > 0 && <Reveal variant="slideLeft" duration={600}><CourseRail title="Featured picks" subtitle={promoted.length ? "Featured listings from the current course catalogue." : "A strong place to start, ranked from available course ratings and learner activity."} courses={featuredPicks} /></Reveal>}
      {popular.length > 0 && <Reveal variant="slideLeft" duration={600}><CourseRail title="Popular with learners" subtitle="Courses with the highest learner counts in the current catalogue." courses={popular} /></Reveal>}
      <Reveal variant="slideLeft" duration={600} delay={60}>
        <CourseRail
          title="Recently added"
          subtitle="The latest course listings available on Curio."
          courses={newReleases}
        />
      </Reveal>
      <Reveal variant="fadeUp" duration={600}><CategoryGrid /></Reveal>
      {freeCourses.length > 0 && <Reveal variant="slideLeft" duration={600}><CourseRail title="Free courses" subtitle="Explore courses currently listed at no cost." courses={freeCourses} viewAllHref="/marketplace?price=free" /></Reveal>}
      {deals.length > 0 && <Reveal variant="slideLeft" duration={600}><CourseRail title="Free & discounted" subtitle="Offers with current pricing information." courses={deals} viewAllHref="/deals" /></Reveal>}
      <Reveal variant="fadeUp" duration={600}><WhyCurio /></Reveal>
      <Reveal variant="fadeUp" duration={600}><HowItWorks /></Reveal>
      <Reveal variant="fadeUp" duration={600}><Faq /></Reveal>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="glass-panel flex flex-col items-start justify-between gap-6 rounded-3xl p-7 sm:flex-row sm:items-center sm:p-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-mint-700">Your next skill starts here</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">Less searching. More learning.</h2>
            <p className="mt-2 text-sm leading-relaxed text-cool-600">Compare course options, keep a shortlist in My Learning, and continue to the provider that delivers the course.</p>
          </div>
          <Link to="/marketplace" className="inline-flex shrink-0 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-mint-600">Explore all courses</Link>
        </div>
      </section>
    </>
  );
}
