export type ShoppingCategory =
  | 'Fruit and Vegetables'
  | 'Meat and Poultry'
  | 'Bakery'
  | 'Dairy and Eggs'
  | 'Frozen Foods'
  | 'Pantry Staples'
  | 'Breakfast'
  | 'Snacks'
  | 'Drinks'
  | 'Household Cleaning'
  | 'Toiletries'
  | 'Baby'
  | 'Pet'
  | 'Other';

export interface ShoppingItem {
  id: string;
  name: string;
  category: ShoppingCategory;
  quantity: number;
  unit: string;
  price: number;
  checked: boolean;
}

export interface PantryItem {
  id: string;
  name: string;
  category: ShoppingCategory;
  quantity: number;
  unit: string;
  expiryDate: string;
  lowStock: boolean;
  price: number;
}

export type EquipmentType = 'Stove' | 'Pot' | 'Pan' | 'Air Fryer' | 'Microwave' | 'Oven' | 'Muffin Tin';
export type MealCategory = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
export type RecipeCategory =
  | 'Quick Weekday'
  | 'Budget'
  | 'Family Dinner'
  | 'Lunchbox'
  | 'One-Pot'
  | 'Air-Fryer'
  | 'Stovetop'
  | 'No-Oven'
  | 'Vegetarian'
  | 'Leftover'
  | 'Breakfast'
  | 'Lunch'
  | 'Dinner'
  | 'Snack'
  | 'Soup and Stew'
  | 'Quick <30min'
  | 'Healthy'
  | 'Weekend';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type DietaryTag =
  | 'Vegetarian'
  | 'Vegan'
  | 'Gluten-Free'
  | 'Dairy-Free'
  | 'Low-Carb'
  | 'High-Protein'
  | 'Halal'
  | 'Pescatarian'
  | 'High-Fiber';
export type AllergenTag = 'Gluten' | 'Dairy' | 'Eggs' | 'Soy' | 'Fish' | 'Nuts' | 'Peanuts';

export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: string;
  isStaple?: boolean;
  isOptional?: boolean;
  substitute?: string;
  estimatedPrice: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  mealCategory: MealCategory;
  recipeCategories: RecipeCategory[];
  cuisineType: string;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  servings: number;
  difficulty: Difficulty;
  estimatedTotalCost: number;
  estimatedCostPerServing: number;
  equipment: EquipmentType[];
  ingredients: RecipeIngredient[];
  optionalIngredients: RecipeIngredient[];
  substitutes: { ingredient: string; substitute: string }[];
  instructions: string[];
  dietaryTags: DietaryTag[];
  allergenTags: AllergenTag[];
  thumbnail: string;
  storageInstructions: string;
  leftoverSuggestions: string;
}

export interface PantryMatchResult {
  matchPercentage: number;
  availableIngredients: { name: string; quantity: number; unit: string }[];
  missingIngredients: { name: string; quantity: number; unit: string; estimatedPrice: number }[];
  missingCostTotal: number;
}

export interface MealPlanEntry {
  id: string;
  day: string;
  recipeId: string;
  recipeName: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner';
  servings: number;
  cooked: boolean;
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  items: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  cta: string;
}

export interface HouseholdMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'warning' | 'info' | 'success' | 'error';
  read: boolean;
}
