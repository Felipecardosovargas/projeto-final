import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '../context/AppContext';

export default function StatsScreen() {
  const { books, colors } = useApp();
  const completed = books.filter(b => b.status === 'completed');
  const reading = books.filter(b => b.status === 'reading').length;
  const pages = books.reduce((sum,b) => sum + (b.status === 'completed' ? b.pages : b.currentPage), 0);
  const rated = books.filter(b => b.rating > 0);
  const average = rated.length ? (rated.reduce((sum,b) => sum + b.rating, 0) / rated.length).toFixed(1) : '—';
  const months = Array.from({ length: 12 }, (_,i) => ({ label: new Date(new Date().getFullYear(), i, 1).toLocaleDateString('pt-BR', { month: 'short' }), count: completed.filter(b => b.completedAt && new Date(b.completedAt).getMonth() === i && new Date(b.completedAt).getFullYear() === new Date().getFullYear()).length }));
  const max = Math.max(1, ...months.map(m => m.count));
  const genres = Object.entries(books.reduce<Record<string, number>>((acc,b) => { acc[b.genre || 'Não informado'] = (acc[b.genre || 'Não informado'] ?? 0) + 1; return acc; }, {})).sort((a,b) => b[1]-a[1]).slice(0,5);
  return <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 22, paddingTop: 55, paddingBottom: 35 }}>
    <Text onPress={() => router.back()} style={{ color: colors.primary, fontWeight: '700', marginBottom: 20 }}>← Voltar</Text><Text style={{ color: colors.text, fontSize: 29, fontFamily: 'PlayfairDisplay_600SemiBold' }}>Estatísticas</Text><Text style={{ color: colors.muted, marginBottom: 20 }}>Seu percurso literário em números.</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>{[{ label: 'Concluídos', value: completed.length },{ label: 'Páginas lidas', value: pages },{ label: 'Em andamento', value: reading },{ label: 'Média das notas', value: average }].map(item => <View key={item.label} style={{ width: '48%', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 15 }}><Text style={{ color: colors.muted, fontSize: 11 }}>{item.label}</Text><Text style={{ color: colors.text, fontSize: 26, fontWeight: '700', marginTop: 5 }}>{item.value}</Text></View>)}</View>
    <Text style={{ color: colors.text, fontWeight: '700', fontSize: 18, marginTop: 26, marginBottom: 15 }}>Conclusões por mês</Text><View style={{ backgroundColor: colors.surface, borderRadius: 14, borderColor: colors.border, borderWidth: 1, padding: 15, flexDirection: 'row', height: 160, alignItems: 'flex-end', justifyContent: 'space-between' }}>{months.map(m => <View key={m.label} style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', height: '100%', gap: 5 }}><View style={{ width: 11, height: `${Math.max(4, m.count/max*75)}%`, backgroundColor: colors.primary, borderRadius: 5 }} /><Text style={{ color: colors.muted, fontSize: 8 }}>{m.label}</Text></View>)}</View>
    <Text style={{ color: colors.text, fontWeight: '700', fontSize: 18, marginTop: 25, marginBottom: 12 }}>Gêneros mais lidos</Text>{genres.length ? genres.map(([genre,count]) => <View key={genre} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 13, backgroundColor: colors.surface, borderRadius: 10, marginBottom: 7 }}><Text style={{ color: colors.text }}>{genre}</Text><Text style={{ color: colors.primary, fontWeight: '700' }}>{count}</Text></View>) : <Text style={{ color: colors.muted }}>Adicione livros para visualizar os gêneros.</Text>}
  </ScrollView>;
}
