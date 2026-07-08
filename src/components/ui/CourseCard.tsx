import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, Check, Clock, ExternalLink, GraduationCap, ShoppingCart, Star } from "lucide-react";
import type { Course } from "@/lib/types";
import { Badge } from "./Badge";
import { CourseThumb } from "./CourseThumb";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

function isBoosted(boosted_until?: string | null): boolean {
  if (!boosted_until) return false;
  return new Date(boosted_until).getTime() > Date.now();
}

function formatLastUpdated(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", { month: "2-digit", year: "2-digit" }).format(date);
}

function relativeTime(value?: string): string | null {
  if (!value) return null;
  const diff = Date.now() - new Date(value).getTime();
  if (diff < 0) return null;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo`;
  return `${Math.floor(months / 12)}y`;
}

export function CourseCard({ course }: { course: Course }) {
  const { addItem, isInCart } = useCart();
  const { profile } = useAuth();
  const navigate = useNavigate();
  const inCart = isInCart(course.id);
  const featured = isBoosted(course.boosted_until);
  const lastUpdated = formatLastUpdated(course.last_updated);
  const visibleTags = course.tags.slice(0, 3);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-cool-100 bg-white text-ink shadow-card transition-all hover:-translate-y-1 hover:border-[#10CDB2] hover:shadow-cardHover">
      <Link to={`/course/${course.slug}`} className="flex flex-1 flex-col">
        <div className="relative">
          {featured && (
            <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-green-500 px-2.5 py-1 text-xs font-bold text-white shadow-md">
              <Star size={12} className="fill-white" /> Featured
            </div>
          )}
          <CourseThumb
            seed={course.id}
            categoryIcon={course.category.icon}
            imageUrl={course.thumbnail_url}
            alt={course.title}
            className="h-40 w-full"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="outline">{course.provider}</Badge>
            {course.bestseller && <Badge tone="mint">Bestseller</Badge>}
            {course.is_new && <Badge tone="amber">New</Badge>}
          </div>
          <h3 className="font-display text-lg font-bold leading-snug text-ink line-clamp-2 group-hover:text-[#10CDB2]">
            {course.title}
          </h3>
          <p className="border-l-4 border-mint-600 bg-cool-50 py-2 pl-3 pr-2 text-sm font-semibold leading-snug text-cool-700 line-clamp-2">
            {course.subtitle || course.description}
          </p>
          <div className="flex items-center gap-2 pt-4 text-sm font-semibold italic text-cool-500">
            {course.duration_hours > 0 && <span>{course.duration_hours} hours</span>}
            {course.duration_hours > 0 && course.lecture_count > 0 && <span aria-hidden="true">•</span>}
            {course.lecture_count > 0 && <span>{course.lecture_count} lectures</span>}
            {course.duration_hours <= 0 && course.lecture_count <= 0 && <span>{course.level}</span>}
          </div>
          <div className="space-y-1 text-sm text-cool-500">
            {course.rating > 0 && (
              <p className="flex items-center gap-2">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span>
                  <strong className="text-ink">Rating:</strong> {course.rating.toFixed(1)}
                  {course.rating_count > 0 ? ` (${course.rating_count.toLocaleString()} reviews)` : ""}
                </span>
              </p>
            )}
            {lastUpdated && (
              <p className="flex items-center gap-2">
                <CalendarDays size={16} className="text-[#10CDB2]" />
                <span>
                  <strong className="text-ink">Last updated:</strong> {lastUpdated}
                </span>
              </p>
            )}
            <p className="flex items-start gap-2">
              <GraduationCap size={17} className="mt-0.5 text-[#10CDB2]" />
              <span>
                <strong className="text-ink">Instructor:</strong>{" "}
                <span className="font-semibold text-mint-700">{course.instructor.name}</span>
              </span>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 pt-2">
            {visibleTags.length > 0 && (
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm font-bold text-mint-700">
                {visibleTags.map((tag) => (
                  <span key={tag}>#{tag.replace(/^#/, "").replace(/\s+/g, "_")}</span>
                ))}
              </div>
            )}
            {relativeTime(course.last_updated) && (
              <span className="ml-auto shrink-0 text-xs font-semibold text-cool-400">
                {relativeTime(course.last_updated)}
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        {course.external_url ? (
          <a
            href={profile ? course.external_url : "#"}
            target={profile ? "_blank" : undefined}
            rel={profile ? "noopener noreferrer" : undefined}
            onClick={(e) => {
              e.stopPropagation();
              if (!profile) navigate(`/signup?redirect=/course/${course.slug}`);
            }}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#10CDB2] px-4 text-sm font-extrabold text-white transition hover:bg-mint-700"
          >
            Enroll Now <ExternalLink size={16} />
          </a>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!profile) { navigate(`/signup?redirect=/course/${course.slug}`); return; }
              if (!inCart) addItem(course);
            }}
            aria-label={inCart ? "Already in cart" : "Add to cart"}
            className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-extrabold transition-colors ${
              inCart ? "bg-mint-100 text-mint-700" : "bg-[#10CDB2] text-white hover:bg-mint-700"
            }`}
          >
            {inCart ? <Check size={16} /> : <ShoppingCart size={16} />}
            {inCart ? "Added" : "Enroll Now"}
          </button>
        )}
      </div>
    </div>
  );
}
