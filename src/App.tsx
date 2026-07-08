import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CourseProvider } from "@/context/CourseContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Marketplace } from "@/pages/Marketplace";
import { CourseDetail } from "@/pages/CourseDetail";
import { Wishlist } from "@/pages/Wishlist";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import { Dashboard } from "@/pages/Dashboard";
import { Admin } from "@/pages/Admin";
import { Publish } from "@/pages/Publish";
import { NotFound } from "@/pages/NotFound";

function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-cool-200 border-t-[#10CDB2]" />
          <p className="text-sm font-medium text-cool-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/course/:slug" element={<CourseDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CourseProvider>
          <AppRoutes />
        </CourseProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}
