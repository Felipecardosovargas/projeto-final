import React, { useState } from 'react';
import { Alert, ScrollView, Text, View, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Pencil, Trash2, Star } from 'lucide-react-native';
import { useApp } from '../../context/AppContext';
import { Cover, Field, PrimaryButton, ProgressBar } from '../../components/UI';
import { STATUS_LABELS } from '../../types/book';

export default function BookDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { books, colors, updateBook, deleteBook, entries, quotes } = useApp();
  const book = books.find(b => b.id === id);
  const [page, setPage] = useState(String(book?.currentPage ?? 0));
  if (!book) return <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: colors.text }}>Livro não encontrado.</Text><PrimaryButton title="Voltar" onPress={() => router.back()} colors={colors} /></View>;
  const pct = Math.round(book.currentPage / book.pages * 100);
  const setProgress = () => {
    const n = Number(page);
    if (!Number.isInteger(n) || n < 0 || n > book.pages) { Alert.alert('Página inválida', `Use um valor entre 0 e ${book.pages}.`); return; }
    updateBook({ ...book, currentPage: n, status: n === book.pages ? 'completed' : book.status === 'completed' ? 'reading' : book.status, completedAt: n === book.pages ? new Date().toISOString() : undefined });
    Alert.alert('Progresso atualizado', `${Math.round(n/book.pages*100)}% concluído.`);
  };
  const rate = (rating: number) => updateBook({ ...book, rating });
  const confirmDelete = () => Alert.alert('Excluir livro?', 'As anotações e citações relacionadas também serão excluídas.', [{ text: 'Cancelar', style: 'cancel' }, { text: 'Excluir', style: 'destructive', onPress: () => { deleteBook(book.id); router.back(); } }]);
  return <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 22, paddingTop: 55, paddingBottom: 40 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 }}><Pressable onPress={() => router.back()}><Text style={{ color: colors.primary, fontWeight: '700' }}>← Biblioteca</Text></Pressable><View style={{ flexDirection: 'row', gap: 18 }}><Pressable onPress={() => router.push({ pathname: '/book/add', params: { id: book.id } })}><Pencil color={colors.primary} /></Pressable><Pressable onPress={confirmDelete}><Trash2 color={colors.danger} /></Pressable></View></View>
    <View style={{ alignItems: 'center', marginBottom: 20 }}><Cover book={book} colors={colors} large /><Text style={{ color: colors.text, fontSize: 25, textAlign: 'center', fontFamily: 'PlayfairDisplay_600SemiBold', marginTop: 17 }}>{book.title}</Text><Text style={{ color: colors.muted, marginTop: 5 }}>{book.author}</Text><Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700', marginTop: 8 }}>{STATUS_LABELS[book.status]} · {book.genre}</Text></View>
    <View style={{ backgroundColor: colors.surface, padding: 16, borderRadius: 14, borderWidth: 1, borderColor: colors.border, gap: 10, marginBottom: 18 }}><View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={{ color: colors.text, fontWeight: '700' }}>Progresso</Text><Text style={{ color: colors.primary, fontWeight: '700' }}>{pct}%</Text></View><ProgressBar value={pct} colors={colors} /><Text style={{ color: colors.muted, fontSize: 11 }}>{book.currentPage} de {book.pages} páginas</Text><Field label="Página atual" value={page} onChangeText={setPage} colors={colors} keyboardType="numeric" /><PrimaryButton title="Atualizar progresso" onPress={setProgress} colors={colors} /></View>
    <Text style={{ color: colors.text, fontSize: 17, fontWeight: '700', marginBottom: 8 }}>Sua avaliação</Text><View style={{ flexDirection: 'row', gap: 8, marginBottom: 18 }}>{[1,2,3,4,5].map(n => <Pressable key={n} onPress={() => rate(n)}><Star size={27} color={colors.accent} fill={n <= book.rating ? colors.accent : 'transparent'} /></Pressable>)}</View>
    <Text style={{ color: colors.text, fontSize: 17, fontWeight: '700', marginBottom: 8 }}>Sobre o livro</Text><Text style={{ color: colors.muted, lineHeight: 22, marginBottom: 18 }}>{book.description || 'Nenhuma descrição cadastrada.'}</Text>
    <Text style={{ color: colors.text, fontSize: 17, fontWeight: '700', marginBottom: 8 }}>Registros neste livro</Text><Text style={{ color: colors.muted, fontSize: 12 }}>Anotações: {entries.filter(e => e.bookId === book.id).length} · Citações: {quotes.filter(q => q.bookId === book.id).length}. Adicione novos registros na seção Journal.</Text>
  </ScrollView>;
}
