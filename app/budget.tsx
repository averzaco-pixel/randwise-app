import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { expenses } from '@/constants/mockData';
import { TrendingUp, TrendingDown, Wallet, Clock } from 'lucide-react-native';

export default function BudgetScreen() {
  const insets = useSafeAreaInsets();
  const budget = 6000;
  const spent = 3320;
  const remaining = budget - spent;
  const pct = spent / budget;
  const dailyAvg = spent / 16;
  const projectedTotal = dailyAvg * 30;

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Grocery Budget" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        {/* Main budget card */}
        <Card style={styles.mainCard} padding={24}>
          <Text style={styles.cardLabel}>Monthly Grocery Budget</Text>
          <Text style={styles.cardAmount}>R{budget.toLocaleString()}</Text>
          <View style={styles.progressWrapper}>
            <ProgressBar progress={pct} height={14} color={Colors.primary} />
          </View>
          <View style={styles.budgetRow}>
            <View style={styles.budgetItem}>
              <Text style={styles.budgetItemLabel}>Spent</Text>
              <Text style={styles.budgetItemValue}>R{spent.toLocaleString()}</Text>
            </View>
            <View style={styles.budgetItem}>
              <Text style={styles.budgetItemLabel}>Remaining</Text>
              <Text style={[styles.budgetItemValue, { color: Colors.primary }]}>R{remaining.toLocaleString()}</Text>
            </View>
          </View>
          <View style={styles.daysRow}>
            <Clock size={14} color={Colors.textMuted} />
            <Text style={styles.daysText}>14 days remaining this month</Text>
          </View>
        </Card>

        {/* Stats */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard} padding={16}>
            <View style={[styles.statIcon, { backgroundColor: Colors.green100 }]}>
              <TrendingUp size={18} color={Colors.primary} />
            </View>
            <Text style={styles.statValue}>R{dailyAvg.toFixed(0)}</Text>
            <Text style={styles.statLabel}>Daily average</Text>
          </Card>
          <Card style={styles.statCard} padding={16}>
            <View style={[styles.statIcon, { backgroundColor: Colors.gold100 }]}>
              <Wallet size={18} color={Colors.gold600} />
            </View>
            <Text style={styles.statValue}>R{projectedTotal.toFixed(0)}</Text>
            <Text style={styles.statLabel}>Projected total</Text>
          </Card>
        </View>

        {/* Budget breakdown */}
        <Text style={styles.sectionTitle}>Spending Breakdown</Text>
        <Card padding={20}>
          <View style={styles.breakdownItem}>
            <View style={styles.breakdownHeader}>
              <Text style={styles.breakdownLabel}>Fresh Produce</Text>
              <Text style={styles.breakdownAmount}>R1,120</Text>
            </View>
            <ProgressBar progress={0.34} height={8} color={Colors.primary} trackColor={Colors.slate100} />
          </View>
          <View style={styles.breakdownItem}>
            <View style={styles.breakdownHeader}>
              <Text style={styles.breakdownLabel}>Meat & Poultry</Text>
              <Text style={styles.breakdownAmount}>R980</Text>
            </View>
            <ProgressBar progress={0.29} height={8} color={Colors.accent} trackColor={Colors.slate100} />
          </View>
          <View style={styles.breakdownItem}>
            <View style={styles.breakdownHeader}>
              <Text style={styles.breakdownLabel}>Pantry Staples</Text>
              <Text style={styles.breakdownAmount}>R720</Text>
            </View>
            <ProgressBar progress={0.22} height={8} color={Colors.blue500} trackColor={Colors.slate100} />
          </View>
          <View style={[styles.breakdownItem, { marginBottom: 0 }]}>
            <View style={styles.breakdownHeader}>
              <Text style={styles.breakdownLabel}>Dairy & Bakery</Text>
              <Text style={styles.breakdownAmount}>R500</Text>
            </View>
            <ProgressBar progress={0.15} height={8} color={Colors.error} trackColor={Colors.slate100} />
          </View>
        </Card>

        {/* Recent expenses */}
        <Text style={styles.sectionTitle}>Recent Expenses</Text>
        {expenses.slice(0, 4).map(expense => (
          <Card key={expense.id} style={styles.expenseCard} padding={14}>
            <View style={styles.expenseRow}>
              <View style={styles.expenseIcon}>
                <Wallet size={18} color={Colors.primary} />
              </View>
              <View style={styles.expenseInfo}>
                <Text style={styles.expenseName} numberOfLines={1}>{expense.name}</Text>
                <Text style={styles.expenseDate}>{expense.date} · {expense.items} items</Text>
              </View>
              <Text style={styles.expenseAmount}>R{expense.amount.toFixed(2)}</Text>
            </View>
          </Card>
        ))}

        <View style={{ marginTop: 20 }}>
          <Button title="Record New Purchase" variant="primary" size="large" fullWidth />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  mainCard: { marginBottom: 16 },
  cardLabel: { fontSize: 14, fontFamily: 'Inter-Medium', fontWeight: '500', color: Colors.textMuted },
  cardAmount: { fontSize: 36, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 4 },
  progressWrapper: { marginTop: 20 },
  budgetRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  budgetItem: { flex: 1 },
  budgetItemLabel: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  budgetItemValue: { fontSize: 20, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text, marginTop: 2 },
  daysRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 16 },
  daysText: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  statCard: { flex: 1 },
  statIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  statValue: { fontSize: 20, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 8 },
  statLabel: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  sectionTitle: { fontSize: 17, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginBottom: 12, marginTop: 8 },
  breakdownItem: { marginBottom: 16 },
  breakdownHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  breakdownLabel: { fontSize: 14, fontFamily: 'Inter-Medium', fontWeight: '500', color: Colors.text },
  breakdownAmount: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  expenseCard: { marginBottom: 10 },
  expenseRow: { flexDirection: 'row', alignItems: 'center' },
  expenseIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.green100, alignItems: 'center', justifyContent: 'center' },
  expenseInfo: { flex: 1, marginLeft: 12 },
  expenseName: { fontSize: 15, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  expenseDate: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  expenseAmount: { fontSize: 16, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
});
