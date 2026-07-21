import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { SplashScreen } from 'expo-router';
import { Colors } from '@/constants/theme';
import { View, ActivityIndicator } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="login" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="email-verification" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="budget" />
        <Stack.Screen name="add-expense" />
        <Stack.Screen name="expense-history" />
        <Stack.Screen name="add-shopping-item" />
        <Stack.Screen name="add-pantry-item" />
        <Stack.Screen name="expiring" />
        <Stack.Screen name="low-stock" />
        <Stack.Screen name="recipe/[id]" />
        <Stack.Screen name="weekly-meal-plan" />
        <Stack.Screen name="reports" />
        <Stack.Screen name="pricing" />
        <Stack.Screen name="checkout" />
        <Stack.Screen name="payment-processing" />
        <Stack.Screen name="payment-success" />
        <Stack.Screen name="payment-failed" />
        <Stack.Screen name="billing" />
        <Stack.Screen name="household" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="support" />
        <Stack.Screen name="privacy" />
        <Stack.Screen name="terms" />
        <Stack.Screen name="coming-soon" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
