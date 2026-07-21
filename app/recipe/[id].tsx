import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { recipes } from '@/constants/mockData';
import { Clock, Users, Wallet, Check, X, ShoppingCart, ChefHat } from 'lucide-react-native';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <View style={styles.container}>
        <View style={{ paddingTop: insets.top }}>
          <ScreenHeader title="Recipe" onBack={() => router.back()} />
        </View>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Recipe not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Recipe Details" onBack={() => router.back()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        {/* Recipe header */}
        <Card style={styles.headerCard} padding={20}>
          <View style={styles.recipeIcon}>
            <ChefHat size={32} color={Colors.primary} />
          </View>
          <Text style={styles.recipeName}>{recipe.name}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Clock size={16} color={Colors.textMuted} />
              <View>
                <Text style={styles.metaLabel}>Prep</Text>
                <Text style={styles.metaValue}>{recipe.prepTime} min</Text>
              </View>
            </View>
            <View style={styles.metaItem}>
              <Clock size={16} color={Colors.textMuted} />
              <View>
                <Text style={styles.metaLabel}>Cook</Text>
                <Text style={styles.metaValue}>{recipe.cookTime} min</Text>
              </View>
            </View>
            <View style={styles.metaItem}>
              <Users size={16} color={Colors.textMuted} />
              <View>
                <Text style={styles.metaLabel}>Serves</Text>
                <Text style={styles.metaValue}>{recipe.servings}</Text>
              </View>
            </View>
            <View style={styles.metaItem}>
              <Wallet size={16} color={Colors.textMuted} />
              <View>
                <Text style={styles.metaLabel}>Cost</Text>
                <Text style={styles.metaValue}>R{recipe.estimatedCost}</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Available ingredients */}
        <Text style={styles.sectionTitle}>Available Ingredients</Text>
        <Card padding={16}>
          {recipe.availableIngredients.map((ing, i) => (
            <View key={i} style={[styles.ingredientRow, i > 0 && styles.ingredientBorder]}>
              <View style={styles.ingredientCheck}>
                <Check size={14} color={Colors.white} />
              </View>
              <Text style={styles.ingredientText}>{ing}</Text>
            </View>
          ))}
        </Card>

        {/* Missing ingredients */}
        {recipe.missingIngredients.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Missing Ingredients</Text>
            <Card padding={16}>
              {recipe.missingIngredients.map((ing, i) => (
                <View key={i} style={[styles.ingredientRow, i > 0 && styles.ingredientBorder]}>
                  <View style={styles.ingredientCross}>
                    <X size={14} color={Colors.white} />
                  </View>
                  <Text style={styles.ingredientText}>{ing}</Text>
                </View>
              ))}
            </Card>
          </>
        )}

        {/* Cooking steps */}
        <Text style={styles.sectionTitle}>Cooking Steps</Text>
        {recipe.steps.map((step, i) => (
          <View key={i} style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{i + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}

        {/* Add missing to shopping list */}
        {recipe.missingIngredients.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Button title="Add Missing Items to Shopping List" variant="primary" size="large" fullWidth icon={<ShoppingCart size={20} color={Colors.white} />} onPress={() => router.push('/(tabs)/shopping')} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  headerCard: { marginBottom: 16 },
  recipeIcon: { width: 64, height: 64, borderRadius: 20, backgroundColor: Colors.green100, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  recipeName: { fontSize: 22, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, flexWrap: 'wrap', gap: 8 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaLabel: { fontSize: 11, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  metaValue: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  sectionTitle: { fontSize: 17, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginBottom: 12, marginTop: 20 },
  ingredientRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  ingredientBorder: { borderTopWidth: 1, borderTopColor: Colors.slate100 },
  ingredientCheck: { width: 22, height: 22, borderRadius: 6, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  ingredientCross: { width: 22, height: 22, borderRadius: 6, backgroundColor: Colors.error, alignItems: 'center', justifyContent: 'center' },
  ingredientText: { fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.text },
  stepRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  stepNumber: { width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  stepNumberText: { fontSize: 14, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.white },
  stepText: { flex: 1, fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.text, lineHeight: 22 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFoundText: { fontSize: 16, fontFamily: 'Inter-Regular', color: Colors.textMuted },
});
