import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AuthProvider } from "@/context/AuthContext";
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

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CourseProvider>
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
        </CourseProvider>
        </WishlistProvider>
    </AuthProvider>
  );
}
