import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

import Map from '@/components/Map';
import { DatabaseProvider } from '@/contexts/DatabaseContext';
import { RegionProvider } from '@/contexts/RegionProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <DatabaseProvider>
        <RegionProvider>
          <Stack>
            <Stack.Screen name="index" options={{ title: 'Карта' }} />
            <Stack.Screen name="marker/[id]" options={{ title: 'Маркер' }} />
            <StatusBar style="auto" />
          </Stack>
        </RegionProvider>
      </DatabaseProvider>
    </ThemeProvider>
  );
}
