import { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Logo } from '@/components/illustrations/Logo';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="Welcome Back" onBack={() => router.back()} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: insets.bottom + 40 }}>
        <View style={styles.logoRow}>
          <Logo size={48} />
        </View>
        <Text style={styles.title}>Sign in to RandWise</Text>
        <Text style={styles.subtitle}>Every rand matters. Let's make them count.</Text>

        <View style={styles.form}>
          <Input label="Email address" value={email} onChangeText={setEmail} placeholder="lezahn@example.com" keyboardType="email-address" />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Your password"
            secureTextEntry={!showPassword}
            rightIcon={
              <Text style={styles.toggleText} onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            }
          />
        </View>

        <Text style={styles.forgotLink} onPress={() => router.push('/forgot-password')}>
          Forgot password?
        </Text>

        <View style={{ marginTop: 24 }}>
          <Button title="Sign In" variant="primary" size="large" fullWidth onPress={() => router.replace('/onboarding')} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>New to RandWise? </Text>
          <Text style={styles.link} onPress={() => router.push('/signup')}>Create an account</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  logoRow: { alignItems: 'center', marginTop: 12 },
  title: { fontSize: 26, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 16 },
  subtitle: { fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 6 },
  form: { marginTop: 28 },
  toggleText: { fontSize: 13, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.primary },
  forgotLink: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.primary, textAlign: 'right', marginTop: 4 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  link: { color: Colors.primary, fontFamily: 'Inter-SemiBold', fontWeight: '600' },
});
