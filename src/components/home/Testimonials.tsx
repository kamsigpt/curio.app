import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "I had four tabs open comparing the same topic across three platforms. Curio collapsed that into one search and one cart.",
    name: "Rebecca Lin",
    role: "Switched careers into UX design",
  },
  {
    quote:
      "As an independent tutor, I get the same shelf space as the big platforms. My enrollments doubled in two months.",
    name: "Marcus Webb",
    role: "Independent instructor on Curio",
  },
  {
    quote:
      "The side-by-side ratings caught things a single platform's homepage never would have shown me.",
    name: "Daniel Osei",
    role: "Self-taught backend developer",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Built for the genuinely curious</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="glass-panel flex flex-col rounded-2xl p-6">
            <Quote className="text-mint-400" size={22} />
            <blockquote className="mt-3 flex-1 text-sm text-cool-700">{t.quote}</blockquote>
            <figcaption className="mt-5 border-t border-white/70 pt-4">
              <p className="font-display text-sm font-semibold text-ink">{t.name}</p>
              <p className="text-xs text-cool-500">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
