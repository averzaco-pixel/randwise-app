import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { getRecipeById, allRecipes } from '@/constants/recipes';
import { pantryItems, shoppingItems } from '@/constants/mockData';
import { householdStaples } from '@/constants/householdStaples';
import { matchRecipeToPantry, adjustIngredientQuantity } from '@/utils/pantryMatching';
import { EquipmentType, RecipeCategory } from '@/types';
import {
  Clock, Users, Wallet, Check, X, ShoppingCart, ChefHat,
  Heart, Minus, Plus, Calendar, Beaker, Leaf, AlertTriangle,
  Package, RefreshCw, Sparkles, Flame,
} from 'lucide-react-native';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'] as const;

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const recipe = getRecipeById(id);

  const [servings, setServings] = useState(recipe?.servings ?? 4);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMealPlanModal, setShowMealPlanModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedMealType, setSelectedMealType] = useState<typeof MEAL_TYPES[number]>('Dinner');

  const enabledStapleNames = householdStaples.filter(s => s.defaultEnabled).map(s => s.name);

  const pantryMatch = useMemo(() => {
    if (!recipe) return null;
    return matchRecipeToPantry(recipe, pantryItems, enabledStapleNames);
  }, [recipe]);

  if (!recipe || !pantryMatch) {
    return (
      <View style={styles.container}>
        <View style={{ paddingTop: insets.top }}>
          <ScreenHeader title="Recipe" onBack={() => router.back()} />
        </View>
        <View style={styles.notFound}>
          <ChefHat size={40} color={Colors.slate300} />
          <Text style={styles.notFoundText}>Recipe not found</Text>
        </View>
      </View>
    );
  }

  const scaledIngredients = recipe.ingredients.map(ing =>
    adjustIngredientQuantity(ing, recipe.servings, servings)
  );

  const equipmentIcon = (eq: EquipmentType) => {
    switch (eq) {
      case 'Air Fryer': return <Flame size={14} color={Colors.primary} />;
      case 'Oven': return <Flame size={14} color={Colors.primary} />;
      default: return <ChefHat size={14} color={Colors.primary} />;
    }
  };

  const addToShoppingList = () => {
    pantryMatch.missingIngredients.forEach(missing => {
      const existing = shoppingItems.find(s => s.name.toLowerCase() === missing.name.toLowerCase());
      if (existing) {
        existing.quantity += missing.quantity;
      } else {
        shoppingItems.push({
          id: `shop-${Date.now()}-${missing.name}`,
          name: missing.name,
          category: 'Pantry Staples',
          quantity: missing.quantity,
          unit: missing.unit,
          price: missing.estimatedPrice,
          checked: false,
        });
      }
    });
    router.push('/(tabs)/shopping');
  };

  const addToMealPlan = () => {
    setShowMealPlanModal(true);
  };

  const confirmAddToMealPlan = () => {
    setShowMealPlanModal(false);
    router.push('/weekly-meal-plan');
  };

  const generateAnother = () => {
    const sameCategory = allRecipes.filter(r =>
      r.id !== recipe.id && r.recipeCategories.some(c => recipe.recipeCategories.includes(c))
    );
    if (sameCategory.length > 0) {
      const random = sameCategory[Math.floor(Math.random() * sameCategory.length)];
      router.replace(`/recipe/${random.id}`);
    }
  };

  const matchColor = pantryMatch.matchPercentage >= 70 ? Colors.primary : pantryMatch.matchPercentage >= 40 ? Colors.accent : Colors.error;

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Recipe Details" onBack={() => router.back()} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        {/* Recipe header */}
        <Card style={styles.headerCard} padding={20}>
          <View style={styles.headerTop}>
            <View style={styles.recipeIcon}>
              <ChefHat size={32} color={Colors.primary} />
            </View>
            <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} style={styles.favButton} activeOpacity={0.7}>
              <Heart size={24} color={isFavorite ? Colors.error : Colors.slate300} fill={isFavorite ? Colors.error : 'none'} />
            </TouchableOpacity>
          </View>
          <Text style={styles.recipeName}>{recipe.title}</Text>
          <Text style={styles.recipeDesc}>{recipe.description}</Text>

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
              <Clock size={16} color={Colors.textMuted} />
              <View>
                <Text style={styles.metaLabel}>Total</Text>
                <Text style={styles.metaValue}>{recipe.totalTime} min</Text>
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
                <Text style={styles.metaValue}>R{recipe.estimatedTotalCost}</Text>
              </View>
            </View>
            <View style={styles.metaItem}>
              <Beaker size={16} color={Colors.textMuted} />
              <View>
                <Text style={styles.metaLabel}>Level</Text>
                <Text style={styles.metaValue}>{recipe.difficulty}</Text>
              </View>
            </View>
          </View>

          <View style={styles.tagRow}>
            <Badge label={recipe.cuisineType} variant="gray" size="small" />
            <Badge label={`R${recipe.estimatedCostPerServing}/serving`} variant="green" size="small" />
            {recipe.dietaryTags.slice(0, 3).map(tag => (
              <Badge key={tag} label={tag} variant="blue" size="small" />
            ))}
          </View>

          {recipe.allergenTags.length > 0 && (
            <View style={styles.allergenRow}>
              <AlertTriangle size={14} color={Colors.warning} />
              <Text style={styles.allergenText}>Allergens: {recipe.allergenTags.join(', ')}</Text>
            </View>
          )}
        </Card>

        {/* Equipment */}
        <Text style={styles.sectionTitle}>Equipment Required</Text>
        <Card padding={16}>
          <View style={styles.equipmentRow}>
            {recipe.equipment.map(eq => (
              <View key={eq} style={styles.equipmentChip}>
                {equipmentIcon(eq)}
                <Text style={styles.equipmentText}>{eq}</Text>
              </View>
            ))}
            {recipe.equipment.length === 0 && (
              <Text style={styles.noEquipmentText}>No cooking equipment needed</Text>
            )}
          </View>
        </Card>

        {/* Pantry Match */}
        <Text style={styles.sectionTitle}>Pantry Match</Text>
        <Card padding={16}>
          <View style={styles.matchHeader}>
            <View style={styles.matchCircle}>
              <Text style={[styles.matchPercentage, { color: matchColor }]}>{pantryMatch.matchPercentage}%</Text>
            </View>
            <View style={styles.matchInfo}>
              <Text style={styles.matchTitle}>Ingredient Match</Text>
              <Text style={styles.matchSubtitle}>
                {pantryMatch.availableIngredients.length} available · {pantryMatch.missingIngredients.length} missing
              </Text>
              {pantryMatch.missingCostTotal > 0 && (
                <Text style={styles.matchCost}>R{pantryMatch.missingCostTotal} for missing ingredients</Text>
              )}
            </View>
          </View>

          {/* Available ingredients */}
          {pantryMatch.availableIngredients.length > 0 && (
            <View style={styles.ingredientSection}>
              <Text style={styles.ingredientSubTitle}>You already have</Text>
              {pantryMatch.availableIngredients.map((ing, i) => (
                <View key={i} style={[styles.ingredientRow, i > 0 && styles.ingredientBorder]}>
                  <View style={styles.ingredientCheck}>
                    <Check size={14} color={Colors.white} />
                  </View>
                  <Text style={styles.ingredientText}>{ing.name}</Text>
                  <Text style={styles.ingredientQty}>{ing.quantity} {ing.unit}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Missing ingredients */}
          {pantryMatch.missingIngredients.length > 0 && (
            <View style={styles.ingredientSection}>
              <Text style={styles.ingredientSubTitle}>You still need</Text>
              {pantryMatch.missingIngredients.map((ing, i) => (
                <View key={i} style={[styles.ingredientRow, i > 0 && styles.ingredientBorder]}>
                  <View style={styles.ingredientCross}>
                    <X size={14} color={Colors.white} />
                  </View>
                  <Text style={styles.ingredientText}>{ing.name}</Text>
                  <Text style={styles.ingredientQty}>{ing.quantity} {ing.unit}</Text>
                  <Text style={styles.ingredientPrice}>R{ing.estimatedPrice}</Text>
                </View>
              ))}
            </View>
          )}
        </Card>

        {/* Add missing to shopping list */}
        {pantryMatch.missingIngredients.length > 0 && (
          <View style={{ marginTop: 16 }}>
            <Button
              title={`Add ${pantryMatch.missingIngredients.length} Missing to Shopping List`}
              variant="primary"
              size="large"
              fullWidth
              icon={<ShoppingCart size={20} color={Colors.white} />}
              onPress={addToShoppingList}
            />
          </View>
        )}

        {/* Serving size adjustment */}
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <Card padding={16}>
          <View style={styles.servingRow}>
            <Text style={styles.servingLabel}>Servings</Text>
            <View style={styles.servingControls}>
              <TouchableOpacity
                onPress={() => setServings(s => Math.max(1, s - 1))}
                style={styles.servingButton}
                activeOpacity={0.7}
              >
                <Minus size={16} color={Colors.text} />
              </TouchableOpacity>
              <Text style={styles.servingValue}>{servings}</Text>
              <TouchableOpacity
                onPress={() => setServings(s => s + 1)}
                style={styles.servingButton}
                activeOpacity={0.7}
              >
                <Plus size={16} color={Colors.text} />
              </TouchableOpacity>
            </View>
          </View>
          {servings !== recipe.servings && (
            <Text style={styles.scaledNote}>
              Quantities scaled from {recipe.servings} to {servings} servings
            </Text>
          )}

          {scaledIngredients.map((ing, i) => (
            <View key={i} style={[styles.ingredientRow, i > 0 && styles.ingredientBorder]}>
              <View style={styles.ingredientDot} />
              <Text style={styles.ingredientText}>{ing.name}</Text>
              <Text style={styles.ingredientQty}>
                {ing.quantity} {ing.unit}
              </Text>
              {ing.estimatedPrice > 0 && <Text style={styles.ingredientPrice}>R{ing.estimatedPrice}</Text>}
            </View>
          ))}

          {/* Optional ingredients */}
          {recipe.optionalIngredients.length > 0 && (
            <View style={styles.optionalSection}>
              <Text style={styles.optionalTitle}>Optional</Text>
              {recipe.optionalIngredients.map((ing, i) => (
                <View key={i} style={[styles.ingredientRow, i > 0 && styles.ingredientBorder]}>
                  <View style={styles.ingredientDotOptional} />
                  <Text style={styles.ingredientText}>{ing.name}</Text>
                  <Text style={styles.ingredientQty}>{ing.quantity} {ing.unit}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Substitutes */}
          {recipe.substitutes.length > 0 && (
            <View style={styles.optionalSection}>
              <Text style={styles.optionalTitle}>Substitutes</Text>
              {recipe.substitutes.map((sub, i) => (
                <View key={i} style={styles.substituteRow}>
                  <RefreshCw size={14} color={Colors.textMuted} />
                  <Text style={styles.substituteText}>
                    <Text style={styles.substituteOriginal}>{sub.ingredient}</Text>
                    {' → '}
                    <Text style={styles.substituteNew}>{sub.substitute}</Text>
                  </Text>
                </View>
              ))}
            </View>
          )}
        </Card>

        {/* Cooking steps */}
        <Text style={styles.sectionTitle}>Cooking Steps</Text>
        {recipe.instructions.map((step, i) => (
          <View key={i} style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{i + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}

        {/* Storage and leftovers */}
        <Text style={styles.sectionTitle}>Storage & Leftovers</Text>
        <Card padding={16}>
          <View style={styles.storageRow}>
            <Package size={18} color={Colors.primary} />
            <View style={styles.storageInfo}>
              <Text style={styles.storageTitle}>Storage</Text>
              <Text style={styles.storageText}>{recipe.storageInstructions}</Text>
            </View>
          </View>
          <View style={styles.storageRow}>
            <Leaf size={18} color={Colors.accent} />
            <View style={styles.storageInfo}>
              <Text style={styles.storageTitle}>Leftover Ideas</Text>
              <Text style={styles.storageText}>{recipe.leftoverSuggestions}</Text>
            </View>
          </View>
        </Card>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <Button
            title="Add to Meal Plan"
            variant="primary"
            size="large"
            fullWidth
            icon={<Calendar size={20} color={Colors.white} />}
            onPress={addToMealPlan}
          />
        </View>
        <View style={styles.actionRow}>
          <Button
            title="Generate Another Suggestion"
            variant="outline"
            size="medium"
            fullWidth
            icon={<Sparkles size={18} color={Colors.primary} />}
            onPress={generateAnother}
          />
        </View>
      </ScrollView>

      {/* Meal plan modal */}
      <Modal visible={showMealPlanModal} transparent animationType="slide" onRequestClose={() => setShowMealPlanModal(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setShowMealPlanModal(false)}>
          <Pressable style={styles.modalContent} onPress={e => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Add to Meal Plan</Text>
            <Text style={styles.modalSubtitle}>{recipe.title}</Text>

            <Text style={styles.modalLabel}>Select Day</Text>
            <View style={styles.modalChips}>
              {WEEKDAYS.map(day => (
                <TouchableOpacity
                  key={day}
                  onPress={() => setSelectedDay(day)}
                  style={[styles.modalChip, selectedDay === day && styles.modalChipActive]}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.modalChipText, selectedDay === day && styles.modalChipTextActive]}>
                    {day.slice(0, 3)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.modalLabel}>Meal Type</Text>
            <View style={styles.modalChips}>
              {MEAL_TYPES.map(type => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setSelectedMealType(type)}
                  style={[styles.modalChip, selectedMealType === type && styles.modalChipActive]}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.modalChipText, selectedMealType === type && styles.modalChipTextActive]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.modalLabel}>Servings: {servings}</Text>

            <View style={styles.modalActions}>
              <Button title="Cancel" variant="secondary" size="medium" onPress={() => setShowMealPlanModal(false)} />
              <View style={{ flex: 1 }} />
              <Button title="Add to Plan" variant="primary" size="medium" onPress={confirmAddToMealPlan} />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  headerCard: { marginBottom: 16 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  recipeIcon: { width: 64, height: 64, borderRadius: 20, backgroundColor: Colors.green100, alignItems: 'center', justifyContent: 'center' },
  favButton: { padding: 4 },
  recipeName: { fontSize: 22, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, lineHeight: 28 },
  recipeDesc: { fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 6, lineHeight: 20 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 16, gap: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaLabel: { fontSize: 11, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  metaValue: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 14 },
  allergenRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12, backgroundColor: Colors.gold50, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  allergenText: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.gold600 },
  sectionTitle: { fontSize: 17, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginBottom: 12, marginTop: 20 },
  equipmentRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  equipmentChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.green50, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 },
  equipmentText: { fontSize: 13, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  noEquipmentText: { fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  matchHeader: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
  matchCircle: { width: 64, height: 64, borderRadius: 32, borderWidth: 3, borderColor: Colors.slate200, alignItems: 'center', justifyContent: 'center' },
  matchPercentage: { fontSize: 18, fontFamily: 'Inter-Bold', fontWeight: '700' },
  matchInfo: { flex: 1 },
  matchTitle: { fontSize: 16, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  matchSubtitle: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  matchCost: { fontSize: 13, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.primary, marginTop: 4 },
  ingredientSection: { marginTop: 12 },
  ingredientSubTitle: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text, marginBottom: 8 },
  ingredientRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  ingredientBorder: { borderTopWidth: 1, borderTopColor: Colors.slate100 },
  ingredientCheck: { width: 22, height: 22, borderRadius: 6, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  ingredientCross: { width: 22, height: 22, borderRadius: 6, backgroundColor: Colors.error, alignItems: 'center', justifyContent: 'center' },
  ingredientDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary },
  ingredientDotOptional: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.slate300 },
  ingredientText: { flex: 1, fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.text },
  ingredientQty: { fontSize: 13, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.slate600 },
  ingredientPrice: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginLeft: 8, minWidth: 35, textAlign: 'right' },
  servingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  servingLabel: { fontSize: 16, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  servingControls: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  servingButton: { width: 32, height: 32, borderRadius: 10, backgroundColor: Colors.slate100, alignItems: 'center', justifyContent: 'center' },
  servingValue: { fontSize: 18, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, minWidth: 24, textAlign: 'center' },
  scaledNote: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.primary, marginBottom: 12, fontStyle: 'italic' },
  optionalSection: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: Colors.slate100 },
  optionalTitle: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.textMuted, marginBottom: 8 },
  substituteRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, paddingVertical: 8 },
  substituteText: { flex: 1, fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.text, lineHeight: 20 },
  substituteOriginal: { fontFamily: 'Inter-SemiBold', fontWeight: '600' },
  substituteNew: { color: Colors.primary },
  stepRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  stepNumber: { width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  stepNumberText: { fontSize: 14, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.white },
  stepText: { flex: 1, fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.text, lineHeight: 22 },
  storageRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  storageInfo: { flex: 1 },
  storageTitle: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text, marginBottom: 4 },
  storageText: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted, lineHeight: 19 },
  actionRow: { marginTop: 16 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  notFoundText: { fontSize: 16, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: Colors.white, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 34 },
  modalTitle: { fontSize: 20, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  modalSubtitle: { fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 4, marginBottom: 20 },
  modalLabel: { fontSize: 15, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text, marginBottom: 10, marginTop: 8 },
  modalChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  modalChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: Colors.slate50, borderWidth: 1, borderColor: Colors.slate200 },
  modalChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  modalChipText: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.text },
  modalChipTextActive: { color: Colors.white, fontFamily: 'Inter-SemiBold', fontWeight: '600' },
  modalActions: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 20 },
});
