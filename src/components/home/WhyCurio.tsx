import { Award, Search, Star, Zap, Route, Gem, LayoutDashboard, Brain } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Free Premium Courses",
    body: "Access premium Udemy courses for free through time-limited coupon deals updated regularly. Learn more while spending less.",
  },
  {
    icon: Search,
    title: "One Search, Every Platform",
    body: "Discover courses from leading learning platforms and independent experts without jumping between multiple websites.",
  },
  {
    icon: Star,
    title: "Curated Quality",
    body: "Skip the overwhelm. We highlight valuable, highly-rated courses so you can spend less time searching and more time learning.",
  },
  {
    icon: Zap,
    title: "Learn Faster",
    body: "Find the right course for your goals in minutes, whether you're learning design, programming, business, marketing, or AI.",
  },
  {
    icon: Route,
    title: "Unlimited Learning Paths",
    body: "Explore thousands of courses across diverse subjects, skill levels, and career paths from beginner to expert.",
  },
  {
    icon: Gem,
    title: "Hidden Gems Included",
    body: "Discover exceptional courses and instructors you might never find through traditional platform searches.",
  },
  {
    icon: LayoutDashboard,
    title: "Everything in One Place",
    body: "Your central hub for online learning—browse, discover, and explore courses from across the web in one seamless experience.",
  },
  {
    icon: Brain,
    title: "Built for Curious Minds",
    body: "Whether you're advancing your career, starting a side hustle, or exploring a new passion, Curio helps you find the perfect course.",
  },
];

export function WhyCurio() {
  return (
    <section className="bg-white pb-16 pt-6 sm:pb-20 sm:pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Why Learners Choose <span className="text-[#10CDB2]">Curio</span>
          </h2>
          <p className="mt-3 text-sm text-cool-500 sm:text-base">
            Discover better courses, save time, and unlock learning opportunities from across the
            web—all in one place.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass-panel group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-mint-200"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-100 text-mint-700 transition group-hover:bg-mint-500 group-hover:text-white">
                <f.icon size={20} />
              </span>
              <h3 className="mt-4 font-display font-semibold text-ink">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-cool-500">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
