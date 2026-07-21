import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Crown, CreditCard, Calendar, Download, ChevronRight, Shield } from 'lucide-react-native';

export default function BillingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const invoices = [
    { id: '1', date: '17 Jul 2026', amount: 'R79.00', status: 'Paid' },
    { id: '2', date: '17 Jun 2026', amount: 'R79.00', status: 'Paid' },
    { id: '3', date: '17 May 2026', amount: 'R79.00', status: 'Paid' },
  ];

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Billing & Subscription" onBack={() => router.back()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        {/* Current plan */}
        <Card style={styles.planCard} padding={20}>
          <View style={styles.planHeader}>
            <View style={styles.planIcon}>
              <Crown size={22} color={Colors.white} />
            </View>
            <View style={styles.planInfo}>
              <Text style={styles.planName}>RandWise Family</Text>
              <Text style={styles.planPrice}>R79/month</Text>
            </View>
            <Badge label="Active" variant="green" />
          </View>
          <View style={styles.planDetails}>
            <View style={styles.detailRow}>
              <Calendar size={14} color={Colors.textMuted} />
              <Text style={styles.detailText}>Next billing: 17 August 2026</Text>
            </View>
            <View style={styles.detailRow}>
              <CreditCard size={14} color={Colors.textMuted} />
              <Text style={styles.detailText}>Card ending 4242</Text>
            </View>
          </View>
        </Card>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/pricing')}>
            <View style={styles.actionIcon}>
              <Crown size={18} color={Colors.primary} />
            </View>
            <Text style={styles.actionLabel}>Change Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIcon}>
              <CreditCard size={18} color={Colors.gold600} />
            </View>
            <Text style={styles.actionLabel}>Update Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, { backgroundColor: Colors.red100 }]}>
              <Text style={styles.cancelIcon}>✕</Text>
            </View>
            <Text style={styles.actionLabel}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* Payment security */}
        <View style={styles.securityRow}>
          <Shield size={14} color={Colors.slate400} />
          <Text style={styles.securityText}>Secure recurring card payment powered by PayFast.</Text>
        </View>

        {/* Invoices */}
        <Text style={styles.sectionTitle}>Billing History</Text>
        {invoices.map(invoice => (
          <Card key={invoice.id} style={styles.invoiceCard} padding={16}>
            <View style={styles.invoiceRow}>
              <View style={styles.invoiceInfo}>
                <Text style={styles.invoiceDate}>{invoice.date}</Text>
                <Text style={styles.invoiceAmount}>{invoice.amount}</Text>
              </View>
              <Badge label={invoice.status} variant="green" size="small" />
              <TouchableOpacity style={styles.downloadBtn}>
                <Download size={18} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  planCard: { marginBottom: 16, backgroundColor: Colors.primary },
  planHeader: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  planIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  planInfo: { flex: 1 },
  planName: { fontSize: 18, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.white },
  planPrice: { fontSize: 14, fontFamily: 'Inter-Regular', color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  planDetails: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.15)', gap: 8 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  detailText: { fontSize: 14, fontFamily: 'Inter-Regular', color: 'rgba(255,255,255,0.85)' },
  actionsRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  actionCard: { flex: 1, alignItems: 'center', backgroundColor: Colors.white, borderRadius: 16, borderWidth: 1, borderColor: Colors.slate200, paddingVertical: 16 },
  actionIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.green100, alignItems: 'center', justifyContent: 'center' },
  actionLabel: { fontSize: 12, fontFamily: 'Inter-Medium', fontWeight: '500', color: Colors.text, marginTop: 8 },
  cancelIcon: { fontSize: 16, color: Colors.error, fontFamily: 'Inter-Bold', fontWeight: '700' },
  securityRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 20 },
  securityText: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  sectionTitle: { fontSize: 17, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginBottom: 12 },
  invoiceCard: { marginBottom: 10 },
  invoiceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  invoiceInfo: { flex: 1 },
  invoiceDate: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  invoiceAmount: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  downloadBtn: { padding: 8 },
});
