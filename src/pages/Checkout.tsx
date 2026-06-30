import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import { enrollInCourses } from "@/lib/enrollment";

declare global {
  interface Window {
    PaystackPop: {
      setup(config: {
        key: string;
        email: string;
        amount: number;
        currency?: string;
        ref?: string;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }): { openIframe(): void };
    };
  }
}

export function Checkout() {
  const { items, subtotal, clear } = useCart();
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [email, setEmail] = useState("");

  const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY ?? "";

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">Nothing to check out</h1>
        <p className="mt-2 text-sm text-cool-500">Add a course to your cart first.</p>
        <Link to="/marketplace" className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">
          Browse courses
        </Link>
      </div>
    );
  }

  function handlePayWithPaystack() {
    if (!email) return;
    setProcessing(true);

    const handler = window.PaystackPop.setup({
      key: paystackKey,
      email,
      amount: Math.round(subtotal * 100),
      currency: "NGN",
      callback() {
        enrollInCourses(items);
        clear();
        setProcessing(false);
        navigate("/dashboard?purchased=1");
      },
      onClose() {
        setProcessing(false);
      },
    });

    handler.openIframe();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Checkout</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6 rounded-2xl border border-cool-100 p-6">
          <div>
            <h2 className="font-display font-semibold text-ink">Contact</h2>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-3 w-full rounded-xl border border-cool-100 px-4 py-3 text-sm outline-none focus:border-mint-500"
            />
          </div>

          <div>
            <h2 className="font-display font-semibold text-ink">Payment</h2>
            <p className="mt-1 text-xs text-cool-500">
              You will be redirected to a secure Paystack checkout to complete your payment. We accept all major cards — Visa, Mastercard, and Verve.
            </p>
          </div>

          <button
            type="button"
            disabled={processing || !email || !paystackKey}
            onClick={handlePayWithPaystack}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-mint-500 py-3 text-sm font-semibold text-ink transition hover:bg-mint-600 disabled:opacity-60"
          >
            <Lock size={15} /> {processing ? "Opening Paystack…" : `Pay ${formatPrice(subtotal)} with Paystack`}
          </button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-cool-400">
            <ShieldCheck size={13} /> Secured by Paystack · 30-day money-back guarantee
          </p>
        </div>

        <div className="rounded-2xl border border-cool-100 p-6 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display font-semibold text-ink">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {items.map((c) => (
              <li key={c.id} className="flex justify-between gap-3 text-sm text-cool-600">
                <span className="line-clamp-1">{c.title}</span>
                <span className="shrink-0 font-medium text-ink">{formatPrice(c.price)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-cool-100 pt-4 font-display text-lg font-bold text-ink">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
