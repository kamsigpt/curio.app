import { Link } from "react-router-dom";
import {
  Search,
  BookOpen,
  Globe,
  TrendingUp,
  ArrowRight,
  Users,
  Zap,
  Shield,
  Target,
  Award,
  DollarSign,
  CheckCircle,
  Layers,
  Compass,
} from "lucide-react";

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
    description:
      "We aggregate courses from every major platform so you compare options side by side — no more hopping between tabs.",
  },
  {
    icon: BookOpen,
    title: "Quality over quantity",
    description:
      "Every course is vetted by rating, relevance and instructor credibility. We surface what's worth your time.",
  },
  {
    icon: Globe,
    title: "Built for access",
    description:
      "Curio is designed with African learners in mind — prioritising affordability, mobile-friendly access and locally relevant content.",
  },
  {
    icon: TrendingUp,
    title: "Skills, not certificates",
    description:
      "We care about what you can actually do. Our platform helps you track real progress, not just completion.",
  },
];

const platforms = [
  "Udemy",
  "Coursera",
  "Skillshare",
  "LinkedIn Learning",
  "edX",
  "Khan Academy",
  "Pluralsight",
  "Treehouse",
  "Udacity",
  "Teachable",
  "Thinkific",
  "Independent Tutors",
];

const features = [
  {
    icon: Layers,
    title: "All Courses, One Place",
    body: "Curio pulls course listings from over 12 major platforms and independent instructors into a single, searchable marketplace. Search once, find everything.",
  },
  {
    icon: Compass,
    title: "Smart Comparison",
    body: "Compare courses side by side — by price, rating, level, and duration. Make informed decisions without opening a dozen tabs.",
  },
  {
    icon: Target,
    title: "Personalised Recommendations",
    body: "Our discovery engine learns what you're interested in and surfaces courses that match your goals, skill level, and learning style.",
  },
  {
    icon: Users,
    title: "Community-Driven Ratings",
    body: "Real reviews from real learners help you separate signal from noise. Every rating on Curio comes from someone who actually took the course.",
  },
  {
    icon: DollarSign,
    title: "Always the Best Price",
    body: "See pricing from every platform at a glance. Find free courses, spot discounts, and never overpay for a course you could get cheaper elsewhere.",
  },
  {
    icon: Zap,
    title: "Instant Access",
    body: "Found the right course? One click takes you directly to the platform where it's hosted. No middleman, no extra fees — just straight to learning.",
  },
];

export function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-mint-100/40 via-white to-transparent" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl lg:text-6xl">
            One place for every
            <br />
            <span className="text-mint-600">course you're curious about</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-cool-500 leading-relaxed sm:text-lg">
            Curio brings together courses from Udemy, Coursera, Skillshare and independent tutors — so you
            spend less time searching and more time learning.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-mint-600 hover:text-ink"
            >
              Browse courses <ArrowRight size={16} />
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-full border border-cool-200 bg-white/70 px-6 py-3 text-sm font-semibold text-ink transition hover:border-cool-300 hover:bg-white"
            >
              Join Curio Now
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
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

      {/* Why Curio */}
      <section className="bg-white/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">Why Curio?</h2>
            <p className="mt-3 text-cool-500">
              Learning platforms are scattered. We're the single pane of glass for skill acquisition — helping
              you discover, compare and enrol without the noise.
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

      {/* Features */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">How Curio Works For You</h2>
            <p className="mt-3 text-cool-500">
              Everything you need to find the perfect course — from search to enrolment — in one platform.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-cool-100 bg-white p-6 transition hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint-50">
                  <f.icon size={22} className="text-mint-600" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cool-500">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="bg-white/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Courses From Every Major Platform
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cool-500">
            We aggregate content from the world's top learning platforms and independent instructors — all
            searchable in one place.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {platforms.map((p) => (
              <span
                key={p}
                className="rounded-full border border-cool-100 bg-white px-5 py-2.5 text-sm font-medium text-cool-600 shadow-sm transition hover:border-mint-200 hover:text-mint-700"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-mint-600 hover:text-ink"
            >
              Explore the marketplace <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="bg-white/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-mint-200 bg-gradient-to-br from-mint-50 to-white p-8 sm:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <Shield size={36} className="mx-auto text-[#10CDB2]" />
              <h2 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
                Our Quality Promise
              </h2>
              <p className="mt-4 text-sm text-cool-500 sm:text-base">
                Every course on Curio is evaluated before it appears in search results. We check ratings,
                reviews, instructor credibility, and content relevance — so when you find a course here, you
                know it's worth your time.
              </p>
            </div>
            <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
              {[
                { icon: CheckCircle, text: "Verified instructor profiles" },
                { icon: CheckCircle, text: "Minimum rating thresholds" },
                { icon: CheckCircle, text: "Content relevance checks" },
                { icon: CheckCircle, text: "Regular listing audits" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 rounded-xl bg-white/70 p-4">
                  <item.icon size={18} className="shrink-0 text-[#10CDB2]" />
                  <span className="text-sm font-medium text-ink">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Instructors */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-cool-100 bg-white p-8 sm:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <Award size={36} className="mx-auto text-mint-600" />
              <h2 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
                Teach on Curio
              </h2>
              <p className="mt-4 text-sm text-cool-500 sm:text-base">
                Already have a course on Udemy, Teachable, or your own platform? Publish it on Curio and get
                discovered by thousands of learners who are actively searching for their next skill. Free to
                list, with an optional $10 boost for premium visibility.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/publish"
                  className="inline-flex items-center gap-2 rounded-full bg-[#10CDB2] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0BA391]"
                >
                  Publish on Curio <ArrowRight size={16} />
                </Link>
                <Link
                  to="/marketplace"
                  className="inline-flex items-center gap-2 rounded-full border border-cool-200 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-cool-50"
                >
                  Browse courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
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
