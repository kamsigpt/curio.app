import { Link } from "react-router-dom";
import { Facebook, Instagram, MessageCircle, Send } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const columns = [
  {
    title: "Marketplace",
    links: [
      { label: "Browse all courses", to: "/marketplace" },
      { label: "Development", to: "/marketplace?category=development" },
      { label: "Design", to: "/marketplace?category=design" },
      { label: "Business", to: "/marketplace?category=business" },
    ],
  },
  {
    title: "Curio",
    links: [
      { label: "About us", to: "/" },
      { label: "Publish on Curio", to: "/publish" },
      { label: "Help & support", to: "/" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", to: "/login" },
      { label: "Create account", to: "/signup" },
      { label: "My learning", to: "/dashboard" },
      { label: "Cart", to: "/cart" },
    ],
  },
];

const socialLinks = [
  { Icon: MessageCircle, href: "#", hoverColor: "hover:text-[#25D366] hover:border-[#25D366]" },
  { Icon: Send, href: "#", hoverColor: "hover:text-[#0088cc] hover:border-[#0088cc]" },
  { Icon: Instagram, href: "#", hoverColor: "hover:text-[#e4405f] hover:border-[#e4405f]" },
  { Icon: Facebook, href: "#", hoverColor: "hover:text-[#1877F2] hover:border-[#1877F2]" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/70 bg-white/50">
      <div className="flow-lines pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-35" />
      <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-mint-200/40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Logo className="h-20 sm:h-24 lg:h-28" />
            <p className="mt-5 max-w-xs text-sm leading-6 text-cool-500">
              Curio brings every digital course, from major platforms to independent tutors, into one place, so
              curiosity always finds a clear next step.
            </p>
            <div className="mt-5 flex gap-3">
              {socialLinks.map(({ Icon, href, hoverColor }, index) => (
                <a
                  key={index}
                  href={href}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/60 text-mint-700 shadow-glass transition-all ${hoverColor}`}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold text-ink">{col.title}</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-cool-500">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="hover:text-mint-700">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/70 pt-6 text-xs text-cool-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Hyle Studios. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/" className="hover:text-cool-700">
              Privacy
            </Link>
            <Link to="/" className="hover:text-cool-700">
              Terms
            </Link>
            <Link to="/" className="hover:text-cool-700">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
