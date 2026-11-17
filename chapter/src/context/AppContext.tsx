import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AppData, Book, JournalEntry, Quote, UserProfile } from '../types/book';
import { createId, loadData, saveData } from '../services/storage';
import { lightColors, darkColors } from '../constants/theme';

interface AppContextValue extends AppData {
  loading: boolean;
  error: string;
  colors: typeof lightColors;
  addBook: (book: Omit<Book, 'id' | 'createdAt'>) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
  addEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => void;
  addQuote: (quote: Omit<Quote, 'id' | 'createdAt'>) => void;
  updateProfile: (profile: UserProfile) => void;
  clearError: () => void;
}

const Context = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: React.PropsWithChildren) {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData().then(setData).catch((e: Error) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!data) return;
    saveData(data).catch((e: Error) => setError(e.message));
  }, [data]);

  const value = useMemo<AppContextValue | null>(() => {
    if (!data) return null;
    return {
      ...data, loading, error,
      colors: data.profile.darkMode ? darkColors : lightColors,
      addBook: (book) => setData(current => current ? { ...current, books: [ { ...book, id: createId(), createdAt: new Date().toISOString() }, ...current.books ] } : current),
      updateBook: (book) => setData(current => current ? { ...current, books: current.books.map(item => item.id === book.id ? book : item) } : current),
      deleteBook: (id) => setData(current => current ? { ...current, books: current.books.filter(b => b.id !== id), entries: current.entries.filter(e => e.bookId !== id), quotes: current.quotes.filter(q => q.bookId !== id) } : current),
      addEntry: (entry) => setData(current => current ? { ...current, entries: [{ ...entry, id: createId(), createdAt: new Date().toISOString() }, ...current.entries] } : current),
      addQuote: (quote) => setData(current => current ? { ...current, quotes: [{ ...quote, id: createId(), createdAt: new Date().toISOString() }, ...current.quotes] } : current),
      updateProfile: (profile) => setData(current => current ? { ...current, profile } : current),
      clearError: () => setError('')
    };
  }, [data, loading, error]);

  if (!value) return null;
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useApp() {
  const value = useContext(Context);
  if (!value) throw new Error('useApp deve ser usado dentro de AppProvider');
  return value;
}
