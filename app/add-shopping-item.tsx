import { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { shoppingCategories } from '@/constants/mockData';
import { Check } from 'lucide-react-native';

export default function AddShoppingItemScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [saved, setSaved] = useState(false);

  const units = ['pcs', 'kg', 'g', 'L', 'ml', 'bag', 'box', 'bottle', 'pack', 'loaf', 'dozen'];

  if (saved) {
    return (
      <View style={styles.container}>
        <View style={{ paddingTop: insets.top }}>
          <ScreenHeader title="Add Item" />
        </View>
        <View style={styles.successContainer}>
          <View style={styles.checkCircle}>
            <Check size={40} color={Colors.white} />
          </View>
          <Text style={styles.successTitle}>Item Added</Text>
          <Text style={styles.successSubtitle}>{name || 'Item'} has been added to your shopping list.</Text>
          <View style={{ width: '100%', marginTop: 24 }}>
            <Button title="Back to Shopping List" variant="primary" size="large" fullWidth onPress={() => router.replace('/(tabs)/shopping')} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Add Shopping Item" onBack={() => router.back()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        <Text style={styles.title}>Add to Shopping List</Text>
        <Text style={styles.subtitle}>Add a grocery item you need to buy.</Text>

        <View style={styles.form}>
          <Input label="Item name" value={name} onChangeText={setName} placeholder="e.g. Milk 2L" />

          <Text style={styles.label}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
            {shoppingCategories.map(cat => (
              <TouchableOpacity
                key={cat.name}
                style={[styles.categoryChip, category === cat.name && styles.categoryChipActive]}
                onPress={() => setCategory(cat.name)}
              >
                <Text style={styles.categoryEmoji}>{cat.icon}</Text>
                <Text style={[styles.categoryChipText, category === cat.name && styles.categoryChipTextActive]}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.rowInputs}>
            <View style={styles.flex1}>
              <Input label="Quantity" value={quantity} onChangeText={setQuantity} placeholder="1" keyboardType="numeric" />
            </View>
            <View style={styles.flex1}>
              <Text style={styles.label}>Unit</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.unitScroll}>
                {units.map(u => (
                  <TouchableOpacity
                    key={u}
                    style={[styles.unitChip, unit === u && styles.unitChipActive]}
                    onPress={() => setUnit(u)}
                  >
                    <Text style={[styles.unitChipText, unit === u && styles.unitChipTextActive]}>{u}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <Input label="Estimated price (R)" value={price} onChangeText={setPrice} placeholder="0.00" keyboardType="numeric" />
        </View>

        <View style={{ marginTop: 24 }}>
          <Button title="Add to List" variant="primary" size="large" fullWidth onPress={() => setSaved(true)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  title: { fontSize: 24, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  subtitle: { fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 6 },
  form: { marginTop: 28 },
  label: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text, marginBottom: 8 },
  categoryScroll: { gap: 8, paddingBottom: 4, marginBottom: 16 },
  categoryChip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, backgroundColor: Colors.slate50, borderWidth: 1.5, borderColor: Colors.slate200 },
  categoryChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  categoryEmoji: { fontSize: 14 },
  categoryChipText: { fontSize: 13, fontFamily: 'Inter-Medium', fontWeight: '500', color: Colors.text },
  categoryChipTextActive: { color: Colors.white },
  rowInputs: { flexDirection: 'row', gap: 12 },
  flex1: { flex: 1 },
  unitScroll: { gap: 6, paddingBottom: 4 },
  unitChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, backgroundColor: Colors.slate50, borderWidth: 1.5, borderColor: Colors.slate200 },
  unitChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  unitChipText: { fontSize: 13, fontFamily: 'Inter-Medium', fontWeight: '500', color: Colors.text },
  unitChipTextActive: { color: Colors.white },
  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  checkCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  successTitle: { fontSize: 24, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 20 },
  successSubtitle: { fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 8, textAlign: 'center' },
});
