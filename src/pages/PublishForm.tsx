import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  TrendingUp,
  Eye,
  DollarSign,
  ArrowRight,
  Star,
  ExternalLink,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useAuth } from "@/context/AuthContext";
import { useCourses } from "@/context/CourseContext";
import type { Category, Instructor, Level } from "@/lib/types";

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

export function PublishForm() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { addCourse } = useCourses();
  const [submitted, setSubmitted] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const levelRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const instructorNameRef = useRef<HTMLInputElement>(null);
  const instructorBioRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const catMap: Record<string, Category> = {
      Development: { id: "cat-dev", name: "Development", slug: "development", icon: "code-2", course_count: 0 },
      Design: { id: "cat-design", name: "Design", slug: "design", icon: "palette", course_count: 0 },
      Business: { id: "cat-business", name: "Business", slug: "business", icon: "briefcase", course_count: 0 },
      Marketing: { id: "cat-marketing", name: "Marketing", slug: "marketing", icon: "megaphone", course_count: 0 },
      "Data Science": { id: "cat-data", name: "Data Science", slug: "data-science", icon: "bar-chart-3", course_count: 0 },
      Photography: { id: "cat-photo", name: "Photography", slug: "photography", icon: "camera", course_count: 0 },
      Music: { id: "cat-music", name: "Music", slug: "music", icon: "music-2", course_count: 0 },
      "Personal Growth": { id: "cat-growth", name: "Personal Growth", slug: "personal-growth", icon: "sparkles", course_count: 0 },
    };

    const id = `submitted-${Date.now()}`;
    const title = titleRef.current?.value ?? "Untitled";
    const category = catMap[categoryRef.current?.value ?? ""] ?? catMap["Development"];
    const level = (levelRef.current?.value as Level) ?? "All Levels";
    const price = parseFloat(priceRef.current?.value ?? "0");
    const link = linkRef.current?.value ?? "";
    const description = descRef.current?.value ?? "";
    const instructorName = instructorNameRef.current?.value ?? "Instructor";
    const instructorBio = instructorBioRef.current?.value ?? "";

    const instructor: Instructor = {
      id: `instructor-${id}`,
      name: instructorName,
      headline: instructorBio,
      avatar_url: "",
      bio: instructorBio,
      rating: 0,
      student_count: 0,
      course_count: 1,
    };

    addCourse({
      id,
      slug: id,
      title,
      subtitle: description.slice(0, 120),
      description,
      thumbnail_url: "",
      external_url: link,
      provider: "Curio",
      instructor,
      category,
      level,
      language: "English",
      price,
      rating: 0,
      rating_count: 0,
      student_count: 0,
      duration_hours: 0,
      lecture_count: 0,
      last_updated: new Date().toISOString(),
      bestseller: false,
      is_new: true,
      tags: [category.name],
      curriculum: [],
      reviews: [],
      what_you_will_learn: [],
      requirements: [],
    });

    setSubmitted(true);
  }

  return (
    <div className="relative">
      {/* Auth gate */}
      {!profile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
          <div className="mx-4 w-full max-w-md rounded-2xl border border-cool-100 bg-white p-8 shadow-xl text-center">
            <h2 className="font-display text-xl font-bold text-ink">Join Curio to Publish</h2>
            <p className="mt-2 text-sm text-cool-500">
              Create an account or log in to start publishing your courses.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                to="/signup?redirect=/publish/submit"
                className="w-full rounded-full bg-[#10CDB2] py-3 text-sm font-semibold text-white hover:bg-[#0BA391]"
              >
                Sign up
              </Link>
              <Link
                to="/login?redirect=/publish/submit"
                className="w-full rounded-full border border-ink py-3 text-sm font-semibold text-ink hover:bg-cool-50"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className={!profile ? "pointer-events-none select-none blur-sm" : ""}>
        {/* Header */}
        <section className="relative overflow-hidden px-4 pb-10 pt-20 sm:px-6 sm:pt-28 lg:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-mint-100/40 via-white to-transparent" />
          <div className="relative mx-auto max-w-4xl text-center">
            <Link
              to="/publish"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-cool-500 transition hover:text-mint-700"
            >
              <ArrowLeft size={14} /> Back to Publish on Curio
            </Link>
            <Reveal variant="fadeUp" duration={600}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-mint-200 bg-mint-50 px-4 py-1.5 text-xs font-medium text-mint-700">
                <Sparkles size={13} /> Publish a Course
              </span>
            </Reveal>
            <Reveal variant="fadeUp" duration={600} delay={80}>
              <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
                Submit Your Course
              </h1>
            </Reveal>
            <Reveal variant="fadeUp" duration={550} delay={160}>
              <p className="mx-auto mt-3 max-w-xl text-sm text-cool-500 sm:text-base">
                Fill in your course details below. Our team will review your submission and your course will
                typically go live within 24 hours.
              </p>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Form */}
            <Reveal variant="slideRight" duration={600} delay={60} className="lg:col-span-2">
              {submitted ? (
                <div className="rounded-2xl border border-mint-200 bg-mint-50 p-8 text-center">
                  <CheckCircle size={40} className="mx-auto text-mint-600" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">Approved & Live!</h3>
                  <p className="mt-1 text-sm text-cool-500">
                    Your course has been approved and now appears in the marketplace.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => navigate("/marketplace")}
                      className="inline-flex items-center gap-2 rounded-full bg-[#10CDB2] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0BA391]"
                    >
                      View in Marketplace <ExternalLink size={15} />
                    </button>
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-2.5 text-sm font-semibold text-ink transition hover:bg-cool-50"
                    >
                      Go to Dashboard
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 rounded-2xl border border-cool-100 p-6 sm:p-8"
                >
                  <h2 className="font-display text-lg font-bold text-ink">Course Details</h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink">Course Title</label>
                      <input
                        ref={titleRef}
                        required
                        className="w-full rounded-xl border border-cool-100 px-4 py-3 text-sm outline-none focus:border-[#10CDB2] focus:shadow-[0_0_0_3px_rgba(16,205,178,0.12)]"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink">Category</label>
                      <select
                        ref={categoryRef}
                        required
                        className="w-full rounded-xl border border-cool-100 px-4 py-3 text-sm text-cool-700 outline-none focus:border-[#10CDB2]"
                      >
                        <option value="">Select a category</option>
                        <option>Development</option>
                        <option>Design</option>
                        <option>Business</option>
                        <option>Marketing</option>
                        <option>Data Science</option>
                        <option>Photography</option>
                        <option>Music</option>
                        <option>Personal Growth</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink">Level</label>
                      <select
                        ref={levelRef}
                        required
                        className="w-full rounded-xl border border-cool-100 px-4 py-3 text-sm text-cool-700 outline-none focus:border-[#10CDB2]"
                      >
                        <option value="">Select level</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                        <option>All Levels</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink">Price ($)</label>
                      <input
                        ref={priceRef}
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        className="w-full rounded-xl border border-cool-100 px-4 py-3 text-sm outline-none focus:border-[#10CDB2] focus:shadow-[0_0_0_3px_rgba(16,205,178,0.12)]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">Course Link</label>
                    <input
                      ref={linkRef}
                      type="url"
                      placeholder="https://yourplatform.com/course-link (optional)"
                      className="w-full rounded-xl border border-cool-100 px-4 py-3 text-sm outline-none focus:border-[#10CDB2] focus:shadow-[0_0_0_3px_rgba(16,205,178,0.12)]"
                    />
                    <p className="mt-1 text-xs text-cool-400">
                      Paste the URL where students can access your course (Udemy, your own site, etc.)
                    </p>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">Description</label>
                    <textarea
                      ref={descRef}
                      rows={4}
                      required
                      className="w-full rounded-xl border border-cool-100 px-4 py-3 text-sm outline-none focus:border-[#10CDB2] focus:shadow-[0_0_0_3px_rgba(16,205,178,0.12)]"
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink">Instructor Name</label>
                      <input
                        ref={instructorNameRef}
                        required
                        className="w-full rounded-xl border border-cool-100 px-4 py-3 text-sm outline-none focus:border-[#10CDB2] focus:shadow-[0_0_0_3px_rgba(16,205,178,0.12)]"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink">Instructor Bio</label>
                      <input
                        ref={instructorBioRef}
                        required
                        className="w-full rounded-xl border border-cool-100 px-4 py-3 text-sm outline-none focus:border-[#10CDB2] focus:shadow-[0_0_0_3px_rgba(16,205,178,0.12)]"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#10CDB2] py-3 text-sm font-semibold text-white transition hover:bg-[#0BA391]"
                  >
                    Submit for Review
                  </button>
                </form>
              )}
            </Reveal>

            {/* Sidebar — Get Your Course Seen */}
            <div className="lg:col-span-1">
              <Reveal variant="fadeUp" duration={600} delay={120}>
                <div className="sticky top-24 rounded-2xl border border-mint-200 bg-gradient-to-br from-mint-50 to-white p-6">
                  <DollarSign size={28} className="text-[#10CDB2]" />
                  <h3 className="mt-3 font-display text-lg font-bold text-ink">Get Your Course Seen</h3>
                  <p className="mt-2 text-sm text-cool-500">
                    Want more visibility? For a flat{" "}
                    <strong className="text-ink">$10</strong>, get premium placement for 30 days.
                  </p>
                  <div className="mt-4 space-y-3">
                    {boostBenefits.map((b) => (
                      <div key={b.title} className="flex items-start gap-2.5">
                        <b.icon size={16} className="mt-0.5 shrink-0 text-[#10CDB2]" />
                        <div>
                          <p className="text-xs font-semibold text-ink">{b.title}</p>
                          <p className="text-[11px] text-cool-500">{b.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/dashboard"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#10CDB2] hover:text-ink"
                  >
                    Boost for $10 <ArrowRight size={14} />
                  </Link>
                  <p className="mt-2 text-center text-[10px] text-cool-400">
                    Optional · Activate any time after listing goes live
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
