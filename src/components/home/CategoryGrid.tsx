import { Link } from "react-router-dom";
import { Code2, Palette, Briefcase, Megaphone, BarChart3, Camera, Music2, Brain, type LucideIcon } from "lucide-react";
import { categories } from "@/data/mockData";

const ICONS: Record<string, LucideIcon> = {
  "code-2": Code2,
  palette: Palette,
  briefcase: Briefcase,
  megaphone: Megaphone,
  "bar-chart-3": BarChart3,
  camera: Camera,
  "music-2": Music2,
  brain: Brain,
};

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Browse by category</h2>
          <p className="mt-1 text-sm text-cool-500">Every category, pulled from every provider on Curio.</p>
        </div>
        <Link to="/marketplace" className="hidden text-sm font-semibold text-mint-700 hover:text-mint-800 sm:block">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((cat) => {
          const Icon = ICONS[cat.icon] ?? Code2;
          return (
            <Link
              key={cat.id}
              to={`/marketplace?category=${cat.slug}`}
              className="glass-panel group flex flex-col gap-3 rounded-2xl p-5 transition hover:-translate-y-1 hover:border-mint-300"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint-100 text-mint-800 transition group-hover:bg-mint-500 group-hover:text-ink">
                <Icon size={20} />
              </span>
              <span className="font-display font-semibold text-ink">{cat.name}</span>
              <span className="text-xs text-cool-500">{cat.course_count} courses</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
