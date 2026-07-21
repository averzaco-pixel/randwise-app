import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Logo } from '@/components/illustrations/Logo';

export default function EmailVerificationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="Verify Email" onBack={() => router.back()} />
      <View style={styles.content}>
        <View style={styles.logoRow}>
          <Logo size={56} />
        </View>
        <Text style={styles.title}>Enter verification code</Text>
        <Text style={styles.subtitle}>
          We sent a 6-digit code to your email. Enter it below to verify your account.
        </Text>

        <View style={styles.codeRow}>
          {code.map((digit, i) => (
            <TouchableOpacity key={i} style={styles.codeBox}>
              <Text style={styles.codeText}>{digit}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ marginTop: 32, width: '100%' }}>
          <Button title="Verify Email" variant="primary" size="large" fullWidth onPress={() => router.replace('/onboarding')} />
        </View>

        <View style={styles.resendRow}>
          <Text style={styles.resendText}>Didn't receive a code? </Text>
          {resendTimer > 0 ? (
            <Text style={styles.timerText}>Resend in {resendTimer}s</Text>
          ) : (
            <Text style={styles.resendLink} onPress={() => setResendTimer(30)}>
              Resend code
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { alignItems: 'center', paddingHorizontal: 24, paddingTop: 20 },
  logoRow: { alignItems: 'center' },
  title: { fontSize: 24, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 16 },
  subtitle: { fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 8, textAlign: 'center', lineHeight: 22 },
  codeRow: { flexDirection: 'row', gap: 10, marginTop: 32, justifyContent: 'center' },
  codeBox: {
    width: 48,
    height: 56,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.slate200,
    backgroundColor: Colors.slate50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeText: { fontSize: 22, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  resendRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  resendText: { fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  timerText: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.slate400 },
  resendLink: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.primary },
});
