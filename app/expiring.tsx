import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { pantryItems } from '@/constants/mockData';
import { AlertTriangle, PackageMinus, Trash2, ShoppingCart, Calendar } from 'lucide-react-native';

function getDaysUntilExpiry(dateStr: string): number {
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

export default function ExpiringScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const expiringItems = pantryItems
    .filter(p => getDaysUntilExpiry(p.expiryDate) <= 5)
    .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Expiring Soon" onBack={() => router.back()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        <View style={styles.alertBanner}>
          <AlertTriangle size={20} color={Colors.error} />
          <Text style={styles.alertText}>{expiringItems.length} items expiring within 5 days. Use them before they go to waste.</Text>
        </View>

        {expiringItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Nothing expiring soon</Text>
            <Text style={styles.emptySubtitle}>Your pantry items are fresh. Check back later.</Text>
          </View>
        ) : (
          expiringItems.map(item => {
            const days = getDaysUntilExpiry(item.expiryDate);
            return (
              <Card key={item.id} style={styles.itemCard} padding={16}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemCategory}>{item.category}</Text>
                  </View>
                  <Badge label={days <= 2 ? `Expires in ${days}d` : `${days}d left`} variant={days <= 2 ? 'red' : 'gold'} />
                </View>
                <View style={styles.itemDetails}>
                  <View style={styles.detailRow}>
                    <Calendar size={14} color={Colors.textMuted} />
                    <Text style={styles.detailText}>Expires: {item.expiryDate}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <PackageMinus size={14} color={Colors.textMuted} />
                    <Text style={styles.detailText}>{item.quantity} {item.unit} remaining</Text>
                  </View>
                </View>
                <View style={styles.actionsRow}>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: Colors.green100 }]}>
                    <PackageMinus size={16} color={Colors.primary} />
                    <Text style={[styles.actionText, { color: Colors.primary }]}>Consume</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: Colors.red100 }]}>
                    <Trash2 size={16} color={Colors.error} />
                    <Text style={[styles.actionText, { color: Colors.error }]}>Discard</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: Colors.slate100 }]}>
                    <ShoppingCart size={16} color={Colors.slate600} />
                    <Text style={[styles.actionText, { color: Colors.slate600 }]}>Buy more</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  alertBanner: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: Colors.red50, borderWidth: 1, borderColor: Colors.red100, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 16 },
  alertText: { flex: 1, fontSize: 14, fontFamily: 'Inter-Medium', fontWeight: '500', color: Colors.error },
  itemCard: { marginBottom: 12 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  itemCategory: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  itemDetails: { marginTop: 10, gap: 6 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  detailText: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  actionsRow: { flexDirection: 'row', gap: 8, marginTop: 14 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingVertical: 10, borderRadius: 10 },
  actionText: { fontSize: 12, fontFamily: 'Inter-SemiBold', fontWeight: '600' },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 80 },
  emptyTitle: { fontSize: 18, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  emptySubtitle: { fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 8, textAlign: 'center' },
});
