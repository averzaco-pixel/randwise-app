import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { pantryItems } from '@/constants/mockData';
import { PackageMinus, ShoppingCart, Archive } from 'lucide-react-native';

export default function LowStockScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const lowStockItems = pantryItems.filter(p => p.lowStock);

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Low Stock" onBack={() => router.back()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        <View style={styles.alertBanner}>
          <PackageMinus size={20} color={Colors.gold600} />
          <Text style={styles.alertText}>{lowStockItems.length} items are running low. Consider adding them to your shopping list.</Text>
        </View>

        {lowStockItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>All stocked up</Text>
            <Text style={styles.emptySubtitle}>No items are running low. Great job managing your pantry!</Text>
          </View>
        ) : (
          lowStockItems.map(item => (
            <Card key={item.id} style={styles.itemCard} padding={16}>
              <View style={styles.itemHeader}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemCategory}>{item.category}</Text>
                </View>
                <Badge label="Low stock" variant="gold" />
              </View>
              <View style={styles.stockBar}>
                <View style={styles.stockBarTrack}>
                  <View style={[styles.stockBarFill, { width: `${Math.min(item.quantity * 10, 100)}%` }]} />
                </View>
                <Text style={styles.stockText}>{item.quantity} {item.unit} left</Text>
              </View>
              <View style={styles.actionsRow}>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: Colors.green100 }]}>
                  <Archive size={16} color={Colors.primary} />
                  <Text style={[styles.actionText, { color: Colors.primary }]}>Update stock</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: Colors.gold100 }]}>
                  <ShoppingCart size={16} color={Colors.gold600} />
                  <Text style={[styles.actionText, { color: Colors.gold600 }]}>Add to list</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  alertBanner: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: Colors.gold50, borderWidth: 1, borderColor: Colors.gold100, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 16 },
  alertText: { flex: 1, fontSize: 14, fontFamily: 'Inter-Medium', fontWeight: '500', color: Colors.gold600 },
  itemCard: { marginBottom: 12 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  itemCategory: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  stockBar: { marginTop: 12 },
  stockBarTrack: { height: 8, borderRadius: 4, backgroundColor: Colors.slate100, overflow: 'hidden' },
  stockBarFill: { height: '100%', backgroundColor: Colors.accent, borderRadius: 4 },
  stockText: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 6 },
  actionsRow: { flexDirection: 'row', gap: 8, marginTop: 14 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingVertical: 10, borderRadius: 10 },
  actionText: { fontSize: 12, fontFamily: 'Inter-SemiBold', fontWeight: '600' },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 80 },
  emptyTitle: { fontSize: 18, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  emptySubtitle: { fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 8, textAlign: 'center' },
});
