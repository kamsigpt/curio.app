import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Course } from "@/lib/types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface CourseContextValue {
  courses: Course[];
  addCourse: (course: Course) => void;
  loading: boolean;
}

const CourseContext = createContext<CourseContextValue | undefined>(undefined);
const STORAGE_KEY = "curio_submitted_courses_v2";

async function fetchCourses(): Promise<Course[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase.from("courses").select("*");
  if (error) { console.warn("Supabase fetch error:", error); return []; }
  if (!data || data.length === 0) return [];
  return data.map((row: Record<string, unknown>) => ({
    ...(row as any),
    instructor:
      typeof row.instructor === "object" && row.instructor
        ? (row.instructor as Course["instructor"])
        : { id: "unknown", name: "Instructor", headline: "", avatar_url: "" },
    category:
      typeof row.category === "object" && row.category
        ? (row.category as Course["category"])
        : { id: "unknown", name: "Course", slug: "course", icon: "BookOpen" },
    curriculum: (row.curriculum ?? []) as Course["curriculum"],
    tags: (row.tags ?? []) as Course["tags"],
    what_you_will_learn: (row.what_you_will_learn ?? []) as Course["what_you_will_learn"],
    requirements: (row.requirements ?? []) as Course["requirements"],
    reviews: [],
    last_updated: ((row.updated_at ?? row.created_at ?? "") as string),
  })) as Course[];
}

export function CourseProvider({ children }: { children: ReactNode }) {
  const [supabaseCourses, setSupabaseCourses] = useState<Course[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState<Course[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Course[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submitted));
  }, [submitted]);

  useEffect(() => {
    fetchCourses()
      .then((data) => { setSupabaseCourses(data); setLoading(false); })
      .catch(() => { setLoading(false); });
    const interval = setInterval(() => {
      fetchCourses().then(setSupabaseCourses).catch(() => {});
    }, 3600000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setDate(midnight.getDate() + 1);
    midnight.setHours(0, 0, 0, 0);
    const msUntilMidnight = midnight.getTime() - now.getTime();

    const timer = setTimeout(() => {
      const today = new Date().toISOString().split("T")[0];
      setSubmitted((prev) =>
        prev.map((c) => {
          if (!c.is_new) return c;
          if (c.last_updated && c.last_updated !== today) {
            return { ...c, is_new: false };
          }
          return c;
        })
      );
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  const courses = [...(supabaseCourses ?? []), ...submitted];

  function addCourse(course: Course) {
    setSubmitted((prev) => [...prev, course]);
  }

  return (
    <CourseContext.Provider value={{ courses, addCourse, loading }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourses must be used within a CourseProvider");
  return ctx;
}
