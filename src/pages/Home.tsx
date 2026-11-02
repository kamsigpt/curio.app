import { Reveal } from "@/components/ui/Reveal";
import { Hero } from "@/components/home/Hero";
import { CourseRail } from "@/components/home/CourseRail";
import { useCourses } from "@/context/CourseContext";
import { CategoryGrid } from "@/components/home/CategoryGrid";

export function Home() {
  const { courses } = useCourses();
  const sorted = [...courses].sort((a, b) => {
    const dateA = a.last_updated ? new Date(a.last_updated).getTime() : 0;
    const dateB = b.last_updated ? new Date(b.last_updated).getTime() : 0;
    return dateB - dateA;
  });
  const newReleases = sorted.slice(0, 6);
  const freeCourses = courses.filter((course) => course.pricing_type !== "unavailable" && (course.price === 0 || course.pricing_type === "free")).slice(0, 6);
  const deals = courses.filter((course) =>
    (course.pricing_type === "temporarily_free" || (course.original_price != null && course.original_price > course.price)) &&
    (!course.offer_expires_at || new Date(course.offer_expires_at).getTime() > Date.now())
  ).slice(0, 6);

  return (
    <>
      <Hero />
      <Reveal variant="slideLeft" duration={600} delay={60}>
        <CourseRail
          title="Recently added"
          subtitle="Fresh learning opportunities from course providers."
          courses={newReleases}
        />
      </Reveal>
      <Reveal variant="fadeUp" duration={600}><CategoryGrid /></Reveal>
      {freeCourses.length > 0 && <Reveal variant="slideLeft" duration={600}><CourseRail title="Free courses" subtitle="Explore courses currently listed at no cost." courses={freeCourses} viewAllHref="/marketplace?price=free" /></Reveal>}
      {deals.length > 0 && <Reveal variant="slideLeft" duration={600}><CourseRail title="Free & discounted" subtitle="Offers with current pricing information." courses={deals} viewAllHref="/deals" /></Reveal>}
    </>
  );
}
