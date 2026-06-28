import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Shield, CheckCircle2, XCircle, DollarSign, Users, BookOpen, BarChart3, Plus, Trash2, ExternalLink, FileText, UserCog, Settings, GraduationCap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCourses } from "@/context/CourseContext";
import { formatPrice } from "@/lib/utils";
import { courses as mockCourses } from "@/data/mockData";
import { categories } from "@/data/mockData";
import type { AdminPermission, Course, Level } from "@/lib/types";
import { ADMIN_PERMISSIONS_LIST, SUPER_ADMIN_EMAIL } from "@/lib/types";

type Tab = "overview" | "create" | "pricing" | "requests" | "admins";

const TAB_ICONS: Record<Tab, typeof Shield> = {
  overview: BarChart3,
  create: GraduationCap,
  pricing: DollarSign,
  requests: FileText,
  admins: UserCog,
};

const TAB_PERMISSION: Record<Tab, AdminPermission | null> = {
  overview: null,
  create: "create_courses",
  pricing: "manage_pricing",
  requests: "approve_courses",
  admins: "manage_admins",
};

const LEVELS: Level[] = ["Beginner", "Intermediate", "Advanced", "All Levels"];
const PROVIDER_OPTIONS = ["Udemy", "Skillshare", "Coursera", "Independent Tutor", "YouTube", "Other"];

