import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Course } from "@/lib/types";
import { courses as mockCourses } from "@/data/mockData";

interface CourseContextValue {
  courses: Course[];
  addCourse: (course: Course) => void;
}

const CourseContext = createContext<CourseContextValue | undefined>(undefined);
const STORAGE_KEY = "curio_submitted_courses_v1";

export function CourseProvider({ children }: { children: ReactNode }) {
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

  const courses = [...mockCourses, ...submitted];

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
