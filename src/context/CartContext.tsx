import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Course } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";

interface CartContextValue {
  items: Course[];
  addItem: (course: Course) => void;
  removeItem: (courseId: string) => void;
  isInCart: (courseId: string) => boolean;
  clear: () => void;
  subtotal: number;
  savings: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "curio_cart_v1";

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

export function CartProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const userId = session?.user?.id;

  const [items, setItems] = useState<Course[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Course[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (!userId) return;
    const timer = setTimeout(() => {
      void syncToSupabase(
        userId,
        items.map((c) => c.id)
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [userId, items]);

  function addItem(course: Course) {
    setItems((prev) => (prev.some((c) => c.id === course.id) ? prev : [...prev, course]));
  }

  function removeItem(courseId: string) {
    setItems((prev) => prev.filter((c) => c.id !== courseId));
  }

  function isInCart(courseId: string) {
    return items.some((c) => c.id === courseId);
  }

  function clear() {
    setItems([]);
  }

  const subtotal = useMemo(() => items.reduce((sum, c) => sum + c.price, 0), [items]);
  const savings = useMemo(
    () => items.reduce((sum, c) => sum + ((c.original_price ?? c.price) - c.price), 0),
    [items]
  );

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, isInCart, clear, subtotal, savings }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
