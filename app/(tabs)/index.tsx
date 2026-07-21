import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { Logo } from '@/components/illustrations/Logo';
import { expenses, shoppingItems, pantryItems, recipes } from '@/constants/mockData';
import { Bell, Plus, ShoppingCart, Archive, UtensilsCrossed, TrendingUp, Clock, AlertTriangle, ChevronRight, Wallet } from 'lucide-react-native';

export default function DashboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const budget = 6000;
  const spent = 3320;
  const remaining = budget - spent;
  const pct = spent / budget;
  const daysRemaining = 14;

  const expiringCount = pantryItems.filter(p => {
    const days = Math.ceil((new Date(p.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days <= 4;
  }).length;

  const quickActions = [
    { label: 'Add Grocery', icon: Plus, color: Colors.primary, onPress: () => router.push('/add-shopping-item') },
    { label: 'Record Purchase', icon: ShoppingCart, color: Colors.accent, onPress: () => router.push('/add-expense') },
    { label: 'Add Pantry', icon: Archive, color: Colors.blue500, onPress: () => router.push('/add-pantry-item') },
    { label: 'Generate Meal', icon: UtensilsCrossed, color: Colors.green700, onPress: () => router.push('/(tabs)/meals') },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.greetingName}>Lezahn</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.bellButton} onPress={() => router.push('/notifications')}>
              <Bell size={22} color={Colors.text} />
              <View style={styles.bellDot} />
            </TouchableOpacity>
            <Logo size={40} />
          </View>
        </View>

        {/* Budget Card */}
        <Card style={styles.budgetCard} padding={20}>
          <View style={styles.budgetHeader}>
            <View>
              <Text style={styles.budgetLabel}>Monthly Grocery Budget</Text>
              <Text style={styles.budgetAmount}>R{budget.toLocaleString()}</Text>
            </View>
            <View style={styles.daysBadge}>
              <Clock size={14} color={Colors.primary} />
              <Text style={styles.daysText}>{daysRemaining} days left</Text>
            </View>
          </View>

          <View style={styles.budgetStats}>
            <View style={styles.budgetStat}>
              <Text style={styles.budgetStatLabel}>Spent</Text>
              <Text style={styles.budgetStatValue}>R{spent.toLocaleString()}</Text>
            </View>
            <View style={styles.budgetStat}>
              <Text style={styles.budgetStatLabel}>Remaining</Text>
              <Text style={[styles.budgetStatValue, { color: Colors.primary }]}>R{remaining.toLocaleString()}</Text>
            </View>
            <View style={styles.budgetStat}>
              <Text style={styles.budgetStatLabel}>Used</Text>
              <Text style={[styles.budgetStatValue, { color: Colors.accent }]}>55%</Text>
            </View>
          </View>

          <View style={styles.progressWrapper}>
            <ProgressBar progress={pct} height={12} color={Colors.primary} />
          </View>

          <TouchableOpacity onPress={() => router.push('/budget')} style={styles.budgetLink}>
            <Text style={styles.budgetLinkText}>View budget details</Text>
            <ChevronRight size={16} color={Colors.primary} />
          </TouchableOpacity>
        </Card>

        {/* Quick Actions */}
        <View style={styles.quickActionsRow}>
          {quickActions.map((action, i) => (
            <TouchableOpacity key={i} style={styles.quickAction} onPress={action.onPress} activeOpacity={0.8}>
              <View style={[styles.quickActionIcon, { backgroundColor: action.color + '15' }]}>
                <action.icon size={22} color={action.color} />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <Card style={styles.statCard} padding={16}>
            <View style={[styles.statIcon, { backgroundColor: Colors.green100 }]}>
              <TrendingUp size={18} color={Colors.primary} />
            </View>
            <Text style={styles.statValue}>R840</Text>
            <Text style={styles.statLabel}>Est. savings</Text>
          </Card>

          <Card style={styles.statCard} padding={16}>
            <View style={[styles.statIcon, { backgroundColor: Colors.gold100 }]}>
              <ShoppingCart size={18} color={Colors.gold600} />
            </View>
            <Text style={styles.statValue}>{shoppingItems.length}</Text>
            <Text style={styles.statLabel}>Shopping items</Text>
          </Card>

          <Card style={styles.statCard} padding={16}>
            <View style={[styles.statIcon, { backgroundColor: Colors.blue100 }]}>
              <Archive size={18} color={Colors.blue500} />
            </View>
            <Text style={styles.statValue}>{pantryItems.length}</Text>
            <Text style={styles.statLabel}>Pantry items</Text>
          </Card>

          <Card style={styles.statCard} padding={16}>
            <View style={[styles.statIcon, { backgroundColor: Colors.red100 }]}>
              <AlertTriangle size={18} color={Colors.error} />
            </View>
            <Text style={styles.statValue}>{expiringCount}</Text>
            <Text style={styles.statLabel}>Expiring soon</Text>
          </Card>
        </View>

        {/* Dinner Recommendation */}
        <SectionHeader title="Tonight's Dinner" actionText="See more" onAction={() => router.push('/(tabs)/meals')} />
        <Card style={styles.dinnerCard} padding={16}>
          <View style={styles.dinnerContent}>
            <View style={styles.dinnerIcon}>
              <UtensilsCrossed size={24} color={Colors.primary} />
            </View>
            <View style={styles.dinnerInfo}>
              <Text style={styles.dinnerName}>{recipes[0].name}</Text>
              <Text style={styles.dinnerMeta}>{recipes[0].prepTime + recipes[0].cookTime} min · {recipes[0].servings} servings</Text>
              <View style={styles.dinnerBadges}>
                <Badge label={`R${recipes[0].estimatedCost}`} variant="green" size="small" />
                <Badge label={`${recipes[0].availableIngredients.length} available`} variant="gold" size="small" />
                <Badge label={`${recipes[0].missingIngredients.length} missing`} variant="red" size="small" />
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.dinnerButton} onPress={() => router.push(`/recipe/${recipes[0].id}`)}>
            <Text style={styles.dinnerButtonText}>View recipe</Text>
          </TouchableOpacity>
        </Card>

        {/* Recent Expenses */}
        <SectionHeader title="Recent Expenses" actionText="View all" onAction={() => router.push('/expense-history')} />
        <View style={styles.expensesList}>
          {expenses.slice(0, 3).map((expense, i) => (
            <Card key={expense.id} style={[styles.expenseCard, i > 0 && styles.expenseCardGap]} padding={14}>
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
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  greeting: { fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  greetingName: { fontSize: 24, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  bellButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.slate200, alignItems: 'center', justifyContent: 'center' },
  bellDot: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.error, borderWidth: 2, borderColor: Colors.white },
  budgetCard: { marginHorizontal: 20 },
  budgetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  budgetLabel: { fontSize: 14, fontFamily: 'Inter-Medium', fontWeight: '500', color: Colors.textMuted },
  budgetAmount: { fontSize: 32, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 4 },
  daysBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.green100, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  daysText: { fontSize: 12, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.primary },
  budgetStats: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  budgetStat: { flex: 1 },
  budgetStatLabel: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  budgetStatValue: { fontSize: 18, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text, marginTop: 2 },
  progressWrapper: { marginTop: 16 },
  budgetLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 14 },
  budgetLinkText: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.primary },
  quickActionsRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 16 },
  quickAction: { alignItems: 'center', flex: 1 },
  quickActionIcon: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  quickActionLabel: { fontSize: 11, fontFamily: 'Inter-Medium', fontWeight: '500', color: Colors.text, marginTop: 6, textAlign: 'center' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, marginTop: 20, gap: 12 },
  statCard: { width: '47%', flexGrow: 1 },
  statIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  statValue: { fontSize: 22, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 8 },
  statLabel: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  dinnerCard: { marginHorizontal: 20 },
  dinnerContent: { flexDirection: 'row', gap: 14 },
  dinnerIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.green100, alignItems: 'center', justifyContent: 'center' },
  dinnerInfo: { flex: 1 },
  dinnerName: { fontSize: 16, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  dinnerMeta: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  dinnerBadges: { flexDirection: 'row', gap: 6, marginTop: 8, flexWrap: 'wrap' },
  dinnerButton: { marginTop: 14, backgroundColor: Colors.green50, borderRadius: 12, paddingVertical: 10, alignItems: 'center' },
  dinnerButtonText: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.primary },
  expensesList: { paddingHorizontal: 20, marginTop: 4 },
  expenseCard: {},
  expenseCardGap: { marginTop: 10 },
  expenseRow: { flexDirection: 'row', alignItems: 'center' },
  expenseIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.green100, alignItems: 'center', justifyContent: 'center' },
  expenseInfo: { flex: 1, marginLeft: 12 },
  expenseName: { fontSize: 15, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  expenseDate: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  expenseAmount: { fontSize: 16, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
});
