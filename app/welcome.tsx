import { View, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { FamilyShoppingIllustration } from '@/components/illustrations/Illustrations';
import { Logo } from '@/components/illustrations/Logo';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo size={56} />
      </View>

      <View style={styles.illustrationWrapper}>
        <FamilyShoppingIllustration size={260} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Smart grocery budgeting for South African households</Text>
        <Text style={styles.subtitle}>
          Track every rand, reduce food waste, and plan meals your family will love — all in one premium app.
        </Text>
      </View>

      <View style={styles.actions}>
        <Button title="Create Account" variant="primary" size="large" fullWidth onPress={() => router.push('/signup')} />
        <Button title="I already have an account" variant="ghost" size="large" fullWidth onPress={() => router.push('/login')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
  },
  illustrationWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
  content: {
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  actions: {
    marginTop: 'auto',
    gap: 8,
  },
});
