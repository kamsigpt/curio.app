import type { Course } from "./types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export function formatPrice(amount: number, currency = "USD"): string {
  if (amount === 0) return "Free";
  try {
    return new Intl.NumberFormat("en", { style: "currency", currency }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

export function courseDestination(course: Course): string | null {
  for (const value of [course.affiliate_url, course.external_url, course.canonical_url]) {
    if (!value) continue;
    try {
      const url = new URL(value);
      if (url.protocol === "https:") return url.toString();
    } catch {
      // Try the stored canonical provider URL if an affiliate URL is malformed.
    }
  }
  return null;
}

export function usesAffiliateDestination(course: Course): boolean {
  if (!course.affiliate_url) return false;
  try {
    return courseDestination(course) === new URL(course.affiliate_url).toString();
  } catch {
    return false;
  }
}

export function recordOutboundClick(course: Course): void {
  if (!isSupabaseConfigured) return;
  void supabase.from("outbound_clicks").insert({
    course_id: course.id,
    provider: course.provider,
    is_affiliate: usesAffiliateDestination(course),
  }).then(({ error }) => {
    if (error) console.warn("Outbound click could not be recorded:", error.message);
  });
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
