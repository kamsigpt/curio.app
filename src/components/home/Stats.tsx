const stats = [
  { value: "50K+", label: "Courses" },
  { value: "2.4M+", label: "Learners" },
  { value: "8.5K+", label: "Instructors" },
  { value: "190+", label: "Countries" },
];

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Curio by the <span className="text-[#10CDB2]">Numbers</span>
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-panel rounded-2xl p-6 text-center transition hover:-translate-y-1 hover:border-mint-200">
            <p className="font-display text-3xl font-bold text-ink sm:text-4xl">{s.value}</p>
            <p className="mt-1 text-sm text-cool-500">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
