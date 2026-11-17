import React, { useMemo, useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useApp } from '../../context/AppContext';
import { BookRow } from '../../components/UI';
import { ReadingStatus, STATUS_LABELS } from '../../types/book';

const filters: (ReadingStatus | 'all')[] = ['all','want','reading','completed','paused','abandoned'];

export default function LibraryScreen() {
  const { books, colors } = useApp();
  const [filter, setFilter] = useState<ReadingStatus | 'all'>('all');
  const visible = useMemo(() => books.filter(b => filter === 'all' || b.status === filter), [books, filter]);
  return <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 22, paddingTop: 58, paddingBottom: 35 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}><View><Text style={{ color: colors.muted, fontSize: 12 }}>SUA COLEÇÃO</Text><Text style={{ color: colors.text, fontSize: 30, fontFamily: 'PlayfairDisplay_600SemiBold' }}>Biblioteca</Text></View><Pressable onPress={() => router.push('/book/add')} style={{ backgroundColor: colors.primary, width: 45, height: 45, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}><Plus color="#FFFFFF" /></Pressable></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 18 }} contentContainerStyle={{ gap: 8 }}>
      {filters.map(item => <Pressable key={item} onPress={() => setFilter(item)} style={{ paddingHorizontal: 14, paddingVertical: 9, borderRadius: 22, backgroundColor: filter === item ? colors.primary : colors.surface, borderWidth: 1, borderColor: filter === item ? colors.primary : colors.border }}><Text style={{ color: filter === item ? '#FFFFFF' : colors.muted, fontSize: 12, fontWeight: '700' }}>{item === 'all' ? 'Todos' : STATUS_LABELS[item]}</Text></Pressable>)}
    </ScrollView>
    <Text style={{ color: colors.muted, fontSize: 12, marginBottom: 12 }}>{visible.length} {visible.length === 1 ? 'livro encontrado' : 'livros encontrados'}</Text>
    {visible.length ? visible.map(book => <BookRow key={book.id} book={book} colors={colors} onPress={() => router.push(`/book/${book.id}`)} />) : <View style={{ padding: 30, alignItems: 'center' }}><Text style={{ color: colors.muted }}>Nenhum livro nesta categoria.</Text></View>}
  </ScrollView>;
}
