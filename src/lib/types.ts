export type Level = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  course_count?: number;
}

export interface Instructor {
  id: string;
  name: string;
  headline: string;
  avatar_url: string;
  bio?: string;
  rating?: number;
  student_count?: number;
  course_count?: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration_minutes: number;
  is_preview?: boolean;
}

export interface CurriculumSection {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Review {
  id: string;
  course_id: string;
  user_name: string;
  avatar_url?: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail_url: string;
  provider: string;
  external_url?: string;
  instructor: Instructor;
  category: Category;
  level: Level;
  language: string;
  price: number;
  original_price?: number;
  rating: number;
  rating_count: number;
  student_count: number;
  duration_hours: number;
  lecture_count: number;
  last_updated: string;
  bestseller?: boolean;
  is_new?: boolean;
  tags: string[];
  curriculum: CurriculumSection[];
  reviews: Review[];
  what_you_will_learn: string[];
  requirements: string[];
}

export interface CartItem {
  course: Course;
  added_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
  headline?: string;
  is_instructor: boolean;
  is_admin?: boolean;
}

export interface EnrolledCourse {
  course: Course;
  progress_percent: number;
  enrolled_at: string;
  last_accessed?: string;
  is_featured?: boolean;
}

export type AdminPermission =
  | "create_courses"
  | "manage_pricing"
  | "manage_admins"
  | "approve_courses"
  | "manage_permissions";

export const ADMIN_PERMISSIONS_LIST: AdminPermission[] = [
  "create_courses",
  "manage_pricing",
  "manage_admins",
  "approve_courses",
  "manage_permissions",
];

export const SUPER_ADMIN_EMAIL = "billionboi34@gmail.com";
