import { Link } from "react-router-dom";
import { Clock, ShoppingCart, Check } from "lucide-react";
import type { Course } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Rating } from "./Rating";
import { Badge } from "./Badge";
import { CourseThumb } from "./CourseThumb";
import { useCart } from "@/context/CartContext";

export function CourseCard({ course }: { course: Course }) {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(course.id);

  return (
    <div className="glass-panel group flex flex-col overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:shadow-cardHover">
      <Link to={`/course/${course.slug}`} className="block">
        <CourseThumb seed={course.id} categoryIcon={course.category.icon} className="h-28 w-full" />
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <div className="flex items-center gap-2">
          <Badge tone="outline">Udemy</Badge>
          {course.bestseller && <Badge tone="mint">Bestseller</Badge>}
          {course.is_new && <Badge tone="amber">New</Badge>}
        </div>
        <Link to={`/course/${course.slug}`}>
          <h3 className="font-display font-semibold leading-snug text-ink line-clamp-2 hover:text-mint-700">
            {course.title}
          </h3>
        </Link>
        <p className="text-sm text-cool line-clamp-2">{course.subtitle}</p>
        <p className="text-xs text-cool-500">{course.instructor.name}</p>
        <Rating value={course.rating} count={course.rating_count} />
        <div className="flex items-center gap-3 text-xs text-cool-500">
          <span className="flex items-center gap-1">
            <Clock size={13} /> {course.duration_hours}h
          </span>
          <span>{course.level}</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-display text-lg font-bold text-green-600">Free</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (!inCart) addItem(course);
            }}
            aria-label={inCart ? "Already in cart" : "Add to cart"}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
              inCart ? "bg-mint-100 text-mint-700" : "bg-ink text-white hover:bg-mint-600"
            }`}
          >
            {inCart ? <Check size={16} /> : <ShoppingCart size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
