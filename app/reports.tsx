import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { TrendingUp, TrendingDown, Wallet, ShoppingCart, PieChart, BarChart3 } from 'lucide-react-native';

export default function ReportsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const monthlyData = [
    { month: 'Feb', amount: 5800 },
    { month: 'Mar', amount: 5400 },
    { month: 'Apr', amount: 6100 },
    { month: 'May', amount: 4900 },
    { month: 'Jun', amount: 5200 },
    { month: 'Jul', amount: 3320 },
  ];
  const maxAmount = Math.max(...monthlyData.map(d => d.amount));

  const categoryData = [
    { name: 'Fresh Produce', amount: 1120, color: Colors.primary, pct: 0.34 },
    { name: 'Meat & Poultry', amount: 980, color: Colors.accent, pct: 0.29 },
    { name: 'Pantry Staples', amount: 720, color: Colors.blue500, pct: 0.22 },
    { name: 'Dairy & Bakery', amount: 500, color: Colors.error, pct: 0.15 },
  ];

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Reports" onBack={() => router.back()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        {/* Savings highlight */}
        <Card style={styles.savingsCard} padding={20}>
          <View style={styles.savingsIcon}>
            <TrendingUp size={24} color={Colors.white} />
          </View>
          <View style={styles.savingsInfo}>
            <Text style={styles.savingsLabel}>Total Savings This Month</Text>
            <Text style={styles.savingsAmount}>R840.00</Text>
            <Text style={styles.savingsSubtext}>14% less than last month</Text>
          </View>
        </Card>

        {/* Quick stats */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard} padding={16}>
            <View style={[styles.statIcon, { backgroundColor: Colors.green100 }]}>
              <Wallet size={18} color={Colors.primary} />
            </View>
            <Text style={styles.statValue}>R3,320</Text>
            <Text style={styles.statLabel}>Spent</Text>
          </Card>
          <Card style={styles.statCard} padding={16}>
            <View style={[styles.statIcon, { backgroundColor: Colors.gold100 }]}>
              <TrendingDown size={18} color={Colors.gold600} />
            </View>
            <Text style={styles.statValue}>R2,680</Text>
            <Text style={styles.statLabel}>Remaining</Text>
          </Card>
          <Card style={styles.statCard} padding={16}>
            <View style={[styles.statIcon, { backgroundColor: Colors.blue100 }]}>
              <ShoppingCart size={18} color={Colors.blue500} />
            </View>
            <Text style={styles.statValue}>6</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </Card>
        </View>

        {/* Monthly spending chart */}
        <Text style={styles.sectionTitle}>Monthly Spending</Text>
        <Card padding={20}>
          <View style={styles.chartRow}>
            {monthlyData.map((d, i) => (
              <View key={i} style={styles.barColumn}>
                <View style={styles.barWrapper}>
                  <View style={[styles.bar, { height: (d.amount / maxAmount) * 140, backgroundColor: i === monthlyData.length - 1 ? Colors.primary : Colors.slate300 }]} />
                </View>
                <Text style={styles.barLabel}>{d.month}</Text>
                <Text style={styles.barAmount}>R{(d.amount / 1000).toFixed(1)}k</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Category breakdown */}
        <Text style={styles.sectionTitle}>Spending by Category</Text>
        <Card padding={20}>
          {categoryData.map((cat, i) => (
            <View key={i} style={[styles.categoryItem, i > 0 && styles.categoryBorder]}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryLabelRow}>
                  <View style={[styles.categoryDot, { backgroundColor: cat.color }]} />
                  <Text style={styles.categoryLabel}>{cat.name}</Text>
                </View>
                <Text style={styles.categoryAmount}>R{cat.amount}</Text>
              </View>
              <View style={styles.categoryBarWrapper}>
                <ProgressBar progress={cat.pct} height={8} color={cat.color} trackColor={Colors.slate100} />
              </View>
              <Text style={styles.categoryPct}>{(cat.pct * 100).toFixed(0)}% of spending</Text>
            </View>
          ))}
        </Card>

        {/* Insights */}
        <Text style={styles.sectionTitle}>AI Insights</Text>
        <Card style={styles.insightCard} padding={16}>
          <View style={styles.insightIcon}>
            <BarChart3 size={20} color={Colors.primary} />
          </View>
          <View style={styles.insightInfo}>
            <Text style={styles.insightTitle}>You saved R840 this month</Text>
            <Text style={styles.insightText}>Your fresh produce spending dropped 22% compared to last month. Great work reducing waste!</Text>
          </View>
        </Card>
        <Card style={styles.insightCard} padding={16}>
          <View style={styles.insightIcon}>
            <PieChart size={20} color={Colors.accent} />
          </View>
          <View style={styles.insightInfo}>
            <Text style={styles.insightTitle}>Meat spending is trending up</Text>
            <Text style={styles.insightText}>Consider substituting 2 meat meals per week with vegetarian options to save an estimated R240.</Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  savingsCard: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16, backgroundColor: Colors.primary },
  savingsIcon: { width: 56, height: 56, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  savingsInfo: { flex: 1 },
  savingsLabel: { fontSize: 13, fontFamily: 'Inter-Regular', color: 'rgba(255,255,255,0.85)' },
  savingsAmount: { fontSize: 30, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.white, marginTop: 2 },
  savingsSubtext: { fontSize: 12, fontFamily: 'Inter-Medium', fontWeight: '500', color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  statCard: { flex: 1 },
  statIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  statValue: { fontSize: 18, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 8 },
  statLabel: { fontSize: 11, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  sectionTitle: { fontSize: 17, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginBottom: 12, marginTop: 8 },
  chartRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 180 },
  barColumn: { alignItems: 'center', flex: 1 },
  barWrapper: { height: 150, justifyContent: 'flex-end', alignItems: 'center' },
  bar: { width: 24, borderRadius: 6 },
  barLabel: { fontSize: 12, fontFamily: 'Inter-Medium', fontWeight: '500', color: Colors.textMuted, marginTop: 6 },
  barAmount: { fontSize: 10, fontFamily: 'Inter-Regular', color: Colors.slate400 },
  categoryItem: { marginBottom: 16 },
  categoryBorder: { paddingTop: 16, borderTopWidth: 1, borderTopColor: Colors.slate100 },
  categoryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  categoryLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  categoryDot: { width: 10, height: 10, borderRadius: 5 },
  categoryLabel: { fontSize: 14, fontFamily: 'Inter-Medium', fontWeight: '500', color: Colors.text },
  categoryAmount: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  categoryBarWrapper: { marginTop: 4 },
  categoryPct: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 6 },
  insightCard: { flexDirection: 'row', gap: 14, marginBottom: 12 },
  insightIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.green100, alignItems: 'center', justifyContent: 'center' },
  insightInfo: { flex: 1 },
  insightTitle: { fontSize: 15, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  insightText: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 4, lineHeight: 20 },
});
