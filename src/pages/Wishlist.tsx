import { Link, useNavigate } from "react-router-dom";
import { Trash2, Star, ExternalLink } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { CourseThumb } from "@/components/ui/CourseThumb";
import { Rating } from "@/components/ui/Rating";
import { useEffect } from "react";

export function Wishlist() {
  const { wishlist, removeItem } = useWishlist();
  const { profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) navigate("/signup?redirect=/wishlist", { replace: true });
  }, [profile]);

  if (wishlist.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <Star className="mx-auto text-cool-300" size={48} />
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">Your wishlist is empty</h1>
        <p className="mt-2 text-sm text-cool-500">Save courses you're interested in and come back to them later.</p>
        <Link to="/marketplace" className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-mint-600 hover:text-ink">
          Browse courses
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Your wishlist</h1>
      <p className="mt-1 text-sm text-cool-500">{wishlist.length} saved course{wishlist.length > 1 ? "s" : ""}</p>

      <div className="mt-8 space-y-4">
        {wishlist.map((course) => (
          <div key={course.id} className="flex gap-4 rounded-2xl border border-cool-100 p-4">
            <CourseThumb seed={course.id} categoryIcon={course.category.icon} className="h-20 w-28 shrink-0 rounded-xl" />
            <div className="flex-1">
              <Link to={`/course/${course.slug}`} className="font-display font-semibold text-ink hover:text-mint-700">
                {course.title}
              </Link>
              <p className="mt-0.5 text-xs text-cool-500">{course.instructor.name} · {course.provider}</p>
              {course.rating > 0 && (
                <div className="mt-1.5">
                  <Rating value={course.rating} count={course.rating_count} />
                </div>
              )}
            </div>
            <div className="flex flex-col items-end justify-between">
              {course.external_url ? (
                <a
                  href={course.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 rounded-full bg-[#10CDB2] px-3 py-1 text-xs font-semibold text-white transition hover:bg-[#0BA391]"
                >
                  <ExternalLink size={12} /> Enroll
                </a>
              ) : (
                <Link
                  to={`/course/${course.slug}`}
                  className="flex items-center gap-1 rounded-full bg-[#10CDB2] px-3 py-1 text-xs font-semibold text-white transition hover:bg-[#0BA391]"
                >
                  View course
                </Link>
              )}
              <button
                onClick={() => removeItem(course.id)}
                className="flex items-center gap-1 text-xs font-medium text-cool-500 hover:text-red-600"
              >
                <Trash2 size={13} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
