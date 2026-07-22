import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { allRecipes, getRecipesByCategory } from '@/constants/recipes';
import { pantryItems } from '@/constants/mockData';
import { householdStaples } from '@/constants/householdStaples';
import { matchRecipeToPantry } from '@/utils/pantryMatching';
import { Recipe, RecipeCategory, EquipmentType, Difficulty, DietaryTag, MealCategory } from '@/types';
import {
  Clock, Users, Wallet, Sparkles, Calendar, ChevronRight,
  Search, SlidersHorizontal, Heart, ChefHat, X,
} from 'lucide-react-native';

const CATEGORY_FILTERS: RecipeCategory[] = [
  'Quick Weekday', 'Budget', 'Family Dinner', 'Lunchbox',
  'One-Pot', 'Air-Fryer', 'Stovetop', 'No-Oven',
  'Vegetarian', 'Leftover', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Soup and Stew',
];

const MEAL_FILTERS: MealCategory[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
const DIFFICULTY_FILTERS: Difficulty[] = ['Easy', 'Medium', 'Hard'];
const EQUIPMENT_FILTERS: EquipmentType[] = ['Stove', 'Pot', 'Pan', 'Air Fryer', 'Microwave', 'Oven'];
const DIETARY_FILTERS: DietaryTag[] = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Low-Carb', 'High-Protein', 'Pescatarian'];

const FAVORITE_IDS = new Set<string>();

export default function MealsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [selectedCategories, setSelectedCategories] = useState<Set<RecipeCategory>>(new Set());
  const [selectedMealTypes, setSelectedMealTypes] = useState<Set<MealCategory>>(new Set());
  const [selectedDifficulties, setSelectedDifficulties] = useState<Set<Difficulty>>(new Set());
  const [selectedEquipment, setSelectedEquipment] = useState<Set<EquipmentType>>(new Set());
  const [selectedDietary, setSelectedDietary] = useState<Set<DietaryTag>>(new Set());
  const [maxBudget, setMaxBudget] = useState<number | null>(null);
  const [maxTime, setMaxTime] = useState<number | null>(null);
  const [excludedIngredients, setExcludedIngredients] = useState('');

  const enabledStapleNames = householdStaples.filter(s => s.defaultEnabled).map(s => s.name);

  const toggleFavorite = (id: string) => {
    setFavoriteIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSetItem = <T,>(set: Set<T>, value: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  const clearFilters = () => {
    setSelectedCategories(new Set());
    setSelectedMealTypes(new Set());
    setSelectedDifficulties(new Set());
    setSelectedEquipment(new Set());
    setSelectedDietary(new Set());
    setMaxBudget(null);
    setMaxTime(null);
    setExcludedIngredients('');
  };

  const activeFilterCount =
    selectedCategories.size + selectedMealTypes.size + selectedDifficulties.size +
    selectedEquipment.size + selectedDietary.size +
    (maxBudget !== null ? 1 : 0) + (maxTime !== null ? 1 : 0) +
    (excludedIngredients.trim() !== '' ? 1 : 0);

  const filteredRecipes = useMemo(() => {
    let result: Recipe[] = [...allRecipes];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.ingredients.some(i => i.name.toLowerCase().includes(q))
      );
    }

    if (favoritesOnly) {
      result = result.filter(r => favoriteIds.has(r.id));
    }

    if (selectedCategories.size > 0) {
      result = result.filter(r => r.recipeCategories.some(c => selectedCategories.has(c)));
    }

    if (selectedMealTypes.size > 0) {
      result = result.filter(r => selectedMealTypes.has(r.mealCategory));
    }

    if (selectedDifficulties.size > 0) {
      result = result.filter(r => selectedDifficulties.has(r.difficulty));
    }

    if (selectedEquipment.size > 0) {
      result = result.filter(r => r.equipment.some(e => selectedEquipment.has(e)));
    }

    if (selectedDietary.size > 0) {
      result = result.filter(r => r.dietaryTags.some(d => selectedDietary.has(d)));
    }

    if (maxBudget !== null) {
      result = result.filter(r => r.estimatedTotalCost <= maxBudget);
    }

    if (maxTime !== null) {
      result = result.filter(r => r.totalTime <= maxTime);
    }

    const excluded = excludedIngredients.trim().toLowerCase();
    if (excluded) {
      const excludedList = excluded.split(',').map(s => s.trim()).filter(Boolean);
      result = result.filter(r =>
        !r.ingredients.some(i =>
          excludedList.some(ex => i.name.toLowerCase().includes(ex))
        )
      );
    }

    return result;
  }, [searchQuery, favoritesOnly, favoriteIds, selectedCategories, selectedMealTypes,
      selectedDifficulties, selectedEquipment, selectedDietary, maxBudget, maxTime, excludedIngredients]);

  const getPantryMatch = (recipe: Recipe) => {
    return matchRecipeToPantry(recipe, pantryItems, enabledStapleNames);
  };

  const renderFilterChips = <T,>(
    options: T[],
    selected: Set<T>,
    onToggle: (s: Set<T>) => void,
  ) => (
    <View style={styles.filterChips}>
      {options.map(opt => {
        const isSelected = selected.has(opt);
        return (
          <TouchableOpacity
            key={String(opt)}
            onPress={() => toggleSetItem(selected, opt, onToggle)}
            style={[styles.filterChip, isSelected && styles.filterChipActive]}
            activeOpacity={0.7}
          >
            <Text style={[styles.filterChipText, isSelected && styles.filterChipTextActive]}>
              {String(opt)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

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
            <Text style={styles.aiSubtitle}>{allRecipes.length} recipes matched to your pantry</Text>
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

        {/* Search bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Search size={18} color={Colors.slate400} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search recipes or ingredients..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={Colors.slate400}
            />
          </View>
          <TouchableOpacity
            style={[styles.filterButton, activeFilterCount > 0 && styles.filterButtonActive]}
            onPress={() => setShowFilters(!showFilters)}
            activeOpacity={0.7}
          >
            <SlidersHorizontal size={18} color={activeFilterCount > 0 ? Colors.white : Colors.text} />
            {activeFilterCount > 0 && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Favorites toggle */}
        <View style={styles.quickFilterRow}>
          <TouchableOpacity
            style={[styles.quickFilter, favoritesOnly && styles.quickFilterActive]}
            onPress={() => setFavoritesOnly(!favoritesOnly)}
            activeOpacity={0.7}
          >
            <Heart size={16} color={favoritesOnly ? Colors.white : Colors.error} fill={favoritesOnly ? Colors.white : 'none'} />
            <Text style={[styles.quickFilterText, favoritesOnly && styles.quickFilterTextActive]}>
              Favourites ({favoriteIds.size})
            </Text>
          </TouchableOpacity>
          {activeFilterCount > 0 && (
            <TouchableOpacity onPress={clearFilters} activeOpacity={0.7}>
              <Text style={styles.clearFiltersText}>Clear all ({activeFilterCount})</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filters panel */}
        {showFilters && (
          <Card style={styles.filtersPanel} padding={16}>
            {activeFilterCount > 0 && (
              <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
                <X size={14} color={Colors.textMuted} />
                <Text style={styles.clearButtonText}>Clear all filters</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.filterSectionTitle}>Meal Type</Text>
            {renderFilterChips(MEAL_FILTERS, selectedMealTypes, setSelectedMealTypes)}

            <Text style={styles.filterSectionTitle}>Recipe Category</Text>
            {renderFilterChips(CATEGORY_FILTERS, selectedCategories, setSelectedCategories)}

            <Text style={styles.filterSectionTitle}>Difficulty</Text>
            {renderFilterChips(DIFFICULTY_FILTERS, selectedDifficulties, setSelectedDifficulties)}

            <Text style={styles.filterSectionTitle}>Equipment Available</Text>
            {renderFilterChips(EQUIPMENT_FILTERS, selectedEquipment, setSelectedEquipment)}

            <Text style={styles.filterSectionTitle}>Dietary Preference</Text>
            {renderFilterChips(DIETARY_FILTERS, selectedDietary, setSelectedDietary)}

            <Text style={styles.filterSectionTitle}>Max Budget</Text>
            <View style={styles.filterChips}>
              {[50, 75, 100, 150].map(b => (
                <TouchableOpacity
                  key={b}
                  onPress={() => setMaxBudget(maxBudget === b ? null : b)}
                  style={[styles.filterChip, maxBudget === b && styles.filterChipActive]}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.filterChipText, maxBudget === b && styles.filterChipTextActive]}>R{b}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterSectionTitle}>Max Cooking Time</Text>
            <View style={styles.filterChips}>
              {[15, 30, 45, 60].map(t => (
                <TouchableOpacity
                  key={t}
                  onPress={() => setMaxTime(maxTime === t ? null : t)}
                  style={[styles.filterChip, maxTime === t && styles.filterChipActive]}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.filterChipText, maxTime === t && styles.filterChipTextActive]}>{t} min</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterSectionTitle}>Excluded Ingredients</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="e.g. fish, nuts, dairy"
                value={excludedIngredients}
                onChangeText={setExcludedIngredients}
                placeholderTextColor={Colors.slate400}
              />
            </View>
          </Card>
        )}

        {/* Results count */}
        <Text style={styles.resultsCount}>
          {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
        </Text>

        {/* Recipe list */}
        {filteredRecipes.length === 0 ? (
          <Card style={styles.emptyCard} padding={32}>
            <ChefHat size={40} color={Colors.slate300} />
            <Text style={styles.emptyTitle}>No recipes match your filters</Text>
            <Text style={styles.emptySubtitle}>Try adjusting your filters or search term</Text>
          </Card>
        ) : (
          filteredRecipes.map(recipe => {
            const match = getPantryMatch(recipe);
            const isFav = favoriteIds.has(recipe.id);
            return (
              <TouchableOpacity
                key={recipe.id}
                onPress={() => router.push(`/recipe/${recipe.id}`)}
                activeOpacity={0.8}
              >
                <Card style={styles.recipeCard} padding={16}>
                  <View style={styles.recipeHeader}>
                    <View style={styles.recipeIcon}>
                      <ChefHat size={20} color={Colors.primary} />
                    </View>
                    <View style={styles.recipeInfo}>
                      <Text style={styles.recipeName} numberOfLines={2}>{recipe.title}</Text>
                      <View style={styles.recipeMeta}>
                        <View style={styles.metaItem}>
                          <Clock size={13} color={Colors.textMuted} />
                          <Text style={styles.metaText}>{recipe.totalTime} min</Text>
                        </View>
                        <View style={styles.metaItem}>
                          <Users size={13} color={Colors.textMuted} />
                          <Text style={styles.metaText}>{recipe.servings} servings</Text>
                        </View>
                        <View style={styles.metaItem}>
                          <Wallet size={13} color={Colors.textMuted} />
                          <Text style={styles.metaText}>R{recipe.estimatedTotalCost}</Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => toggleFavorite(recipe.id)}
                      style={styles.favButton}
                      activeOpacity={0.7}
                    >
                      <Heart
                        size={20}
                        color={isFav ? Colors.error : Colors.slate300}
                        fill={isFav ? Colors.error : 'none'}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.recipeDesc} numberOfLines={2}>{recipe.description}</Text>

                  <View style={styles.recipeBadges}>
                    <Badge
                      label={`${match.matchPercentage}% pantry match`}
                      variant={match.matchPercentage >= 70 ? 'green' : match.matchPercentage >= 40 ? 'gold' : 'red'}
                      size="small"
                    />
                    <Badge label={recipe.difficulty} variant="blue" size="small" />
                    {recipe.recipeCategories.slice(0, 2).map(cat => (
                      <Badge key={cat} label={cat} variant="gray" size="small" />
                    ))}
                  </View>

                  {match.missingIngredients.length > 0 && (
                    <Text style={styles.missingText}>
                      {match.missingIngredients.length} missing · R{match.missingCostTotal} to buy
                    </Text>
                  )}
                </Card>
              </TouchableOpacity>
            );
          })
        )}
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
  weeklyCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  weeklyContent: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  weeklyIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.green100, alignItems: 'center', justifyContent: 'center' },
  weeklyInfo: { flex: 1 },
  weeklyTitle: { fontSize: 16, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  weeklySubtitle: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  searchRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  searchContainer: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: Colors.white, borderRadius: 14, paddingHorizontal: 14,
    borderWidth: 1, borderColor: Colors.slate200, height: 48,
  },
  searchInput: { flex: 1, fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.text },
  filterButton: {
    width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.white,
    borderWidth: 1, borderColor: Colors.slate200, alignItems: 'center', justifyContent: 'center',
  },
  filterButtonActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterBadge: {
    position: 'absolute', top: -4, right: -4,
    backgroundColor: Colors.accent, borderRadius: 10,
    minWidth: 20, height: 20, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 4,
  },
  filterBadgeText: { fontSize: 10, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  quickFilterRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  quickFilter: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.white, borderRadius: 20, paddingHorizontal: 14,
    paddingVertical: 8, borderWidth: 1, borderColor: Colors.slate200,
  },
  quickFilterActive: { backgroundColor: Colors.error, borderColor: Colors.error },
  quickFilterText: { fontSize: 13, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  quickFilterTextActive: { color: Colors.white },
  clearFiltersText: { fontSize: 13, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.primary },
  filtersPanel: { marginBottom: 16 },
  clearButton: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-end', marginBottom: 8 },
  clearButtonText: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  filterSectionTitle: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text, marginTop: 12, marginBottom: 8 },
  filterChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  filterChip: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
    backgroundColor: Colors.slate50, borderWidth: 1, borderColor: Colors.slate200,
  },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterChipText: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.text },
  filterChipTextActive: { color: Colors.white, fontFamily: 'Inter-SemiBold', fontWeight: '600' },
  resultsCount: { fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginBottom: 12 },
  recipeCard: { marginBottom: 12 },
  recipeHeader: { flexDirection: 'row', gap: 14 },
  recipeIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.green100, alignItems: 'center', justifyContent: 'center' },
  recipeInfo: { flex: 1 },
  recipeName: { fontSize: 16, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text, lineHeight: 21 },
  recipeMeta: { flexDirection: 'row', gap: 12, marginTop: 6 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  recipeDesc: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 8, lineHeight: 19 },
  favButton: { padding: 4 },
  recipeBadges: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  missingText: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 8 },
  emptyCard: { alignItems: 'center', justifyContent: 'center', gap: 8 },
  emptyTitle: { fontSize: 16, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text, marginTop: 8 },
  emptySubtitle: { fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.textMuted, textAlign: 'center' },
});
