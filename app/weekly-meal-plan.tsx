import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { weeklyMealPlan, recipes } from '@/constants/mockData';
import { Calendar, ChevronRight, UtensilsCrossed } from 'lucide-react-native';

export default function WeeklyMealPlanScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Weekly Meal Plan" onBack={() => router.back()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        {/* Week summary */}
        <Card style={styles.summaryCard} padding={20}>
          <View style={styles.summaryHeader}>
            <View style={styles.summaryIcon}>
              <Calendar size={22} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.summaryTitle}>This Week's Plan</Text>
              <Text style={styles.summarySubtitle}>7 dinners planned</Text>
            </View>
          </View>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>7</Text>
              <Text style={styles.statLabel}>Meals</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>R640</Text>
              <Text style={styles.statLabel}>Est. cost</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>28</Text>
              <Text style={styles.statLabel}>Servings</Text>
            </View>
          </View>
        </Card>

        {/* Daily plan */}
        <Text style={styles.sectionTitle}>Daily Plan</Text>
        {weeklyMealPlan.map(entry => {
          const recipe = recipes.find(r => r.id === entry.recipeId);
          return (
            <TouchableOpacity key={entry.id} onPress={() => router.push(`/recipe/${entry.recipeId}`)} activeOpacity={0.8}>
              <Card style={styles.dayCard} padding={16}>
                <View style={styles.dayRow}>
                  <View style={styles.dayBadge}>
                    <Text style={styles.dayBadgeText}>{entry.day.slice(0, 3)}</Text>
                  </View>
                  <View style={styles.dayInfo}>
                    <Text style={styles.dayMealType}>{entry.mealType}</Text>
                    <Text style={styles.dayRecipeName}>{entry.recipeName}</Text>
                    <View style={styles.dayMeta}>
                      <Text style={styles.dayMetaText}>{recipe ? `${recipe.prepTime + recipe.cookTime} min` : ''}</Text>
                      <Text style={styles.dayMetaDot}>·</Text>
                      <Text style={styles.dayMetaText}>{recipe ? `${recipe.servings} servings` : ''}</Text>
                      <Text style={styles.dayMetaDot}>·</Text>
                      <Text style={styles.dayMetaText}>{recipe ? `R${recipe.estimatedCost}` : ''}</Text>
                    </View>
                  </View>
                  <ChevronRight size={20} color={Colors.slate400} />
                </View>
              </Card>
            </TouchableOpacity>
          );
        })}

        <View style={{ marginTop: 20 }}>
          <Button title="Generate New Meal Plan" variant="primary" size="large" fullWidth icon={<UtensilsCrossed size={20} color={Colors.white} />} onPress={() => router.push('/(tabs)/meals')} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  summaryCard: { marginBottom: 20 },
  summaryHeader: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  summaryIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.green100, alignItems: 'center', justifyContent: 'center' },
  summaryTitle: { fontSize: 18, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  summarySubtitle: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  summaryStats: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: Colors.slate100 },
  statItem: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 20, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  statLabel: { fontSize: 11, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  sectionTitle: { fontSize: 17, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginBottom: 12 },
  dayCard: { marginBottom: 10 },
  dayRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dayBadge: { width: 52, height: 52, borderRadius: 14, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  dayBadgeText: { fontSize: 14, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.white },
  dayInfo: { flex: 1 },
  dayMealType: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  dayRecipeName: { fontSize: 15, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text, marginTop: 2 },
  dayMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  dayMetaText: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  dayMetaDot: { fontSize: 12, color: Colors.slate300 },
});
