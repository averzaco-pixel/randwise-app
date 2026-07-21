import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { recipes } from '@/constants/mockData';
import { Clock, Users, Wallet, Sparkles, Calendar, ChevronRight } from 'lucide-react-native';

export default function MealsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Meal Planner" showBack={false} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}>
        {/* AI banner */}
        <Card style={styles.aiBanner} padding={16}>
          <View style={styles.aiIcon}>
            <Sparkles size={22} color={Colors.white} />
          </View>
          <View style={styles.aiInfo}>
            <Text style={styles.aiTitle}>AI Meal Suggestions</Text>
            <Text style={styles.aiSubtitle}>Recipes based on your pantry items</Text>
          </View>
        </Card>

        {/* Weekly plan shortcut */}
        <TouchableOpacity onPress={() => router.push('/weekly-meal-plan')} activeOpacity={0.8}>
          <Card style={styles.weeklyCard} padding={16}>
            <View style={styles.weeklyContent}>
              <View style={styles.weeklyIcon}>
                <Calendar size={22} color={Colors.primary} />
              </View>
              <View style={styles.weeklyInfo}>
                <Text style={styles.weeklyTitle}>Weekly Meal Plan</Text>
                <Text style={styles.weeklySubtitle}>7 dinners planned for this week</Text>
              </View>
            </View>
            <ChevronRight size={20} color={Colors.slate400} />
          </Card>
        </TouchableOpacity>

        {/* Recipe list */}
        <Text style={styles.sectionTitle}>Recommended Recipes</Text>
        {recipes.map(recipe => (
          <TouchableOpacity key={recipe.id} onPress={() => router.push(`/recipe/${recipe.id}`)} activeOpacity={0.8}>
            <Card style={styles.recipeCard} padding={16}>
              <View style={styles.recipeHeader}>
                <View style={styles.recipeIcon}>
                  <Users size={20} color={Colors.primary} />
                </View>
                <View style={styles.recipeInfo}>
                  <Text style={styles.recipeName}>{recipe.name}</Text>
                  <View style={styles.recipeMeta}>
                    <View style={styles.metaItem}>
                      <Clock size={13} color={Colors.textMuted} />
                      <Text style={styles.metaText}>{recipe.prepTime + recipe.cookTime} min</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Users size={13} color={Colors.textMuted} />
                      <Text style={styles.metaText}>{recipe.servings} servings</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Wallet size={13} color={Colors.textMuted} />
                      <Text style={styles.metaText}>R{recipe.estimatedCost}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.recipeBadges}>
                <Badge label={`${recipe.availableIngredients.length} available`} variant="green" size="small" />
                <Badge label={`${recipe.missingIngredients.length} missing`} variant="red" size="small" />
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  aiBanner: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16, backgroundColor: Colors.primary },
  aiIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  aiInfo: { flex: 1 },
  aiTitle: { fontSize: 16, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.white },
  aiSubtitle: { fontSize: 13, fontFamily: 'Inter-Regular', color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  weeklyCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  weeklyContent: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  weeklyIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.green100, alignItems: 'center', justifyContent: 'center' },
  weeklyInfo: { flex: 1 },
  weeklyTitle: { fontSize: 16, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  weeklySubtitle: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  sectionTitle: { fontSize: 17, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginBottom: 12 },
  recipeCard: { marginBottom: 12 },
  recipeHeader: { flexDirection: 'row', gap: 14 },
  recipeIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.green100, alignItems: 'center', justifyContent: 'center' },
  recipeInfo: { flex: 1 },
  recipeName: { fontSize: 16, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  recipeMeta: { flexDirection: 'row', gap: 12, marginTop: 6 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  recipeBadges: { flexDirection: 'row', gap: 6, marginTop: 10 },
});
