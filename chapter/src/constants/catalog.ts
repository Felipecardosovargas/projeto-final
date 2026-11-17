import { Book } from '../types/book';

export const catalog: Omit<Book, 'id' | 'createdAt' | 'currentPage' | 'status' | 'rating'>[] = [
  { title: 'A biblioteca da meia-noite', author: 'Matt Haig', description: 'Entre a vida e a morte existe uma biblioteca onde cada livro oferece a oportunidade de experimentar uma vida diferente.', coverUrl: '', pages: 304, genre: 'Ficção' },
  { title: 'Pequena coreografia do adeus', author: 'Aline Bei', description: 'Uma narrativa sensível sobre memória, família, amadurecimento e os caminhos possíveis para recomeçar.', coverUrl: '', pages: 280, genre: 'Literatura brasileira' },
  { title: 'O peso do pássaro morto', author: 'Aline Bei', description: 'Um romance poético que acompanha diferentes fases da vida de uma mulher.', coverUrl: '', pages: 168, genre: 'Ficção' },
  { title: 'Ensaio sobre a cegueira', author: 'José Saramago', description: 'Uma epidemia inexplicável de cegueira transforma a organização de uma cidade.', coverUrl: '', pages: 312, genre: 'Romance' },
  { title: 'Antes que o café esfrie', author: 'Toshikazu Kawaguchi', description: 'Em um café de Tóquio, clientes descobrem que podem viajar ao passado sob regras muito particulares.', coverUrl: '', pages: 208, genre: 'Fantasia' },
  { title: 'O pequeno príncipe', author: 'Antoine de Saint-Exupéry', description: 'Uma fábula sobre amizade, afeto e a maneira como enxergamos o mundo.', coverUrl: '', pages: 96, genre: 'Fábula' }
].map((book, index) => ({...book, pages: [304, 280, 168, 312, 208, 96][index]}));
