import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, TrendingUp, Eye, DollarSign, ArrowRight, Star, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useCart } from "@/context/CartContext";
import { useCourses } from "@/context/CourseContext";
import type { Category, Instructor, Level } from "@/lib/types";

const benefits = [
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
  const navigate = useNavigate();
  const { addItem } = useCart();
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
      last_updated: new Date().toISOString().split("T")[0],
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

  function handleAdvertise() {
    const adItem = {
      id: "ad-boost",
      slug: "ad-boost",
      title: "Course Promotion Boost",
      subtitle: "Premium placement for 30 days",
      description: "",
      thumbnail_url: "",
      provider: "Curio",
      instructor: { id: "", name: "Curio", headline: "", avatar_url: "", bio: "", rating: 0, student_count: 0, course_count: 0 },
      category: { id: "", name: "", slug: "", icon: "trending-up", course_count: 0 },
      level: "All Levels" as const,
      language: "English",
      price: 10,
      rating: 0,
      rating_count: 0,
      student_count: 0,
      duration_hours: 0,
      lecture_count: 0,
      last_updated: "",
      tags: [],
      curriculum: [],
      reviews: [],
      what_you_will_learn: [],
      requirements: [],
    };
    addItem(adItem);
    navigate("/checkout");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Reveal variant="fadeUp" duration={600} className="mb-12 text-center">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Publish on <span className="text-[#10CDB2]">Curio</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-cool-500 sm:text-base">
          Already teaching? Share your course with learners actively searching for their next skill. Keep your own
          pricing, maintain your brand, and reach motivated students across the web.
        </p>
      </Reveal>

      <Reveal variant="popIn" duration={650} delay={80} className="mb-12 grid gap-6 sm:grid-cols-3">
        {[
          { n: "01", title: "Create Your Listing", body: "Fill in your course details, set your price, and add the link to where your course lives." },
          { n: "02", title: "Submit for Review", body: "Our team reviews your listing to ensure quality. Most submissions are approved within 24 hours." },
          { n: "03", title: "Start Enrolling Students", body: "Once live, your course appears across Curio's marketplace for thousands of learners to discover." },
        ].map((s) => (
          <div key={s.n} className="glass-panel group rounded-2xl p-6 text-center transition hover:-translate-y-1 hover:border-mint-200">
            <span className="font-display text-3xl font-bold text-mint-200">{s.n}</span>
            <h3 className="mt-3 font-display font-semibold text-ink">{s.title}</h3>
            <p className="mt-1.5 text-sm text-cool-500">{s.body}</p>
          </div>
        ))}
      </Reveal>

      <Reveal variant="fadeUp" duration={550} delay={120} className="mb-12 text-center">
        <a
          href="#upload-form"
          className="inline-flex items-center gap-2 rounded-full bg-[#10CDB2] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_-8px_rgba(16,205,178,0.5)] transition hover:bg-[#0BA391] hover:shadow-[0_6px_30px_-8px_rgba(16,205,178,0.6)]"
        >
          Start Publishing <ArrowRight size={16} />
        </a>
      </Reveal>

      <Reveal variant="slideRight" duration={600} delay={60} id="upload-form" className="mb-12 scroll-mt-20">
        <h2 className="mb-6 font-display text-2xl font-bold text-ink">Course Details</h2>
        {submitted ? (
          <div className="rounded-2xl border border-mint-200 bg-mint-50 p-8 text-center">
            <CheckCircle size={40} className="mx-auto text-mint-600" />
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">Approved & Live!</h3>
            <p className="mt-1 text-sm text-cool-500">Your course has been approved and now appears in the marketplace.</p>
            <button
              onClick={() => navigate("/marketplace")}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#10CDB2] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0BA391]"
            >
              View in Marketplace <ExternalLink size={15} />
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-5 rounded-2xl border border-cool-100 p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Course Title</label>
                <input ref={titleRef} required className="w-full rounded-xl border border-cool-100 px-4 py-3 text-sm outline-none focus:border-[#10CDB2] focus:shadow-[0_0_0_3px_rgba(16,205,178,0.12)]" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Category</label>
                <select ref={categoryRef} required className="w-full rounded-xl border border-cool-100 px-4 py-3 text-sm text-cool-700 outline-none focus:border-[#10CDB2]">
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
                <select ref={levelRef} required className="w-full rounded-xl border border-cool-100 px-4 py-3 text-sm text-cool-700 outline-none focus:border-[#10CDB2]">
                  <option value="">Select level</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>All Levels</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Price ($)</label>
                <input ref={priceRef} type="number" min="0" step="0.01" required className="w-full rounded-xl border border-cool-100 px-4 py-3 text-sm outline-none focus:border-[#10CDB2] focus:shadow-[0_0_0_3px_rgba(16,205,178,0.12)]" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Course Link</label>
              <input ref={linkRef} type="url" required placeholder="https://yourplatform.com/course-link" className="w-full rounded-xl border border-cool-100 px-4 py-3 text-sm outline-none focus:border-[#10CDB2] focus:shadow-[0_0_0_3px_rgba(16,205,178,0.12)]" />
              <p className="mt-1 text-xs text-cool-400">Paste the URL where students can access your course (Udemy, your own site, etc.)</p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Description</label>
              <textarea ref={descRef} rows={4} required className="w-full rounded-xl border border-cool-100 px-4 py-3 text-sm outline-none focus:border-[#10CDB2] focus:shadow-[0_0_0_3px_rgba(16,205,178,0.12)]" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Instructor Name</label>
                <input ref={instructorNameRef} required className="w-full rounded-xl border border-cool-100 px-4 py-3 text-sm outline-none focus:border-[#10CDB2] focus:shadow-[0_0_0_3px_rgba(16,205,178,0.12)]" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Instructor Bio</label>
                <input ref={instructorBioRef} required className="w-full rounded-xl border border-cool-100 px-4 py-3 text-sm outline-none focus:border-[#10CDB2] focus:shadow-[0_0_0_3px_rgba(16,205,178,0.12)]" />
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

      <Reveal variant="liquidGlass" duration={700} delay={100} className="rounded-3xl border border-mint-200 bg-gradient-to-br from-mint-50 to-white p-8 sm:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <DollarSign size={32} className="mx-auto text-[#10CDB2]" />
          <h2 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
            Get Your Course Seen
          </h2>
          <p className="mt-3 text-sm text-cool-500 sm:text-base">
            Organic listings are free, but with thousands of courses on Curio, standing out takes more than
            just a great title. For a flat <strong className="text-ink">$10</strong>, your course gets
            premium placement across our marketplace — featured in search results, category pages, and
            recommendation slots for 30 days.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl bg-white/70 p-5 text-center">
              <b.icon size={22} className="mx-auto text-[#10CDB2]" />
              <h3 className="mt-3 font-display font-semibold text-ink">{b.title}</h3>
              <p className="mt-1 text-xs text-cool-500">{b.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={handleAdvertise}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#10CDB2] hover:text-ink"
          >
            Boost Your Course — $10 <ArrowRight size={16} />
          </button>
        </div>
      </Reveal>
    </div>
  );
}
