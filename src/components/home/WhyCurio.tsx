import { Search, SlidersHorizontal, BookmarkCheck, ExternalLink, Compass, WalletCards, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Search across the catalogue",
    body: "Look for a course by topic, skill, instructor, or provider from one discovery page.",
  },
  {
    icon: SlidersHorizontal,
    title: "Compare useful details",
    body: "Filter by provider, category, level, price, offer type, and rating where course data supports it.",
  },
  {
    icon: BookmarkCheck,
    title: "Keep a learning shortlist",
    body: "Save interesting courses and use My Learning to organise what you want to study next.",
  },
  {
    icon: ExternalLink,
    title: "Learn with the provider",
    body: "Curio helps you find a course. Enrolment, payment, and course delivery happen on the provider's platform.",
  },
  {
    icon: Compass,
    title: "Explore by skill or category",
    body: "Move from a broad interest to a focused course search with category, level, and topic filters.",
  },
  {
    icon: WalletCards,
    title: "Find lower-cost options",
    body: "Compare free and discounted listings alongside paid courses, with offer dates shown when available.",
  },
  {
    icon: ShieldCheck,
    title: "Clear course destinations",
    body: "Course pages identify the provider and take you to its listing. Curio does not claim to host third-party lessons.",
  },
  {
    icon: Sparkles,
    title: "Built for curious minds",
    body: "Whether you're building a career skill or following a personal interest, Curio makes the next learning option easier to find.",
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
            Curio organises learning opportunities so you can compare options, spot affordable courses, and choose where to continue.
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
