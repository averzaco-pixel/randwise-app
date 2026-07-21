import { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="Forgot Password" onBack={() => router.back()} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: insets.bottom + 40 }}>
        {!sent ? (
          <>
            <Text style={styles.title}>Reset your password</Text>
            <Text style={styles.subtitle}>
              Enter your email address and we'll send you a link to reset your password.
            </Text>
            <View style={styles.form}>
              <Input label="Email address" value={email} onChangeText={setEmail} placeholder="lezahn@example.com" keyboardType="email-address" />
            </View>
            <View style={{ marginTop: 24 }}>
              <Button title="Send Reset Link" variant="primary" size="large" fullWidth onPress={() => setSent(true)} />
            </View>
          </>
        ) : (
          <View style={styles.sentContainer}>
            <View style={styles.checkCircle}>
              <Text style={styles.checkIcon}>✓</Text>
            </View>
            <Text style={styles.title}>Check your email</Text>
            <Text style={styles.subtitle}>
              We've sent a password reset link to {email || 'your email'}. Follow the link to reset your password.
            </Text>
            <View style={{ marginTop: 24, width: '100%' }}>
              <Button title="Back to Login" variant="primary" size="large" fullWidth onPress={() => router.push('/login')} />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  title: { fontSize: 24, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 16 },
  subtitle: { fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 8, lineHeight: 22 },
  form: { marginTop: 28 },
  sentContainer: { alignItems: 'center', paddingTop: 40 },
  checkCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.green100, justifyContent: 'center', alignItems: 'center' },
  checkIcon: { fontSize: 40, color: Colors.primary, fontFamily: 'Inter-Bold', fontWeight: '700' },
});
