export type ReadingStatus = 'want' | 'reading' | 'completed' | 'paused' | 'abandoned';

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  pages: number;
  currentPage: number;
  genre: string;
  status: ReadingStatus;
  rating: number;
  createdAt: string;
  completedAt?: string;
}

export interface JournalEntry {
  id: string;
  bookId: string;
  text: string;
  page?: number;
  createdAt: string;
}

export interface Quote {
  id: string;
  bookId: string;
  text: string;
  page?: number;
  createdAt: string;
}

export interface UserProfile {
  name: string;
  bio: string;
  avatarUrl: string;
  annualGoal: number;
  darkMode: boolean;
}

export interface AppData {
  books: Book[];
  entries: JournalEntry[];
  quotes: Quote[];
  profile: UserProfile;
}

export const STATUS_LABELS: Record<ReadingStatus, string> = {
  want: 'Quero ler',
  reading: 'Lendo',
  completed: 'Concluído',
  paused: 'Pausado',
  abandoned: 'Abandonado'
};
