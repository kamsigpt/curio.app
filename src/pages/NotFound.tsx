import { Link } from "react-router-dom";
import { Swoosh } from "@/components/ui/Swoosh";

export function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-4 text-center">
      <Swoosh className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 text-mint-100" />
      <div className="relative">
        <p className="font-display text-6xl font-bold text-ink">404</p>
        <h1 className="mt-3 font-display text-xl font-bold text-ink">This page wandered off course</h1>
        <p className="mt-2 text-sm text-cool-500">Let's get you back to something worth learning.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-mint-600 hover:text-ink">
          Back to home
        </Link>
      </div>
    </div>
  );
}
