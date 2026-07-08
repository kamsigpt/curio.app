import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Course } from "@/lib/types";
import { supabase } from "@/lib/supabase";

interface CourseContextValue {
  courses: Course[];
  addCourse: (course: Course) => void;
}

const CourseContext = createContext<CourseContextValue | undefined>(undefined);
const STORAGE_KEY = "curio_submitted_courses_v2";

async function fetchCourses(): Promise<Course[]> {
  const { data } = await supabase
    .from("courses")
    .select("*, instructor:instructors(*), category:categories(*)");
  if (!data || data.length === 0) return [];
  return data.map((row: Record<string, unknown>) => ({
    ...(row as any),
    instructor: row.instructor as Course["instructor"],
    category: row.category as Course["category"],
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
    fetchCourses().then(setSupabaseCourses);
  }, []);

  const displayCourses = supabaseCourses ?? [];
  const courses = [...displayCourses, ...submitted].filter(
    (c) => !c.tags?.some((t) => t.toLowerCase() === "telegram")
  );

  function addCourse(course: Course) {
    setSubmitted((prev) => [...prev, course]);
  }

  return (
    <CourseContext.Provider value={{ courses, addCourse }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourses must be used within a CourseProvider");
  return ctx;
}
