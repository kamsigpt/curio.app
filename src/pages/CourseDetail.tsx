import { useState } from "react";
import { Link, useNavigate, useParams, type NavigateFunction } from "react-router-dom";
import {
  BarChart,
  Check,
  ChevronDown,
  Clock,
  ExternalLink,
  Globe,
  PlayCircle,
  ShoppingCart,
  Star,
  Users,
} from "lucide-react";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { CourseThumb } from "@/components/ui/CourseThumb";
import { CourseCard } from "@/components/ui/CourseCard";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCourses } from "@/context/CourseContext";
import { formatPrice, totalLessons } from "@/lib/utils";
import type { Course } from "@/lib/types";

export function CourseDetail() {
  const { slug } = useParams();
  const { courses } = useCourses();
  const course = slug ? courses.find((item) => item.slug === slug) : undefined;
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { toggleItem, isWishlisted } = useWishlist();
  const [openSection, setOpenSection] = useState<string | null>(null);

  if (!course) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">Course not found</h1>
        <p className="mt-2 text-sm text-cool-500">It may have been removed or the link is incorrect.</p>
        <Link to="/marketplace" className="mt-6 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white">
          Browse courses
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(course.id);
  const related = courses
    .filter((item) => item.id !== course.id && item.category.slug === course.category.slug)
    .slice(0, 4);

  function handleToggleWishlist() {
    if (!profile) { navigate(`/signup?redirect=/course/${course!.slug}`); return; }
    toggleItem(course!);
  }

  return (
    <div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="space-y-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-cool-500">
              <Link to="/marketplace" className="hover:text-mint-700">
                Courses
              </Link>
              <span>/</span>
              <Link to={`/marketplace?category=${course.category.slug}`} className="hover:text-mint-700">
                {course.category.name}
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Badge tone="outline">{course.provider}</Badge>
              {course.bestseller && <Badge tone="mint">Bestseller</Badge>}
              {course.is_new && <Badge tone="amber">New</Badge>}
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl lg:text-4xl">
              {course.title}
            </h1>
            <p className="mt-3 text-base text-cool-500">{course.subtitle || course.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              {course.rating > 0 && <Rating value={course.rating} count={course.rating_count} />}
              {course.student_count > 0 && (
                <span className="flex items-center gap-1.5 text-cool-500">
                  <Users size={15} /> {course.student_count.toLocaleString()} students
                </span>
              )}
            </div>
            <p className="mt-3 text-sm text-cool-500">
              Created by <span className="font-semibold text-ink">{course.instructor.name}</span>
              {course.instructor.headline ? ` - ${course.instructor.headline}` : ""}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-cool-500">
              {course.duration_hours > 0 && (
                <span className="flex items-center gap-1.5">
                  <Clock size={15} /> {course.duration_hours} hours total
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <BarChart size={15} /> {course.level}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe size={15} /> {course.language}
              </span>
            </div>
          </div>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">What you'll learn</h2>
            {course.what_you_will_learn.length > 0 ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {course.what_you_will_learn.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-cool-700">
                    <Check size={16} className="mt-0.5 shrink-0 text-mint-600" />
                    {item}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-cool-700">{course.subtitle || course.description}</p>
            )}
          </section>

          {course.curriculum.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-bold text-ink">Course content</h2>
              <p className="mt-1 text-sm text-cool-500">
                {course.curriculum.length} sections - {totalLessons(course)} lessons - {course.duration_hours}h total
              </p>
              <div className="mt-4 divide-y divide-cool-100 rounded-2xl border border-cool-100">
                {course.curriculum.map((section) => {
                  const open = openSection === section.id;
                  return (
                    <div key={section.id}>
                      <button
                        onClick={() => setOpenSection(open ? null : section.id)}
                        className="flex w-full items-center justify-between px-5 py-4 text-left"
                      >
                        <span className="font-medium text-ink">{section.title}</span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-cool-400 transition-transform ${open ? "rotate-180" : ""}`}
                        />
                      </button>
                      {open && (
                        <div className="space-y-2 px-5 pb-4">
                          {section.lessons.map((lesson) => (
                            <div key={lesson.id} className="flex items-center justify-between text-sm text-cool-600">
                              <span className="flex items-center gap-2">
                                <PlayCircle size={14} className="text-cool-400" />
                                {lesson.title}
                                {lesson.is_preview && <Badge tone="mint">Preview</Badge>}
                              </span>
                              <span className="text-xs text-cool-400">{lesson.duration_minutes} min</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {course.requirements.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-bold text-ink">Requirements</h2>
              <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-cool-700">
                {course.requirements.map((req) => (
                  <li key={req}>{req}</li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2 className="font-display text-xl font-bold text-ink">Description</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-cool-700">{course.description || course.subtitle}</p>
          </section>

          <section className="rounded-2xl border border-cool-100 p-6">
            <div className="flex items-center gap-4">
              <CourseThumb seed={course.instructor.id} categoryIcon={course.category.icon} className="h-16 w-16 rounded-xl" />
              <div>
                <p className="text-xs uppercase tracking-wide text-cool-400">Instructor</p>
                <h3 className="font-display text-lg font-bold text-ink">{course.instructor.name}</h3>
                {course.instructor.headline && <p className="text-sm text-cool-500">{course.instructor.headline}</p>}
              </div>
            </div>
            {course.instructor.bio && <p className="mt-4 text-sm leading-relaxed text-cool-700">{course.instructor.bio}</p>}
            {course.instructor.rating && (
              <div className="mt-4 flex flex-wrap gap-6 text-sm text-cool-600">
                <span>{course.instructor.rating} instructor rating</span>
                <span>{course.instructor.student_count?.toLocaleString()} students</span>
                <span>{course.instructor.course_count} courses</span>
              </div>
            )}
          </section>

          {course.reviews.length > 0 && (
            <section>
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-ink">Student reviews</h2>
                <Rating value={course.rating} count={course.rating_count} size="md" />
              </div>
              <div className="mt-5 space-y-5">
                {course.reviews.map((review) => (
                  <div key={review.id} className="rounded-2xl border border-cool-100 p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-ink">{review.user_name}</p>
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < review.rating ? "currentColor" : "none"}
                            className={i >= review.rating ? "text-cool-200" : ""}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-cool-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <PurchaseCard course={course} wishlisted={wishlisted} profile={profile} onToggleWishlist={handleToggleWishlist} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink">More in {course.category.name}</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <CourseCard key={item.id} course={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function PurchaseCard({
  course,
  wishlisted,
  profile,
  onToggleWishlist,
}: {
  course: Course;
  wishlisted: boolean;
  profile: any;
  onToggleWishlist: () => void;
}) {
  const navigate = useNavigate();
  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <div className="overflow-hidden rounded-2xl border border-cool-100 bg-white text-ink shadow-cardHover">
        <CourseThumb seed={course.id} categoryIcon={course.category.icon} imageUrl={course.thumbnail_url} alt={course.title} className="h-44 w-full" />
        <div className="p-5">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold">{formatPrice(course.price)}</span>
            {course.original_price && (
              <span className="text-sm text-cool-400 line-through">{formatPrice(course.original_price)}</span>
            )}
          </div>
          {course.original_price && (
            <p className="mt-1 text-xs font-semibold text-mint-700">
              {Math.round(100 - (course.price / course.original_price) * 100)}% off - limited time
            </p>
          )}

          {course.external_url ? (
            <a
              href={profile ? course.external_url : "#"}
              target={profile ? "_blank" : undefined}
              rel={profile ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                if (!profile) { e.preventDefault(); navigate(`/signup?redirect=/course/${course.slug}`); }
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-mint-500 py-3 text-sm font-semibold text-ink transition hover:bg-mint-600"
            >
              Open course <ExternalLink size={16} />
            </a>
          ) : (
            <button
              onClick={onToggleWishlist}
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition ${
                wishlisted
                  ? "bg-mint-100 text-mint-700 border border-mint-300"
                  : "bg-mint-500 text-ink hover:bg-mint-600"
              }`}
            >
              <Star size={16} className={wishlisted ? "fill-mint-700" : ""} />
              {wishlisted ? "Wishlisted" : "Add to wishlist"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
