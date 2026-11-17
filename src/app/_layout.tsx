import React from 'react';
import { Stack } from 'expo-router';
import { useFonts as useDM, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { useFonts as usePlayfair, PlayfairDisplay_600SemiBold } from '@expo-google-fonts/playfair-display';
import { AppProvider } from '../context/AppContext';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  const [dmLoaded] = useDM({ DMSans_400Regular, DMSans_500Medium, DMSans_700Bold });
  const [playfairLoaded] = usePlayfair({ PlayfairDisplay_600SemiBold });
  if (!dmLoaded || !playfairLoaded) return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>;
  return <AppProvider><Stack screenOptions={{ headerShown: false }}><Stack.Screen name="(tabs)" /><Stack.Screen name="book/add" options={{ presentation: 'modal' }} /><Stack.Screen name="book/[id]" /></Stack></AppProvider>;
}
