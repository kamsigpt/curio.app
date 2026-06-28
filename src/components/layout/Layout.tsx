import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const hide = pathname === "/login" || pathname === "/signup";

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fffd]">
      {!hide && <Navbar />}
      <main className="flex-1">{children}</main>
      {!hide && <Footer />}
    </div>
  );
}
