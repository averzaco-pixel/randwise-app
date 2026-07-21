import { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Logo } from '@/components/illustrations/Logo';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Logo size={100} />
        <Text style={styles.appName}>RandWise</Text>
        <Text style={styles.tagline}>Every Rand Matters</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
    color: Colors.white,
    marginTop: 20,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    color: Colors.white,
    opacity: 0.85,
    marginTop: 6,
    letterSpacing: 0.5,
  },
});
