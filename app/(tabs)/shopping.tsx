import { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { shoppingItems, shoppingCategories } from '@/constants/mockData';
import { EmptyShoppingListIllustration } from '@/components/illustrations/Illustrations';
import { ShoppingItem } from '@/types';
import { Plus, Check, Trash2 } from 'lucide-react-native';

export default function ShoppingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<ShoppingItem[]>(shoppingItems);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredItems = activeCategory ? items.filter(i => i.category === activeCategory) : items;
  const checkedCount = items.filter(i => i.checked).length;
  const totalEst = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const toggleCheck = (id: string) => {
    setItems(items.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const groupedCategories = Array.from(new Set(filteredItems.map(i => i.category)));

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Shopping List" showBack={false} />
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{items.length}</Text>
          <Text style={styles.summaryLabel}>Total items</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{checkedCount}</Text>
          <Text style={styles.summaryLabel}>Checked</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: Colors.primary }]}>R{totalEst.toFixed(0)}</Text>
          <Text style={styles.summaryLabel}>Est. total</Text>
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
        <TouchableOpacity
          style={[styles.categoryChip, !activeCategory && styles.categoryChipActive]}
          onPress={() => setActiveCategory(null)}
        >
          <Text style={[styles.categoryChipText, !activeCategory && styles.categoryChipTextActive]}>All</Text>
        </TouchableOpacity>
        {shoppingCategories.map(cat => (
          <TouchableOpacity
            key={cat.name}
            style={[styles.categoryChip, activeCategory === cat.name && styles.categoryChipActive]}
            onPress={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
          >
            <Text style={styles.categoryChipEmoji}>{cat.icon}</Text>
            <Text style={[styles.categoryChipText, activeCategory === cat.name && styles.categoryChipTextActive]}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <EmptyShoppingList />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}>
          {groupedCategories.map(category => (
            <View key={category} style={styles.categoryGroup}>
              <Text style={styles.categoryTitle}>{category}</Text>
              {filteredItems.filter(i => i.category === category).map(item => (
                <Card key={item.id} style={styles.itemCard} padding={14}>
                  <View style={styles.itemRow}>
                    <TouchableOpacity
                      style={[styles.checkbox, item.checked && styles.checkboxChecked]}
                      onPress={() => toggleCheck(item.id)}
                    >
                      {item.checked && <Check size={16} color={Colors.white} />}
                    </TouchableOpacity>
                    <View style={styles.itemInfo}>
                      <Text style={[styles.itemName, item.checked && styles.itemNameChecked]}>{item.name}</Text>
                      <Text style={styles.itemMeta}>{item.quantity} {item.unit} · R{item.price.toFixed(2)}</Text>
                    </View>
                    <Text style={styles.itemPrice}>R{(item.price * item.quantity).toFixed(2)}</Text>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => removeItem(item.id)}>
                      <Trash2 size={18} color={Colors.slate400} />
                    </TouchableOpacity>
                  </View>
                </Card>
              ))}
            </View>
          ))}
        </ScrollView>
      )}

      <View style={styles.fabWrapper}>
        <Button title="Add Item" variant="primary" size="large" fullWidth icon={<Plus size={20} color={Colors.white} />} onPress={() => router.push('/add-shopping-item')} />
      </View>
    </View>
  );
}

function EmptyShoppingList() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, paddingBottom: 100 }}>
      <EmptyShoppingListIllustration size={180} />
      <Text style={styles.emptyTitle}>Your list is empty</Text>
      <Text style={styles.emptySubtitle}>Add groceries to your shopping list to get started.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  summaryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 20, paddingVertical: 16, backgroundColor: Colors.white, marginHorizontal: 20, borderRadius: 16, borderWidth: 1, borderColor: Colors.slate200 },
  summaryItem: { alignItems: 'center', flex: 1 },
  summaryValue: { fontSize: 22, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  summaryLabel: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  summaryDivider: { width: 1, height: 32, backgroundColor: Colors.slate200 },
  categoryScroll: { paddingHorizontal: 20, paddingVertical: 14, gap: 8 },
  categoryChip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.slate200 },
  categoryChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  categoryChipEmoji: { fontSize: 14 },
  categoryChipText: { fontSize: 13, fontFamily: 'Inter-Medium', fontWeight: '500', color: Colors.text },
  categoryChipTextActive: { color: Colors.white },
  categoryGroup: { marginBottom: 16 },
  categoryTitle: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.textMuted, marginBottom: 8, marginTop: 4 },
  itemCard: { marginBottom: 8 },
  itemRow: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 24, height: 24, borderRadius: 8, borderWidth: 2, borderColor: Colors.slate300, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  itemInfo: { flex: 1, marginLeft: 12 },
  itemName: { fontSize: 15, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  itemNameChecked: { textDecorationLine: 'line-through', color: Colors.slate400 },
  itemMeta: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  itemPrice: { fontSize: 15, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginRight: 12 },
  deleteButton: { padding: 4 },
  fabWrapper: { position: 'absolute', bottom: 80, left: 20, right: 20 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 18, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 16 },
  emptySubtitle: { fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 8, textAlign: 'center', paddingHorizontal: 40 },
});
