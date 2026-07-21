import { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { pricingPlans } from '@/constants/mockData';
import { Check, Shield, Lock, CreditCard } from 'lucide-react-native';

export default function CheckoutScreen() {
  const { planId } = useLocalSearchParams<{ planId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const plan = pricingPlans.find(p => p.id === planId) || pricingPlans[1];

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Checkout" onBack={() => router.back()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        <Text style={styles.title}>Complete your subscription</Text>
        <Text style={styles.subtitle}>You're subscribing to {plan.name}. Cancel anytime.</Text>

        {/* Order summary */}
        <Card style={styles.summaryCard} padding={20}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Plan</Text>
            <Text style={styles.summaryValue}>{plan.name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Billing</Text>
            <Text style={styles.summaryValue}>Monthly</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Price</Text>
            <Text style={styles.summaryValue}>R{plan.price}/month</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>Total due today</Text>
            <Text style={styles.summaryTotalValue}>R{plan.price}.00</Text>
          </View>
        </Card>

        {/* Payment form */}
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <Card padding={20}>
          <View style={styles.payFastBadge}>
            <Lock size={14} color={Colors.primary} />
            <Text style={styles.payFastText}>Secured by PayFast</Text>
          </View>
          <View style={styles.form}>
            <Input label="Cardholder name" value={name} onChangeText={setName} placeholder="Lezahn du Toit" autoCapitalize="words" />
            <Input label="Card number" value={cardNumber} onChangeText={setCardNumber} placeholder="0000 0000 0000 0000" keyboardType="numeric" />
            <View style={styles.rowInputs}>
              <View style={styles.flex1}>
                <Input label="Expiry" value={expiry} onChangeText={setExpiry} placeholder="MM/YY" keyboardType="numeric" />
              </View>
              <View style={styles.flex1}>
                <Input label="CVC" value={cvc} onChangeText={setCvc} placeholder="123" keyboardType="numeric" secureTextEntry />
              </View>
            </View>
          </View>
        </Card>

        {/* Features recap */}
        <Text style={styles.sectionTitle}>What's included</Text>
        <Card padding={20}>
          {plan.features.map((feature, i) => (
            <View key={i} style={[styles.featureRow, i > 0 && styles.featureBorder]}>
              <View style={styles.featureCheck}>
                <Check size={12} color={Colors.white} />
              </View>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </Card>

        {/* Security note */}
        <View style={styles.securityRow}>
          <Shield size={16} color={Colors.slate400} />
          <Text style={styles.securityText}>Secure recurring card payment powered by PayFast.</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Button title={`Subscribe for R${plan.price}/month`} variant="primary" size="large" fullWidth icon={<CreditCard size={20} color={Colors.white} />} onPress={() => router.replace('/payment-processing')} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  title: { fontSize: 24, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 8 },
  subtitle: { fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 6 },
  summaryCard: { marginTop: 20, marginBottom: 20 },
  summaryTitle: { fontSize: 16, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text, marginBottom: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  summaryLabel: { fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  summaryValue: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  summaryDivider: { height: 1, backgroundColor: Colors.slate100, marginVertical: 8 },
  summaryTotalLabel: { fontSize: 16, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  summaryTotalValue: { fontSize: 18, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.primary },
  sectionTitle: { fontSize: 17, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginBottom: 12, marginTop: 8 },
  payFastBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  payFastText: { fontSize: 13, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.primary },
  form: {},
  rowInputs: { flexDirection: 'row', gap: 12 },
  flex1: { flex: 1 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8 },
  featureBorder: { borderTopWidth: 1, borderTopColor: Colors.slate100 },
  featureCheck: { width: 18, height: 18, borderRadius: 5, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  featureText: { flex: 1, fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.text },
  securityRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 20 },
  securityText: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted },
});
