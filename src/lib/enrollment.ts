import type { Course, EnrolledCourse } from "./types";
import { supabase, isSupabaseConfigured } from "./supabase";

const STORAGE_KEY = "curio_enrollments_v1";

export function enrollInCourses(items: Course[]) {
  if (isSupabaseConfigured) {
    void supabase.auth.getSession().then(({ data }) => {
      const userId = data.session?.user.id;
      if (!userId) return;
      const rows = items.map((c) => ({ user_id: userId, course_id: c.id, progress_percent: 0 }));
      void supabase.from("enrollments").insert(rows);
    });
    return;
  }

  const existing = getLocalEnrollments();
  const now = new Date().toISOString();
  const merged = [
    ...existing.filter((e) => !items.some((i) => i.id === e.course.id)),
    ...items.map((course) => ({ course, progress_percent: 0, enrolled_at: now })),
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
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
