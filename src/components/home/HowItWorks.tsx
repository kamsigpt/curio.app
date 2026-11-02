import { Search, SlidersHorizontal, ExternalLink, Bookmark } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Search,
    title: "Search for a skill",
    body: "Enter a topic, instructor, or provider to see relevant courses in the current Curio catalogue.",
  },
  {
    n: "02",
    icon: SlidersHorizontal,
    title: "Compare your options",
    body: "Narrow the list by level, category, price, deal status, and ratings when reliable ratings are available.",
  },
  {
    n: "03",
    icon: Bookmark,
    title: "Save courses to revisit",
    body: "Sign in to save a shortlist and keep your personal learning activity organised in My Learning.",
  },
  {
    n: "04",
    icon: ExternalLink,
    title: "Continue with the provider",
    body: "Open the original course page to confirm current details, enrol, and learn on that provider's platform.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white/45 py-16">
      <div className="flow-lines pointer-events-none absolute inset-x-0 bottom-0 h-48 opacity-30" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">How <span className="text-[#10CDB2]">Curio</span> Works</h2>
          <p className="mt-2 text-sm text-cool-500">
            From your first search to the course provider, Curio keeps course discovery in one clear flow.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.n} className="group glass-panel relative rounded-2xl p-6 text-center transition hover:-translate-y-1 hover:border-mint-200">
              <span className="font-display text-3xl font-bold text-mint-200">{step.n}</span>
              <span className="mx-auto mt-3 flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-mint-500 shadow-glow transition group-hover:bg-mint-500 group-hover:text-white">
                <step.icon size={18} />
              </span>
              <h3 className="mt-4 font-display font-semibold text-ink">{step.title}</h3>
              <p className="mt-1.5 text-sm text-cool-500">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
