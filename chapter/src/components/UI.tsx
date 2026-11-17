import React from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { BookOpen, Plus } from 'lucide-react-native';
import { Book, STATUS_LABELS } from '../types/book';
import { AppColors } from '../constants/theme';

export function SectionTitle({ title, action, onAction, colors }: { title: string; action?: string; onAction?: () => void; colors: AppColors }) {
  return <View style={styles.sectionRow}><Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>{action && onAction ? <Pressable onPress={onAction}><Text style={{ color: colors.primary, fontWeight: '700' }}>{action}</Text></Pressable> : null}</View>;
}

export function ProgressBar({ value, colors }: { value: number; colors: AppColors }) {
  const pct = Math.max(0, Math.min(100, value));
  return <View style={[styles.track, { backgroundColor: colors.border }]}><View style={[styles.fill, { width: `${pct}%`, backgroundColor: colors.primary }]} /></View>;
}

export function Cover({ book, colors, large = false }: { book: Pick<Book, 'title' | 'coverUrl'>; colors: AppColors; large?: boolean }) {
  if (book.coverUrl.trim()) return <Image source={{ uri: book.coverUrl }} style={[styles.cover, large && styles.coverLarge]} resizeMode="cover" />;
  const palettes = ['#D8C4A8', '#9BAE9B', '#C9A6A0', '#A9B8C8', '#D6B66D'];
  const color = palettes[(book.title.length + book.title.charCodeAt(0)) % palettes.length];
  return <View style={[styles.cover, large && styles.coverLarge, { backgroundColor: color }]}><BookOpen color="#FFFFFF" size={large ? 30 : 20} /><Text numberOfLines={3} style={styles.coverTitle}>{book.title}</Text></View>;
}

export function BookRow({ book, colors, onPress }: { book: Book; colors: AppColors; onPress: () => void }) {
  const progress = book.pages ? Math.round((book.currentPage / book.pages) * 100) : 0;
  return <Pressable onPress={onPress} style={[styles.bookRow, { backgroundColor: colors.surface, borderColor: colors.border }]}><Cover book={book} colors={colors} /><View style={{ flex: 1, gap: 4 }}><Text numberOfLines={2} style={[styles.bookTitle, { color: colors.text }]}>{book.title}</Text><Text style={{ color: colors.muted, fontSize: 12 }}>{book.author}</Text><Text style={{ color: colors.primary, fontSize: 11, fontWeight: '700' }}>{STATUS_LABELS[book.status]} · {book.pages} páginas</Text>{book.status === 'reading' ? <ProgressBar value={progress} colors={colors} /> : null}</View></Pressable>;
}

export function Field({ label, value, onChangeText, colors, placeholder, multiline = false, keyboardType }: { label: string; value: string; onChangeText: (v: string) => void; colors: AppColors; placeholder?: string; multiline?: boolean; keyboardType?: 'default' | 'numeric' }) {
  return <View style={{ gap: 7, marginBottom: 15 }}><Text style={{ color: colors.text, fontSize: 13, fontWeight: '700' }}>{label}</Text><TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.muted} keyboardType={keyboardType} multiline={multiline} textAlignVertical={multiline ? 'top' : 'center'} style={[styles.input, { color: colors.text, backgroundColor: colors.surface, borderColor: colors.border }, multiline && { height: 100, paddingTop: 12 }]} /></View>;
}

export function PrimaryButton({ title, onPress, colors, secondary = false }: { title: string; onPress: () => void; colors: AppColors; secondary?: boolean }) {
  return <Pressable onPress={onPress} style={[styles.button, { backgroundColor: secondary ? colors.soft : colors.primary }]}><Text style={{ color: secondary ? colors.text : '#FFFFFF', fontWeight: '700' }}>{title}</Text></Pressable>;
}

const styles = StyleSheet.create({
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 },
  sectionTitle: { fontSize: 19, fontWeight: '700' },
  track: { height: 6, borderRadius: 20, overflow: 'hidden' },
  fill: { height: 6, borderRadius: 20 },
  cover: { width: 66, height: 94, borderRadius: 7, alignItems: 'center', justifyContent: 'center', padding: 7, gap: 7 },
  coverLarge: { width: 142, height: 205, borderRadius: 10 },
  coverTitle: { color: '#FFFFFF', fontSize: 9, textAlign: 'center', fontWeight: '800' },
  bookRow: { flexDirection: 'row', gap: 13, padding: 11, borderWidth: 1, borderRadius: 13, marginBottom: 10, alignItems: 'center' },
  bookTitle: { fontSize: 14, fontWeight: '700' },
  input: { borderWidth: 1, borderRadius: 11, paddingHorizontal: 13, minHeight: 48, fontSize: 14 },
  button: { minHeight: 49, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18, marginTop: 5 }
});
