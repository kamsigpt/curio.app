import type { Course } from "./types";

export function formatPrice(amount: number): string {
  if (amount === 0) return "Free";
  return `$${amount.toFixed(2)}`;
}

export function formatCompactNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

export function totalLessons(course: Course): number {
  return course.curriculum.reduce((sum, s) => sum + s.lessons.length, 0);
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
