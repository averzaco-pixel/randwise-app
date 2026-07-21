import { View, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PaymentFailureIllustration } from '@/components/illustrations/Illustrations';

export default function PaymentFailedScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Payment Failed" showBack={false} />
      </View>
      <View style={styles.content}>
        <PaymentFailureIllustration size={200} />
        <Text style={styles.title}>Payment could not be processed</Text>
        <Text style={styles.subtitle}>
          We were unable to process your payment. This could be due to insufficient funds, an expired card, or a network issue. Please try again.
        </Text>

        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>Error details</Text>
          <Text style={styles.errorText}>Your card was declined by the bank. Please verify your card details or try a different card.</Text>
        </View>

        <View style={styles.actions}>
          <Button title="Try Again" variant="primary" size="large" fullWidth onPress={() => router.replace('/pricing')} />
          <Button title="Contact Support" variant="ghost" size="medium" fullWidth onPress={() => router.push('/support')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 20 },
  title: { fontSize: 22, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 16, textAlign: 'center' },
  subtitle: { fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 8, textAlign: 'center', lineHeight: 22 },
  errorCard: { width: '100%', backgroundColor: Colors.red50, borderRadius: 16, borderWidth: 1, borderColor: Colors.red100, padding: 20, marginTop: 24 },
  errorTitle: { fontSize: 15, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.error },
  errorText: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.error, marginTop: 6, lineHeight: 20 },
  actions: { marginTop: 'auto', gap: 8, paddingBottom: 40, width: '100%' },
});
