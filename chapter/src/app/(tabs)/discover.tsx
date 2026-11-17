import React from 'react';
import { Alert, ScrollView, Text, View, Pressable } from 'react-native';
import { useApp } from '../../context/AppContext';
import { catalog } from '../../constants/catalog';
import { Cover } from '../../components/UI';
import { createId } from '../../services/storage';

export default function DiscoverScreen() {
  const { books, addBook, colors } = useApp();
  const add = (item: typeof catalog[number]) => {
    if (books.some(b => b.title.toLowerCase() === item.title.toLowerCase() && b.author === item.author)) { Alert.alert('Livro já adicionado', 'Esta obra já está na sua biblioteca.'); return; }
    addBook({ ...item, currentPage: 0, status: 'want', rating: 0 });
    Alert.alert('Adicionado!', `${item.title} foi para sua lista Quero ler.`);
  };
  return <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 22, paddingTop: 58, paddingBottom: 35 }}>
    <Text style={{ color: colors.muted, fontSize: 12 }}>EXPLORE NOVAS HISTÓRIAS</Text><Text style={{ color: colors.text, fontSize: 30, fontFamily: 'PlayfairDisplay_600SemiBold', marginBottom: 7 }}>Discover</Text><Text style={{ color: colors.muted, marginBottom: 22 }}>Uma pequena seleção para inspirar sua próxima leitura.</Text>
    {catalog.map(item => {
      const exists = books.some(b => b.title.toLowerCase() === item.title.toLowerCase() && b.author === item.author);
      return <View key={item.title} style={{ flexDirection: 'row', gap: 14, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 15, padding: 12, marginBottom: 11 }}>
        <Cover book={item as {title: string; coverUrl: string}} colors={colors} />
        <View style={{ flex: 1, gap: 4 }}><Text style={{ color: colors.text, fontWeight: '700', fontSize: 14 }}>{item.title}</Text><Text style={{ color: colors.muted, fontSize: 12 }}>{item.author}</Text><Text numberOfLines={3} style={{ color: colors.muted, fontSize: 11, lineHeight: 16 }}>{item.description}</Text><Pressable onPress={() => add(item)} style={{ alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 7, backgroundColor: colors.soft, borderRadius: 9, marginTop: 3 }}><Text style={{ color: colors.primary, fontSize: 11, fontWeight: '700' }}>{exists ? 'Já está na biblioteca' : '+ Quero ler'}</Text></Pressable></View>
      </View>;
    })}
  </ScrollView>;
}
