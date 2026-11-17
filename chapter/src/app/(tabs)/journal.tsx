import React, { useState } from 'react';
import { Alert, ScrollView, Text, View, Pressable } from 'react-native';
import { useApp } from '../../context/AppContext';
import { Field, PrimaryButton } from '../../components/UI';

export default function JournalScreen() {
  const { entries, quotes, books, addEntry, addQuote, colors } = useApp();
  const [mode, setMode] = useState<'entry'|'quote'>('entry');
  const [bookId, setBookId] = useState(books[0]?.id ?? '');
  const [content, setContent] = useState('');
  const [page, setPage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const records = mode === 'entry' ? entries : quotes;
  const submit = () => {
    if (!bookId || !content.trim()) { Alert.alert('Campos obrigatórios', 'Selecione um livro e escreva seu registro.'); return; }
    const pageNumber = page.trim() ? Number(page) : undefined;
    if (pageNumber !== undefined && (!Number.isInteger(pageNumber) || pageNumber < 1)) { Alert.alert('Página inválida', 'Informe uma página válida.'); return; }
    if (mode === 'entry') addEntry({ bookId, text: content.trim(), page: pageNumber });
    else addQuote({ bookId, text: content.trim(), page: pageNumber });
    setContent(''); setPage(''); setShowForm(false);
  };
  return <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 22, paddingTop: 58, paddingBottom: 35 }}>
    <Text style={{ color: colors.muted, fontSize: 12 }}>MEMÓRIAS DE LEITURA</Text><Text style={{ color: colors.text, fontSize: 30, fontFamily: 'PlayfairDisplay_600SemiBold' }}>Journal</Text>
    <View style={{ flexDirection: 'row', gap: 8, marginVertical: 18 }}>{(['entry','quote'] as const).map(v => <Pressable key={v} onPress={() => setMode(v)} style={{ backgroundColor: mode === v ? colors.primary : colors.surface, padding: 10, borderRadius: 10 }}><Text style={{ color: mode === v ? '#FFFFFF' : colors.muted, fontWeight: '700', fontSize: 12 }}>{v === 'entry' ? 'Anotações' : 'Citações'}</Text></Pressable>)}</View>
    <PrimaryButton title={showForm ? 'Fechar formulário' : mode === 'entry' ? '+ Nova anotação' : '+ Nova citação'} onPress={() => setShowForm(!showForm)} colors={colors} />
    {showForm ? <View style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 14, padding: 14, marginTop: 14 }}>
      <Text style={{ color: colors.text, fontWeight: '700', marginBottom: 9 }}>Livro relacionado</Text>
      {books.map(book => <Pressable key={book.id} onPress={() => setBookId(book.id)} style={{ padding: 8, borderRadius: 8, backgroundColor: bookId === book.id ? colors.soft : 'transparent' }}><Text style={{ color: colors.text, fontSize: 12 }}>{book.title}</Text></Pressable>)}
      <View style={{ height: 12 }} /><Field label="Texto" value={content} onChangeText={setContent} colors={colors} multiline placeholder="Registre o que chamou sua atenção..." /><Field label="Página (opcional)" value={page} onChangeText={setPage} colors={colors} keyboardType="numeric" placeholder="Ex.: 42" /><PrimaryButton title="Salvar registro" onPress={submit} colors={colors} />
    </View> : null}
    <Text style={{ color: colors.text, fontWeight: '700', fontSize: 18, marginTop: 25, marginBottom: 12 }}>{mode === 'entry' ? 'Suas anotações' : 'Citações favoritas'}</Text>
    {records.length ? records.map(record => {
      const book = books.find(b => b.id === record.bookId);
      return <View key={record.id} style={{ padding: 16, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, marginBottom: 10, gap: 9 }}>
        <Text style={{ color: colors.text, fontSize: 14, lineHeight: 22, fontStyle: mode === 'quote' ? 'italic' : 'normal' }}>{mode === 'quote' ? `“${record.text}”` : record.text}</Text>
        <Text style={{ color: colors.primary, fontSize: 11, fontWeight: '700' }}>{book?.title ?? 'Livro removido'}{record.page ? ` · pág. ${record.page}` : ''}</Text>
        <Text style={{ color: colors.muted, fontSize: 10 }}>{new Date(record.createdAt).toLocaleDateString('pt-BR')}</Text>
      </View>;
    }) : <Text style={{ color: colors.muted }}>Seus registros aparecerão aqui.</Text>}
  </ScrollView>;
}