function generateId() {
  return `admin-course-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function Admin() {
  const { profile, signOut, adminEmails, addAdmin, removeAdmin, getAdminPermissions, setAdminPermissions, isSuperAdmin, userEmail } = useAuth();
  const { courses, addCourse } = useCourses();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [pricing, setPricing] = useState(() => {
    try {
      const raw = localStorage.getItem("curio_pricing_v1");
      return raw ? JSON.parse(raw) : { boost: 10, featured: 25, premium: 50 };
    } catch {
      return { boost: 10, featured: 25, premium: 50 };
    }
  });
  const [pricingEdit, setPricingEdit] = useState(pricing);
  const [saved, setSaved] = useState(false);
  const [approved, setApproved] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem("curio_approved_courses_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [courseForm, setCourseForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    provider: "Udemy",
    price: "",
    original_price: "",
    category: categories[0].id,
    level: "Beginner" as Level,
    language: "English",
    duration_hours: "",
    lecture_count: "",
    thumbnail_url: "",
    external_url: "",
    instructor_name: "",
    instructor_headline: "",
    instructor_bio: "",
    tags: "",
    what_you_will_learn: "",
    requirements: "",
    rating: "",
    rating_count: "",
    student_count: "",
    bestseller: false,
    is_new: true,
  });
  const [formSuccess, setFormSuccess] = useState(false);

  const published = courses.filter((c) => c.id.startsWith("submitted-"));
  const pending = published.filter((c) => !approved.includes(c.id));
  const totalRevenue = useMemo(
    () => mockCourses.reduce((s, c) => s + c.price, 0) + approved.length * 10,
    [approved.length]
  );

  const allowedTabs = useMemo(() => {
    const perms = getAdminPermissions(userEmail);
    return (Object.keys(TAB_PERMISSION) as Tab[]).filter((tab) => {
      const needed = TAB_PERMISSION[tab];
      return !needed || perms.includes(needed);
    });
  }, [userEmail, getAdminPermissions]);

  useEffect(() => {
    if (!allowedTabs.includes(activeTab)) {
      setActiveTab(allowedTabs[0] ?? "overview");
    }
  }, [allowedTabs, activeTab]);

  function handleSavePricing() {
    setPricing(pricingEdit);
    localStorage.setItem("curio_pricing_v1", JSON.stringify(pricingEdit));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleApprove(id: string) {
    const updated = [...approved, id];
    setApproved(updated);
    localStorage.setItem("curio_approved_courses_v1", JSON.stringify(updated));
  }

  function handleReject(id: string) {
    const updated = approved.filter((a) => a !== id);
    setApproved(updated);
    localStorage.setItem("curio_approved_courses_v1", JSON.stringify(updated));
  }

  function handleAddAdmin() {
    const email = newAdminEmail.trim();
    if (email && !adminEmails.includes(email) && !isSuperAdmin(email)) {
      addAdmin(email);
      setNewAdminEmail("");
    }
  }

  function handleCreateCourse(e: React.FormEvent) {
    e.preventDefault();
    const f = courseForm;
    const price = parseFloat(f.price) || 0;
    const cat = categories.find((c) => c.id === f.category) ?? categories[0];
    const instructor = {
      id: `ins-admin-${Date.now()}`,
      name: f.instructor_name || "Curio Admin",
      headline: f.instructor_headline || "Instructor",
      avatar_url: "",
      bio: f.instructor_bio || "",
    };
    const learnItems = f.what_you_will_learn.split("\n").filter(Boolean);
    const reqItems = f.requirements.split("\n").filter(Boolean);
    const tagList = f.tags.split(",").map((t) => t.trim()).filter(Boolean);
    const dur = parseFloat(f.duration_hours) || 0;
    const lect = parseInt(f.lecture_count) || 0;

    const newCourse: Course = {
      id: generateId(),
      slug: slugify(f.title),
      title: f.title,
      subtitle: f.subtitle || f.description.slice(0, 120),
      description: f.description,
      thumbnail_url: f.thumbnail_url || "default",
      provider: f.provider,
      external_url: f.external_url || undefined,
      instructor,
      category: cat,
      level: f.level,
      language: f.language,
      price,
      original_price: f.original_price ? parseFloat(f.original_price) : undefined,
      rating: parseFloat(f.rating) || 0,
      rating_count: parseInt(f.rating_count) || 0,
      student_count: parseInt(f.student_count) || 0,
      duration_hours: dur,
      lecture_count: lect,
      last_updated: new Date().toISOString().split("T")[0],
      bestseller: f.bestseller,
      is_new: f.is_new,
      tags: tagList,
      curriculum: [],
      reviews: [],
      what_you_will_learn: learnItems,
      requirements: reqItems,
    };

    addCourse(newCourse);
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 5000);
    setCourseForm({
      title: "",
      subtitle: "",
      description: "",
      provider: "Udemy",
      price: "",
      original_price: "",
      category: categories[0].id,
      level: "Beginner",
      language: "English",
      duration_hours: "",
      lecture_count: "",
      thumbnail_url: "",
      external_url: "",
      instructor_name: "",
      instructor_headline: "",
      instructor_bio: "",
      tags: "",
      what_you_will_learn: "",
      requirements: "",
      rating: "",
      rating_count: "",
      student_count: "",
      bestseller: false,
      is_new: true,
    });
  }

  function handlePermissionToggle(email: string, perm: AdminPermission) {
    const current = getAdminPermissions(email);
    const updated = current.includes(perm)
      ? current.filter((p) => p !== perm)
      : [...current, perm];
    setAdminPermissions(email, updated);
  }

  if (!profile?.is_admin) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <Shield size={40} className="mx-auto text-cool-300" />
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">Access Denied</h1>
        <p className="mt-1 text-sm text-cool-500">You need admin credentials to access this page.</p>
        <Link to="/login" className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">
          Log in as Admin
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-1 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Admin</h1>
          <p className="mt-0.5 text-sm text-cool-500">Manage platform settings, pricing, and requests.</p>
        </div>
        <button
          onClick={signOut}
          className="rounded-full border border-cool-100 px-5 py-2.5 text-sm font-medium text-cool-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          Sign out
        </button>
      </div>

      <div className="mt-6 flex gap-1 overflow-x-auto rounded-2xl border border-cool-100 bg-cool-50 p-1">
        {allowedTabs.map((tab) => {
          const Icon = TAB_ICONS[tab];
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-white text-ink shadow-sm"
                  : "text-cool-500 hover:text-ink"
              }`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
            </button>
          );
        })}
      </div>

      {activeTab === "overview" && (
        <>
          {formSuccess && (
            <div className="mt-6 rounded-xl border border-mint-200 bg-mint-50 p-4 text-sm font-medium text-mint-800 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-mint-600" />
              Course created successfully! It's now live in the marketplace.
            </div>
          )}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-cool-100 bg-white p-4">
              <BookOpen size={20} className="text-[#10CDB2]" />
              <p className="mt-3 font-display text-2xl font-bold text-ink">{courses.length}</p>
              <p className="text-xs text-cool-500">Total courses</p>
            </div>
            <div className="rounded-2xl border border-cool-100 bg-white p-4">
              <BarChart3 size={20} className="text-[#10CDB2]" />
              <p className="mt-3 font-display text-2xl font-bold text-ink">{pending.length}</p>
              <p className="text-xs text-cool-500">Pending approvals</p>
            </div>
            <div className="rounded-2xl border border-cool-100 bg-white p-4">
              <Users size={20} className="text-[#10CDB2]" />
              <p className="mt-3 font-display text-2xl font-bold text-ink">{adminEmails.length + 1}</p>
              <p className="text-xs text-cool-500">Admins</p>
            </div>
            <div className="rounded-2xl border border-cool-100 bg-white p-4">
              <DollarSign size={20} className="text-[#10CDB2]" />
              <p className="mt-3 font-display text-2xl font-bold text-ink">{formatPrice(totalRevenue)}</p>
              <p className="text-xs text-cool-500">Est. revenue</p>
            </div>
          </div>

          {pending.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-4 font-display text-lg font-semibold text-ink">Pending Requests</h2>
              <div className="space-y-3">
                {pending.slice(0, 5).map((course) => (
                  <div key={course.id} className="flex items-center justify-between rounded-2xl border border-cool-100 bg-white p-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-cool-400">{course.provider}</span>
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">Pending</span>
                      </div>
                      <h3 className="mt-0.5 font-display font-semibold text-ink line-clamp-1">{course.title}</h3>
                      <p className="mt-0.5 text-xs text-cool-500">{course.instructor.name} · {formatPrice(course.price)} · {course.category.name}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 pl-4">
                      <button onClick={() => handleReject(course.id)} className="flex items-center gap-1 rounded-full border border-red-100 px-3.5 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"><XCircle size={13} /> Reject</button>
                      <button onClick={() => handleApprove(course.id)} className="flex items-center gap-1 rounded-full bg-[#10CDB2] px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#0BA391]"><CheckCircle2 size={13} /> Approve</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === "create" && (
        <div className="mt-6 rounded-2xl border border-cool-100 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Create Course</h2>
          <p className="mt-1 text-sm text-cool-500">Fill in the details below to create a new course.</p>

          {formSuccess && (
            <div className="mt-4 rounded-xl border border-mint-200 bg-mint-50 p-4 text-sm font-medium text-mint-800 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-mint-600" />
              Course created successfully! It's now live in the marketplace.
            </div>
          )}

          <form onSubmit={handleCreateCourse} className="mt-6 space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-cool-700">Title *</label>
                <input required value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]" placeholder="e.g. Modern JavaScript" />
              </div>
              <div>
                <label className="text-xs font-semibold text-cool-700">Subtitle</label>
                <input value={courseForm.subtitle} onChange={(e) => setCourseForm({ ...courseForm, subtitle: e.target.value })} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]" placeholder="Short tagline for the course" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-cool-700">Description *</label>
              <textarea required value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} rows={4} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]" placeholder="Full course description" />
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="text-xs font-semibold text-cool-700">Provider *</label>
                <select value={courseForm.provider} onChange={(e) => setCourseForm({ ...courseForm, provider: e.target.value })} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]">
                  {PROVIDER_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-cool-700">Category *</label>
                <select value={courseForm.category} onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]">
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-cool-700">Level</label>
                <select value={courseForm.level} onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value as Level })} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]">
                  {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-4">
              <div>
                <label className="text-xs font-semibold text-cool-700">Price ($) *</label>
                <input type="number" min={0} step="0.01" required value={courseForm.price} onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]" placeholder="0 = free" />
              </div>
              <div>
                <label className="text-xs font-semibold text-cool-700">Original Price ($)</label>
                <input type="number" min={0} step="0.01" value={courseForm.original_price} onChange={(e) => setCourseForm({ ...courseForm, original_price: e.target.value })} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]" placeholder="For discount display" />
              </div>
              <div>
                <label className="text-xs font-semibold text-cool-700">Duration (hours)</label>
                <input type="number" min={0} step="0.5" value={courseForm.duration_hours} onChange={(e) => setCourseForm({ ...courseForm, duration_hours: e.target.value })} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]" placeholder="e.g. 12" />
              </div>
              <div>
                <label className="text-xs font-semibold text-cool-700">Lecture count</label>
                <input type="number" min={0} value={courseForm.lecture_count} onChange={(e) => setCourseForm({ ...courseForm, lecture_count: e.target.value })} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]" placeholder="e.g. 48" />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-cool-700">External URL</label>
                <input value={courseForm.external_url} onChange={(e) => setCourseForm({ ...courseForm, external_url: e.target.value })} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]" placeholder="https://udemy.com/course/..." />
              </div>
              <div>
                <label className="text-xs font-semibold text-cool-700">Thumbnail URL</label>
                <input value={courseForm.thumbnail_url} onChange={(e) => setCourseForm({ ...courseForm, thumbnail_url: e.target.value })} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]" placeholder="Leave blank for default" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-cool-700">Language</label>
              <input value={courseForm.language} onChange={(e) => setCourseForm({ ...courseForm, language: e.target.value })} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]" placeholder="e.g. English" />
            </div>

            <div className="grid gap-5 sm:grid-cols-4">
              <div>
                <label className="text-xs font-semibold text-cool-700">Rating (0-5)</label>
                <input type="number" min={0} max={5} step="0.1" value={courseForm.rating} onChange={(e) => setCourseForm({ ...courseForm, rating: e.target.value })} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]" placeholder="e.g. 4.5" />
              </div>
              <div>
                <label className="text-xs font-semibold text-cool-700">Rating count</label>
                <input type="number" min={0} value={courseForm.rating_count} onChange={(e) => setCourseForm({ ...courseForm, rating_count: e.target.value })} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]" placeholder="e.g. 1200" />
              </div>
              <div>
                <label className="text-xs font-semibold text-cool-700">Student count</label>
                <input type="number" min={0} value={courseForm.student_count} onChange={(e) => setCourseForm({ ...courseForm, student_count: e.target.value })} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]" placeholder="e.g. 5000" />
              </div>
              <div className="flex items-end gap-4 pb-2.5">
                <label className="flex items-center gap-2 text-sm text-cool-700">
                  <input type="checkbox" checked={courseForm.bestseller} onChange={(e) => setCourseForm({ ...courseForm, bestseller: e.target.checked })} className="h-4 w-4 rounded border-cool-300 text-[#10CDB2] focus:ring-[#10CDB2]" />
                  Bestseller
                </label>
                <label className="flex items-center gap-2 text-sm text-cool-700">
                  <input type="checkbox" checked={courseForm.is_new} onChange={(e) => setCourseForm({ ...courseForm, is_new: e.target.checked })} className="h-4 w-4 rounded border-cool-300 text-[#10CDB2] focus:ring-[#10CDB2]" />
                  New
                </label>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="text-xs font-semibold text-cool-700">Instructor name *</label>
                <input required value={courseForm.instructor_name} onChange={(e) => setCourseForm({ ...courseForm, instructor_name: e.target.value })} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]" placeholder="Full name" />
              </div>
              <div>
                <label className="text-xs font-semibold text-cool-700">Instructor headline</label>
                <input value={courseForm.instructor_headline} onChange={(e) => setCourseForm({ ...courseForm, instructor_headline: e.target.value })} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]" placeholder="e.g. Senior Engineer @ Google" />
              </div>
              <div>
                <label className="text-xs font-semibold text-cool-700">Instructor bio</label>
                <input value={courseForm.instructor_bio} onChange={(e) => setCourseForm({ ...courseForm, instructor_bio: e.target.value })} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]" placeholder="Short bio" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-cool-700">Tags (comma separated)</label>
              <input value={courseForm.tags} onChange={(e) => setCourseForm({ ...courseForm, tags: e.target.value })} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]" placeholder="React, TypeScript, Frontend" />
            </div>

            <div>
              <label className="text-xs font-semibold text-cool-700">What you'll learn (one per line)</label>
              <textarea value={courseForm.what_you_will_learn} onChange={(e) => setCourseForm({ ...courseForm, what_you_will_learn: e.target.value })} rows={4} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]" placeholder="Build real-world projects&#10;Master core concepts&#10;Learn industry best practices" />
            </div>

            <div>
              <label className="text-xs font-semibold text-cool-700">Requirements (one per line)</label>
              <textarea value={courseForm.requirements} onChange={(e) => setCourseForm({ ...courseForm, requirements: e.target.value })} rows={3} className="mt-1 w-full rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]" placeholder="Basic programming knowledge&#10;A computer with internet access" />
            </div>

            <button type="submit" className="w-full rounded-full bg-[#10CDB2] py-3 text-sm font-semibold text-white transition hover:bg-[#0BA391]">
              Create course
            </button>
          </form>
        </div>
      )}

      {activeTab === "pricing" && (
        <div className="mt-6 rounded-2xl border border-cool-100 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Pricing Cards</h2>
          <p className="mt-1 text-sm text-cool-500">Set prices for promotion tiers.</p>
          <div className="mt-4 space-y-4">
            {[
              { key: "boost", label: "Boost placement (30 days)" },
              { key: "featured", label: "Featured listing (30 days)" },
              { key: "premium", label: "Premium badge (30 days)" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="text-xs font-semibold text-cool-700">{label}</label>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-cool-400">$</span>
                  <input
                    type="number"
                    min={0}
                    value={(pricingEdit as Record<string, number>)[key]}
                    onChange={(e) => setPricingEdit({ ...pricingEdit, [key]: parseFloat(e.target.value) || 0 })}
                    className="w-24 rounded-xl border border-cool-100 px-3 py-2 text-sm outline-none focus:border-[#10CDB2]"
                  />
                </div>
              </div>
            ))}
            <button onClick={handleSavePricing} className="w-full rounded-full bg-[#10CDB2] py-2.5 text-sm font-semibold text-white transition hover:bg-[#0BA391]">
              {saved ? "Saved!" : "Save pricing"}
            </button>
          </div>
        </div>
      )}

      {activeTab === "requests" && (
        <div className="mt-6">
          <h2 className="mb-4 font-display text-lg font-semibold text-ink">Publish Requests</h2>
          {pending.length === 0 && published.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-cool-100 p-10 text-center">
              <p className="text-sm text-cool-500">No publish requests yet.</p>
            </div>
          ) : pending.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-cool-100 p-10 text-center">
              <CheckCircle2 size={28} className="mx-auto text-mint-600" />
              <p className="mt-2 text-sm font-medium text-ink">All requests have been reviewed.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pending.map((course) => (
                <div key={course.id} className="flex items-center justify-between rounded-2xl border border-cool-100 bg-white p-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-cool-400">{course.provider}</span>
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">Pending</span>
                    </div>
                    <h3 className="mt-0.5 font-display font-semibold text-ink line-clamp-1">{course.title}</h3>
                    <p className="mt-0.5 text-xs text-cool-500">{course.instructor.name} · {formatPrice(course.price)} · {course.category.name}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 pl-4">
                    <button onClick={() => handleReject(course.id)} className="flex items-center gap-1 rounded-full border border-red-100 px-3.5 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"><XCircle size={13} /> Reject</button>
                    <button onClick={() => handleApprove(course.id)} className="flex items-center gap-1 rounded-full bg-[#10CDB2] px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#0BA391]"><CheckCircle2 size={13} /> Approve</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {published.filter((c) => approved.includes(c.id)).length > 0 && (
            <div className="mt-8">
              <h2 className="mb-4 font-display text-lg font-semibold text-ink">Approved Courses</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {published.filter((c) => approved.includes(c.id)).map((course) => (
                  <div key={course.id} className="flex items-center justify-between rounded-2xl border border-mint-100 bg-mint-50/50 p-4">
                    <div>
                      <span className="rounded-full bg-mint-100 px-2 py-0.5 text-[10px] font-medium text-mint-800">Approved</span>
                      <h3 className="mt-1 font-display font-semibold text-ink line-clamp-1">{course.title}</h3>
                      <p className="text-xs text-cool-500">{course.instructor.name}</p>
                    </div>
                    <Link to={`/course/${course.slug}`} className="flex items-center gap-1 rounded-full border border-cool-100 px-3.5 py-1.5 text-xs font-medium text-ink transition hover:border-[#10CDB2]"><ExternalLink size={12} /> View</Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "admins" && (
        <div className="mt-6 space-y-6">
          <div className="rounded-2xl border border-cool-100 bg-white p-6">
            <h2 className="font-display text-lg font-semibold text-ink">Admin Management</h2>
            <p className="mt-1 text-sm text-cool-500">Add or remove admin accounts.</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-mint-50/50 border border-mint-100 px-4 py-2.5">
                <div>
                  <span className="text-sm font-semibold text-ink">{SUPER_ADMIN_EMAIL}</span>
                  <span className="ml-2 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">Super Admin</span>
                </div>
                <span className="text-xs text-cool-400">Full access</span>
              </div>
              {adminEmails.map((email) => (
                <div key={email} className="rounded-xl border border-cool-100">
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-sm text-ink">{email}</span>
                    <button onClick={() => removeAdmin(email)} className="text-cool-400 transition hover:text-red-500"><Trash2 size={15} /></button>
                  </div>
                  {getAdminPermissions(email).length > 0 && (
                    <div className="flex flex-wrap gap-1.5 border-t border-cool-100 px-4 py-2">
                      {getAdminPermissions(email).map((p) => (
                        <span key={p} className="rounded-full bg-cool-50 px-2 py-0.5 text-[10px] font-medium text-cool-600">{p.replace(/_/g, " ")}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex gap-2">
                <input type="email" value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)} placeholder="newadmin@email.com" className="flex-1 rounded-xl border border-cool-100 px-4 py-2.5 text-sm outline-none focus:border-[#10CDB2]" />
                <button onClick={handleAddAdmin} className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#10CDB2]"><Plus size={15} /> Add</button>
              </div>
            </div>
          </div>

          {adminEmails.length > 0 && (
            <div className="rounded-2xl border border-cool-100 bg-white p-6">
              <h2 className="font-display text-lg font-semibold text-ink">Admin Permissions</h2>
              <p className="mt-1 text-sm text-cool-500">Assign which features each admin can access.</p>
              <div className="mt-4 space-y-4">
                {adminEmails.map((email) => (
                  <div key={email} className="rounded-xl border border-cool-100 p-4">
                    <p className="mb-3 text-sm font-semibold text-ink">{email}</p>
                    <div className="flex flex-wrap gap-2">
                      {ADMIN_PERMISSIONS_LIST.map((perm) => (
                        <button
                          key={perm}
                          onClick={() => handlePermissionToggle(email, perm)}
                          className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                            getAdminPermissions(email).includes(perm)
                              ? "bg-[#10CDB2] text-white"
                              : "bg-cool-50 text-cool-500 hover:bg-cool-100"
                          }`}
                        >
                          {perm.replace(/_/g, " ")}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
