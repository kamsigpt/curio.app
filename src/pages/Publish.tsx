import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Eye,
  TrendingUp,
  Star,
  DollarSign,
  Shield,
  BarChart3,
  Globe,
  Zap,
  Users,
  BookOpen,

  Target,
  Award,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    n: "01",
    icon: BookOpen,
    title: "Create Your Listing",
    body: "Fill in your course details — title, category, pricing, description, and a link to where your course lives (Udemy, your own site, anywhere).",
  },
  {
    n: "02",
    icon: Shield,
    title: "Submit for Review",
    body: "Our team reviews every listing to ensure quality. Most submissions are approved within 24 hours — you'll be notified as soon as you're live.",
  },
  {
    n: "03",
    icon: Globe,
    title: "Reach Learners",
    body: "Once live, your course appears across Curio's marketplace for thousands of learners to discover, compare, and enrol.",
  },
];

const whyPublish = [
  {
    icon: Users,
    title: "Access a Global Audience",
    body: "Curio reaches learners across 30+ countries actively searching for their next skill. Your course gets discovered by people who are ready to learn.",
  },
  {
    icon: Target,
    title: "Targeted Discovery",
    body: "Courses are organised by category, level, and topic — making it easy for the right learners to find exactly what you teach.",
  },
  {
    icon: BarChart3,
    title: "Creator Dashboard",
    body: "Track views, clicks, and engagement on your listings from a dedicated dashboard. Know exactly how your courses perform.",
  },
  {
    icon: Globe,
    title: "Multi-Platform Reach",
    body: "Whether your course is on Udemy, Coursera, Teachable, or your own site — publish it on Curio and get discovered alongside the best.",
  },
  {
    icon: Zap,
    title: "Fast Approval",
    body: "No lengthy review processes. Submit your listing and hear back within 24 hours. Most courses go live the same day.",
  },
  {
    icon: Award,
    title: "Build Your Brand",
    body: "Each listing includes your instructor profile, bio, and rating — helping you establish credibility and a loyal following.",
  },
];

const boostBenefits = [
  {
    icon: Eye,
    title: "More Visibility",
    body: "Your course gets featured placement across search results and category pages so learners find you first.",
  },
  {
    icon: TrendingUp,
    title: "Faster Growth",
    body: "Boosted courses see up to 5x more engagement and enrollment compared to organic listings alone.",
  },
  {
    icon: Star,
    title: "Premium Badge",
    body: "A verified Premium badge builds trust and signals quality to every learner browsing the marketplace.",
  },
];

