import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function Terms() {
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
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Terms of Service</h1>
        <p className="mt-2 text-sm text-cool-400">Last updated: July 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-cool-600">
          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Curio, you agree to be bound by these Terms of Service. If you do not
              agree with any part of these terms, you may not use our platform.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">2. Use of the Platform</h2>
            <p>
              Curio is an aggregation platform that helps users discover and compare digital courses from
              multiple providers. You may browse, search, and follow links to courses. Creating an account is
              required for publishing courses and accessing personalised features.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">3. Instructor Accounts</h2>
            <p>
              Instructors who publish courses on Curio retain ownership of their content. By publishing, you
              grant Curio a non-exclusive licence to display, promote, and distribute your listing across the
              platform. You are responsible for ensuring your course content does not infringe on third-party
              rights.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">4. Payments</h2>
            <p>
              Course purchases are processed through our secure payment partners. Curio charges no additional
              fees to learners beyond the listed course price. Instructors may opt into premium promotion for a
              flat fee of $10 per listing per 30-day cycle.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">5. Prohibited Conduct</h2>
            <p>
              You may not use Curio for unlawful purposes, attempt to gain unauthorised access to any part of
              the platform, transmit malware, or engage in activities that harm other users or the integrity of
              the service.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">6. Limitation of Liability</h2>
            <p>
              Curio is not liable for the quality, accuracy, or outcomes of courses hosted on third-party
              platforms. Our role is to help you discover and compare — the learning experience is governed by
              the original provider's terms.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the platform after
              changes constitutes acceptance of the updated terms. We will notify users of significant changes
              via email or platform announcement.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">8. Contact</h2>
            <p>
              For questions about these terms, contact us through the channels listed on our{" "}
              <Link to="/about" className="font-medium text-mint-700 hover:underline">
                About page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
