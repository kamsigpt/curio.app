import { Link } from "react-router-dom";
import { Search, BookOpen, Globe, TrendingUp, ArrowRight } from "lucide-react";

const stats = [
  { label: "Courses catalogued", value: "10,000+" },
  { label: "Platforms unified", value: "12" },
  { label: "Learners reached", value: "50,000+" },
  { label: "Countries", value: "30+" },
];

const values = [
  {
    icon: Search,
    title: "Discoverability first",
    description: "We aggregate courses from every major platform so you compare options side by side — no more hopping between tabs.",
  },
  {
    icon: BookOpen,
    title: "Quality over quantity",
    description: "Every course is vetted by rating, relevance and instructor credibility. We surface what's worth your time.",
  },
  {
    icon: Globe,
    title: "Built for access",
    description: "Curio is designed with African learners in mind — prioritising affordability, mobile-friendly access and locally relevant content.",
  },
  {
    icon: TrendingUp,
    title: "Skills, not certificates",
    description: "We care about what you can actually do. Our platform helps you track real progress, not just completion.",
  },
];

export function About() {
  return (
    <div>
      <section className="relative overflow-hidden px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-mint-100/40 via-white to-transparent" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl lg:text-6xl">
            One place for every
            <br />
            <span className="text-mint-600">course you're curious about</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-cool-500 leading-relaxed sm:text-lg">
            Curio brings together courses from Udemy, Coursera, Skillshare and independent
            tutors — so you spend less time searching and more time learning.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-mint-600 hover:text-ink"
            >
              Browse courses <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-cool-100 bg-white/50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-bold text-ink sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-cool-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">Why Curio?</h2>
            <p className="mt-3 text-cool-500">
              Learning platforms are scattered. We're the single pane of glass for skill
              acquisition — helping you discover, compare and enrol without the noise.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-cool-100 bg-white p-6 transition hover:shadow-md sm:p-8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint-50">
                  <v.icon size={22} className="text-mint-600" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cool-500">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to find your next course?
          </h2>
          <p className="mt-3 text-cool-300">
            Join thousands of learners who've stopped searching and started building skills.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-mint-100"
            >
              Get started <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