export function Publish() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 sm:pt-28 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-mint-100/40 via-white to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal variant="fadeUp" duration={600} delay={80}>
            <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl lg:text-6xl">
              Share What You Teach.
              <br />
              <span className="text-[#10CDB2]">Get Discovered.</span>
            </h1>
          </Reveal>
          <Reveal variant="fadeUp" duration={550} delay={160}>
            <p className="mx-auto mt-5 max-w-2xl text-base text-cool-500 sm:text-lg">
              Already teaching on Udemy, Coursera, Teachable, or your own platform? Curio helps you reach
              thousands more learners who are actively comparing and choosing courses. Keep your own pricing,
              maintain your brand, and get discovered.
            </p>
          </Reveal>
          <Reveal variant="fadeUp" duration={500} delay={240}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/publish/submit"
                className="inline-flex items-center gap-2 rounded-full bg-[#10CDB2] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_-8px_rgba(16,205,178,0.5)] transition hover:bg-[#0BA391] hover:shadow-[0_6px_30px_-8px_rgba(16,205,178,0.6)]"
              >
                Start Publishing <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-cool-100 bg-white/50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
          {[
            { value: "10,000+", label: "Courses listed" },
            { value: "50K+", label: "Monthly learners" },
            { value: "30+", label: "Countries reached" },
            { value: "24hr", label: "Average approval" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-2xl font-bold text-ink sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-sm text-cool-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="fadeUp" duration={600} className="text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">How It Works</h2>
            <p className="mx-auto mt-3 max-w-xl text-cool-500">
              Getting your course on Curio takes just three simple steps — from submission to live listing.
            </p>
          </Reveal>
          <Reveal variant="popIn" duration={650} delay={80} className="mt-14 grid gap-6 sm:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="glass-panel group rounded-2xl p-6 text-center transition hover:-translate-y-1 hover:border-mint-200"
              >
                <span className="font-display text-3xl font-bold text-mint-200">{s.n}</span>
                <div className="mx-auto mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-mint-50">
                  <s.icon size={22} className="text-mint-600" />
                </div>
                <h3 className="mt-4 font-display font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-cool-500">{s.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Why Publish on Curio */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="fadeUp" duration={600} className="text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">Why Publish on Curio?</h2>
            <p className="mx-auto mt-3 max-w-xl text-cool-500">
              Curio is more than a listing — it's a discovery engine that puts your courses in front of
              learners who are ready to commit.
            </p>
          </Reveal>
          <Reveal variant="popIn" duration={650} delay={80} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyPublish.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-cool-100 bg-white p-6 transition hover:shadow-md sm:p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint-50">
                  <v.icon size={22} className="text-mint-600" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cool-500">{v.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* What You Can Publish */}
      <section className="bg-white/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Reveal variant="fadeUp" duration={600} className="text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">What You Can Publish</h2>
            <p className="mx-auto mt-3 max-w-xl text-cool-500">
              Any digital course hosted on any platform — we bring them all together.
            </p>
          </Reveal>
          <Reveal variant="popIn" duration={650} delay={80} className="mt-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: "💻", title: "Development Courses", desc: "Web, mobile, backend, DevOps, and more." },
                { icon: "🎨", title: "Design & Creative", desc: "UI/UX, graphic design, video production." },
                { icon: "📊", title: "Business & Marketing", desc: "Strategy, analytics, social media, SEO." },
                { icon: "📸", title: "Photography & Music", desc: "Creative arts, editing, production." },
                { icon: "📈", title: "Data Science & AI", desc: "Machine learning, analytics, Python." },
                { icon: "🌱", title: "Personal Growth", desc: "Productivity, leadership, communication." },
              ].map((c) => (
                <div
                  key={c.title}
                  className="flex items-start gap-4 rounded-2xl border border-cool-100 bg-white p-5 transition hover:shadow-md"
                >
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <h3 className="font-display font-semibold text-ink">{c.title}</h3>
                    <p className="mt-1 text-sm text-cool-500">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Get Your Course Seen — $10 Boost */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal variant="liquidGlass" duration={700}>
            <div className="rounded-3xl border border-mint-200 bg-gradient-to-br from-mint-50 to-white p-8 sm:p-12">
              <div className="mx-auto max-w-2xl text-center">
                <DollarSign size={36} className="mx-auto text-[#10CDB2]" />
                <h2 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
                  Get Your Course Seen — $10 Boost
                </h2>
                <p className="mt-4 text-sm text-cool-500 sm:text-base">
                  Organic listings are free, but with thousands of courses on Curio, standing out takes more
                  than just a great title. For a flat <strong className="text-ink">$10</strong>, your course
                  gets premium placement across our marketplace — featured in search results, category pages,
                  and recommendation slots for <strong className="text-ink">30 days</strong>.
                </p>
              </div>

              <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
                {boostBenefits.map((b) => (
                  <div key={b.title} className="rounded-2xl bg-white/70 p-5 text-center">
                    <b.icon size={22} className="mx-auto text-[#10CDB2]" />
                    <h3 className="mt-3 font-display font-semibold text-ink">{b.title}</h3>
                    <p className="mt-1 text-xs text-cool-500">{b.body}</p>
                  </div>
                ))}
              </div>

              <div className="mx-auto mt-8 max-w-2xl">
                <div className="rounded-2xl bg-white/60 p-5">
                  <h3 className="font-display text-sm font-semibold text-ink">What the $10 Boost Includes:</h3>
                  <ul className="mt-3 space-y-2">
                    {[
                      "Featured placement in search results for 30 days",
                      "Premium badge displayed on your listing",
                      "Priority position on category and recommendation pages",
                      "Highlighted in the weekly digest sent to all learners",
                      "Detailed analytics showing boosted performance",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-cool-600">
                        <CheckCircle size={16} className="mt-0.5 shrink-0 text-[#10CDB2]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  to="/publish/submit"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#10CDB2] hover:text-ink"
                >
                  Start Publishing <ArrowRight size={16} />
                </Link>
                <p className="mt-3 text-xs text-cool-400">
                  Free to list. Boost is optional and can be activated any time after your course goes live.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal variant="fadeUp" duration={600} className="text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">Frequently Asked Questions</h2>
          </Reveal>
          <Reveal variant="popIn" duration={650} delay={80} className="mt-10 space-y-4">
            {[
              {
                q: "Is it free to publish my course on Curio?",
                a: "Yes. Listing your course on Curio is completely free. The $10 boost is optional and only needed if you want premium visibility.",
              },
              {
                q: "Do I need to host my course on a specific platform?",
                a: "No. You can publish a course hosted anywhere — Udemy, Coursera, Teachable, Skillshare, your own website, or even Google Drive.",
              },
              {
                q: "How long does approval take?",
                a: "Most listings are reviewed and approved within 24 hours. You'll receive an email notification once your course goes live.",
              },
              {
                q: "Can I update my listing after publishing?",
                a: "Yes. You can edit your course details, pricing, and links at any time from your Creator Dashboard.",
              },
              {
                q: "What happens after I activate the $10 boost?",
                a: "Your course gets featured placement for 30 days across search results, category pages, and recommendation slots. You can track performance from your dashboard.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-cool-100 bg-white p-5 transition hover:shadow-sm"
              >
                <summary className="cursor-pointer list-none font-display text-sm font-semibold text-ink">
                  {faq.q}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-cool-500">{faq.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to Get Your Course Discovered?
          </h2>
          <p className="mt-3 text-cool-300">
            Join hundreds of instructors who are already reaching thousands of learners through Curio.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/publish/submit"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-ink transition hover:bg-mint-100"
            >
              Publish Your Course <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
