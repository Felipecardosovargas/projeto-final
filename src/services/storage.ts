import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppData, Book } from '../types/book';

const STORAGE_KEY = '@chapter/data/v1';

const initialData: AppData = {
  books: [
    { id: 'demo-1', title: 'A biblioteca da meia-noite', author: 'Matt Haig', description: 'Entre a vida e a morte existe uma biblioteca onde cada livro oferece a oportunidade de experimentar uma vida diferente.', coverUrl: '', pages: 304, currentPage: 152, genre: 'Ficção', status: 'reading', rating: 0, createdAt: new Date().toISOString() },
    { id: 'demo-2', title: 'O pequeno príncipe', author: 'Antoine de Saint-Exupéry', description: 'Uma fábula sobre amizade, afeto e a maneira como enxergamos o mundo.', coverUrl: '', pages: 96, currentPage: 96, genre: 'Fábula', status: 'completed', rating: 5, createdAt: new Date(Date.now() - 86400000 * 8).toISOString(), completedAt: new Date().toISOString() },
    { id: 'demo-3', title: 'Ensaio sobre a cegueira', author: 'José Saramago', description: 'Uma epidemia inexplicável de cegueira transforma a organização de uma cidade.', coverUrl: '', pages: 312, currentPage: 0, genre: 'Romance', status: 'want', rating: 0, createdAt: new Date(Date.now() - 86400000 * 2).toISOString() }
  ],
  entries: [
    { id: 'entry-demo', bookId: 'demo-1', text: 'Comecei esta leitura hoje. A ideia de uma biblioteca com tantas possibilidades é fascinante.', page: 24, createdAt: new Date().toISOString() }
  ],
  quotes: [],
  profile: { name: 'Leitor(a)', bio: 'Um livro de cada vez.', avatarUrl: '', annualGoal: 12, darkMode: false }
};

export async function loadData(): Promise<AppData> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      return initialData;
    }
    const parsed: AppData = JSON.parse(raw);
    return {
      books: Array.isArray(parsed.books) ? parsed.books : [],
      entries: Array.isArray(parsed.entries) ? parsed.entries : [],
      quotes: Array.isArray(parsed.quotes) ? parsed.quotes : [],
      profile: { ...initialData.profile, ...parsed.profile }
    };
  } catch (error) {
    console.error('Falha ao carregar dados do Chapter:', error);
    throw new Error('Não foi possível carregar seus dados. Tente reabrir o aplicativo.');
  }
}

export async function saveData(data: AppData): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Falha ao salvar dados do Chapter:', error);
    throw new Error('Não foi possível salvar as alterações.');
  }
}

export function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createBook(input: Omit<Book, 'id' | 'createdAt'>): Book {
  return { ...input, id: createId(), createdAt: new Date().toISOString() };
}
