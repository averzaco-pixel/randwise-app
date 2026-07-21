import { useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Lock } from 'lucide-react-native';

export default function PaymentProcessingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/payment-success');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Processing Payment" showBack={false} />
      </View>
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
        <Text style={styles.title}>Processing your payment</Text>
        <Text style={styles.subtitle}>Please wait while we securely process your subscription payment through PayFast.</Text>
        <View style={styles.securityRow}>
          <Lock size={14} color={Colors.slate400} />
          <Text style={styles.securityText}>Your payment is being encrypted and processed securely.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  iconWrapper: { width: 96, height: 96, borderRadius: 48, backgroundColor: Colors.green100, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 24 },
  subtitle: { fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 8, textAlign: 'center', lineHeight: 22 },
  securityRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 20 },
  securityText: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.slate400 },
});
