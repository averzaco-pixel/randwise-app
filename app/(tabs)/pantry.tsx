import { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { pantryItems } from '@/constants/mockData';
import { PantryItem } from '@/types';
import { Plus, AlertTriangle, PackageMinus, Trash2, ShoppingCart, Calendar } from 'lucide-react-native';
import { EmptyPantryIllustration } from '@/components/illustrations/Illustrations';

function getDaysUntilExpiry(dateStr: string): number {
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

function getExpiryStatus(dateStr: string): { label: string; variant: 'green' | 'gold' | 'red' } {
  const days = getDaysUntilExpiry(dateStr);
  if (days <= 2) return { label: `${days}d left`, variant: 'red' };
  if (days <= 5) return { label: `${days}d left`, variant: 'gold' };
  return { label: `${days}d left`, variant: 'green' };
}

export default function PantryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<PantryItem[]>(pantryItems);

  const consumeItem = (id: string) => {
    setItems(items.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i).filter(i => i.quantity > 0));
  };

  const discardItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const addToShoppingList = (item: PantryItem) => {
    // In a real app, this would add to the shopping list
  };

  const expiringSoon = items.filter(i => getDaysUntilExpiry(i.expiryDate) <= 4);
  const lowStockItems = items.filter(i => i.lowStock);

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Pantry" showBack={false} />
      </View>

      {/* Alert bar */}
      {(expiringSoon.length > 0 || lowStockItems.length > 0) && (
        <View style={styles.alertBar}>
          <View style={styles.alertItem} >
            <AlertTriangle size={16} color={Colors.error} />
            <Text style={styles.alertText}>{expiringSoon.length} expiring soon</Text>
          </View>
          <View style={styles.alertItem}>
            <PackageMinus size={16} color={Colors.gold600} />
            <Text style={styles.alertText}>{lowStockItems.length} low stock</Text>
          </View>
        </View>
      )}

      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <EmptyPantryIllustration size={180} />
          <Text style={styles.emptyTitle}>Your pantry is empty</Text>
          <Text style={styles.emptySubtitle}>Add items to track expiry dates and stock levels.</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}>
          {items.map(item => {
            const expiry = getExpiryStatus(item.expiryDate);
            return (
              <Card key={item.id} style={styles.itemCard} padding={14}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemCategory}>{item.category}</Text>
                  </View>
                  <View style={styles.itemBadges}>
                    {item.lowStock && <Badge label="Low stock" variant="gold" size="small" />}
                    <Badge label={expiry.label} variant={expiry.variant} size="small" />
                  </View>
                </View>

                <View style={styles.itemDetails}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Quantity</Text>
                    <Text style={styles.detailValue}>{item.quantity} {item.unit}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Expiry</Text>
                    <Text style={styles.detailValue}>{item.expiryDate}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Value</Text>
                    <Text style={styles.detailValue}>R{item.price.toFixed(2)}</Text>
                  </View>
                </View>

                <View style={styles.actionsRow}>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: Colors.green100 }]} onPress={() => consumeItem(item.id)}>
                    <PackageMinus size={16} color={Colors.primary} />
                    <Text style={[styles.actionText, { color: Colors.primary }]}>Consume</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: Colors.red100 }]} onPress={() => discardItem(item.id)}>
                    <Trash2 size={16} color={Colors.error} />
                    <Text style={[styles.actionText, { color: Colors.error }]}>Discard</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: Colors.slate100 }]} onPress={() => addToShoppingList(item)}>
                    <ShoppingCart size={16} color={Colors.slate600} />
                    <Text style={[styles.actionText, { color: Colors.slate600 }]}>Add to list</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            );
          })}
        </ScrollView>
      )}

      <View style={styles.fabWrapper}>
        <Button title="Add Pantry Item" variant="primary" size="large" fullWidth icon={<Plus size={20} color={Colors.white} />} onPress={() => router.push('/add-pantry-item')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  alertBar: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, paddingVertical: 10 },
  alertItem: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.white, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: Colors.slate200 },
  alertText: { fontSize: 13, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  itemCard: { marginBottom: 12 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  itemCategory: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  itemBadges: { flexDirection: 'row', gap: 6 },
  itemDetails: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: Colors.slate100 },
  detailItem: { flex: 1 },
  detailLabel: { fontSize: 11, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  detailValue: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text, marginTop: 2 },
  actionsRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingVertical: 10, borderRadius: 10 },
  actionText: { fontSize: 12, fontFamily: 'Inter-SemiBold', fontWeight: '600' },
  fabWrapper: { position: 'absolute', bottom: 80, left: 20, right: 20 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 100 },
  emptyTitle: { fontSize: 18, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 16 },
  emptySubtitle: { fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 8, textAlign: 'center', paddingHorizontal: 40 },
});
