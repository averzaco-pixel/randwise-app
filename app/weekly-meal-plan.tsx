import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { weeklyMealPlan, pantryItems, shoppingItems } from '@/constants/mockData';
import { allRecipes, getRecipeById } from '@/constants/recipes';
import { householdStaples } from '@/constants/householdStaples';
import { matchRecipeToPantry } from '@/utils/pantryMatching';
import { MealPlanEntry } from '@/types';
import {
  Calendar, ChevronRight, UtensilsCrossed, Check, ShoppingCart,
  Heart, RefreshCw, Clock, Users, Wallet, X, Flame,
} from 'lucide-react-native';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'] as const;

export default function WeeklyMealPlanScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [mealPlan, setMealPlan] = useState<MealPlanEntry[]>([...weeklyMealPlan]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedMealType, setSelectedMealType] = useState<typeof MEAL_TYPES[number]>('Dinner');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  const enabledStapleNames = householdStaples.filter(s => s.defaultEnabled).map(s => s.name);

  const totalCost = useMemo(() => {
    return mealPlan.reduce((sum, entry) => {
      const recipe = getRecipeById(entry.recipeId);
      return sum + (recipe ? recipe.estimatedTotalCost : 0);
    }, 0);
  }, [mealPlan]);

  const totalServings = useMemo(() => {
    return mealPlan.reduce((sum, entry) => sum + entry.servings, 0);
  }, [mealPlan]);

  const cookedCount = mealPlan.filter(e => e.cooked).length;

  const toggleCooked = (id: string) => {
    setMealPlan(prev => prev.map(e => e.id === id ? { ...e, cooked: !e.cooked } : e));
  };

  const toggleFavorite = (recipeId: string) => {
    setFavoriteIds(prev => {
      const next = new Set(prev);
      if (next.has(recipeId)) next.delete(recipeId);
      else next.add(recipeId);
      return next;
    });
  };

  const removeEntry = (id: string) => {
    setMealPlan(prev => prev.filter(e => e.id !== id));
  };

  const generateNewPlan = () => {
    const dinnerRecipes = allRecipes.filter(r => r.mealCategory === 'Dinner');
    const shuffled = [...dinnerRecipes].sort(() => Math.random() - 0.5);
    const newPlan: MealPlanEntry[] = WEEKDAYS.slice(0, 7).map((day, i) => {
      const recipe = shuffled[i % shuffled.length];
      return {
        id: `${Date.now()}-${i}`,
        day,
        recipeId: recipe.id,
        recipeName: recipe.title,
        mealType: 'Dinner',
        servings: recipe.servings,
        cooked: false,
      };
    });
    setMealPlan(newPlan);
  };

  const generateAnotherForDay = (day: string) => {
    const currentIds = mealPlan.filter(e => e.day === day).map(e => e.recipeId);
    const available = allRecipes.filter(r => r.mealCategory === 'Dinner' && !currentIds.includes(r.id));
    if (available.length === 0) return;
    const random = available[Math.floor(Math.random() * available.length)];
    setMealPlan(prev => prev.map(e =>
      e.day === day
        ? { ...e, recipeId: random.id, recipeName: random.title, servings: random.servings, cooked: false }
        : e
    ));
  };

  const addMissingToShopping = (recipeId: string) => {
    const recipe = getRecipeById(recipeId);
    if (!recipe) return;
    const match = matchRecipeToPantry(recipe, pantryItems, enabledStapleNames);
    match.missingIngredients.forEach(missing => {
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

  const openAddModal = (day: string) => {
    setSelectedDay(day);
    setSelectedMealType('Dinner');
    setSelectedRecipeId(null);
    setShowAddModal(true);
  };

  const confirmAddToPlan = () => {
    if (!selectedRecipeId) return;
    const recipe = getRecipeById(selectedRecipeId);
    if (!recipe) return;
    const newEntry: MealPlanEntry = {
      id: `${Date.now()}`,
      day: selectedDay,
      recipeId: recipe.id,
      recipeName: recipe.title,
      mealType: selectedMealType,
      servings: recipe.servings,
      cooked: false,
    };
    setMealPlan(prev => [...prev, newEntry]);
    setShowAddModal(false);
  };

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
              <Text style={styles.summarySubtitle}>{mealPlan.length} meals planned</Text>
            </View>
          </View>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{mealPlan.length}</Text>
              <Text style={styles.statLabel}>Meals</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>R{totalCost}</Text>
              <Text style={styles.statLabel}>Est. cost</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{totalServings}</Text>
              <Text style={styles.statLabel}>Servings</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{cookedCount}</Text>
              <Text style={styles.statLabel}>Cooked</Text>
            </View>
          </View>
        </Card>

        {/* Generate new plan */}
        <View style={{ marginTop: 16, marginBottom: 16 }}>
          <Button
            title="Generate New Meal Plan"
            variant="primary"
            size="large"
            fullWidth
            icon={<UtensilsCrossed size={20} color={Colors.white} />}
            onPress={generateNewPlan}
          />
        </View>

        {/* Daily plan */}
        <Text style={styles.sectionTitle}>Daily Plan</Text>
        {WEEKDAYS.map(day => {
          const dayEntries = mealPlan.filter(e => e.day === day);
          return (
            <View key={day} style={styles.daySection}>
              <View style={styles.dayHeader}>
                <Text style={styles.dayTitle}>{day}</Text>
                <TouchableOpacity onPress={() => openAddModal(day)} activeOpacity={0.7}>
                  <View style={styles.addButton}>
                    <Text style={styles.addButtonText}>+ Add meal</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {dayEntries.length === 0 ? (
                <Card style={styles.emptyDayCard} padding={14}>
                  <Text style={styles.emptyDayText}>No meals planned for {day}</Text>
                </Card>
              ) : (
                dayEntries.map(entry => {
                  const recipe = getRecipeById(entry.recipeId);
                  if (!recipe) return null;
                  const match = matchRecipeToPantry(recipe, pantryItems, enabledStapleNames);
                  const isFav = favoriteIds.has(entry.recipeId);
                  return (
                    <Card key={entry.id} style={[styles.dayCard, entry.cooked && styles.cookedCard]} padding={16}>
                      <View style={styles.dayRow}>
                        <View style={[styles.dayBadge, entry.cooked && styles.dayBadgeCooked]}>
                          <Text style={styles.dayBadgeText}>{day.slice(0, 3)}</Text>
                        </View>
                        <View style={styles.dayInfo}>
                          <View style={styles.dayMealRow}>
                            <Text style={styles.dayMealType}>{entry.mealType}</Text>
                            {entry.cooked && <Badge label="Cooked" variant="green" size="small" />}
                          </View>
                          <TouchableOpacity onPress={() => router.push(`/recipe/${entry.recipeId}`)} activeOpacity={0.8}>
                            <Text style={styles.dayRecipeName}>{entry.recipeName}</Text>
                          </TouchableOpacity>
                          <View style={styles.dayMeta}>
                            <View style={styles.metaItem}>
                              <Clock size={12} color={Colors.textMuted} />
                              <Text style={styles.metaText}>{recipe.totalTime} min</Text>
                            </View>
                            <View style={styles.metaItem}>
                              <Users size={12} color={Colors.textMuted} />
                              <Text style={styles.metaText}>{entry.servings} servings</Text>
                            </View>
                            <View style={styles.metaItem}>
                              <Wallet size={12} color={Colors.textMuted} />
                              <Text style={styles.metaText}>R{recipe.estimatedTotalCost}</Text>
                            </View>
                          </View>
                          <View style={styles.dayMatchRow}>
                            <Badge
                              label={`${match.matchPercentage}% match`}
                              variant={match.matchPercentage >= 70 ? 'green' : match.matchPercentage >= 40 ? 'gold' : 'red'}
                              size="small"
                            />
                            {match.missingIngredients.length > 0 && (
                              <Text style={styles.missingText}>
                                {match.missingIngredients.length} missing · R{match.missingCostTotal}
                              </Text>
                            )}
                          </View>
                        </View>
                      </View>

                      {/* Actions */}
                      <View style={styles.entryActions}>
                        <TouchableOpacity
                          onPress={() => toggleCooked(entry.id)}
                          style={[styles.entryAction, entry.cooked && styles.entryActionActive]}
                          activeOpacity={0.7}
                        >
                          <Check size={14} color={entry.cooked ? Colors.white : Colors.text} />
                          <Text style={[styles.entryActionText, entry.cooked && styles.entryActionTextActive]}>
                            {entry.cooked ? 'Cooked' : 'Mark Cooked'}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => toggleFavorite(entry.recipeId)}
                          style={styles.entryAction}
                          activeOpacity={0.7}
                        >
                          <Heart size={14} color={isFav ? Colors.error : Colors.text} fill={isFav ? Colors.error : 'none'} />
                          <Text style={styles.entryActionText}>{isFav ? 'Favourite' : 'Favourite'}</Text>
                        </TouchableOpacity>

                        {match.missingIngredients.length > 0 && (
                          <TouchableOpacity
                            onPress={() => addMissingToShopping(entry.recipeId)}
                            style={styles.entryAction}
                            activeOpacity={0.7}
                          >
                            <ShoppingCart size={14} color={Colors.text} />
                            <Text style={styles.entryActionText}>Add Missing</Text>
                          </TouchableOpacity>
                        )}

                        <TouchableOpacity
                          onPress={() => generateAnotherForDay(day)}
                          style={styles.entryAction}
                          activeOpacity={0.7}
                        >
                          <RefreshCw size={14} color={Colors.text} />
                          <Text style={styles.entryActionText}>Swap</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => removeEntry(entry.id)}
                          style={styles.entryAction}
                          activeOpacity={0.7}
                        >
                          <X size={14} color={Colors.error} />
                        </TouchableOpacity>
                      </View>
                    </Card>
                  );
                })
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* Add meal modal */}
      <Modal visible={showAddModal} transparent animationType="slide" onRequestClose={() => setShowAddModal(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setShowAddModal(false)}>
          <Pressable style={styles.modalContent} onPress={e => e.stopPropagation()}>
            <Text style={styles.modalTitle}>Add Meal to {selectedDay}</Text>

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

            <Text style={styles.modalLabel}>Select Recipe</Text>
            <ScrollView style={styles.recipeScroll} showsVerticalScrollIndicator={false}>
              {allRecipes
                .filter(r => r.mealCategory === selectedMealType)
                .map(recipe => {
                  const match = matchRecipeToPantry(recipe, pantryItems, enabledStapleNames);
                  return (
                    <TouchableOpacity
                      key={recipe.id}
                      onPress={() => setSelectedRecipeId(recipe.id)}
                      style={[styles.recipeOption, selectedRecipeId === recipe.id && styles.recipeOptionActive]}
                      activeOpacity={0.7}
                    >
                      <View style={styles.recipeOptionIcon}>
                        <Flame size={16} color={Colors.primary} />
                      </View>
                      <View style={styles.recipeOptionInfo}>
                        <Text style={styles.recipeOptionName} numberOfLines={1}>{recipe.title}</Text>
                        <Text style={styles.recipeOptionMeta}>
                          {recipe.totalTime} min · R{recipe.estimatedTotalCost} · {match.matchPercentage}% match
                        </Text>
                      </View>
                      {selectedRecipeId === recipe.id && (
                        <Check size={18} color={Colors.primary} />
                      )}
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>

            <View style={styles.modalActions}>
              <Button title="Cancel" variant="secondary" size="medium" onPress={() => setShowAddModal(false)} />
              <View style={{ flex: 1 }} />
              <Button
                title="Add to Plan"
                variant="primary"
                size="medium"
                disabled={!selectedRecipeId}
                onPress={confirmAddToPlan}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  summaryCard: { marginBottom: 4 },
  summaryHeader: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  summaryIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.green100, alignItems: 'center', justifyContent: 'center' },
  summaryTitle: { fontSize: 18, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  summarySubtitle: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  summaryStats: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: Colors.slate100 },
  statItem: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 20, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  statLabel: { fontSize: 11, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  sectionTitle: { fontSize: 17, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginBottom: 12, marginTop: 8 },
  daySection: { marginBottom: 16 },
  dayHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  dayTitle: { fontSize: 15, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  addButton: { backgroundColor: Colors.green50, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 },
  addButtonText: { fontSize: 12, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.primary },
  emptyDayCard: { alignItems: 'center' },
  emptyDayText: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  dayCard: { marginBottom: 10 },
  cookedCard: { backgroundColor: Colors.green50, borderColor: Colors.green200 },
  dayRow: { flexDirection: 'row', gap: 12 },
  dayBadge: { width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  dayBadgeCooked: { backgroundColor: Colors.slate300 },
  dayBadgeText: { fontSize: 13, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.white },
  dayInfo: { flex: 1 },
  dayMealRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dayMealType: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  dayRecipeName: { fontSize: 15, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text, marginTop: 2 },
  dayMeta: { flexDirection: 'row', gap: 10, marginTop: 6 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 11, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  dayMatchRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  missingText: { fontSize: 11, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  entryActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: Colors.slate100 },
  entryAction: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.slate50, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  entryActionActive: { backgroundColor: Colors.primary },
  entryActionText: { fontSize: 11, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  entryActionTextActive: { color: Colors.white },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: Colors.white, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 34, maxHeight: '80%' },
  modalTitle: { fontSize: 20, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginBottom: 16 },
  modalLabel: { fontSize: 15, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text, marginBottom: 10, marginTop: 8 },
  modalChips: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  modalChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: Colors.slate50, borderWidth: 1, borderColor: Colors.slate200 },
  modalChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  modalChipText: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.text },
  modalChipTextActive: { color: Colors.white, fontFamily: 'Inter-SemiBold', fontWeight: '600' },
  recipeScroll: { maxHeight: 300, marginBottom: 8 },
  recipeOption: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1, borderColor: Colors.slate200, marginBottom: 8, backgroundColor: Colors.white },
  recipeOptionActive: { borderColor: Colors.primary, backgroundColor: Colors.green50 },
  recipeOptionIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.green100, alignItems: 'center', justifyContent: 'center' },
  recipeOptionInfo: { flex: 1 },
  recipeOptionName: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  recipeOptionMeta: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  modalActions: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 12 },
});
