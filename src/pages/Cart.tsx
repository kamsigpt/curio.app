import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, ExternalLink } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { CourseThumb } from "@/components/ui/CourseThumb";
import { Rating } from "@/components/ui/Rating";

export function Cart() {
  const { items, removeItem } = useCart();
  const curioItems = items.filter((c) => c.provider === "Curio");
  const curioSubtotal = curioItems.reduce((s, c) => s + c.price, 0);
  const curioSavings = curioItems.reduce((s, c) => s + ((c.original_price ?? c.price) - c.price), 0);
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <ShoppingBag className="mx-auto text-cool-300" size={48} />
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">Your cart is empty</h1>
        <p className="mt-2 text-sm text-cool-500">Keep browsing — there's a course out there for whatever you're curious about.</p>
        <Link to="/marketplace" className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-mint-600 hover:text-ink">
          Browse courses
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Your cart</h1>
      <p className="mt-1 text-sm text-cool-500">{items.length} course{items.length > 1 ? "s" : ""} in cart</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {items.map((course) => {
            const isCurio = course.provider === "Curio";
            return (
            <div key={course.id} className="flex gap-4 rounded-2xl border border-cool-100 p-4">
              <CourseThumb seed={course.id} categoryIcon={course.category.icon} className="h-20 w-28 shrink-0 rounded-xl" />
              <div className="flex-1">
                <Link to={`/course/${course.slug}`} className="font-display font-semibold text-ink hover:text-mint-700">
                  {course.title}
                </Link>
                <p className="mt-0.5 text-xs text-cool-500">{course.instructor.name} · {course.provider}</p>
                <div className="mt-1.5">
                  <Rating value={course.rating} count={course.rating_count} />
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                {isCurio ? (
                  <div className="text-right">
                    <p className="font-display font-bold text-ink">{formatPrice(course.price)}</p>
                    {course.original_price && (
                      <p className="text-xs text-cool-400 line-through">{formatPrice(course.original_price)}</p>
                    )}
                  </div>
                ) : (
                  <div className="text-right">
                    <span className="rounded-full bg-cool-50 px-2.5 py-0.5 text-[10px] font-medium text-cool-500">
                      External
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  {!isCurio && (
                    <a
                      href={course.external_url || `/course/${course.slug}`}
                      target={course.external_url ? "_blank" : undefined}
                      rel={course.external_url ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-1 rounded-full bg-[#10CDB2] px-3 py-1 text-xs font-semibold text-white transition hover:bg-[#0BA391]"
                    >
                      <ExternalLink size={12} /> Visit site
                    </a>
                  )}
                  <button
                    onClick={() => removeItem(course.id)}
                    className="flex items-center gap-1 text-xs font-medium text-cool-500 hover:text-red-600"
                  >
                    <Trash2 size={13} /> Remove
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-cool-100 p-6 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display font-semibold text-ink">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm text-cool-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(curioSubtotal)}</span>
            </div>
            {curioSavings > 0 && (
              <div className="flex justify-between text-mint-700">
                <span>Savings</span>
                <span>-{formatPrice(curioSavings)}</span>
              </div>
            )}
          </div>
          <div className="mt-3 flex justify-between border-t border-cool-100 pt-3 font-display text-lg font-bold text-ink">
            <span>Total</span>
            <span>{formatPrice(curioSubtotal)}</span>
          </div>
          <button
            onClick={() => navigate(curioItems.length === 0 ? "/marketplace" : "/checkout")}
            className="mt-5 w-full rounded-full bg-mint-500 py-3 text-sm font-semibold text-ink transition hover:bg-mint-600"
          >
            {curioItems.length === 0 ? "Browse courses" : "Proceed to checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}
