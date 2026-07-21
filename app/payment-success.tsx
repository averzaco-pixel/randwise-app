import { View, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { PaymentSuccessIllustration } from '@/components/illustrations/Illustrations';

export default function PaymentSuccessScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Payment Successful" showBack={false} />
      </View>
      <View style={styles.content}>
        <PaymentSuccessIllustration size={200} />
        <Text style={styles.title}>Welcome to RandWise Family!</Text>
        <Text style={styles.subtitle}>
          Your subscription is now active. Enjoy premium features including unlimited shopping lists, weekly meal planning, and detailed reports.
        </Text>

        <View style={styles.receiptCard}>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Plan</Text>
            <Text style={styles.receiptValue}>RandWise Family</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Amount</Text>
            <Text style={styles.receiptValue}>R79.00/month</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Next billing</Text>
            <Text style={styles.receiptValue}>17 August 2026</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Payment method</Text>
            <Text style={styles.receiptValue}>Card ending 0000</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Button title="Start Using RandWise" variant="primary" size="large" fullWidth onPress={() => router.replace('/(tabs)')} />
          <Button title="View Billing Details" variant="ghost" size="medium" fullWidth onPress={() => router.push('/billing')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 20 },
  title: { fontSize: 24, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 16, textAlign: 'center' },
  subtitle: { fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 8, textAlign: 'center', lineHeight: 22 },
  receiptCard: { width: '100%', backgroundColor: Colors.white, borderRadius: 16, borderWidth: 1, borderColor: Colors.slate200, padding: 20, marginTop: 24 },
  receiptRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  receiptLabel: { fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  receiptValue: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  actions: { marginTop: 'auto', gap: 8, paddingBottom: 40, width: '100%' },
});
