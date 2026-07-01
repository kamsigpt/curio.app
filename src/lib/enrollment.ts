import type { Course, EnrolledCourse } from "./types";
import { supabase, isSupabaseConfigured } from "./supabase";
import { openPaystackPopup } from "./paystack";

const BOOST_KEY = "curio_boosted_courses_v1";

export function boostCourses(email: string, onProcessing: (v: boolean) => void) {
  onProcessing(true);
  openPaystackPopup({
    email,
    amount: 10,
    onSuccess() {
      void applyBoost();
      onProcessing(false);
    },
    onClose() {
      onProcessing(false);
    },
  });
}

async function applyBoost() {
  if (isSupabaseConfigured) {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user.id;
    if (!userId) return;

    const { data: instructor } = await supabase
      .from("instructors")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (instructor) {
      const now = new Date();
      const until = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
      await supabase
        .from("courses")
        .update({ boosted_until: until })
        .eq("instructor_id", instructor.id);
    }
    return;
  }

  const boosted = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  localStorage.setItem(BOOST_KEY, boosted);
}

export function getBoostedUntil(): string | null {
  try {
    return localStorage.getItem(BOOST_KEY);
  } catch {
    return null;
  }
}

export function isBoosted(boosted_until?: string | null): boolean {
  if (!boosted_until) return false;
  return new Date(boosted_until).getTime() > Date.now();
}

const STORAGE_KEY = "curio_enrollments_v1";

export function enrollInCourses(items: Course[]) {
  if (isSupabaseConfigured) {
    void supabase.auth.getSession().then(({ data }) => {
      const userId = data.session?.user.id;
      if (!userId) return;
      const rows = items.map((c) => ({
        user_id: userId,
        course_id: c.id,
        progress_percent: 0,
        is_featured: true,
      }));
      void supabase.from("enrollments").upsert(rows, { onConflict: "user_id,course_id" });
    });
    return;
  }

  const existing = getLocalEnrollments();
  const now = new Date().toISOString();
  const merged = [
    ...existing.filter((e) => !items.some((i) => i.id === e.course.id)),
    ...items.map((course) => ({ course, progress_percent: 0, enrolled_at: now, is_featured: true })),
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
}

export async function fetchEnrolledCourses(): Promise<EnrolledCourse[]> {
  if (isSupabaseConfigured) {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user.id;
    if (!userId) return [];

    const { data } = await supabase
      .from("enrollments")
      .select("*, course:courses(*, instructor:instructors(*), category:categories(*))")
      .eq("user_id", userId);

    if (!data) return [];

    return data.map((row: Record<string, unknown>) => {
      const courseRaw = row.course as Record<string, unknown>;
      return {
        course: {
          ...(courseRaw as unknown as Course),
          instructor: courseRaw.instructor as Course["instructor"],
          category: courseRaw.category as Course["category"],
        },
        progress_percent: (row.progress_percent as number) ?? 0,
        enrolled_at: (row.enrolled_at as string) ?? "",
        last_accessed: row.last_accessed as string | undefined,
        is_featured: (row as Record<string, unknown>).is_featured as boolean ?? false,
      } as EnrolledCourse;
    });
  }

  return getLocalEnrollments();
}

function getLocalEnrollments(): EnrolledCourse[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as EnrolledCourse[]) : [];
  } catch {
    return [];
  }
}

export function getLocalEnrolledCourses(): EnrolledCourse[] {
  return getLocalEnrollments();
}
