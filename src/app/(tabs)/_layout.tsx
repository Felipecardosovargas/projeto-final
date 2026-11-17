import React from 'react';
import { Tabs } from 'expo-router';
import { House, Library, Compass, BookHeart, UserRound } from 'lucide-react-native';
import { useApp } from '../../context/AppContext';

export default function TabLayout() {
  const { colors } = useApp();
  const common = { headerShown: false, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.muted, tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, height: 63, paddingTop: 7, paddingBottom: 7 }, tabBarLabelStyle: { fontSize: 10, fontWeight: '600' as const } };
  return <Tabs screenOptions={common}>
    <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color, size }) => <House color={color} size={size} /> }} />
    <Tabs.Screen name="library" options={{ title: 'Library', tabBarIcon: ({ color, size }) => <Library color={color} size={size} /> }} />
    <Tabs.Screen name="discover" options={{ title: 'Discover', tabBarIcon: ({ color, size }) => <Compass color={color} size={size} /> }} />
    <Tabs.Screen name="journal" options={{ title: 'Journal', tabBarIcon: ({ color, size }) => <BookHeart color={color} size={size} /> }} />
    <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <UserRound color={color} size={size} /> }} />
  </Tabs>;
}
