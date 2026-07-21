import { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Check } from 'lucide-react-native';

const expenseCategories = ['Monthly Shop', 'Fresh Produce', 'Meat and Poultry', 'Bakery and Dairy', 'Pantry Staples', 'Frozen Foods', 'Drinks', 'Household', 'Other'];

export default function AddExpenseScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [items, setItems] = useState('');
  const [date, setDate] = useState('2026-07-17');
  const [saved, setSaved] = useState(false);

  if (saved) {
    return (
      <View style={styles.container}>
        <View style={{ paddingTop: insets.top }}>
          <ScreenHeader title="Add Expense" />
        </View>
        <View style={styles.successContainer}>
          <View style={styles.checkCircle}>
            <Check size={40} color={Colors.white} />
          </View>
          <Text style={styles.successTitle}>Expense Recorded</Text>
          <Text style={styles.successSubtitle}>R{amount || '0.00'} has been added to your budget tracking.</Text>
          <View style={{ width: '100%', marginTop: 24 }}>
            <Button title="Back to Dashboard" variant="primary" size="large" fullWidth onPress={() => router.replace('/(tabs)')} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Add Expense" onBack={() => router.back()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        <Text style={styles.title}>Record a Purchase</Text>
        <Text style={styles.subtitle}>Track your grocery spending to stay within budget.</Text>

        <View style={styles.form}>
          <Input label="Purchase name" value={name} onChangeText={setName} placeholder="e.g. Pick n Pay weekly shop" />

          <Input label="Amount (R)" value={amount} onChangeText={setAmount} placeholder="0.00" keyboardType="numeric" />

          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryGrid}>
            {expenseCategories.map(cat => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryPill, category === cat && styles.categoryPillActive]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[styles.categoryPillText, category === cat && styles.categoryPillTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Input label="Number of items" value={items} onChangeText={setItems} placeholder="0" keyboardType="numeric" />
          <Input label="Date" value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" />
        </View>

        <View style={{ marginTop: 24 }}>
          <Button title="Save Expense" variant="primary" size="large" fullWidth onPress={() => setSaved(true)} />
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
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  categoryPill: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, backgroundColor: Colors.slate50, borderWidth: 1.5, borderColor: Colors.slate200 },
  categoryPillActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  categoryPillText: { fontSize: 13, fontFamily: 'Inter-Medium', fontWeight: '500', color: Colors.text },
  categoryPillTextActive: { color: Colors.white },
  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  checkCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  successTitle: { fontSize: 24, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 20 },
  successSubtitle: { fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 8, textAlign: 'center' },
});
