export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

export interface Subject {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  thumbnail?: string | null;
  isPublished: boolean;
  createdAt: string;
  _count?: {
    sections: number;
  };
}

export interface Section {
  id: string;
  subjectId: string;
  title: string;
  orderIndex: number;
  createdAt: string;
  videos?: Video[];
}

export interface Video {
  id: string;
  sectionId: string;
  title: string;
  description?: string | null;
  youtubeUrl: string;
  orderIndex: number;
  durationSeconds?: number | null;
  createdAt: string;
  locked?: boolean;
  completed?: boolean;
  progress?: VideoProgress;
  section?: {
    subject: Subject;
  };
}

export interface VideoProgress {
  id: string;
  userId: string;
  videoId: string;
  lastPositionSec: number;
  isCompleted: boolean;
  completedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  checkAuth: () => Promise<void>;
}
