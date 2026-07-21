import { Recipe, RecipeIngredient, EquipmentType, RecipeCategory, MealCategory, Difficulty, DietaryTag, AllergenTag } from '@/types';

interface RecipeInput {
  id: string;
  title: string;
  description: string;
  mealCategory?: MealCategory;
  recipeCategories: RecipeCategory[];
  cuisineType?: string;
  prepTime?: number;
  cookTime: number;
  servings?: number;
  difficulty?: Difficulty;
  estimatedTotalCost?: number;
  equipment: EquipmentType[];
  ingredients: RecipeIngredient[];
  optionalIngredients?: RecipeIngredient[];
  substitutes?: { ingredient: string; substitute: string }[];
  instructions: string[];
  dietaryTags?: DietaryTag[];
  allergenTags?: AllergenTag[];
  thumbnail?: string;
  storageInstructions?: string;
  leftoverSuggestions?: string;
}

export function makeRecipe(input: RecipeInput): Recipe {
  const servings = input.servings ?? 4;
  const prepTime = input.prepTime ?? 15;
  const totalCost = input.estimatedTotalCost ?? input.ingredients.reduce((sum, i) => sum + i.estimatedPrice, 0);
  return {
    id: input.id,
    title: input.title,
    description: input.description,
    mealCategory: input.mealCategory ?? 'Dinner',
    recipeCategories: input.recipeCategories,
    cuisineType: input.cuisineType ?? 'South African',
    prepTime,
    cookTime: input.cookTime,
    totalTime: prepTime + input.cookTime,
    servings,
    difficulty: input.difficulty ?? 'Easy',
    estimatedTotalCost: totalCost,
    estimatedCostPerServing: Math.round((totalCost / servings) * 100) / 100,
    equipment: input.equipment,
    ingredients: input.ingredients,
    optionalIngredients: input.optionalIngredients ?? [],
    substitutes: input.substitutes ?? [],
    instructions: input.instructions,
    dietaryTags: input.dietaryTags ?? [],
    allergenTags: input.allergenTags ?? [],
    thumbnail: input.thumbnail ?? 'default',
    storageInstructions: input.storageInstructions ?? 'Store in an airtight container in the fridge for up to 3 days. Reheat until piping hot throughout.',
    leftoverSuggestions: input.leftoverSuggestions ?? 'Use leftovers the next day for a quick lunch. Reheat in a pan over medium heat for 5 minutes.',
  };
}

export function ing(name: string, quantity: number, unit: string, price: number, opts?: { isStaple?: boolean; isOptional?: boolean; substitute?: string }): RecipeIngredient {
  return {
    name,
    quantity,
    unit,
    estimatedPrice: price,
    isStaple: opts?.isStaple,
    isOptional: opts?.isOptional,
    substitute: opts?.substitute,
  };
}
