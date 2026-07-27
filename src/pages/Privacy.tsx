import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function Privacy() {
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
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-cool-400">Last updated: July 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-cool-600">
          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">1. Information We Collect</h2>
            <p>
              When you use Curio, we may collect personal information such as your name, email address, and
              payment details when you create an account, publish a course, or make a purchase. We also collect
              usage data including pages visited, search queries, and interaction patterns to improve our
              platform.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">2. How We Use Your Information</h2>
            <p>
              We use collected information to provide and maintain our service, notify you about changes,
              provide customer support, and send promotional communications (with your consent). Usage data
              helps us analyse trends and improve the platform experience.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">3. Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share data with trusted third-party service
              providers who assist in operating our platform, such as payment processors and hosting services,
              under strict confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">4. Cookies</h2>
            <p>
              Curio uses cookies to maintain your session and remember your preferences. You can instruct your
              browser to refuse cookies, though some features may become unavailable as a result.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">5. Data Security</h2>
            <p>
              We implement industry-standard security measures including encryption and access controls.
              However, no method of transmission over the Internet is 100% secure, and we cannot guarantee
              absolute security.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">6. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal data at any time. To exercise
              these rights, please contact us through our support channels.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please reach out to us through our
              official communication channels listed on the{" "}
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
