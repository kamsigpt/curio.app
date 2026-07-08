import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Course } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";

interface WishlistContextValue {
  wishlist: Course[];
  toggleItem: (course: Course) => void;
  removeItem: (courseId: string) => void;
  isWishlisted: (courseId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);
const STORAGE_KEY = "curio_wishlist_v1";

async function syncToSupabase(userId: string, courseIds: string[]) {
  const { data: existing } = await supabase
    .from("cart_items")
    .select("course_id")
    .eq("user_id", userId);
  const existingIds = existing?.map((r) => r.course_id) ?? [];
  const toAdd = courseIds.filter((id) => !existingIds.includes(id));
  const toRemove = existingIds.filter((id) => !courseIds.includes(id));
  if (toRemove.length > 0) {
    await supabase.from("cart_items").delete().eq("user_id", userId).in("course_id", toRemove);
  }
  if (toAdd.length > 0) {
    await supabase.from("cart_items").insert(toAdd.map((course_id) => ({ user_id: userId, course_id })));
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const userId = session?.user?.id;

  const [wishlist, setWishlist] = useState<Course[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Course[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (!userId) return;
    const timer = setTimeout(() => {
      void syncToSupabase(
        userId,
        wishlist.map((c) => c.id)
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [userId, wishlist]);

  function toggleItem(course: Course) {
    setWishlist((prev) =>
      prev.some((c) => c.id === course.id)
        ? prev.filter((c) => c.id !== course.id)
        : [...prev, course]
    );
  }

  function removeItem(courseId: string) {
    setWishlist((prev) => prev.filter((c) => c.id !== courseId));
  }

  function isWishlisted(courseId: string) {
    return wishlist.some((c) => c.id === courseId);
  }

  function clearWishlist() {
    setWishlist([]);
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggleItem, removeItem, isWishlisted, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
