import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/publish", label: "Publish on Curio" },
  { to: "/login", label: "Log In" },
  { to: "/signup", label: "Sign Up" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
];

const categories = [
  "development",
  "design",
  "business",
  "marketing",
  "data-science",
  "photography",
  "music",
  "personal-growth",
];

export function Sitemap() {
  return (
    <div className="relative px-4 py-20 sm:px-6 sm:pt-28 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-mint-100/40 via-white to-transparent" />
      <div className="relative mx-auto max-w-3xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-cool-500 transition hover:text-mint-700"
        >
          <ArrowLeft size={14} /> Back to home
        </Link>
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Sitemap</h1>
        <p className="mt-2 text-sm text-cool-500">A full map of everything on Curio.</p>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="mb-3 font-display text-lg font-semibold text-ink">Pages</h2>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-cool-600 transition hover:text-mint-700 hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-semibold text-ink">Marketplace Categories</h2>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/marketplace?category=${cat}`}
                    className="text-sm capitalize text-cool-600 transition hover:text-mint-700 hover:underline"
                  >
                    {cat.replace(/-/g, " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
