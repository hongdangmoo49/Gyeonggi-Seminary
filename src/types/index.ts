import type { ReactNode, ComponentType } from 'react';

// ========== Auth ==========

export type Role = 'user' | 'admin' | 'superAdmin';

export interface User {
  uid: string;
  email: string;
  name: string;
  role: Role;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

export interface AuthResult {
  success: boolean;
  message?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (email: string, password: string, name: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
}

// ========== Posts ==========

export type BoardKey = 'free' | 'notice' | 'academic' | 'prayer' | 'books' | 'alumni';

export interface Comment {
  id: string | number;
  author: string;
  date: string;
  content: string;
}

export interface Post {
  id: string | number;
  title: string;
  author: string;
  authorUid?: string;
  date: string;
  views: number;
  content: string;
  board: BoardKey;
  isNotice?: boolean;
  comments: Comment[];
  createdAt?: unknown; // Firestore Timestamp
}

export interface UsePostsReturn {
  posts: Post[];
  paged: Post[];
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  totalPosts: number;
  addPost: (data: {
    title: string;
    content: string;
    author: string;
    authorUid: string;
    board: string;
    isNotice?: boolean;
  }) => Promise<void>;
  updatePost: (postId: string, data: Partial<Post>) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  incrementViews: (postId: string) => Promise<void>;
  addComment: (postId: string, data: { author: string; content: string }) => Promise<void>;
}

// ========== Data ==========

export interface Lecture {
  id: number;
  category: string;
  name: string;
  professor: string;
  semester: string;
  credits: number;
  description: string;
}

export interface Video {
  id: number;
  category: string;
  title: string;
  professor: string;
  date: string;
  duration: string;
  thumbnail: string | null;
}

export interface Document {
  id: number;
  category: string;
  title: string;
  fileType: string;
  size: string;
  date: string;
  downloads: number;
}

// ========== Navigation ==========

export interface NavChild {
  label: string;
  path: string;
}

export interface NavItem {
  label: string;
  path?: string;
  icon: ComponentType;
  children?: NavChild[];
}

// ========== Component Props ==========

export interface PageBannerProps {
  title: string;
  subtitle?: string;
  en?: string;
}

export interface TabItem {
  label: string;
  content: ReactNode;
}

export interface TabProps {
  tabs: TabItem[];
}

export interface AccordionItem {
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
}

export interface CardProps {
  to?: string;
  icon?: ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

export interface FilterTabsProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export interface PostListProps {
  posts: Post[];
  onSelect: (id: string) => void;
  totalPosts?: number;
}

export interface PostDetailProps {
  post: Post;
  onBack: () => void;
  onEdit?: (post: Post) => void;
  onDelete?: (id: string) => void;
  onAddComment?: (postId: string, data: { author: string; content: string }) => void;
}

export interface PostFormProps {
  initialData?: { title: string; content: string };
  onSubmit: (data: { title: string; content: string }) => void;
  onBack: () => void;
}

export interface LoginModalProps {
  onClose: () => void;
}

export interface AdminGuardProps {
  children: ReactNode;
}

export interface CommentProps {
  comment: Comment;
}
