import React, { useState } from 'react';
import { Alert, ScrollView, Text, Pressable, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useApp } from '../../context/AppContext';
import { Field, PrimaryButton } from '../../components/UI';
import { Book, ReadingStatus, STATUS_LABELS } from '../../types/book';

const statuses: ReadingStatus[] = ['want','reading','completed','paused','abandoned'];

export default function AddBookScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { books, addBook, updateBook, colors } = useApp();
  const existing = books.find(b => b.id === id);
  const [title, setTitle] = useState(existing?.title ?? '');
  const [author, setAuthor] = useState(existing?.author ?? '');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [coverUrl, setCoverUrl] = useState(existing?.coverUrl ?? '');
  const [pages, setPages] = useState(String(existing?.pages ?? ''));
  const [currentPage, setCurrentPage] = useState(String(existing?.currentPage ?? '0'));
  const [genre, setGenre] = useState(existing?.genre ?? '');
  const [status, setStatus] = useState<ReadingStatus>(existing?.status ?? 'want');
  const save = () => {
    const total = Number(pages), current = Number(currentPage);
    if (!title.trim() || !author.trim() || !Number.isInteger(total) || total < 1) { Alert.alert('Dados obrigatórios', 'Informe título, autor e uma quantidade válida de páginas.'); return; }
    if (!Number.isInteger(current) || current < 0 || current > total) { Alert.alert('Progresso inválido', `A página atual deve estar entre 0 e ${total}.`); return; }
    const payload = { title: title.trim(), author: author.trim(), description: description.trim(), coverUrl: coverUrl.trim(), pages: total, currentPage: status === 'completed' ? total : current, genre: genre.trim() || 'Não informado', status, rating: existing?.rating ?? 0, ...(status === 'completed' ? { completedAt: existing?.completedAt ?? new Date().toISOString() } : {}) };
    if (existing) updateBook({ ...existing, ...payload });
    else addBook(payload);
    router.back();
  };
  return <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 22, paddingTop: 55, paddingBottom: 35 }}>
    <Pressable onPress={() => router.back()}><Text style={{ color: colors.primary, fontWeight: '700', marginBottom: 20 }}>← Voltar</Text></Pressable>
    <Text style={{ color: colors.text, fontSize: 29, fontFamily: 'PlayfairDisplay_600SemiBold', marginBottom: 20 }}>{existing ? 'Editar livro' : 'Novo livro'}</Text>
    <Field label="Título *" value={title} onChangeText={setTitle} colors={colors} placeholder="Nome da obra" />
    <Field label="Autor *" value={author} onChangeText={setAuthor} colors={colors} placeholder="Nome do autor" />
    <Field label="Descrição" value={description} onChangeText={setDescription} colors={colors} multiline placeholder="Sobre o que é este livro?" />
    <Field label="URL da capa (opcional)" value={coverUrl} onChangeText={setCoverUrl} colors={colors} placeholder="https://..." />
    <Field label="Total de páginas *" value={pages} onChangeText={setPages} colors={colors} keyboardType="numeric" />
    <Field label="Página atual" value={currentPage} onChangeText={setCurrentPage} colors={colors} keyboardType="numeric" />
    <Field label="Gênero literário" value={genre} onChangeText={setGenre} colors={colors} placeholder="Ex.: Romance" />
    <Text style={{ color: colors.text, fontWeight: '700', marginBottom: 9 }}>Status de leitura</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>{statuses.map(s => <Pressable key={s} onPress={() => setStatus(s)} style={{ padding: 10, borderRadius: 9, backgroundColor: status === s ? colors.primary : colors.surface, borderWidth: 1, borderColor: colors.border }}><Text style={{ color: status === s ? '#FFFFFF' : colors.text, fontSize: 11 }}>{STATUS_LABELS[s]}</Text></Pressable>)}</View>
    <PrimaryButton title={existing ? 'Salvar alterações' : 'Adicionar à biblioteca'} onPress={save} colors={colors} />
  </ScrollView>;
}
