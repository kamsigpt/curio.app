import { UserPlus, Search, ShoppingCart, Play } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: UserPlus,
    title: "Create Your Account",
    body: "Sign up in seconds and unlock access to Curio's growing library of courses, deals, and learning opportunities.",
  },
  {
    n: "02",
    icon: Search,
    title: "Explore the Course Library",
    body: "Search and discover courses from top learning platforms and independent educators all in one place.",
  },
  {
    n: "03",
    icon: ShoppingCart,
    title: "Add Courses to Your Cart",
    body: "Found something you like? Save it to your cart and continue exploring without missing a great course.",
  },
  {
    n: "04",
    icon: Play,
    title: "Checkout & Start Learning",
    body: "Complete your purchase and begin learning immediately. Your next skill is just a few clicks away.",
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
            Finding your next course takes just four simple steps.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
