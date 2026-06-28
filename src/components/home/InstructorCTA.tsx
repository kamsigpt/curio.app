import { Link } from "react-router-dom";
import { Swoosh } from "@/components/ui/Swoosh";
import { ArrowRight, BookOpen, Users, Star, DollarSign, TrendingUp, Bell, Sparkles, MessageCircle, CreditCard } from "lucide-react";

export function InstructorCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="glass-panel relative overflow-hidden rounded-3xl px-8 py-12 sm:px-14 sm:py-16">
        <Swoosh className="absolute -right-10 -top-16 h-72 w-72 text-white/15" />
        <Swoosh className="absolute -bottom-20 left-1/3 h-56 w-56 text-mint-500/15" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-br from-mint-500/30 to-aqua-500/25 blur-2xl" />
        <div className="relative max-w-lg">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Publish on Curio
          </h2>
          <p className="mt-3 text-sm text-ink/80 sm:text-base">
            Already teaching? Publish your course on Curio and reach learners actively searching for their
            next skill. Keep your own pricing, maintain your brand, and put your courses in front of
            motivated learners comparing the best learning options—all while earning from your expertise.
          </p>
          <Link
            to="/marketplace?teach=1"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-mint-500 hover:text-ink"
          >
            Publish Your Course <ArrowRight size={16} />
          </Link>
        </div>

        <div className="absolute inset-y-0 right-4 hidden w-[420px] lg:block">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[3deg]">
            <div className="w-80 rounded-2xl border border-white/30 bg-white/60 p-5 shadow-xl backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-mint-500/20 text-mint-700">
                  <TrendingUp size={16} />
                </span>
                <span className="font-display text-sm font-bold text-ink">Creator Dashboard</span>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-white/70 p-3 text-center">
                  <span className="flex justify-center text-mint-600">
                    <BookOpen size={16} />
                  </span>
                  <span className="mt-1 block font-display text-sm font-bold text-ink">12</span>
                  <span className="text-[10px] text-cool-500">Courses</span>
                </div>
                <div className="rounded-xl bg-white/70 p-3 text-center">
                  <span className="flex justify-center text-mint-600">
                    <Users size={16} />
                  </span>
                  <span className="mt-1 block font-display text-sm font-bold text-ink">4.2K</span>
                  <span className="text-[10px] text-cool-500">Students</span>
                </div>
                <div className="rounded-xl bg-white/70 p-3 text-center">
                  <span className="flex justify-center text-mint-600">
                    <Star size={16} />
                  </span>
                  <span className="mt-1 block font-display text-sm font-bold text-ink">4.9</span>
                  <span className="text-[10px] text-cool-500">Rating</span>
                </div>
              </div>
              <div className="mb-3 flex items-center justify-between rounded-xl bg-white/70 px-4 py-3">
                <div className="flex items-center gap-2">
                  <DollarSign size={16} className="text-mint-600" />
                  <span className="text-sm text-cool-500">Revenue this month</span>
                </div>
                <span className="font-display text-sm font-bold text-ink">$3,420</span>
              </div>
              <div className="rounded-xl bg-white/70 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-cool-500">GROWTH</span>
                  <span className="text-[10px] font-semibold text-green-600">+24%</span>
                </div>
                <div className="flex items-end gap-1">
                  {[35, 50, 40, 65, 55, 75, 90].map((h, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-1">
                      <div
                        className="w-full rounded-sm bg-gradient-to-t from-mint-400 to-mint-300 transition-all hover:from-mint-500 hover:to-mint-400"
                        style={{ height: `${h}%`, minHeight: 8 }}
                      />
                      <span className="text-[8px] text-cool-400">
                        {["M", "T", "W", "T", "F", "S", "S"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className="absolute right-0 top-3 animate-floaty2 transform-gpu"
            style={{ animationDelay: "1s" }}
          >
            <div className="flex items-center gap-2 rounded-full border border-amber-200/60 bg-amber-50/80 px-4 py-2 shadow-lg">
              <Sparkles size={14} className="text-amber-500" />
              <span className="text-xs font-semibold text-amber-700">Top Instructor</span>
            </div>
          </div>

          <div
            className="absolute -left-8 top-10 animate-drift transform-gpu"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-center gap-2 rounded-full border border-mint-200/60 bg-mint-50/80 px-4 py-2 shadow-lg">
              <Bell size={14} className="text-mint-600" />
              <span className="text-xs text-mint-800">
                New course <strong className="font-semibold">published</strong>
              </span>
            </div>
          </div>

          <div
            className="absolute -left-8 bottom-12 animate-floaty transform-gpu"
            style={{ animationDelay: "2s" }}
          >
            <div className="w-48 rounded-xl border border-white/40 bg-white/70 p-3 shadow-lg">
              <div className="mb-1 flex items-center gap-1.5">
                <MessageCircle size={12} className="text-cool-400" />
                <span className="text-[10px] font-semibold text-cool-500">RECENT REVIEW</span>
              </div>
              <p className="text-[11px] leading-snug text-ink/80">
                "Best React course I've taken. Clear, practical, and well-structured."
              </p>
              <div className="mt-1 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>

          <div
            className="absolute right-0 bottom-10 animate-floaty2 transform-gpu"
            style={{ animationDelay: "3s" }}
          >
            <div className="flex items-center gap-2 rounded-full border border-green-200/60 bg-green-50/80 px-4 py-2 shadow-lg">
              <CreditCard size={14} className="text-green-600" />
              <span className="text-xs text-green-800">
                Payout <strong className="font-semibold">$940.20</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
