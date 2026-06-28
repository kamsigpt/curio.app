import { Link } from "react-router-dom";
import { Target, Globe, BookOpen, Users, Sparkles, ArrowRight } from "lucide-react";

export function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-mint-50 px-3 py-1 text-xs font-semibold text-mint-700">
          <Sparkles size={13} /> Our story
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
          Why Curio exists
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-cool-500 leading-relaxed">
          Every great skill starts with curiosity. But finding the right course — across 
          Udemy, Coursera, Skillshare, and beyond — is exhausting. Curio is the place 
          where all of them finally live together.
        </p>
      </div>

      <div className="mt-16 space-y-20">
        <section className="grid gap-8 sm:grid-cols-2 sm:items-center">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-50">
              <Target size={24} className="text-mint-600" />
            </div>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink">Our mission</h2>
            <p className="mt-3 text-sm leading-relaxed text-cool-600">
              To make every meaningful course on the internet discoverable from one 
              reliable platform — removing the friction of switching between providers, 
              comparing prices manually, or missing out on great content because you 
              didn't know where to look.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cool-600">
              We believe learning should be about <em>what</em> to learn next, not 
              <em> where</em> to find it.
            </p>
          </div>
          <div className="rounded-2xl border border-cool-100 bg-cool-50 p-6 sm:p-8">
            <blockquote className="text-lg font-display font-semibold text-ink leading-relaxed">
              "Curiosity is the engine of achievement — we're just building the road."
            </blockquote>
          </div>
        </section>

        <section className="grid gap-8 sm:grid-cols-2 sm:items-center">
          <div className="order-last sm:order-first">
            <div className="rounded-2xl border border-cool-100 bg-cool-50 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-mint-600" />
                <span className="text-sm font-semibold text-ink">Africa & beyond</span>
              </div>
              <p className="mt-3 text-sm text-cool-600 leading-relaxed">
                We're building Curio from Africa, for the world — with a special focus on 
                making high-quality skill acquisition accessible across the continent.
              </p>
            </div>
          </div>
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-50">
              <Globe size={24} className="text-mint-600" />
            </div>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink">Our vision</h2>
            <p className="mt-3 text-sm leading-relaxed text-cool-600">
              A world where skill acquisition is a seamless habit — not a research project.
              We want to impact a generation of learners across Africa and the world by 
              making quality education discoverable, comparable, and accessible from a 
              single trusted hub.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cool-600">
              Whether you're in Lagos, Nairobi, or anywhere else — if you have curiosity 
              and an internet connection, Curio should be able to point you to the right 
              course.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-cool-100 bg-white p-8 sm:p-12">
          <div className="flex items-center gap-3">
            <BookOpen size={22} className="text-mint-600" />
            <h2 className="font-display text-xl font-bold text-ink">What makes Curio different</h2>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-ink">One catalogue</h3>
              <p className="mt-1 text-sm text-cool-500">Courses from Udemy, Skillshare, Coursera, independent tutors — all in one place.</p>
            </div>
            <div>
              <h3 className="font-semibold text-ink">You stay in control</h3>
              <p className="mt-1 text-sm text-cool-500">Free courses exist beside premium ones. You choose what fits your budget and style.</p>
            </div>
            <div>
              <h3 className="font-semibold text-ink">Built for impact</h3>
              <p className="mt-1 text-sm text-cool-500">We prioritise accessibility and relevance for African learners while serving the global community.</p>
            </div>
          </div>
        </section>

        <div className="flex flex-col items-center gap-4 pb-8">
          <p className="text-sm text-cool-500">Ready to start your journey?</p>
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-mint-600 hover:text-ink"
          >
            Browse courses <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
