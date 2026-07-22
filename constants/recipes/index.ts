import { Recipe } from '@/types';
import { stovetopRecipes } from './stovetop';
import { airFryerRecipes } from './airfryer';
import { breakfastRecipes } from './breakfast';
import { lunchRecipes } from './lunch';
import { onePotRecipes } from './onepot';

export const allRecipes: Recipe[] = [
  ...stovetopRecipes,
  ...airFryerRecipes,
  ...breakfastRecipes,
  ...lunchRecipes,
  ...onePotRecipes,
];

export function getRecipeById(id: string): Recipe | undefined {
  return allRecipes.find(r => r.id === id);
}

export function getRecipesByCategory(category: string): Recipe[] {
  return allRecipes.filter(r => r.recipeCategories.includes(category as any));
}

export function getQuickRecipes(maxMinutes = 30): Recipe[] {
  return allRecipes.filter(r => r.totalTime <= maxMinutes);
}

export function getRecipesByEquipment(equipment: string): Recipe[] {
  return allRecipes.filter(r => r.equipment.includes(equipment as any));
}

export function getBudgetRecipes(maxCost: number): Recipe[] {
  return allRecipes.filter(r => r.estimatedTotalCost <= maxCost);
}

export function getRecipesByMealCategory(mealCategory: string): Recipe[] {
  return allRecipes.filter(r => r.mealCategory === mealCategory);
}

export function searchRecipes(query: string): Recipe[] {
  const lower = query.toLowerCase();
  return allRecipes.filter(
    r =>
      r.title.toLowerCase().includes(lower) ||
      r.description.toLowerCase().includes(lower) ||
      r.ingredients.some(i => i.name.toLowerCase().includes(lower)),
  );
}

export { stovetopRecipes, airFryerRecipes, breakfastRecipes, lunchRecipes, onePotRecipes };
