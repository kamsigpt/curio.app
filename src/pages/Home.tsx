import { Reveal } from "@/components/ui/Reveal";
import { Hero } from "@/components/home/Hero";
import { PlatformSlider } from "@/components/home/PlatformSlider";
import { WhyCurio } from "@/components/home/WhyCurio";
import { CourseRail } from "@/components/home/CourseRail";
import { HowItWorks } from "@/components/home/HowItWorks";
import { InstructorCTA } from "@/components/home/InstructorCTA";
import { Faq } from "@/components/home/Faq";
import { Newsletter } from "@/components/home/Newsletter";
import { courses } from "@/data/mockData";

export function Home() {
  const bestsellers = courses.filter((c) => c.bestseller);

  return (
    <>
      <Hero />
      <Reveal variant="liquidGlass" duration={700}><PlatformSlider /></Reveal>
      <Reveal variant="popIn" duration={650} delay={80}><WhyCurio /></Reveal>
      <Reveal variant="slideLeft" duration={600} delay={60}>
        <CourseRail
          title="New releases"
          subtitle="Recently published or updated by their instructors."
          courses={bestsellers}
        />
      </Reveal>
      <Reveal variant="popIn" duration={650} delay={80}><HowItWorks /></Reveal>
      <Reveal variant="liquidGlass" duration={700} delay={100}><InstructorCTA /></Reveal>
      <Reveal variant="fadeUp" duration={550} delay={50}><Faq /></Reveal>
      <Reveal variant="scaleIn" duration={650} delay={80}><Newsletter /></Reveal>
    </>
  );
}
