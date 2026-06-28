const faqs = [
  {
    q: "Is Curio free to use?",
    a: "Yes. Browsing, searching, and comparing courses on Curio is completely free. You only pay when you purchase a course, often at a discount compared to buying directly on the platform.",
  },
  {
    q: "Where do the courses come from?",
    a: "Curio aggregates courses from Udemy, Coursera, Skillshare, LinkedIn Learning, and independent instructors. We surface the best options across all platforms in one place.",
  },
  {
    q: "How do I know which course is right for me?",
    a: "Every course shows real ratings, student reviews, curriculum details, and skill level. You can compare side by side so you pick the course that fits your goals — not just the one with the best marketing.",
  },
  {
    q: "Can I publish my own course on Curio?",
    a: "Absolutely. Independent instructors can publish their courses on Curio, keep their own pricing and brand, and reach learners who are actively searching for their next skill.",
  },
];

export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="space-y-4">
        {faqs.map((f) => (
          <details key={f.q} className="group glass-panel rounded-2xl transition hover:border-mint-200">
            <summary className="flex cursor-pointer items-center justify-between px-6 py-5 font-display font-semibold text-ink">
              {f.q}
              <span className="text-mint-600 transition group-open:rotate-45">+</span>
            </summary>
            <p className="border-t border-white/50 px-6 pb-5 pt-3 text-sm leading-relaxed text-cool-700">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
