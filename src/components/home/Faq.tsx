const faqs = [
  {
    q: "Is Curio free to use?",
    a: "Yes. Browsing, searching, and saving courses on Curio is free. If a course costs money, you complete the purchase with its provider unless a listing explicitly identifies an authorised Curio checkout.",
  },
  {
    q: "Where do the courses come from?",
    a: "The catalogue contains listings from course providers and approved sources. A provider is only shown when course records are available; a provider name does not mean Curio has a live API partnership with it.",
  },
  {
    q: "How do I know which course is right for me?",
    a: "Use the available title, provider, level, category, price, and rating information to compare options. Some providers do not expose every detail, so missing data is not inferred.",
  },
  {
    q: "Where do I enrol and take the course?",
    a: "Course access links open the provider's course page. The provider handles enrolment, payment, course delivery, and any certificates it offers.",
  },
  {
    q: "Are free and discounted offers guaranteed to be available?",
    a: "Offers can change or expire. When an expiry date or last-checked date is available, Curio shows it. Confirm the current price and terms on the provider's page before enrolling.",
  },
  {
    q: "Does Curio track course completion?",
    a: "My Learning can help you organise saved courses and self-reported progress. Curio only knows a provider-verified completion status when an authorised provider integration supplies it.",
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
