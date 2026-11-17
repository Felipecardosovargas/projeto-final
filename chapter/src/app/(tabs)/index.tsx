import React from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Plus, Sparkles, BookOpen } from 'lucide-react-native';
import { useApp } from '../../context/AppContext';
import { BookRow, ProgressBar, SectionTitle } from '../../components/UI';

export default function HomeScreen() {
  const { books, profile, colors } = useApp();
  const completed = books.filter(b => b.status === 'completed').length;
  const current = books.find(b => b.status === 'reading');
  const recent = [...books].sort((a,b) => b.createdAt.localeCompare(a.createdAt)).slice(0,3);
  const goalPct = Math.min(100, Math.round(completed / Math.max(1, profile.annualGoal) * 100));
  return <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 22, paddingTop: 58, paddingBottom: 35 }}>
    <Text style={{ color: colors.muted, fontSize: 13 }}>SEU CANTINHO LITERÁRIO</Text>
    <Text style={{ color: colors.text, fontSize: 31, fontFamily: 'PlayfairDisplay_600SemiBold', marginTop: 5 }}>Olá, {profile.name.split(' ')[0]}.</Text>
    <Text style={{ color: colors.muted, marginTop: 5, marginBottom: 22 }}>Que história vamos viver hoje?</Text>
    <View style={{ backgroundColor: colors.primary, borderRadius: 18, padding: 18, marginBottom: 22 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><Text style={{ color: '#FFFFFF', opacity: .8, fontSize: 12 }}>SUA META DE {new Date().getFullYear()}</Text><Sparkles color="#E7D2AE" size={19} /></View>
      <Text style={{ color: '#FFFFFF', fontSize: 32, fontWeight: '700', marginTop: 5 }}>{completed}<Text style={{ fontSize: 16, fontWeight: '400' }}> / {profile.annualGoal} livros</Text></Text>
      <View style={{ height: 7, backgroundColor: '#FFFFFF40', borderRadius: 10, marginTop: 13, overflow: 'hidden' }}><View style={{ width: `${goalPct}%`, height: 7, backgroundColor: '#E7D2AE' }} /></View>
      <Text style={{ color: '#FFFFFF', opacity: .8, fontSize: 11, marginTop: 7 }}>{goalPct}% da meta concluída</Text>
    </View>
    <View style={{ flexDirection: 'row', gap: 10, marginBottom: 24 }}>
      <View style={{ flex: 1, backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 15 }}><Text style={{ color: colors.muted, fontSize: 11 }}>CONCLUÍDOS</Text><Text style={{ color: colors.text, fontSize: 27, fontWeight: '700', marginTop: 4 }}>{completed}</Text></View>
      <View style={{ flex: 1, backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 15 }}><Text style={{ color: colors.muted, fontSize: 11 }}>NA ESTANTE</Text><Text style={{ color: colors.text, fontSize: 27, fontWeight: '700', marginTop: 4 }}>{books.length}</Text></View>
    </View>
    <SectionTitle title="Leitura atual" colors={colors} />
    {current ? <Pressable onPress={() => router.push(`/book/${current.id}`)} style={{ backgroundColor: colors.surface, padding: 15, borderRadius: 15, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', gap: 14, marginBottom: 23 }}>
      <View style={{ width: 78, height: 110, borderRadius: 8, backgroundColor: colors.soft, alignItems: 'center', justifyContent: 'center' }}><BookOpen color={colors.primary} size={27} /></View>
      <View style={{ flex: 1, justifyContent: 'center', gap: 7 }}><Text style={{ color: colors.text, fontWeight: '700', fontSize: 16 }}>{current.title}</Text><Text style={{ color: colors.muted, fontSize: 12 }}>{current.author}</Text><ProgressBar value={current.pages ? current.currentPage/current.pages*100 : 0} colors={colors} /><Text style={{ color: colors.primary, fontSize: 11, fontWeight: '700' }}>{Math.round(current.currentPage/current.pages*100)}% · página {current.currentPage} de {current.pages}</Text></View>
    </Pressable> : <Text style={{ color: colors.muted, marginBottom: 22 }}>Nenhuma leitura em andamento. Escolha um livro na biblioteca.</Text>}
    <SectionTitle title="Adicionados recentemente" action="Ver biblioteca" onAction={() => router.push('/library')} colors={colors} />
    {recent.map(book => <BookRow key={book.id} book={book} colors={colors} onPress={() => router.push(`/book/${book.id}`)} />)}
    <Pressable onPress={() => router.push('/book/add')} style={{ backgroundColor: colors.soft, borderRadius: 13, padding: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 9 }}><Plus color={colors.primary} size={18} /><Text style={{ color: colors.primary, fontWeight: '700' }}>Adicionar livro</Text></Pressable>
  </ScrollView>;
}
