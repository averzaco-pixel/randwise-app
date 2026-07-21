import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { expenses } from '@/constants/mockData';
import { Wallet, TrendingDown } from 'lucide-react-native';

export default function ExpenseHistoryScreen() {
  const insets = useSafeAreaInsets();
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Expense History" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        {/* Summary */}
        <Card style={styles.summaryCard} padding={20}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryIcon}>
              <TrendingDown size={20} color={Colors.error} />
            </View>
            <View>
              <Text style={styles.summaryLabel}>Total spent this month</Text>
              <Text style={styles.summaryAmount}>R{totalSpent.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
            </View>
          </View>
          <View style={styles.summaryStats}>
            <View style={styles.summaryStat}>
              <Text style={styles.summaryStatValue}>{expenses.length}</Text>
              <Text style={styles.summaryStatLabel}>Purchases</Text>
            </View>
            <View style={styles.summaryStat}>
              <Text style={styles.summaryStatValue}>{expenses.reduce((s, e) => s + e.items, 0)}</Text>
              <Text style={styles.summaryStatLabel}>Total items</Text>
            </View>
            <View style={styles.summaryStat}>
              <Text style={styles.summaryStatValue}>R{(totalSpent / expenses.length).toFixed(0)}</Text>
              <Text style={styles.summaryStatLabel}>Avg per trip</Text>
            </View>
          </View>
        </Card>

        {/* History */}
        <Text style={styles.sectionTitle}>All Expenses</Text>
        {expenses.map(expense => (
          <Card key={expense.id} style={styles.expenseCard} padding={16}>
            <View style={styles.expenseRow}>
              <View style={styles.expenseIcon}>
                <Wallet size={18} color={Colors.primary} />
              </View>
              <View style={styles.expenseInfo}>
                <Text style={styles.expenseName}>{expense.name}</Text>
                <Text style={styles.expenseMeta}>{expense.date} · {expense.items} items · {expense.category}</Text>
              </View>
              <Text style={styles.expenseAmount}>R{expense.amount.toFixed(2)}</Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  summaryCard: { marginBottom: 20 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  summaryIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.red50, alignItems: 'center', justifyContent: 'center' },
  summaryLabel: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  summaryAmount: { fontSize: 28, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 2 },
  summaryStats: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: Colors.slate100 },
  summaryStat: { alignItems: 'center', flex: 1 },
  summaryStatValue: { fontSize: 18, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  summaryStatLabel: { fontSize: 11, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  sectionTitle: { fontSize: 17, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginBottom: 12 },
  expenseCard: { marginBottom: 10 },
  expenseRow: { flexDirection: 'row', alignItems: 'center' },
  expenseIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.green100, alignItems: 'center', justifyContent: 'center' },
  expenseInfo: { flex: 1, marginLeft: 12 },
  expenseName: { fontSize: 15, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  expenseMeta: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  expenseAmount: { fontSize: 16, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
});
