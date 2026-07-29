import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, Check, Clock, ExternalLink, GraduationCap, ShoppingCart, Star } from "lucide-react";
import type { Course } from "@/lib/types";
import { Badge } from "./Badge";
import { CourseThumb } from "./CourseThumb";
import { useWishlist } from "@/context/WishlistContext";
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

export const CourseCard = memo(function CourseCard({ course }: { course: Course }) {
  const { toggleItem, isWishlisted } = useWishlist();
  const { profile } = useAuth();
  const navigate = useNavigate();
  const wishlisted = isWishlisted(course.id);
  const featured = isBoosted(course.boosted_until);
  const lastUpdated = formatLastUpdated(course.last_updated);
  const visibleTags = course.tags.slice(0, 3);

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-cool-100 bg-white text-ink shadow-sm transition-all hover:-translate-y-1 hover:border-[#10CDB2] hover:shadow-md" style={{ contentVisibility: "auto" }}>
      <Link to={`/course/${course.slug}`} className="flex flex-1 flex-col">
        <div className="relative">
          {featured && (
            <div className="absolute left-2 top-2 z-10 flex items-center gap-1 rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-md sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs">
              <Star size={10} className="fill-white sm:size-3" /> Featured
            </div>
          )}
          {profile && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleItem(course);
              }}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/70 shadow-sm backdrop-blur-sm transition hover:scale-110 active:scale-90 sm:right-3 sm:top-3 sm:h-8 sm:w-8"
            >
              <Star
                size={12}
                className={`transition-all duration-300 sm:size-[18px] ${
                  wishlisted
                    ? "fill-[#10CDB2] text-[#10CDB2] scale-110"
                    : "fill-transparent text-cool-400 hover:text-[#10CDB2]"
                }`}
              />
            </button>
          )}
          <CourseThumb
            seed={course.id}
            categoryIcon={course.category.icon}
            imageUrl={course.thumbnail_url}
            alt={course.title}
            className="h-24 w-full sm:h-28 md:h-36 lg:h-40"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-2 sm:gap-2 sm:p-3 md:gap-3 md:p-4">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <Badge tone="outline" className="text-[10px] sm:text-xs">{course.provider}</Badge>
            {course.bestseller && <Badge tone="mint" className="text-[10px] sm:text-xs">Bestseller</Badge>}
            {course.is_new && <Badge tone="amber" className="text-[10px] sm:text-xs">New</Badge>}
          </div>
          <h3 className="font-display text-xs font-bold leading-snug text-ink line-clamp-2 group-hover:text-[#10CDB2] sm:text-sm md:text-base lg:text-lg">
            {course.title}
          </h3>
          <p className="hidden border-l-4 border-mint-600 bg-cool-50 py-1 pl-2 pr-1 text-xs font-semibold leading-snug text-cool-700 line-clamp-2 sm:py-2 sm:pl-3 sm:pr-2 sm:text-sm md:block">
            {course.subtitle || course.description}
          </p>
          <div className="flex items-center gap-1 pt-1 text-[10px] font-semibold italic text-cool-500 sm:pt-2 sm:text-sm md:gap-2">
            {course.duration_hours > 0 && <span>{course.duration_hours}h</span>}
            {course.duration_hours > 0 && course.lecture_count > 0 && <span aria-hidden="true">·</span>}
            {course.lecture_count > 0 && <span>{course.lecture_count}lec</span>}
            {course.duration_hours <= 0 && course.lecture_count <= 0 && <span>{course.level}</span>}
          </div>
          <div className="hidden space-y-0.5 text-[11px] text-cool-500 sm:space-y-1 sm:text-sm md:block">
            {course.rating > 0 && (
              <p className="flex items-center gap-1 sm:gap-2">
                <Star size={12} className="fill-yellow-400 text-yellow-400 sm:size-4" />
                <span>
                  <strong className="text-ink">Rating:</strong> {course.rating.toFixed(1)}
                  {course.rating_count > 0 ? ` (${course.rating_count.toLocaleString()})` : ""}
                </span>
              </p>
            )}
            {lastUpdated && (
              <p className="flex items-center gap-1 sm:gap-2">
                <CalendarDays size={12} className="text-[#10CDB2] sm:size-4" />
                <span>
                  <strong className="text-ink">Updated:</strong> {lastUpdated}
                </span>
              </p>
            )}
            <p className="flex items-start gap-1 sm:gap-2">
              <GraduationCap size={13} className="mt-0.5 text-[#10CDB2] sm:size-[17px]" />
              <span>
                <strong className="text-ink">By:</strong>{" "}
                <span className="font-semibold text-mint-700">{course.instructor.name}</span>
              </span>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-1 sm:gap-x-2 md:pt-2">
            {visibleTags.length > 0 && (
              <div className="flex flex-wrap gap-x-1 gap-y-0.5 text-[9px] font-bold text-mint-700 sm:gap-x-2 sm:text-sm">
                {visibleTags.map((tag) => (
                  <span key={tag}>#{tag.replace(/^#/, "").replace(/\s+/g, "_")}</span>
                ))}
              </div>
            )}
            {relativeTime(course.last_updated) && (
              <span className="ml-auto shrink-0 text-[9px] font-semibold text-cool-400 sm:text-xs">
                {relativeTime(course.last_updated)}
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="px-2 pb-2 sm:px-3 sm:pb-3 md:px-4 md:pb-4">
        {course.external_url ? (
          <a
            href={profile ? course.external_url : "#"}
            target={profile ? "_blank" : undefined}
            rel={profile ? "noopener noreferrer" : undefined}
            onClick={(e) => {
              e.stopPropagation();
              if (!profile) navigate(`/signup?redirect=/course/${course.slug}`);
            }}
            className="flex h-8 w-full items-center justify-center gap-1 rounded-xl bg-[#10CDB2] px-3 text-[10px] font-extrabold text-white transition hover:bg-mint-700 sm:h-10 sm:gap-2 sm:px-4 sm:text-sm md:h-12"
          >
            Enroll Now <ExternalLink size={12} className="sm:size-4" />
          </a>
        ) : (
          <Link
            to={`/course/${course.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="flex h-8 w-full items-center justify-center gap-1 rounded-xl bg-[#10CDB2] text-[10px] font-extrabold text-white transition hover:bg-mint-700 sm:h-10 sm:gap-2 sm:px-4 sm:text-sm md:h-12"
          >
            View course <ExternalLink size={12} className="sm:size-4" />
          </Link>
        )}
      </div>
    </div>
  );
});
