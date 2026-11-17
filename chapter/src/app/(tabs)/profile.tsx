import React, { useState } from 'react';
import { Alert, Image, ScrollView, Switch, Text, View } from 'react-native';
import { useApp } from '../../context/AppContext';
import { Field, PrimaryButton } from '../../components/UI';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { profile, updateProfile, books, colors } = useApp();
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [goal, setGoal] = useState(String(profile.annualGoal));
  const [avatar, setAvatar] = useState(profile.avatarUrl);
  const save = () => {
    const n = Number(goal);
    if (!name.trim() || !Number.isInteger(n) || n < 1 || n > 365) { Alert.alert('Verifique os dados', 'Informe um nome e uma meta entre 1 e 365 livros.'); return; }
    updateProfile({ ...profile, name: name.trim(), bio: bio.trim(), annualGoal: n, avatarUrl: avatar.trim() });
    Alert.alert('Perfil atualizado', 'Suas preferências foram salvas.');
  };
  const completed = books.filter(b => b.status === 'completed').length;
  return <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 22, paddingTop: 58, paddingBottom: 35 }}>
    <Text style={{ color: colors.muted, fontSize: 12 }}>SEU ESPAÇO</Text><Text style={{ color: colors.text, fontSize: 30, fontFamily: 'PlayfairDisplay_600SemiBold', marginBottom: 20 }}>Perfil</Text>
    <View style={{ backgroundColor: colors.primary, borderRadius: 17, padding: 20, marginBottom: 22 }}>{profile.avatarUrl.trim() ? <Image source={{ uri: profile.avatarUrl }} style={{ width: 64, height: 64, borderRadius: 32, marginBottom: 12 }} /> : null}<Text style={{ color: '#FFFFFF', fontSize: 23, fontFamily: 'PlayfairDisplay_600SemiBold' }}>{profile.name}</Text><Text style={{ color: '#FFFFFF', opacity: .8, marginTop: 5 }}>{profile.bio}</Text><View style={{ flexDirection: 'row', gap: 24, marginTop: 20 }}><View><Text style={{ color: '#FFFFFF', fontSize: 23, fontWeight: '700' }}>{books.length}</Text><Text style={{ color: '#FFFFFF', opacity: .75, fontSize: 11 }}>Livros</Text></View><View><Text style={{ color: '#FFFFFF', fontSize: 23, fontWeight: '700' }}>{completed}</Text><Text style={{ color: '#FFFFFF', opacity: .75, fontSize: 11 }}>Concluídos</Text></View></View></View>
    <Field label="Nome" value={name} onChangeText={setName} colors={colors} /><Field label="Biografia" value={bio} onChangeText={setBio} colors={colors} /><Field label="URL da foto de perfil (opcional)" value={avatar} onChangeText={setAvatar} colors={colors} placeholder="https://..." /><Field label="Meta anual de livros" value={goal} onChangeText={setGoal} colors={colors} keyboardType="numeric" />
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 13 }}><View><Text style={{ color: colors.text, fontWeight: '700' }}>Tema escuro</Text><Text style={{ color: colors.muted, fontSize: 11 }}>Altere a aparência do Chapter</Text></View><Switch value={profile.darkMode} onValueChange={v => updateProfile({ ...profile, darkMode: v })} trackColor={{ true: colors.primary }} /></View>
    <PrimaryButton title="Salvar perfil" onPress={save} colors={colors} />
    <PrimaryButton title="Ver estatísticas" onPress={() => router.push('/stats')} colors={colors} secondary />
  </ScrollView>;
}
